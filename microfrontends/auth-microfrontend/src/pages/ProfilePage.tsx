import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { useApiError } from "../hooks/useApiError";
import { validation } from "../utils/validation";
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { useNavigate } from "react-router-dom";

export const ProfilePage: React.FC = () => {
	const { user, logout, updateProfile, loading } = useAuth();
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const handleApiError = useApiError();

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
			handleApiError(error);
		}
	};

	const handleCancel = () => {
		reset();
		setIsEditing(false);
	};

	if (!user) {
		return (
			<div className="mx-auto w-full max-w-md text-center">
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
		<div className="mx-auto w-full max-w-md">
			<div className="my-8 text-center">
				<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
					<span className="text-2xl font-bold text-white">
						{user.name.charAt(0).toUpperCase()}
					</span>
				</div>
				<h1>Perfil</h1>
				<p>Suas informações pessoais</p>
			</div>
			<div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
				{!isEditing ? (
					<div className="space-y-4">
						<div>
							<label className="mb-1 block text-sm">Nome</label>
							<p className="text-lg text-gray-800">{user.name}</p>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-500">
								Email
							</label>
							<p className="text-lg font-medium text-gray-800">{user.email}</p>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-500">
								Tipo de conta
							</label>
							<span
								className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
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
								<label className="mb-1 block text-sm font-medium text-gray-500">
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
								className="mb-2 block text-sm font-medium text-gray-500"
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
								<p className="mt-1 text-sm text-red-600">{errors.name}</p>
							)}
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-500">
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
