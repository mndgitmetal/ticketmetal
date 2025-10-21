from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from fastapi.responses import StreamingResponse
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, Boolean, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import os
import io
from dotenv import load_dotenv
from ticket_generator import TicketGenerator
from mercadopago_integration import MercadoPagoIntegration

# Carregar variáveis de ambiente
load_dotenv()

# Configuração do banco
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/ticketmetal")
engine = create_engine(DATABASE_URL, echo=True)  # echo=True para ver as queries SQL
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos do banco
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    avatar_url = Column(String)
    provider = Column(String)  # google, facebook, etc
    provider_id = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_admin = Column(Boolean, default=False)
    
    events = relationship("Event", back_populates="organizer")

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    date = Column(DateTime)
    location = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    image_url = Column(String)
    max_tickets = Column(Integer)
    price = Column(Float)
    is_active = Column(Boolean, default=True)
    sales_end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    organizer_id = Column(Integer, ForeignKey("users.id"))
    
    organizer = relationship("User", back_populates="events")
    tickets = relationship("Ticket", back_populates="event")

class Ticket(Base):
    __tablename__ = "tickets"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    buyer_id = Column(Integer, ForeignKey("users.id"))
    qr_code = Column(String, unique=True, index=True)
    ticket_number = Column(String, unique=True, index=True)
    price_paid = Column(Float)
    status = Column(String, default="active")  # active, used, cancelled
    purchased_at = Column(DateTime, default=datetime.utcnow)
    used_at = Column(DateTime)
    
    event = relationship("Event", back_populates="tickets")
    buyer = relationship("User")

# Criar tabelas (comentado para evitar erro na inicialização)
# Base.metadata.create_all(bind=engine)

# Inicializar FastAPI
app = FastAPI(title="TicketMetal API", version="1.0.0")

# Inicializar serviços
ticket_generator = TicketGenerator()
mercadopago_integration = MercadoPagoIntegration()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependências
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

security = HTTPBearer()

# Schemas Pydantic
class UserCreate(BaseModel):
    email: str
    name: str
    avatar_url: Optional[str] = None
    provider: str
    provider_id: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    avatar_url: Optional[str]
    provider: str
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class EventCreate(BaseModel):
    title: str
    description: str
    date: datetime
    location: str
    address: str
    city: str
    state: str
    image_url: Optional[str] = None
    max_tickets: int
    price: float
    sales_end_date: datetime

class EventResponse(BaseModel):
    id: int
    title: str
    description: str
    date: datetime
    location: str
    address: str
    city: str
    state: str
    image_url: Optional[str]
    max_tickets: int
    price: float
    is_active: bool
    sales_end_date: datetime
    created_at: datetime
    organizer_id: int
    tickets_sold: int
    
    class Config:
        from_attributes = True

class TicketCreate(BaseModel):
    event_id: int
    buyer_id: int

class TicketResponse(BaseModel):
    id: int
    event_id: int
    buyer_id: int
    qr_code: str
    ticket_number: str
    price_paid: float
    status: str
    purchased_at: datetime
    used_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Rotas
