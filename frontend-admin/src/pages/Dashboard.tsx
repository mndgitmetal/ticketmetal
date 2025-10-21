import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Eye
} from 'lucide-react';

const Dashboard: React.FC = () => {
  // Dados mockados para demonstração
  const stats = [
    {
      title: 'Total de Eventos',
      value: '12',
      change: '+2 este mês',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Ingressos Vendidos',
      value: '1,234',
      change: '+15% este mês',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Receita Total',
      value: 'R$ 45.678',
      change: '+8% este mês',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Taxa de Conversão',
      value: '78%',
      change: '+3% este mês',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Festival de Música 2024',
      date: '2024-03-15',
      ticketsSold: 450,
      totalTickets: 500,
      revenue: 'R$ 22.500'
    },
    {
      id: 2,
      title: 'Workshop de Tecnologia',
      date: '2024-03-20',
      ticketsSold: 120,
      totalTickets: 150,
      revenue: 'R$ 3.600'
    },
    {
      id: 3,
      title: 'Conferência de Negócios',
      date: '2024-03-25',
      ticketsSold: 200,
      totalTickets: 300,
      revenue: 'R$ 8.000'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral dos seus eventos e vendas</p>
        </div>
        <Link
          to="/events/new"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Evento</span>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Eventos Recentes */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Eventos Recentes</h2>
          <Link
            to="/events"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todos
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Evento</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Vendas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Receita</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event) => (
                <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {event.ticketsSold}/{event.totalTickets} ingressos
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(event.ticketsSold / event.totalTickets) * 100}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {Math.round((event.ticketsSold / event.totalTickets) * 100)}%
                    </p>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {event.revenue}
                  </td>
                  <td className="py-4 px-4">
                    <Link
                      to={`/events/${event.id}`}
                      className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
