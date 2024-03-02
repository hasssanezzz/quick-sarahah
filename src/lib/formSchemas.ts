import { z } from 'zod'

const usernameValidation = z
  .string()
  .regex(/^[0-9a-z_]+$/, 'Username must consist only from lower case letters, numbers and underscores')
  .min(2, 'Username must be at least 2 characters long')
  .max(255, 'Username cannot exceed 255 characters')

const passwordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(255, 'Password cannot exceed 255 characters')

const messageValidation = z
  .string()
  .min(2, 'Message must be at least 2 characters long')
  .max(2555, 'Message cannot exceed 2555 characters')

export const loginSignupFormSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
})

export const sendMessageFormSchema = z.object({
  message: messageValidation,
})
