import { redirect } from 'next/navigation'
import { validateToken } from '@/actions/auth'
import { getMessages } from '@/actions/messages'
import MessageCard from '@/components/MessageCard'

export default async function Home() {
  const resutls = await validateToken()
  if (!resutls.success) redirect('/auth/signup')
  const messageResults = await getMessages()

  return (
    <main className="container mx-auto px-5 divide-y divide-white">
      {messageResults.data?.length === 0 ? <p className='text-gray-500 mt-10 text-center'>No message to view :(</p> : ''}
      {messageResults.data?.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </main>
  )
}
