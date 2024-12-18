'use client';

import { useState, useEffect, ReactNode, cloneElement } from 'react';

import { useRouter } from 'next/navigation';
import GoogleAnalytics from '@/components/integrations/GoogleAnalytics';
import AuthService from '../../services/AuthService';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SideBarItem from './SideBarItem';
import { SideBarData } from './SideBarData';
import { BlueLabel, GrayLabel } from '../ui/GrayLabel';
import { UserStatus, useUser } from '@/hooks/use-user';
import useHydrated from '@/hooks/use-hydrated';
import Modal from '../ui/Modal';
import FeedbackButton from '../ui/feedback';
import { usePathname } from 'next/navigation';
import { Logo } from '../ui/logo';
import { getBrand, isChatslide } from '@/utils/getHost';

const navBarFontColorCSSProp: React.CSSProperties = {
	color: 'var(--colors-text-text-secondary-700, #344054)',
};

export function publiclyAvailable(path: string): boolean {
	return (
		path.includes('/discover') ||
		path.includes('/pricing') ||
		path.includes('/whatsnew')
	);
}

export function getTierDisplayName(
	tier: string,
	isSidebarOpen: boolean,
): string {
	const level = tier.split('_')[0];
	if (!isSidebarOpen && level === 'ULTIMATE') {
		return 'ULT';
	}
	if (isSidebarOpen) return level;
	return level;
}

