'use client';

import React, { useEffect, useRef, useState } from 'react';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { toast, ToastContainer } from 'react-toastify';
import VideoService from '@/services/VideoService';
import { useUser } from '@/hooks/use-user';
import { Column } from '@/components/layout/Column';
import { useSlides } from '@/hooks/use-slides';
import { Instruction, BigTitle, Explanation } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { useProject } from '@/hooks/use-project';
import VoiceSelector, { previewVoice } from '@/components/language/VoiceSelector';
import { useRouter, useSearchParams } from 'next/navigation';
import { addIdToRedir } from '@/utils/redirWithId';
import dynamic from 'next/dynamic';
import useHydrated from '@/hooks/use-hydrated';
import { BigBlueButton, EarlyAccessButton } from '@/components/button/DrlambdaButton';
import UserService from '@/services/UserService';
import AvatarSelector from '@/components/language/AvatarSelector';
import { GrayLabel } from '@/components/ui/GrayLabel';
import { Blank } from '@/components/ui/Loading';


const ScriptSection = dynamic(
	() => import('@/components/script/ScriptSection'),
	{ ssr: false },
);

const AVATAR_USER_ALLOWLIST = [
	'Quanlai Li',
	'Laura Lin',
	'Rex',
	'Jackson',
	'Joe Moore',
	'Howard White',
	'randy',
	'marktohlson',
	'mario guzman',
	'manish_ace',
	'muciocv',
	'Guido Schmitter',
	'Andrew Clayton',
	'Sébastien Lalloué',
	'Ze Yu',
	'Jialiang Ye',
	'Abdellatif Abid'
]

export default function WorkflowStep5() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { slides, updateSlidePage } = useSlides();
	const { project, updateProject } = useProject();
	const { username, token, updateCreditsFE } = useUser();
	const router = useRouter();
	const [voice, setVoice] = useState('en-US-AvaNeural');
	const [style, setStyle] = useState('');
	const [avatar, setAvatar] = useState('');
	const [posture, setPosture] = useState('casual-sitting');
	const [size, setSize] = useState('medium');
	const [position, setPosition] = useState('bottom-right');

	const params = useSearchParams();

	if (!project) {
		if (params.get('id')) {
			router.push(`/project/${params.get('id')}`);
		}
		return <Blank>Project not found</Blank>;
	}

	async function handleSubmitVideo() {
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

		const fetchData = async () => {
			try {
				console.log('project_id:', project_id);
				updateProject('video_url', '');
				VideoService.generateVideo(project_id, foldername, voice, token, style, avatar, posture, size, position);
				updateCreditsFE(-20);
				router.push(addIdToRedir('/video'));
			} catch (error) {
				console.error('Error in fetchData:', error);
				setIsSubmitting(false);
			}
		};
		fetchData();
	};


	useEffect(() => {
		if (isSubmitting) {
			handleSubmitVideo();
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
				isPaidUser={true}
				nextIsPaidFeature={true}
				// todo: change credits
				nextText={avatar ? 'Create Video (20 ⭐️)' : 'Create Video (20 ⭐️)'}
			/>

			<ToastContainer enableMultiContainer containerId={'script'} />

			<Column>
				<Card>
					<BigTitle>🎙️ Voice</BigTitle>
					<Instruction>
						Select the voice you want to use for your video.
					</Instruction>
					<VoiceSelector
						selectedVoice={voice}
						setSelectedVoice={setVoice}
						style={style}
						setStyle={setStyle}
					/>
				</Card>
				{AVATAR_USER_ALLOWLIST.includes(username) ?
					<Card>
						<BigTitle>🦹‍♂️ Avatar</BigTitle>
						<Instruction>
							Select the avatar you want to use for your video.<GrayLabel>Beta</GrayLabel>
						</Instruction>
						<Explanation>
							Due to the limitation of our resources, we can only provide a limited number of video generations with avatars. <br />
							The credit cost for using an avatar may change in the future.
						</Explanation>
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
					</Card> :
					<Card>
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
					</Card>
				}
				<Card>
					<BigTitle>📝 Scripts</BigTitle>
					<Instruction>
						<div className='flex flex-col gap-y-1'>
							<p>💡 Script to voice tips: </p>
							<p>⏸️ Use <span className='text-green-600'>...</span> to denote pause </p>
							<p>*️⃣ Use <span className='text-green-600'>*word*</span> to denote emphasis </p>
							<p>🔤 Use <span className='text-green-600'>[word]</span> to spell out the word. </p>
							<p>🌟 For example: {' '}
								<span className='text-blue-600 hover:cursor-pointer' onClick={() => previewVoice('denotation')}>🔈 DrLambda also supports creating *slides* from... [doc] files. </span>
							</p>
						</div>
					</Instruction>
					<div className='flex flex-col gap-y-2'>
						{slides.map((_, index) => (
							<ScriptSection
								key={index}
								slides={slides}
								index={index}
								voice={voice}
								voiceStyle={style}
								updateSlidePage={updateSlidePage}
							/>
						))}
					</div>
				</Card>
			</Column>
		</div>
	);
}
