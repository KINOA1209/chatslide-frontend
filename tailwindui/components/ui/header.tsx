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
import AuthService from '../../services/AuthService'
import { DrlambdaLogoIcon } from '../new_landing/Icons'
import UserService from '@/services/UserService'

interface HeaderProps {
  loginRequired: boolean
  isLanding: boolean
  isAuth?: boolean
}
const Header = ({ loginRequired, isLanding = false, isAuth = false }: HeaderProps) => {
  const [top, setTop] = useState<boolean>(true)
  const [userId, setUserId] = useState(null)
  // const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState(0)
  const [tier, setTier] = useState<string>('')

  const router = useRouter()
  const [isMobile, setIsMobile] = useState<boolean>(false)


  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    // get credits and tier
    const getCredits = async () => {
      try {
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
        const { credits, tier } = await UserService.getUserCreditsAndTier(idToken)
        setCredits(credits)
        setTier(tier)
      } catch (error: any) {
        console.error(error)
      }
    }
    getCredits()
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    console.log('isMobile', isMobile)
  }, [])


  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  const signOut = async () => {
    try {
      await AuthService.signOut();
      sessionStorage.clear();
      localStorage.clear();
      console.log('You have signed out!');
      router.push('/');
    } catch (error: any) {
      console.error(error);
    }
  };

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

  return (
    <header
      className={`relative sticky top-0 w-full z-30 bg-gray-800 bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-gray-800 backdrop-blur-sm shadow-lg' : ''
        }`}
    >
      <div className='max-w-4/5 mx-auto px-5'>
        <div className='flex items-center justify-between h-12'>
          {/* Site branding */}
          <div className='flex flex-row items-center gap-x-2'>
            <div className='min-w-[1.5rem]'>
              <Logo />
            </div>
            <div className='grow flex flex-row justify-center item-center justify-start'>
              <div className='w-fit h-[1.5rem] text-xl text-gray-200 bg-clip-text bg-gradient-to-r relative bottom-[3px] font-creato-medium'>
                <a href={loginRequired ? '/dashboard' : '/'}>DrLambda</a>
              </div>
            </div>
          </div>

          {/* landing sections */}
          {isLanding && (
            <div className="w-1/3 hidden sm:flex">
              <div className='flex-grow flex w-full justify-between items-center'>
                <a href="#scenarios" className='cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-regular'>
                  <span>Scenarios</span>
                </a>
                <a href="#use-cases" className='whitespace-nowrap cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-regular'>
                  <span>Features</span>
                </a>
                <a href="#testimonials" className='whitespace-nowrap cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-regular'>
                  <span>Testimonials</span>
                </a>
                <a href="#pricing" className='cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-regular'>
                  <span>Pricing</span>
                </a>
              </div>
            </div>
          )}

          {/* Desktop navigation */}
          {!loading && <nav className='flex w-[272px]'>
            {/* Desktop sign in links */}
            {userId ? (
              (!isAuth && <ul className='flex grow justify-end flex-wrap items-center'>
                <DropdownButton />
              </ul>)
            ) : (
              <ul className='flex grow justify-end flex-nowrap items-center'>
                <li>
                  <Link
                    href='/signin'
                    className='hidden sm:flex drop-shadow-xl text-white w-auto mb-0 cursor-pointer mr-4 font-creato-medium '
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href='/signup'
                    className='btn-sm drop-shadow-xl rounded-full text-white w-auto mb-0 cursor-pointer font-creato-medium bg-blue-700'
                  >
                    <span>Sign Up</span>
                  </Link>
                </li>
              </ul>
            )}
          </nav>}
        </div>
      </div>

      <GoogleAnalytics />

      {/* only render hotjar on desktop for performance */}
      {!isMobile && <Hotjar />}
    </header>
  )
}

export default Header
