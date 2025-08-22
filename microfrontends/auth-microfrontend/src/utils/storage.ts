import { User } from "../types/auth";

export const storage = {
	getToken(): string | null {
		return localStorage.getItem("accessToken");
	},

	setToken(token: string): void {
		localStorage.setItem("accessToken", token);
	},

	getUser(): User | null {
		const userStr = localStorage.getItem("currentUser");
		return userStr ? JSON.parse(userStr) : null;
	},

	setUser(user: User): void {
		localStorage.setItem("currentUser", JSON.stringify(user));
	},

	clearAuth(): void {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("currentUser");
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
