'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import SlideContainer from '@/components/slides/SlideContainer';
import { uneditableTemplateDispatch } from '@/components/slides/templateDispatch';
import ScriptEditor from '@/components/script/ScriptEditor';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { FiPause, FiPlay } from 'react-icons/fi';
import Slide from '@/models/Slide';
import { useProject } from '@/hooks/use-project';
import VideoService from '@/services/VideoService';
import { SpinIcon } from '@/app/(feature)/icons';
import { useSlides } from '@/hooks/use-slides';
import ActionsToolBar from '../ui/ActionsToolBar';
import { Button } from '@mui/material';

const ScriptSection: React.FC<{
	slides: Array<Slide>;
	index: number;
	voice: string;
	voiceStyle: string;
	updateSlidePage: (index: number, slide: Slide) => void;
	locale: string;
}> = ({ slides, index, voice, voiceStyle, updateSlidePage, locale }) => {
	const [scale, setScale] = useState(calculateScale());
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// Add a state to store the audio element
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
	const { token } = useUser();
	const { project } = useProject();

	const { slidesHistory, slidesHistoryIndex, undoChange, redoChange } =
		useSlides();

	const canUndo = useMemo(() => slidesHistoryIndex > 0, [slidesHistoryIndex]);
	const canRedo = useMemo(
		() => slidesHistoryIndex < slidesHistory.length - 1,
		[slidesHistoryIndex, slidesHistory],
	);

	function calculateScale() {
		const width = window.innerWidth;
		if (width > 1024) {
			return ((width - 400) / 1920) * 0.8; // 400 is for chatbot
		} else if (width > 640) {
			return (width - 400) / 1920; // vertical
		} else {
			return (width / 1920) * 0.8; // no chatbot
		}
	}

	// reset scale on resize
	useEffect(() => {
		const handleResize = () => {
			setScale(calculateScale());
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const playScript = async () => {
		const script = slides[index].transcript || '';
		console.log('Playing script:', script);
		setIsLoading(true);

		// Assuming VideoService.playScript returns a Promise that resolves to an audio URL or blob
		try {
			const audio = await VideoService.getTTS(
				script,
				voice,
				voiceStyle,
				project?.foldername as string,
				token,
				locale,
			); // Fetch voice from backend
			const audioElement = new Audio(audio); // Create an audio element with the fetched voice
			setIsLoading(false);
			setIsPlaying(true);
			audioElement.play(); // Play the voice
			setAudio(audioElement); // Store the audio element in state for access by pauseScript
			console.log('playing audio:', audioElement);
			audioElement.onended = () => {
				setIsPlaying(false); // Automatically set to not playing when playback finishes
			};
		} catch (error) {
			console.error('Error playing script audio:', error);
			setIsPlaying(false); // Ensure we reset the state if there's an error
		}
	};

	const pauseScript = () => {
		// console.log('pausing audio:', audio);
		if (audio) {
			audio.pause(); // Pause the currently playing audio
		}
		setIsPlaying(false); // Update the state to reflect that playback has stopped
	};

	const PlayButton = () => {
		return (
			<div>
				{isLoading ? (
					<SpinIcon />
				) : !isPlaying ? (
					<ButtonWithExplanation
						explanation='Play the script'
						button={
							<button
								onClick={playScript}
								disabled={slides[index].transcript === ''}
							>
								<FiPlay
									style={{
										strokeWidth: '2.5',
										flex: '1',
										width: '1.5rem',
										height: '1.5rem',
										fontWeight: 'bold',
										color:
											slides[index].transcript === '' ? '#C6C6C6' : '#344054',
									}}
								/>
							</button>
						}
					/>
				) : (
					<ButtonWithExplanation
						explanation='Pause the script'
						button={
							<button onClick={pauseScript}>
								<FiPause
									style={{
										strokeWidth: '2',
										flex: '1',
										width: '1.5rem',
										height: '1.5rem',
										fontWeight: 'bold',
										color: '#344054',
									}}
								/>
							</button>
						}
					/>
				)}
			</div>
		);
	};

	return (
		<div className='flex flex-col'>
			<SlideContainer
				index={index}
				slide={slides[index]}
				scale={scale}
				isViewing={true}
				templateDispatch={uneditableTemplateDispatch}
			/>
			<ScriptEditor
				slides={slides}
				updateSlidePage={updateSlidePage}
				currentSlideIndex={index}
				scale={scale}
			/>

			<div className='mx-auto'>
				<ActionsToolBar
					undo={undoChange}
					redo={redoChange}
					canUndo={canUndo}
					canRedo={canRedo}
          showVersionHistory={false}
				>
					{/* play and pause the script */}
					<PlayButton />
				</ActionsToolBar>
			</div>
		</div>
	);
};

export default ScriptSection;
