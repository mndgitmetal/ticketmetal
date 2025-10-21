#!/usr/bin/env python3
"""
Script para testar a conexão com o Supabase
"""

import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

def test_supabase_connection():
    """Testa a conexão com o Supabase"""
    print("🔍 Testando conexão com Supabase...")
    
    # URL do Supabase (você precisa substituir [YOUR-PASSWORD] pela senha real)
    supabase_url = os.getenv("DATABASE_URL")
    
    if not supabase_url:
        print("❌ DATABASE_URL não encontrada no arquivo .env")
        return False
    
    if "[YOUR-PASSWORD]" in supabase_url:
        print("⚠️  Você precisa substituir [YOUR-PASSWORD] pela senha real do Supabase")
        print("   Acesse: https://supabase.com/dashboard/project/jaczaqqdtgyeczacppoi/settings/database")
        print("   Copie a senha do banco de dados e substitua no arquivo .env")
        return False
    
    try:
        engine = create_engine(supabase_url, echo=False)
        
        with engine.connect() as conn:
            # Testar conexão básica
            result = conn.execute(text("SELECT version();"))
            version = result.fetchone()[0]
            print(f"✅ Conectado ao Supabase PostgreSQL: {version}")
            
            # Verificar se conseguimos criar uma tabela de teste
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS test_connection (
                    id SERIAL PRIMARY KEY,
                    message TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """))
            
            # Inserir um registro de teste
            conn.execute(text("""
                INSERT INTO test_connection (message) 
                VALUES ('Conexão com Supabase funcionando!')
            """))
            
            # Verificar o registro
            result = conn.execute(text("SELECT message FROM test_connection ORDER BY id DESC LIMIT 1;"))
            message = result.fetchone()[0]
            print(f"✅ Teste de escrita/leitura: {message}")
            
            # Limpar tabela de teste
            conn.execute(text("DROP TABLE test_connection;"))
            
            print("🎉 Conexão com Supabase funcionando perfeitamente!")
            return True
            
    except Exception as e:
        print(f"❌ Erro de conexão com Supabase: {e}")
        print("\nVerifique se:")
        print("1. A senha do banco está correta no arquivo .env")
        print("2. O projeto Supabase está ativo")
        print("3. A URL de conexão está correta")
        return False

def main():
    print("🎫 TicketMetal - Teste de Conexão Supabase")
    print("=" * 50)
    
    success = test_supabase_connection()
    
    if success:
        print("\n✅ Pronto para usar o Supabase!")
        print("Execute: ./start.sh")
    else:
        print("\n❌ Configure o Supabase antes de continuar")
    
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
