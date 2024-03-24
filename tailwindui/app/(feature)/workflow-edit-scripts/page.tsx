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

const ScriptSection = dynamic(
	() => import('@/components/script/ScriptSection'),
	{ ssr: false },
);

export default function WorkflowStep5() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { slides, updateSlidePage } = useSlides();
	const { project } = useProject();
	const { token } = useUser();
	const router = useRouter();
	const [voice, setVoice] = useState('en-US-AvaNeural');

	async function handleSubmitVideo() {
		if (!project) {
			console.error('No project found');
			return;
		}
		const foldername = project?.foldername;
		const project_id = project.id;
		if (!foldername || !project_id) {
			console.error('No language or foldername or project_id found');
			setIsSubmitting(false);
			const language = project?.language;
			if (!language || !foldername) {
				console.error('No language or foldername found');
				return;
			}

			const fetchData = async () => {
				try {
					console.log('project_id:', project_id);
					VideoService.generateVideo(project_id, foldername, voice, token);
					router.push(addIdToRedir('workflow-review-video'));
				} catch (error) {
					console.error('Error in fetchData:', error);
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
							You can edit your scripts here: If you want to edit slides, you
							can go back to the previous step.
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
}
