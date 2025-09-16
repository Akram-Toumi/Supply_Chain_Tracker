import type { SignInCredentials, SignUpCredentials, AuthResponse } from '../types/auth';

class AuthService {
  private readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

}

export const authService = new AuthService();
