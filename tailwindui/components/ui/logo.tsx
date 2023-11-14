import Image from 'next/image'
import logo from '@/public/new_landing/svgs/drlambda-logo.svg'

export function Logo() {
  return (
    <a href='/' className='block' aria-label='Cruip'>
      <img
        src='/new_landing/svgs/drlambda-logo.svg'
        alt='DrLambda'
        className='w-[1.5rem] h-[1.5rem]'
      />
    </a>
  )
}

export function Home() {
  return (
    <a href='/' className='block' aria-label='Cruip'>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className='w-[1.5rem] h-[1.5rem]'>
        <path
          d="M1.33325 5.33336L7.82125 2.08936C7.87674 2.06166 7.9379 2.04724 7.99992 2.04724C8.06193 2.04724 8.1231 2.06166 8.17858 2.08936L14.6666 5.33336M13.3333 7.33336V12.6667C13.3333 13.0203 13.1928 13.3595 12.9427 13.6095C12.6927 13.8596 12.3535 14 11.9999 14H3.99992C3.6463 14 3.30716 13.8596 3.05711 13.6095C2.80706 13.3595 2.66659 13.0203 2.66659 12.6667V7.33336"
          stroke="white"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round" />
      </svg>
    </a>
  )
}

export function BlackLogo() {
  return (
    <a
      href='/'
      className='block'
      aria-label='Cruip'
      style={{ backgroundColor: 'black' }}
    >
      <img
        src='/new_landing/svgs/drlambda-logo.svg'
        alt='DrLambda'
        className='w-16 h-16'
      />
    </a>
  )
}

export function ColorLogo() {
  return (
    <a
      href='/'
      className='block'
      aria-label='Cruip'
    >
      <img
        src='/images/Logo_Color.png'
        alt='DrLambda'
        className='w-16 h-16'
      />
    </a>
  )
}
