import { redirect } from 'next/navigation'
import {
  getIsUserAuthenticated,
  getUserOrganizationCode,
  getUserId,
  getOrganizationUserPermissions,
  getOrganizationUsersWithProperties,
} from '@/app/actions'
import { UsersTable } from '@/app/components/ListUsers/UsersTable.client'

export const ListUsers = async ({
  data
}: {
  data: {
    organization_handle: string
    organization_slug: string
  }
}) => {
  const is_user_authenticated = await getIsUserAuthenticated()
  const user_id = await getUserId()
  const organization_code = await getUserOrganizationCode()
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

  const organization_users_with_properties = await getOrganizationUsersWithProperties({
    organization_code,
    permissions
  }) || []

  return <UsersTable data={organization_users_with_properties} />
}