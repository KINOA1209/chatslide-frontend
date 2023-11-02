import Image from 'next/image'
import logo from '@/public/new_landing/svgs/drlambda-logo.svg'

export function Logo() {
  return (
    <a href='/dashboard' className='block' aria-label='Cruip'>
      <img
        src='/new_landing/svgs/drlambda-logo.svg'
        alt='DrLambda'
        className='w-[1.5rem] h-[1.5rem]'
      />
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
      style={{ backgroundColor: 'black' }}
    >
      <img
        src='/images/logo_no_text.png'
        alt='DrLambda'
        className='w-16 h-16'
      />
    </a>
  )
}
