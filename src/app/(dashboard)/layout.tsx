'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { AppHeader } from '@/components/layout/app-header'
import { AppSidebar } from '@/components/layout/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/auth.store'

export default function DashboardLayout({
  children,
}: React.PropsWithChildren) {
    const router = useRouter()

  const token = useAuthStore(
    state => state.accessToken,
  )

  useEffect(() => {
    if (!token) {
      router.replace('/login')
    }
  }, [token, router])

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}