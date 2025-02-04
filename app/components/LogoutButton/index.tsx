import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Button } from '@/app/components/ui/button'
import { LogOut } from 'lucide-react'
import { getIsSessionUserAuthenticated } from '@/app/actions/auth'

type ClassName = {
  className?: string
}

export const LogoutButton = async ({ className }: ClassName) => {
  const is_user_authenticated = await getIsSessionUserAuthenticated()

  if (!is_user_authenticated) {
    return null
  }

  return  (
    <LogoutLink>
      <Button className={className}>
        <LogOut /> Log Out
      </Button>
    </LogoutLink>
  )
}