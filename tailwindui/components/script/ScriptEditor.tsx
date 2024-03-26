import Slide from '@/models/Slide';
import React, { useState } from 'react';
import SaveScriptsButton from './SaveScriptsButton';
import { Explanation, Instruction } from '@/components/ui/Text';
import useHydrated from '@/hooks/use-hydrated';

interface TranscriptEditorProps {
	slides: Slide[];
	updateSlidePage: (index: number, slide: Slide, rerender: boolean) => void;
	currentSlideIndex: number;
	scale: number;
	tight?: boolean;
}

const ScriptEditor: React.FC<TranscriptEditorProps> = ({
	slides,
	updateSlidePage,
	currentSlideIndex,
	scale,
	tight=false
}) => {

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	const maxWidth = 960 * scale + 12;
	
	const updateTranscriptList = (newValue: string) => {
		const newSlide = { ...slides[currentSlideIndex] };
		newSlide.transcript = newValue;
		updateSlidePage(currentSlideIndex, newSlide, false);
	};

	return (
		<div
			style={{ maxWidth: `${maxWidth}px` }}
			className={`w-full min-h-[4rem] border border-2 border-gray-200 rounded-lg flex flex-col overflow-y-auto my-1`} // shift left to align with slide
		>
			<textarea
				className={`grow px-4 py-2 w-full h-full border-none text-gray-700 text-xs font-normal focus:ring-0 ${tight && 'leading-tight'}`}
				value={slides[currentSlideIndex].transcript}
				onChange={(e) => updateTranscriptList(e.target.value)}
			>
				{slides[currentSlideIndex].transcript}
			</textarea>
		</div>
	);
};

export default ScriptEditor;
