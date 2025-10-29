#!/bin/bash

# Script de Deploy para Google Cloud Run
# ticketmetal-deploy.sh

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
PROJECT_ID="mnd-midias"
REGION="us-central1"
SERVICE_BACKEND="ticketmetal-backend"
SERVICE_FRONTEND_USER="ticketmetal-frontend-user"
SERVICE_FRONTEND_ADMIN="ticketmetal-frontend-admin"

echo -e "${BLUE}🚀 Iniciando deploy do Ticket Metal para Google Cloud Run${NC}"
echo -e "${BLUE}Projeto: ${PROJECT_ID}${NC}"
echo -e "${BLUE}Região: ${REGION}${NC}"
echo ""

# Verificar se gcloud está instalado
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Google Cloud CLI não encontrado. Instale em: https://cloud.google.com/sdk/docs/install${NC}"
    exit 1
fi

# Verificar se está logado
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}⚠️  Não está logado no Google Cloud. Fazendo login...${NC}"
    gcloud auth login
fi

# Configurar projeto
echo -e "${BLUE}📋 Configurando projeto...${NC}"
gcloud config set project $PROJECT_ID

# Habilitar APIs necessárias
echo -e "${BLUE}🔧 Habilitando APIs necessárias...${NC}"
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Configurar Docker para usar gcloud
echo -e "${BLUE}🐳 Configurando Docker...${NC}"
gcloud auth configure-docker

echo -e "${GREEN}✅ Configuração inicial concluída!${NC}"
echo ""

# Deploy do Backend
echo -e "${BLUE}🔧 Deploy do Backend...${NC}"
cd backend

# Build da imagem
echo -e "${YELLOW}📦 Construindo imagem do backend...${NC}"
docker buildx build --platform linux/amd64 -f Dockerfile.prod -t gcr.io/$PROJECT_ID/$SERVICE_BACKEND:latest . --load

# Push da imagem
echo -e "${YELLOW}📤 Enviando imagem para registry...${NC}"
docker push gcr.io/$PROJECT_ID/$SERVICE_BACKEND:latest

# Deploy para Cloud Run
echo -e "${YELLOW}🚀 Deployando para Cloud Run...${NC}"
gcloud run deploy $SERVICE_BACKEND \
    --image gcr.io/$PROJECT_ID/$SERVICE_BACKEND:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300 \
    --set-env-vars "SUPABASE_URL=https://jaczaqqdtgyeczacppoi.supabase.co,SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphY3phcXFkdGd5ZWN6YWNwcG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMTc1MDIsImV4cCI6MjA1ODU5MzUwMn0.zSxJ6HT9Gv3rbTDuoXlx_HiLB4HCpdVdXd9zXi0ySxE,MERCADOPAGO_ACCESS_TOKEN=TEST-6119343612748678-012817-796089becd94000a5a266cd8c30f11e8-78929697,MERCADOPAGO_PUBLIC_KEY=TEST-c1310ecb-4248-4c47-91bc-5dda4b91a794,GCP_PROJECT_ID=mnd-midias,GCP_BUCKET_NAME=ticketmetal-images,GCP_CREDENTIALS_PATH=/app/mnd-midias-2c0bfa9a103c.json"

BACKEND_URL=$(gcloud run services describe $SERVICE_BACKEND --region=$REGION --format="value(status.url)")
echo -e "${GREEN}✅ Backend deployado: $BACKEND_URL${NC}"

cd ..

# Deploy do Frontend User
echo -e "${BLUE}🎨 Deploy do Frontend User...${NC}"
cd frontend-user

# Build da imagem
echo -e "${YELLOW}📦 Construindo imagem do frontend user...${NC}"
docker buildx build --platform linux/amd64 -f Dockerfile.prod -t gcr.io/$PROJECT_ID/$SERVICE_FRONTEND_USER:latest . --load

# Push da imagem
echo -e "${YELLOW}📤 Enviando imagem para registry...${NC}"
docker push gcr.io/$PROJECT_ID/$SERVICE_FRONTEND_USER:latest

# Deploy para Cloud Run
echo -e "${YELLOW}🚀 Deployando para Cloud Run...${NC}"
gcloud run deploy $SERVICE_FRONTEND_USER \
    --image gcr.io/$PROJECT_ID/$SERVICE_FRONTEND_USER:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 256Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300

FRONTEND_USER_URL=$(gcloud run services describe $SERVICE_FRONTEND_USER --region=$REGION --format="value(status.url)")
echo -e "${GREEN}✅ Frontend User deployado: $FRONTEND_USER_URL${NC}"

cd ..

# Deploy do Frontend Admin
echo -e "${BLUE}⚙️  Deploy do Frontend Admin...${NC}"
cd frontend-admin

# Build da imagem
echo -e "${YELLOW}📦 Construindo imagem do frontend admin...${NC}"
docker buildx build --platform linux/amd64 -f Dockerfile.prod -t gcr.io/$PROJECT_ID/$SERVICE_FRONTEND_ADMIN:latest . --load

# Push da imagem
echo -e "${YELLOW}📤 Enviando imagem para registry...${NC}"
docker push gcr.io/$PROJECT_ID/$SERVICE_FRONTEND_ADMIN:latest

# Deploy para Cloud Run
echo -e "${YELLOW}🚀 Deployando para Cloud Run...${NC}"
gcloud run deploy $SERVICE_FRONTEND_ADMIN \
    --image gcr.io/$PROJECT_ID/$SERVICE_FRONTEND_ADMIN:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 256Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300

FRONTEND_ADMIN_URL=$(gcloud run services describe $SERVICE_FRONTEND_ADMIN --region=$REGION --format="value(status.url)")
echo -e "${GREEN}✅ Frontend Admin deployado: $FRONTEND_ADMIN_URL${NC}"

cd ..

echo ""
echo -e "${GREEN}🎉 Deploy concluído com sucesso!${NC}"
echo ""
echo -e "${BLUE}📋 URLs de Produção:${NC}"
echo -e "${GREEN}🔧 Backend:${NC} $BACKEND_URL"
echo -e "${GREEN}👥 Frontend User:${NC} $FRONTEND_USER_URL"
echo -e "${GREEN}⚙️  Frontend Admin:${NC} $FRONTEND_ADMIN_URL"
echo ""
echo -e "${YELLOW}💡 Dicas:${NC}"
echo -e "• As URLs podem levar alguns minutos para ficarem totalmente ativas"
echo -e "• Cloud Run escala automaticamente baseado na demanda"
echo -e "• Você só paga pelo uso real (pay-per-use)"
echo -e "• Para parar os serviços: gcloud run services delete [SERVICE_NAME] --region=$REGION"
echo ""
echo -e "${BLUE}🔗 Acesse suas aplicações:${NC}"
echo -e "• Usuários: $FRONTEND_USER_URL"
echo -e "• Administradores: $FRONTEND_ADMIN_URL"
echo -e "• API: $BACKEND_URL/docs"

