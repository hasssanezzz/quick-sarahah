import { z } from 'zod'

const usernameValidation = z
  .string()
  .min(2, 'Username must be at least 2 characters long')
  .max(255, 'Username cannot exceed 255 characters')

const passwordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(255, 'Password cannot exceed 255 characters')


export const loginSignupFormSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
})

