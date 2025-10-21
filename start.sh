#!/bin/bash

# TicketMetal - Script de Inicialização
echo "🎫 Iniciando TicketMetal MVP..."

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp env.example .env
    echo "⚠️  Configure as variáveis de ambiente no arquivo .env antes de continuar."
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_KEY"
    echo "   - MERCADOPAGO_ACCESS_TOKEN"
    echo "   - MERCADOPAGO_PUBLIC_KEY"
    read -p "Pressione Enter para continuar após configurar o .env..."
fi

# Construir e iniciar os serviços
echo "🔨 Construindo e iniciando os serviços..."
docker-compose up --build -d

# Aguardar o backend iniciar
echo "⏳ Aguardando o backend iniciar..."
sleep 15

# Inicializar banco de dados
echo "🗄️  Inicializando banco de dados..."
docker-compose exec backend python init_db.py

# Aguardar os serviços iniciarem
echo "⏳ Aguardando os serviços iniciarem..."
sleep 10

# Verificar status dos serviços
echo "📊 Status dos serviços:"
docker-compose ps

echo ""
echo "✅ TicketMetal MVP está rodando!"
echo ""
echo "🌐 Acesse:"
echo "   - Frontend Usuário: http://localhost:3000"
echo "   - Frontend Admin: http://localhost:3001"
echo "   - API Backend: http://localhost:8000"
echo "   - Documentação API: http://localhost:8000/docs"
echo ""
echo "📚 Para parar os serviços: docker-compose down"
echo "📝 Para ver logs: docker-compose logs -f"
echo ""
echo "🎉 Divirta-se testando o TicketMetal!"
