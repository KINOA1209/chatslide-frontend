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
import { isELabsVoice, isOpenaiVoice } from '@/components/language/voiceData';
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

	useEffect(() => {
		if (avatar) setCreditCost(400);
		else if (isELabsVoice(voice)) setCreditCost(400);
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
			.map((slide, index) => ((slide.transcript?.length || 0) >= 4096 ? index : -1))
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
			if (isELabsVoice(voice) || isOpenaiVoice(voice)) {
				setAvatar('');
			}

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

			<Column>
				{/* <CreditCost /> */}
				<Card>
					<WrappableRow type='flex' justify='between'>
						<BigTitle>🎙️ Voice</BigTitle>

						{!isOpenaiVoice(voice) && (
							<Toggle
								isLeft={!voiceIsHD}
								setIsLeft={(value: boolean) => setVoiceIsHD(!value)}
								leftText='Standard'
								rightText='Hi-Fi 🎧'
							/>
						)}
					</WrappableRow>

					<Instruction>
						Select the voice you want to use for your video.
					</Instruction>
					{/* <Instruction>
						<span>
							Voice cloning is now available for ULTIMATE users. Click button
							below to clone and use your voice.
						</span>
					</Instruction>
					<InversedBigBlueButton
						onClick={() => (window.location.href = '/studio')}
					>
						Clone your voice
					</InversedBigBlueButton> */}
					<ClonedVoicesProvider>
						<VoiceSelector
							selectedVoice={voice}
							setSelectedVoice={setVoice}
							style={style}
							setStyle={setStyle}
							isHD={voiceIsHD}
						/>
					</ClonedVoicesProvider>
				</Card>

				<Card>
					<BigTitle>🎥 Video Effects</BigTitle>
					<WrappableRow type='grid' cols={2}>
						<div>
							<Instruction>Background Music:</Instruction>
							<div className='flex flex-row gap-4 items-center'>
								<DropDown
									width='12rem'
									onChange={(e) => setBgm(e.target.value)}
									value={bgm}
									style='input'
								>
									{Object.entries(bgmDisplayNames).map(([key, value]) => (
										<option key={key} value={key}>
											{value}
										</option>
									))}
								</DropDown>
								{bgm && (
									<ButtonWithExplanation
										explanation='Preview'
										button={
											<a href={`/bgm/${bgm}.mp3`} target='_blank'>
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
											</a>
										}
									/>
								)}
							</div>
						</div>
						{bgm && (
							<div>
								<Instruction>Volume: {bgmVolume * 100}</Instruction>
								<RangeSlider
									onChange={(value: number) => {
										if (value !== 0) {
											console.log(value);
											setBgmVolume(value);
										}
									}}
									value={bgmVolume}
									minValue={0.05}
									choices={[0, 0.05, 0.1, 0.2, 0.3, 0.4]}
								/>
							</div>
						)}
					</WrappableRow>

					<div>
						<Instruction>Transition Between Slides:</Instruction>
						<WrappableRow type='grid' cols={2}>
							<DropDown
								onChange={(e) => setTransitionType(e.target.value)}
								value={transitionType}
							>
								<option value=''>⏹️ None</option>
								<option value='crossfade'>🌫️ Fade</option>
								<option value='slide'>➡️ Slide In</option>
								{/* <option value='zoom'>🔎 Zoom</option> */}
							</DropDown>
							{transitionType &&  (
									<img
										src={`/images/script/${transitionType}.gif`}
										alt='Transition'
										className='h-24'
									/>
								)}
						</WrappableRow>
					</div>

					<div className='flex flex-row items-center gap-x-2'>
						{/* checkbox for adding subtitle */}
						<input
							type='checkbox'
							checked={withSubtitle}
							onChange={() => setWithSubtitle(!withSubtitle)}
						/>{' '}
						<Instruction>Add subtitle to my video.</Instruction>
					</div>
				</Card>

				<Card>
					<BigTitle>🦹‍♂️ Avatar</BigTitle>
					<Instruction>
						Select the avatar you want to use for your video.
						<GrayLabel>Beta</GrayLabel>
					</Instruction>
					<Explanation>
						Due to the limitation of our resources, we can only provide a
						limited number of video generations with avatars. <br />
						This feature will cost more credits. <br />
						The credit cost for videos with avatar is 400⭐️ per video. This may
						change in the future.
					</Explanation>
					{/* TODO: is ClonedVoice */}
					{isOpenaiVoice(voice) || isELabsVoice(voice) ? (
						<WarningMessage>
							The voice you selected does not support avatars yet.
						</WarningMessage>
					) : (
						<AvatarSelector
							avatar={avatar}
							setAvatar={setAvatar}
							posture={posture}
							setPosture={setPosture}
							size={size}
							setSize={setSize}
							position={position}
							setPosition={setPosition}
						/>
					)}
				</Card>
				{/* <Card>
					<BigTitle>🦹‍♂️ Avatar</BigTitle>
					<div className='flex flex-row gap-x-4 items-end'>
						<Instruction>
							This is coming soon... We are finding some pilot users to test this feature.
						</Instruction>
						<EarlyAccessButton
							username={username}
							token={token}
							feature='avatar'
							project_id={project.id}
						/>
					</div>
				</Card> */}
			</Column>

			<div className='flex flex-row justify-between gap-x-4 lg:px-4 pb-4'>
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
									🔤 Use <span className='text-green-600'>[word]</span> to spell
									out the word.{' '}
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

				<div className='h-full flex flex-col justify-end'>
					<div className='h-[600px] sticky bottom-0'>
						<AIAssistantChatWindow
							onToggle={undefined}
							slides={slides}
							currentSlideIndex={slideIndex}
							updateSlidePage={updateSlidePage}
							type='script'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
