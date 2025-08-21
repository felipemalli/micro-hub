import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from "react";
import {
	User,
	AuthContextType,
	LoginCredentials,
	RegisterCredentials,
	UpdateProfileData,
} from "../../types/auth";
import { authService } from "../../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
	onAuthChange?: (isAuthenticated: boolean) => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
	children,
	onAuthChange,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Initialize auth state
	useEffect(() => {
		const initializeAuth = async () => {
			try {
				setLoading(true);

				if (authService.isAuthenticated()) {
					const currentUser = authService.getCurrentUser();
					if (currentUser) {
						setUser(currentUser);
						onAuthChange?.(true);
					} else {
						// Try to fetch fresh profile
						const userData = await authService.getProfile();
						setUser(userData);
						onAuthChange?.(true);
					}
				}
			} catch (error) {
				console.error("Auth initialization failed:", error);
				authService.logout();
				setUser(null);
				onAuthChange?.(false);
			} finally {
				setLoading(false);
			}
		};

		initializeAuth();
	}, [onAuthChange]);

	// Listen for logout events
	useEffect(() => {
		const handleLogout = () => {
			setUser(null);
			setError(null);
			onAuthChange?.(false);
		};

		window.addEventListener("auth:logout", handleLogout);
		return () => window.removeEventListener("auth:logout", handleLogout);
	}, [onAuthChange]);

	const login = useCallback(
		async (credentials: LoginCredentials): Promise<void> => {
			try {
				console.log("AuthProvider: Starting login...");
				setLoading(true);
				setError(null);

				const { user: userData } = await authService.login(credentials);
				console.log("AuthProvider: Login successful, setting user:", userData);
				setUser(userData);
				onAuthChange?.(true);
			} catch (error) {
				console.error("AuthProvider: Login failed:", error);
				const errorMessage =
					error instanceof Error ? error.message : "Login failed";
				setError(errorMessage);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[onAuthChange]
	);

	const register = useCallback(
		async (credentials: RegisterCredentials): Promise<void> => {
			try {
				setLoading(true);
				setError(null);

				const { user: userData } = await authService.register(credentials);
				setUser(userData);
				onAuthChange?.(true);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Registration failed";
				setError(errorMessage);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[onAuthChange]
	);

	const logout = useCallback(async (): Promise<void> => {
		try {
			setLoading(true);
			await authService.logout();
			setUser(null);
			setError(null);
			onAuthChange?.(false);
		} catch (error) {
			console.error("Logout error:", error);
			// Force logout even if API call fails
			setUser(null);
			setError(null);
			onAuthChange?.(false);
		} finally {
			setLoading(false);
		}
	}, [onAuthChange]);

	const updateProfile = useCallback(
		async (data: UpdateProfileData): Promise<void> => {
			if (!user) {
				throw new Error("No user logged in");
			}

			try {
				setLoading(true);
				setError(null);

				const updatedUser = await authService.updateProfile(user.id, data);
				setUser(updatedUser);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Profile update failed";
				setError(errorMessage);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[user]
	);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	const value: AuthContextType = {
		user,
		loading,
		error,
		login,
		register,
		logout,
		updateProfile,
		clearError,
		isAuthenticated: !!user && authService.isAuthenticated(),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
