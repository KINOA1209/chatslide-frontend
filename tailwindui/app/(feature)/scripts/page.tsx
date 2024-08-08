'use client';

import React, { useEffect, useRef, useState } from 'react';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { toast, ToastContainer } from 'react-toastify';
import VideoService from '@/services/VideoService';
import { useUser } from '@/hooks/use-user';
import { Column } from '@/components/layout/Column';
import { useSlides } from '@/hooks/use-slides';
import {
	Instruction,
	BigTitle,
	Explanation,
	WarningMessage,
} from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { useProject } from '@/hooks/use-project';
import VoiceSelector, {
	previewVoice,
} from '@/components/language/VoiceSelector';
import { useRouter, useSearchParams } from 'next/navigation';
import { addIdToRedir } from '@/utils/redirWithId';
import dynamic from 'next/dynamic';
import useHydrated from '@/hooks/use-hydrated';
import {
	BigBlueButton,
	DropDown,
	InversedBigBlueButton,
} from '@/components/button/DrlambdaButton';
import UserService from '@/services/UserService';
import AvatarSelector from '@/components/language/AvatarSelector';
import { GrayLabel } from '@/components/ui/GrayLabel';
import { Blank } from '@/components/ui/Loading';
import { bgmDisplayNames } from '@/components/language/bgmData';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { FiPlay } from 'react-icons/fi';
import Modal from '@/components/ui/Modal';
import RangeSlider from '@/components/ui/RangeSlider';
import { WrappableRow } from '@/components/layout/WrappableRow';
import { isClonedVoice, isOpenaiVoice } from '@/components/language/voiceData';
import Toggle from '@/components/button/Toggle';
import { AIAssistantChatWindow } from '@/components/chatbot/AIAssistant';
import {
	SlideRightNavigator,
	SlideLeftNavigator,
	SlidePagesIndicator,
} from '@/components/slides/SlidePageIndicator';
import {
	ClonedVoicesProvider,
	useClonedVoices,
} from '@/components/language/ClonedVoicesContext';
import 'react-toastify/dist/ReactToastify.css';
import LANGUAGES from '@/components/language/languageData';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import AudioVideoDetailSettingsSection from '@/app/(feature)/scripts/AudioVideoDetailSettingsSection';
import { FaMicrophone } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import CloneYourVoiceTutorial from './CloneYourVoiceTutorialDialog';
const ScriptSection = dynamic(
	() => import('@/components/script/ScriptSection'),
	{ ssr: false },
);

