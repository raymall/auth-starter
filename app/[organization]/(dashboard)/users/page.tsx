import { SidebarTrigger } from '@/app/components/ui/sidebar'
import { Separator } from "@/app/components/ui/separator"
import { getSessionUserOrganizationHandle } from '@/app/actions/auth'
import { ListUsers } from '@/app/components/ListUsers'
import styles from './page.module.scss'

export default async function Users({
  params
}: {
  params: Promise<{
    organization: string
  }>
}) {
  const { organization: organization_slug } = await params

  const organization_handle = await getSessionUserOrganizationHandle() || ''

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SidebarTrigger />
        <Separator />
        <ListUsers
          data={{organization_handle, organization_slug}}
        />
      </main>
    </div>
  )
}

