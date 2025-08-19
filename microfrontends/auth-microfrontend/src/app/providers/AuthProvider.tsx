import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../../types/auth';
import { authService } from '../../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
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
  onAuthChange?: (isAuthenticated: boolean) => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, onAuthChange }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await authService.getProfile();
          setUser(userData);
          onAuthChange?.(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [onAuthChange]);

  const login = async (email: string, password: string): Promise<User> => {
    const { user: userData, token } = await authService.login(email, password);
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
    onAuthChange?.(true);
    
    return userData;
  };

  const register = async (name: string, email: string, password: string): Promise<User> => {
    const { user: userData, token } = await authService.register(name, email, password);
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
    onAuthChange?.(true);
    
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setUser(null);
    onAuthChange?.(false);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 