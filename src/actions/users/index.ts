'use server'

import { prisma } from '../db'

export async function chechIfUsernameExists(username: string) {
  try {
    await prisma.user.findUniqueOrThrow({ where: { username } })
    return { success: true }
  } catch (e) {
    return { success: false }
  }
}
