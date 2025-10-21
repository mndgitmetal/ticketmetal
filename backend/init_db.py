#!/usr/bin/env python3
"""
Script para inicializar o banco de dados do TicketMetal
Cria todas as tabelas necessárias automaticamente
"""

import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Adicionar o diretório backend ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Carregar variáveis de ambiente
load_dotenv()

# Configuração do banco
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/ticketmetal")
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Importar modelos
from main import User, Event, Ticket

def create_tables():
    """Cria todas as tabelas do banco de dados"""
    try:
        print("🔨 Criando tabelas do banco de dados...")
        
        # Criar todas as tabelas
        Base.metadata.create_all(bind=engine)
        
        print("✅ Tabelas criadas com sucesso!")
        
        # Verificar se as tabelas foram criadas
        with engine.connect() as conn:
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name IN ('users', 'events', 'tickets')
                ORDER BY table_name;
            """))
            
            tables = [row[0] for row in result]
            print(f"📊 Tabelas encontradas: {', '.join(tables)}")
            
            if len(tables) == 3:
                print("🎉 Todas as tabelas foram criadas corretamente!")
            else:
                print("⚠️  Algumas tabelas podem não ter sido criadas")
                
    except Exception as e:
        print(f"❌ Erro ao criar tabelas: {e}")
        return False
    
    return True

def test_connection():
    """Testa a conexão com o banco de dados"""
    try:
        print("🔍 Testando conexão com o banco de dados...")
        
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version();"))
            version = result.fetchone()[0]
            print(f"✅ Conectado ao PostgreSQL: {version}")
            return True
            
    except Exception as e:
        print(f"❌ Erro de conexão: {e}")
        return False

def main():
    """Função principal"""
    print("🎫 TicketMetal - Inicialização do Banco de Dados")
    print("=" * 50)
    
    # Testar conexão
    if not test_connection():
        print("\n❌ Não foi possível conectar ao banco de dados.")
        print("Verifique se:")
        print("1. O banco PostgreSQL está rodando")
        print("2. As credenciais no arquivo .env estão corretas")
        print("3. O banco 'ticketmetal' existe")
        return False
    
    # Criar tabelas
    if not create_tables():
        print("\n❌ Falha ao criar tabelas.")
        return False
    
    print("\n🎉 Banco de dados inicializado com sucesso!")
    print("Agora você pode executar: docker-compose up")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
