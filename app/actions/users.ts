import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { kindeId: id }
  })

  return user ? user : null
}

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findFirst({
    where: { username: username }
  })

  return user ? user : null
}