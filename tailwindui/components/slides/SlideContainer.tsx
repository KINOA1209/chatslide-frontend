import React, { useRef } from 'react';
import Slide from '@/models/Slide';
import { templateDispatch as defaultTemplateDispatch } from './templateDispatch';
import { useSlides } from '@/hooks/use-slides';

type SlideContainerProps = {
  index: number;
	isViewing?: boolean;
	isSnippet?: boolean;
	isPresenting?: boolean;
	scale?: number;
	templateDispatch?: (
		slide: Slide,
		index: number,
		canEdit: boolean,
		exportToPdfMode: boolean,
	) => JSX.Element; // Adjust the types accordingly
	containerRef?: React.RefObject<HTMLDivElement>;
	slideRef?: React.RefObject<HTMLDivElement>;
	exportToPdfMode?: boolean;
	highlightBorder?: boolean;
	setIsPresenting?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SlideContainer: React.FC<SlideContainerProps> = ({
  index,
	isViewing = false,
	isPresenting = false,
	scale = 1,
	templateDispatch = defaultTemplateDispatch,
	containerRef = useRef(null),
	slideRef = useRef(null),
	exportToPdfMode = false,
	highlightBorder = false,
	setIsPresenting,
}) => {
  const { slides } = useSlides();

	return (
		<div
			id='slideContainer'
			className={`${
				isPresenting ? 'fixed top-0 left-0 w-full h-full z-50' : ''
			}`}
			ref={containerRef}
			style={{
				boxSizing: 'border-box',
				border: 'none',
				boxShadow: isPresenting
					? 'none'
					: !highlightBorder
					? '0 0 10px rgba(0, 0, 0, 0.5)'
					: '0 0 10px rgba(255, 255, 0, 1)',
				borderRadius: isPresenting ? '0' : '5px',
				width: isPresenting ? '100vw' : `${960 * scale}px`,
				height: isPresenting ? '100vh' : `${540 * scale}px`,
			}}
		>
			{isPresenting && setIsPresenting && (
				<button
					className='fixed top-10 right-10 p-2 w-10 h-10 bg-gray-400 text-white rounded-full cursor-pointer hover:bg-gray-600'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						console.log('close present');
						setIsPresenting(false);
					}}
				>
					❌
				</button>
			)}
			{slides.length > 0 && (
				<div
					className='slide h-full w-full'
					ref={slideRef}
					style={{
						width: '960px',
						height: '540px',
						transformOrigin: 'top left',
						transform: `scale(${scale})`,
						backgroundSize: 'cover',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
						position: 'relative',
					}}
				>
					{slides[index] &&
						templateDispatch(
							slides[index],
							index,
							!isViewing && !isPresenting,
							exportToPdfMode,
						)}
				</div>
			)}
		</div>
	);
};

export default SlideContainer;
