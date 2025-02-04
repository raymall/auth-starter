import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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