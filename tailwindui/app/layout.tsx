import './css/style.css';
import React from 'react';
import { getBrand, getOrigin, isChatslide, isLocal } from '@/utils/getHost';
import { TrackingScripts } from './TrackingScripts';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='icon'
					href={isChatslide() ? '/favicon_chatslide.ico' : '/favicon.ico'}
				/>
				{!isLocal() && <TrackingScripts />}
			</head>
			<body
				className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}
			>
				<div className='Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
					{children}
				</div>
			</body>
		</html>
	);
}
