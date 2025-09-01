import { useState, useEffect } from 'react';
import type { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('agritrace_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false
        });
      } catch (error) {
        localStorage.removeItem('agritrace_user');
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false
      });
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem('agritrace_user', JSON.stringify(user));
    setAuthState({
      isAuthenticated: true,
      user,
      loading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('agritrace_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};