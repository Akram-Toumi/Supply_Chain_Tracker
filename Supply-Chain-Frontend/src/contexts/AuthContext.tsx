import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, User, UserRole } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  userRole: UserRole | null;
  isAuthorized: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const validation = await authService.validateToken();
        if (validation) {
          setAuthState({
            user: validation.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('auth_token');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const userRole = authState.user?.role ?? null;

  const isAuthorized = (allowedRoles: UserRole[]) => {
    return userRole ? allowedRoles.includes(userRole) : false;
  };

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      logout,
      userRole,
      isAuthorized
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
