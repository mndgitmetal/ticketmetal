import os
from supabase import create_client, Client
from typing import Optional, Dict, Any, List
from datetime import datetime
import json

class SupabaseClient:
    def __init__(self):
        self.url = os.getenv("SUPABASE_URL")
        self.key = os.getenv("SUPABASE_KEY")
        
        if not self.url or not self.key:
            raise ValueError("SUPABASE_URL e SUPABASE_KEY devem estar definidas nas variáveis de ambiente")
        
        self.client: Client = create_client(self.url, self.key)
    
    def _serialize_datetime(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Converte objetos datetime para string"""
        serialized = {}
        for key, value in data.items():
            if isinstance(value, datetime):
                serialized[key] = value.isoformat()
            else:
                serialized[key] = value
        return serialized
    
    # Métodos para Usuários
    async def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Cria um novo usuário"""
        try:
            serialized_data = self._serialize_datetime(user_data)
            result = self.client.table('users').insert(serialized_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao criar usuário: {e}")
            raise e
    
    async def get_user(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Busca um usuário por ID"""
        try:
            result = self.client.table('users').select('*').eq('id', user_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao buscar usuário: {e}")
            raise e
    
    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Busca um usuário por email"""
        try:
            result = self.client.table('users').select('*').eq('email', email).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao buscar usuário por email: {e}")
            raise e
    
    async def update_user(self, user_id: int, user_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Atualiza um usuário"""
        try:
            serialized_data = self._serialize_datetime(user_data)
            result = self.client.table('users').update(serialized_data).eq('id', user_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao atualizar usuário: {e}")
            raise e
    
    async def delete_user(self, user_id: int) -> bool:
        """Deleta um usuário"""
        try:
            result = self.client.table('users').delete().eq('id', user_id).execute()
            return True
        except Exception as e:
            print(f"Erro ao deletar usuário: {e}")
            raise e
    
    # Métodos para Eventos
    async def create_event(self, event_data: Dict[str, Any]) -> Dict[str, Any]:
        """Cria um novo evento"""
        try:
            serialized_data = self._serialize_datetime(event_data)
            result = self.client.table('events').insert(serialized_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao criar evento: {e}")
            raise e
    
    async def get_event(self, event_id: int) -> Optional[Dict[str, Any]]:
        """Busca um evento por ID"""
        try:
            result = self.client.table('events').select('*').eq('id', event_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao buscar evento: {e}")
            raise e
    
    async def get_events(self, limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
        """Busca todos os eventos com paginação"""
        try:
            result = self.client.table('events').select('*').range(offset, offset + limit - 1).execute()
            return result.data if result.data else []
        except Exception as e:
            print(f"Erro ao buscar eventos: {e}")
            raise e
    
    async def get_events_by_organizer(self, organizer_id: int) -> List[Dict[str, Any]]:
        """Busca eventos por organizador"""
        try:
            result = self.client.table('events').select('*').eq('organizer_id', organizer_id).execute()
            return result.data if result.data else []
        except Exception as e:
            print(f"Erro ao buscar eventos por organizador: {e}")
            raise e
    
    async def update_event(self, event_id: int, event_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Atualiza um evento"""
        try:
            serialized_data = self._serialize_datetime(event_data)
            result = self.client.table('events').update(serialized_data).eq('id', event_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao atualizar evento: {e}")
            raise e
    
    async def delete_event(self, event_id: int) -> bool:
        """Deleta um evento"""
        try:
            result = self.client.table('events').delete().eq('id', event_id).execute()
            return True
        except Exception as e:
            print(f"Erro ao deletar evento: {e}")
            raise e
    
    # Métodos para Ingressos
    async def create_ticket(self, ticket_data: Dict[str, Any]) -> Dict[str, Any]:
        """Cria um novo ingresso"""
        try:
            result = self.client.table('tickets').insert(ticket_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao criar ingresso: {e}")
            raise e
    
    async def get_ticket(self, ticket_id: int) -> Optional[Dict[str, Any]]:
        """Busca um ingresso por ID"""
        try:
            result = self.client.table('tickets').select('*').eq('id', ticket_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao buscar ingresso: {e}")
            raise e
    
    async def get_tickets_by_user(self, user_id: int) -> List[Dict[str, Any]]:
        """Busca ingressos por usuário"""
        try:
            result = self.client.table('tickets').select('*, events(*)').eq('user_id', user_id).execute()
            return result.data if result.data else []
        except Exception as e:
            print(f"Erro ao buscar ingressos por usuário: {e}")
            raise e
    
    async def get_tickets_by_event(self, event_id: int) -> List[Dict[str, Any]]:
        """Busca ingressos por evento"""
        try:
            result = self.client.table('tickets').select('*, users(*)').eq('event_id', event_id).execute()
            return result.data if result.data else []
        except Exception as e:
            print(f"Erro ao buscar ingressos por evento: {e}")
            raise e
    
    async def update_ticket(self, ticket_id: int, ticket_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Atualiza um ingresso"""
        try:
            serialized_data = self._serialize_datetime(ticket_data)
            result = self.client.table('tickets').update(serialized_data).eq('id', ticket_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Erro ao atualizar ingresso: {e}")
            raise e
    
    async def delete_ticket(self, ticket_id: int) -> bool:
        """Deleta um ingresso"""
        try:
            result = self.client.table('tickets').delete().eq('id', ticket_id).execute()
            return True
        except Exception as e:
            print(f"Erro ao deletar ingresso: {e}")
            raise e
    
    # Métodos para Estatísticas
    async def get_event_stats(self, event_id: int) -> Dict[str, Any]:
        """Busca estatísticas de um evento"""
        try:
            # Busca o evento
            event = await self.get_event(event_id)
            if not event:
                return {}
            
            # Busca ingressos vendidos
            tickets_result = self.client.table('tickets').select('id').eq('event_id', event_id).execute()
            tickets_sold = len(tickets_result.data) if tickets_result.data else 0
            
            # Calcula receita
            revenue = tickets_sold * event.get('price', 0)
            
            return {
                'event_id': event_id,
                'tickets_sold': tickets_sold,
                'max_tickets': event.get('max_tickets', 0),
                'revenue': revenue,
                'occupancy_rate': (tickets_sold / event.get('max_tickets', 1)) * 100 if event.get('max_tickets', 0) > 0 else 0
            }
        except Exception as e:
            print(f"Erro ao buscar estatísticas do evento: {e}")
            raise e
    
    # Métodos para Eventos Rock (Agregador)
    async def get_rock_events(self, limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
        """Busca eventos da tabela eventos_rock (agregador de eventos externos)"""
        try:
            # Busca eventos que ainda vão acontecer (data_formatada >= agora)
            from datetime import datetime, timezone
            now = datetime.now(timezone.utc)
            
            result = self.client.table('eventos_rock')\
                .select('*')\
                .gte('data_formatada', now.isoformat())\
                .order('data_formatada', desc=False)\
                .range(offset, offset + limit - 1)\
                .execute()
            
            return result.data if result.data else []
        except Exception as e:
            print(f"Erro ao buscar eventos rock: {e}")
            raise e

# Instância global do cliente Supabase
supabase_client = SupabaseClient()
