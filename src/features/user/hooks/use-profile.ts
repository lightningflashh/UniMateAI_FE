import { useQuery } from '@tanstack/react-query'

import { userApi } from '@/features/user/api/user.api'

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response =
        await userApi.getProfile()

      return response.data
    },
  })
}