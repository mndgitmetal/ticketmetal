import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulação

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-500/30 sticky top-0 z-50 metal-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black metal-text text-red-400">TICKETMETAL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/events"
              className="text-gray-300 hover:text-red-400 font-bold transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              EVENTOS
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-red-400 font-bold transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              SOBRE
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-red-400 font-bold transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              CONTATO
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="BUSCAR EVENTOS..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-red-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200 placeholder-gray-500"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/my-tickets"
                  className="p-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110"
                  title="MEUS INGRESSOS"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center metal-glow">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <span className="text-sm font-bold text-gray-300" style={{ fontFamily: 'Orbitron, monospace' }}>USUÁRIO</span>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-primary flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>ENTRAR</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-red-500/30 py-4 bg-gray-900/95 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="px-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="BUSCAR EVENTOS..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-red-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200 placeholder-gray-500"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                </div>
              </div>
              <nav className="space-y-2">
                <Link
                  to="/events"
                  className="block px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  EVENTOS
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  SOBRE
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  CONTATO
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
