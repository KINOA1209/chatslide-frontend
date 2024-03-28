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
import VoiceSelector from '@/components/language/VoiceSelector';
import { useRouter } from 'next/navigation';
import { addIdToRedir } from '@/utils/redirWithId';
import dynamic from 'next/dynamic';
import useHydrated from '@/hooks/use-hydrated';

const ScriptSection = dynamic(
	() => import('@/components/script/ScriptSection'),
	{ ssr: false },
);

export default function WorkflowStep5() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { slides, updateSlidePage } = useSlides();
	const { project, updateProject } = useProject();
	const { token } = useUser();
	const router = useRouter();
	const [voice, setVoice] = useState('en-US-AvaNeural');

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
				VideoService.generateVideo(project_id, foldername, voice, token);
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
				nextText='Create Video'
			/>

			<ToastContainer enableMultiContainer containerId={'script'} />

			<Column>
				<Card>
					<BigTitle>Voice</BigTitle>
					<Instruction>
						Select the voice you want to use for your video.
					</Instruction>
					<VoiceSelector selectedVoice={voice} setSelectedVoice={setVoice} />
				</Card>
				<Card>
					<BigTitle>Scripts</BigTitle>
					<Instruction>
						💡 Script to voice tips: <br/>
						⏸️ Use <span className='text-green-600'>...</span> to denote pause <br/>
						*️⃣ Use <span className='text-green-600'>*word*</span> to denote emphasis <br/>
						🔤 Use <span className='text-green-600'>[word]</span> to spell out the word. <br />
						🌟 For example: {' '}
						<span className='text-gray-600'>DrLambda also supports creating *slides* from... [doc] files. </span>
					</Instruction>
					<div className='flex flex-col gap-y-2'>
						{slides.map((_, index) => (
							<ScriptSection
								key={index}
								slides={slides}
								index={index}
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