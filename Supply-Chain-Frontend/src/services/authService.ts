import type { SignInCredentials, SignUpCredentials, AuthResponse, User } from '../types/auth';

interface ValidateTokenResponse {
  message: string;
  user: User;
}

class AuthService {
  private readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign in');
    }

    const data = await response.json();
    localStorage.setItem('auth_token', data.token);
    return data;
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }

    const data = await response.json();
    localStorage.setItem('auth_token', data.token);
    return data;
  }

  async validateToken(): Promise<ValidateTokenResponse | null> {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    const response = await fetch(`${this.API_URL}/auth/me`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      localStorage.removeItem('auth_token');
      return null;
    }

    return await response.json();
  }

}

export const authService = new AuthService();
