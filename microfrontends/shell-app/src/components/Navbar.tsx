import { Link } from 'react-router-dom';

export const Navbar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 h-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center justify-between w-full space-x-8">
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
  );
};