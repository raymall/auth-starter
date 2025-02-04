'use client'

import { Home, Users } from 'lucide-react'
import { 
  SidebarMenu as AppSidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/app/components/ui/sidebar'
import { usePathname } from 'next/navigation'

export const SidebarMenu = ({
  user_permissions,
  organization_handle
}: {
  user_permissions: string[]
  organization_handle: string
}) => {

  const items = [
    {
      title: 'Home',
      url: `/${organization_handle}/dashboard`,
      is_active: usePathname().includes('/dashboard'),
      icon: Home,
    },
    {
      title: 'Users',
      url: `/${organization_handle}/users`,
      is_active: usePathname().includes('/users'),
      icon: Users,
      permissions: ['read:users'],
    },
  ]

  return (
    <AppSidebarMenu>
      {items.map((item) => {
        'use client'

        if (
          item.permissions &&
          !item.permissions.some((permission) => user_permissions?.includes(permission))
        ) {
          return
        }
        
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={item.is_active}
            >
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      }
    )}
    </AppSidebarMenu>
  )
}