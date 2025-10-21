import React from 'react';
import { Calendar, MapPin, Download, QrCode } from 'lucide-react';

const MyTickets: React.FC = () => {
  // Dados mockados para demonstração
  const tickets = [
    {
      id: 1,
      eventTitle: 'Festival de Música 2024',
      date: '2024-03-15T20:00:00',
      location: 'Parque da Cidade',
      city: 'São Paulo',
      state: 'SP',
      ticketNumber: 'TM00010001',
      qrCode: 'TICKETMETAL:abc123def456',
      price: 50.00,
      status: 'active',
      purchasedAt: '2024-01-15T10:30:00'
    },
    {
      id: 2,
      eventTitle: 'Workshop de Tecnologia',
      date: '2024-03-20T14:00:00',
      location: 'Centro de Convenções',
      city: 'Rio de Janeiro',
      state: 'RJ',
      ticketNumber: 'TM00020001',
      qrCode: 'TICKETMETAL:xyz789uvw012',
      price: 30.00,
      status: 'used',
      purchasedAt: '2024-01-20T15:45:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'used':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'used':
        return 'Utilizado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Meus Ingressos</h1>
          <p className="text-gray-600">
            Gerencie seus ingressos e baixe os comprovantes
          </p>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum ingresso encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Você ainda não possui ingressos comprados
            </p>
            <a href="/events" className="btn-primary">
              Explorar Eventos
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {ticket.eventTitle}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(ticket.date).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {ticket.location}, {ticket.city} - {ticket.state}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}
                  >
                    {getStatusText(ticket.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Número do Ingresso</p>
                      <p className="font-mono text-lg font-medium text-gray-900">
                        {ticket.ticketNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Valor Pago</p>
                      <p className="text-lg font-semibold text-green-600">
                        R$ {ticket.price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Data da Compra</p>
                      <p className="text-gray-900">
                        {new Date(ticket.purchasedAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-600">
                        QR Code para entrada
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Baixar PDF</span>
                      </button>
                      <button className="btn-secondary flex items-center justify-center">
                        <QrCode className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {ticket.status === 'active' && (
                  <div className="mt-6 pt-6 border-t bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <p className="text-sm text-blue-800 font-medium">
                        Ingresso válido para entrada no evento
                      </p>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      Apresente este ingresso na entrada do evento. O QR Code será escaneado para validação.
                    </p>
                  </div>
                )}

                {ticket.status === 'used' && (
                  <div className="mt-6 pt-6 border-t bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <p className="text-sm text-green-800 font-medium">
                        Ingresso utilizado com sucesso
                      </p>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Este ingresso foi utilizado para entrada no evento.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
