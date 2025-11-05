import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, Search } from 'lucide-react';
import { apiService } from './api.ts';
import EventImage from '../components/EventImage.tsx';

interface Event {
  id: string; // UUID para eventos_rock
  title: string;
  description: string;
  date: string;
  location: string;
  city: string;
  state: string;
  price: number;
  image: string;
  ticketsSold: number;
  maxTickets: number;
  rating: number;
  category: string;
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
  slug?: string;
}

const cities = [
  { slug: "todas", nome: "Todas as cidades" },
  { slug: "belo-horizonte", nome: "Belo Horizonte" },
  { slug: "sao-paulo", nome: "São Paulo" },
  { slug: "rio-de-janeiro", nome: "Rio de Janeiro" },
  { slug: "curitiba", nome: "Curitiba" },
  { slug: "brasilia", nome: "Brasília" },
  { slug: "porto-alegre", nome: "Porto Alegre" },
  { slug: "recife", nome: "Recife" },
  { slug: "salvador", nome: "Salvador" },
];

const Events: React.FC = () => {
  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get('cidade') || 'todas';
  const initialSearch = searchParams.get('busca') || '';
  
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-asc');

  // Atualiza o termo de busca quando a URL muda
  useEffect(() => {
    const buscaFromUrl = searchParams.get('busca') || '';
    setSearchTerm(buscaFromUrl);
  }, [searchParams]);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      // Mapear cidade do filtro para formato esperado pelo backend
      const cityMap: { [key: string]: string } = {
        'belo-horizonte': 'BELO HORIZONTE',
        'sao-paulo': 'SÃO PAULO',
        'rio-de-janeiro': 'RIO DE JANEIRO',
        'curitiba': 'CURITIBA',
        'brasilia': 'BRASÍLIA',
        'porto-alegre': 'PORTO ALEGRE',
        'recife': 'RECIFE',
        'salvador': 'SALVADOR'
      };
      
      const cidadeParam = cityFilter !== 'todas' ? cityMap[cityFilter] || cityFilter.toUpperCase() : undefined;
      const eventsData = await apiService.getEvents(500, 0, cidadeParam);
      
      // Mapear campos de eventos_rock para o formato esperado pelo componente
      const mappedEvents = eventsData.map((event: any) => {
        const title = event.titulo || event.title;
        const eventDate = event.data_formatada || event.date;
        const slug = event.slug; // Usar slug diretamente do banco
        
        return {
          id: event.id,
          slug: slug,
          title: title,
          description: event.descricao || event.description || '',
          date: eventDate,
          location: event.nome_local || event.location || '',
          city: event.cidade || event.city || '',
          state: event.estado || event.state || '',
          price: event.preco_min || event.preco_max || event.price || 0,
          image: (event.imagem && event.imagem.trim() !== '' && event.imagem !== 'null' && event.imagem !== 'undefined') 
            ? event.imagem 
            : (event.image && event.image.trim() !== '' && event.image !== 'null' && event.image !== 'undefined')
            ? event.image
            : '',
          ticketsSold: 0, // Não temos esse dado para eventos externos
          maxTickets: 999, // Placeholder
          rating: 4.8, // Mock rating
          category: 'metal', // Categoria padrão
          link: event.link,
          link_compra: event.link_compra,
          evento_gratuito: event.evento_gratuito
        };
      });
      
      // Os eventos já vêm filtrados por cidade do backend
      setEvents(mappedEvents);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  }, [cityFilter]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !dateFilter || event.date.startsWith(dateFilter);
    
    return matchesSearch && matchesDate;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date-asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black metal-text text-red-400 mb-4">
            EVENTOS DISPONÍVEIS
          </h1>
          <p className="text-xl text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Encontre os eventos mais brutais para você
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="w-5 h-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="BUSCAR EVENTOS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 w-full"
                />
              </div>
            </div>

            {/* City Filter */}
            <div>
              <select
                value={cityFilter}
                onChange={(e) => {
                  const newCity = e.target.value;
                  const newUrl = newCity === 'todas' 
                    ? '/eventos' 
                    : `/eventos?cidade=${newCity}`;
                  window.location.href = newUrl;
                }}
                className="input-field w-full"
              >
                {cities.map(city => (
                  <option key={city.slug} value={city.slug}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input-field w-full"
                placeholder="FILTRAR POR DATA"
              />
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-full"
              >
                <option value="date-asc">Mais Próximos</option>
                <option value="date-desc">Mais Distantes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>
            {sortedEvents.length} EVENTO{sortedEvents.length !== 1 ? 'S' : ''} ENCONTRADO{sortedEvents.length !== 1 ? 'S' : ''}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map((event) => (
            <div key={event.id} className="card hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative mb-4">
                <EventImage
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-red-400 line-clamp-2 metal-text">
                  {event.title}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-red-400" />
                    {new Date(event.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-red-400" />
                    {event.location ? `${event.location}, ` : ''}{event.city}{event.state ? ` - ${event.state}` : ''}
                  </div>
                </div>

                <div className="pt-4">
                  {/* Só mostra preço se não for R$ 0.00 */}
                  <div className="mb-3">
                    {event.price > 0 && !event.evento_gratuito && (
                      <div className="text-2xl font-black metal-text text-red-400">
                        R$ {event.price.toFixed(2)}
                      </div>
                    )}
                    {event.evento_gratuito && (
                      <div className="text-2xl font-black metal-text text-red-400">
                        GRATUITO
                      </div>
                    )}
                  </div>
                  {/* Sempre mostra "VER DETALHES" - o link de compra aparece na página interna */}
                  <Link
                    to={event.slug ? `/eventos/${event.slug}` : `/events/${event.id}`}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    VER DETALHES
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-black metal-text text-red-400 mb-2">
              NENHUM EVENTO ENCONTRADO
            </h3>
            <p className="text-gray-300 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Tente ajustar os filtros de busca
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSortBy('date');
              }}
              className="btn-primary"
            >
              LIMPAR FILTROS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
