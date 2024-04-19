import React, { use, useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import SlideContainer from './SlideContainer';
import {
	uneditableTemplateDispatch,
} from './templateDispatch';
import Slide, { SlideKeys } from '@/models/Slide';
import { SlidesStatus, useSlides } from '@/hooks/use-slides';
import { ScrollBar } from '../ui/ScrollBar';


export const DraggableSlidesPreview: React.FC<{
	ref : React.RefObject<HTMLDivElement>
	slideIndex: number;
	slides: Slide[];
	gotoPage: (index: number) => void;
	nonPresentScale: number;
}> = ({
	ref,
	slideIndex,
	gotoPage,
	nonPresentScale,
}) => {
	const [draggedSlideIndex, setDraggedSlideIndex] = useState(-1);
	const [draggedOverSlideIndex, setDraggedOverSlideIndex] = useState(-1);
	const { slides, setSlides, setSlideIndex, debouncedSyncSlides } = useSlides();

	return (
		<ScrollBar
			currentElementRef={ref}
			index={slideIndex}
			axial='y'
		>
			{
				slides.map((slide, index) => (
					<div
						key={
							`previewContainer` +
							index.toString() +
							slides.length.toString()
						} // force update when slide length changes
						className={`w-[6rem] h-[4.5rem] lg:w-[8rem] lg:h-[6rem] rounded-md flex-shrink-0 cursor-move px-2 ` + (index===draggedOverSlideIndex ? 'mt-[2rem]' : '')}
						onClick={() => gotoPage(index)}
						ref={index === slideIndex ? ref : null}
						draggable={index !== 0}
						onDragStart={() => {
							setDraggedSlideIndex(index);
						}}
						onDragOver={(e) => {
							setDraggedOverSlideIndex(index)
							e.preventDefault();
						}}
						onDrop={() => {
							setDraggedOverSlideIndex(-1);
							if (draggedSlideIndex !== -1 && index != 0) {
								const newSlides = [...slides];
								const draggedSlide = newSlides[draggedSlideIndex];
								newSlides.splice(draggedSlideIndex, 1);
								newSlides.splice(index, 0, draggedSlide);
								setSlides(newSlides);
								setSlideIndex(index);
								debouncedSyncSlides(newSlides);
							}
						}}
					>
						{/* {index + 1} */}
						<SlideContainer
							slide={slide}
							index={index}
							scale={0.12 * nonPresentScale}
							isViewing={true}
							templateDispatch={uneditableTemplateDispatch}
							highlightBorder={slideIndex === index}
							pageNumber={index + 1}
						/>
					</div>
				))
			}
		</ScrollBar >
	)
}