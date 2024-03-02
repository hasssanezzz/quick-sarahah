'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { sendMessageFormSchema } from '@/lib/formSchemas'
import { createMessage } from '@/actions/messages'
import { Textarea } from './ui/textarea'
import toast from 'react-hot-toast'

function SendMessageForm({ username }: { username: string }) {
  const form = useForm<z.infer<typeof sendMessageFormSchema>>({
    resolver: zodResolver(sendMessageFormSchema),
    defaultValues: {
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof sendMessageFormSchema>) {
    const res = await createMessage(username, values.message)

    if (!res.success) {
      res.errors?.forEach((error) => {
        form.setError(error.path as 'message', {
          message: error.message,
        })
      })

      form.reset()
      toast.success('Message sent successfully')
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 rounded-lg border shadow p-5 w-full max-w-xl"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Send a nice message"
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
          </div>
        </form>
      </Form>
    </>
  )
}

export default SendMessageForm
