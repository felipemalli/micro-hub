import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Lazy load dos microfrontends
const AuthApp = React.lazy(() => import('auth/AuthApp'));
const RickMortyApp = React.lazy(() => import('rickmorty/RickMortyApp'));

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">🚀</div>
                <h1 className="text-xl font-bold text-gray-800">
                  Microfrontends App
                </h1>
              </div>
              
              <div className="flex space-x-1">
                <Link 
                  to="/auth" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-all duration-200"
                >
                  <span>🔐</span>
                  <span className="font-medium">Autenticação</span>
                </Link>
                <Link 
                  to="/rick-morty" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-all duration-200"
                >
                  <span>👽</span>
                  <span className="font-medium">Rick & Morty</span>
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="text-center animate-fade-in">
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                      Bem-vindo ao App de Microfrontends!
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      Explore nossa arquitetura moderna com Module Federation, 
                      TypeScript e Tailwind CSS.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="card p-8 animate-slide-up">
                      <div className="text-4xl mb-4">🔐</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Sistema de Autenticação
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Login e registro de usuários com gerenciamento de sessão 
                        e validação de formulários.
                      </p>
                      <Link to="/auth" className="btn-primary inline-block">
                        Acessar Autenticação
                      </Link>
                    </div>
                    
                    <div className="card p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                      <div className="text-4xl mb-4">👽</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Rick & Morty Universe
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Explore personagens, episódios e localizações da série 
                        através da API oficial.
                      </p>
                      <Link to="/rick-morty" className="btn-primary inline-block">
                        Explorar Universo
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-16 p-6 glass-effect rounded-2xl max-w-2xl mx-auto">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      🛠️ Tecnologias Utilizadas
                    </h4>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">React 18</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">TypeScript</span>
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">Tailwind CSS</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Module Federation</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full">Webpack 5</span>
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/auth/*" 
              element={
                <ErrorBoundary fallback={<ErrorFallback message="Erro ao carregar módulo de autenticação" />}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AuthApp onAuthChange={setIsAuthenticated} />
                  </Suspense>
                </ErrorBoundary>
              } 
            />
            <Route 
              path="/rick-morty/*" 
              element={
                <ErrorBoundary fallback={<ErrorFallback message="Erro ao carregar módulo Rick & Morty" />}>
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