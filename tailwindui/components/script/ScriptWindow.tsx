import Slide from '@/models/Slide';
import React, { useEffect, useState } from 'react';
import SlideContainer from '../slides/SlideContainer';
import { ToolBar } from '@/components/ui/ToolBar';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useSlides } from '@/hooks/use-slides';

interface TranscriptEditorProps {
}

const ScriptWindow: React.FC<TranscriptEditorProps> = ({
}) => {
	const { slides, slideIndex, gotoPage, isPresenting, setIsPresenting } = useSlides();

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	// not working yet
	function handleKeyDown(event: KeyboardEvent) {
		console.log('key pressed', event.key);
		// todo: update iseditmode
		if (event.key === 'ArrowRight' && slideIndex < slides.length - 1) {
			gotoPage(slideIndex + 1);
		} else if (event.key === 'ArrowLeft' && slideIndex > 0) {
			gotoPage(slideIndex - 1);
		} else if (event.key === 'Escape') {
			setIsPresenting(false); // Exit presentation mode
		}
	}

	// useEffect(() => {
	// 	if (!isPresenting) {
	// 		window.close();
	// 	}
	// }, [isPresenting]);


	return (
		<div className='flex flex-col'>
			{/* <SlideContainer slide={slides[currentSlideIndex]} index={currentSlideIndex} isViewing={true}/> */}
			<ToolBar>
				<button
					onClick={() => gotoPage(slideIndex - 1)}
				>
					<FaChevronLeft
						style={{
							strokeWidth: '1',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#2943E9',
						}}
					/>
				</button>
				<button
					onClick={() => gotoPage(slideIndex + 1)}
				>
					<FaChevronRight
						style={{
							strokeWidth: '1',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#2943E9',
						}}
					/>
				</button>
				<button
					onClick={() => setIsPresenting(false)}
				>
					<FaTimes
						style={{
							strokeWidth: '1',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#000000',
						}}
					/>
				</button>
			</ToolBar>
			<div
				className={`w-[960px] max-w-[90vw] h-[200px] border border-2 border-gray-200 rounded shadow flex flex-col overflow-y-auto`} // shift left to align with slide
			>
				<div
					className='grow px-4 py-2 w-full h-full border-none text-gray-700 text-xs font-normal focus:ring-0'
				>
					{slides[slideIndex].transcript}
				</div>
			</div>
		</div>
	);
};

export default ScriptWindow;
