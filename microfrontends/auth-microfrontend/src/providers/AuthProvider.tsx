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
import { useApiError } from "../hooks/useApiError";

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
	const handleApiError = useApiError();

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

				const { user: userData } = await authApi.login(credentials);
				setUser(userData);
				onAuthChange?.(true);
			} catch (error) {
				if (error instanceof Error) {
					handleApiError(error);
				}
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[handleApiError, onAuthChange]
	);

	const register = useCallback(
		async (credentials: RegisterCredentials): Promise<void> => {
			try {
				setLoading(true);

				const { user: userData } = await authApi.register(credentials);
				setUser(userData);
				onAuthChange?.(true);
			} catch (error) {
				if (error instanceof Error) {
					handleApiError(error);
				}
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[handleApiError, onAuthChange]
	);

	const logout = useCallback(async (): Promise<void> => {
		try {
			setLoading(true);
			await authApi.logout();
			setUser(null);
			onAuthChange?.(false);
		} catch (error) {
			console.error("Logout error:", error);
			setUser(null);
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

				const updatedUser = await authApi.updateProfile(user.id, data);
				setUser(updatedUser);
			} catch (error) {
				if (error instanceof Error) {
					handleApiError(error);
				}
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[handleApiError, user]
	);

	const value: AuthContextType = {
		user,
		loading,
		login,
		register,
		logout,
		updateProfile,
		isAuthenticated: !!user && authApi.isAuthenticated(),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
