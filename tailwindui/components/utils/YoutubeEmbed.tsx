import React from 'react';
import { toast } from 'react-toastify';
import { LayoutKeys } from '../slides/slideLayout';

interface YoutubeEmbedProps {
	link: string;
	// width: string;
	// height: string;
	layout: LayoutKeys;
	canEdit: boolean; // New prop indicating if editing is allowed
}

interface IFrameDimensions {
	width: string;
	height: string;
}

const iFrameDimension = (layout: LayoutKeys): IFrameDimensions => {
	let width = '';
	let height = '';

	if (layout === 'Cover_img_1_layout' || layout === 'Col_2_img_1_layout') {
		width = '450px';
		height = '500px';
	} else if (layout === 'Full_img_only_layout') {
		width = '940px';
		height = '520px';
	} else if (layout === 'Col_2_img_2_layout') {
		width = '400px';
		height = '150px';
	} else if (layout === 'Col_1_img_1_layout') {
		width = '940px';
		height = '150px';
	} else {
		width = '300px';
		height = '100px';
	}

	return { width, height };
};

const getYoutubeEmbedId = (link: string): string | null => {
	// Regular expression to extract video ID from YouTube link
	const youtubeRegex =
		/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	const match = link.match(youtubeRegex);
	// console.log('youtube id match:', match ? match[1] : 'no match');
	return match ? match[1] : null;
};

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({
	link,
	layout,
	canEdit,
}) => {
	const embedId = getYoutubeEmbedId(link);

	if (!embedId) {
		// toast.error('Invalid YouTube link', {
		// 	position: 'top-center',
		// 	autoClose: 5000,
		// 	hideProgressBar: false,
		// 	closeOnClick: true,
		// 	pauseOnHover: true,
		// 	draggable: true,
		// 	progress: undefined,
		// 	theme: 'light',
		// 	containerId: 'slides',
		// });
		return <div>Invalid YouTube link</div>;
	}

	const iframeStyle: React.CSSProperties = {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	};

	// Conditionally apply pointer-events based on the value of canEdit
	const iframePointerEvents = canEdit ? 'auto' : 'none';

	return (
		<div
			className='video-responsive'
			style={{
				width: iFrameDimension(layout).width, // Set the width based on the prop
				height: iFrameDimension(layout).height, // Set the height based on the prop
				overflow: 'hidden',
				paddingTop: '0%' /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */,
				position: 'relative',
			}}
		>
			{/* Conditionally render iframe based on canEdit */}
			{
				<iframe
					width='100%'
					height='100%'
					src={`https://www.youtube.com/embed/${embedId}`}
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					title='Embedded youtube'
					style={{ ...iframeStyle, pointerEvents: iframePointerEvents }}
				/>
			}
		</div>
	);
};

export default YoutubeEmbed;
