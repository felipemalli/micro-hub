export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'admin' | 'user';
}

export interface AuthAppProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
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