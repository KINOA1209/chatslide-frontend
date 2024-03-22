'use client';

import React, { useEffect, useRef, useState } from 'react';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { toast, ToastContainer } from 'react-toastify';
import VideoService from '@/services/VideoService';
import { useUser } from '@/hooks/use-user';
import { Loading, Blank } from '@/components/ui/Loading';
import { Column } from '@/components/layout/Column';
import { useSlides } from '@/hooks/use-slides';
import SlideContainer from '@/components/slides/SlideContainer';
import { calculateNonPresentScale, uneditableTemplateDispatch } from '@/components/slides/SlidesHTML';
import { Title, Instruction } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { InputBox } from '@/components/ui/InputBox';
import ScriptEditor from '@/components/slides/script/ScriptEditor';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { FiPause, FiPlay } from 'react-icons/fi';
import Slide from '@/models/Slide';
import { useProject } from '@/hooks/use-project';
import { LANGUAGE_OPTIONS, VOICE_OPTIONS } from './voiceOptions';
import { DropDown } from '@/components/button/DrlambdaButton';


const VoiceSelector: React.FC<{
	selectedVoice: string;
	setSelectedVoice: (language: string) => void;
}> = ({
	selectedVoice,
	setSelectedVoice,
}) => {
	const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
	const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
	const genderOptions = ['female', 'male'];
	const [voiceOptions, setVoiceOptions] = useState<string[]>([]);

	// Update voice options based on selected language and gender
	useEffect(() => {
		const voices = VOICE_OPTIONS[selectedLanguage][selectedGender];
		setVoiceOptions(voices);
		setSelectedVoice(voices[0]);
	}, [selectedLanguage, selectedGender]);

	const formatVoiceName = (voiceName: string): string => {
		// Ensure the string is long enough to avoid negative substring indices
		if (voiceName.length > 12) {
			let formattedName = voiceName.substring(6, voiceName.length - 6);
			// Capitalize the first letter and return
			formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
			// replace Multilingual with `-Mulilingual`
			if (formattedName.includes('Multilingual')) {
				return formattedName.replace('Multilingual', '-Multilingual');
			}
			return formattedName;
		}

		// If the name is not in the expected format, return it as is or handle accordingly
		return voiceName;
	};


	return (
		<div className='flex flex-row justify-between'>
			<div>
				<Instruction>Language: </Instruction>
				<DropDown value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
					{LANGUAGE_OPTIONS.map((option) => (
						<option key={option.code} value={option.code}>{option.name}</option>
					))}
				</DropDown>
			</div>

			<div>
				<Instruction>Gender: </Instruction>
				<DropDown value={selectedGender} onChange={(e) => setSelectedGender(e.target.value as 'female' | 'male')}>
					{genderOptions.map((gender) => (
						<option key={gender} value={gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</option>
					))}
				</DropDown>
			</div>

			<div>
				<Instruction>Voice: </Instruction>
				<DropDown value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
					{voiceOptions.map((voice) => (
						<option key={voice} value={voice}>{formatVoiceName(voice)}</option>
					))}
				</DropDown>
			</div>
		</div>
	);
};

const ScriptPage: React.FC<{
	slides: Array<Slide>;
	index: number;
	scale: number;
	voice: string;
	updateSlidePage: (index: number, slide: Slide) => void;
}> = ({
	slides,
	index,
	scale,
	voice,
	updateSlidePage,
}) => {
		const [isPlaying, setIsPlaying] = useState(false);
		// Add a state to store the audio element
		const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
		const { token } = useUser();
		const { project } = useProject();

		const playScript = async () => {
			const script = slides[index].transcript || '';
			console.log('Playing script:', script);
			setIsPlaying(true);

			// Assuming VideoService.playScript returns a Promise that resolves to an audio URL or blob
			try {
				const audio = await VideoService.getTTS(script, voice, project?.foldername as string, token); // Fetch voice from backend
				const audioElement = new Audio(audio); // Create an audio element with the fetched voice
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
			console.log('pausing audio:', audio);
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
				{!isPlaying ?
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
										color: '#2943E9',
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
										color: '#2943E9',
									}}
								/>
							</button>
						}
					/>}
			</div>
		)
	};

export default function WorkflowStep5() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { slides, updateSlidePage } = useSlides();

	const [dimensions, setDimensions] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 960,
		height: typeof window !== 'undefined' ? window.innerHeight : 540,
	});
	const [scale, setScale] = useState(calculateNonPresentScale(dimensions.width, dimensions.height) * 0.5);
	const [voice, setVoice] = useState('en-US-AvaNeural');

	useEffect(() => {
		const handleResize = () => {
			setScale(calculateNonPresentScale(window.innerWidth, window.innerHeight) * 0.5);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className='h-full w-full bg-white flex flex-col'>
			{/* flex col container for steps, title, etc */}

			<WorkflowStepsBanner
				currentIndex={4}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				nextIsPaidFeature={true}
				nextText='Create Video'
			/>

			<ToastContainer enableMultiContainer containerId={'script'} />

			<Column>
				<Card>
					<Title center={false}>Voice</Title>
					<Instruction>
						Select the voice you want to use for your video.
					</Instruction>
					<VoiceSelector selectedVoice={voice} setSelectedVoice={setVoice} />
				</Card>
				<Card>
					<Title center={false}>Scripts</Title>
					<Instruction>
						You can edit your scripts here:
						If you want to edit slides, you can go back to the previous step.
					</Instruction>
					<div className='flex flex-col gap-y-2'>
						{slides.map((_, index) => (
							<ScriptPage
								slides={slides}
								index={index}
								scale={scale}
								voice={voice}
								updateSlidePage={updateSlidePage}
							/>
						))}
					</div>
				</Card>
			</Column>

		</div>
	);
}
