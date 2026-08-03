import { AppLogo } from '@/components/layout/app-logo'
import { NavMain } from '@/components/layout/nav-main'
import { NavUser } from '@/components/layout/nav-user'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>

      <NavMain />

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}