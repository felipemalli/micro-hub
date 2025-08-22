import { apiClient, retryRequest } from "./apiClient";
import { storage } from "../utils/storage";
import { User, LoginCredentials, RegisterCredentials } from "../types/auth";

interface AuthResponse {
	data: {
		message: string;
		user: User;
		token: string;
	};
}

interface ProfileResponse {
	data: {
		message: string;
		user: User;
	};
}

export const authApi = {
	async login(
		credentials: LoginCredentials
	): Promise<{ user: User; token: string }> {
		const response = await retryRequest(() =>
			apiClient.post<AuthResponse>("/auth/login", credentials)
		);

		const { user, token } = response.data.data;

		storage.setToken(token);
		storage.setUser(user);

		return { user, token };
	},

	async register(
		credentials: RegisterCredentials
	): Promise<{ user: User; token: string }> {
		const response = await retryRequest(() =>
			apiClient.post<AuthResponse>("/auth/register", credentials)
		);

		const { user, token } = response.data.data;

		storage.setToken(token);
		storage.setUser(user);

		return { user, token };
	},

	async getProfile(): Promise<User> {
		const response = await apiClient.get<ProfileResponse>("/auth/profile");
		const user = response.data.data.user;

		storage.setUser(user);
		return user;
	},

	async updateProfile(userId: string, data: { name: string }): Promise<User> {
		const response = await apiClient.put<ProfileResponse>(
			`/users/${userId}`,
			data
		);
		const user = response.data.data.user;

		storage.setUser(user);
		return user;
	},

	async logout(): Promise<void> {
		try {
			await apiClient.post("/auth/logout");
		} catch {
			console.warn("Logout API call failed, continuing with local cleanup");
		} finally {
			storage.clearAuth();
		}
	},

	getCurrentUser(): User | null {
		return storage.getUser();
	},

	isAuthenticated(): boolean {
		const token = storage.getToken();
		const user = storage.getUser();
		return !!(token && user && !storage.isTokenExpired(token));
	},
};
