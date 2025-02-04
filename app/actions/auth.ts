import slugify from 'slugify'
import { Organizations, Users, init } from '@kinde/management-api-js'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

// SESSION USER ACTIONS
export async function getIsSessionUserAuthenticated() {
  const { isAuthenticated } = getKindeServerSession()
  const is_user_authenticated = await isAuthenticated()

  return is_user_authenticated
}

export async function getSessionUser() {
  const { getUser } = getKindeServerSession()
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const user = await getUser()

  return is_user_authenticated ? user : null
}

export async function getSessionUserId() {
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const user = await getSessionUser()
  const user_id = user?.id

  return is_user_authenticated ? user_id : null
}

export async function getSessionUserUsername(id: string) {
  init()

  const { username } = await Users.getUserData({
    id
  })

  return username ? username : null
}

export async function getUserProperties(id: string) {
  init()

  const { properties } = await Users.getUserPropertyValues({
    userId: id
  })

  return properties ? properties : null
}

export async function getSessionUserPermissions() {
  const { getPermissions } = getKindeServerSession()
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const user_permissions = (await getPermissions())?.permissions

  return is_user_authenticated ? user_permissions : null
}

export async function getSessionUserOrganizations() {
  const { getUserOrganizations } = getKindeServerSession()
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const organizations = (await getUserOrganizations())?.orgs

  return is_user_authenticated ? organizations : null
}

export async function getSessionUserOrganization() {
  const { getOrganization } = getKindeServerSession()
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const organization = await getOrganization()

  return is_user_authenticated ? organization : null
}

export async function getSessionUserOrganizationName() {
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const organization_name = (await getSessionUserOrganization())?.orgName

  return is_user_authenticated ? organization_name : null
}

export async function getSessionUserOrganizationHandle() {
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const organization_name = (await getSessionUserOrganization())?.orgName
  const organization_handle = slugify(organization_name || '', { lower: true })

  return is_user_authenticated ? organization_handle : null
}

export async function getSessionUserOrganizationCode() {
  const is_user_authenticated = await getIsSessionUserAuthenticated()
  const organization_code = (await getSessionUserOrganization())?.orgCode

  return is_user_authenticated ? organization_code : null
}

// USERS ACTIONS
export async function getUser(id: string) {
  init()

  const user = await Users.getUserData({
    id,
    expand: "organizations,identities"
  })

  return user ? user : null
}

// ORGANIZATION ACTIONS
export async function getOrganizationByHandle(organization_handle: string) {
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
      pageSize: 50 // ! This is a temporary limit
    })
  
    return organization_users
  }

  return null
}