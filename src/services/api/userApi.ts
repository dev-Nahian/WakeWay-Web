import { apiClient } from './client';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface UserSettings {
  defaultRadius: string;
  defaultAlertType: string;
  defaultEarlyWarning: string;
  themeMode: 'Light' | 'Dark' | 'System';
}

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    try {
      const res = await apiClient.get<UserProfile>('/users/me');
      return res.data;
    } catch {
      return {
        id: 'usr_demo_123',
        email: 'nahian@wakeway.app',
        fullName: 'Nahian Ahmed',
        createdAt: '2026-08-01T00:00:00Z',
      };
    }
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const res = await apiClient.patch<UserProfile>('/users/me', data);
      return res.data;
    } catch {
      return {
        id: 'usr_demo_123',
        email: data.email || 'nahian@wakeway.app',
        fullName: data.fullName || 'Nahian Ahmed',
        createdAt: '2026-08-01T00:00:00Z',
      };
    }
  },

  updateSettings: async (settings: Partial<UserSettings>): Promise<UserSettings> => {
    try {
      const res = await apiClient.patch<UserSettings>('/users/me/settings', settings);
      return res.data;
    } catch {
      return {
        defaultRadius: settings.defaultRadius || '500m',
        defaultAlertType: settings.defaultAlertType || 'Sound + Vibration',
        defaultEarlyWarning: settings.defaultEarlyWarning || '1km',
        themeMode: settings.themeMode || 'Dark',
      };
    }
  },

  deleteAccount: async (): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>('/users/me');
    return res.data;
  },
};
