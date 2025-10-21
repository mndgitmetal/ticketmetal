import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Chrome, ArrowRight, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulação de login - em produção, integrar com Supabase Auth
      if (email && password) {
        toast.success('Login realizado com sucesso!');
        // Redirecionar para página de ingressos ou home
        window.location.href = '/my-tickets';
      } else {
        toast.error('Preencha todos os campos');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      // Simulação de login com Google - em produção, integrar com Supabase Auth
      toast.success('Login com Google realizado com sucesso!');
      window.location.href = '/my-tickets';
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
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-3xl">🎫</span>
              <span className="text-2xl font-bold text-gray-900">TicketMetal</span>
            </div>
            <p className="text-gray-600">Entre na sua conta</p>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
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
              <span>{loading ? 'Entrando...' : 'Entrar'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

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
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              Esqueceu sua senha?
            </a>
            <div className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Cadastre-se
              </a>
            </div>
          </div>

          {/* Demo */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Acesso Demo</h3>
            <p className="text-sm text-blue-700 mb-3">
              Use qualquer email e senha para testar o sistema
            </p>
            <button
              onClick={() => {
                setEmail('usuario@ticketmetal.com');
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
