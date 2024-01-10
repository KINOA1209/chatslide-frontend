// sidebarData.tsx
import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { GoHome, GoFile, GoDiscussionOutdated, GoGear } from 'react-icons/go';
import { IoExitOutline } from 'react-icons/io5';
import { RiDiscordLine } from 'react-icons/ri';

export const SideBarData = [
	// {
	// 	title: 'DrLambda',
	// 	icon: (
	// 		<img
	// 			src='/new_landing/svgs/drlambda-logo.svg'
	// 			alt='DrLambda'
	// 			className='w-[16px] h-[16px]'
	// 		/>
	// 	),
	// 	path: '/',
	// },
	{
		title: 'Dashboard',
		icon: <GoHome />,
		path: '/dashboard',
	},
	{
		title: 'My Resources',
		icon: <GoFile />,
		path: '/my-resources',
	},
	{
		title: 'Join Discord',
		icon: <RiDiscordLine />,
		path: 'https://discord.gg/mJeAqMdb2m',
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
		],
	},
	// {
	// 	title: 'Sign Out',
	// 	icon: <IoExitOutline />,
	// },
];