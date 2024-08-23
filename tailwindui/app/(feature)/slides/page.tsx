'use client';

import React, { useRef, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { useUser } from '@/hooks/use-user';
import MyCustomJoyride from '@/components/user_onboarding/MyCustomJoyride';
import StepsSlidesPage from '@/components/user_onboarding/StepsSlidesPage';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import { useRouter, useSearchParams } from 'next/navigation';
import { Blank } from '@/components/ui/Loading';
import { addIdToRedir } from '@/utils/redirWithId';
import { MenuItem } from '@/components/button/Menu';
import dynamic from 'next/dynamic';
import { Instruction } from '@/components/ui/Text';
import Modal from '@/components/ui/Modal';
import { DropDown } from '@/components/button/DrlambdaButton';
import RadioButton from '@/components/ui/RadioButton';
import { SaveStatus, useSlides } from '@/hooks/use-slides';
import SlidesService from '@/services/SlidesService';
import { sleep } from '@/utils/sleep';
import Project from '@/models/Project';
import { PiFileText } from 'react-icons/pi';
import { FaRegStar } from 'react-icons/fa';
import { GenerationStatusProgressModal } from '@/components/ui/GenerationStatusProgressModal';
import { InputBox, NewInputBox } from '@/components/ui/InputBox';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
	ssr: false,
});

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

export default function WorkflowStep3() {
	const { isPaidUser, token } = useUser();
	const { project, updateProject } = useProject();
	const { saveStatus, slides, setTranscripts } = useSlides();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const params = useSearchParams();
	const router = useRouter();

	const [showScriptsSettingsModal, setShowScriptsSettingsModal] =
		useState(false);
	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

	const exportSlidesRef = useRef<HTMLDivElement>(null);

	const [pronoun, setPronoun] = useState('second');
	const [style, setStyle] = useState('engaging');
	const [length, setLength] = useState('normal');

	const isGpt35 = true;

	const menuItems = (
		<>
			<MenuItem
				label={project?.has_scripts ? 'Show Scripts' : 'Write Scripts Manually'}
				onClick={() => router.push(addIdToRedir('/scripts'))}
				icon={<PiFileText />}
			/>
			{project?.content_type === 'presentation' && (
				<MenuItem
					label='Advanced Generation'
					onClick={() => setShowScriptsSettingsModal(true)}
					icon={<FaRegStar />}
				/>
			)}
		</>
	);

	const ScriptsSettingModal: React.FC<{}> = ({}) => {
		const [additionalRequirements, setAdditionalRequirements] = useState('');

		return (
			<Modal
				showModal={showScriptsSettingsModal}
				setShowModal={setShowScriptsSettingsModal}
				onConfirm={() => {
					setIsSubmitting(true);
					setShowScriptsSettingsModal(false);
					setShowGenerationStatusModal(true);
					handleSubmitTranscript(additionalRequirements);
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
				<div>
					<Instruction>What pronoun do you want to use in scripts?</Instruction>
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
					<NewInputBox
						value={additionalRequirements}
						onChange={setAdditionalRequirements}
						placeholder="e.g. Do not use wordings like let's dive in."
						textarea
						maxLength={3000}
					/>
				</div>
			</Modal>
		);
	};

	if (!project) {
		if (params.get('id')) {
			router.push(`/project/${params.get('id')}`);
		}
		return <Blank>Project not found</Blank>;
	}

	// set current page to local storage
	useEffect(() => {
		if (typeof window !== 'undefined' && localStorage) {
			localStorage.setItem('currentWorkflowPage', 'SlidesPage');
		}
	}, []);

	async function handleSubmitTranscript(additionalRequirements?: string) {
		// console.log('handleSubmitTranscript');

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

		// console.log('submitting');

		try {
      let transcripts = [];
			if (project?.content_type === 'presentation') {
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
				transcripts = await SlidesService.generateScripts(
					formData,
					token,
				);
			} else {
        // ppt2video
        transcripts = await SlidesService.ppt2scripts(
          project?.resources?.map((r) => r.id) || [],
          project.language,
          token
        )
      }

			setTranscripts(transcripts); // and auto-save
			router.push(addIdToRedir('/scripts'));
			updateProject('has_scripts', true);
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

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	function onClickGenerate() {
		console.log('onClickGenerate');
		setShowGenerationStatusModal(true);
		handleSubmitTranscript();
	}

	return (
		<div className='h-full w-full flex flex-col relative'>
			{/* flex col container for steps, title, etc */}
			<MyCustomJoyride steps={StepsSlidesPage()} />
			<WorkflowStepsBanner
				currentIndex={project.content_type === 'presentation' ? 3 : 1} 
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={isPaidUser}
				nextIsPaidFeature={false}
				nextText={!isSubmitting ? 'Write Scripts' : 'Writing Scripts'}
				onClickNext={onClickGenerate}
				menuItems={menuItems}
			/>

			<ToastContainer enableMultiContainer containerId={'slides'} />

			<div className='w-full flex h-full flex-col justify-center items-start gap-4 overflow-y-hidden'>
				{/* slides and scripts contents */}
				<SlidesHTML
					exportSlidesRef={exportSlidesRef}
					showScript={project?.has_scripts || false}
				/>
			</div>

			{showScriptsSettingsModal && <ScriptsSettingModal />}

			{showGenerationStatusModal && (
				<GenerationStatusProgressModal
					onClick={() => {
						setShowGenerationStatusModal(false);
					}}
					prompts={[['✍️ Writing scripts for you...', 12]]}
				></GenerationStatusProgressModal>
			)}
		</div>
	);
}
