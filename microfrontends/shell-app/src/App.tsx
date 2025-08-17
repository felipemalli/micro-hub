import React, { Suspense, useState, useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const AuthApp = lazy(() => import('./components/AuthApp'));
const RickMortyApp = lazy(() => import('./components/RickMortyApp'));

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Carregando...</p>
    </div>
  </div>
);

const ErrorFallback: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
    <div className="text-center p-8 card max-w-md">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Ops! Algo deu errado</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="btn-primary"
      >
        Tentar novamente
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Verificar se há sessão salva
    const savedUser = localStorage.getItem('currentUser');
    setIsAuthenticated(!!savedUser);
  }, []);

  const handleAuthChange = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                  🚀 Micro Hub
                </Link>
                <div className="flex space-x-4">
                  <Link 
                    to="/auth" 
                    className="nav-link"
                  >
                    🔐 Autenticação
                  </Link>
                  <Link 
                    to="/rickmorty" 
                    className="nav-link"
                  >
                    👽 Rick & Morty
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {isAuthenticated && (
                  <span className="text-sm text-green-600 font-medium">
                    ✅ Autenticado
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center p-8 card max-w-2xl">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                      🎯 Bem-vindo ao Micro Hub
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg">
                      Uma demonstração de arquitetura de microfrontends usando Module Federation
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link to="/auth" className="card hover:shadow-lg transition-shadow p-6">
                        <div className="text-3xl mb-2">🔐</div>
                        <h3 className="font-semibold text-gray-800">Autenticação</h3>
                        <p className="text-sm text-gray-600">Sistema de login e registro</p>
                      </Link>
                      <Link to="/rickmorty" className="card hover:shadow-lg transition-shadow p-6">
                        <div className="text-3xl mb-2">👽</div>
                        <h3 className="font-semibold text-gray-800">Rick & Morty</h3>
                        <p className="text-sm text-gray-600">Explore o universo da série</p>
                      </Link>
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/auth/*" 
              element={
                <ErrorBoundary fallback={<ErrorFallback message="Erro ao carregar o módulo de autenticação" />}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AuthApp onAuthChange={handleAuthChange} />
                  </Suspense>
                </ErrorBoundary>
              } 
            />
            <Route 
              path="/rickmorty/*" 
              element={
                <ErrorBoundary fallback={<ErrorFallback message="Erro ao carregar o módulo Rick & Morty" />}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <RickMortyApp isAuthenticated={isAuthenticated} />
                  </Suspense>
                </ErrorBoundary>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;