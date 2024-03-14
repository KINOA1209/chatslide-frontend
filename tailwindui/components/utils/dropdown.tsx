'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthService from '../../services/AuthService';
import { useUser } from '@/hooks/use-user';

interface DropdownButtonProps {}

const DropdownButton: React.FC<DropdownButtonProps> = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const { username, uid, token, credits, tier } = useUser();

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

	const signOut = async () => {
		try {
			await AuthService.signOut();
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
					type='button'
					className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
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
					className='origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-300'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='dropdown-menu-button'
				>
					<div className='py-1' role='none'>
						<a
							href='/dashboard'
							className='block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200'
							role='menuitem'
						>
							Dashboard
						</a>
						<a
							href='/my-resources'
							className='block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200'
							role='menuitem'
						>
							My Resources
						</a>
						<a
							href='/discover'
							className='block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200'
							role='menuitem'
						>
							Discover
						</a>
						<a
							href='/account'
							className='block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200'
							role='menuitem'
						>
							Account
						</a>
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
							href='/subscription'
							className='block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200'
							role='menuitem'
						>
							Tier: {tier.split('_')[0]}
						</a>
					</div>
					<div className='py-1' role='none'>
						<div className='py-0.2' role='none'>
							<a
								onClick={signOut}
								className='block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200 cursor-pointer'
								role='menuitem'
							>
								Sign out
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownButton;
