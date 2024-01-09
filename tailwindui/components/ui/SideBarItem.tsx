// SidebarItem.tsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import chevron icons

interface SidebarItemProps {
	title: string;
	icon: React.ReactNode;
	path?: string;
	subMenus?: { title: string; path: string }[];
	onClick?: () => void;
	isSidebarOpen: boolean;
}

const SideBarItem: React.FC<SidebarItemProps> = ({
	title,
	icon,
	path,
	subMenus,
	onClick,
	isSidebarOpen,
}) => {
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

	const handleSubMenuToggle = () => {
		setIsSubMenuOpen(!isSubMenuOpen);
	};

	const handleItemClick = () => {
		if (onClick) {
			onClick();
		}
		setIsSubMenuOpen(false); // Close the submenu when clicking on the item
	};

	return (
		<div>
			<div onClick={handleSubMenuToggle} role='menuitem'>
				<a
					href={path}
					className='block flex flex-row items-center gap-2 py-2 text-white px-2 rounded-lg hover:bg-gray-400 cursor-pointer'
					role='menuitem'
				>
					{icon}
					{isSidebarOpen && title}
					{subMenus &&
						isSidebarOpen &&
						(isSubMenuOpen ? <FaChevronUp /> : <FaChevronDown />)}
				</a>
			</div>

			{/* submenus item */}
			{subMenus && isSidebarOpen && isSubMenuOpen && (
				<div>
					{subMenus.map((subMenu, index) => (
						<a
							key={index}
							href={subMenu.path}
							onClick={() =>
								console.log(`Navigating to submenu: ${subMenu.path}`)
							}
							className='block flex flex-row items-center gap-2 py-2 text-white px-4 rounded-lg hover:bg-gray-400 cursor-pointer'
							role='menuitem'
						>
							{subMenu.title}
						</a>
					))}
				</div>
			)}
		</div>
	);
};

export default SideBarItem;
