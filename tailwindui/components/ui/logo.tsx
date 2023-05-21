import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/images/Lambda_L-01.4.png'

export default function Logo() {
  return (
        <Link href="https://drlambda.ai" className="block" aria-label="Cruip">
          <Image
            src={logo}
            alt="Dr. Lambda"
            className="w-32 h-32"
          />
        </Link>
  )
}
