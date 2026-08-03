import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/features/auth/api/auth.api'
import { useAuthStore } from '@/stores/auth.store'

export function useRefresh() {
  const setAuth = useAuthStore(
    state => state.setAuth,
  )

  return useMutation({
    mutationFn: async () => {
      const response =
        await authApi.refresh()

      return response.data
    },

    onSuccess: data => {
      setAuth(
        data.accessToken,
        data.user,
      )
    },
  })
}