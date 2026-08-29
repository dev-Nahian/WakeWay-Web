import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripApi, CreateTripDTO } from '@/services/api/tripApi';
import { SyncTrip, TripStatus } from '@/types/sync';

export const TRIP_KEYS = {
  all: ['trips'] as const,
  active: ['trips', 'active'] as const,
  detail: (id: string) => ['trips', id] as const,
};

/**
 * Fetch all trip history records.
 */
export function useTripsQuery() {
  return useQuery({
    queryKey: TRIP_KEYS.all,
    queryFn: tripApi.getTrips,
    staleTime: 1000 * 30, // 30 seconds
  });
}

/**
 * Fetch the active in-progress trip.
 */
export function useActiveTripQuery() {
  return useQuery({
    queryKey: TRIP_KEYS.active,
    queryFn: tripApi.getActiveTrip,
    refetchInterval: 5000, // Poll every 5s for active journey updates
  });
}

/**
 * Fetch single trip by ID.
 */
export function useTripDetailQuery(id: string) {
  return useQuery({
    queryKey: TRIP_KEYS.detail(id),
    queryFn: () => tripApi.getTripById(id),
    enabled: Boolean(id),
  });
}

/**
 * Mutation for creating a new trip with cache invalidation.
 */
export function useCreateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTripDTO) => tripApi.createTrip(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.active });
    },
  });
}

/**
 * Mutation for updating trip status with optimistic UI updates.
 */
export function useUpdateTripStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TripStatus }) =>
      tripApi.updateTripStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: TRIP_KEYS.detail(id) });
      const previousTrip = queryClient.getQueryData<SyncTrip>(TRIP_KEYS.detail(id));

      if (previousTrip) {
        queryClient.setQueryData<SyncTrip>(TRIP_KEYS.detail(id), {
          ...previousTrip,
          status,
        });
      }

      return { previousTrip };
    },
    onError: (_err, { id }, context) => {
      if (context?.previousTrip) {
        queryClient.setQueryData(TRIP_KEYS.detail(id), context.previousTrip);
      }
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.active });
    },
  });
}

/**
 * Mutation for cancelling a trip.
 */
export function useCancelTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tripApi.cancelTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.active });
    },
  });
}
