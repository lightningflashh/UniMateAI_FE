import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  authApi,
} from '@/features/auth/api/auth.api'
import { RegisterRequest } from '@/types/auth.type'

export function useRegister() {
  return useMutation({
    mutationFn: (
      data: RegisterRequest,
    ) => authApi.register(data),

    onSuccess: () => {
      toast.success(
        'Account created successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to create account',
      )
    },
  })
}