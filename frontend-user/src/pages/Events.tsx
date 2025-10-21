import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Star, Search, Filter } from 'lucide-react';

interface Event {
  id: number;
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
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Simulação de dados - em produção, fazer chamada para API
      const mockEvents: Event[] = [
        {
          id: 1,
          title: 'METAL FEST 2024',
          description: 'O maior festival de metal do ano com bandas lendárias e novas revelações do cenário underground.',
          date: '2024-03-15T20:00:00',
          location: 'Arena Underground',
          city: 'São Paulo',
          state: 'SP',
          price: 80.00,
          image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500',
          ticketsSold: 450,
          maxTickets: 500,
          rating: 4.9,
          category: 'metal'
        },
        {
          id: 2,
          title: 'DEATH METAL WORKSHOP',
          description: 'Aprenda as técnicas mais brutais de guitarra e bateria com mestres do death metal.',
          date: '2024-03-20T14:00:00',
          location: 'Studio Hell',
          city: 'Rio de Janeiro',
          state: 'RJ',
          price: 60.00,
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500',
          ticketsSold: 120,
          maxTickets: 150,
          rating: 4.8,
          category: 'workshop'
        },
        {
          id: 3,
          title: 'BLACK METAL CONFERENCE',
          description: 'Discussões sobre filosofia, história e cultura do black metal com especialistas.',
          date: '2024-03-25T09:00:00',
          location: 'Crypt Venue',
          city: 'Belo Horizonte',
          state: 'MG',
          price: 40.00,
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
          ticketsSold: 200,
          maxTickets: 300,
          rating: 4.7,
          category: 'conference'
        },
        {
          id: 4,
          title: 'THRASH METAL NIGHT',
          description: 'Uma noite inteira de thrash metal com as melhores bandas da cena.',
          date: '2024-04-01T18:00:00',
          location: 'Metal Bar',
          city: 'São Paulo',
          state: 'SP',
          price: 35.00,
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
          ticketsSold: 80,
          maxTickets: 200,
          rating: 4.6,
          category: 'show'
        }
      ];
      
      setEvents(mockEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'TODOS' },
    { value: 'metal', label: 'METAL' },
    { value: 'workshop', label: 'WORKSHOP' },
    { value: 'conference', label: 'CONFERÊNCIA' },
    { value: 'show', label: 'SHOW' },
    { value: 'festival', label: 'FESTIVAL' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'date':
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime();
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="w-5 h-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="BUSCAR EVENTOS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="date">Data</option>
                <option value="price">Preço</option>
                <option value="rating">Avaliação</option>
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
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded-full flex items-center space-x-1 metal-border">
                  <Star className="w-4 h-4 text-red-400 fill-current" />
                  <span className="text-sm font-bold text-red-400">{event.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-2 py-1 rounded-full text-sm font-bold metal-glow">
                  {categories.find(cat => cat.value === event.category)?.label}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-red-400 line-clamp-2 metal-text">
                  {event.title}
                </h3>
                <p className="text-gray-300 line-clamp-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {event.description}
                </p>

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
                    {event.location}, {event.city} - {event.state}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-red-400" />
                    {event.ticketsSold}/{event.maxTickets} ingressos vendidos
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-2xl font-black metal-text text-red-400">
                    R$ {event.price.toFixed(2)}
                  </div>
                  <Link
                    to={`/events/${event.id}`}
                    className="btn-primary"
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
                setSelectedCategory('all');
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
