import './css/style.css';
import React from 'react';
import Script from 'next/script';
import GoogleAnalytics from '@/components/integrations/GoogleAnalytics';
import MixPanel from '@/components/integrations/MixPanel';
import DataDog from '@/components/integrations/DataDog';
import Stey from '@/components/integrations/Stey';

interface MetadataOptions {
	title?: string;
	description?: string;
	keywords?: string;
	name?: string;
}

export const generateMetadata = (options: MetadataOptions = {}): any => {
	const {
		title = 'DrLambda: Create Professional Slides with AI',
		description = 'Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents.',
		keywords = 'DrLambda, AI-powered, documents_to_slides, tool, create, professional, slides, documents, sources, pdf, docx, notion, presentation, knowledge, goole_slides, powerpoint, keynote, canva, figma, design, content, marketing, social_media, twitter, linkedin, facebook, instagram, youtube, tiktok, pinterest, slideshare, medium',
		name = 'DrLambda: AI Slides',
	} = options;

	return {
		title,
		description,
		keywords,
		name,
		metadataBase: {
			title,
			description,
			keywords,
			name,
		},
		openGraph: {
			title,
			description,
			url: 'https://drlambda.ai',
			type: 'website',
			images: [
				{
					url: 'https://drlambda.ai/new_landing/imgs/ogimage.png',
					width: 800,
					height: 440,
					alt: 'DrLambda',
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
			image: 'https://drlambda.ai/new_landing/imgs/ogimage.png',
		},
	};
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/favicon.ico' />

				<MixPanel />
				<DataDog />
				<Stey />


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
