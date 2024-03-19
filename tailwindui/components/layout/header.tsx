'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { Home, Logo } from '../ui/logo';
import DropdownButton from '@/components/utils/dropdown';
import { useRouter } from 'next/navigation';
import GoogleAnalytics from '@/components/integrations/GoogleAnalytics';
import Hotjar from '@/components/integrations/Hotjar';
// import AuthService from "../utils/AuthService";
import { Auth, Hub } from 'aws-amplify';
import AuthService from '../../services/AuthService';
import { useUser } from '@/hooks/use-user';

interface HeaderProps {
	loginRequired: boolean;
	isLanding: boolean;
	isAuth?: boolean;
}
const Header = ({
	loginRequired,
	isLanding = false,
	isAuth = false,
}: HeaderProps) => {
	const [top, setTop] = useState<boolean>(true);
	// const [username, setUsername] = useState(null);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const { token, signOut } = useUser();

	// detect whether user has scrolled the page down by 10px
	const scrollHandler = () => {
		window.scrollY > 10 ? setTop(false) : setTop(true);
	};

	useEffect(() => {
		scrollHandler();
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, [top]);

	useEffect(() => {
		if(token) 
			setLoading(false);

		const listener = (data: any) => {
			switch (data.payload.event) {
				case 'signIn':
					console.log('user signed in');
					break;
				default:
					break;
			}
		};

		// add auth event listener
		Hub.listen('auth', listener);

		// remove auth event listener on cleanup
		return () => {
			Hub.remove('auth', listener);
		};
	}, []);

	return (
		<header
			className={`relative sticky top-0 w-full z-30 bg-Dark transition duration-300 ease-in-out ${
				!top ? 'bg-gray-800 backdrop-blur-sm shadow-lg' : ''
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
						<div className='w-1/3 hidden sm:flex'>
							<div className='flex-grow flex w-full justify-between items-center'>
								<a
									href='#testimonials'
									className='whitespace-nowrap cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-medium'
								>
									<span>Testimonials</span>
								</a>
								<a
									href='#scenarios'
									className='cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-medium'
								>
									<span>Scenarios</span>
								</a>
								<a
									href='#use-cases'
									className='whitespace-nowrap cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-medium'
								>
									<span>Features</span>
								</a>
								<a
									href='#pricing'
									className='cursor-pointer hover:border rounded-xl py-1 px-2 text-white font-creato-medium'
								>
									<span>Pricing</span>
								</a>
							</div>
						</div>
					)}

					{/* Desktop navigation */}
					<nav className='flex w-[272px]'>
						{/* Desktop sign in links */}
						{!loading && token ? (
							!isAuth && (
								<ul className='flex grow justify-end flex-wrap items-center'>
									<DropdownButton />
								</ul>
							)
						) : (
							<ul className='flex grow justify-end flex-nowrap items-center'>
								<li>
									<Link
										href='/signin'
										className='hidden sm:flex drop-shadow-xl text-white w-auto mb-0 cursor-pointer mr-4 font-creato-medium'
									>
										Sign in
									</Link>
								</li>
								<li>
									<Link
										href='/signup'
										className='btn-sm drop-shadow-xl rounded-full text-white w-auto mb-0 cursor-pointer font-creato-medium bg-Blue'
									>
										<span>Sign Up</span>
									</Link>
								</li>
							</ul>
						)}
					</nav>
				</div>
			</div>

			<GoogleAnalytics />
		</header>
	);
};

export default Header;
