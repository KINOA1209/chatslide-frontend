import { getBrand, getOrigin } from "@/utils/getHost";

interface MetadataOptions {
	title?: string;
	description?: string;
	keywords?: string;
	name?: string;
}

export const generateMetadata = (
	options: MetadataOptions = {},
): Record<string, any> => {
	const {
		title = `${getBrand()}: Create Professional Slides with AI`,
		description = 'Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents.',
		keywords = `${getBrand()}, AI-powered, documents_to_slides, tool, create, professional, slides, documents, sources, pdf, docx, notion, presentation, knowledge, google_slides, powerpoint, keynote, canva, figma, design, content, marketing, social_media, twitter, linkedin, facebook, instagram, youtube, tiktok, pinterest, slideshare, medium`,
		name = `${getBrand()}: AI Slides`,
	} = options || {}; // Ensure options is an object

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