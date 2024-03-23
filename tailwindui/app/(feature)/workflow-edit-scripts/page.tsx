'use client';

import React, { useEffect, useRef, useState } from 'react';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { toast, ToastContainer } from 'react-toastify';
import VideoService from '@/services/VideoService';
import { useUser } from '@/hooks/use-user';
import { Column } from '@/components/layout/Column';
import { useSlides } from '@/hooks/use-slides';
import { Instruction, BigTitle } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { useProject } from '@/hooks/use-project';
import VoiceSelector from '@/components/language/VoiceSelector';
import { useRouter } from 'next/navigation';
import { addIdToRedir } from '@/utils/redirWithId';
import dynamic from 'next/dynamic';

const ScriptSection = dynamic(() => import('@/components/script/ScriptSection'), { ssr: false });


export default function WorkflowStep5() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { slides, updateSlidePage } = useSlides();
	const { project } = useProject();
	const { token } = useUser();
	const router = useRouter();
	const [voice, setVoice] = useState('en-US-AvaNeural');

	if (typeof window === "undefined" || typeof document === "undefined") {
		return null;
	}

	async function handleSubmitVideo() {
		console.log('submitting');

		const language = sessionStorage.getItem('language') || 'English';
		const foldername = sessionStorage.getItem('foldername') || '';

		const fetchData = async () => {
			if (!project) {
				console.error('No project found');
				return;
			}
			try {
				const project_id = project.id;
				VideoService.generateVideo(
					project_id,
					foldername,
					language,
					token,
				);
				router.push(addIdToRedir('workflow-review-video'));
			} catch (error) {
				console.error('Error in fetchData:', error);
				toast.error(
					'We have some problem creating your video, please try again later.',
				);
				// TODO: add toast prompts for user
			}
		};

		fetchData();
		setIsSubmitting(false);
	}

	useEffect(() => {
		if (isSubmitting) {
			handleSubmitVideo();
		}
	}, [isSubmitting]);

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
						You can edit your scripts here:
						If you want to edit slides, you can go back to the previous step.
					</Instruction>
					<div className='flex flex-col gap-y-2'>
						{slides.map((_, index) => (
							<ScriptSection
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
