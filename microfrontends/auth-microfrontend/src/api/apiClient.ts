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

// Request interceptor - adiciona auth header
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

// Response interceptor - trata erros de forma inteligente
apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as any;

		// Handle 401 APENAS para rotas protegidas (que têm token)
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			originalRequest.headers?.Authorization // Só se tinha token
		) {
			originalRequest._retry = true;

			// Clear invalid token
			storage.clearAuth();

			// Criar erro específico para token expirado
			const authError = new Error("Sessão expirada. Faça login novamente.");
			authError.name = "AuthenticationError";
			return Promise.reject(authError);
		}

		// Para outros erros (incluindo 401 em login/register), criar erro padrão
		const apiError = new Error(
			(error.response?.data as any)?.data?.message ||
				(error.response?.data as any)?.message ||
				(error.response?.data as any)?.error ||
				"Erro de conexão. Tente novamente."
		);
		apiError.name = "APIError";

		// Adicionar metadata útil para o ErrorBoundary
		(apiError as any).statusCode = error.response?.status;
		(apiError as any).endpoint = error.config?.url;

		return Promise.reject(apiError);
	}
);

// Helper para retry com backoff simples
export const retryRequest = async <T>(
	requestFn: () => Promise<T>,
	maxRetries = 3,
	baseDelay = 1000
): Promise<T> => {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await requestFn();
		} catch (error) {
			// Se é erro de auth, não retry
			if ((error as any).name === "AuthenticationError") {
				throw error;
			}

			if (attempt === maxRetries) throw error;

			// Exponential backoff simples
			const delay = baseDelay * Math.pow(2, attempt - 1);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}
	throw new Error("Max retries exceeded");
};
