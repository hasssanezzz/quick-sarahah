import Link from 'next/link'
import { HiOutlineUser } from 'react-icons/hi'
import { validateToken } from '@/actions/auth'
import NavActionButtons from './NavActionButtons'

async function Navbar() {
  const { success } = await validateToken()

  return (
    <nav className="h-20 w-full bg-blue-500 text-white">
      <div className="container mx-auto h-full w-full flex items-center justify-between">
        <Link href="/" className="sm:text-2xl text-xl font-bold uppercase">
          Brutally honest
        </Link>

        <div className="space-x-3">
          {success ? (
            <NavActionButtons />
          ) : (
            <>
              <Link href="/auth/signup">
                <HiOutlineUser />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