interface SideBarProps {}
const SideBar = ({}: SideBarProps) => {
	const [top, setTop] = useState<boolean>(true);
	const { token, credits, tier, userStatus, expirationDate } = useUser();
	const router = useRouter();
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const { signOut } = useUser();
	const path = usePathname();

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

	const onSignOut = async () => {
		try {
			signOut();
			sessionStorage.clear();
			localStorage.clear();
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
		if (path.includes('/slides')) {
			setIsSidebarOpen(false);
		} else {
			if (window.innerWidth < 1080) {
				setIsSidebarOpen(false);
			} else {
				setIsSidebarOpen(true);
			}
		}
	}, [path]);

	function getCreditsDisplay(credits: string, isSidebarOpen: boolean): string {
		if (isSidebarOpen) {
			return credits + ' ⭐️ Credits';
		}
		if (credits === 'Unlimited') {
			return '∞ ⭐️';
		}
		return credits + ' ⭐️';
	}

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	if (userStatus == UserStatus.Initing || userStatus == UserStatus.NotInited)
		return <></>;

	if (userStatus == UserStatus.Failed || !token) {
		if (publiclyAvailable(path))
			return <></>; // do not show sidebar if user is a visitor
		else
			return (
				<Modal
					showModal={true}
					canClose={false} // cannot close modal
					setShowModal={() => {}} // cannot close modal
					title='Sign in to continue'
					description='Session expired, you need to sign in again to continue'
					onConfirm={() => router.push('/signup')}
				/>
			);
	}

	return (
		<header
			className={`hidden sm:flex sticky left-0 top-0 ${
				isSidebarOpen ? 'w-[220px]' : 'w-[3rem]'
			} h-[100vh] flex flex-col justify-between z-30 transition duration-300 ease-in-out ${
				!top ? 'backdrop-blur-sm shadow-lg' : ''
			}  ${isChatslide() ? 'bg-white' : 'bg-[#F9FAFB]'}`}
			style={{
				paddingLeft: 'var(--spacing-xl, 0.1rem)',
				paddingRight: 'var(--spacing-xl, 0.1rem)',
				borderRight: '1px solid var(--Colors-Border-border-secondary, #EAECF0)',
			}}
		>
			{/* toggle sidebar button */}
			<button
				className={`rounded-full p-1.5 absolute top-3 ${
					isSidebarOpen ? 'left-[202px]' : 'left-[32px]'
				} focus:outline-none`}
				onClick={toggleSidebar}
				style={{
					color: 'var(--colors-text-text-secondary-700, #344054)',
					backgroundColor: '#F2F4F7',
				}}
			>
				{isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
			</button>
			{/* navigation to different sections */}
			<div className='py-[2rem] flex flex-col items-top justify-between'>
				{/* drlambda home */}

				<div
					className={`block flex flex-row items-center py-2 gap-x-2 mx-auto ${isSidebarOpen ? 'px-[0.75rem]' : ''} rounded-lg hover:bg-[#F2F4F7] cursor-pointer`}
					onClick={() => router.push('/landing')}
					role='menuitem'
					style={{
						color: 'var(--colors-text-text-secondary-700, #344054)',
						fontWeight: 'bold',
					}}
				>
					<Logo color={true} size={'24px'} />
					{isSidebarOpen && getBrand()}
				</div>

				<hr
					style={{
						borderTop:
							'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
						margin: '0.75rem 0.5rem 0.75rem 0.5rem',
					}}
				/>
				{/* menu items */}
				{SideBarData.map((item, index) =>
					// If the item is DrLambda-only and the condition is not DrLambda, skip rendering
					item.chatslideOnly && !isChatslide() ? null : item.drlambdaOnly && // If the item is ChatSlide-only and the condition is DrLambda, skip rendering
					  isChatslide() ? null : (
						// Otherwise, render the SideBarItem
						<SideBarItem
							key={index}
							{...item}
							onSignOut={onSignOut}
							isSidebarOpen={isSidebarOpen}
							setIsSidebarOpen={setIsSidebarOpen}
							id={`sidebar-item-${item.title}`}
						/>
					),
				)}
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
			<div
				className={`flex flex-col items-left justify-between mb-[5rem] ${isSidebarOpen ? 'bg-[#F9FAFB]' : ''}`}
				style={{
					marginLeft: 'var(--spacing-xl, 0.5rem)',
					marginRight: 'var(--spacing-xl, 0.5rem)',
					borderRadius: 'var(--radius-md, 0.5rem)',
					// background: 'var(--Colors-Background-bg-secondary, #F9FAFB)',
					padding:
						'var(--spacing-2xl, 0.5rem) var(--spacing-xl, 0.5max-h-6 text-center text-Blue text-xs font-bold leading-snug tracking-wide bg-Sky border border-1 border-Blue rounded cursor-auto px-1 py-0.5rem)',
				}}
			>
				<div className='block text-sm'>
					{/* {parseInt(credits) < 200 && (
            <a
              href='/account'
              className={`block py-1 text-sm text-green-400 mx-auto text-center rounded-lg hover:bg-gray-400`}
              role='menuitem'
            >
              {'Missing credits?'}
            </a>
          )} */}
					<a
						href='/account'
						className={`flex flex-row ${isSidebarOpen ? '' : 'flex-col'} justify-between items-center mx-1 cursor-pointer`}
					>
						<div
							className={
								`block py-1 text-sm rounded-lg hover:bg-[#F2F4F7]  `
								// (credits === 'Unlimited'
								// 	? 'text-green-400'
								// 	: parseInt(credits) <= 10
								// 		? 'text-red-400'
								// 		: 'text-white')
							}
							role='menuitem'
							style={{
								fontFamily: 'Inter SemiBold',
								fontWeight: 'bold',
								color: 'var(--colors-text-text-secondary-700, #344054)',
								padding: 'var(--spacing-md, 0.5rem) var(--spacing-lg, 0.75rem)',
							}}
						>
							{getCreditsDisplay(credits, isSidebarOpen)}
						</div>
						<div className={`w-fit`}>
							<BlueLabel>{getTierDisplayName(tier, isSidebarOpen)}</BlueLabel>
						</div>
					</a>
					{credits != 'Unlimited' &&
						tier.includes('LIFETIME') &&
						isSidebarOpen && (
							<a
								href='/account#unlimited-upgrade'
								className={`block py-1 text-sm text-green-600 mx-auto text-center rounded-lg hover:bg-[#F2F4F7] `}
								role='menuitem'
							>
								{'Get unlimited'}
							</a>
						)}

					{(expirationDate && tier.includes('CANCELLED_')) ||
						(tier.includes('ONETIME') && (
							<a
								href='/account'
								className={`block py-1 text-sm text-red-400 mx-auto text-center rounded-lg hover:bg-[#F2F4F7] `}
								role='menuitem'
							>
								Expiring {isSidebarOpen && 'on ' + expirationDate}
							</a>
						))}

					{isSidebarOpen && (
						<>
							{/* {isChatslide() && (
								<div
									// className=' px-2'
									style={{
										color: 'var(--colors-text-text-quaternary-500, #667085)',
										padding:
											'var(--spacing-md, 0.5rem) var(--spacing-lg, 0.75rem)',
									}}
								>
									Join our discord to earn free credits
								</div>
							)} */}
							{isChatslide() && (
								<a
									href='/meet'
									target='_blank'
									className='block flew flex-row items-center gap-1 text-sm  rounded-lg hover:bg-[#F2F4F7] '
									role='menuitem'
									id='user-study-1000-credits'
									style={{
										color: 'var(--colors-text-text-quaternary-500, #667085)',
										padding:
											'var(--spacing-md, 0.5rem) var(--spacing-lg, 0.75rem)',
									}}
								>
									Book a call for 1000⭐️
								</a>
							)}
							{/* {isChatslide() ? (
								<a
									href='https://qualtricsxm6ltvkn8sw.qualtrics.com/jfe/form/SV_6nF7L74Sv68ynzw'
									target='_blank'
									className='block flew flex-row items-center gap-1 text-sm  rounded-lg hover:bg-[#F2F4F7] '
									role='menuitem'
									id='user-study-100-credits'
									style={{
										color: 'var(--colors-text-text-quaternary-500, #667085)',
										padding:
											'var(--spacing-md, 0.5rem) var(--spacing-lg, 0.75rem)',
									}}
								>
									Get 200 ⭐️credits
								</a>
							) : (
								<a
									href='https://forms.gle/kncWqBjU4n5xps1w8'
									target='_blank'
									className='block flew flex-row items-center gap-1 text-sm  rounded-lg hover:bg-[#F2F4F7] '
									role='menuitem'
									id='user-study-100-credits'
									style={{
										color: 'var(--colors-text-text-quaternary-500, #667085)',
										padding:
											'var(--spacing-md, 0.5rem) var(--spacing-lg, 0.75rem)',
									}}
								>
									Get 100 ⭐️credits
								</a>
							)} */}
							{isChatslide() && (
								<a
									href='/discord'
									target='_blank'
									className='block flew flex-row items-center gap-1 text-sm  rounded-lg hover:bg-[#F2F4F7] '
									role='menuitem'
									id='discord-50-credits'
									style={{
										color: 'var(--colors-text-text-quaternary-500, #667085)',
										padding:
											'var(--spacing-md, 0.5rem) var(--spacing-lg, 0.75rem)',
									}}
								>
									Join Discord for 50⭐️
								</a>
							)}
							<a
								href='/affiliate'
								target='_blank'
								className='block flew flex-row items-center gap-1 text-sm  rounded-lg hover:bg-[#F2F4F7] '
								role='menuitem'
								id='discord-50-credits'
								style={{
									color: 'var(--colors-text-text-quaternary-500, #667085)',
									padding:
										'var(--spacing-md, 0.5rem) var(--spacing-lg, 0.75rem)',
								}}
							>
								💸 Affiliate
							</a>
						</>
					)}

					{/* <div className='relative'>
						<FeedbackButton timeout={path.includes('/slides') ? 30 * 1000 : 0} />
					</div> */}
				</div>
			</div>

			<GoogleAnalytics />
		</header>
	);
};

export default SideBar;
