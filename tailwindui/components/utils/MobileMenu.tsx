'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthService from '../../services/AuthService';
import { useUser } from '@/hooks/use-user';
import { sign } from 'crypto';
import Link from 'next/link';
import { SideBarData, SideBarItem } from '../layout/SideBarData';
import { isChatslide } from '@/utils/getHost';


type MenuItemProps = SideBarItem & { onSignOut: () => void };


const MenuItem: React.FC<MenuItemProps> = ({
	title,
	icon,
	path,
	target,
	drlambdaOnly,
	chatslideOnly,
	subMenus,
	onSignOut,
	// setMobileNavOpen,
}) => {
	if (drlambdaOnly && isChatslide()) {
		return <></>;
	}
	if (chatslideOnly && !isChatslide()) {
		return <></>;
	}

	return (
		<>
			<Link
				target={target}
				href={path || ''}
				className='block flex flex-row px-2 py-1 text-sm text-blue-600 hover:bg-gray-200 items-center'
				// onClick={() => setMobileNavOpen(false)}
			>
				{icon}
				<span className='ml-2'>{title}</span>
			</Link>

			{subMenus && subMenus.length > 0 && (
				<ul className='ml-4 mt-1 space-y-1'>
					{subMenus.map((submenu, index) => (
						<li key={index}>
							<Link
								href={submenu.path}
								className='block flex flex-row px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 items-center'
								onClick={submenu.title === 'Sign Out' ? onSignOut : () => {}}
							>
								<span>{submenu.title}</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

interface DropdownButtonProps {}

const MobileMenu: React.FC<DropdownButtonProps> = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const { username, signOut, credits, tier } = useUser();

	function userFirstName() {
		return username.split(' ')[0];
	}

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	const onSignOut = async () => {
		try {
			signOut();
			sessionStorage.clear();
			localStorage.clear();
			console.log('You have signed out!');
			router.push('/');
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

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='relative inline-block text-left' ref={dropdownRef}>
			<div className='flex flex-row items-center gap-2'>
				<a
					href='/account'
					className='block px-4 py-1 text-sm text-white'
					role='menuitem'
				>
					{credits}⭐️
				</a>
				<button
					// type='button'
					className='inline-flex justify-start w-[8rem] rounded-md border border-gray-200 shadow-sm px-4 py-2 bg-white 
					text-sm font-medium text-gray-700 whitespace-nowrap overflow-ellipsis overflow-hidden
					hover:bg-gray-50 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
					id='dropdown-menu-button'
					onClick={toggleDropdown}
					aria-expanded={isOpen}
					aria-haspopup='true'
				>
					Hi, {userFirstName()}
				</button>
			</div>

			{isOpen && (
				<div
					className='absolute top-10 right-0 z-50 mt-2 w-40 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-300'
					style={{ zIndex: 9999 }}
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='dropdown-menu-button'
				>
					<div className='py-1' role='none'>
						{SideBarData.map((item, index) => {
							return <MenuItem key={index} {...item} onSignOut={onSignOut} />;
						})}
					</div>
					<div className='block py-1 text-sm text-blue-600'>
						<a
							href='/account'
							className='block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200'
							role='menuitem'
						>
							Credits: {credits}⭐️
						</a>
						<a
							href='/pricing'
							className='block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200'
							role='menuitem'
						>
							Tier: {tier.split('_')[0]}
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileMenu;
