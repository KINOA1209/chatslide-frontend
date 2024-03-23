'use client';


import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import SlideContainer from '@/components/slides/SlideContainer';
import { uneditableTemplateDispatch } from '@/components/slides/templateDispatch';
import ScriptEditor from '@/components/script/ScriptEditor';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { FiPause, FiPlay } from 'react-icons/fi';
import Slide from '@/models/Slide';
import { useProject } from '@/hooks/use-project';
import VideoService from '@/services/VideoService';
import { Loading } from '../ui/Loading';
import { SpinIcon } from '@/app/(feature)/icons';
import { calculateNonPresentScale } from '../slides/SlidesHTML';


const ScriptSection: React.FC<{
	slides: Array<Slide>;
	index: number;
	voice: string;
	updateSlidePage: (index: number, slide: Slide) => void;
}> = ({
	slides,
	index,
	voice,
	updateSlidePage,
}) => {
		const [scale, setScale] = useState(calculateNonPresentScale(window.innerWidth, window.innerHeight) * 0.5);
		const [isPlaying, setIsPlaying] = useState(false);
		const [isLoading, setIsLoading] = useState(false);
		// Add a state to store the audio element
		const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
		const { token } = useUser();
		const { project } = useProject();

		useEffect(() => {
			const handleResize = () => {
				setScale(calculateNonPresentScale(window.innerWidth, window.innerHeight) * 0.5);
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
				const audio = await VideoService.getTTS(script, voice, project?.foldername as string, token); // Fetch voice from backend
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
				console.error("Error playing script audio:", error);
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

		return (
			<div key={index} className='flex flex-row justify-between gap-x-2'>

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
				{/* play and pause the script */}

				<div className='mt-4'>
					{isLoading ?
						<SpinIcon /> :
						!isPlaying ?
							<ButtonWithExplanation
								explanation='Play the script'
								button={
									<button onClick={playScript}>
										<FiPlay
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
							/> :
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
							/>}
				</div>
			</div>
		)
	};

export default ScriptSection;