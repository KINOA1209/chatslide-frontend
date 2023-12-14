'use client'

import { useState, useEffect } from 'react'

import { Home, Logo } from './logo'
import { useRouter } from 'next/navigation'
import GoogleAnalytics from '@/components/integrations/GoogleAnalytics'
import Hotjar from '@/components/integrations/Hotjar'
import { Auth, Hub } from 'aws-amplify'
import AuthService from '../../services/AuthService'
import UserService from '@/services/UserService'
import { FaBars, FaTimes } from 'react-icons/fa'

interface SideBarProps {
}
const SideBar = ({ }: SideBarProps) => {
  const [top, setTop] = useState<boolean>(true)
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
    const checkUser = async () => {
      try {
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
        await getCredits(idToken)
        setLoading(false)
      } catch {
        console.log('No authenticated user.')
        router.push('/signin')
      }
    }

    const getCredits = async (idToken: string) => {
      try {
        const { credits, tier } = await UserService.getUserCreditsAndTier(idToken)
        setCredits(credits)
        setTier(tier)
      } catch (error: any) {
        console.error(error)
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <header
      className={`hidden sm:flex sticky left-0 top-0 ${isSidebarOpen ? 'w-[10rem]' : 'w-0'} h-[100vh] flex flex-col justify-between z-30 bg-gray-800 bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-gray-800 backdrop-blur-sm shadow-lg' : ''
        }`}
    >
      <button
        className={`rounded-full p-1.5 bg-blue-500 text-white fixed top-4 ${isSidebarOpen ? 'left-[9rem]' : 'left-0'} focus:outline-none`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isSidebarOpen &&
      <>
          <div className='py-4 flex flex-col items-top justify-between'>
            {/* Site branding */}
            <div className='px-2 gap-x-2 flex flex-row items-center justify-start'>
              <div className='min-w-[1.5rem]'>
                <Logo />
              </div>
              <div className='flex flex-row justify-center item-center justify-start'>
                <div className='w-fit h-[1.5rem] text-xl text-gray-200 bg-clip-text bg-gradient-to-r relative bottom-[3px] font-creato-medium'>
                  <a href='/dashboard'>DrLambda</a>
                </div>
              </div>
            </div>

            <br />

            <div className="py-1" role="none">
              <a
                href="/dashboard"
                className="block  py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400"
                role="menuitem"
              >
                🗂️ Projects
              </a>
              <a
                href="/my-resources"
                className="block  py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400"
                role="menuitem"
              >
                📚 Resources
              </a>
              <a
                href="/account"
                className="block  py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400"
                role="menuitem"
              >
                ⚙️ Account
              </a>
            </div>
          </div>

          <div className='flex flex-col items-center justify-between'>
            <div className="block py-1 text-sm text-white">

              <div className="text-white px-2">Join our user study to earn ⭐️credits</div>
              <a
                href="https://calendar.app.google/2uGV3B6h9UdYBHPB8"
                target='_blank'
                className="block  py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400"
                role="menuitem"
              >
                📆 Book a Session
              </a>
              <a
                href="https://forms.gle/kncWqBjU4n5xps1w8"
                target='_blank'
                className="block  py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400"
                role="menuitem"
              >
                📄 Fill a Survey
              </a>

              <br />

              <a
                href="/account"
                className="block  py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400"
                role="menuitem"
              >
                ⭐️ Credits: {credits}
              </a>
              <a
                href="/account"
                className="block  py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400"
                role="menuitem"
              >
                💙 Tier: {tier.split('_')[0]}
              </a>
              <a
                onClick={signOut}
                className="block py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400"
                role="menuitem"
              >
                ⬅️ Sign out
              </a>
            </div>
          </div>
        </>
      }

      <GoogleAnalytics />

      {/* only render hotjar on desktop for performance */}
      {!isMobile && <Hotjar />}
    </header>
  )
}

export default SideBar