export default function WorkflowStep5() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { slides, updateSlidePage, slideIndex, gotoPage } = useSlides();
	const { project, updateProject } = useProject();
	const { username, token, updateCreditsFE, isPaidUser } = useUser();
	const router = useRouter();
	const [voice, setVoice] = useState('en-US-AvaNeural');

	const [style, setStyle] = useState('');
	const [avatar, setAvatar] = useState('');
	const [posture, setPosture] = useState('casual-sitting');
	const [size, setSize] = useState('medium');
	const [position, setPosition] = useState('bottom-right');
	const [bgm, setBgm] = useState('');
	const [bgmVolume, setBgmVolume] = useState(0.2);
	const [showConfirmRegenModal, setShowConfirmRegenModal] = useState(false);
	const [voiceIsHD, setVoiceIsHD] = useState(false);
	const [creditCost, setCreditCost] = useState(20);
	const [transitionType, setTransitionType] = useState('');
	const [withSubtitle, setWithSubtitle] = useState(false);

	const params = useSearchParams();

	const [selectedLanguage, setSelectedLanguage] = useState('en-US');

	// to show audio video detail setting or not for responsive design
	const [
		showAudioVideoDetailSettingSection,
		setShowAudioVideoDetailSettingSection,
	] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1024) {
				setShowAudioVideoDetailSettingSection(false);
			} else {
				setShowAudioVideoDetailSettingSection(true);
			}
		};

		// Set initial state
		handleResize();

		// Add event listener for resize
		window.addEventListener('resize', handleResize);

		// Clean up event listener on component unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (avatar) setCreditCost(400);
		else if (isClonedVoice(voice)) setCreditCost(300);
		else if (voiceIsHD || isOpenaiVoice(voice)) {
			setCreditCost(100);
		} else setCreditCost(20);
	}, [avatar, voiceIsHD, voice]);

	// unused
	const CreditCost = () => {
		function getCreditCostPerPageAndReason() {
			if (avatar) return { cost: 30, reason: '🦹‍♂️ You are using an avatar' };
			if (voiceIsHD || isOpenaiVoice(voice))
				return { cost: 5, reason: '🎧 You are using a Hi-Fi voice' };
			return { cost: 1, reason: 'You are using a standard voice' };
		}

		const { cost: pageCost, reason } = getCreditCostPerPageAndReason();
		const totalCost = Math.max(slides.length * pageCost, 20);
		setCreditCost(totalCost);
		const waitMinPerSlide = avatar ? 1 : 0.3;

		return (
			<Card>
				<BigTitle>⭐️ Cost</BigTitle>
				<Instruction>Number of pages: {slides.length} </Instruction>
				<Instruction>
					Estimated wait time: {Math.round(slides.length * waitMinPerSlide)}{' '}
					minutes
				</Instruction>

				<div>
					<Instruction>Total Credit Cost: {totalCost} ⭐️</Instruction>
					{slides.length * pageCost < 20 ? (
						<Explanation>The minimum deck cost is 20 ⭐️.</Explanation>
					) : (
						<>
							<Instruction>Credit cost per page: {pageCost} ⭐️</Instruction>
							<Explanation>{reason}</Explanation>
						</>
					)}
				</div>
			</Card>
		);
	};

	if (!project) {
		if (params.get('id')) {
			router.push(`/project/${params.get('id')}`);
		}
		return <Blank>Project not found</Blank>;
	}

	const ConfirmVideoRegenModal: React.FC<{}> = () => {
		return (
			<Modal
				showModal={showConfirmRegenModal}
				setShowModal={setShowConfirmRegenModal}
				title='Confirm Video Regeneration'
			>
				<Instruction>
					You have a video generation job running. Do you want to regenerate the
					video? <br />
					This will cancel the current job and start a new one.
				</Instruction>
				<WrappableRow type='flex' justify='between'>
					<InversedBigBlueButton
						onClick={() => {
							router.push(addIdToRedir('/video'));
						}}
					>
						No, View Running Job
					</InversedBigBlueButton>

					<BigBlueButton onClick={handleSubmitVideo}>
						Yes, Regenerate Video
					</BigBlueButton>
				</WrappableRow>
			</Modal>
		);
	};

	async function confirmVideoJob() {
		if (!project) {
			console.error('No project found');
			return;
		}
		const hasRunningVideoJob = await VideoService.hasRunningVideoJob(
			project.id,
			token,
		);
		if (hasRunningVideoJob || !canSubmitVideo()) {
			setShowConfirmRegenModal(true);
		} else {
			handleSubmitVideo();
			setLastSubmissionTime();
		}
	}

	async function handleSubmitVideo() {
		const longScriptIndices = slides
			.map((slide, index) =>
				(slide.transcript?.length || 0) >= 4096 ? index : -1,
			)
			.filter((index) => index !== -1);

		// If there are slides with transcripts exceeding 4096 characters, display a detailed error message
		if (longScriptIndices.length > 0) {
			toast.error(
				`The following pages have more than 4096 characters: ${longScriptIndices.map((index) => index + 1).join(', ')}. Please remove some characters.`,
				{ containerId: 'script' },
			);
			setIsSubmitting(false);
			return;
		}

		const emptyScriptIndices = slides
			.map((slide, index) => (slide.transcript?.length === 0 ? index : -1))
			.filter((index) => index !== -1);

		// If there are slides with empty scripts, display a detailed error message
		if (emptyScriptIndices.length > 0) {
			toast.error(
				`The following pages have empty scripts: ${emptyScriptIndices.map((index) => index + 1).join(', ')}. Please double check.`,
				{ containerId: 'script' },
			);
			setIsSubmitting(false);
			return;
		}

		if (canSubmitVideo()) {
			setLastSubmissionTime();
		} else {
			toast.error('Please wait at least 5 minutes between video submissions.', {
				containerId: 'script',
			});
			setIsSubmitting(false);
			return;
		}

		console.log('handleSubmitVideo');
		if (!project) {
			console.error('No project found');
			return;
		}
		const foldername = project?.foldername;
		const project_id = project.id;
		if (!foldername || !project_id) {
			console.error('No pid or foldername or project_id found');
			setIsSubmitting(false);
			return;
		}

		const generateVideo = async () => {
			if (isClonedVoice(voice) || isOpenaiVoice(voice)) {
				setAvatar('');
			}

			const hiddenSlideIndices = slides.reduce(
				(acc: number[], slide, index) => {
					if (slide.isHidden) {
						acc.push(index);
					}
					return acc;
				},
				[],
			);

			try {
				console.log('project_id:', project_id);
				updateProject('video_url', '');
				VideoService.generateVideo(
					project_id,
					foldername,
					voice,
					token,
					style,
					avatar,
					posture,
					size,
					position,
					bgm,
					bgmVolume,
					creditCost,
					transitionType,
					withSubtitle,
					selectedLanguage, // locale
					hiddenSlideIndices,
				);
				updateCreditsFE(-20);
				router.push(addIdToRedir('/video'));
			} catch (error) {
				console.error('Error in fetchData:', error);
				setIsSubmitting(false);
			}
		};
		generateVideo();
	}

	// Function to check if a video was submitted within the last 5 minutes
	const canSubmitVideo = () => {
		const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
		if (lastSubmissionTime) {
			const currentTime = new Date().getTime();
			const timeDifference = currentTime - parseInt(lastSubmissionTime, 10);
			return true;
			// return timeDifference > 5 * 60 * 1000; // 5 minutes in milliseconds
		}
		return true; // If no submission has been made before
	};

	// Function to set the current time as the last submission time in localStorage
	const setLastSubmissionTime = () => {
		const currentTime = new Date().getTime();
		localStorage.setItem('lastSubmissionTime', currentTime.toString());
	};

	useEffect(() => {
		if (isSubmitting) {
			confirmVideoJob();
			setIsSubmitting(false);
		}
	}, [isSubmitting]);

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='h-full w-full bg-white flex flex-col'>
			{/* flex col container for steps, title, etc */}

			<WorkflowStepsBanner
				currentIndex={4}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={isPaidUser}
				nextIsPaidFeature={true}
				// todo: change credits
				nextText={'Create Video (' + creditCost + '⭐️)'}
			/>

			<ToastContainer enableMultiContainer containerId={'script'} />

			{showConfirmRegenModal && <ConfirmVideoRegenModal />}

			{/* three columns: voice & avatar & effects, scripts, chat window */}

			<div className='flex flex-row w-full gap-[24px] items-start justify-between'>
				{/* column for voice effects and avatar */}
				{showAudioVideoDetailSettingSection && (
					<Column width={'100%'} customStyle={{ width: '33.33%' }}>
						<AudioVideoDetailSettingsSection
							voice={voice}
							setVoice={setVoice}
							voiceIsHD={voiceIsHD}
							setVoiceIsHD={setVoiceIsHD}
							selectedLanguage={selectedLanguage}
							setSelectedLanguage={setSelectedLanguage}
							style={style}
							setStyle={setStyle}
							bgm={bgm}
							setBgm={setBgm}
							bgmVolume={bgmVolume}
							setBgmVolume={setBgmVolume}
							transitionType={transitionType}
							setTransitionType={setTransitionType}
							withSubtitle={withSubtitle}
							setWithSubtitle={setWithSubtitle}
							avatar={avatar}
							setAvatar={setAvatar}
							posture={posture}
							setPosture={setPosture}
							size={size}
							setSize={setSize}
							position={position}
							setPosition={setPosition}
						/>
					</Column>
				)}

				{/*  column for scripts window */}
				<Column width={'100%'} customStyle={{ width: 'auto' }}>
					<Card>
						<BigTitle>📝 Scripts</BigTitle>
						{!isOpenaiVoice(voice) && (
							<Instruction>
								<div className='flex flex-col gap-y-1'>
									<p>💡 Script to voice tips: </p>
									<p>
										⏸️ Use <span className='text-green-600'>...</span> to denote
										pause{' '}
									</p>
									<p>
										*️⃣ Use <span className='text-green-600'>*word*</span> to
										denote emphasis{' '}
									</p>
									<p>
										🔤 Use <span className='text-green-600'>[word]</span> to
										spell out the word.{' '}
									</p>
									<p>
										🌟 For example:{' '}
										<span
											className='text-blue-600 hover:cursor-pointer'
											onClick={() => previewVoice('denotation')}
										>
											🔈 We also support creating *slides* from... [doc] files.{' '}
										</span>
									</p>
								</div>
							</Instruction>
						)}

						<div className='flex flex-col gap-y-2 items-center '>
							<ScriptSection
								slides={slides}
								index={slideIndex}
								voice={voice}
								voiceStyle={style}
								updateSlidePage={updateSlidePage}
								locale={selectedLanguage}
							/>

							<div className='flex flex-row items-center'>
								<SlideLeftNavigator
									currentSlideIndex={slideIndex}
									slides={slides}
									goToSlide={gotoPage}
								/>
								<SlidePagesIndicator
									currentSlideIndex={slideIndex}
									slides={slides}
								/>
								<SlideRightNavigator
									currentSlideIndex={slideIndex}
									slides={slides}
									goToSlide={gotoPage}
								/>
							</div>
						</div>
					</Card>
				</Column>
				{/*  column for ai chat window */}
				<Column
					width={'100%'}
					customStyle={{ width: 'auto', height: '90vh', minHeight: '80vh' }}
				>
					{/* <div className='h-full flex flex-col justify-end'> */}
					{/* <div> */}
					<AIAssistantChatWindow
						onToggle={undefined}
						slides={slides}
						currentSlideIndex={slideIndex}
						updateSlidePage={updateSlidePage}
						type='script'
					/>
					{/* </div> */}
					{/* </div> */}
				</Column>
			</div>

			{/* when smaller screen: <1024px we will show audio and video detail section under script and chat */}
			{/* column for voice effects and avatar */}
			{!showAudioVideoDetailSettingSection && (
				<div className='w-[90vw] mx-auto'>
					<Column width={'100%'} customStyle={{ width: 'auto' }}>
						<AudioVideoDetailSettingsSection
							voice={voice}
							setVoice={setVoice}
							voiceIsHD={voiceIsHD}
							setVoiceIsHD={setVoiceIsHD}
							selectedLanguage={selectedLanguage}
							setSelectedLanguage={setSelectedLanguage}
							style={style}
							setStyle={setStyle}
							bgm={bgm}
							setBgm={setBgm}
							bgmVolume={bgmVolume}
							setBgmVolume={setBgmVolume}
							transitionType={transitionType}
							setTransitionType={setTransitionType}
							withSubtitle={withSubtitle}
							setWithSubtitle={setWithSubtitle}
							avatar={avatar}
							setAvatar={setAvatar}
							posture={posture}
							setPosture={setPosture}
							size={size}
							setSize={setSize}
							position={position}
							setPosition={setPosition}
						/>
					</Column>
				</div>
			)}

			<CloneYourVoiceTutorial></CloneYourVoiceTutorial>
		</div>
	);
}
