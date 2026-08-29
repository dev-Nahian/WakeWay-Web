'use client';

import { useState, useEffect } from 'react';
import { SyncTrip, DeviceStatus, TripStatus } from '@/types/sync';
import { tripSyncService } from '@/services/api/trips';

export function useTripSync(tripId: string) {
  const [trip, setTrip] = useState<SyncTrip | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>('Monitoring');
  const [isLoading, setIsLoading] = useState(true);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Load initial trip state
    tripSyncService.getTrip(tripId).then((data) => {
      if (isMounted) {
        setTrip(data);
        setIsLoading(false);
      }
    });

    // Simulate WebSocket / SSE stream connection for real-time mobile updates
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || `ws://localhost:8000/api/v1/ws/trips/${tripId}`;
    let intervalId: NodeJS.Timeout;

    try {
      // In production this connects to real WS endpoint
      setIsWebSocketConnected(true);

      // Interval simulator simulating active GPS distance countdown & mobile sync updates
      intervalId = setInterval(() => {
        setTrip((prev) => {
          if (!prev || prev.status === 'completed' || prev.status === 'cancelled') return prev;

          const newDistance = Math.max(0, parseFloat((prev.distanceRemainingKm - 0.1).toFixed(1)));
          const newEta = Math.max(0, Math.ceil(newDistance * 3.3));

          // When destination is reached
          if (newDistance === 0) {
            return {
              ...prev,
              distanceRemainingKm: 0,
              etaMinutes: 0,
              status: 'completed',
              updatedAt: new Date().toISOString(),
            };
          }

          return {
            ...prev,
            distanceRemainingKm: newDistance,
            etaMinutes: newEta,
            updatedAt: new Date().toISOString(),
          };
        });
      }, 5000);
    } catch {
      setIsWebSocketConnected(false);
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [tripId]);

  return {
    trip,
    deviceStatus,
    isLoading,
    isWebSocketConnected,
    setTripStatus: (status: TripStatus) => {
      if (trip) {
        setTrip({ ...trip, status });
        tripSyncService.updateTripStatus(trip.id, status);
      }
    },
  };
}
