const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

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
  // MODO AGREGADOR: Usa eventos_rock em vez de events (temporário enquanto não temos eventos próprios)
  async getEvents(limit: number = 50, offset: number = 0) {
    // NOVO ENDPOINT para eventos rock (agregador)
    const response = await fetch(`${API_BASE_URL}/events/rock/?limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }
    
    return response.json();
  }

  // Método antigo mantido para referência futura
  // async getEvents(limit: number = 50, offset: number = 0) {
  //   const response = await fetch(`${API_BASE_URL}/events/?limit=${limit}&offset=${offset}`);
  //   
  //   if (!response.ok) {
  //     throw new Error('Erro ao buscar eventos');
  //   }
  //   
  //   return response.json();
  // }

  async getEvent(eventId: number) {
    // TEMPORÁRIO: Para eventos externos, não buscamos detalhes por ID
    // Retorna null para indicar que é evento externo
    return null;
    
    // Código original comentado para quando formos usar eventos próprios
    // const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    // 
    // if (!response.ok) {
    //   throw new Error('Evento não encontrado');
    // }
    // 
    // return response.json();
  }

  // Métodos para Ingressos
  // TEMPORÁRIO: Funcionalidades de compra desabilitadas no modo agregador
  // Os eventos externos redirecionam para o link de compra original
  async createTicket(ticketData: any) {
    throw new Error('Funcionalidade de compra desabilitada no modo agregador');
    
    // Código original comentado para quando formos usar eventos próprios
    // const response = await fetch(`${API_BASE_URL}/tickets/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(ticketData),
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Erro ao criar ingresso');
    // }
    // 
    // return response.json();
  }

  async getTicketsByUser(userId: number) {
    // Retorna array vazio no modo agregador
    return [];
    
    // Código original comentado para quando formos usar eventos próprios
    // const response = await fetch(`${API_BASE_URL}/tickets/user/${userId}`);
    // 
    // if (!response.ok) {
    //   throw new Error('Erro ao buscar ingressos do usuário');
    // }
    // 
    // return response.json();
  }

  // Método para gerar PDF do ingresso
  async generateTicketPdf(ticketId: number) {
    throw new Error('Funcionalidade de PDF desabilitada no modo agregador');
    
    // Código original comentado para quando formos usar eventos próprios
    // const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/pdf`);
    // 
    // if (!response.ok) {
    //   throw new Error('Erro ao gerar PDF do ingresso');
    // }
    // 
    // return response.blob();
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
