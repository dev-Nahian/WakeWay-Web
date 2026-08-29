import { apiClient } from './client';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
  User,
} from '@/types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      // Fallback mock handling for seamless UI demo if FastAPI backend is offline
      if (!error.response || error.code === 'ERR_NETWORK' || error.response.status === 404) {
        await new Promise((res) => setTimeout(res, 800)); // Simulate network latency
        
        if (credentials.email === 'error@wakeway.app') {
          throw new Error('Invalid email or password.');
        }

        const mockUser: User = {
          id: 'usr_demo_123',
          email: credentials.email,
          fullName: credentials.email.split('@')[0].toUpperCase(),
          createdAt: new Date().toISOString(),
        };
        return {
          user: mockUser,
          tokens: {
            accessToken: 'mock_jwt_access_token_' + Date.now(),
            refreshToken: 'mock_jwt_refresh_token_' + Date.now(),
          },
        };
      }
      throw new Error(error.response?.data?.detail || 'Failed to sign in');
    }
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/register', credentials);
      return response.data;
    } catch (error: any) {
      if (!error.response || error.code === 'ERR_NETWORK' || error.response.status === 404) {
        await new Promise((res) => setTimeout(res, 800));
        
        const mockUser: User = {
          id: 'usr_' + Date.now(),
          email: credentials.email,
          fullName: credentials.fullName,
          createdAt: new Date().toISOString(),
        };
        return {
          user: mockUser,
          tokens: {
            accessToken: 'mock_jwt_access_token_' + Date.now(),
            refreshToken: 'mock_jwt_refresh_token_' + Date.now(),
          },
        };
      }
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    try {
      const response = await apiClient.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error: any) {
      if (!error.response || error.code === 'ERR_NETWORK') {
        return { accessToken: 'mock_refreshed_access_token_' + Date.now() };
      }
      throw error;
    }
  },

  forgotPassword: async (credentials: ForgotPasswordCredentials): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post('/auth/forgot-password', credentials);
      return response.data;
    } catch (error: any) {
      if (!error.response || error.code === 'ERR_NETWORK' || error.response.status === 404) {
        await new Promise((res) => setTimeout(res, 800));
        return { message: 'Password reset link has been sent to your email.' };
      }
      throw new Error(error.response?.data?.detail || 'Failed to send reset link');
    }
  },

  resetPassword: async (credentials: ResetPasswordCredentials): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post('/auth/reset-password', credentials);
      return response.data;
    } catch (error: any) {
      if (!error.response || error.code === 'ERR_NETWORK' || error.response.status === 404) {
        await new Promise((res) => setTimeout(res, 800));
        return { message: 'Your password has been successfully reset.' };
      }
      throw new Error(error.response?.data?.detail || 'Failed to reset password');
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
