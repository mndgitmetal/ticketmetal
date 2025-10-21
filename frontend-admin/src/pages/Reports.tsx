import React from 'react';
import { Calendar, Users, DollarSign, TrendingUp, Download } from 'lucide-react';

const Reports: React.FC = () => {
  // Dados mockados para demonstração
  const events = [
    {
      id: 1,
      title: 'Festival de Música 2024',
      date: '2024-03-15',
      tickets_sold: 450,
      max_tickets: 500,
      revenue: 22500,
      occupancy_rate: 90
    },
    {
      id: 2,
      title: 'Workshop de Tecnologia',
      date: '2024-03-20',
      tickets_sold: 120,
      max_tickets: 150,
      revenue: 3600,
      occupancy_rate: 80
    },
    {
      id: 3,
      title: 'Conferência de Negócios',
      date: '2024-03-25',
      tickets_sold: 200,
      max_tickets: 300,
      revenue: 8000,
      occupancy_rate: 67
    }
  ];

  const totalStats = {
    totalEvents: events.length,
    totalTicketsSold: events.reduce((sum, event) => sum + event.tickets_sold, 0),
    totalRevenue: events.reduce((sum, event) => sum + event.revenue, 0),
    averageOccupancy: events.reduce((sum, event) => sum + event.occupancy_rate, 0) / events.length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600 mt-1">Análise completa dos seus eventos</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Exportar Relatório</span>
        </button>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Eventos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalStats.totalEvents}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingressos Vendidos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalStats.totalTicketsSold}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                R$ {totalStats.totalRevenue.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ocupação Média</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {totalStats.averageOccupancy.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Relatório por Evento */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Relatório por Evento</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Evento</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Vendas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Ocupação</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Receita</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {event.tickets_sold}/{event.max_tickets} ingressos
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
                          width: `${event.occupancy_rate}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {event.occupancy_rate}%
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.occupancy_rate >= 80
                          ? 'bg-green-100 text-green-800'
                          : event.occupancy_rate >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {event.occupancy_rate >= 80 ? 'Excelente' : 
                       event.occupancy_rate >= 60 ? 'Boa' : 'Baixa'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    R$ {event.revenue.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita por Evento</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Gráfico de barras seria exibido aqui</p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Taxa de Ocupação</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Gráfico de pizza seria exibido aqui</p>
          </div>
        </div>
      </div>

      {/* Resumo Executivo */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumo Executivo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Pontos Positivos</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Taxa de ocupação média de {totalStats.averageOccupancy.toFixed(1)}%</li>
              <li>• Receita total de R$ {totalStats.totalRevenue.toLocaleString('pt-BR')}</li>
              <li>• {totalStats.totalTicketsSold} ingressos vendidos</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Recomendações</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Aumentar marketing para eventos com baixa ocupação</li>
              <li>• Considerar ajustes de preço baseado na demanda</li>
              <li>• Expandir para novos tipos de eventos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
