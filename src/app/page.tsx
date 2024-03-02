import { validateToken } from '@/actions/auth'
import { getMessages } from '@/actions/messages'
import { redirect } from 'next/navigation'

export default async function Home() {
  const resutls = await validateToken()
  if (!resutls.success) redirect('/auth/signup')
  const getMessagesResponse = await getMessages()

  return (
    <main className='container mx-auto px-5 divide-y divide-white'>
      {getMessagesResponse.data?.map((message) => (
        <div key={message.id} className='bg-gray-100 p-5'>
          <small className='text-gray-500 text-xs'>{message.createdAt.toLocaleDateString()} {message.createdAt.toLocaleTimeString()}</small>
          <p>{message.text}</p>
        </div>
      ))}
    </main>
  )
}
