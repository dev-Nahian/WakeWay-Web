import { apiClient } from './client';

export interface RegisterDTO {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}

export const authApi = {
  register: async (data: RegisterDTO): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/register', data);
    return res.data;
  },

  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', data);
    return res.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const res = await apiClient.post<{ message: string }>('/auth/logout');
    return res.data;
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const res = await apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
    return res.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const res = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const res = await apiClient.post<{ message: string }>('/auth/reset-password', { token, newPassword });
    return res.data;
  },
};
