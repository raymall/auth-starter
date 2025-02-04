import slugify from 'slugify'
import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { LoginLink, RegisterLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { LogIn, UserRoundPlus, LogOut } from 'lucide-react'
import styles from './page.module.scss'

export default async function Home() {
  const { isAuthenticated, getOrganization } = getKindeServerSession()
  const is_user_authenticated = await isAuthenticated()
  const organization_name = (await getOrganization())?.orgName
  
  if (is_user_authenticated && organization_name) {
    const organization_handle = slugify(organization_name, { lower: true })
    redirect(`/${organization_handle}/dashboard`)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.Title}>[auth-starter]</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
          </CardHeader>
          {!is_user_authenticated && !organization_name ? (
            <CardFooter className={styles.CardFooter}>
              <LoginLink className={styles.CardFooter_link}>
                <Button className={styles.CardFooter_button}>
                  <LogIn /> Login
                </Button>
              </LoginLink>
              
              <RegisterLink className={styles.CardFooter_link}>
                <Button className={styles.CardFooter_button}>
                  <UserRoundPlus /> Sign Up
                </Button>
              </RegisterLink>
            </CardFooter>
          ) : (
            <>
              <CardContent>
                <p>You need to be added to an organization.</p>
              </CardContent>
              <CardFooter>
                <LogoutLink>
                  <Button>
                    <LogOut /> Log Out
                  </Button>
                </LogoutLink>
              </CardFooter>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}
