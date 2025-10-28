import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import LogoLockup from './LogoLockup.tsx';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/eventos?busca=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-500/30 sticky top-0 z-50 metal-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <LogoLockup size="medium" variant="simple" />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="BUSCAR EVENTOS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-red-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200 placeholder-gray-500"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center metal-glow">
                  {user.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-gray-300 hidden sm:block" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {user.name.toUpperCase()}
                </span>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>ENTRAR</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
