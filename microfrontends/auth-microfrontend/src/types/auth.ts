export interface User {
	id: string;
	email: string;
	name: string;
	role: "admin" | "user";
	createdAt?: string;
	updatedAt?: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
}

export interface UpdateProfileData {
	name: string;
}

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	error: string | null;
	login: (credentials: LoginCredentials) => Promise<void>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	logout: () => Promise<void>;
	updateProfile: (data: UpdateProfileData) => Promise<void>;
	clearError: () => void;
	isAuthenticated: boolean;
}

export interface AuthAppProps {
	onAuthChange?: (isAuthenticated: boolean) => void;
	isAuthenticated?: boolean;
}

export interface FormData {
	[key: string]: string;
}

export interface FormErrors {
	[key: string]: string;
}

export interface ApiError {
	message: string;
	statusCode?: number;
}
