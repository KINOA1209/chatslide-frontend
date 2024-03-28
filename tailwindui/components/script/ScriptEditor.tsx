import Slide from '@/models/Slide';
import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import useHydrated from '@/hooks/use-hydrated';

interface TranscriptEditorProps {
	slides: Slide[];
	updateSlidePage: (index: number, slide: Slide, rerender: boolean, updateSlidePage: boolean) => void;
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

	const maxWidth = 960 * scale + 12;

	const [script, setScript] = useState<string>(slides[currentSlideIndex]?.transcript || '');
	
	const updateTranscriptList = (newValue: string) => {
		const newSlide = { ...slides[currentSlideIndex] };
		newSlide.transcript = newValue;
		updateSlidePage(currentSlideIndex, newSlide, false, false);
	};

	const debouncedUpdateTranscriptList = debounce(updateTranscriptList, 500);

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div
			style={{ maxWidth: `${maxWidth}px` }}
			className={`w-full min-h-[4rem] border border-2 border-gray-200 rounded-lg flex flex-col overflow-y-auto my-1`} // shift left to align with slide
		>
			<textarea
				className={`grow px-4 py-2 w-full h-full border-none text-gray-700 text-xs font-normal focus:ring-0 ${tight && 'leading-tight'}`}
				value={script}
				onChange={(e) =>{
					setScript(e.target.value);
					debouncedUpdateTranscriptList(e.target.value);
				}}
			>
				{script}
			</textarea>
		</div>
	);
};

export default ScriptEditor;
