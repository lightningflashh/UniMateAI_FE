import {
  useMutation,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import { userApi } from '@/features/user/api/user.api'

export function useChangePassword() {
  return useMutation({
    mutationFn: userApi.changePassword,

    onSuccess: () => {
      toast.success(
        'Password changed successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to change password',
      )
    },
  })
}