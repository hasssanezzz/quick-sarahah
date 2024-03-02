import { revalidatePath } from 'next/cache'
import { validateToken } from '../auth'
import { prisma } from '../db'

export async function createMessage(username: string, text: string) {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { username } })

    await prisma.message.create({
      data: {
        text,
        toUserId: user.id,
      },
    })

    return { sucess: true }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: [{ path: 'root', message: 'Internal server error' }],
    }
  }
}

export async function getMessages() {
  try {
    const results = await validateToken()
    if (!results.success)
      return {
        success: false,
        errors: [{ path: 'root', message: 'Access required' }],
      }

    const messages = await prisma.message.findMany({
      where: {
        User: {
          username: results.data?.username,
        },
      },
    })

    return { success: true, data: messages }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: [{ path: 'root', message: 'Internal server error' }],
    }
  }
}

export async function deleteMessage(messageId: string) {
  try {
    const results = await validateToken()
    if (!results.success)
      return {
        success: false,
        errors: [{ path: 'root', message: 'Access required' }],
      }

    await prisma.message.delete({
      where: {
        id: messageId,
        User: {
          username: results.data?.username,
        },
      },
    })

    revalidatePath('/')
    return { sucess: true }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: [{ path: 'root', message: 'Internal server error' }],
    }
  }
}
