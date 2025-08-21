import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { User, LoginCredentials, RegisterCredentials } from "../types/auth";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Create axios instance
const apiClient = axios.create({
	baseURL: `${API_BASE_URL}/api`,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Auth service response interfaces
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

interface UpdateProfileResponse {
	data: {
		message: string;
		user: User;
	};
}

// Queue management for concurrent requests
interface RetryQueueItem {
	resolve: (value?: any) => void;
	reject: (error?: any) => void;
	config: AxiosRequestConfig;
}

let isRefreshing = false;
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Token management utility
class TokenManager {
	static getAccessToken(): string | null {
		return localStorage.getItem("accessToken");
	}

	static setAccessToken(token: string): void {
		localStorage.setItem("accessToken", token);
	}

	static removeTokens(): void {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("currentUser");
	}

	static getCurrentUser(): User | null {
		const userStr = localStorage.getItem("currentUser");
		return userStr ? JSON.parse(userStr) : null;
	}

	static setCurrentUser(user: User): void {
		localStorage.setItem("currentUser", JSON.stringify(user));
	}

	static isTokenExpired(token: string): boolean {
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const currentTime = Date.now() / 1000;
			return payload.exp < currentTime;
		} catch {
			return true;
		}
	}
}

// Request interceptor - adds token to all requests
apiClient.interceptors.request.use(
	(config) => {
		const token = TokenManager.getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor - handles token refresh
apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (!isRefreshing) {
				isRefreshing = true;

				try {
					// Try to refresh using the current token
					const currentToken = TokenManager.getAccessToken();
					if (!currentToken) {
						throw new Error("No token available");
					}

					// For now, we'll use the profile endpoint to validate token
					// In a real app, you'd have a dedicated refresh endpoint
					const profileResponse = await axios.get(
						`${API_BASE_URL}/api/auth/profile`,
						{
							headers: { Authorization: `Bearer ${currentToken}` },
						}
					);
					console.log(
						"Token refresh check - profile response:",
						profileResponse.data
					);

					// If profile request succeeds, token is still valid
					originalRequest._retry = true;
					originalRequest.headers!.Authorization = `Bearer ${currentToken}`;

					// Retry all queued requests
					refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
						apiClient
							.request(config)
							.then((response) => resolve(response))
							.catch((err) => reject(err));
					});

					// Clear the queue
					refreshAndRetryQueue.length = 0;

					// Retry the original request
					return apiClient(originalRequest);
				} catch {
					// Token refresh failed, logout user
					TokenManager.removeTokens();

					// Reject all queued requests
					refreshAndRetryQueue.forEach(({ reject }) => {
						reject(new Error("Authentication failed"));
					});
					refreshAndRetryQueue.length = 0;

					// Notify about authentication failure
					window.dispatchEvent(new CustomEvent("auth:logout"));

					throw new Error("Session expired. Please login again.");
				} finally {
					isRefreshing = false;
				}
			}

			// Add request to queue if refresh is in progress
			return new Promise((resolve, reject) => {
				refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
			});
		}

		return Promise.reject(error);
	}
);

// Auth service class
class AuthService {
	async login(
		credentials: LoginCredentials
	): Promise<{ user: User; token: string }> {
		try {
			console.log("Attempting login with:", credentials);
			const response = await apiClient.post<AuthResponse>(
				"/auth/login",
				credentials
			);

			console.log("Login response:", response.data);
			const { user, token } = response.data.data;

			// Store token and user data
			TokenManager.setAccessToken(token);
			TokenManager.setCurrentUser(user);

			window.dispatchEvent(
				new CustomEvent("auth:login", { detail: { user, token } })
			);

			console.log("Login successful, user stored:", user);
			return { user, token };
		} catch (error) {
			console.error("Login error:", error);
			throw this.handleError(error, "Login failed");
		}
	}

	async register(
		credentials: RegisterCredentials
	): Promise<{ user: User; token: string }> {
		try {
			const response = await apiClient.post<AuthResponse>(
				"/auth/register",
				credentials
			);

			const { user, token } = response.data.data;

			// Store token and user data
			TokenManager.setAccessToken(token);
			TokenManager.setCurrentUser(user);

			window.dispatchEvent(
				new CustomEvent("auth:login", { detail: { user, token } })
			);

			return { user, token };
		} catch (error) {
			throw this.handleError(error, "Registration failed");
		}
	}

	async getProfile(): Promise<User> {
		try {
			const response = await apiClient.get<ProfileResponse>("/auth/profile");
			const { user } = response.data.data;

			// Update stored user data
			TokenManager.setCurrentUser(user);

			return user;
		} catch (error) {
			throw this.handleError(error, "Failed to fetch profile");
		}
	}

	async updateProfile(
		userId: string,
		profileData: { name: string }
	): Promise<User> {
		try {
			const response = await apiClient.put<UpdateProfileResponse>(
				`/users/${userId}`,
				profileData
			);
			const { user } = response.data.data;

			// Update stored user data
			TokenManager.setCurrentUser(user);

			return user;
		} catch (error) {
			throw this.handleError(error, "Failed to update profile");
		}
	}

	async logout(): Promise<void> {
		try {
			// Clear stored tokens and user data
			TokenManager.removeTokens();

			// Notify other parts of the app about logout
			window.dispatchEvent(new CustomEvent("auth:logout"));
		} catch (error) {
			console.error("Logout error:", error);
			// Even if logout fails, clear local data
			TokenManager.removeTokens();
		}
	}

	getCurrentUser(): User | null {
		return TokenManager.getCurrentUser();
	}

	isAuthenticated(): boolean {
		const token = TokenManager.getAccessToken();
		const user = TokenManager.getCurrentUser();
		return !!(token && user && !TokenManager.isTokenExpired(token));
	}

	private handleError(error: any, defaultMessage: string): Error {
		console.error("AuthService error details:", error);
		if (axios.isAxiosError(error)) {
			const message =
				error.response?.data?.data?.message ||
				error.response?.data?.message ||
				defaultMessage;
			console.error("API error message:", message);
			return new Error(message);
		}
		return new Error(defaultMessage);
	}
}

// Export singleton instance
export const authService = new AuthService();
export { TokenManager };
