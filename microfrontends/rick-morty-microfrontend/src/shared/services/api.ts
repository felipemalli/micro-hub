import axios, { AxiosInstance, AxiosResponse } from "axios";

class ApiClient {
	private client: AxiosInstance;
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
		this.client = axios.create({
			baseURL,
			timeout: 10000,
		});

		this.setupInterceptors();
	}

	private setupInterceptors() {
		this.client.interceptors.response.use(
			(response) => response,
			(error) => {
				console.error("API Error:", error);
				return Promise.reject(error);
			}
		);
	}

	async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
		const response: AxiosResponse<T> = await this.client.get(endpoint, {
			params,
		});
		return response.data;
	}
}

export const rickMortyApi = new ApiClient("https://rickandmortyapi.com/api");
