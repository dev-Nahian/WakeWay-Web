export type PlatformType = 'android' | 'ios' | 'web';

export type DeviceStatus = 'Connected' | 'Offline' | 'Monitoring';

export type TripStatus = 'planned' | 'monitoring' | 'completed' | 'cancelled';

export interface DeviceSession {
  deviceId: string;
  userId: string;
  deviceName: string;
  platform: PlatformType;
  lastSeen: string;
  status: DeviceStatus;
}

export interface SyncTrip {
  id: string;
  userId: string;
  destinationName: string;
  destinationAddress: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  status: TripStatus;
  distanceRemainingKm: number;
  etaMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface TripSyncWebSocketMessage {
  type: 'TRIP_STATUS_UPDATED' | 'LOCATION_UPDATE' | 'DEVICE_STATUS_CHANGED';
  tripId: string;
  payload: {
    status?: TripStatus;
    distanceRemainingKm?: number;
    etaMinutes?: number;
    deviceStatus?: DeviceStatus;
  };
}
