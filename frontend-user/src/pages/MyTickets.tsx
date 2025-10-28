import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Download, QrCode } from 'lucide-react';
import { apiService } from './api.ts';

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      // Por enquanto, usar dados mockados até implementar autenticação
      const mockTickets = [
        {
          id: 1,
          eventTitle: 'METAL FEST 2024',
          date: '2024-03-15T20:00:00',
          location: 'Arena Underground',
          city: 'São Paulo',
          state: 'SP',
          ticketNumber: 'TM00010001',
          qrCode: 'TICKETMETAL:abc123def456',
          price: 80.00,
          status: 'active',
          purchasedAt: '2024-01-15T10:30:00'
        },
        {
          id: 2,
          eventTitle: 'DEATH METAL WORKSHOP',
          date: '2024-03-20T14:00:00',
          location: 'Studio Hell',
          city: 'Rio de Janeiro',
          state: 'RJ',
          ticketNumber: 'TM00020001',
          qrCode: 'TICKETMETAL:xyz789uvw012',
          price: 60.00,
          status: 'used',
          purchasedAt: '2024-01-20T15:45:00'
        }
      ];
      
      setTickets(mockTickets);
    } catch (error) {
      console.error('Erro ao carregar ingressos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-red-600 to-orange-600 text-white';
      case 'used':
        return 'bg-gradient-to-r from-gray-600 to-gray-800 text-white';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-800 to-red-900 text-white';
      default:
        return 'bg-gradient-to-r from-gray-600 to-gray-800 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'ATIVO';
      case 'used':
        return 'UTILIZADO';
      case 'cancelled':
        return 'CANCELADO';
      default:
        return 'DESCONHECIDO';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black metal-text text-red-400 mb-4">MEUS INGRESSOS</h1>
          <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Gerencie seus ingressos e baixe os comprovantes
          </p>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-black metal-text text-red-400 mb-2">
              NENHUM INGRESSO ENCONTRADO
            </h3>
            <p className="text-gray-300 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Você ainda não possui ingressos comprados
            </p>
            <a href="/eventos" className="btn-primary">
              EXPLORAR EVENTOS
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-red-400 mb-2 metal-text">
                      {ticket.eventTitle}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-red-400" />
                        {new Date(ticket.date).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-red-400" />
                        {ticket.location}, {ticket.city} - {ticket.state}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold metal-glow ${getStatusColor(ticket.status)}`}
                  >
                    {getStatusText(ticket.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>NÚMERO DO INGRESSO</p>
                      <p className="font-mono text-lg font-bold text-red-400 metal-text">
                        {ticket.ticketNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>VALOR PAGO</p>
                      <p className="text-lg font-black metal-text text-red-400">
                        R$ {ticket.price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>DATA DA COMPRA</p>
                      <p className="text-gray-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
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
                      <div className="w-32 h-32 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mx-auto mb-2 metal-border">
                        <QrCode className="w-16 h-16 text-red-400" />
                      </div>
                      <p className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        QR CODE PARA ENTRADA
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>BAIXAR PDF</span>
                      </button>
                      <button className="btn-secondary flex items-center justify-center">
                        <QrCode className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {ticket.status === 'active' && (
                  <div className="mt-6 pt-6 border-t border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-4 metal-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <p className="text-sm text-red-400 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>
                        INGRESSO VÁLIDO PARA ENTRADA NO EVENTO
                      </p>
                    </div>
                    <p className="text-xs text-gray-300 mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      Apresente este ingresso na entrada do evento. O QR Code será escaneado para validação.
                    </p>
                  </div>
                )}

                {ticket.status === 'used' && (
                  <div className="mt-6 pt-6 border-t border-gray-500/30 bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-lg p-4 metal-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>
                        INGRESSO UTILIZADO COM SUCESSO
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
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
