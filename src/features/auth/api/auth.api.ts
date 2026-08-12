import { api } from '@/lib/axios'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '@/types/auth.type'

export const authApi = {
  login(data: LoginRequest) {
    return api.post<LoginResponse>(
      '/auth/login',
      data,
    )
  },
   register(data: RegisterRequest) {
    return api.post(
      '/auth/register',
      data,
    )
  },
  refresh() {
    return api.post<LoginResponse>(
      '/auth/refresh',
    )
  },
  logout() {
    return api.post('/auth/logout')
  }
}