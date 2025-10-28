import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, ArrowRight, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.tsx';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, signInWithGoogle, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        if (email && password && name) {
          await signUp(email, password, name);
          setIsSignUp(false);
          setEmail('');
          setPassword('');
          setName('');
        } else {
          toast.error('Preencha todos os campos');
        }
      } else {
        if (email && password) {
          await login(email, password);
          navigate('/my-tickets');
        } else {
          toast.error('Preencha todos os campos');
        }
      }
    } catch (error) {
      // Erro já tratado no AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      await signInWithGoogle();
      navigate('/my-tickets');
    } catch (error) {
      // Erro já tratado no AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efeito de partículas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 metal-border">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-3xl font-black metal-text text-red-400">TICKETMETAL</span>
            </div>
            <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>ENTRE NA SUA CONTA</p>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleEmailAuth} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="label">NOME</label>
                <div className="relative">
                  <User className="w-5 h-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-10"
                    placeholder="SEU NOME COMPLETO"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="label">EMAIL</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="SEU@EMAIL.COM"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">SENHA</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <span>{loading ? (isSignUp ? 'CRIANDO...' : 'ENTRANDO...') : (isSignUp ? 'CRIAR CONTA' : 'ENTRAR')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Link para alternar entre login e cadastro */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="text-red-400 hover:text-red-300 font-bold transition-colors duration-300"
              style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              {isSignUp ? 'JÁ TEM CONTA? FAÇA LOGIN' : 'NÃO TEM CONTA? CADASTRE-SE'}
            </button>
          </div>

          {/* Divisor */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-red-500/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>OU</span>
              </div>
            </div>
          </div>

          {/* Login com Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-red-500/50 rounded-lg text-gray-300 hover:bg-red-500/10 transition-all duration-300 disabled:opacity-50 metal-border"
          >
            <Chrome className="w-5 h-5 text-red-400" />
            <span className="font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>CONTINUAR COM GOOGLE</span>
          </button>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="text-sm text-red-400 hover:text-red-300 transition-colors duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              ESQUECEU SUA SENHA?
            </a>
            <div className="text-sm text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              NÃO TEM UMA CONTA?{' '}
              <a href="#" className="text-red-400 hover:text-red-300 font-bold transition-colors duration-300">
                CADASTRE-SE
              </a>
            </div>
          </div>

          {/* Demo */}
          <div className="mt-8 p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg metal-border">
            <h3 className="font-black metal-text text-red-400 mb-2">ACESSO DEMO</h3>
            <p className="text-sm text-gray-300 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Use qualquer email e senha para testar o sistema
            </p>
            <button
              onClick={() => {
                setEmail('usuario@ticketmetal.com');
                setPassword('123456');
              }}
              className="text-sm text-red-400 hover:text-red-300 underline transition-colors duration-300 font-bold" style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}
            >
              PREENCHER DADOS DEMO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
