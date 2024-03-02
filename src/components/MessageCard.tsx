'use client'

import { deleteMessage } from '@/actions/messages'
import { Message } from '@prisma/client'
import { HiOutlineTrash } from 'react-icons/hi'

function MessageCard({ message }: { message: Message }) {
  async function handleDelete() {
    await deleteMessage(message.id)
  }

  return (
    <div className="bg-gray-100 p-5 relative">
      <small className="text-gray-500 text-xs">
        {message.createdAt.toLocaleDateString()}{' '}
        {message.createdAt.toLocaleTimeString()}
      </small>
      <p>{message.text}</p>

      <button
        onClick={handleDelete}
        className="text-red-500 hover:bg-red-200 p-1 rounded-md absolute top-3 right-3"
      >
        <HiOutlineTrash size={20} />{' '}
      </button>
    </div>
  )
}

export default MessageCard
