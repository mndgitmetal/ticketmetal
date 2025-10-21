import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black border-t border-red-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl font-black metal-text text-red-400">TICKETMETAL</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              A plataforma mais brutal para venda de ingressos de eventos metal. 
              Conectamos headbangers e organizadores de forma underground e eficiente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-black mb-4 metal-text text-red-400">LINKS RÁPIDOS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-gray-300 hover:text-red-400 transition-all duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  EVENTOS
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-red-400 transition-all duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  SOBRE NÓS
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-red-400 transition-all duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  CONTATO
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-red-400 transition-all duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  AJUDA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-black mb-4 metal-text text-red-400">CONTATO</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400" />
                <span className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>contato@ticketmetal.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400" />
                <span className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>(11) 99999-9999</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 mt-1" />
                <span className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  São Paulo, SP<br />
                  Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-red-500/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              © 2024 TICKETMETAL. TODOS OS DIREITOS RESERVADOS.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                POLÍTICA DE PRIVACIDADE
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                TERMOS DE USO
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                COOKIES
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
