'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import { Home, Logo } from './logo'
import DropdownButton from '@/components/utils/dropdown'
import MobileMenu from './mobile-menu'
import { useRouter } from 'next/navigation'
import GoogleAnalytics from '@/components/integrations/GoogleAnalytics'
import Hotjar from '@/components/integrations/Hotjar'
// import AuthService from "../utils/AuthService";
import { Auth, Hub } from 'aws-amplify'
import AuthService from '../utils/AuthService'
import { DrlambdaLogoIcon } from '../new_landing/Icons'

interface HeaderProps {
  loginRequired: boolean
  isLanding: boolean
  refList?: Array<React.RefObject<HTMLDivElement>>
}
const Header = ({ loginRequired, isLanding = false, refList }: HeaderProps) => {
  const [top, setTop] = useState<boolean>(true)
  const [userId, setUserId] = useState(null)
  // const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    console.log('isMobile', isMobile)
  }, [])


  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  useEffect(() => {
    // mixpanel.init('22044147cd36f20bf805d416e1235329', {
    //   debug: true,
    //   track_pageview: true,
    //   persistence: 'localStorage',
    //   ignore_dnt: true,
    // })

    const checkUser = async () => {
      try {
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
        setUserId(userId)
        // mixpanel.identify(userId)
        setLoading(false)
      } catch {
        console.log('No authenticated user.')
        if (loginRequired) {
          router.push('/signin')
        }
        setLoading(false)
      }
    }

    // check the current user when component loads
    checkUser()

    const listener = (data: any) => {
      switch (data.payload.event) {
        case 'signIn':
          console.log('user signed in')
          checkUser()
          break
        case 'signOut':
          console.log('user signed out')
          setUserId(null)
          break
        default:
          break
      }
    }

    // add auth event listener
    Hub.listen('auth', listener)

    // remove auth event listener on cleanup
    return () => {
      Hub.remove('auth', listener)
    }
  }, [])

  const handScrollTo = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (isLanding && refList && refList[index].current) {
      refList[index].current?.scrollIntoView()
    }
  }

  if (loading) {
    // Render a loading state or a blank placeholder
    return (
      <header
        className={`fixed w-full z-30 bg-gray-800 bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-gray-800 backdrop-blur-sm shadow-lg' : ''
          }`}
      >
        <div className='max-w-4/5 mx-auto px-5'>
          <div className='flex items-center justify-between h-12'>
            {/* Site branding */}
            <div className='flex flex-row justify-center items-center gap-[0.37rem] grow-0'>
              <Logo />
              <div className='grow-0 flex justify-start'>
                <div className='w-fit h-[1.5rem] text-[1.3125rem] text-gray-200 bg-clip-text bg-gradient-to-r from-blue-600  to-purple-500 relative bottom-[3px] font-creato-medium'>
                  <a href='/dashboard'>DrLambda</a>
                </div>
              </div>
            </div>

            {/* Desktop navigation */}
            <nav className='flex w-[272px]'></nav>

            {/* <MobileMenu refList={refList} /> */}
          </div>
        </div>
        <GoogleAnalytics />

        {/* only render hotjar on desktop for performance */}
        {!isMobile && <Hotjar />}
      </header>
    )
  }

  return (
    <header
      className={`fixed w-full z-30 bg-gray-800 bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-gray-800 backdrop-blur-sm shadow-lg' : ''
        }`}
    >
      <div className='max-w-4/5 mx-auto px-5'>
        <div className='flex items-center justify-between h-12'>
          {/* Site branding */}
          <div className='flex flex-row items-center gap-x-2'>
            <Logo />
            <div className='grow flex flex-row justify-center item-center justify-start'>
              <div className='w-fit h-[1.5rem] text-xl text-gray-200 bg-clip-text bg-gradient-to-r relative bottom-[3px] font-creato-medium'>
                <a href={!isLanding ? '/dashboard' : '/'}>DrLambda</a>
              </div>
            </div>
          </div>

          {/* landing sections */}
          {isLanding && (
            <div className="w-1/3 flex">
              <div className='flex-grow flex w-full justify-between items-center'>
                <a href="#features" className='cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-regular'>
                  <span>Features</span>
                </a>
                <a href="#scenarios" className='cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-regular'>
                  <span>Scenarios</span>
                </a>
                <a href="#use-cases" className='cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-regular'>
                  <span>Use Cases</span>
                </a>
                <a href="#pricing" className='cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-regular'>
                  <span>Pricing</span>
                </a>
              </div>
            </div>
          )}

          {/* Desktop navigation */}
          <nav className='flex w-[272px]'>
            {/* Desktop sign in links */}
            {userId ? (
              <ul className='flex grow justify-end flex-wrap items-center'>
                <DropdownButton />
              </ul>
            ) : (
              <ul className='flex grow justify-end flex-nowrap items-center'>
                <li>
                  <Link
                    href='/signin'
                    className='hidden sm:flex btn-sm drop-shadow-xl rounded-full text-white w-auto mb-0 cursor-pointer mr-4'
                    style={{
                      backgroundColor: '#1D222A',
                      backgroundSize: '100%',
                      fontFamily: 'Lexend, sans-serif',
                    }}
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href='/signup'
                    className='btn-sm drop-shadow-xl rounded-full text-white w-auto mb-0 cursor-pointer'
                    style={{
                      backgroundColor: '#1D222A',
                      backgroundSize: '100%',
                      fontFamily: 'Lexend, sans-serif',
                    }}
                  >
                    <span>Join for Free</span>
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          {/* <MobileMenu refList={refList} /> */}
        </div>
      </div>

      <GoogleAnalytics />

      {/* only render hotjar on desktop for performance */}
      {!isMobile && <Hotjar />}
    </header>
  )
}

export default Header
