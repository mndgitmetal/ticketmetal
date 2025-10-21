import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign, Download, BarChart3 } from 'lucide-react';

const EventDetails: React.FC = () => {
  const { id } = useParams();
  
  // Dados mockados - em produção, buscar da API
  const event = {
    id: 1,
    title: 'Festival de Música 2024',
    description: 'O maior festival de música do ano com artistas nacionais e internacionais.',
    date: '2024-03-15T20:00:00',
    location: 'Parque da Cidade',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    max_tickets: 500,
    price: 50.00,
    is_active: true,
    tickets_sold: 450,
    created_at: '2024-01-15T10:00:00'
  };

  const stats = {
    tickets_sold: 450,
    tickets_available: 50,
    total_revenue: 22500,
    occupancy_rate: 90
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
            <p className="text-gray-600">{event.description}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.is_active
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {event.is_active ? 'Ativo' : 'Inativo'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Data do Evento</p>
              <p className="font-semibold text-gray-900">
                {new Date(event.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Local</p>
              <p className="font-semibold text-gray-900">
                {event.location}, {event.city} - {event.state}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ingressos Vendidos</p>
              <p className="font-semibold text-gray-900">
                {stats.tickets_sold}/{event.max_tickets}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Preço</p>
              <p className="font-semibold text-gray-900">
                R$ {event.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estatísticas */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Estatísticas
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Taxa de Ocupação</span>
                <span>{stats.occupancy_rate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${stats.occupancy_rate}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{stats.tickets_sold}</p>
                <p className="text-sm text-gray-600">Vendidos</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{stats.tickets_available}</p>
                <p className="text-sm text-gray-600">Disponíveis</p>
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                R$ {stats.total_revenue.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-600">Receita Total</p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações</h2>
          
          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Baixar Relatório PDF</span>
            </button>
            
            <button className="w-full btn-secondary flex items-center justify-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Ver Relatório Detalhado</span>
            </button>
            
            <button className="w-full btn-secondary flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Listar Compradores</span>
            </button>
          </div>
        </div>
      </div>

      {/* Informações Detalhadas */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Detalhadas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Endereço Completo</h3>
            <p className="text-gray-600">
              {event.address}<br />
              {event.city} - {event.state}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Data de Criação</h3>
            <p className="text-gray-600">
              {new Date(event.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
