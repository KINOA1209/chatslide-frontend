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
import { DropDown } from '../button/DrlambdaButton';

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
	const router = useRouter();

	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

	const exportSlidesRef = useRef<HTMLDivElement>(null);
	const [pronoun, setPronoun] = useState('second');
	const [style, setStyle] = useState('engaging');
	const [additionalRequirements, setAdditionalRequirements] = useState('');
	const [length, setLength] = useState('normal');

	const pronounOptions = [
		{
			value: 'first',
			text: 'First / We',
			explanation: 'Example: Today, we will be learning history.',
		},
		{
			value: 'second',
			text: 'Second / You',
			explanation: 'Example: Today, you will be learning history.',
		},
	];

	const styleOptions = [
		{
			value: 'engaging',
			text: '😊 Engaging', // Smiling face to represent an engaging and friendly tone
		},
		{
			value: 'formal',
			text: '🧐 Formal', // Face with monocle to represent a formal and serious tone
		},
		{
			value: 'casual',
			text: '😎 Casual', // Smiling face with sunglasses to represent a laid-back and casual tone
		},
		{
			value: 'persuasive',
			text: '💬 Persuasive', // Speech balloon to represent persuasive communication
		},
		{
			value: 'informative',
			text: '📚 Informative', // Books to represent sharing knowledge and information
		},
		{
			value: 'humorous',
			text: '😂 Humorous', // Face with tears of joy to represent humor and fun
		},
	];

	const [showScriptSettingsModal, setShowScriptSettingsModal] = useState(false);

	const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

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
			style: style,
			additional_requirements: additionalRequirements,
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
					onConfirm={() => {
						handleSubmitTranscript();
						setShowScriptSettingsModal(false);
					}}
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
					{showAdvancedSettings ? (
						<>
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

							<div>
								<Instruction>
									What style of script do you want to generate?
								</Instruction>
								<DropDown
									width='12rem'
									onChange={(e) => setStyle(e.target.value)}
									value={style}
									style='input'
								>
									{styleOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.text}
										</option>
									))}
								</DropDown>
							</div>

							<div>
								<Instruction>What is the length of the script?</Instruction>
								<DropDown
									width='12rem'
									onChange={(e) => setLength(e.target.value)}
									value={length}
									style='input'
								>
									<option value='concise'>🔖 Concise</option>
									<option value='normal'>📄 Normal</option>
									<option value='detailed'>📖 Detailed</option>
								</DropDown>
							</div>

							<div>
								<Instruction>
									Any additional requirements for the scripts?
								</Instruction>
								<textarea
									className='w-full h-24 p-2 border border-gray-300 rounded-md'
									value={additionalRequirements}
									onChange={(e) => setAdditionalRequirements(e.target.value)}
								></textarea>
							</div>
						</>
					) : (
						<div>
							<Instruction>
								<button
									onClick={() => setShowAdvancedSettings(true)}
									className='text-blue-600'
								>
									Show advanced settings
								</button>
							</Instruction>
						</div>
					)}
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
