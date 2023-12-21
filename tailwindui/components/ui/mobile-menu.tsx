// this file is no longer used

'use client';

import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';

interface HeaderProps {
	refList?: Array<React.RefObject<HTMLDivElement>>;
}

const MobileMenu = ({ refList = [] }: HeaderProps) => {
	const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

	const trigger = useRef<HTMLButtonElement>(null);
	const mobileNav = useRef<HTMLDivElement>(null);
	const [username, setUsername] = useState<string>('');
	const [landingPage, setLandingPage] = useState(false);
	const pathname = usePathname();

	function userFirstName() {
		return username.split(' ')[0];
	}

	useEffect(() => {
		// Create a scoped async function within the hook.
		const fetchUser = async () => {
			if (username === null) {
				try {
					const usernameFetched = await AuthService.getCurrentUserDisplayName();
					if (usernameFetched) {
						setUsername(usernameFetched);
					}
				} catch {
					console.log('No username to display.');
				}
			}
		};
		// Execute the created function directly
		fetchUser();
	});

	// close the mobile menu on click outside
	useEffect(() => {
		const clickHandler = ({ target }: { target: EventTarget | null }): void => {
			if (!mobileNav.current || !trigger.current) return;
			if (
				!mobileNavOpen ||
				mobileNav.current.contains(target as Node) ||
				trigger.current.contains(target as Node)
			)
				return;
			setMobileNavOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	// close the mobile menu if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: { keyCode: number }): void => {
			if (!mobileNavOpen || keyCode !== 27) return;
			setMobileNavOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	const signOut = async () => {
		try {
			await AuthService.signOut();
			sessionStorage.clear();
			console.log('You have signed out!');
			setUsername('');
		} catch (error: any) {
			console.error(error);
			toast.error(error.message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
	};

	const handScrollTo = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
		if (refList[index].current) {
			refList[index].current?.scrollIntoView();
		}
		setMobileNavOpen(false);
	};

	return (
		<div className='flex sm:hidden'>
			{/* Hamburger button */}
			<button
				ref={trigger}
				className={`ml-10 hamburger ${mobileNavOpen && 'active'}`}
				aria-controls='mobile-nav'
				aria-expanded={mobileNavOpen}
				onClick={() => setMobileNavOpen(!mobileNavOpen)}
			>
				<span className='sr-only'>Menu</span>
				<svg
					className='w-6 h-6 fill-current text-gray-900'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<rect y='4' width='24' height='2' />
					<rect y='11' width='24' height='2' />
					<rect y='18' width='24' height='2' />
				</svg>
			</button>

			{/*Mobile navigation */}
			<div ref={mobileNav}>
				<Transition
					show={mobileNavOpen}
					as='nav'
					id='mobile-nav'
					className='absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white'
					enter='transition ease-out duration-200 transform'
					enterFrom='opacity-0 -translate-y-2'
					enterTo='opacity-100 translate-y-0'
					leave='transition ease-out duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<ul className='px-5 py-2'>
						{landingPage ? (
							<>
								<li>
									<div
										onClick={(e) => handScrollTo(e, 0)}
										className='flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center'
									>
										Features
									</div>
								</li>
								<li>
									<div
										onClick={(e) => handScrollTo(e, 1)}
										className='flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center'
									>
										Use Cases
									</div>
								</li>
								<li>
									<div
										onClick={(e) => handScrollTo(e, 2)}
										className='flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center'
									>
										Testimonial
									</div>
								</li>
								<li>
									<div
										onClick={(e) => handScrollTo(e, 2)}
										className='flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center'
									>
										Pricing
									</div>
								</li>
								<hr className='border-gray-400' />
							</>
						) : (
							<></>
						)}
						{username ? (
							<>
								<div className='text-2xl py-4 text-blue-500'>
									Hi, {userFirstName()}
								</div>
								<li>
									<Link
										href='/dashboard'
										className='flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center'
										onClick={() => setMobileNavOpen(false)}
									>
										My Projects
									</Link>
								</li>
								<li>
									<Link
										href='/my-resources'
										className='flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center'
										onClick={() => setMobileNavOpen(false)}
									>
										My Resources
									</Link>
								</li>
								<li>
									<Link
										href='/account'
										className='flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center'
										onClick={() => setMobileNavOpen(false)}
									>
										Account Settings
									</Link>
								</li>
								<hr className='border-gray-400' />
								<li>
									<div onClick={signOut}>
										<Link
											href='/'
											className='flex font-medium w-full text-red-500 hover:text-red-600 py-2 justify-center'
											onClick={() => setMobileNavOpen(false)}
										>
											Log Out
										</Link>
									</div>
								</li>
							</>
						) : (
							<>
								<li>
									<Link
										href='/signin'
										className='flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center'
										onClick={() => setMobileNavOpen(false)}
									>
										Sign in
									</Link>
								</li>
								<li>
									<Link
										href='/signup'
										className='btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2'
										onClick={() => setMobileNavOpen(false)}
									>
										<span>Sign up</span>
										<svg
											className='w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1'
											viewBox='0 0 12 12'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z'
												fill='#999'
												fillRule='nonzero'
											/>
										</svg>
									</Link>
								</li>
							</>
						)}
					</ul>
				</Transition>
			</div>
		</div>
	);
};

export default MobileMenu;
