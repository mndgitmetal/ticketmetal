import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Star, Clock } from 'lucide-react';

const Home: React.FC = () => {
  // Dados mockados para demonstração
  const featuredEvents = [
    {
      id: 1,
      title: 'METAL NEVER DIE FEST 2025',
      description: 'O maior festival de metal do ano com bandas lendárias e novas revelações do cenário underground.',
      date: '2024-03-15T20:00:00',
      location: 'Arena Underground',
      city: 'São Paulo',
      state: 'SP',
      price: 80.00,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500',
      ticketsSold: 450,
      maxTickets: 500,
      rating: 4.9
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
      rating: 4.8
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
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 metal-text">
              ENCONTRE OS EVENTOS
              <span className="block text-red-400 animate-pulse">MAIS BRUTAIS</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Compre ingressos para os eventos mais pesados e underground da cena metal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/eventos"
                className="btn-primary text-lg py-4 px-8 flex items-center justify-center space-x-2"
              >
                <span>EXPLORAR EVENTOS</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn-outline text-lg py-4 px-8">
                COMO FUNCIONA
              </button>
            </div>
          </div>
        </div>
        {/* Efeito de partículas */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping"></div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-gradient-to-r from-gray-900 to-black border-y border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center metal-glow">
                <div className="text-3xl md:text-4xl font-black text-red-400 mb-2 metal-text">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Events */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black metal-text mb-4">
              EVENTOS EM DESTAQUE
            </h2>
            <p className="text-xl text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Confira os eventos mais pesados e não perca nenhuma oportunidade de headbanging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
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
                    <div className="text-2xl font-black text-red-400 metal-text">
                      R$ {event.price.toFixed(2)}
                    </div>
                    <Link
                      to={`/eventos/${event.id}`}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <span>VER DETALHES</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/eventos"
              className="btn-outline text-lg px-8 py-3"
            >
              VER TODOS OS EVENTOS
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-16 bg-gradient-to-r from-gray-900 to-black border-y border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black metal-text mb-4">
              POR QUE ESCOLHER O TICKETMETAL?
            </h2>
            <p className="text-xl text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Oferecemos a experiência mais brutal para compra de ingressos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center metal-glow">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 metal-glow">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-red-400 mb-2 metal-text">
                COMPRA RÁPIDA
              </h3>
              <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Processo de compra simplificado e seguro em poucos cliques
              </p>
            </div>

            <div className="text-center metal-glow">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 metal-glow">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-red-400 mb-2 metal-text">
                CONFIÁVEL
              </h3>
              <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Milhares de headbangers confiam em nossa plataforma para seus eventos
              </p>
            </div>

            <div className="text-center metal-glow">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 metal-glow">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-red-400 mb-2 metal-text">
                VARIEDADE
              </h3>
              <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Eventos de todos os estilos: death metal, black metal, thrash e mais
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
