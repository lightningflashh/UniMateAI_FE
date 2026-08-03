'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navigation } from '@/components/layout/navigation'
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavMain() {
  const pathname = usePathname()

  return (
    <SidebarContent>
      <SidebarMenu>
        {navigation.map(item => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              isActive={pathname === item.href}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  )
}