import React from 'react';
import { useAuth } from '../app/providers/AuthProvider';
import { useHistory } from '../app/providers/HistoryProvider';
import { Button } from "@felipemalli-libs/microhub-ui";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history?.push('/auth/login');
  };

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Usuário não encontrado</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Perfil</h1>
        <p className="text-gray-600">Suas informações pessoais</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Nome
            </label>
            <p className="text-lg font-medium text-gray-800">{user.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            <p className="text-lg font-medium text-gray-800">{user.email}</p>
          </div>

          {user.role && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Tipo de conta
              </label>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                user.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role === 'admin' ? 'Administrador' : 'Usuário'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* outline */}
        <Button
          onClick={handleLogout}
          variant="secondary"
          className="w-full py-3 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
        >
          Sair da conta
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage; 