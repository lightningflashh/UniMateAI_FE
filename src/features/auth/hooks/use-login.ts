import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import { authApi } from '@/features/auth/api/auth.api'
import type { ApiError } from '@/interfaces/common'
import { useAuthStore } from '@/stores/auth.store'
import type { LoginRequest } from '@/types/auth.type'

export function useLogin() {
  const setAuth = useAuthStore(
    state => state.setAuth,
  )

  return useMutation({
    mutationFn: async (
      data: LoginRequest,
    ) => {
      const response =
        await authApi.login(data)

      return response.data
    },

    onSuccess: data => {
      setAuth(
        data.accessToken,
        data.user,
      )

      toast.success('Login successfully')
    },

    onError: error => {
      const axiosError =
        error as AxiosError<ApiError>

      toast.error(
        axiosError.response?.data.message ??
        'Login failed',
      )
    },
  })
}