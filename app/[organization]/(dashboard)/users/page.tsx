import { SidebarTrigger } from '@/components/ui/sidebar'
import { getUserOrganizationHandle } from '@/app/actions'
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

  const organization_handle = await getUserOrganizationHandle() || ''

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SidebarTrigger />

        <ListUsers
          data={{organization_handle, organization_slug}}
        />
      </main>
    </div>
  )
}

