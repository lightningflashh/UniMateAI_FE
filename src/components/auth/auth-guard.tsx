'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/stores/auth.store'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter()

  const accessToken = useAuthStore(
    state => state.accessToken,
  )

  const isLoading = useAuthStore(
    state => state.isLoading,
  )

  useEffect(() => {
    if (!isLoading && !accessToken) {
      router.replace('/login')
    }
  }, [
    isLoading,
    accessToken,
    router,
  ])

  if (isLoading) {
    return null
  }

  if (!accessToken) {
    return null
  }

  return children
}