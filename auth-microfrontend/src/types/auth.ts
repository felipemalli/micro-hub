export interface User {
  id: number;
  email: string;
  name: string;
}

export interface MockUser extends User {
  password: string;
}

export interface AuthAppProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
}

export interface LoginProps {
  onLogin: (email: string, password: string) => Promise<User>;
}

export interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => Promise<User>;
}

export interface ProfileProps {
  user: User;
  onLogout: () => void;
}

export interface FormData {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}