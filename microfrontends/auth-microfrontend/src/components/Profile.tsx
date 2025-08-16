import React from 'react';
import { ProfileProps } from '../types/auth';

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const loginTime = localStorage.getItem('authToken');
  const tokenTimestamp = loginTime ? loginTime.split('-')[2] : null;
  const loginDateTime = tokenTimestamp ? new Date(parseInt(tokenTimestamp)).toLocaleString('pt-BR') : 'Não disponível';

  return (
    <div className="auth-form">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">👤 Perfil do Usuário</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="text-gray-600">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Nome:</span>
              <span className="text-gray-600">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-600">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h4 className="font-semibold text-blue-800 mb-3">📊 Informações da Sessão</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">Status:</span>
              <span className="status-badge status-active">Ativo</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">Login realizado em:</span>
              <span className="text-blue-600">{loginDateTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">Token de sessão:</span>
              <span className="status-badge status-active">Ativo</span>
            </div>
          </div>
        </div>

        <div className="warning-card">
          <h4 className="font-semibold text-yellow-800 mb-2">ℹ️ Funcionalidades da Sessão</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Dados salvos no localStorage</li>
            <li>Sessão persiste após reload da página</li>
            <li>Token mock gerado automaticamente</li>
            <li>Logout limpa todos os dados</li>
          </ul>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          🚪 Sair da conta
        </button>

        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-sm text-gray-600">
            <strong className="text-gray-800">🔒 Dados mock para demonstração</strong>
            <br />
            Este é um sistema de autenticação simulado. Em produção, os dados seriam validados em um servidor real com criptografia adequada.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;