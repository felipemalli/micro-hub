import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { LoginCredentials } from "../types/auth";
import { validation } from "../utils/validation";
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { AuthCard } from "../components/AuthCard";

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { login, loading, error, isAuthenticated } = useAuth();

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
	} = useForm<LoginCredentials>({
		initialValues: { email: "", password: "" },
		validate: (values) =>
			validation.validateLoginForm(values.email, values.password),
		onSubmit: async (values) => {
			await login({
				email: values.email.trim(),
				password: values.password,
			});
		},
	});

	return (
		<div className="space-y-6">
			<AuthCard
				onSubmit={handleSubmit}
				title="Entrar"
				description="Entre com sua conta"
			>
				{error && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
						{error}
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
						placeholder="Sua senha"
						error={!!errors.password}
						onCoreInput={handleChange}
						disabled={loading || isSubmitting}
					/>
					{errors.password && (
						<p className="text-red-600 text-sm mt-1">{errors.password}</p>
					)}
				</div>
				<CoreButton
					type="submit"
					onClick={handleSubmit}
					variant="primary"
					disabled={loading || isSubmitting}
					className="w-full"
				>
					{loading || isSubmitting ? "Entrando..." : "Entrar"}
				</CoreButton>
				<div className="text-center">
					<p>
						Não tem uma conta?{" "}
						<CoreButton
							type="button"
							variant="underline"
							onCoreClick={() => navigate("/auth/register")}
							disabled={loading || isSubmitting}
						>
							Criar conta
						</CoreButton>
					</p>
				</div>
			</AuthCard>
		</div>
	);
};
