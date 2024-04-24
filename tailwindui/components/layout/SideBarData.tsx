// sidebarData.tsx
import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { GoHome, GoFile, GoDiscussionOutdated, GoGear } from 'react-icons/go';
import { IoExitOutline, IoMicOutline } from 'react-icons/io5';
import { RiDiscordLine } from 'react-icons/ri';

export interface SubMenu {
	title: string;
	path?: string;
}

export interface SideBarItem {
	title: string;
	icon: React.ReactElement; // React component for icon
	path?: string; // Main path for the item
	subMenus?: SubMenu[]; // Submenus for the item
	target?: string; // Target attribute for external links
}

export const SideBarData: SideBarItem[] = [
	{
		title: 'Dashboard',
		icon: <GoHome width={24}/>,
		path: '/dashboard',
	},
	{
		title: 'Uploads',
		icon: <GoFile width={24}/>,
		path: '/my-resources',
	},
	{
		title: 'Studio',
		icon: <IoMicOutline />,
		path: '/studio',
	},
	{
		title: 'Discover',
		icon: <GoDiscussionOutdated />,
		path: '/discover',
	},
	{
		title: 'Join Discord',
		icon: <RiDiscordLine />,
		path: 'https://drlambda.ai/discord',
		target: '_blank',
	},
	{
		title: 'Account',
		icon: <GoGear />,
		subMenus: [
			{
				title: 'Profile',
				path: '/account',
			},
			{
				title: 'Subscription',
				path: '/subscription',
			},
			{
				title: 'Sign Out',
				path: '',
			},
		],
	},
	// {
	// 	title: 'Sign Out',
	// 	icon: <IoExitOutline />,
	// },
];
