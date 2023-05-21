import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/images/logo_transparent.png'

export default function Logo() {
  return (
        <Link href="https://drlambda.ai" className="block" aria-label="Cruip">
          <Image
            src={logo}
            alt="Dr. Lambda"
            className="w-16 h-16"
          />
        </Link>
  )
}
