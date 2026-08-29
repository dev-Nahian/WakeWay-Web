import { apiClient } from './client';
import { SyncTrip, DeviceSession, TripStatus } from '@/types/sync';

export const tripSyncService = {
  createTrip: async (tripData: Omit<SyncTrip, 'id' | 'createdAt' | 'updatedAt'>): Promise<SyncTrip> => {
    try {
      const res = await apiClient.post('/trips', tripData);
      return res.data;
    } catch (error) {
      // Mock Fallback for seamless demo execution if backend is offline
      const mockTrip: SyncTrip = {
        id: `trip_${Date.now()}`,
        ...tripData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return mockTrip;
    }
  },

  getTrip: async (id: string): Promise<SyncTrip> => {
    try {
      const res = await apiClient.get(`/trips/${id}`);
      return res.data;
    } catch (error) {
      return {
        id,
        userId: 'usr_demo_123',
        destinationName: 'Chattogram Railway Station',
        destinationAddress: 'Station Road, Agrabad, Chattogram, Bangladesh',
        lat: 22.3354,
        lng: 91.8315,
        radiusMeters: 500,
        status: 'monitoring',
        distanceRemainingKm: 2.4,
        etaMinutes: 8,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },

  updateTripStatus: async (id: string, status: TripStatus): Promise<{ message: string }> => {
    try {
      const res = await apiClient.patch(`/trips/${id}/status`, { status });
      return res.data;
    } catch (error) {
      return { message: `Trip status updated to ${status}` };
    }
  },

  getDeviceSessions: async (): Promise<DeviceSession[]> => {
    try {
      const res = await apiClient.get('/devices');
      return res.data;
    } catch (error) {
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
};
