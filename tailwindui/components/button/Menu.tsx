'use client';

import { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export const Menu: React.FC<{
	children: React.ReactNode;
	icon?: React.ReactNode;
	iconPadding?: string;
	mode?: 'hover' | 'click';
}> = ({
	children,
	icon = (
		<HiOutlineDotsVertical
			style={{ color: '#667085', width: '1rem', height: '1rem' }}
		/>
	),
	mode = 'click',
	iconPadding = '5px',
}) => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const showDropdown = () => setIsDropdownVisible(true);
	const hideDropdown = () => setIsDropdownVisible(false);

	const toggleDropdown = () => {
		if (mode === 'click') {
			setIsDropdownVisible((prev) => !prev);
		}
	};

	const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
		if (mode === 'hover') {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			showDropdown();
		} else {
			event.currentTarget.style.background =
				'var(--Colors-Background-bg-tertiary, #F2F4F7)';
		}
	};

	const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
		if (mode === 'hover') {
			// do nothing, since we want to keep the dropdown open
		} else {
			event.currentTarget.style.background = 'transparent';
		}
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				hideDropdown();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='col-span-1 flex'>
			<div
				className='h-full flex justify-end items-center w-full gap-4 relative'
				onMouseLeave={mode === 'hover' ? handleMouseLeave : undefined}
			>
				<div
					style={{
						display: 'flex',
						cursor: 'pointer',
						padding: iconPadding,
						alignItems: 'center',
						borderRadius: 'var(--radius-sm, 6px)',
						transition: 'background-color 0.3s',
					}}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={mode === 'click' ? handleMouseLeave : undefined}
					onClick={toggleDropdown}
				>
					{icon}
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
						onMouseEnter={mode === 'hover' ? showDropdown : undefined}
						onMouseLeave={mode === 'hover' ? hideDropdown : undefined}
					>
						{children}
					</div>
				)}
			</div>
		</div>
	);
};

export const MenuItem: React.FC<{
	icon?: React.ReactNode;
	label: string;
	onClick: () => void;
	className?: string;
	style?: React.CSSProperties;
}> = ({ icon, label, onClick, className = '', style = {} }) => {
	return (
		<button
			className={`block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left ${className}`}
			onClick={onClick}
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'flex-start',
				gap: 'var(--spacing-lg, 12px)',
				borderBottom:
					'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
				...style,
			}}
		>
			{icon}
			{label}
		</button>
	);
};
