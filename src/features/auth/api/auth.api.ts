import { api } from '@/lib/axios'
import type {
  LoginRequest,
  LoginResponse,
} from '@/types/auth.type'



export const authApi = {
  login(data: LoginRequest) {
    return api.post<LoginResponse>(
      '/auth/login',
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