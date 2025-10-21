# TicketMetal - MVP de Gestão de Eventos e Tickets

Sistema completo de gestão de eventos e venda de ingressos, similar ao Sympla, 101tickets e Ticketmaster.

## Arquitetura

- **Backend**: Python (FastAPI) + Supabase
- **Frontend Admin**: React (gestão de eventos)
- **Frontend Usuário**: React (compra de ingressos)
- **Pagamentos**: Mercado Pago
- **Autenticação**: Redes sociais

## Funcionalidades

### Módulo Administrativo
- Cadastro de eventos e ingressos
- Gestão de vendas e estoque
- Relatórios e estatísticas
- Geração de ingressos PDF com QR Code
- Controle de acesso por horário

### Módulo Usuário
- Visualização de eventos
- Compra de ingressos
- Recebimento de ingressos digitais
- Histórico de compras

## Estrutura do Projeto

```
ticketmetal/
├── backend/                 # API FastAPI
├── frontend-admin/          # Painel administrativo
├── frontend-user/           # Site público
├── docs/                    # Documentação
└── docker-compose.yml       # Orquestração
```

## Como Executar

### 1. Configuração Inicial

```bash
# Clone o repositório
git clone <seu-repositorio>
cd ticketmetal

# Configure as variáveis de ambiente
cp env.example .env
```

### 2. Configurar Supabase

1. Acesse: https://supabase.com/dashboard/project/jaczaqqdtgyeczacppoi/settings/database
2. Copie a senha do banco de dados
3. Edite o arquivo `.env` e substitua `[YOUR-PASSWORD]` pela senha real:

```bash
DATABASE_URL=postgresql://postgres:SUA_SENHA_AQUI@db.jaczaqqdtgyeczacppoi.supabase.co:5432/postgres
```

### 3. Testar Conexão (Opcional)

```bash
# Testar conexão com Supabase
python test_supabase.py
```

### 4. Executar o Projeto

```bash
# Inicializar tudo automaticamente
./start.sh

# Ou manualmente
docker-compose up --build -d
```

### 5. Acessar as Aplicações

- **Frontend Usuário**: http://localhost:3000
- **Frontend Admin**: http://localhost:3001  
- **API Backend**: http://localhost:8000
- **Documentação API**: http://localhost:8000/docs

## Tecnologias

- **Backend**: FastAPI, SQLAlchemy, Supabase
- **Frontend**: React, TypeScript, Tailwind CSS
- **Pagamentos**: Mercado Pago API
- **Autenticação**: Supabase Auth
- **PDF**: ReportLab
- **QR Code**: qrcode
