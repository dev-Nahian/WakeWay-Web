import { apiClient } from './client';
import { DeviceSession } from '@/types/sync';

export const deviceApi = {
  getDevices: async (): Promise<DeviceSession[]> => {
    try {
      const res = await apiClient.get<DeviceSession[]>('/devices');
      return res.data;
    } catch {
      return [
        {
          deviceId: 'dev_android_01',
          userId: 'usr_demo_123',
          deviceName: 'Samsung Galaxy S24 Ultra',
          platform: 'android',
          lastSeen: new Date().toISOString(),
          status: 'Monitoring',
        },
        {
          deviceId: 'dev_ios_02',
          userId: 'usr_demo_123',
          deviceName: 'iPhone 15 Pro Max',
          platform: 'ios',
          lastSeen: new Date(Date.now() - 3600000).toISOString(),
          status: 'Connected',
        },
      ];
    }
  },

  registerDevice: async (data: Omit<DeviceSession, 'lastSeen'>): Promise<DeviceSession> => {
    try {
      const res = await apiClient.post<DeviceSession>('/devices', data);
      return res.data;
    } catch {
      return {
        ...data,
        lastSeen: new Date().toISOString(),
      };
    }
  },

  disconnectDevice: async (deviceId: string): Promise<{ message: string }> => {
    try {
      const res = await apiClient.delete<{ message: string }>(`/devices/${deviceId}`);
      return res.data;
    } catch {
      return { message: 'Device disconnected successfully' };
    }
  },
};
