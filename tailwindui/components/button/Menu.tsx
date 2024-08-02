'use client';

import { useUser } from '@/hooks/use-user';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { PlusLabel } from '../ui/GrayLabel';

export const Menu: React.FC<{
	children: React.ReactNode;
	button?: React.ReactNode;
	icon?: React.ReactNode;
	iconPadding?: string;
	mode?: 'hover' | 'click';
	align?: 'left' | 'right';
}> = ({
	children,
	button = null,
	icon = (
		<HiOutlineDotsVertical
			style={{ color: '#667085', width: '1rem', height: '1rem' }}
		/>
	),
	mode = 'click',
	iconPadding = '5px',
	align = 'right',
}) => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const showDropdown = () => {
		setIsDropdownVisible(true);
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};
	const hideDropdown = () => setIsDropdownVisible(false);

	const toggleDropdown = (event: React.MouseEvent) => {
		if (mode === 'click') {
			event.stopPropagation(); // Prevents the event from bubbling up to the Link
			setIsDropdownVisible((prev) => !prev);
		}
	};

	//   useEffect(() => {
	//     console.log('children is ', children)
	// }, [children]);

	const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
		if (mode === 'hover') {
			// if (timeoutRef.current) {
			// 	clearTimeout(timeoutRef.current);
			// }
			showDropdown();
		} else {
			event.currentTarget.style.background =
				'var(--Colors-Background-bg-tertiary, #F2F4F7)';
		}
	};

	const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
		if (mode === 'hover') {
			// wait for 200ms before hiding the dropdown
			timeoutRef.current = setTimeout(() => {
				hideDropdown();
			}, 200);
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
						padding: button ? '0px' : iconPadding,
						alignItems: 'center',
						borderRadius: 'var(--radius-sm, 6px)',
						transition: 'background-color 0.3s',
					}}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={mode === 'click' ? handleMouseLeave : undefined}
					onClick={toggleDropdown}
				>
					{button ? button : icon}
				</div>

				{isDropdownVisible && children !== undefined && (
					<div
						ref={dropdownRef}
						className={`absolute top-full ${align}-0 bg-white shadow-md rounded-md border border-2 border-gray-200 mt-1 lg:w-[180px]`}
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
	isPaidFeature?: boolean;
}> = ({
	icon,
	label,
	onClick,
	className = '',
	style = {},
	isPaidFeature = false,
}) => {
	const { isPaidUser } = useUser();
	return (
		<button
			className={`block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left ${className} justify-between`}
			onClick={onClick}
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				gap: 'var(--spacing-lg, 12px)',
				borderBottom:
					'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
				...style,
			}}
		>
			<div className='flex flex-row items-center gap-x-2'>
				{icon}
				{label}
			</div>
			{isPaidFeature && !isPaidUser && <PlusLabel />}
		</button>
	);
};
