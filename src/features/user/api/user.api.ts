import { api } from '@/lib/axios'
import { UserProfile } from '@/types/user.type'
import { ChangePasswordFormValues } from '@/features/user/schemas/change-password.schema'

export const userApi = {
  getProfile() {
    return api.get<UserProfile>('/users/profile')
  },
  changePassword(
    data: Omit<
      ChangePasswordFormValues,
      'confirmPassword'
    >,
  ) {
    return api.patch(
      '/users/change-password',
      data,
    )
  },
}