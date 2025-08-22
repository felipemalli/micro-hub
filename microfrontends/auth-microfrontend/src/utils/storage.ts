import { User } from "../types/auth";

export const storage = {
	getToken(): string | null {
		return localStorage.getItem("access_token");
	},

	setToken(token: string): void {
		localStorage.setItem("access_token", token);
	},

	getUser(): User | null {
		const userStr = localStorage.getItem("current_user");
		return userStr ? JSON.parse(userStr) : null;
	},

	setUser(user: User): void {
		localStorage.setItem("current_user", JSON.stringify(user));
	},

	clearAuth(): void {
		localStorage.removeItem("access_token");
		localStorage.removeItem("current_user");
	},

	isTokenExpired(token: string): boolean {
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const currentTime = Date.now() / 1000;
			return payload.exp < currentTime;
		} catch {
			return true;
		}
	},
};
