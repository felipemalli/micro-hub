import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps, FormData, FormErrors } from '../types/auth';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await onLogin(formData.email, formData.password);
      navigate('/auth/profile');
    } catch (error) {
      setErrors({ general: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Suspense fallback={<div className="flex justify-center p-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Entrar na sua conta</h3>
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="seu@email.com"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Sua senha"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="text-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <button 
                onClick={() => navigate('/auth/register')}
                className="inline-block"
              >
                Cadastre-se aqui
              </button>
            </p>
          </div>

          <div className="info-card mt-4">
            <h4 className="font-semibold text-blue-800 mb-2">🔑 Contas de teste:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div><strong>Admin:</strong> admin@teste.com / 123456</div>
              <div><strong>User:</strong> user@teste.com / 123456</div>
            </div>
          </div>
        </form>
      </div>
    </Suspense>
  );
};

export default Login;