import axios from 'axios'
import type {
  InternalAxiosRequestConfig,
} from 'axios'

import { authApi } from '@/features/auth/api/auth.api'
import type { ApiResponse } from '@/interfaces/common'
import { useAuthStore } from '@/stores/auth.store'

interface RetryRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean
}

let refreshPromise: Promise<void> | null = null // ensure only one refresh request is made at a time

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => ({
    ...response,
    data: (response.data as ApiResponse<unknown>).data,
  }),

  async error => {
    const originalRequest =
      error.config as RetryRequestConfig

    if (
      originalRequest.url?.includes(
        '/auth/refresh',
      )
    ) {
      return Promise.reject(error)
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        if (!refreshPromise) {
          refreshPromise = authApi
            .refresh()
            .then(res => {
              useAuthStore
                .getState()
                .setAuth(
                  res.data.accessToken,
                  res.data.user,
                )
            })
            .finally(() => {
              refreshPromise = null
            })
        }

        await refreshPromise

        const token =
          useAuthStore.getState().accessToken

        if (token) {
          originalRequest.headers.Authorization =
            `Bearer ${token}`
        }

        return api(originalRequest)
      } catch {
        useAuthStore
          .getState()
          .clearAuth()
      }
    }

    return Promise.reject(error)
  },
)