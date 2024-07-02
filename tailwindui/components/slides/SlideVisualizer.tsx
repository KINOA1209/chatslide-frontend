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
import Modal from '../ui/Modal';
import { Instruction } from '../ui/Text';
import RadioButton from '../ui/RadioButton';
import { GenerationStatusProgressModal } from '../ui/GenerationStatusProgressModal';
import { set } from 'lodash';
import { SecondaryButton } from '@/app/(account)/pricing/subscriptionCTAs';
import { InversedBigBlueButton } from '../button/DrlambdaButton';

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

	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

	const exportSlidesRef = useRef<HTMLDivElement>(null);
	const [pronoun, setPronoun] = useState('second');

	const pronounOptions = [
		{
			value: 'first',
			text: 'First / We',
			explanation: 'Example: Today, we will be learning math.',
		},
		{
			value: 'second',
			text: 'Second / You',
			explanation: 'Example: Today, you will be learning math.',
		},
	];
	const [showScriptSettingsModal, setShowScriptSettingsModal] = useState(false);

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

		setShowGenerationStatusModal(true);

		let counter = 0 as number;
		while (saveStatus != SaveStatus.UpToDate) {
			console.log('Waiting for saveStatus to be UpToDate');
			await sleep(200);
			counter++;
			if (counter == 25) {
				console.error(
					'SlideVisualizer: saveStatus not UpToDate after 5 seconds',
				);
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
			pronoun: pronoun,
		};

		try {
			const transcripts = await SlidesService.generateScripts(formData, token);
			setTranscripts(transcripts); // and auto-save
			setIsSubmitting(false);
			setShowGenerationStatusModal(false);
			router.push(addIdToRedir('/scripts'));
		} catch (error) {
			toast.error(
				'Server is busy now. Please try again later. Reference code: ' +
					project.id,
			);
			console.log(error);
		}
		setIsSubmitting(false);
		setShowGenerationStatusModal(false);
	}

	useEffect(() => {
		if (isSubmitting) {
			// handleSubmitTranscript();

			// if (project?.has_scripts == true) {
			// 	router.push(addIdToRedir('/scripts'));
			// 	return;
			// }
			setShowScriptSettingsModal(true);
		}
	}, [isSubmitting]);

	return (
		<div className='w-full flex h-full flex-col justify-center items-start gap-4 overflow-y-hidden'>
			{/* slides and scripts contents */}
			{showScriptSettingsModal && (
				<Modal
					showModal={showScriptSettingsModal}
					setShowModal={setShowScriptSettingsModal}
					onConfirm={handleSubmitTranscript}
          onCancel={() => setIsSubmitting(false)}
          confirmText={!project?.has_scripts ? 'Generate' : 'Regenerate'}
					title='Script Generation Settings'
				>
					{project?.has_scripts && (
						<Instruction>
							You already have scripts generated for this project.{' '}
							<a href={addIdToRedir('/scripts')} className='text-blue-600'>
								View scripts
							</a>
						</Instruction>
					)}
					<div>
						<Instruction>
							What pronoun do you want to use in scripts?
						</Instruction>
						<RadioButton
							name='pronoun'
							options={pronounOptions}
							selectedValue={pronoun}
							setSelectedValue={setPronoun}
							cols={2}
						/>
					</div>
				</Modal>
			)}

			{showGenerationStatusModal && (
				<GenerationStatusProgressModal
					onClick={() => setShowGenerationStatusModal(false)}
					prompts={[['✍️ Writing the scripts based on your slides...', 5]]}
				></GenerationStatusProgressModal>
			)}

			<SlidesHTML exportSlidesRef={exportSlidesRef} showScript={showScript} />
		</div>
	);
};

export default SlideVisualizer;
