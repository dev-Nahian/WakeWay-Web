import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, UserProfile, UserSettings } from '@/services/api/userApi';

export const USER_KEYS = {
  profile: ['user', 'profile'] as const,
  settings: ['user', 'settings'] as const,
};

export function useUserProfileQuery() {
  return useQuery({
    queryKey: USER_KEYS.profile,
    queryFn: userApi.getProfile,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => userApi.updateProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(USER_KEYS.profile, updatedProfile);
      queryClient.invalidateQueries({ queryKey: USER_KEYS.profile });
    },
  });
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<UserSettings>) => userApi.updateSettings(settings),
    onSuccess: (newSettings) => {
      queryClient.setQueryData(USER_KEYS.settings, newSettings);
      queryClient.invalidateQueries({ queryKey: USER_KEYS.settings });
    },
  });
}
