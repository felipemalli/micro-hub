import { useState, useEffect, useCallback } from "react";

interface UseAuthReturn {
	isAuthenticated: boolean;
	handleAuthChange: (authenticated: boolean) => void;
}

export const useAuth = (): UseAuthReturn => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const checkAuthState = useCallback(() => {
		const savedUser = localStorage.getItem("currentUser");
		const token = localStorage.getItem("accessToken");
		const isAuth = !!(savedUser && token);
		setIsAuthenticated(isAuth);
	}, []);

	useEffect(() => {
		checkAuthState();

		const handleLogin = () => {
			setIsAuthenticated(true);
		};

		const handleLogout = () => {
			setIsAuthenticated(false);
		};

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "currentUser" || e.key === "accessToken") {
				checkAuthState();
			}
		};

		window.addEventListener("auth:login", handleLogin);
		window.addEventListener("auth:logout", handleLogout);
		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("auth:login", handleLogin);
			window.removeEventListener("auth:logout", handleLogout);
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [checkAuthState]);

	const handleAuthChange = useCallback((authenticated: boolean) => {
		setIsAuthenticated(authenticated);
	}, []);

	return {
		isAuthenticated,
		handleAuthChange,
	};
};
