// sidebarData.tsx
import React from 'react';
import { BsFiles } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { GoHome, GoFile, GoDiscussionOutdated, GoGear } from 'react-icons/go';
import { IoExitOutline, IoMicOutline, IoPeople, IoPeopleOutline } from 'react-icons/io5';
import { LuCompass, LuFiles, LuNewspaper, LuPersonStanding } from 'react-icons/lu';
import { PiShield } from 'react-icons/pi';
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
  drlambdaOnly?: boolean; // Only show this item for Dr. Lambda users
  chatslideOnly?: boolean; // Only show this item for Chatslide users
}

export const SideBarData: SideBarItem[] = [
	{
		title: 'Dashboard',
		icon: <GoHome />,
		path: '/dashboard',
	},
	{
		title: 'Uploads',
		icon: <GoFile />,
		path: '/uploads',
		drlambdaOnly: true,
	},
	{
		title: 'Resources',
		icon: <BsFiles />,
		path: '/uploads',
		chatslideOnly: true,
	},
	{
		title: 'Studio',
		icon: <IoMicOutline />,
		path: '/studio',
	},
	{
		title: 'Team',
		icon: <IoPeopleOutline />,
		path: '/dashboard?mode=team',
	},
	{
		title: 'Discover',
		icon: <GoDiscussionOutdated />,
		path: '/discover',
		drlambdaOnly: true,
	},
	{
		title: 'Discover',
		icon: <LuCompass />,
		path: '/discover',
		chatslideOnly: true,
	},
	{
		title: 'Updates 7.19',
		icon: <LuNewspaper />,
		path: '/whatsnew',
		drlambdaOnly: true,
	},
	{
		title: `What's New`,
		icon: <LuNewspaper />,
		path: '/whatsnew',
		chatslideOnly: true,
	},
	{
		title: 'Join Discord',
		icon: <RiDiscordLine />,
		path: 'https://drlambda.ai/discord',
		target: '_blank',
		drlambdaOnly: true,
	},
	{
		title: 'Onboarding',
		icon: <PiShield />,
		path: '/onboarding',
		chatslideOnly: true,
	},
	{
		title: 'Settings',
		icon: <GoGear />,
		subMenus: [
			{
				title: 'Account',
				path: '/account',
			},
			{
				title: 'Subscription',
				path: '/pricing',
			},
			{
				title: 'Sign Out',
				path: '',
			},
		],
		chatslideOnly: true,
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
				title: 'Pricing',
				path: '/pricing',
			},
			{
				title: 'Sign Out',
				path: '',
			},
		],
		drlambdaOnly: true,
	},
	// {
	// 	title: 'Sign Out',
	// 	icon: <IoExitOutline />,
	// },
];
