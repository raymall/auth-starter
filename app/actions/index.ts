import slugify from 'slugify'
import { Organizations, Users, init } from '@kinde/management-api-js'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

// USER ACTIONS
export async function getIsUserAuthenticated() {
  const { isAuthenticated } = getKindeServerSession()
  const is_user_authenticated = await isAuthenticated()

  return is_user_authenticated
}

export async function getUser() {
  const { getUser } = getKindeServerSession()
  const is_user_authenticated = await getIsUserAuthenticated()
  const user = await getUser()

  return is_user_authenticated ? user : null
}

export async function getUserId() {
  const is_user_authenticated = await getIsUserAuthenticated()
  const user = await getUser()
  const user_id = user?.id

  return is_user_authenticated ? user_id : null
}

export async function getUserProperties({
  user_id
}: {
  user_id: string
}) {
  init()

  const { properties } = await Users.getUserPropertyValues({
    userId: user_id
  })

  return properties ? properties : null
}

export async function getUserPermissions() {
  const { getPermissions } = getKindeServerSession()
  const is_user_authenticated = await getIsUserAuthenticated()
  const user_permissions = (await getPermissions())?.permissions

  return is_user_authenticated ? user_permissions : null
}

export async function getUserOrganizations() {
  const { getUserOrganizations } = getKindeServerSession()
  const is_user_authenticated = await getIsUserAuthenticated()
  const organizations = (await getUserOrganizations())?.orgs

  return is_user_authenticated ? organizations : null
}

export async function getUserOrganization() {
  const { getOrganization } = getKindeServerSession()
  const is_user_authenticated = await getIsUserAuthenticated()
  const organization = await getOrganization()

  return is_user_authenticated ? organization : null
}

export async function getUserOrganizationName() {
  const is_user_authenticated = await getIsUserAuthenticated()
  const organization_name = (await getUserOrganization())?.orgName

  return is_user_authenticated ? organization_name : null
}

export async function getUserOrganizationHandle() {
  const is_user_authenticated = await getIsUserAuthenticated()
  const organization_name = (await getUserOrganization())?.orgName
  const organization_handle = slugify(organization_name || '', { lower: true })

  return is_user_authenticated ? organization_handle : null
}

export async function getUserOrganizationCode() {
  const is_user_authenticated = await getIsUserAuthenticated()
  const organization_code = (await getUserOrganization())?.orgCode

  return is_user_authenticated ? organization_code : null
}

// ORGANIZATION ACTIONS
export async function getOrganizationByHandle({
  organization_handle,
}: {
  organization_handle: string,
}) {
  init()

  const { organizations } = await Organizations.getOrganizations({
    pageSize: 10,
  })

  const organization = organizations?.find((organization) => organization.handle === organization_handle)

  return organization ? organization : null
}

export async function getOrganizationUserPermissions({
  organization_code,
  user_id
}: {
  organization_code: string
  user_id: string
}) {
  init()

  const { permissions } = await Organizations.getOrganizationUserPermissions({
    orgCode: organization_code,
    userId: user_id
  })

  return permissions ? permissions : null
}

// read:users
export async function getOrganizationUsers({
  organization_code,
  permissions
}: {
  organization_code: string,
  permissions?: string[]
}) {
  init()

  if (permissions?.includes('read:users')) {
    const { organization_users } = await Organizations.getOrganizationUsers({
      orgCode: organization_code,
    })
  
    return organization_users
  }

  return null
}

// read:users
export async function getOrganizationUsersWithProperties({
  organization_code,
  permissions
}: {
  organization_code: string,
  permissions?: string[]
}) {
  init()

  if (permissions?.includes('read:users')) {
    const { organization_users } = await Organizations.getOrganizationUsers({
      orgCode: organization_code,
    })

    if (organization_users) {
      const users_with_properties = await Promise.all(
        organization_users.map(async (user) => {
          const user_properties = await getUserProperties({ user_id: user.id || '' })
          const government_id = user_properties?.find(prop => prop.key === 'government_id')?.value

          return {
            ...user,
            status: 'pending',
            notes: 'No notes',
            government_id,
            properties: user_properties
          }
        })
      )
    
      return users_with_properties
    }
  }

  return null
}