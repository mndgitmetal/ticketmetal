import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Star, Clock, ArrowRight, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  address: string;
  city: string;
  state: string;
  price: number;
  image: string;
  ticketsSold: number;
  maxTickets: number;
  rating: number;
  organizer: string;
  salesEndDate: string;
}

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      // Simulação de dados - em produção, fazer chamada para API
      const mockEvent: Event = {
        id: 1,
        title: 'METAL FEST 2024',
        description: 'O maior festival de metal do ano com bandas lendárias e novas revelações do cenário underground. Uma experiência brutal com os melhores shows, food trucks metal, e muito mais headbanging!',
        date: '2024-03-15T20:00:00',
        location: 'Arena Underground',
        address: 'Av. Metal, 666',
        city: 'São Paulo',
        state: 'SP',
        price: 80.00,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        ticketsSold: 450,
        maxTickets: 500,
        rating: 4.9,
        organizer: 'Metal Productions',
        salesEndDate: '2024-03-14T23:59:59'
      };
      
      setEvent(mockEvent);
    } catch (error) {
      toast.error('Erro ao carregar evento');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyTickets = () => {
    if (!event) return;
    
    const totalPrice = event.price * quantity;
    toast.success(`${quantity} ingresso(s) adicionado(s) ao carrinho! Total: R$ ${totalPrice.toFixed(2)}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          text: event?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-black metal-text text-red-400 mb-4">EVENTO NÃO ENCONTRADO</h2>
          <Link to="/events" className="btn-primary">
            VOLTAR PARA EVENTOS
          </Link>
        </div>
      </div>
    );
  }

  const ticketsAvailable = event.maxTickets - event.ticketsSold;
  const occupancyRate = (event.ticketsSold / event.maxTickets) * 100;
  const isSalesActive = new Date() < new Date(event.salesEndDate);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>INÍCIO</Link>
            <span className="text-red-400">/</span>
            <Link to="/events" className="hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>EVENTOS</Link>
            <span className="text-red-400">/</span>
            <span className="text-gray-300 metal-text">{event.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Info */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="relative mb-6">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded-full flex items-center space-x-1 metal-border">
                  <Star className="w-4 h-4 text-red-400 fill-current" />
                  <span className="text-sm font-bold text-red-400">{event.rating}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="absolute top-4 left-4 bg-black/80 p-2 rounded-full hover:bg-black transition-all duration-300 metal-border"
                >
                  <Share2 className="w-5 h-5 text-red-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-black metal-text text-red-400 mb-4">{event.title}</h1>
                  <p className="text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{event.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>DATA E HORA</p>
                        <p className="font-bold text-gray-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {new Date(event.date).toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>LOCAL</p>
                        <p className="font-bold text-gray-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{event.location}</p>
                        <p className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{event.address}</p>
                        <p className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{event.city} - {event.state}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>ORGANIZADOR</p>
                        <p className="font-bold text-gray-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{event.organizer}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>VENDAS ATÉ</p>
                        <p className="font-bold text-gray-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {new Date(event.salesEndDate).toLocaleDateString('pt-BR', {
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

                {/* Ticket Availability */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 metal-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-300" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>INGRESSOS DISPONÍVEIS</span>
                    <span className="text-sm text-red-400 font-bold">{ticketsAvailable} de {event.maxTickets}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full"
                      style={{ width: `${occupancyRate}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {occupancyRate.toFixed(1)}% dos ingressos vendidos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-black metal-text text-red-400 mb-2">
                  R$ {event.price.toFixed(2)}
                </div>
                <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>POR INGRESSO</p>
              </div>

              {isSalesActive ? (
                <div className="space-y-4">
                  <div>
                    <label className="label">Quantidade</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-black transition-all duration-300 text-red-400 font-bold"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold w-8 text-center text-gray-200">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(ticketsAvailable, quantity + 1))}
                        className="w-10 h-10 border border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-black transition-all duration-300 text-red-400 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      MÁXIMO: {ticketsAvailable} INGRESSOS
                    </p>
                  </div>

                  <div className="border-t border-red-500/30 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-gray-300" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>TOTAL:</span>
                      <span className="text-2xl font-black metal-text text-red-400">
                        R$ {(event.price * quantity).toFixed(2)}
                      </span>
                    </div>

                    <Link
                      to={`/checkout/${event.id}?quantity=${quantity}`}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <span>COMPRAR INGRESSOS</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-red-400 font-black metal-text mb-2">VENDAS ENCERRADAS</div>
                  <p className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    As vendas para este evento foram encerradas
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-red-500/30">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>PAGAMENTO SEGURO</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center metal-glow">
                      <span className="text-white text-xs font-bold">MP</span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center metal-glow">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
