import { User } from '../types/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

class AuthService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    console.log('response', response);

    return {
      user: response.user,
      token: response.token,
    };
  }

  async register(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await this.request<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    return {
      user: response.user,
      token: response.token,
    };
  }

  async getProfile(): Promise<User> {
    const response = await this.request<{ user: User }>('/api/auth/profile');
    return response.user;
  }
}

export const authService = new AuthService(); 