// API Service - Updated for production deployment
// This service handles all API calls to the backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Force cache busting
const CACHE_BUST = Date.now();

console.log('API_BASE_URL:', API_BASE_URL);

class ApiService {
  // Métodos para Usuários
  async createUser(userData: any) {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao criar usuário');
    }
    
    return response.json();
  }

  async getUser(userId: number) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }
    
    return response.json();
  }

  async getUserByEmail(email: string) {
    const response = await fetch(`${API_BASE_URL}/users/email/${email}`);
    
    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }
    
    return response.json();
  }

  // Métodos para Eventos
  async getEvents(limit: number = 50, offset: number = 0) {
    const response = await fetch(`${API_BASE_URL}/events/?limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }
    
    return response.json();
  }

  async getEvent(eventId: number) {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    
    if (!response.ok) {
      throw new Error('Evento não encontrado');
    }
    
    return response.json();
  }

  // Métodos para Ingressos
  async createTicket(ticketData: any) {
    const response = await fetch(`${API_BASE_URL}/tickets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao criar ingresso');
    }
    
    return response.json();
  }

  async getTicketsByUser(userId: number) {
    const response = await fetch(`${API_BASE_URL}/tickets/user/${userId}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar ingressos do usuário');
    }
    
    return response.json();
  }

  // Método para gerar PDF do ingresso
  async generateTicketPdf(ticketId: number) {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/pdf`);
    
    if (!response.ok) {
      throw new Error('Erro ao gerar PDF do ingresso');
    }
    
    return response.blob();
  }

  // Método para verificar saúde da API
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error('API não está funcionando');
    }
    
    return response.json();
  }
}

export const apiService = new ApiService();
