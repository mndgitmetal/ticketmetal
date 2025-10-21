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
        title: 'Festival de Música 2024',
        description: 'O maior festival de música do ano com artistas nacionais e internacionais. Uma experiência única com os melhores shows, food trucks, e muito mais!',
        date: '2024-03-15T20:00:00',
        location: 'Parque da Cidade',
        address: 'Av. Paulista, 1000',
        city: 'São Paulo',
        state: 'SP',
        price: 50.00,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        ticketsSold: 450,
        maxTickets: 500,
        rating: 4.8,
        organizer: 'Eventos SP',
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Evento não encontrado</h2>
          <Link to="/events" className="btn-primary">
            Voltar para Eventos
          </Link>
        </div>
      </div>
    );
  }

  const ticketsAvailable = event.maxTickets - event.ticketsSold;
  const occupancyRate = (event.ticketsSold / event.maxTickets) * 100;
  const isSalesActive = new Date() < new Date(event.salesEndDate);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Início</Link>
            <span>/</span>
            <Link to="/events" className="hover:text-blue-600">Eventos</Link>
            <span>/</span>
            <span className="text-gray-900">{event.title}</span>
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
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{event.rating}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="absolute top-4 left-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200"
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                  <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Data e Hora</p>
                        <p className="font-medium text-gray-900">
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
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Local</p>
                        <p className="font-medium text-gray-900">{event.location}</p>
                        <p className="text-sm text-gray-600">{event.address}</p>
                        <p className="text-sm text-gray-600">{event.city} - {event.state}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Organizador</p>
                        <p className="font-medium text-gray-900">{event.organizer}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Vendas até</p>
                        <p className="font-medium text-gray-900">
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
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Ingressos Disponíveis</span>
                    <span className="text-sm text-gray-600">{ticketsAvailable} de {event.maxTickets}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${occupancyRate}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
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
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  R$ {event.price.toFixed(2)}
                </div>
                <p className="text-gray-600">por ingresso</p>
              </div>

              {isSalesActive ? (
                <div className="space-y-4">
                  <div>
                    <label className="label">Quantidade</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(ticketsAvailable, quantity + 1))}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Máximo: {ticketsAvailable} ingressos
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        R$ {(event.price * quantity).toFixed(2)}
                      </span>
                    </div>

                    <Link
                      to={`/checkout/${event.id}?quantity=${quantity}`}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <span>Comprar Ingressos</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-red-600 font-medium mb-2">Vendas Encerradas</div>
                  <p className="text-sm text-gray-600">
                    As vendas para este evento foram encerradas
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Pagamento seguro</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MP</span>
                    </div>
                    <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
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
