import type { SignInCredentials, SignUpCredentials, AuthResponse } from '../types/auth';

class AuthService {
  private readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/auth/signin`, {
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
    const response = await fetch(`${this.API_URL}/auth/signup`, {
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

  async validateToken(token: string): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }

    return response.json();
  }
}

export const authService = new AuthService();
