import { FormErrors } from "../types/auth";

export const validation = {
	email: (email: string): string => {
		if (!email) return "Email é obrigatório";
		if (!/\S+@\S+\.\S+/.test(email)) return "Email inválido";
		return "";
	},

	password: (password: string, minLength = 6): string => {
		if (!password) return "Senha é obrigatória";
		if (password.length < minLength)
			return `Senha deve ter pelo menos ${minLength} caracteres`;
		return "";
	},

	name: (name: string, minLength = 2): string => {
		if (!name?.trim()) return "Nome é obrigatório";
		if (name.trim().length < minLength)
			return `Nome deve ter pelo menos ${minLength} caracteres`;
		return "";
	},

	confirmPassword: (password: string, confirmPassword: string): string => {
		if (!confirmPassword) return "Confirmação de senha é obrigatória";
		if (password !== confirmPassword) return "Senhas não coincidem";
		return "";
	},

	validateLoginForm: (email: string, password: string): FormErrors => {
		const errors: FormErrors = {};

		const emailError = validation.email(email);
		if (emailError) errors.email = emailError;

		const passwordError = validation.password(password);
		if (passwordError) errors.password = passwordError;

		return errors;
	},

	validateRegisterForm: (
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	): FormErrors => {
		const errors: FormErrors = {};

		const nameError = validation.name(name);
		if (nameError) errors.name = nameError;

		const emailError = validation.email(email);
		if (emailError) errors.email = emailError;

		const passwordError = validation.password(password);
		if (passwordError) errors.password = passwordError;

		const confirmError = validation.confirmPassword(password, confirmPassword);
		if (confirmError) errors.confirmPassword = confirmError;

		return errors;
	},

	validateProfileForm: (name: string): FormErrors => {
		const errors: FormErrors = {};

		const nameError = validation.name(name);
		if (nameError) errors.name = nameError;

		return errors;
	},
};
