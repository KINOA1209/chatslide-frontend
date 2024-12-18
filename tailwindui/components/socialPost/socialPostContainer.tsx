import React, { useEffect, useRef } from 'react';
import { SocialPostSlide } from '@/models/SocialPost';
import { templateDispatch as defaultTemplateDispatch } from '@/components/socialPost/socialPostTemplateDispatch';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';

type SlideContainerProps = {
	slide: SocialPostSlide; // You can replace 'any' with the actual type of the slides if known
	currentSlideIndex: number;
	isViewing?: boolean;
	isSnippet?: boolean;
	isPresenting?: boolean;
	scale?: number;
	templateDispatch?: (
		slide: SocialPostSlide,
		index: number,
		canEidt: boolean,
		exportToPdfMode: boolean,
	) => JSX.Element; // Adjust the types accordingly
	containerRef?: React.RefObject<HTMLDivElement>;
	slideRef?: React.RefObject<HTMLDivElement>;
	exportToPdfMode?: boolean;
	onSlideRefUpdate?: (ref: React.RefObject<HTMLDivElement>) => void;
	finalTheme?: ThemeObject;
	length?: number;
	version?: number;
};

const SocialPostContainer: React.FC<SlideContainerProps> = ({
	slide,
	currentSlideIndex,
	isViewing = false,
	isPresenting = false,
	scale = 1,
	templateDispatch = defaultTemplateDispatch,
	containerRef = useRef(null),
	slideRef = useRef(null),
	exportToPdfMode = false,
	onSlideRefUpdate,
	finalTheme,
	length,
	version,
}) => {
	useEffect(() => {
		if (length)
			console.log(
				'rerender in SocialPostContainer',
				currentSlideIndex,
				length,
				version,
			);
	}, [currentSlideIndex, length, version]);

	return (
		<div
			id='socialPostContainer'
			className={`${
				isPresenting
					? 'fixed top-0 left-0 w-full h-full z-50 flex justify-center'
					: ''
			}`}
			ref={containerRef}
			style={{
				boxShadow: isPresenting ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.5)',
				width: isPresenting ? '80vw' : `${480 * scale}px`,
				height: isPresenting ? '100vh' : `${600 * scale}px`,
				// zIndex: !isViewing && !isPresenting ? 10 : 50,
			}}
		>
			{/* 0.75 width = 1 height */}
			<div
				className='h-full w-full'
				ref={slideRef}
				style={{
					width: '480px',
					height: '600px',
					transformOrigin: 'top left',
					transform: `scale(${scale})`,
					backgroundSize: 'cover',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: isPresenting ? 'center' : 'flex-start',
					alignItems: 'flex-start',
					position: 'relative',
				}}
			>
				{slide &&
					templateDispatch(
						slide,
						currentSlideIndex,
						!isViewing && !isPresenting,
						exportToPdfMode,
					)}
			</div>
		</div>
	);
};

export default SocialPostContainer;
