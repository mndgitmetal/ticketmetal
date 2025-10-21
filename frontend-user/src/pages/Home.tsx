import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Star, Clock } from 'lucide-react';

const Home: React.FC = () => {
  // Dados mockados para demonstração
  const featuredEvents = [
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
      rating: 4.8
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
      rating: 4.6
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
      rating: 4.7
    }
  ];

  const stats = [
    { number: '10K+', label: 'Eventos Realizados' },
    { number: '500K+', label: 'Ingressos Vendidos' },
    { number: '50K+', label: 'Usuários Ativos' },
    { number: '99%', label: 'Satisfação' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encontre os Melhores
              <span className="block text-yellow-300">Eventos</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Compre ingressos de forma segura e fácil para os eventos mais incríveis da sua cidade
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Explorar Eventos</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
                Como Funciona
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Eventos em Destaque
            </h2>
            <p className="text-xl text-gray-600">
              Confira os eventos mais populares e não perca nenhuma oportunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
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
                      className="btn-primary flex items-center space-x-2"
                    >
                      <span>Ver Detalhes</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/events"
              className="btn-outline text-lg px-8 py-3"
            >
              Ver Todos os Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o TicketMetal?
            </h2>
            <p className="text-xl text-gray-600">
              Oferecemos a melhor experiência para compra de ingressos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Compra Rápida
              </h3>
              <p className="text-gray-600">
                Processo de compra simplificado e seguro em poucos cliques
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confiável
              </h3>
              <p className="text-gray-600">
                Milhares de usuários confiam em nossa plataforma para seus eventos
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Variedade
              </h3>
              <p className="text-gray-600">
                Eventos de todos os tipos: shows, workshops, conferências e mais
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
