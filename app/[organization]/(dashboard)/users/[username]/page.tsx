import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from "@/components/ui/separator"
import { redirect } from 'next/navigation'
import { getUser, getSessionUserOrganizationHandle } from '@/app/actions/auth'
import { getUserByUsername } from '@/app/actions/users'
import { User } from '@/app/schemas'
import UserForm from '@/app/components/UserForm/index.client'
import styles from './page.module.scss'

export default async function UserPage({
  params
}: {
  params: Promise<{
    organization: string
    username: string
  }>
}) {
  const {
    organization: organization_slug,
    username
  } = await params

  const dbUser = await getUserByUsername(username)
  const kindeUser = await getUser(dbUser?.kindeId || '')
  const organization_handle = await getSessionUserOrganizationHandle()

  if (organization_slug !== organization_handle) {
    redirect(`/${organization_handle}/users/${username}`)
  }

  const user = {
    ...dbUser,
    ...kindeUser
  }

  const parsedUserData = User.parse(user)

  if (!parsedUserData) {
    return null
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SidebarTrigger />
        <Separator />
        {user && <UserForm data={parsedUserData} />}
      </main>
    </div>
  )
}


