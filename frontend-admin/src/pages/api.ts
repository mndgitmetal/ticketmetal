const API_BASE_URL = 'http://localhost:8000/api';

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

  async updateUser(userId: number, userData: any) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar usuário');
    }
    
    return response.json();
  }

  async deleteUser(userId: number) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Erro ao deletar usuário');
    }
    
    return response.json();
  }

  // Métodos para Eventos
  async createEvent(eventData: any) {
    const response = await fetch(`${API_BASE_URL}/events/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao criar evento');
    }
    
    return response.json();
  }

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

  async getEventsByOrganizer(organizerId: number) {
    const response = await fetch(`${API_BASE_URL}/events/organizer/${organizerId}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar eventos do organizador');
    }
    
    return response.json();
  }

  async updateEvent(eventId: number, eventData: any) {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar evento');
    }
    
    return response.json();
  }

  async deleteEvent(eventId: number) {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Erro ao deletar evento');
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

  async getTicket(ticketId: number) {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`);
    
    if (!response.ok) {
      throw new Error('Ingresso não encontrado');
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

  async getTicketsByEvent(eventId: number) {
    const response = await fetch(`${API_BASE_URL}/tickets/event/${eventId}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar ingressos do evento');
    }
    
    return response.json();
  }

  async updateTicket(ticketId: number, ticketData: any) {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar ingresso');
    }
    
    return response.json();
  }

  async deleteTicket(ticketId: number) {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Erro ao deletar ingresso');
    }
    
    return response.json();
  }

  // Métodos para Estatísticas
  async getEventStats(eventId: number) {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/stats`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar estatísticas do evento');
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

  // Métodos para Pagamentos
  async createPayment(paymentData: any) {
    const response = await fetch(`${API_BASE_URL}/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao criar pagamento');
    }
    
    return response.json();
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