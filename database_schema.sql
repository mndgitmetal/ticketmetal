-- TicketMetal Database Schema
-- Este arquivo contém a estrutura das tabelas do banco de dados

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    provider VARCHAR(50) NOT NULL, -- google, facebook, email, etc
    provider_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    image_url VARCHAR(500),
    max_tickets INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sales_end_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    organizer_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de ingressos
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    qr_code VARCHAR(255) UNIQUE NOT NULL,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    price_paid DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, used, cancelled
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_tickets_event ON tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_tickets_buyer ON tickets(buyer_id);
CREATE INDEX IF NOT EXISTS idx_tickets_qr ON tickets(qr_code);
CREATE INDEX IF NOT EXISTS idx_tickets_number ON tickets(ticket_number);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);

-- Comentários nas tabelas
COMMENT ON TABLE users IS 'Usuários do sistema (organizadores e compradores)';
COMMENT ON TABLE events IS 'Eventos cadastrados pelos organizadores';
COMMENT ON TABLE tickets IS 'Ingressos vendidos para os eventos';

-- Comentários nas colunas principais
COMMENT ON COLUMN users.provider IS 'Provedor de autenticação (google, facebook, email)';
COMMENT ON COLUMN users.is_admin IS 'Se o usuário é administrador/organizador';
COMMENT ON COLUMN events.sales_end_date IS 'Data limite para venda de ingressos';
COMMENT ON COLUMN tickets.qr_code IS 'Código QR único para validação';
COMMENT ON COLUMN tickets.ticket_number IS 'Número único do ingresso (ex: TM00010001)';
COMMENT ON COLUMN tickets.status IS 'Status do ingresso (active, used, cancelled)';
