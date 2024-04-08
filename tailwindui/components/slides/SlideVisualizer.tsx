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
	const [host, setHost] = useState('https://drlambda.ai');

	const { slides, setTranscripts, saveStatus, SaveStatus } = useSlides();
	const { token } = useUser();
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
		};

		try {
			const response = await fetch('/api/generate_script', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const resp = await response.json();
				const transcripts = resp.data.res;
				setTranscripts(transcripts); // and auto-save
				router.push(addIdToRedir('/scripts'));
			} else {
				console.error('Error when generating scripts:', response.status);
				toast.error(
					'Server is busy now. Please try again later. Reference code: ' +
					project.id,
				);
				console.log(response);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		setIsSubmitting(false);
	}

	useEffect(() => {
		if (isSubmitting) {
			handleSubmitTranscript();
		}
	}, [isSubmitting]);

	return (
		<div className='w-full flex max-h-[900px] flex-col justify-center items-center gap-4 overflow-auto'>


			{/* slides and scripts contents */}
			<SlidesHTML exportSlidesRef={exportSlidesRef} showScript={showScript} />
		</div>
	);
};

export default SlideVisualizer;
