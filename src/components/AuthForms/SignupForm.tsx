'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSignupFormSchema } from '@/lib/formSchemas'
import { signup } from '@/actions/auth'

function SignupForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSignupFormSchema>>({
    resolver: zodResolver(loginSignupFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginSignupFormSchema>) {
    const res = await signup(values.username, values.password)

    if (!res.success) {
      res.errors?.forEach((error) => {
        form.setError(error.path as 'username' | 'password', {
          message: error.message,
        })
      })
      return
    }

    router.push('/')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg border shadow p-5 w-full max-w-xl"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Please enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Please enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between flex-col gap-5">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 mx-auto px-10"
            asChild={false}
          >
            Submit
          </Button>

          <p className="text-gray-400">
            Already have an account?,{' '}
            <Link href="/auth/login" className="text-blue-400 underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default SignupForm
