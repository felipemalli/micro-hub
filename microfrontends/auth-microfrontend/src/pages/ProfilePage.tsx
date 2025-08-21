import React, { useState } from "react";
import { useAuth } from "../app/providers/AuthProvider";
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { useNavigate } from "react-router-dom";
import { FormData, FormErrors } from "../types/auth";

const ProfilePage: React.FC = () => {
	const { user, logout, updateProfile, loading, error, clearError } = useAuth();
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		name: user?.name || "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isUpdating, setIsUpdating] = useState(false);

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/auth/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const handleInput = (e: CustomEvent) => {
		const target = e.detail?.target as HTMLInputElement;
		if (!target) return;

		const { name, value } = target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear errors when user starts typing
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

		if (!formData.name?.trim()) {
			newErrors.name = "Nome é obrigatório";
		} else if (formData.name.trim().length < 2) {
			newErrors.name = "Nome deve ter pelo menos 2 caracteres";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsUpdating(true);
		try {
			await updateProfile({ name: formData.name.trim() });
			setIsEditing(false);
		} catch {
			// Error is handled by AuthProvider
		} finally {
			setIsUpdating(false);
		}
	};

	const handleCancel = () => {
		setFormData({ name: user?.name || "" });
		setErrors({});
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
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Perfil</h1>
				<p className="text-gray-600">Suas informações pessoais</p>
			</div>

			{/* Error Display */}
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
					{error}
				</div>
			)}

			<div className="bg-white rounded-xl shadow-lg p-6 mb-6">
				{!isEditing ? (
					/* View Mode */
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">
								Nome
							</label>
							<p className="text-lg font-medium text-gray-800">{user.name}</p>
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
					/* Edit Mode */
					<form onSubmit={handleSave} className="space-y-4">
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
								onCoreInput={handleInput}
								disabled={isUpdating}
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
								onClick={handleSave}
								variant="primary"
								disabled={isUpdating}
								className="flex-1"
							>
								{isUpdating ? "Salvando..." : "Salvar"}
							</CoreButton>
							<CoreButton
								type="button"
								variant="secondary"
								onClick={handleCancel}
								disabled={isUpdating}
								className="flex-1"
							>
								Cancelar
							</CoreButton>
						</div>
					</form>
				)}
			</div>

			<div
				className={`flex  ${isEditing ? "w-full justify-end" : "w-full justify-between"}`}
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

export default ProfilePage;
