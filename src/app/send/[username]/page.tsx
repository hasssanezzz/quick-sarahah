import { redirect } from 'next/navigation'
import { chechIfUsernameExists } from '@/actions/users'
import SendMessageForm from '@/components/SendMessageForm'

interface CreateMessagePageProps {
  params: {
    username: string
  }
}

async function CreateMessagePage({
  params: { username },
}: CreateMessagePageProps) {
  const usernameExists = await chechIfUsernameExists(username)
  if (!usernameExists.success) redirect('/auth/signup')

  return (
    <main className="container mx-auto px-5 flex items-center justify-center min-h-screen flex-col gap-10">
      <h3 className="text-4xl sm:text-5xl font-semibold text-center">Send a message to @{username}</h3>
      <SendMessageForm username={username} />
    </main>
  )
}

export default CreateMessagePage
