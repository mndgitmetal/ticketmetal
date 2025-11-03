import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { apiService } from './api.ts';

interface Event {
  id: string;
  slug?: string;
  titulo?: string;
  title?: string;
  descricao?: string;
  description?: string;
  data_formatada?: string;
  date?: string;
  nome_local?: string;
  location?: string;
  cidade?: string;
  city?: string;
  estado?: string;
  state?: string;
  preco_min?: number;
  preco_max?: number;
  price?: number;
  imagem?: string;
  image?: string;
  evento_gratuito?: boolean;
  link_compra?: string;
  link?: string;
}

const Home: React.FC = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const events = await apiService.getFeaturedEvents(3);
        setFeaturedEvents(events);
      } catch (error) {
        console.error('Erro ao buscar eventos em destaque:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []);

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

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => {
                const title = event.titulo || event.title || '';
                const description = event.descricao || event.description || '';
                const eventDate = event.data_formatada || event.date || '';
                const location = event.nome_local || event.location || '';
                const city = event.cidade || event.city || '';
                const state = event.estado || event.state || '';
                const price = event.preco_min || event.preco_max || event.price || 0;
                const image = event.imagem || event.image || 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500';
                const slug = event.slug;
                
                return (
                  <div key={event.id} className="card hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="relative mb-4">
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-black text-red-400 line-clamp-2 metal-text">
                        {title}
                      </h3>
                      {description && (
                        <p className="text-gray-300 line-clamp-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {description}
                        </p>
                      )}

                      <div className="space-y-2">
                        {eventDate && (
                          <div className="flex items-center text-sm text-gray-300">
                            <Calendar className="w-4 h-4 mr-2 text-red-400" />
                            {new Date(eventDate).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                        {(location || city) && (
                          <div className="flex items-center text-sm text-gray-300">
                            <MapPin className="w-4 h-4 mr-2 text-red-400" />
                            {location ? `${location}, ` : ''}{city}{state ? ` - ${state}` : ''}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        {price > 0 && !event.evento_gratuito ? (
                          <div className="text-2xl font-black text-red-400 metal-text">
                            R$ {price.toFixed(2)}
                          </div>
                        ) : event.evento_gratuito ? (
                          <div className="text-2xl font-black text-red-400 metal-text">
                            GRATUITO
                          </div>
                        ) : null}
                        <Link
                          to={slug ? `/eventos/${slug}` : `/events/${event.id}`}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <span>VER DETALHES</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Nenhum evento em destaque no momento
              </p>
            </div>
          )}

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
