'use client'

import { HiOutlineLogout, HiOutlineShare } from 'react-icons/hi'
import { logout } from '@/actions/auth'

function NavActionButtons() {
  async function handleLogout() {
    await logout()
  }

  return (
    <div className='space-x-3'>
      <button>
        <HiOutlineShare size={20} />
      </button>
      <button onClick={handleLogout}>
        <HiOutlineLogout size={20} />
      </button>
    </div>
  )
}

export default NavActionButtons
