import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthProvider';
import { FormData, FormErrors } from '../types/auth';
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";

interface RegisterFormData extends FormData {
  name: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();


  const handleCoreInput = (e: CustomEvent) => {
    const target = (e as any).detail?.target as HTMLInputElement | undefined;
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

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
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
      await register(formData.name.trim(), formData.email, formData.password);
      navigate('/auth/profile');
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Erro ao criar conta'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
        <p className="text-gray-600">Crie sua conta para começar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo
          </label>
          <CoreInput
            type="text"
            inputId="name"
            name="name"
            value={formData.name}
            placeholder="Seu nome completo"
            error={!!errors.name}
            onCoreInput={handleCoreInput}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <CoreInput
            type="email"
            inputId="email"
            name="email"
            value={formData.email}
            placeholder="seu@email.com"
            error={!!errors.email}
            onCoreInput={handleCoreInput}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <CoreInput
            type="password"
            inputId="password"
            name="password"
            value={formData.password}
            placeholder="Mínimo 6 caracteres"
            error={!!errors.password}
            onCoreInput={handleCoreInput}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar senha
          </label>
          <CoreInput
            type="password"
            inputId="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Repita sua senha"
            error={!!errors.confirmPassword}
            onCoreInput={handleCoreInput}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <CoreButton
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full"
          onClick={handleSubmit}
        >
          {isLoading ? 'Criando conta...' : 'Criar conta'}
        </CoreButton>

        <div className="text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <CoreButton
              variant="underline"
              onCoreClick={() => navigate('/auth/login')}
            >
              Entrar
            </CoreButton>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage; 