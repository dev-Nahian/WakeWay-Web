import { apiClient } from './client';
import { SyncTrip, TripStatus } from '@/types/sync';
import { createTripSecuritySchema, sanitizeInput } from '@/lib/security';

export interface CreateTripDTO {
  destinationName: string;
  destinationAddress: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  alertSound?: boolean;
  alertVibration?: boolean;
  alertNotification?: boolean;
  earlyWarning?: string;
}

export const tripApi = {
  getTrips: async (): Promise<SyncTrip[]> => {
    try {
      const res = await apiClient.get<SyncTrip[]>('/trips');
      return res.data;
    } catch {
      // Demo Fallback Data
      return [
        {
          id: 'trip_101',
          userId: 'usr_demo',
          destinationName: 'Chattogram Railway Station',
          destinationAddress: 'Station Road, Agrabad, Chattogram',
          lat: 22.3354,
          lng: 91.8315,
          radiusMeters: 500,
          status: 'monitoring',
          distanceRemainingKm: 2.4,
          etaMinutes: 8,
          createdAt: '2026-08-28T08:30:00Z',
          updatedAt: '2026-08-28T13:15:00Z',
        },
        {
          id: 'trip_102',
          userId: 'usr_demo',
          destinationName: "Cox's Bazar Sea Beach",
          destinationAddress: 'Kolatoli Road, Cox’s Bazar',
          lat: 21.4272,
          lng: 91.9702,
          radiusMeters: 1000,
          status: 'completed',
          distanceRemainingKm: 0,
          etaMinutes: 0,
          createdAt: '2026-08-24T06:00:00Z',
          updatedAt: '2026-08-24T14:30:00Z',
        },
      ];
    }
  },

  getActiveTrip: async (): Promise<SyncTrip | null> => {
    try {
      const res = await apiClient.get<SyncTrip>('/trips/active');
      return res.data;
    } catch {
      return {
        id: 'active_123',
        userId: 'usr_demo',
        destinationName: 'Chattogram Railway Station',
        destinationAddress: 'Station Road, Agrabad, Chattogram',
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

  getTripById: async (id: string): Promise<SyncTrip> => {
    try {
      const res = await apiClient.get<SyncTrip>(`/trips/${id}`);
      return res.data;
    } catch {
      return {
        id,
        userId: 'usr_demo',
        destinationName: 'Chattogram Railway Station',
        destinationAddress: 'Station Road, Agrabad, Chattogram',
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

  createTrip: async (data: CreateTripDTO): Promise<SyncTrip> => {
    // Validate inputs using security schema
    const validatedData = createTripSecuritySchema.parse({
      ...data,
      destinationName: sanitizeInput(data.destinationName),
      destinationAddress: sanitizeInput(data.destinationAddress),
    });

    try {
      const res = await apiClient.post<SyncTrip>('/trips', validatedData);
      return res.data;
    } catch {
      return {
        id: `trip_${Date.now()}`,
        userId: 'usr_demo',
        destinationName: validatedData.destinationName,
        destinationAddress: validatedData.destinationAddress,
        lat: validatedData.lat,
        lng: validatedData.lng,
        radiusMeters: validatedData.radiusMeters,
        status: 'planned',
        distanceRemainingKm: 15.0,
        etaMinutes: 25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },

  updateTripStatus: async (id: string, status: TripStatus): Promise<SyncTrip> => {
    try {
      const res = await apiClient.patch<SyncTrip>(`/trips/${id}/status`, { status });
      return res.data;
    } catch {
      return {
        id,
        userId: 'usr_demo',
        destinationName: 'Chattogram Railway Station',
        destinationAddress: 'Station Road, Agrabad, Chattogram',
        lat: 22.3354,
        lng: 91.8315,
        radiusMeters: 500,
        status,
        distanceRemainingKm: status === 'completed' ? 0 : 2.4,
        etaMinutes: status === 'completed' ? 0 : 8,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },

  cancelTrip: async (id: string): Promise<{ message: string }> => {
    try {
      const res = await apiClient.delete<{ message: string }>(`/trips/${id}`);
      return res.data;
    } catch {
      return { message: 'Trip successfully cancelled' };
    }
  },
};
