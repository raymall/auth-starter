import { SidebarTrigger } from '@/app/components/ui/sidebar'
import { redirect } from 'next/navigation'
import { getSessionUserOrganizationHandle } from '@/app/actions/auth'
import styles from './page.module.scss'

export default async function Dashboard({
  params
}: {
  params: Promise<{
    organization: string
  }>
}) {
  const { organization: organization_slug } = await params

  const organization_handle = await getSessionUserOrganizationHandle()

  if (organization_slug !== organization_handle) {
    redirect(`/${organization_handle}/dashboard`)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SidebarTrigger />
      </main>
    </div>
  )
}
