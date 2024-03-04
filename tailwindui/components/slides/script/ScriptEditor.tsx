import Slide from '@/models/Slide';
import React, { useState } from 'react';
import SaveScriptsButton from './SaveScriptsButton';
import { Explanation, Instruction } from '@/components/ui/Text';

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
		const newSlide = { ...slides[currentSlideIndex] };
		newSlide.transcript = newValue;
		updateSlidePage(currentSlideIndex, newSlide);
	};

	return (
		<div
			className={`w-[960px] max-w-[90vw] h-[200px] border border-2 border-gray-200 rounded shadow flex flex-col overflow-y-auto`} // shift left to align with slide
		>
			<textarea
				className='grow px-4 py-2 w-full h-full border-none text-gray-700 text-xs font-normal focus:ring-0'
				value={slides[currentSlideIndex].transcript}
				onChange={(e) => updateTranscriptList(e.target.value)}
			>
				{slides[currentSlideIndex].transcript}
			</textarea>
		</div>
	);
};

export default ScriptEditor;
