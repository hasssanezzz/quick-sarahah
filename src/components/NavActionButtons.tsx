'use client'

import { HiOutlineLogout } from 'react-icons/hi'
import { logout } from '@/actions/auth'
import ShareProfileDialog from './ShareProfileDialog'

function NavActionButtons({ username }: { username: string }) {
  async function handleLogout() {
    await logout()
  }

  return (
    <div className="space-x-3">
      <ShareProfileDialog username={username} />
      <button onClick={handleLogout}>
        <HiOutlineLogout size={20} />
      </button>
    </div>
  )
}

export default NavActionButtons
