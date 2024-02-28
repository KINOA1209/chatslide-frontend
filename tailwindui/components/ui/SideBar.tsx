'use client';

import { useState, useEffect, ReactNode, cloneElement } from 'react';

import { useRouter } from 'next/navigation';
import GoogleAnalytics from '@/components/integrations/GoogleAnalytics';
import Hotjar from '@/components/integrations/Hotjar';
import AuthService from '../../services/AuthService';
import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import SideBarItem from './SideBarItem';
import { SideBarData } from './SideBarData';
import { BlueLabel, GrayLabel } from './GrayLabel';
import { UserStatus, useUser } from '@/hooks/use-user';
import useHydrated from '@/hooks/use-hydrated';
import Modal from './Modal';

interface SideBarProps { }
const SideBar = ({ }: SideBarProps) => {
  const [top, setTop] = useState<boolean>(true);
  const { uid, credits, tier, userStatus } = useUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { signOut: userSignOut } = useUser();

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    console.log('isMobile', isMobile);
  }, []);

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  const signOut = async () => {
    try {
      await AuthService.signOut();
      sessionStorage.clear();
      localStorage.clear();
      userSignOut();
      console.log('You have signed out!');
      router.push('/');
    } catch (error: any) {
      console.error(error);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (window.innerWidth < 1080) {
      setIsSidebarOpen(false);
    }

    if (
      location.pathname.includes('/workflow-review-slides') &&
      window.innerWidth < 1600
    ) {
      setIsSidebarOpen(false);
    }
  }, []);

  // avoid hydration error during development caused by persistence
  if (!useHydrated()) return <></>;

  if (userStatus != UserStatus.Inited) return <></>;

  if (!uid)
    return (
      <Modal
        showModal={true}
        canClose={false} // cannot close modal
        setShowModal={() => { }}  // cannot close modal
        title="Sign in to continue"
        description="You need to sign in to continue"
        onConfirm={() => router.push('/signin')}
      />
    )

  return (
    <header
      className={`hidden sm:flex sticky left-0 top-0 ${isSidebarOpen ? 'w-[10rem]' : 'w-[3rem]'
        } h-[100vh] flex flex-col items-center justify-between z-30 bg-gradient-to-b from-Dark to-[#121212] bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-gray-800 backdrop-blur-sm shadow-lg' : ''
        }`}
    >
      {/* toggle sidebar button */}
      <button
        className={`rounded-full p-1.5 bg-Dark text-white fixed top-5 ${isSidebarOpen ? 'left-[9rem]' : 'left-[2rem]'
          } focus:outline-none`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
      {/* navigation to different sections */}
      <div className='py-4 flex flex-col items-top justify-between'>
        {/* drlambda home */}

        <a
          href='/'
          className='block flex flex-row items-center gap-2 py-2 text-white px-2 rounded-lg hover:bg-gray-400 cursor-pointer'
          role='menuitem'
        >
          <img
            src='/new_landing/svgs/drlambda-logo.svg'
            alt='DrLambda'
            className='w-[16px] h-[16px]'
          />
          {isSidebarOpen ? 'DrLambda' : '\u200B'}
        </a>

        <hr className='border-t-1 border-grey-400 mx-2 my-2' />
        {/* menu items */}
        {SideBarData.map((item, index) => (
          <SideBarItem
            key={index}
            {...item}
            onSignOut={signOut}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ))}
        {/* sign out */}

        {/* <a
					onClick={signOut}
					className='block flex flex-row items-center gap-2 py-2 text-white px-2 rounded-lg hover:bg-gray-400 cursor-pointer'
					role='menuitem'
				>
					<IoExitOutline /> {isSidebarOpen ? 'Sign Out' : '\u200B'}
				</a> */}
      </div>
      {/* credits and user studies */}
      <div className='flex flex-col items-left justify-between'>
        <div className='block py-1 text-sm text-white'>
          {credits !== 'Infinite' && <a
            href='/account'
            className={`block  py-1 text-sm text-white ${isSidebarOpen ? 'px-2' : 'px-0'
              } rounded-lg hover:bg-gray-400`}
            role='menuitem'
          >
            {credits} ⭐️ {isSidebarOpen && 'Credits'}
          </a>}
          <div className={`w-fit ${isSidebarOpen ? 'px-2' : 'px-0'} py-1`}>
            <BlueLabel>
              {tier.split('_')[0]} {isSidebarOpen && 'Tier'}
            </BlueLabel>
          </div>

          {isSidebarOpen && (
            <>
              <hr className='border-t-1 border-grey-400 mx-2 my-2' />
              <div className='text-white px-2'>
                Join our user study and discord to earn free credits
              </div>
              <a
                href='https://calendar.app.google/2uGV3B6h9UdYBHPB8'
                target='_blank'
                className='block flew flex-row items-center gap-1 py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400'
                role='menuitem'
              >
                Get 1000 ⭐️credits
              </a>
              <a
                href='https://forms.gle/kncWqBjU4n5xps1w8'
                target='_blank'
                className='block flew flex-row items-center gap-1 py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400'
                role='menuitem'
              >
                Get 100 ⭐️credits
              </a>
              <a
                href='https://discord.gg/B6PRtqsT'
                target='_blank'
                className='block flew flex-row items-center gap-1 py-1 text-sm text-white px-2 rounded-lg hover:bg-gray-400'
                role='menuitem'
              >
                Get 50 ⭐️credits
              </a>
            </>
          )}
        </div>
      </div>

      <GoogleAnalytics />

      {/* only render hotjar on desktop for performance */}
      {!isMobile && <Hotjar />}
    </header>
  );
};

export default SideBar;
