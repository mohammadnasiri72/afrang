import Link from 'next/link'
import { useRouter } from 'next/navigation'
import  { useTransition } from 'react'

function customLink(href) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
  return (
    <Link href={href} onClick={(e)=>{
        e.preventDefault()

    }}>
    
    </Link>
  )
}

export default customLink
