import Link from 'next/link'
import { HiOutlineLogout, HiOutlineShare } from 'react-icons/hi'
import { validateToken } from '@/actions/auth'

async function Navbar() {
  const { success, data } = await validateToken()

  return (
    <nav className="h-20 w-full bg-blue-500 text-white">
      <div className="container mx-auto h-full w-full flex items-center justify-between">
        <Link href="/" className="sm:text-2xl text-xl font-bold uppercase">
          Brutally honest
        </Link>

        <div className='space-x-3'>
          <button>
            <HiOutlineShare size={20} />
          </button>
          <button>
            <HiOutlineLogout size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
