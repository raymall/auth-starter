import slugify from 'slugify'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { ChevronsUpDown, Check } from 'lucide-react'
import {
  Sidebar as AppSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  getIsSessionUserAuthenticated,
  getSessionUser,
  getSessionUserPermissions,
  getSessionUserOrganizationName,
  getSessionUserOrganizations,
} from '@/app/actions/auth'
import { LogoutButton } from '@/app/components/LogoutButton'
import { SidebarMenu } from './SidebarMenuItem.client'
import styles from './styles.module.scss'

export const Sidebar = async () => {
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const user = await getSessionUser()
  const user_permissions = (await getSessionUserPermissions()) || []
  const organization_name = await getSessionUserOrganizationName() || ''
  const organizations = await getSessionUserOrganizations() || []
  const organization_handle = slugify(organization_name || '', { lower: true })

  return (
    <AppSidebar className={styles.Sidebar}>
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu
              user_permissions={user_permissions}
              organization_handle={organization_handle}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {is_user_authenticated && (
        <SidebarFooter>
          <SidebarGroupLabel>
            {user ? 
              <span>{user.email}</span>
            : null}
          </SidebarGroupLabel>
          {organizations && organizations.length > 1 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className={styles.Sidebar_organization_dropdown}>
                  {organization_name}
                  <ChevronsUpDown className="ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {organizations && organizations.map((organization) => (
                  <DropdownMenuItem key={organization.code}>
                    {organization_name === organization.name && (
                      <Check />
                    )}
                    <LoginLink orgCode={organization.code} className={styles.Sidebar_organization_signin}>
                      {organization.name}
                    </LoginLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ): (
            <SidebarGroupLabel>
              <span>{organization_name}</span>
            </SidebarGroupLabel>
          )}
          <LogoutButton className={styles.Sidebar_logout_button} />
        </SidebarFooter>
      )}
    </AppSidebar>
  )
}
