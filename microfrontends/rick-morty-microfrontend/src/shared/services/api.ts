import axios, { AxiosError, AxiosInstance } from "axios";

const API_BASE_URL = "https://rickandmortyapi.com/api";

class ApiClient {
	private client: AxiosInstance;

	constructor(baseURL: string) {
		this.client = axios.create({
			baseURL,
			timeout: 10000,
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.setupInterceptors();
	}

	private setupInterceptors() {
		this.client.interceptors.response.use(
			(response) => response,
			(error: AxiosError) => {
				const status = error.response?.status;
				const message = this.getErrorMessage(error, status);

				const apiError = new Error(message);
				apiError.name = status >= 500 ? "ServerError" : "APIError";

				(apiError as any).statusCode = status;
				(apiError as any).shouldShowInBoundary = status >= 500;

				return Promise.reject(apiError);
			}
		);
	}

	private getErrorMessage(error: AxiosError, status?: number): string {
		const responseMessage =
			(error.response?.data as any)?.error ||
			(error.response?.data as any)?.message;

		if (responseMessage) return responseMessage;
		if (!status) return "Erro de conexão. Verifique sua internet.";
		if (status >= 500) return "Erro no servidor. Tente novamente.";
		if (status === 404) return "Dados não encontrados.";
		return "Algo deu errado. Tente novamente.";
	}

	async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
		const response = await this.client.get(endpoint, { params });
		return response.data;
	}
}

export const rickMortyApi = new ApiClient(API_BASE_URL);
