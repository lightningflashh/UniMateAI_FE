'use client'

import { Bell, Search } from 'lucide-react'

import { NavUser } from '@/components/layout/nav-user'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                Dashboard
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

          <Input
            placeholder="Search..."
            className="w-72 pl-9"
          />
        </div>

        <Button
          size="icon"
          variant="ghost"
        >
          <Bell className="size-5" />
        </Button>

        <NavUser />
      </div>
    </header>
  )
}