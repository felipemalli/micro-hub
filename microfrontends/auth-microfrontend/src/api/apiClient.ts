import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { storage } from "../utils/storage";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

interface ApiErrorResponse {
	message?: string;
	error?: string;
}

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

interface ExtendedError extends Error {
	statusCode?: number;
	endpoint?: string;
	shouldShowInBoundary?: boolean;
	status?: number;
}

export const apiClient = axios.create({
	baseURL: `${API_BASE_URL}/api`,
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

const hasAuthToken = (config: InternalAxiosRequestConfig): boolean => {
	return !!config?.headers?.Authorization;
};

apiClient.interceptors.request.use(
	(config) => {
		const token = storage.getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<ApiErrorResponse>) => {
		const originalRequest = error.config as ExtendedAxiosRequestConfig;
		const status = error.response?.status;

		if (
			status === 401 &&
			hasAuthToken(originalRequest) &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			storage.clearAuth();

			const authError: ExtendedError = new Error(
				"Sessão expirada. Faça login novamente."
			);
			authError.name = "AuthenticationError";
			return Promise.reject(authError);
		}

		const message =
			error.response?.data?.message ||
			error.response?.data?.error ||
			getDefaultMessage(status);

		const apiError: ExtendedError = new Error(message);
		apiError.name = status && status >= 500 ? "ServerError" : "APIError";

		// Metadata para ErrorBoundary
		apiError.statusCode = status;
		apiError.endpoint = error.config?.url;
		apiError.shouldShowInBoundary = status ? status >= 500 : false;

		return Promise.reject(apiError);
	}
);

const getDefaultMessage = (status?: number): string => {
	if (!status) return "Erro de conexão. Verifique sua internet.";
	if (status >= 500) return "Erro no servidor. Tente novamente.";
	return "Algo deu errado. Tente novamente.";
};
