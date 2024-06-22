'use client'

import { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export const Menu: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsDropdownVisible((prev) => !prev);
	};

	// for hovering effect change dropdown menu section color
	const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
		event.currentTarget.style.background =
			'var(--Colors-Background-bg-tertiary, #F2F4F7)';
	};

	const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
		event.currentTarget.style.background = 'transparent';
	};

  useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownVisible(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div
			className='col-span-1 flex'
		>
			<div className='h-full flex justify-end items-center w-full gap-4 relative'>
				<div
					style={{
						display: 'flex',
						cursor: 'pointer',
						padding: '5px',
						alignItems: 'center',
						borderRadius: 'var(--radius-sm, 6px)',
						transition: 'background-color 0.3s', // Smooth transition
					}}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onClick={() => {
						toggleDropdown();
						// Add functionality for the share button
					}}
				>
					<HiOutlineDotsVertical
						style={{ color: '#667085', width: '1rem', height: '1rem' }}
					></HiOutlineDotsVertical>
				</div>

				{isDropdownVisible && (
					<div
						ref={dropdownRef}
						className='absolute top-full right-0 bg-white shadow-md rounded-md border border-2 border-gray-200 mt-1 lg:w-[180px]'
						style={{
							zIndex: 999,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{children}
					</div>
				)}
			</div>
		</div>
	);
};
