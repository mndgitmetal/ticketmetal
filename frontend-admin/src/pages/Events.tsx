import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2, Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  city: string;
  state: string;
  max_tickets: number;
  price: number;
  is_active: boolean;
  tickets_sold: number;
  created_at: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Simulação de dados - em produção, fazer chamada para API
      const mockEvents: Event[] = [
        {
          id: 1,
          title: 'Festival de Música 2024',
          description: 'O maior festival de música do ano',
          date: '2024-03-15T20:00:00',
          location: 'Parque da Cidade',
          city: 'São Paulo',
          state: 'SP',
          max_tickets: 500,
          price: 50.00,
          is_active: true,
          tickets_sold: 450,
          created_at: '2024-01-15T10:00:00'
        },
        {
          id: 2,
          title: 'Workshop de Tecnologia',
          description: 'Aprenda as últimas tendências em tecnologia',
          date: '2024-03-20T14:00:00',
          location: 'Centro de Convenções',
          city: 'Rio de Janeiro',
          state: 'RJ',
          max_tickets: 150,
          price: 30.00,
          is_active: true,
          tickets_sold: 120,
          created_at: '2024-01-20T10:00:00'
        },
        {
          id: 3,
          title: 'Conferência de Negócios',
          description: 'Networking e palestras sobre empreendedorismo',
          date: '2024-03-25T09:00:00',
          location: 'Hotel Plaza',
          city: 'Belo Horizonte',
          state: 'MG',
          max_tickets: 300,
          price: 40.00,
          is_active: false,
          tickets_sold: 200,
          created_at: '2024-01-25T10:00:00'
        }
      ];
      
      setEvents(mockEvents);
    } catch (error) {
      toast.error('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        // Simulação de exclusão - em produção, fazer chamada para API
        setEvents(events.filter(event => event.id !== eventId));
        toast.success('Evento excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir evento');
      }
    }
  };

  const toggleEventStatus = async (eventId: number) => {
    try {
      // Simulação de toggle - em produção, fazer chamada para API
      setEvents(events.map(event => 
        event.id === eventId 
          ? { ...event, is_active: !event.is_active }
          : event
      ));
      toast.success('Status do evento atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar status do evento');
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os seus eventos</p>
        </div>
        <Link
          to="/events/new"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Evento</span>
        </Link>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary">Todos</button>
            <button className="btn-secondary">Ativos</button>
            <button className="btn-secondary">Inativos</button>
          </div>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {event.description}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {event.is_active ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(event.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}, {event.city} - {event.state}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                {event.tickets_sold}/{event.max_tickets} ingressos vendidos
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                R$ {event.price.toFixed(2)}
              </div>
            </div>

            {/* Barra de Progresso */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Vendas</span>
                <span>{Math.round((event.tickets_sold / event.max_tickets) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(event.tickets_sold / event.max_tickets) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Link
                  to={`/events/${event.id}`}
                  className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="Ver detalhes"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  to={`/events/${event.id}/edit`}
                  className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  title="Editar"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => toggleEventStatus(event.id)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    event.is_active
                      ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'
                      : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                  title={event.is_active ? 'Desativar' : 'Ativar'}
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Tente ajustar os filtros de busca' : 'Comece criando seu primeiro evento'}
          </p>
          {!searchTerm && (
            <Link to="/events/new" className="btn-primary">
              Criar Primeiro Evento
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
