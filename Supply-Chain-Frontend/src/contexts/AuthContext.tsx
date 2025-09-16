import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, User, UserRole } from '../types/auth';

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
    // Check for stored auth token
    const token = localStorage.getItem('auth_token');
    if (token) {
      // For now, assume token is valid if present
      // TODO: Implement proper token validation with backend
      setAuthState(prev => ({ 
        ...prev, 
        isAuthenticated: true, 
        isLoading: false 
      }));
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
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