@app.get("/")
async def root():
    return {"message": "TicketMetal API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Rotas de usuários
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

# Rotas de eventos
@app.post("/events/", response_model=EventResponse)
async def create_event(event: EventCreate, db: Session = Depends(get_db)):
    db_event = Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@app.get("/events/", response_model=List[EventResponse])
async def list_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = db.query(Event).filter(Event.is_active == True).offset(skip).limit(limit).all()
    return events

@app.get("/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento não encontrado")
    
    # Adicionar contagem de tickets vendidos
    tickets_sold = db.query(Ticket).filter(Ticket.event_id == event_id).count()
    event_dict = event.__dict__.copy()
    event_dict['tickets_sold'] = tickets_sold
    return event_dict

# Rotas de tickets
@app.post("/tickets/", response_model=TicketResponse)
async def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    # Verificar se o evento existe e está ativo
    event = db.query(Event).filter(Event.id == ticket.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento não encontrado")
    
    if not event.is_active:
        raise HTTPException(status_code=400, detail="Evento não está ativo")
    
    # Verificar se ainda há tickets disponíveis
    tickets_sold = db.query(Ticket).filter(Ticket.event_id == ticket.event_id).count()
    if tickets_sold >= event.max_tickets:
        raise HTTPException(status_code=400, detail="Ingressos esgotados")
    
    # Verificar se a venda ainda está ativa
    if datetime.utcnow() > event.sales_end_date:
        raise HTTPException(status_code=400, detail="Vendas encerradas")
    
    # Gerar QR code e número do ticket
    import uuid
    qr_code = str(uuid.uuid4())
    ticket_number = f"TM{event_id:04d}{tickets_sold + 1:04d}"
    
    db_ticket = Ticket(
        event_id=ticket.event_id,
        buyer_id=ticket.buyer_id,
        qr_code=qr_code,
        ticket_number=ticket_number,
        price_paid=event.price
    )
    
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

@app.get("/tickets/{ticket_id}", response_model=TicketResponse)
async def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ingresso não encontrado")
    return ticket

@app.get("/tickets/qr/{qr_code}", response_model=TicketResponse)
async def get_ticket_by_qr(qr_code: str, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.qr_code == qr_code).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ingresso não encontrado")
    return ticket

# Rotas de relatórios
@app.get("/events/{event_id}/stats")
async def get_event_stats(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento não encontrado")
    
    tickets_sold = db.query(Ticket).filter(Ticket.event_id == event_id).count()
    total_revenue = db.query(Ticket).filter(Ticket.event_id == event_id).with_entities(
        db.func.sum(Ticket.price_paid)
    ).scalar() or 0
    
    return {
        "event_id": event_id,
        "event_title": event.title,
        "max_tickets": event.max_tickets,
        "tickets_sold": tickets_sold,
        "tickets_available": event.max_tickets - tickets_sold,
        "total_revenue": float(total_revenue),
        "average_price": float(total_revenue / tickets_sold) if tickets_sold > 0 else 0,
        "occupancy_rate": (tickets_sold / event.max_tickets) * 100 if event.max_tickets > 0 else 0
    }

# Rotas de PDF
@app.get("/tickets/{ticket_id}/pdf")
async def download_ticket_pdf(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ingresso não encontrado")
    
    event = db.query(Event).filter(Event.id == ticket.event_id).first()
    buyer = db.query(User).filter(User.id == ticket.buyer_id).first()
    
    ticket_data = {
        "ticket_number": ticket.ticket_number,
        "qr_code": ticket.qr_code,
        "price_paid": ticket.price_paid,
        "purchased_at": ticket.purchased_at,
        "buyer_name": buyer.name if buyer else "Usuário"
    }
    
    event_data = {
        "title": event.title,
        "date": event.date,
        "location": event.location,
        "address": event.address,
        "city": event.city,
        "state": event.state
    }
    
    pdf_bytes = ticket_generator.create_ticket_pdf(ticket_data, event_data)
    
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=ticket_{ticket.ticket_number}.pdf"}
    )

@app.get("/events/{event_id}/report/pdf")
async def download_event_report_pdf(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento não encontrado")
    
    # Obter estatísticas
    tickets_sold = db.query(Ticket).filter(Ticket.event_id == event_id).count()
    total_revenue = db.query(Ticket).filter(Ticket.event_id == event_id).with_entities(
        db.func.sum(Ticket.price_paid)
    ).scalar() or 0
    
    stats = {
        "max_tickets": event.max_tickets,
        "tickets_sold": tickets_sold,
        "tickets_available": event.max_tickets - tickets_sold,
        "total_revenue": float(total_revenue),
        "average_price": float(total_revenue / tickets_sold) if tickets_sold > 0 else 0,
        "occupancy_rate": (tickets_sold / event.max_tickets) * 100 if event.max_tickets > 0 else 0
    }
    
    event_data = {
        "title": event.title,
        "date": event.date,
        "location": event.location
    }
    
    pdf_bytes = ticket_generator.create_event_report_pdf(event_data, stats)
    
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=relatorio_{event.title.replace(' ', '_')}.pdf"}
    )

# Rotas de pagamento
@app.post("/payments/create-preference")
async def create_payment_preference(
    event_id: int,
    buyer_email: str,
    buyer_name: str,
    success_url: str,
    failure_url: str,
    pending_url: str,
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento não encontrado")
    
    if not event.is_active:
        raise HTTPException(status_code=400, detail="Evento não está ativo")
    
    # Verificar se ainda há tickets disponíveis
    tickets_sold = db.query(Ticket).filter(Ticket.event_id == event_id).count()
    if tickets_sold >= event.max_tickets:
        raise HTTPException(status_code=400, detail="Ingressos esgotados")
    
    # Criar ticket temporário para obter ID
    import uuid
    qr_code = str(uuid.uuid4())
    ticket_number = f"TM{event_id:04d}{tickets_sold + 1:04d}"
    
    # Criar preferência de pagamento
    preference_result = mercadopago_integration.create_payment_preference(
        event_title=event.title,
        ticket_price=event.price,
        ticket_id=0,  # Será atualizado após confirmação do pagamento
        buyer_email=buyer_email,
        buyer_name=buyer_name,
        success_url=success_url,
        failure_url=failure_url,
        pending_url=pending_url
    )
    
    if not preference_result["success"]:
        raise HTTPException(status_code=400, detail=f"Erro ao criar pagamento: {preference_result['error']}")
    
    return preference_result

@app.post("/webhooks/mercadopago")
async def mercadopago_webhook(request: Request, db: Session = Depends(get_db)):
    webhook_data = await request.json()
    
    result = mercadopago_integration.process_webhook(webhook_data)
    
    if result["success"] and result["status"] == "approved":
        # Criar ticket após pagamento aprovado
        external_reference = result["external_reference"]
        
        # Aqui você precisaria implementar a lógica para criar o ticket
        # baseado no external_reference e dados do webhook
        
        return {"status": "success", "message": "Pagamento processado"}
    
    return {"status": "received", "message": "Webhook recebido"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
