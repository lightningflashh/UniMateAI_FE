'use client'

import { useEffect } from 'react'

import { WanderingEyes } from '@/components/wandering-eyes'
import { authApi } from '@/features/auth/api/auth.api'
import { useAuthStore } from '@/stores/auth.store'

export function AuthProvider({
  children,
}: React.PropsWithChildren) {
  const setAuth = useAuthStore(
    state => state.setAuth,
  )

  const clearAuth = useAuthStore(
    state => state.clearAuth,
  )

  const isLoading = useAuthStore(
    state => state.isLoading,
  )

  const setLoading = useAuthStore(
    state => state.setLoading,
  )

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const response =
          await authApi.refresh()

        const data = response.data

        setAuth(
          data.accessToken,
          data.user,
        )
      } catch {
        clearAuth()
      } finally {
        setLoading(false)
      }
    }

    void bootstrap()
  }, [setAuth, clearAuth, setLoading])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <WanderingEyes className="h-20 w-[180px] [--eye-color:#e2e2e3] [--pupil-color:#0f172a]" />
      </div>
    )
  }

  return children
}