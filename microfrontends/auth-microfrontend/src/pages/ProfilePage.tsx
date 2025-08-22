import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { useAsyncError } from "../hooks/useAsyncError";
import { validation } from "../utils/validation";
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { useNavigate } from "react-router-dom";

export const ProfilePage: React.FC = () => {
	const { user, logout, updateProfile, loading, error, clearError } = useAuth();
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const captureAsyncError = useAsyncError();

	const {
		values: formData,
		errors,
		isSubmitting,
		handleChange,
		handleSubmit,
		reset,
	} = useForm({
		initialValues: { name: user?.name || "" },
		validate: (values) => validation.validateProfileForm(values.name),
		onSubmit: async (values) => {
			await updateProfile({ name: values.name.trim() });
			setIsEditing(false);
		},
	});

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/auth/login");
		} catch (error) {
			console.error("Logout error:", error);
			// Captura o erro no ErrorBoundary se for crítico
			if (error instanceof Error && error.message.includes("critical")) {
				captureAsyncError(error, "ProfilePage logout");
			}
		}
	};

	const handleCancel = () => {
		reset();
		setIsEditing(false);
		clearError();
	};

	if (!user) {
		return (
			<div className="w-full max-w-md mx-auto text-center">
				<p className="text-gray-600">Usuário não encontrado</p>
				<CoreButton
					onClick={() => navigate("/auth/login")}
					variant="primary"
					className="mt-4"
				>
					Fazer Login
				</CoreButton>
			</div>
		);
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center my-8">
				<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
					<span className="text-white text-2xl font-bold">
						{user.name.charAt(0).toUpperCase()}
					</span>
				</div>
				<h1>Perfil</h1>
				<p>Suas informações pessoais</p>
			</div>
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
					{error}
				</div>
			)}
			<div className="bg-white rounded-xl shadow-lg p-6 mb-6">
				{!isEditing ? (
					<div className="space-y-4">
						<div>
							<label className="block text-sm mb-1">Nome</label>
							<p className="text-lg text-gray-800">{user.name}</p>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">
								Email
							</label>
							<p className="text-lg font-medium text-gray-800">{user.email}</p>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">
								Tipo de conta
							</label>
							<span
								className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
									user.role === "admin"
										? "bg-purple-100 text-purple-800"
										: "bg-blue-100 text-blue-800"
								}`}
							>
								{user.role === "admin" ? "Administrador" : "Usuário"}
							</span>
						</div>
						{user.createdAt && (
							<div>
								<label className="block text-sm font-medium text-gray-500 mb-1">
									Membro desde
								</label>
								<p className="text-lg font-medium text-gray-800">
									{new Date(user.createdAt).toLocaleDateString("pt-BR")}
								</p>
							</div>
						)}
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-500 mb-2"
							>
								Nome
							</label>
							<CoreInput
								type="text"
								inputId="name"
								name="name"
								value={formData.name}
								placeholder="Seu nome completo"
								error={!!errors.name}
								onCoreInput={handleChange}
								disabled={isSubmitting}
							/>
							{errors.name && (
								<p className="text-red-600 text-sm mt-1">{errors.name}</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">
								Email (não pode ser alterado)
							</label>
							<p className="text-lg font-medium text-gray-400">{user.email}</p>
						</div>
						<div className="flex gap-3 pt-4">
							<CoreButton
								type="submit"
								onClick={handleSubmit}
								variant="primary"
								disabled={isSubmitting}
								className="flex-1"
							>
								{isSubmitting ? "Salvando..." : "Salvar"}
							</CoreButton>
							<CoreButton
								type="button"
								variant="secondary"
								onClick={handleCancel}
								disabled={isSubmitting}
								className="flex-1"
							>
								Cancelar
							</CoreButton>
						</div>
					</form>
				)}
			</div>
			<div
				className={`flex ${
					isEditing ? "w-full justify-end" : "w-full justify-between"
				}`}
			>
				{!isEditing && (
					<CoreButton
						onClick={() => setIsEditing(true)}
						variant="primary"
						disabled={loading}
					>
						Editar Perfil
					</CoreButton>
				)}
				<CoreButton onClick={handleLogout} variant="danger" disabled={loading}>
					{loading ? "Saindo..." : "Sair da conta"}
				</CoreButton>
			</div>
		</div>
	);
};
