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
          title: 'Festival de Música 2024',
          description: 'O maior festival de música do ano com artistas nacionais e internacionais.',
          date: '2024-03-15T20:00:00',
          location: 'Parque da Cidade',
          city: 'São Paulo',
          state: 'SP',
          price: 50.00,
          image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500',
          ticketsSold: 450,
          maxTickets: 500,
          rating: 4.8,
          category: 'music'
        },
        {
          id: 2,
          title: 'Workshop de Tecnologia',
          description: 'Aprenda as últimas tendências em tecnologia e desenvolvimento.',
          date: '2024-03-20T14:00:00',
          location: 'Centro de Convenções',
          city: 'Rio de Janeiro',
          state: 'RJ',
          price: 30.00,
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500',
          ticketsSold: 120,
          maxTickets: 150,
          rating: 4.6,
          category: 'tech'
        },
        {
          id: 3,
          title: 'Conferência de Negócios',
          description: 'Networking e palestras sobre empreendedorismo e inovação.',
          date: '2024-03-25T09:00:00',
          location: 'Hotel Plaza',
          city: 'Belo Horizonte',
          state: 'MG',
          price: 40.00,
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
          ticketsSold: 200,
          maxTickets: 300,
          rating: 4.7,
          category: 'business'
        },
        {
          id: 4,
          title: 'Festival de Comida',
          description: 'Experimente pratos únicos de chefs renomados.',
          date: '2024-04-01T18:00:00',
          location: 'Praça da Liberdade',
          city: 'São Paulo',
          state: 'SP',
          price: 25.00,
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
          ticketsSold: 80,
          maxTickets: 200,
          rating: 4.5,
          category: 'food'
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
    { value: 'all', label: 'Todos' },
    { value: 'music', label: 'Música' },
    { value: 'tech', label: 'Tecnologia' },
    { value: 'business', label: 'Negócios' },
    { value: 'food', label: 'Gastronomia' },
    { value: 'sports', label: 'Esportes' }
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Eventos Disponíveis
          </h1>
          <p className="text-xl text-gray-600">
            Encontre o evento perfeito para você
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
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
          <p className="text-gray-600">
            {sortedEvents.length} evento{sortedEvents.length !== 1 ? 's' : ''} encontrado{sortedEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map((event) => (
            <div key={event.id} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{event.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {categories.find(cat => cat.value === event.category)?.label}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}, {event.city} - {event.state}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {event.ticketsSold}/{event.maxTickets} ingressos vendidos
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-2xl font-bold text-blue-600">
                    R$ {event.price.toFixed(2)}
                  </div>
                  <Link
                    to={`/events/${event.id}`}
                    className="btn-primary"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-gray-600 mb-4">
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
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
