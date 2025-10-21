# TicketMetal - Documentação Técnica

## Visão Geral

TicketMetal é um MVP completo de gestão de eventos e venda de ingressos, similar ao Sympla, 101tickets e Ticketmaster. O sistema permite que organizadores criem e gerenciem eventos, enquanto usuários podem comprar ingressos de forma segura.

## Arquitetura

### Backend (Python + FastAPI)
- **Framework**: FastAPI
- **Banco de Dados**: PostgreSQL (local) + Supabase (produção)
- **ORM**: SQLAlchemy
- **Autenticação**: Supabase Auth
- **Pagamentos**: Mercado Pago API
- **PDF**: ReportLab
- **QR Code**: qrcode

### Frontend Admin (React + TypeScript)
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Roteamento**: React Router
- **Formulários**: React Hook Form
- **Notificações**: React Hot Toast
- **Ícones**: Lucide React

### Frontend Usuário (React + TypeScript)
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Roteamento**: React Router
- **Formulários**: React Hook Form
- **Notificações**: React Hot Toast
- **Ícones**: Lucide React

## Funcionalidades Implementadas

### Módulo Administrativo
- ✅ Dashboard com estatísticas
- ✅ CRUD completo de eventos
- ✅ Gestão de ingressos e vendas
- ✅ Relatórios e estatísticas
- ✅ Geração de PDFs com QR Code
- ✅ Controle de acesso por horário
- ✅ Interface responsiva e moderna

### Módulo Usuário
- ✅ Listagem de eventos com filtros
- ✅ Detalhes do evento
- ✅ Processo de compra de ingressos
- ✅ Integração com Mercado Pago
- ✅ Geração de ingressos digitais
- ✅ Área do usuário com ingressos
- ✅ Interface responsiva e intuitiva

### Backend API
- ✅ Endpoints RESTful completos
- ✅ Autenticação e autorização
- ✅ Integração com Mercado Pago
- ✅ Geração de PDFs com QR Code
- ✅ Webhooks para pagamentos
- ✅ Validação de dados
- ✅ Documentação automática (Swagger)

## Estrutura do Projeto

```
ticketmetal/
├── backend/                 # API FastAPI
│   ├── main.py             # Aplicação principal
│   ├── ticket_generator.py # Geração de PDFs
│   ├── mercadopago_integration.py # Integração MP
│   ├── requirements.txt    # Dependências Python
│   └── Dockerfile         # Container do backend
├── frontend-admin/          # Painel administrativo
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── contexts/      # Contextos React
│   │   └── App.tsx       # Aplicação principal
│   ├── package.json       # Dependências Node.js
│   └── Dockerfile        # Container do admin
├── frontend-user/           # Site público
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   └── App.tsx       # Aplicação principal
│   ├── package.json       # Dependências Node.js
│   └── Dockerfile        # Container do usuário
├── docker-compose.yml      # Orquestração dos serviços
├── env.example            # Variáveis de ambiente
├── start.sh               # Script de inicialização
└── README.md              # Documentação principal
```

## Modelos de Dados

### User
- id, email, name, avatar_url
- provider, provider_id
- is_admin, created_at

### Event
- id, title, description
- date, location, address
- city, state, image_url
- max_tickets, price
- is_active, sales_end_date
- organizer_id, created_at

### Ticket
- id, event_id, buyer_id
- qr_code, ticket_number
- price_paid, status
- purchased_at, used_at

## APIs Principais

### Eventos
- `GET /events/` - Listar eventos
- `POST /events/` - Criar evento
- `GET /events/{id}` - Detalhes do evento
- `PUT /events/{id}` - Atualizar evento
- `DELETE /events/{id}` - Excluir evento

### Ingressos
- `POST /tickets/` - Criar ingresso
- `GET /tickets/{id}` - Detalhes do ingresso
- `GET /tickets/qr/{qr_code}` - Buscar por QR Code

### Pagamentos
- `POST /payments/create-preference` - Criar preferência MP
- `POST /webhooks/mercadopago` - Webhook MP

### Relatórios
- `GET /events/{id}/stats` - Estatísticas do evento
- `GET /events/{id}/report/pdf` - Relatório PDF

## Configuração

### Variáveis de Ambiente
```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=your-mercadopago-access-token
MERCADOPAGO_PUBLIC_KEY=your-mercadopago-public-key

# Banco de Dados
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ticketmetal
```

### Execução
```bash
# Inicializar todos os serviços
./start.sh

# Ou manualmente
docker-compose up --build -d
```

## URLs de Acesso

- **Frontend Usuário**: http://localhost:3000
- **Frontend Admin**: http://localhost:3001
- **API Backend**: http://localhost:8000
- **Documentação API**: http://localhost:8000/docs

## Próximos Passos

### Melhorias Sugeridas
1. **Autenticação Real**: Integrar com Supabase Auth
2. **Testes**: Adicionar testes unitários e de integração
3. **Cache**: Implementar Redis para performance
4. **Notificações**: Sistema de notificações por email/SMS
5. **Analytics**: Dashboard avançado com métricas
6. **Mobile**: Aplicativo mobile nativo
7. **Multi-tenant**: Suporte a múltiplas organizações
8. **API Rate Limiting**: Limitação de requisições
9. **Logs**: Sistema de logs centralizado
10. **Monitoramento**: Health checks e métricas

### Deploy em Produção
1. Configurar Supabase para banco de dados
2. Configurar Mercado Pago em modo produção
3. Deploy no Vercel/Netlify (frontends)
4. Deploy no Railway/Heroku (backend)
5. Configurar domínio e SSL
6. Configurar CI/CD

## Tecnologias Utilizadas

### Backend
- Python 3.11
- FastAPI 0.104.1
- SQLAlchemy 2.0.23
- PostgreSQL
- ReportLab 4.0.7
- qrcode 7.4.2
- Mercado Pago SDK

### Frontend
- React 18
- TypeScript 4.7.4
- Tailwind CSS 3.2.7
- React Router 6.8.1
- React Hook Form 7.43.5
- Lucide React 0.263.1

### DevOps
- Docker & Docker Compose
- Node.js 18
- npm

## Licença

Este projeto é um MVP desenvolvido para demonstração. Todos os direitos reservados.
