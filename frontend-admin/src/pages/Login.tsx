import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, ArrowRight } from 'lucide-react';
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
          navigate('/');
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
      navigate('/');
    } catch (error) {
      toast.error('Erro ao fazer login com Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🎫 TicketMetal</h1>
            <p className="text-gray-600">Painel Administrativo</p>
          </div>

          {/* Formulário de Login/Cadastro */}
          <form onSubmit={handleEmailAuth} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="label">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            )}

            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Senha</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
              <span>{loading ? (isSignUp ? 'Criando...' : 'Entrando...') : (isSignUp ? 'Criar Conta' : 'Entrar')}</span>
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
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {isSignUp ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
            </button>
          </div>

          {/* Divisor */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>
          </div>

          {/* Login com Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
          >
            <Chrome className="w-5 h-5" />
            <span>Continuar com Google</span>
          </button>

          {/* Links */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              Esqueceu sua senha?
            </a>
          </div>

          {/* Demo */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Acesso Demo</h3>
            <p className="text-sm text-blue-700 mb-3">
              Use qualquer email e senha para testar o sistema
            </p>
            <button
              onClick={() => {
                setEmail('admin@ticketmetal.com');
                setPassword('123456');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              Preencher dados demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
