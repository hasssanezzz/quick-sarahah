'use server'

import { cookies } from 'next/headers'
import { compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

import { TOKEN_COOKIE_NAME } from '@/constants'
import { prisma } from '../db'
import { hashPassword } from '../utils'
import { redirect } from 'next/navigation'

export async function login(username: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        Message: true,
      },
    })

    // no username found
    if (!user)
      return {
        success: false,
        errors: [{ path: 'username', message: 'Username not found' }],
      }

    const validPassword = await compare(password, user.password)

    // invalid password
    if (!validPassword)
      return {
        success: false,
        errors: [{ path: 'password', message: 'Wrong password' }],
      }

    // create token
    // TODO add expire date
    const token = sign({ id: user.id }, process.env.JWT_SECRET!)

    // set cookie
    // TODO add expire date
    cookies().set(TOKEN_COOKIE_NAME, token)

    return {
      success: true,
      data: {
        username: user.username,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: [{ path: 'root', message: 'Internal server error' }],
    }
  }
}

export async function signup(username: string, password: string) {
  try {
    const userWithSameUsername = await prisma.user.findUnique({
      where: { username },
    })

    if (userWithSameUsername)
      return {
        success: false,
        errors: [{ path: 'username', message: 'Username is already in use' }],
      }

    // create user
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    // create token
    // TODO add expire date
    const token = sign({ id: user.id }, process.env.JWT_SECRET!)

    // set cookie
    // TODO add expire date
    cookies().set(TOKEN_COOKIE_NAME, token)

    return {
      success: true,
      data: {
        username: user.username,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: [{ path: 'root', message: 'Internal server error' }],
    }
  }
}

export async function validateToken() {
  try {
    const token = cookies().get(TOKEN_COOKIE_NAME)?.value || ''
    if (!token)
      return {
        success: false,
        errors: [{ path: 'root', message: 'Token does not exist' }],
      }

    // will throw if token is not valid
    const payload = verify(token, process.env.JWT_SECRET!) as { id: string }
    const user = await prisma.user.findUnique({ where: { id: payload.id } })

    return {
      success: true,
      data: {
        username: user?.username,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: [{ path: 'root', message: 'Internal server error' }],
    }
  }
}

export async function logout() {
  try {
    cookies().delete(TOKEN_COOKIE_NAME)
    redirect('/auth/login')
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: [{ path: 'root', message: 'Internal server error' }],
    }
  }
}
