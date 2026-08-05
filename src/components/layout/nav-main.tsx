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
import { cn } from '@/lib/utils'

export function NavMain() {
  const pathname = usePathname()

  return (
    <SidebarContent>
      <SidebarMenu>
        {navigation.map(item => {
          const isActive = pathname === item.href

          return (
            <SidebarMenuItem key={item.title}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={isActive}
                  className={cn(
                    'transition-all duration-200 w-full flex items-center gap-2',
                    isActive &&
                      '!bg-primary !text-primary-foreground font-semibold shadow-md scale-[0.99] hover:scale-[1.0]',
                  )}
                >
                  <item.icon className={cn('size-4', isActive && '!text-primary-foreground')} />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarContent>
  )
}