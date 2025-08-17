import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { User, MockUser, AuthAppProps } from './types/auth';

// Mock dos usuários para simular um backend
const mockUsers: MockUser[] = [
  { id: 1, email: 'admin@teste.com', password: '123456', name: 'Administrador' },
  { id: 2, email: 'user@teste.com', password: '123456', name: 'Usuário Teste' }
];

const AuthApp: React.FC<AuthAppProps> = ({ onAuthChange }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar se há sessão salva
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser) as User;
      setUser(userData);
      onAuthChange?.(true);
    }
    setLoading(false);
  }, [onAuthChange]);

  const handleLogin = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      // Simular delay de API
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData: User = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
          setUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
          localStorage.setItem('authToken', 'mock-token-' + Date.now());
          onAuthChange?.(true);
          resolve(userData);
        } else {
          reject(new Error('Email ou senha inválidos'));
        }
      }, 1000);
    });
  };

  const handleRegister = (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verificar se o email já existe
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          reject(new Error('Este email já está em uso'));
          return;
        }

        // Criar novo usuário
        const newUser: MockUser = {
          id: mockUsers.length + 1,
          name,
          email,
          password
        };
        
        mockUsers.push(newUser);
        
        const userData: User = { id: newUser.id, email: newUser.email, name: newUser.name };
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
        onAuthChange?.(true);
        resolve(userData);
      }, 1000);
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    onAuthChange?.(false);
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-md mx-auto">
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="text-2xl font-bold">🔐 Sistema de Autenticação</h2>
            {user && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm opacity-90">Olá, {user.name}!</span>
                <React.Suspense fallback={<button onClick={handleLogout} className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors">Sair</button>}>
                  <button
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </React.Suspense>
              </div>
            )}
          </div>

          <Routes>
            <Route 
              path="/" 
              element={
                user ? (
                  <Profile user={user} onLogout={handleLogout} />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                user ? (
                  <Profile user={user} onLogout={handleLogout} />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? (
                  <Profile user={user} onLogout={handleLogout} />
                ) : (
                  <Register onRegister={handleRegister} />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={
                user ? (
                  <Profile user={user} onLogout={handleLogout} />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AuthApp;