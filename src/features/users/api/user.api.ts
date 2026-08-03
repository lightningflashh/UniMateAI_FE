import { api } from '@/lib/axios'

export interface CurrentUser {
  id: string
  fullName: string
  email: string
  role: string
}

export const userApi = {
  me() {
    return api.get<CurrentUser>('/users/profiles')
  },
}