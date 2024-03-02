import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { HiOutlineShare } from 'react-icons/hi'
import { Button } from './ui/button'
import toast from 'react-hot-toast'

function ShareProfileDialog({ username }: { username: string }) {
  const url = 'https://qsarahah.vercel.app/send/' + username
  
  function handleCopy() {
    navigator.clipboard.writeText(url)
    toast.success('URL copied successfully')
  }

  return (
    <Dialog>
      <DialogTrigger>
        <HiOutlineShare size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your profile with friends!! 🥵</DialogTitle>
          <DialogDescription>
            <pre className="font-mono p-3 bg-black text-gray-400 rounded-md text-center mt-5">
              {url}
            </pre>

            <Button
              className="bg-blue-500 hover:bg-blue-600 mt-3 w-full"
              onClick={handleCopy}
            >
              Copy URL
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ShareProfileDialog
