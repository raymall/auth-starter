import { redirect } from 'next/navigation'
import { User, Users } from '@/app/schemas'
import {
  getUser as getKindeUser,
  getIsSessionUserAuthenticated,
  getSessionUserOrganizationCode,
  getSessionUserId,
  getOrganizationUserPermissions,
  getOrganizationUsers
} from '@/app/actions/auth'
import { getUser } from '@/app/actions/users'
import { UsersTable } from '@/app/components/ListUsers/UsersTable.client'

export const ListUsers = async ({
  data
}: {
  data: {
    organization_handle: string
    organization_slug: string
  }
}) => {
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const user_id = await getSessionUserId()
  const organization_code = await getSessionUserOrganizationCode()
  const { organization_handle, organization_slug } = data

  if (organization_slug !== organization_handle) {
    redirect(`/${organization_handle}/dashboard`)
  }
  
  if (
    !is_user_authenticated ||
    !user_id ||
    !organization_code
  ) {
    return
  }

  const permissions = await getOrganizationUserPermissions({
    organization_code,
    user_id
  }).then((permissions) => permissions?.map((permission) => permission.key).filter((key) => key !== undefined))

  const organization_users = await getOrganizationUsers({
    organization_code,
    permissions
  })

  if (!organization_users) {
    return null
  }

  const organization_users_with_properties = await Promise.all(
    organization_users.map(async (organization_user) => {
      const kindeUser = await getKindeUser(organization_user.id || '')
      const dbUser = await getUser(organization_user.id || '')
      
      const userData =  {
        ...organization_user,
        ...kindeUser,
        ...dbUser
      }

      const parsedUserData = User.parse(userData)
      
      if (parsedUserData) {
        return parsedUserData
      }
    })
  )

  const validOrganizationUsers = organization_users_with_properties.filter(user => user !== undefined)
  
  return Users.parse(validOrganizationUsers) && <UsersTable data={validOrganizationUsers} />
}