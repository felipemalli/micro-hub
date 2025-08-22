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
	const { login, loading, isAuthenticated } = useAuth();

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
				<div>
					<label htmlFor="email" className="mb-2 block text-sm">
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
						<p className="mt-1 text-sm text-red-600">{errors.email}</p>
					)}
				</div>
				<div>
					<label htmlFor="password" className="mb-2 block text-sm">
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
						<p className="mt-1 text-sm text-red-600">{errors.password}</p>
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
