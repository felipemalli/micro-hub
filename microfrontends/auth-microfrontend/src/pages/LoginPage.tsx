import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import { FormData, FormErrors } from "../types/auth";
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { AuthCard } from "../app/components/AuthCard";
import { ErrorTestComponent } from "../components/ErrorTestComponent";

const LoginPage: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const navigate = useNavigate();
	const { login, loading, error, clearError, isAuthenticated } = useAuth();

	// Redirect if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/auth/profile");
		}
	}, [isAuthenticated, navigate]);

	// Clear errors when component mounts
	useEffect(() => {
		clearError();
	}, [clearError]);

	const handleInput = (e: CustomEvent) => {
		const target = e.detail?.target as HTMLInputElement;
		if (!target) return;

		const { name, value } = target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear field errors when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
		clearError();
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.email) {
			newErrors.email = "Email é obrigatório";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email inválido";
		}

		if (!formData.password) {
			newErrors.password = "Senha é obrigatória";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		console.log("LoginPage: Submitting form...");
		try {
			await login({
				email: formData.email.trim(),
				password: formData.password,
			});
			console.log("LoginPage: Login successful, navigating to profile...");
			navigate("/auth/profile");
		} catch (error) {
			console.error("LoginPage: Login failed:", error);
			// Error is handled by AuthProvider
		}
	};

	return (
		<div className="space-y-6">
			{/* Componente de teste - REMOVER após testar */}
			<ErrorTestComponent />

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
						onCoreInput={handleInput}
						disabled={loading}
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
						disabled={loading}
					/>
					{errors.password && (
						<p className="text-red-600 text-sm mt-1">{errors.password}</p>
					)}
				</div>

				<CoreButton
					type="submit"
					variant="primary"
					disabled={loading}
					onClick={handleSubmit}
					className="w-full"
				>
					{loading ? "Entrando..." : "Entrar"}
				</CoreButton>

				<div className="text-center">
					<p>
						Não tem uma conta?{" "}
						<CoreButton
							type="button"
							variant="underline"
							onCoreClick={() => navigate("/auth/register")}
							disabled={loading}
						>
							Criar conta
						</CoreButton>
					</p>
				</div>
			</AuthCard>
		</div>
	);
};

export default LoginPage;
