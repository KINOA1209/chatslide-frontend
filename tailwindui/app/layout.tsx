import './css/style.css';
import React from 'react';
import Script from 'next/script';
import { getBrand, getOrigin, isChatslide, isLocal } from '@/utils/getHost';
import { TrackingScripts } from './TrackingScripts';

interface LayoutProps {
	title: string;
	description: string;
	keywords: string;
	name: string;
	openGraph?: Record<string, any>;
	twitter?: Record<string, any>;
}

interface MetadataOptions {
	title?: string;
	description?: string;
	keywords?: string;
	name?: string;
}

export const generateMetadata = (
	options: MetadataOptions = {},
): LayoutProps => {
	const {
		title = `${getBrand()}: Create Professional Slides with AI`,
		description = 'Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents.',
		keywords = `${getBrand()}, AI-powered, documents_to_slides, tool, create, professional, slides, documents, sources, pdf, docx, notion, presentation, knowledge, google_slides, powerpoint, keynote, canva, figma, design, content, marketing, social_media, twitter, linkedin, facebook, instagram, youtube, tiktok, pinterest, slideshare, medium`,
		name = `${getBrand()}: AI Slides`,
	} = options;

	return {
		title,
		description,
		keywords,
		name,
		openGraph: {
			title,
			description,
			url: getOrigin(),
			type: 'website',
			images: [
				{
					url: `${getOrigin()}/images/ogimage_${getBrand(true)}.png`,
					width: 800,
					height: 440,
					alt: getBrand(),
				},
			],
		},
		twitter: {
			handle: '@drlambda_ai',
			site: '@drlambda_ai',
			card: 'summary_large_image',
			creator: '@drlambda_ai',
			title,
			description,
			image: `${getOrigin()}/images/ogimage_${getBrand(true)}.png`,
		},
	};
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
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
		</>
	);
}
