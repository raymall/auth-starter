import slugify from 'slugify'
import { PrismaClient } from '@prisma/client'
import { getKindeServerSession, handleAuth } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  {
    params
  }: {
    params: Promise<{
      kindeAuth: string
    }>
  }
) {
  const endpoint = (await params).kindeAuth
  const { getUser, getOrganization } = getKindeServerSession()
  const user = await getUser()
  const organization = await getOrganization()
  const organization_name = organization?.orgName || ''
  const organization_handle = slugify(organization_name, { lower: true })
  
  if (endpoint === 'success') {
    try {
      const url = request.nextUrl.clone()
  
      if (!user || !user.id) {
        throw new Error('Authentication failed: ' + user)
      }
    
      const dbUser = await prisma.user.findUnique({
        where: { kindeId: user.id }
      })
    
      if (!dbUser) {
        await prisma.user.create({
          data: {
            kindeId: user.id,
            username: user.username || '',
            status: 'pending',
            governmentId: '',
            phoneNumber: null,
            jobTitle: '',
            notes: ''
          }
        })
      }
      
      url.pathname = organization_handle ? `${organization_handle}/dashboard` : '/'
      return NextResponse.redirect(url)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error: ' + error.stack)
      }
    }
  }

  return handleAuth(request, endpoint)
}