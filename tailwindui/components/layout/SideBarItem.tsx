'use client';
// SidebarItem.tsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import chevron icons
import { useRouter } from 'next/navigation';
import { SubMenu } from './SideBarData';

interface SidebarItemProps {
	title: string;
	icon: React.ReactNode;
	path?: string;
	target?: string;
	subMenus?: SubMenu[];
	onClick?: () => void;
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isSidebarOpen: boolean) => void;
	onSignOut?: () => void;
}

const SideBarItem: React.FC<SidebarItemProps> = ({
	title,
	icon,
	path,
	target,
	subMenus,
	onClick,
	isSidebarOpen,
	setIsSidebarOpen,
	onSignOut,
}) => {
	const router = useRouter();
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

	const handleSubMenuToggle = () => {
		if (!isSubMenuOpen) {
			setIsSidebarOpen(true);
		}
		setIsSubMenuOpen(!isSubMenuOpen);
	};

	const handleItemClick = () => {
		if (onClick) {
			onClick();
		}
		setIsSubMenuOpen(false); // Close the submenu when clicking on the item
	};

	const handleSubMenuClick = (subMenu: SubMenu) => {
		if (subMenu.title === 'Sign Out' && onSignOut) {
			onSignOut();
		} else if (subMenu.path) {
			// Use Next.js router to navigate to the specified path
			router.push(subMenu.path);
			console.log(`Navigating to submenu: ${subMenu.path}`);
		} else {
			console.log(`invalid path: ${subMenu.path}`);
			// You can add more logic here for other submenus without paths
		}
	};

	return (
		<div>
			<div onClick={handleSubMenuToggle} role='menuitem'>
				<a
					href={path}
					target={target}
					className='block flex flex-row items-center gap-2 py-2 text-white px-2 rounded-lg hover:bg-gray-400 cursor-pointer'
					role='menuitem'
				>
					{icon}
					{isSidebarOpen ? title : '\u200B'}
					{subMenus &&
						isSidebarOpen &&
						(isSubMenuOpen ? <FaChevronUp /> : <FaChevronDown />)}
				</a>
			</div>

			{/* submenus item */}
			{subMenus && isSidebarOpen && isSubMenuOpen && (
				<div>
					{subMenus.map((subMenu, index) => (
						<div
							key={index}
							onClick={() => handleSubMenuClick(subMenu)}
							className='block flex flex-row items-center gap-2 py-2 text-white px-4 rounded-lg hover:bg-gray-400 cursor-pointer'
							role='menuitem'
						>
							{subMenu.title}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SideBarItem;
