import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogIn, UserRoundPlus } from 'lucide-react'
import { getOrganizationByHandle } from '@/app/actions/auth'
import styles from './page.module.scss'

export default async function OrganizationLogin({
  params
}: {
  params: Promise<{
    organization: string
  }>
}) {
  const { organization: organization_handle } = await params
  const organization_item = await getOrganizationByHandle(organization_handle)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.Title}>[auth-starter]</h1>
        <Card>
          <CardHeader>
            {organization_item ? 
              <CardTitle>
                {organization_item.name}
              </CardTitle>
              :
              <CardTitle>
                Organization not found
              </CardTitle>
            }
          </CardHeader>
          {organization_item ? (
            <CardFooter className={styles.CardFooter}>
              <LoginLink className={styles.CardFooter_link} orgCode={organization_item.code} postLoginRedirectURL={`/${organization_handle}/dashboard`}>
                <Button className={styles.CardFooter_button}>
                  <LogIn /> Login
                </Button>
              </LoginLink>
              
              <RegisterLink className={styles.CardFooter_link} orgCode={organization_item.code}>
                <Button className={styles.CardFooter_button}>
                  <UserRoundPlus /> Sign Up
                </Button>
              </RegisterLink>
            </CardFooter>
          ) : null}
        </Card>
      </main>
    </div>
  )
}