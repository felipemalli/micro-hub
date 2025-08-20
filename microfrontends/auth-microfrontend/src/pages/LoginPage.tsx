import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthProvider';
import { FormData, FormErrors } from '../types/auth';
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { AuthCard } from '../app/components/AuthCard';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInput = (e: CustomEvent) => {
    const target = e.detail?.target as HTMLInputElement;
    if (!target) return;
    const { name, value } = target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if ((errors as any)[name]) {
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/auth/profile');
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Erro ao fazer login'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard onSubmit={handleSubmit} title='Entrar' description='Entre com sua conta'>
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.general}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm mb-2">
          Email
        </label>
        <CoreInput
          type="email"
          inputId="email"
          name="email"
          value={formData.email}
          placeholder="seu@email.com"
          error={!!errors.email}
          onCoreInput={handleInput}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm mb-2">
          Senha
        </label>
        <CoreInput
          type="password"
          inputId="password"
          name="password"
          value={formData.password}
          placeholder="Sua senha"
          error={!!errors.password}
          onCoreInput={handleInput}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>
        <CoreButton
        type="submit"
        variant="primary"
        disabled={isLoading}
        onClick={handleSubmit}
        className="w-full"
        >
        {isLoading ? 'Entrando...' : 'Entrar'}
        </CoreButton>
      <div className="text-center">
        <p>
          Não tem uma conta?{' '}
          <CoreButton
            type="button"
            variant="underline"
            onCoreClick={() => navigate('/auth/register')}
          >
            Criar conta
          </CoreButton>
        </p>
      </div>
    </AuthCard>
  );
};

export default LoginPage; 