import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useSlides } from '@/hooks/use-slides';
import VideoService from '@/services/VideoService';
import { useUser } from '@/hooks/use-user';
import { toast } from 'react-toastify';
import { useProject } from '@/hooks/use-project';
import { addIdToRedir } from '../../utils/redirWithId';
import { sleep } from '@/utils/sleep';
import SlidesService from '@/services/SlidesService';
import { getOrigin } from '@/utils/getHost';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
	ssr: false,
});

type SlideVisualizerProps = {
	isGpt35: boolean;
	isSubmitting: boolean;
	setIsSubmitting: (isSubmitting: boolean) => void;
	showScript: boolean;
};

const SlideVisualizer: React.FC<SlideVisualizerProps> = ({
	isGpt35,
	isSubmitting,
	setIsSubmitting,
	showScript = false,
}) => {
	const [host, setHost] = useState(getOrigin());

	const { slides, setTranscripts, saveStatus, SaveStatus } = useSlides();
	const { token, isPaidUser } = useUser();
	const { isShared, updateIsShared, project } = useProject();
	const [showShareLink, setShowShareLink] = useState(true);
	const router = useRouter();
	const exportSlidesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isShared) {
			setShowShareLink(true);
		}
	}, [isShared]);

	useEffect(() => {
		if (
			window.location.hostname !== 'localhost' &&
			window.location.hostname !== '127.0.0.1'
		) {
			setHost('https://' + window.location.hostname);
		} else {
			setHost(window.location.hostname);
		}
	}, []);

	async function handleSubmitTranscript() {
		if (!project) {
			console.log('SlideVisualizer: No project found');
			return;
		}

		let counter = 0 as number;
		while (saveStatus != SaveStatus.UpToDate) {
			console.log('Waiting for saveStatus to be UpToDate');
			await sleep(200);
			counter++;
			if (counter == 25) {
				console.error('SlideVisualizer: saveStatus not UpToDate after 5 seconds');
				break;
			}
		}

		console.log('submitting');

		const formData = {
			foldername: project.foldername,
			topic: project.topic,
			project_id: project.id,
			language: project.language,
			json_list: slides,
			model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
			max_index: isPaidUser ? 0 : 5,
		};

		try {
			const transcripts = await SlidesService.generateScripts(formData, token);
			setTranscripts(transcripts); // and auto-save
			router.push(addIdToRedir('/scripts'));
		}

		catch (error) {
			toast.error(
				'Server is busy now. Please try again later. Reference code: ' +
				project.id,
			);
			console.log(error);
		}
		setIsSubmitting(false);
	}

	useEffect(() => {
		if (isSubmitting) {
			handleSubmitTranscript();
		}
	}, [isSubmitting]);

	return (
		<div className='w-full flex max-h-[900px] flex-col justify-center items-start gap-4 overflow-y-scroll'>


			{/* slides and scripts contents */}
			<SlidesHTML exportSlidesRef={exportSlidesRef} showScript={showScript} />
		</div>
	);
};

export default SlideVisualizer;
