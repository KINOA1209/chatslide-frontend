import Slide from '@/models/Slide';
import React, { useState } from 'react';
import SaveScriptsButton from './saveTranscripts';

interface TranscriptEditorProps {
	slides: Slide[];
  updateSlidePage: (index: number, slide: Slide) => void;
	currentSlideIndex: number;
}

const ScriptEditor: React.FC<TranscriptEditorProps> = ({
  slides,
  updateSlidePage,
	currentSlideIndex,
}) => {
	const updateTranscriptList = (newValue: string) => {
    const newSlide = slides[currentSlideIndex];
    newSlide.transcript = newValue;
    updateSlidePage(currentSlideIndex, newSlide);
	};

	return (
		<div
			className={`w-[960px] max-w-[90vw] h-[200px] bg-zinc-100 rounded shadow flex flex-col overflow-y-auto ml-5`} // shift left to align with slide
			style={{
				boxSizing: 'border-box',
				border: 'none',
				boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
				borderRadius: '5px',
			}}
		>
			<div className='px-4 py-2 h-12 bg-zinc-100 flex flex-row justify-between items-center sticky top-0 border-b-2 border-gray-300'>
				<div className='text-neutral-900 text-s font-creato-medium'>Script</div>
				<SaveScriptsButton slides={slides}/>
			</div>
			<textarea
				className='grow px-4 py-2 w-full h-full border-none text-gray-700 bg-zinc-100 text-xs font-normal font-creato-medium leading-[1.125rem] tracking-[0.015rem]'
				value={slides[currentSlideIndex].transcript}
				onChange={(e) =>
					updateTranscriptList(e.target.value)
				}
			>
				{slides[currentSlideIndex].transcript}
			</textarea>
		</div>
	);
};

export default ScriptEditor;
