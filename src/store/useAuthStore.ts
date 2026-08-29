import { create } from 'zustand';
import { User, AuthTokens } from '@/types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, tokens: AuthTokens) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user, tokens) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wakeway_access_token', tokens.accessToken);
      localStorage.setItem('wakeway_refresh_token', tokens.refreshToken);
      localStorage.setItem('wakeway_user', JSON.stringify(user));
    }
    set({
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setAccessToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wakeway_access_token', token);
    }
    set({ accessToken: token });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wakeway_access_token');
      localStorage.removeItem('wakeway_refresh_token');
      localStorage.removeItem('wakeway_user');
    }
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  initialize: () => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('wakeway_access_token');
      const refreshToken = localStorage.getItem('wakeway_refresh_token');
      const storedUser = localStorage.getItem('wakeway_user');

      if (accessToken && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        } catch {
          localStorage.clear();
        }
      }
    }
    set({ isLoading: false });
  },
}));
