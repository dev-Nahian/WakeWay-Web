import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface ApiErrorMessage {
  status: number;
  message: string;
  detail?: string | any;
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as any;
    const status = error.response?.status;

    // Handle 401 Unauthorized & Token Refreshing
    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken) {
        try {
          const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
          const newAccessToken = res.data.accessToken;

          useAuthStore.getState().setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch {
          useAuthStore.getState().logout();
        }
      } else {
        useAuthStore.getState().logout();
      }
    }

    // Format User-Friendly Error Messages
    let customMessage = 'An unexpected error occurred. Please try again.';

    if (status === 401) {
      customMessage = 'Your session has expired. Please log in again.';
    } else if (status === 403) {
      customMessage = 'You do not have permission to perform this action.';
    } else if (status === 404) {
      customMessage = 'The requested resource or trip could not be found.';
    } else if (status === 422) {
      const details = error.response?.data?.detail;
      if (Array.isArray(details)) {
        customMessage = `Validation Error: ${details.map((d: any) => d.msg || d.message).join(', ')}`;
      } else {
        customMessage = 'Invalid data submitted. Please check your inputs.';
      }
    } else if (status === 429) {
      customMessage = 'Too many requests. Please slow down and wait a moment.';
    } else if (status && status >= 500) {
      customMessage = 'Server connection error. WakeWay backend service is unreachable.';
    }

    const enhancedError: ApiErrorMessage = {
      status: status || 500,
      message: customMessage,
      detail: error.response?.data?.detail || error.message,
    };

    return Promise.reject(enhancedError);
  }
);
