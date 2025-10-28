import os
import uuid
from typing import Optional
from google.cloud import storage
from google.oauth2 import service_account
from PIL import Image
import io

class GCPStorageService:
    def __init__(self):
        # Configurar credenciais do GCP
        self.credentials_path = "/app/mnd-midias-2c0bfa9a103c.json"
        self.project_id = "mnd-midias"
        self.bucket_name = "ticketmetal-images"  # Nome do bucket que criaremos
        
        # Verificar se o arquivo de credenciais existe
        if not os.path.exists(self.credentials_path):
            raise FileNotFoundError(f"Arquivo de credenciais não encontrado: {self.credentials_path}")
        
        # Carregar credenciais
        self.credentials = service_account.Credentials.from_service_account_file(
            self.credentials_path,
            scopes=['https://www.googleapis.com/auth/cloud-platform']
        )
        
        # Inicializar cliente do Google Cloud Storage
        self.client = storage.Client(
            project=self.project_id,
            credentials=self.credentials
        )
        
        # Verificar se o bucket existe, se não existir, criar
        self._ensure_bucket_exists()
    
    def _ensure_bucket_exists(self):
        """Verifica se o bucket existe, se não existir, cria"""
        try:
            bucket = self.client.bucket(self.bucket_name)
            if not bucket.exists():
                print(f"Criando bucket: {self.bucket_name}")
                bucket = self.client.create_bucket(self.bucket_name)
                print(f"Bucket criado com sucesso: {self.bucket_name}")
            else:
                print(f"Bucket já existe: {self.bucket_name}")
        except Exception as e:
            print(f"Erro ao verificar/criar bucket: {e}")
            raise e
    
    def _generate_unique_filename(self, original_filename: str) -> str:
        """Gera um nome único para o arquivo"""
        # Extrair extensão do arquivo original
        file_extension = os.path.splitext(original_filename)[1].lower()
        
        # Gerar UUID único
        unique_id = str(uuid.uuid4())
        
        # Criar nome do arquivo com timestamp e UUID
        from datetime import datetime
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        return f"events/{timestamp}_{unique_id}{file_extension}"
    
    def _resize_image(self, image_data: bytes, max_width: int = 1200, max_height: int = 800) -> bytes:
        """Redimensiona a imagem mantendo a proporção"""
        try:
            # Abrir imagem
            image = Image.open(io.BytesIO(image_data))
            
            # Converter para RGB se necessário (para JPEG)
            if image.mode in ('RGBA', 'LA', 'P'):
                image = image.convert('RGB')
            
            # Calcular novo tamanho mantendo proporção
            width, height = image.size
            
            if width > max_width or height > max_height:
                # Calcular proporção
                ratio = min(max_width / width, max_height / height)
                new_width = int(width * ratio)
                new_height = int(height * ratio)
                
                # Redimensionar
                image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Salvar em buffer
            output = io.BytesIO()
            image.save(output, format='JPEG', quality=85, optimize=True)
            output.seek(0)
            
            return output.getvalue()
        
        except Exception as e:
            print(f"Erro ao redimensionar imagem: {e}")
            # Se houver erro, retorna a imagem original
            return image_data
    
    async def upload_image(self, file_data: bytes, original_filename: str, content_type: str = "image/jpeg") -> Optional[str]:
        """
        Faz upload de uma imagem para o Google Cloud Storage
        
        Args:
            file_data: Dados binários da imagem
            original_filename: Nome original do arquivo
            content_type: Tipo de conteúdo da imagem
            
        Returns:
            URL pública da imagem ou None se houver erro
        """
        try:
            # Gerar nome único para o arquivo
            filename = self._generate_unique_filename(original_filename)
            
            # Redimensionar imagem se necessário
            processed_data = self._resize_image(file_data)
            
            # Obter bucket
            bucket = self.client.bucket(self.bucket_name)
            
            # Criar blob (arquivo)
            blob = bucket.blob(filename)
            
            # Configurar metadados
            blob.content_type = content_type
            blob.metadata = {
                'original_filename': original_filename,
                'uploaded_at': str(uuid.uuid4()),
                'service': 'ticketmetal'
            }
            
            # Fazer upload
            blob.upload_from_string(
                processed_data,
                content_type=content_type
            )
            
            # Tornar o arquivo público
            blob.make_public()
            
            # Retornar URL pública
            public_url = blob.public_url
            print(f"Imagem enviada com sucesso: {public_url}")
            
            return public_url
            
        except Exception as e:
            print(f"Erro ao fazer upload da imagem: {e}")
            return None
    
    async def delete_image(self, image_url: str) -> bool:
        """
        Deleta uma imagem do Google Cloud Storage
        
        Args:
            image_url: URL da imagem a ser deletada
            
        Returns:
            True se deletado com sucesso, False caso contrário
        """
        try:
            # Extrair nome do arquivo da URL
            filename = image_url.split('/')[-1]
            
            # Obter bucket
            bucket = self.client.bucket(self.bucket_name)
            
            # Obter blob
            blob = bucket.blob(f"events/{filename}")
            
            # Deletar arquivo
            blob.delete()
            
            print(f"Imagem deletada com sucesso: {filename}")
            return True
            
        except Exception as e:
            print(f"Erro ao deletar imagem: {e}")
            return False
    
    async def list_images(self, prefix: str = "events/") -> list:
        """
        Lista todas as imagens no bucket
        
        Args:
            prefix: Prefixo para filtrar arquivos
            
        Returns:
            Lista de URLs das imagens
        """
        try:
            bucket = self.client.bucket(self.bucket_name)
            blobs = bucket.list_blobs(prefix=prefix)
            
            image_urls = []
            for blob in blobs:
                if blob.public_url:
                    image_urls.append(blob.public_url)
            
            return image_urls
            
        except Exception as e:
            print(f"Erro ao listar imagens: {e}")
            return []

# Instância global do serviço
gcp_storage_service = GCPStorageService()

