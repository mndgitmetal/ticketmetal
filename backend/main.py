from fastapi import FastAPI, HTTPException, Depends, status, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import os
import io
from dotenv import load_dotenv
from ticket_generator import TicketGenerator
from mercadopago_integration import MercadoPagoIntegration
from supabase_client import supabase_client
try:
    from gcp_storage import gcp_storage_service
    GCP_AVAILABLE = True
except Exception as e:
    print(f"GCP Storage não disponível: {e}")
    GCP_AVAILABLE = False
import json

# Carregar variáveis de ambiente
load_dotenv()

# Configurar porta para Cloud Run
PORT = int(os.environ.get("PORT", 8080))

# Inicializar FastAPI
app = FastAPI(title="TicketMetal API", version="1.0.0")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://ticketmetal-frontend-user-981091216774.us-central1.run.app",
        "https://ticketmetal-frontend-user-qcgtc4x47q-uc.a.run.app",
        "https://ticketmetal-frontend-admin-981091216774.us-central1.run.app",
        "https://ticketmetal-frontend-admin-qcgtc4x47q-uc.a.run.app",
        "https://ticketmetal.com",
        "https://www.ticketmetal.com",
        "http://ticketmetal.com",
        "http://www.ticketmetal.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar serviços
ticket_generator = TicketGenerator()
mercadopago_integration = MercadoPagoIntegration()

# Modelos Pydantic
class UserCreate(BaseModel):
    email: str
    name: str
    avatar_url: Optional[str] = None
    provider: Optional[str] = None
    provider_id: Optional[str] = None
    is_admin: bool = False

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    avatar_url: Optional[str]
    provider: Optional[str]
    provider_id: Optional[str]
    created_at: datetime
    is_admin: bool

class EventCreate(BaseModel):
    title: str
    description: str
    date: datetime
    location: str
    address: str
    city: str
    state: str
    price: float
    max_tickets: int
    image_url: Optional[str] = None
    organizer_id: int
    sales_end_date: Optional[datetime] = None
    is_active: bool = True

class EventResponse(BaseModel):
    id: int
    title: str
    description: str
    date: datetime
    location: str
    address: str
    city: str
    state: str
    price: float
    max_tickets: int
    image_url: Optional[str]
    organizer_id: int
    sales_end_date: Optional[datetime]
    is_active: bool
    created_at: datetime

class TicketCreate(BaseModel):
    event_id: int
    user_id: int
    price_paid: float

class TicketResponse(BaseModel):
    id: int
    event_id: int
    user_id: int
    ticket_number: str
    qr_code: str
    price_paid: float
    status: str
    purchased_at: datetime
    used_at: Optional[datetime]

