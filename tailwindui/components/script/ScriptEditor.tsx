import Slide from '@/models/Slide';
import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import useHydrated from '@/hooks/use-hydrated';
import { stopArrowKeyPropagation } from '@/utils/editing';
import { useUser } from '@/hooks/use-user';
import { BigBlueButton } from '../button/DrlambdaButton';
import TextareaAutosize from 'react-textarea-autosize';
import { useSlides } from '@/hooks/use-slides';
import { ErrorMessage } from '../ui/Text';
import ActionsToolBar from '../ui/ActionsToolBar';

interface TranscriptEditorProps {
	slides: Slide[];
	updateSlidePage: (
		index: number,
		slide: Slide,
		rerender: boolean,
		updateSlidePage: boolean,
	) => void;
	currentSlideIndex: number;
	scale: number;
	tight?: boolean;
}

const ScriptEditor: React.FC<TranscriptEditorProps> = ({
	slides,
	updateSlidePage,
	currentSlideIndex,
	scale,
	tight = false,
}) => {
	const maxWidth = 960 * scale + 12;

	const [script, setScript] = useState<string>(
		slides[currentSlideIndex]?.transcript || '',
	);
	const { isPaidUser } = useUser();
	const editorRef = React.useRef<HTMLDivElement>(null);
	const { version } = useSlides();

	const updateTranscriptList = (newValue: string) => {
		const newSlide = { ...slides[currentSlideIndex] };
		newSlide.transcript = newValue;
		updateSlidePage(currentSlideIndex, newSlide, false, false);
	};

	const debouncedUpdateTranscriptList = debounce(updateTranscriptList, 500);

	useEffect(() => {
		// console.log('updating script at index', currentSlideIndex, 'version', version)
		setScript(slides[currentSlideIndex]?.transcript || '');
	}, [currentSlideIndex, version]);

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current?.addEventListener('keydown', stopArrowKeyPropagation); // TODO: seems not working
		}
		return () => {
			editorRef.current?.removeEventListener(
				'keydown',
				stopArrowKeyPropagation,
			);
		};
	}, []);

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-col'>
			{script?.length >= 4096 && (
				<ErrorMessage>
					Script length is {script?.length}, which exceeds 4096 characters.
					Please remove some characters.
				</ErrorMessage>
			)}
			{script?.length === 0 && (
				<ErrorMessage>Script length is 0. Please add some text.</ErrorMessage>
			)}
			<div
				ref={editorRef}
				style={{ width: `${maxWidth}px` }}
				className={`w-full min-h-[4rem] border border-2 border-gray-200 rounded-lg flex flex-col overflow-y-auto my-1`} // shift left to align with slide
			>
				{isPaidUser || currentSlideIndex < 5 ? (
					<div className='relative'>
						<TextareaAutosize
							className={`grow px-4 py-2 w-full h-full border-none text-gray-700 text-xs lg:text-sm 2xl:text-base font-normal focus:ring-0 ${tight && 'leading-tight'}`}
							value={script}
							onChange={(e: any) => {
								setScript(e.target.value);
								debouncedUpdateTranscriptList(e.target.value);
							}}
							maxLength={4096}
						>
							{script}
						</TextareaAutosize>
					</div>
				) : (
					<div className='flex flex-col items-center justify-center h-full text-gray-500 text-sm'>
						<BigBlueButton
							onClick={() => {
								window.location.href = '/pricing';
							}}
						>
							Upgrade to edit script
						</BigBlueButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default ScriptEditor;
