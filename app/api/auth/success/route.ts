import slugify from 'slugify'
import { PrismaClient } from '@prisma/client'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest
) {
  const { getUser, getOrganization } = getKindeServerSession()
  const user = await getUser()
  const organization = await getOrganization()
  const organization_name = organization?.orgName || ''
  const organization_handle = slugify(organization_name, { lower: true })
  
  try {
    const url = request.nextUrl.clone()

    if (!user || !user.id) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}