# Rotas de Usuários
@app.post("/api/users/", response_model=UserResponse)
async def create_user(user: UserCreate):
    """Cria um novo usuário"""
    try:
        user_data = user.model_dump()
        user_data['created_at'] = datetime.utcnow()
        
        result = await supabase_client.create_user(user_data)
        if not result:
            raise HTTPException(status_code=400, detail="Erro ao criar usuário")
        
        return UserResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    """Busca um usuário por ID"""
    try:
        user = await supabase_client.get_user(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        return UserResponse(**user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/users/email/{email}", response_model=UserResponse)
async def get_user_by_email(email: str):
    """Busca um usuário por email"""
    try:
        user = await supabase_client.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        return UserResponse(**user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user: UserCreate):
    """Atualiza um usuário"""
    try:
        result = await supabase_client.update_user(user_id, user.model_dump())
        if not result:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        return UserResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/users/{user_id}")
async def delete_user(user_id: int):
    """Deleta um usuário"""
    try:
        success = await supabase_client.delete_user(user_id)
        if not success:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        return {"message": "Usuário deletado com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Rotas de Eventos
@app.post("/api/events/", response_model=EventResponse)
async def create_event(event: EventCreate):
    """Cria um novo evento"""
    try:
        event_data = event.model_dump()
        event_data['created_at'] = datetime.utcnow()
        
        result = await supabase_client.create_event(event_data)
        if not result:
            raise HTTPException(status_code=400, detail="Erro ao criar evento")
        
        return EventResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/events/", response_model=List[EventResponse])
async def get_events(limit: int = 50, offset: int = 0):
    """Lista todos os eventos"""
    try:
        events = await supabase_client.get_events(limit, offset)
        return [EventResponse(**event) for event in events]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: int):
    """Busca um evento por ID"""
    try:
        event = await supabase_client.get_event(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Evento não encontrado")
        
        return EventResponse(**event)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/events/organizer/{organizer_id}", response_model=List[EventResponse])
async def get_events_by_organizer(organizer_id: int):
    """Busca eventos por organizador"""
    try:
        events = await supabase_client.get_events_by_organizer(organizer_id)
        return [EventResponse(**event) for event in events]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/events/{event_id}", response_model=EventResponse)
async def update_event(event_id: int, event: EventCreate):
    """Atualiza um evento"""
    try:
        result = await supabase_client.update_event(event_id, event.model_dump())
        if not result:
            raise HTTPException(status_code=404, detail="Evento não encontrado")
        
        return EventResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/events/{event_id}")
async def delete_event(event_id: int):
    """Deleta um evento"""
    try:
        success = await supabase_client.delete_event(event_id)
        if not success:
            raise HTTPException(status_code=404, detail="Evento não encontrado")
        
        return {"message": "Evento deletado com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Rotas para Eventos Rock (Agregador de eventos externos)
@app.get("/api/events/rock/")
async def get_rock_events(limit: int = 500, offset: int = 0, cidade: Optional[str] = None):
    """Lista eventos da tabela eventos_rock (agregador de eventos externos)"""
    try:
        events = await supabase_client.get_rock_events(limit, offset, cidade)
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/events/rock/featured/")
async def get_featured_rock_events(limit: int = 3):
    """Lista eventos em destaque da tabela eventos_rock ordenados por prioridade"""
    try:
        events = await supabase_client.get_featured_rock_events(limit)
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Rotas de Ingressos
@app.post("/api/tickets/", response_model=TicketResponse)
async def create_ticket(ticket: TicketCreate):
    """Cria um novo ingresso"""
    try:
        # Gerar número do ingresso e QR code
        ticket_number = f"TM{ticket.event_id:06d}{ticket.user_id:06d}"
        qr_code = f"TICKETMETAL:{ticket_number}"
        
        ticket_data = ticket.model_dump()
        ticket_data['ticket_number'] = ticket_number
        ticket_data['qr_code'] = qr_code
        ticket_data['status'] = 'active'
        ticket_data['purchased_at'] = datetime.utcnow()
        
        result = await supabase_client.create_ticket(ticket_data)
        if not result:
            raise HTTPException(status_code=400, detail="Erro ao criar ingresso")
        
        return TicketResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tickets/{ticket_id}", response_model=TicketResponse)
async def get_ticket(ticket_id: int):
    """Busca um ingresso por ID"""
    try:
        ticket = await supabase_client.get_ticket(ticket_id)
        if not ticket:
            raise HTTPException(status_code=404, detail="Ingresso não encontrado")
        
        return TicketResponse(**ticket)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tickets/user/{user_id}", response_model=List[TicketResponse])
async def get_tickets_by_user(user_id: int):
    """Busca ingressos por usuário"""
    try:
        tickets = await supabase_client.get_tickets_by_user(user_id)
        return [TicketResponse(**ticket) for ticket in tickets]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tickets/event/{event_id}", response_model=List[TicketResponse])
async def get_tickets_by_event(event_id: int):
    """Busca ingressos por evento"""
    try:
        tickets = await supabase_client.get_tickets_by_event(event_id)
        return [TicketResponse(**ticket) for ticket in tickets]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/tickets/{ticket_id}", response_model=TicketResponse)
async def update_ticket(ticket_id: int, ticket_data: dict):
    """Atualiza um ingresso"""
    try:
        result = await supabase_client.update_ticket(ticket_id, ticket_data)
        if not result:
            raise HTTPException(status_code=404, detail="Ingresso não encontrado")
        
        return TicketResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/tickets/{ticket_id}")
async def delete_ticket(ticket_id: int):
    """Deleta um ingresso"""
    try:
        success = await supabase_client.delete_ticket(ticket_id)
        if not success:
            raise HTTPException(status_code=404, detail="Ingresso não encontrado")
        
        return {"message": "Ingresso deletado com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Rotas de Estatísticas
@app.get("/api/events/{event_id}/stats")
async def get_event_stats(event_id: int):
    """Busca estatísticas de um evento"""
    try:
        stats = await supabase_client.get_event_stats(event_id)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Rota para gerar PDF do ingresso
@app.get("/api/tickets/{ticket_id}/pdf")
async def generate_ticket_pdf(ticket_id: int):
    """Gera PDF do ingresso"""
    try:
        ticket = await supabase_client.get_ticket(ticket_id)
        if not ticket:
            raise HTTPException(status_code=404, detail="Ingresso não encontrado")
        
        event = await supabase_client.get_event(ticket['event_id'])
        if not event:
            raise HTTPException(status_code=404, detail="Evento não encontrado")
        
        # Gerar PDF
        pdf_buffer = ticket_generator.generate_ticket_pdf(
            ticket_number=ticket['ticket_number'],
            qr_code=ticket['qr_code'],
            event_title=event['title'],
            event_date=event['date'],
            event_location=event['location'],
            price_paid=ticket['price_paid']
        )
        
        return StreamingResponse(
            io.BytesIO(pdf_buffer),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=ticket_{ticket['ticket_number']}.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Rota para integração com Mercado Pago
@app.post("/api/payments/create")
async def create_payment(payment_data: dict):
    """Cria pagamento no Mercado Pago"""
    try:
        result = mercadopago_integration.create_payment(payment_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/payments/webhook")
async def payment_webhook(request: Request):
    """Webhook do Mercado Pago"""
    try:
        data = await request.json()
        result = mercadopago_integration.handle_webhook(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Rota de saúde
@app.get("/api/health")
async def health_check():
    """Verifica se a API está funcionando"""
    return {"status": "ok", "message": "TicketMetal API está funcionando"}

# Rotas para Upload de Imagens
@app.post("/api/upload/image", tags=["Upload"])
async def upload_image(file: UploadFile = File(...)):
    """Faz upload de uma imagem para o Google Cloud Storage"""
    if not GCP_AVAILABLE:
        raise HTTPException(status_code=503, detail="Serviço de upload não disponível")
    
    try:
        # Verificar se é uma imagem
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="Arquivo deve ser uma imagem")
        
        # Verificar tamanho do arquivo (máximo 10MB)
        file_data = await file.read()
        if len(file_data) > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(status_code=400, detail="Arquivo muito grande. Máximo 10MB")
        
        # Fazer upload para GCP
        image_url = await gcp_storage_service.upload_image(
            file_data=file_data,
            original_filename=file.filename,
            content_type=file.content_type
        )
        
        if not image_url:
            raise HTTPException(status_code=500, detail="Erro ao fazer upload da imagem")
        
        return {
            "success": True,
            "image_url": image_url,
            "filename": file.filename,
            "size": len(file_data)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Erro no upload: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.delete("/api/upload/image", tags=["Upload"])
async def delete_image(image_url: str):
    """Deleta uma imagem do Google Cloud Storage"""
    if not GCP_AVAILABLE:
        raise HTTPException(status_code=503, detail="Serviço de upload não disponível")
    
    try:
        success = await gcp_storage_service.delete_image(image_url)
        
        if not success:
            raise HTTPException(status_code=404, detail="Imagem não encontrada")
        
        return {
            "success": True,
            "message": "Imagem deletada com sucesso"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Erro ao deletar imagem: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/api/upload/images", tags=["Upload"])
async def list_images():
    """Lista todas as imagens no bucket"""
    if not GCP_AVAILABLE:
        raise HTTPException(status_code=503, detail="Serviço de upload não disponível")
    
    try:
        images = await gcp_storage_service.list_images()
        
        return {
            "success": True,
            "images": images,
            "count": len(images)
        }
        
    except Exception as e:
        print(f"Erro ao listar imagens: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Endpoint de health check para Cloud Run
@app.get("/health")
async def health_check():
    """Health check endpoint para Cloud Run"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Endpoint raiz
@app.get("/")
async def root():
    return {"message": "Ticket Metal API", "version": "1.0.0", "status": "running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)