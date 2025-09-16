export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  confirmPassword: string;
  role: UserRole;
}

export type UserRole = 'PRODUCER' | 'TRANSPORTER' | 'WAREHOUSE' | 'DISTRIBUTOR' | 'CONSUMER';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
