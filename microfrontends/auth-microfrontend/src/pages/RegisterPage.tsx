import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { validation } from "../utils/validation";
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { AuthCard } from "../components/AuthCard";

interface RegisterFormData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { register, loading, isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			const from = location.state?.from?.pathname || "/auth/profile";
			navigate(from, { replace: true });
		}
	}, [isAuthenticated, navigate, location]);

	const {
		values: formData,
		errors,
		isSubmitting,
		handleChange,
		handleSubmit,
	} = useForm<RegisterFormData>({
		initialValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validate: (values) =>
			validation.validateRegisterForm(
				values.name,
				values.email,
				values.password,
				values.confirmPassword
			),
		onSubmit: async (values) => {
			await register({
				name: values.name.trim(),
				email: values.email.trim(),
				password: values.password,
			});
		},
	});

	return (
		<AuthCard
			onSubmit={handleSubmit}
			title="Criar Conta"
			description="Crie sua conta para começar"
		>
			<div>
				<label htmlFor="name" className="block text-sm mb-2">
					Nome completo
				</label>
				<CoreInput
					type="text"
					inputId="name"
					name="name"
					value={formData.name}
					placeholder="Seu nome completo"
					error={!!errors.name}
					onCoreInput={handleChange}
					disabled={loading || isSubmitting}
				/>
				{errors.name && (
					<p className="text-red-600 text-sm mt-1">{errors.name}</p>
				)}
			</div>
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
					onCoreInput={handleChange}
					disabled={loading || isSubmitting}
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
					placeholder="Mínimo 6 caracteres"
					error={!!errors.password}
					onCoreInput={handleChange}
					disabled={loading || isSubmitting}
				/>
				{errors.password && (
					<p className="text-red-600 text-sm mt-1">{errors.password}</p>
				)}
			</div>
			<div>
				<label htmlFor="confirmPassword" className="block text-sm mb-2">
					Confirmar senha
				</label>
				<CoreInput
					type="password"
					inputId="confirmPassword"
					name="confirmPassword"
					value={formData.confirmPassword}
					placeholder="Repita sua senha"
					error={!!errors.confirmPassword}
					onCoreInput={handleChange}
					disabled={loading || isSubmitting}
				/>
				{errors.confirmPassword && (
					<p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
				)}
			</div>
			<CoreButton
				type="submit"
				variant="primary"
				disabled={loading || isSubmitting}
				className="w-full"
				onClick={handleSubmit}
			>
				{loading || isSubmitting ? "Criando conta..." : "Criar conta"}
			</CoreButton>
			<div className="text-center">
				<p>
					Já tem uma conta?{" "}
					<CoreButton
						variant="underline"
						onCoreClick={() => navigate("/auth/login")}
						disabled={loading || isSubmitting}
					>
						Entrar
					</CoreButton>
				</p>
			</div>
		</AuthCard>
	);
};
