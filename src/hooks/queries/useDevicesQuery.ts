import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceApi } from '@/services/api/deviceApi';

export const DEVICE_KEYS = {
  all: ['devices'] as const,
};

export function useDevicesQuery() {
  return useQuery({
    queryKey: DEVICE_KEYS.all,
    queryFn: deviceApi.getDevices,
    refetchInterval: 10000, // Refresh device connection status every 10 seconds
  });
}

export function useDisconnectDeviceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: string) => deviceApi.disconnectDevice(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEVICE_KEYS.all });
    },
  });
}
