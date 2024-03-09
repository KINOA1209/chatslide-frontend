import React, { useEffect, useRef } from 'react';
import Slide from '@/models/Slide';
import { templateDispatch as defaultTemplateDispatch } from './templateDispatch';
import { useSlides } from '@/hooks/use-slides';

type SlideContainerProps = {
	slide: Slide;
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
	length?: number; // force rerender when length changes and index does not change
	version?: number; // force rerender when version changes
	pageNumber?: number;
};

const SlideContainer: React.FC<SlideContainerProps> = ({
	slide,
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
	length,
	version,
	pageNumber,
}) => {

	useEffect(() => {
		if (length)
			console.log('rerender in SlideContainer', index, length, version);
	}, [index, length, version]);

	return (
		<div
			id='slideContainer'
			className={`${isPresenting ? 'fixed top-0 left-0 w-full h-full z-50' : 'relative rounded border-2 p-1' + (highlightBorder ? ' border-Blue' : ' border-gray-200')}`}
			ref={containerRef}
			style={{
				boxSizing: 'border-box',
				boxShadow: 'none',
				borderRadius: isPresenting ? '0' : '5px',
				margin: isPresenting ? '0' : '5px',
				width: isPresenting ? '100vw' : `${960 * scale + 12}px`,
				height: isPresenting ? '100vh' : `${540 * scale + 12}px`,
			}}
		>
			{pageNumber &&
				<div className={`absolute bottom-1 left-1 border rounded-xs border-1 ${highlightBorder ? 'bg-Blue text-white border-Blue' : 'bg-white text-black border-gray-400'} px-1  text-sm rounded-sm z-10`}>
					{pageNumber}
				</div>
			}
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
				{slide &&
					templateDispatch(
						slide,
						index,
						!isViewing && !isPresenting,
						exportToPdfMode,
					)}
			</div>
		</div>
	);
};

export default SlideContainer;
