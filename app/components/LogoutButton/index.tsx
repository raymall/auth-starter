import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { getIsUserAuthenticated } from '@/app/actions'

type ClassName = {
  className?: string
}

export const LogoutButton = async ({ className }: ClassName) => {
  const is_user_authenticated = await getIsUserAuthenticated()

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