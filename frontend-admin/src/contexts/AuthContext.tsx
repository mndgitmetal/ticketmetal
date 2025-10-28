import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  provider: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
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
  const [user, setUser] = useState<AuthUser | null>({
    id: '1',
    email: 'admin@ticketmetal.com',
    name: 'Administrador',
    provider: 'email',
    is_admin: true
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // Mock login for now
    console.log('Login:', email, password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Mock signup for now
    console.log('Signup:', email, password, name);
  };

  const signInWithGoogle = async () => {
    // Mock Google login for now
    console.log('Google login');
  };

  const logout = async () => {
    setUser(null);
    console.log('Logout');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signInWithGoogle,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};