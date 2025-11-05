import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowRight, Share2, Music } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiService } from './api.ts';
import EventImage from '../components/EventImage.tsx';

interface Event {
  id: string; // UUID para eventos_rock
  slug: string;
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
  // Campos específicos para eventos_rock
  titulo?: string;
  data_formatada?: string;
  imagem?: string;
  link?: string;
  link_compra?: string;
  preco_min?: number;
  preco_max?: number;
  evento_gratuito?: boolean;
  nome_local?: string;
  endereco?: string;
  descricao?: string;
  artistas?: string;
  generos?: string[];
  hora?: string;
  data_fim?: string;
  fonte?: string;
}

const EventDetails: React.FC = () => {
  const { slug } = useParams();
  const { id } = useParams(); // Fallback para UUID
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const fetchEvent = useCallback(async () => {
    try {
      const identifier = slug || id;
      if (!identifier) return;
      
      console.log('Buscando evento por identificador:', slug || id);
      
      // Buscar todos os eventos e encontrar o evento com slug ou ID correspondente
      const allEvents = await apiService.getEvents(100, 0);
      const eventData = allEvents.find((e: any) => {
        // Usar slug diretamente do banco, ou ID como fallback
        return slug ? e.slug === slug : e.id === id;
      });
      
      console.log('Dados do evento recebidos:', eventData);
      
      if (!eventData) {
        toast.error('Evento não encontrado');
        navigate('/eventos');
        return;
      }
      
      // Usar slug diretamente do banco
      const title = eventData.titulo || eventData.title;
      const eventDate = eventData.data_formatada || eventData.date;
      const eventSlug = eventData.slug; // Usar slug diretamente do banco
      
      // Mapear campos de eventos_rock para o formato esperado
      const mappedEvent = {
        id: eventData.id,
        slug: eventSlug,
        title: title,
        description: eventData.descricao || eventData.description || 'Evento de metal imperdível!',
        date: eventData.data_formatada || eventData.date,
        location: eventData.nome_local || eventData.location || 'Local a definir',
        address: eventData.endereco || eventData.address || '',
        city: eventData.cidade || eventData.city || '',
        state: eventData.estado || eventData.state || '',
        price: eventData.preco_min || eventData.preco_max || eventData.price || 0,
        image: (eventData.imagem && eventData.imagem.trim() !== '' && eventData.imagem !== 'null' && eventData.imagem !== 'undefined') 
          ? eventData.imagem 
          : (eventData.image && eventData.image.trim() !== '' && eventData.image !== 'null' && eventData.image !== 'undefined')
          ? eventData.image
          : '',
        ticketsSold: 0,
        maxTickets: 999,
        rating: 4.8,
        organizer: 'Metal Scene',
        salesEndDate: eventData.data_formatada || eventData.date,
        // Campos adicionais
        link: eventData.link,
        link_compra: eventData.link_compra,
        evento_gratuito: eventData.evento_gratuito,
        artistas: eventData.artistas,
        generos: eventData.generos || [],
        hora: eventData.hora,
        data_fim: eventData.data_fim,
        fonte: eventData.fonte
      };
      
      console.log('Evento processado:', mappedEvent);
      console.log('Data do evento:', mappedEvent.date);
      setEvent(mappedEvent);
    } catch (error: any) {
      console.error('Erro ao carregar evento:', error);
      
      if (error.message === 'Evento não encontrado') {
        toast.error('Evento não encontrado');
        navigate('/eventos');
      } else {
        toast.error('Erro ao carregar evento');
        navigate('/eventos');
      }
    } finally {
      setLoading(false);
    }
  }, [slug, id, navigate]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  // Função para extrair o nome do site pela URL
  const getSiteNameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      
      // Remove www. e extrai o domínio principal
      const cleanHost = hostname.replace('www.', '');
      const domainParts = cleanHost.split('.');
      const siteName = domainParts[0];
      
      // Mapear domínios conhecidos para nomes mais amigáveis
      const siteNameMap: { [key: string]: string } = {
        'sympla': 'SYMPLA',
        'sympla.com.br': 'SYMPLA',
        'eventbrite': 'EVENTBRITE',
        'eventbrite.com.br': 'EVENTBRITE',
        'eventim': 'EVENTIM',
        'eventim.com.br': 'EVENTIM',
        'ingresso': 'INGRESSO RÁPIDO',
        'ingressorapido.com.br': 'INGRESSO RÁPIDO',
        'sujeitohomem': 'SUJEITO HOMEM',
        'sujeitohomem.com.br': 'SUJEITO HOMEM',
        'meucampo': 'MEU CAMPO',
        'meucampo.com.br': 'MEU CAMPO'
      };
      
      // Verifica se o domínio completo está no mapa
      if (siteNameMap[cleanHost]) {
        return siteNameMap[cleanHost];
      }
      
      // Verifica se apenas o primeiro parte está no mapa
      if (siteNameMap[siteName]) {
        return siteNameMap[siteName];
      }
      
      // Se não encontrar, capitaliza o nome do domínio
      return siteName.toUpperCase();
    } catch (error) {
      console.error('Erro ao processar URL:', error);
      return 'EVENTO EXTERNO';
    }
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
          <Link to="/eventos" className="btn-primary">
            VOLTAR PARA EVENTOS
          </Link>
        </div>
      </div>
    );
  }

  const ticketsAvailable = event.maxTickets - event.ticketsSold;
  const isSalesActive = new Date() < new Date(event.salesEndDate);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>INÍCIO</Link>
            <span className="text-red-400">/</span>
            <Link to="/eventos" className="hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>EVENTOS</Link>
            <span className="text-red-400">/</span>
            <span className="text-gray-300 metal-text">{event.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Info */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="relative mb-6">
                <EventImage
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
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
                          {event.date ? new Date(event.date).toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'Data não disponível'}
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

                {/* Additional Info (eventos_rock) */}
                {(event.artistas || (event.generos && event.generos.length > 0) || event.hora) && (
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 metal-border">
                    <h3 className="text-lg font-black metal-text text-red-400 mb-4">INFORMAÇÕES ADICIONAIS</h3>
                    
                    {event.artistas && (
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Music className="w-4 h-4 text-red-400" />
                          <p className="text-sm text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>ARTISTAS</p>
                        </div>
                        <p className="text-gray-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{event.artistas}</p>
                      </div>
                    )}
                    
                    {event.generos && event.generos.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-300 font-bold mb-2" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>GÊNEROS</p>
                        <div className="flex flex-wrap gap-2">
                          {event.generos.map((genero, index) => (
                            <span key={index} className="px-3 py-1 bg-red-600/20 border border-red-500 rounded-full text-sm text-red-400 font-bold">
                              {genero}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {event.hora && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-300 font-bold mb-1" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>HORÁRIO</p>
                        <p className="text-gray-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{event.hora}</p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              {/* Título do evento (se houver) */}
              {event.title && (
                <div className="text-center mb-6">
                  <h2 className="text-xl font-black metal-text text-red-400">
                    {event.title}
                  </h2>
                </div>
              )}

              {/* Preço - somente para eventos internos com preço */}
              {!(event.link_compra || event.link) && event.price > 0 && !event.evento_gratuito && (
                <div className="text-center mb-6">
                  <div className="text-4xl font-black metal-text text-red-400 mb-2">
                    R$ {event.price.toFixed(2)}
                  </div>
                  <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    POR INGRESSO
                  </p>
                </div>
              )}

              {/* Evento gratuito */}
              {event.evento_gratuito && (
                <div className="text-center mb-6">
                  <div className="text-4xl font-black metal-text text-red-400 mb-2">
                    GRATUITO
                  </div>
                </div>
              )}

              {isSalesActive ? (
                <div className="space-y-4">
                  {/* Quantidade - somente para eventos internos */}
                  {!(event.link_compra || event.link) && (
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
                  )}

                  {/* Total - somente para eventos internos */}
                  {!(event.link_compra || event.link) && (
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
                  )}

                  {/* Botão com logo do site de vendas */}
                  {(event.link_compra || event.link) && (
                    <div className="space-y-4">
                      {/* Extrai o nome do site pela URL */}
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 metal-border">
                          <p className="text-xs text-gray-300 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            DISPONÍVEL EM:
                          </p>
                          <div className="text-xl font-black metal-text text-red-400">
                            {event.fonte ? event.fonte.toUpperCase() : getSiteNameFromUrl(event.link_compra || event.link || '')}
                          </div>
                        </div>
                      </div>
                      <a
                        href={event.link_compra || event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-primary flex items-center justify-center space-x-2"
                      >
                        <span>COMPRAR INGRESSOS</span>
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-red-400 font-black metal-text mb-2">VENDAS ENCERRADAS</div>
                  <p className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    As vendas para este evento foram encerradas
                  </p>
                </div>
              )}

              {/* <div className="mt-6 pt-6 border-t border-red-500/30">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
