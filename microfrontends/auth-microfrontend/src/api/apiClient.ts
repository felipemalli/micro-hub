import axios, { AxiosError } from "axios";
import { storage } from "../utils/storage";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const apiClient = axios.create({
	baseURL: `${API_BASE_URL}/api`,
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Helper para verificar se request tem token
const hasAuthToken = (config: any): boolean => {
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
	async (error: AxiosError) => {
		const originalRequest = error.config as any;
		const status = error.response?.status;

		if (
			status === 401 &&
			hasAuthToken(originalRequest) &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			storage.clearAuth();

			const authError = new Error("Sessão expirada. Faça login novamente.");
			authError.name = "AuthenticationError";
			return Promise.reject(authError);
		}

		const message =
			(error.response?.data as any)?.message ||
			(error.response?.data as any)?.error ||
			getDefaultMessage(status);

		const apiError = new Error(message);
		apiError.name = status >= 500 ? "ServerError" : "APIError";

		// Metadata para ErrorBoundary
		(apiError as any).statusCode = status;
		(apiError as any).endpoint = error.config?.url;
		(apiError as any).shouldShowInBoundary = status >= 500;

		return Promise.reject(apiError);
	}
);

const getDefaultMessage = (status?: number): string => {
	if (!status) return "Erro de conexão. Verifique sua internet.";
	if (status >= 500) return "Erro no servidor. Tente novamente.";
	return "Algo deu errado. Tente novamente.";
};

export const retryRequest = async <T>(
	requestFn: () => Promise<T>,
	maxRetries = 3,
	baseDelay = 1000
): Promise<T> => {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await requestFn();
		} catch (error) {
			if ((error as any).status === 401) {
				throw error;
			}

			if (attempt === maxRetries) throw error;

			const baseDelayWithBackoff = baseDelay * Math.pow(2, attempt - 1);
			const jitter = Math.random() * 0.1;
			const delay = baseDelayWithBackoff * (1 + jitter);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}
	throw new Error("Max retries exceeded");
};
