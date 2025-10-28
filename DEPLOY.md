# 🚀 Deploy para Google Cloud Run

Este guia explica como fazer o deploy do Ticket Metal para Google Cloud Run de forma econômica.

## 📋 Pré-requisitos

1. **Google Cloud CLI** instalado
   ```bash
   # macOS
   brew install google-cloud-sdk
   
   # Linux/Windows
   # Baixe em: https://cloud.google.com/sdk/docs/install
   ```

2. **Docker** instalado e rodando

3. **Conta Google Cloud** com projeto `mnd-midias` ativo

## 🎯 Configuração Rápida

### 1. Login no Google Cloud
```bash
gcloud auth login
gcloud config set project mnd-midias
```

### 2. Executar Deploy Automático
```bash
./deploy.sh
```

## 📊 Arquitetura de Produção

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Frontend      │    │    Backend      │
│   User          │    │   Admin         │    │   FastAPI       │
│                 │    │                 │    │                 │
│  Cloud Run      │    │  Cloud Run      │    │  Cloud Run      │
│  (Nginx +       │    │  (Nginx +       │    │  (Python +      │
│   React)        │    │   React)        │    │   Uvicorn)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Supabase      │
                    │   Database      │
                    │   + Auth        │
                    └─────────────────┘
```

## 💰 Otimizações de Custo

### Recursos Configurados
- **CPU**: 1 vCPU por serviço
- **Memória**: 512Mi (backend), 256Mi (frontends)
- **Instâncias**: 0 mínimo, 10 máximo
- **Timeout**: 300 segundos

### Estratégias de Economia
1. **Min Instances = 0**: Serviços param quando não há tráfego
2. **Pay-per-use**: Cobrança apenas pelo uso real
3. **Região us-central1**: Uma das mais baratas
4. **Imagens otimizadas**: Multi-stage builds para reduzir tamanho

## 🔧 Configurações Técnicas

### Backend (FastAPI)
- **Porta**: 8080 (requisito do Cloud Run)
- **Workers**: 1 (otimizado para Cloud Run)
- **Health Check**: `/health` endpoint

### Frontends (React + Nginx)
- **Porta**: 8080 (requisito do Cloud Run)
- **SPA Routing**: Configurado para React Router
- **Compressão**: Gzip habilitado
- **Cache**: Assets estáticos com cache de 1 ano

## 📱 URLs de Produção

Após o deploy, você receberá URLs como:
- **Frontend User**: `https://ticketmetal-frontend-user-[hash]-uc.a.run.app`
- **Frontend Admin**: `https://ticketmetal-frontend-admin-[hash]-uc.a.run.app`
- **Backend API**: `https://ticketmetal-backend-[hash]-uc.a.run.app`

## 🔍 Monitoramento

### Logs
```bash
# Ver logs do backend
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=ticketmetal-backend"

# Ver logs do frontend user
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=ticketmetal-frontend-user"
```

### Métricas
- Acesse o [Google Cloud Console](https://console.cloud.google.com/)
- Navegue para "Cloud Run"
- Veja métricas de CPU, memória, requisições

## 🛠️ Comandos Úteis

### Atualizar um serviço específico
```bash
# Backend
cd backend && docker build -f Dockerfile.prod -t gcr.io/mnd-midias/ticketmetal-backend:latest .
docker push gcr.io/mnd-midias/ticketmetal-backend:latest
gcloud run deploy ticketmetal-backend --image gcr.io/mnd-midias/ticketmetal-backend:latest --region us-central1
```

### Parar todos os serviços
```bash
gcloud run services delete ticketmetal-backend --region us-central1
gcloud run services delete ticketmetal-frontend-user --region us-central1
gcloud run services delete ticketmetal-frontend-admin --region us-central1
```

### Ver status dos serviços
```bash
gcloud run services list --region us-central1
```

## 🔒 Segurança

### Configurações Aplicadas
- **Headers de segurança**: X-Frame-Options, X-XSS-Protection, etc.
- **HTTPS**: Automático no Cloud Run
- **CORS**: Configurado para produção
- **Environment Variables**: Seguras no Cloud Run

### Credenciais
- **GCP Service Account**: Usando `mnd-midias-2c0bfa9a103c.json`
- **Supabase**: Chaves de API configuradas
- **Mercado Pago**: Tokens de teste configurados

## 📈 Escalabilidade

### Auto-scaling
- **Escala para 0**: Quando não há tráfego
- **Escala automática**: Baseado na demanda
- **Cold start**: ~2-3 segundos para primeira requisição

### Limites
- **Máximo**: 10 instâncias por serviço
- **Timeout**: 300 segundos por requisição
- **Memória**: Até 4GB por instância

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de autenticação**
   ```bash
   gcloud auth login
   gcloud auth configure-docker
   ```

2. **Erro de permissões**
   ```bash
   gcloud projects add-iam-policy-binding mnd-midias --member="user:seu-email@gmail.com" --role="roles/run.admin"
   ```

3. **Erro de build**
   ```bash
   # Verificar se Docker está rodando
   docker ps
   
   # Limpar cache do Docker
   docker system prune -a
   ```

### Logs de Debug
```bash
# Ver logs detalhados
gcloud logging read "resource.type=cloud_run_revision" --limit=50 --format="table(timestamp,severity,textPayload)"
```

## 💡 Dicas de Economia

1. **Use apenas quando necessário**: Cloud Run para automaticamente quando não há tráfego
2. **Monitore custos**: Configure alertas de billing no GCP Console
3. **Otimize recursos**: Ajuste CPU/memória baseado no uso real
4. **Cache inteligente**: Use Cloud CDN para assets estáticos (opcional)

## 📞 Suporte

- **Documentação**: [Cloud Run Docs](https://cloud.google.com/run/docs)
- **Status**: [GCP Status](https://status.cloud.google.com/)
- **Comunidade**: [Stack Overflow](https://stackoverflow.com/questions/tagged/google-cloud-run)

---

**🎉 Pronto! Seu Ticket Metal está rodando na nuvem de forma econômica!**

