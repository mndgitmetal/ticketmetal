import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
  provider: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulação de login - em produção, integrar com Supabase Auth
      const mockUser: User = {
        id: 1,
        email,
        name: email.split('@')[0],
        provider: 'email',
        is_admin: true
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer login');
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Simulação de login com Google - em produção, integrar com Supabase Auth
      const mockUser: User = {
        id: 1,
        email: 'admin@ticketmetal.com',
        name: 'Administrador',
        avatar_url: 'https://via.placeholder.com/150',
        provider: 'google',
        is_admin: true
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Login com Google realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer login com Google');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logout realizado com sucesso!');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
