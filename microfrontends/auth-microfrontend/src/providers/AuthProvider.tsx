import React, {
	createContext,
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
} from "../types/auth";
import { authApi } from "../api/authApi";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

				if (authApi.isAuthenticated()) {
					const currentUser = authApi.getCurrentUser();
					if (currentUser) {
						setUser(currentUser);
						onAuthChange?.(true);
					} else {
						// Try to fetch fresh profile
						const userData = await authApi.getProfile();
						setUser(userData);
						onAuthChange?.(true);
					}
				}
			} catch (error) {
				console.error("Auth initialization failed:", error);
				await authApi.logout();
				setUser(null);
				onAuthChange?.(false);
			} finally {
				setLoading(false);
			}
		};

		initializeAuth();
	}, [onAuthChange]);

	const login = useCallback(
		async (credentials: LoginCredentials): Promise<void> => {
			try {
				setLoading(true);
				setError(null);

				const { user: userData } = await authApi.login(credentials);
				setUser(userData);
				onAuthChange?.(true);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Login failed";
				setError(errorMessage);
				// Re-lança o erro para que o useForm possa finalizar o isSubmitting
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

				const { user: userData } = await authApi.register(credentials);
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
			await authApi.logout();
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
				throw new Error("Usuário não logado");
			}

			try {
				setLoading(true);
				setError(null);

				const updatedUser = await authApi.updateProfile(user.id, data);
				setUser(updatedUser);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Falha ao atualizar perfil";
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
		isAuthenticated: !!user && authApi.isAuthenticated(),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
