'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import 'react-toastify/dist/ReactToastify.css';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import PaywallModal from '@/components/paywallModal';
import Resource from '@/models/Resource';
import { toast, ToastContainer } from 'react-toastify';
import FileUploadModal from '@/components/file/FileUploadModal';
import { useUser } from '@/hooks/use-user';
import { Step } from 'react-joyride';
import MyCustomJoyride from '@/components/user_onboarding/MyCustomJoyride';
import StepsSummaryPage from '@/components/user_onboarding/StepsSummaryPage';
import { GPTToggleWithExplanation } from '@/components/button/WorkflowGPTToggle';
import AddResourcesSection from '@/components/summary/AddResourcesSection';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import ActionsToolBar from '@/components/ui/ActionsToolBar';
import useTourStore from '@/components/user_onboarding/TourStore';
import Card from '@/components/ui/Card';
import {
	BigTitle,
	ErrorMessage,
	Explanation,
	ExplanationPopup,
	Instruction,
	WarningMessage,
} from '@/components/ui/Text';
import { DropDown } from '@/components/button/DrlambdaButton';
import ResourceService from '@/services/ResourceService';
import LanguageSelector from '../../../components/language/LanguageSelector';
import { Column } from '@/components/layout/Column';
import { addIdToRedir } from '@/utils/redirWithId';
import TopicSuggestions from '@/components/language/TopicSuggestions';
import { getUserCountryCode, getUserLanguage } from '@/utils/userLocation';
import Project from '@/models/Project';
import { GenerationStatusProgressModal } from '@/components/ui/GenerationStatusProgressModal';
import TextareaAutosize from 'react-textarea-autosize';
import slides_scenarios from './../scenario-choice/slides_scenarios.json';
import RangeSlider from '@/components/ui/RangeSlider';
import GenModeToggle from '@/components/summary/GenModeToggle';
import { WrappableRow } from '@/components/layout/WrappableRow';
import { InputBox } from '@/components/ui/InputBox';
import RadioButton from '@/components/ui/RadioButton';

const MAX_TOPIC_LENGTH = 3000;
const MIN_TOPIC_LENGTH = 3;

const audienceDict = {
	Business_Prospects: '🤝 Business Prospects',
	Business_Clients: '💼 Business Clients',
	Office_Colleagues: '👔 Coworkers',
	Researchers: '🔬 Researchers',
	Students: '📚 Students',
	Video_Viewers: '📱 Video Viewers',
	Community_Members: '🏘️ Community Members',
	Myself: '🧑‍💻 Myself',
};

const getAudienceFromScenario = (scenarioType: string) => {
	return (
		slides_scenarios.options.find((scenario) => scenario.id === scenarioType)
			?.audience || 'Business_Clients'
	);
};

const getStructureFromScenario = (scenarioType: string) => {
	return (
		slides_scenarios.options.find((scenario) => scenario.id === scenarioType)
			?.structure || 'Introduction, background, details, examples, conclusion.'
	);
};

const AdvancedOptions: React.FC<{
	outlineStructure: string;
	setOutlineStructure: (value: string) => void;
	selectedResources: Resource[];
	pageCountEst: number;
	setPageCountEst: (value: number) => void;
	structureMode: string;
	setStructureMode: (value: string) => void;
  addCitations: string;
  setAddCitations: (value: string) => void;
}> = ({
	outlineStructure,
	setOutlineStructure,
	selectedResources,
	pageCountEst,
	setPageCountEst,
	structureMode,
	setStructureMode,
  addCitations,
  setAddCitations,
}) => {
	return (
		<>
			<div>
				<Instruction>Outline Structure</Instruction>

				<RadioButton
					name='outline_structure_mode'
					options={[
						{ value: 'custom', text: 'General Structure' },
						{ value: 'my_outline', text: 'Detailed Outline' },
						{
							value: 'follow_resource',
							text: 'Structure of a source',
						},
					]}
					selectedValue={structureMode}
					setSelectedValue={setStructureMode}
				/>

				{structureMode === 'custom' ? (
					<>
						<Explanation>
							If you have a rough idea about the outline you want, you can put
							it here. We will write the outline based on this structure and the
							number of pages you want.
						</Explanation>
						<InputBox>
							<input
								id='outline_structure'
								key='outline_structure'
								type='text'
								className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800'
								placeholder='Introduction, background, details, examples, conclusion.'
								value={outlineStructure}
								onChange={(e) => setOutlineStructure(e.target.value)}
							/>
						</InputBox>
					</>
				) : structureMode === 'my_outline' ? (
					<WarningMessage>
						If you already have a detailed outline ready, we will not generate
						outlines for you. But you can write your own outline in the next
						step. The number of slide pages will depend on the length of the
						outline you provided in the next step.
					</WarningMessage>
				) : selectedResources.length == 0 ? ( // my_resource
					<WarningMessage>Add a source to enable this feature.</WarningMessage>
				) : (
					<>
						<Explanation>
							If you want the outline to follow the source you uploaded, select
							one source here.
						</Explanation>
						<DropDown width='20rem'>
							{selectedResources.map((resource, index) => (
								<option key={index} value={resource.id}>
									{resource.name.replace('.txt', '').replaceAll('_', ' ')}
								</option>
							))}
						</DropDown>
					</>
				)}
			</div>

			{structureMode !== 'my_outline' && (
				<div className='w-full gap-2 flex flex-col sm:grid sm:grid-cols-2'>
					<div>
						<Instruction>Estimated Number of Pages: {pageCountEst}</Instruction>
						<Explanation>
							A rough estimate of the number of slides you will need. <br />
							Decks with more than 20 pages will cost more ⭐️ credits.
						</Explanation>
						<div className='w-[80%]'>
							<RangeSlider
								onChange={(value: number) => {
									if (value != 0) setPageCountEst(value);
								}}
								value={pageCountEst}
								minValue={5}
								choices={[0, 5, 10, 15, 20, 25, 30, 35, 40]}
							/>
						</div>
						<Explanation>
							Roughly {Math.round(pageCountEst / 3 + 0.5)} sections,{' '}
							{pageCountEst} pages of slides, and {Math.round(pageCountEst / 3)}{' '}
							minutes if you generate video.
						</Explanation>
					</div>
				</div>
			)}

			{/* add citation */}
			<div>
				<Instruction>
					Do you want to add a citations page for the sources?
				</Instruction>
				<RadioButton
					name='add_citations'
					options={[
						{ value: 'no', text: 'No' },
						{ value: 'yes', text: 'Yes' },
					]}
					selectedValue={addCitations}
					setSelectedValue={setAddCitations}
				/>
			</div>
		</>
	);
};

export default function Topic() {
	const {
		isTourActive,
		startTour,
		setIsTourActive,
		isNextEnabled,
		setIsNextEnabled,
	} = useTourStore();
	const router = useRouter();
	const { token, isPaidUser, updateCreditsFE } = useUser();
	const {
		project,
		updateOutlines,
		updateProject,
		bulkUpdateProject,
		initProject,
	} = useProject();

	const scenarioType = project?.scenario_type || 'general';
	const [generationMode, setGenerationMode] = useState<
		'from_topic' | 'from_files'
	>('from_topic');

	const [topic, setTopic] = useState(project?.topic || '');
	const [audience, setAudience] = useState(
		project?.audience || getAudienceFromScenario(scenarioType),
	);
	const [language, setLanguage] = useState(project?.language || ''); // will be updated later depending on user's location
	const [selectedResources, setSelectedResources] = useState<Resource[]>(
		project?.resources || [],
	);
	const [searchOnlineScope, setSearchOnlineScope] = useState('');

	const [isGpt35, setIsGpt35] = useState(true);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [summarizing, setSummarizing] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);
	const [topicError, setTopicError] = useState('');
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [addCitations, setAddCitations] = useState('no');

	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

	const [pageCountEst, setPageCountEst] = useState(15);

	const [advancedMode, setAdvancedMode] = useState(false);
	const [outlineStructure, setOutlineStructure] = useState(
		getStructureFromScenario(scenarioType),
	);
	const [structureMode, setStructureMode] = useState('custom');

	const handleGenerationStatusModal = () => {
		// console.log('user Research Modal toggled');
		setSummarizing(true);
		setShowGenerationStatusModal(!showGenerationStatusModal);
	};
	const tourSteps: Step[] = [
		{
			target: '.first-element',
			content: 'This is the first element!',
		},
		// Add more steps as needed
	];

	useEffect(() => {
		if (!language) {
			getUserLanguage().then((language) => {
				setLanguage(language);
			});
		}
	}, []);

	const updateTopic = (topic: string) => {
		if (topic.length < MIN_TOPIC_LENGTH) {
			setIsNextEnabled(false);
			setTopicError(
				`Please enter at least ${MIN_TOPIC_LENGTH} characters, or use "Files First" option.`,
			);
		}
		if (topic.length >= MIN_TOPIC_LENGTH) {
			setIsNextEnabled(true);
			setTopicError('');
			setTopic(topic);
		}
		if (topic.length > MAX_TOPIC_LENGTH) {
			setTopic(topic.slice(0, MAX_TOPIC_LENGTH));
			setIsNextEnabled(true);
		} else {
			setTopic(topic);
		}
	};

	function getCreditCost() {
		if (pageCountEst > 20) {
			return pageCountEst;
		}
		return 20;
	}

	function getEstWriteOutlineTime() {
		const base = isGpt35 ? 10 : 20;
		return Math.min(30, base + selectedResources.length * 5);
	}

	useEffect(() => {
		if (isSubmitting) {
			handleSubmit();
		}
	}, [isSubmitting]);

	const handleSubmit = async () => {
		console.log('submitting');
		if (generationMode === 'from_topic' && topic.length < MIN_TOPIC_LENGTH) {
			setTopicError(
				`Please enter at least ${MIN_TOPIC_LENGTH} characters, or use "Files First" option.`,
			);
			toast.error(
				`Please enter at least ${MIN_TOPIC_LENGTH} characters for topic, or use "Files First" option.`,
			);
			setIsSubmitting(false);
			setShowGenerationStatusModal(false);
			return;
		}

		const project_id = project?.id || '';
		const knowledge_summary = project?.knowledge_summary || '';
		setIsSubmitting(true);

		const formData = {
			topic: topic,
			audience: audience,
			language: language,
			project_id: project_id,
			resources: selectedResources.map((resource: Resource) => resource.id),
			model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
			//schoolTemplate: schoolTemplate,
			scenario_type: scenarioType,
			generation_mode: generationMode,
			search_online: searchOnlineScope,
			knowledge_summary: knowledge_summary,
			section_count: Math.round(pageCountEst / 3),
			credit_cost: Math.max(20, pageCountEst),
			structure_mode: structureMode,
			outline_structure: structureMode === 'custom' ? outlineStructure : '',
		};

		bulkUpdateProject({
			topic: topic,
			audience: audience,
			language: language,
			resources: selectedResources,
			scenario_type: scenarioType,
			search_online: searchOnlineScope,
			knowledge_summary: knowledge_summary,
			add_citations: addCitations === 'yes',
		} as Project);

		// if needs to summarize resources
		if (selectedResources?.length > 0 || searchOnlineScope) {
			setSummarizing(true); // should already be set to true
			try {
				console.log('resources', selectedResources);
				console.log('summarizing resources');
				const response = await ResourceService.summarizeResource(
					project_id,
					selectedResources.map((r: Resource) => r.id),
					topic,
					audience,
					language,
					token,
					searchOnlineScope,
					scenarioType,
					undefined, // post_style
				);
				formData.knowledge_summary = response.data.knowledge_summary;
				formData.project_id = response.data.project_id;

				bulkUpdateProject({
					knowledge_summary: response.data.knowledge_summary,
					id: response.data.project_id,
				} as Project);

				console.log('knowledge_summary', response.data.knowledge_summary);
			} catch (error) {
				console.error('Error summarizing resources', error);
			}
			setSummarizing(false);
		} else {
			console.log('no need to summarize resources');
			setSummarizing(false);
		}

		try {
			const response = await fetch('/api/outlines', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const outlinesJson = await response.json();
				setIsSubmitting(false);
				// Handle the response data here
				console.log(outlinesJson);

				updateOutlines(Object.values(JSON.parse(outlinesJson.data.outlines)));
				bulkUpdateProject({
					topic: outlinesJson.data.topic,
					id: outlinesJson.data.id,
					foldername: outlinesJson.data.foldername,
					pdf_images: outlinesJson.data.pdf_images,
					outlines: outlinesJson.data.outlines,
				} as Project);

				updateCreditsFE(-20);

				// Redirect to a new page with the data, and id in the query string
				router.push(addIdToRedir('outlines', outlinesJson.data.id));
			} else if (response.status == 402) {
				setShowPaymentModal(true);
				setShowGenerationStatusModal(false);
				setIsSubmitting(false);
			} else {
				console.error('Error when generating outlines:', response.status);
				toast.error(
					'Server is busy now. Please try again later. Reference code: ' +
						project?.id,
				);
				setIsSubmitting(false);
				setShowGenerationStatusModal(false);
			}
		} catch (error) {
			console.error('Error:', error);
			setIsSubmitting(false);
			setShowGenerationStatusModal(false);
		}
	};

	// set current page to local storage
	useEffect(() => {
		if (typeof window !== 'undefined' && localStorage) {
			localStorage.setItem('currentWorkflowPage', 'SummaryPage');
		}
	}, []);

	const removeResourceAtIndex = (indexToRemove: number) => {
		setSelectedResources((currentResources) =>
			currentResources.filter((_, index) => index !== indexToRemove),
		);
	};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='relative'>
			{/* user tutorial */}
			<div className='absolute right-[1rem] top-[8rem] sm:top-[6rem] flex flex-col items-end space-x-4'>
				<ActionsToolBar startTour={startTour} onlyShowTutorial={true} />
			</div>
			<MyCustomJoyride steps={StepsSummaryPage(isNextEnabled)} />
			<PaywallModal
				showModal={showPaymentModal}
				setShowModal={setShowPaymentModal}
				message='You need more ⭐️credits'
				showReferralLink={true}
			/>

			<ToastContainer />
			{showGenerationStatusModal &&
				(summarizing ? (
					<GenerationStatusProgressModal
						onClick={handleGenerationStatusModal}
						prompts={
							searchOnlineScope
								? [
										['🔍 Searching online...', 5],
										['📚 Reading your resources...', 25],
									]
								: [['📚 Reading your resources...', 30]]
						}
					></GenerationStatusProgressModal>
				) : (
					<GenerationStatusProgressModal
						onClick={handleGenerationStatusModal}
						prompts={[
							[
								'📝 Writing outlines for your slides...',
								getEstWriteOutlineTime(),
							],
						]}
					></GenerationStatusProgressModal>
				))}

			<FileUploadModal
				selectedResources={selectedResources}
				setSelectedResources={setSelectedResources}
				showModal={showFileModal}
				setShowModal={setShowFileModal}
				pageInvoked={'summary'}
			/>

			{/* project progress section */}
			<WorkflowStepsBanner
				currentIndex={0}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={isPaidUser}
				nextIsPaidFeature={false}
				nextText={
					!isSubmitting
						? `Write Outline (${getCreditCost()}⭐️)`
						: 'Writing Outline...'
				}
				handleClickingGeneration={handleGenerationStatusModal}
			/>

			{/* main content */}
			<Column>
				<div className='flex flex-row justify-center'>
					<GPTToggleWithExplanation setIsGpt35={setIsGpt35} />
				</div>

				{/* Project Summary section */}
				{generationMode === 'from_files' && (
					<AddResourcesSection
						setShowFileModal={setShowFileModal}
						selectedResources={selectedResources}
						setSelectedResources={setSelectedResources}
						removeResourceAtIndex={removeResourceAtIndex}
						isRequired
						generationMode='from_files'
						setGenerationMode={setGenerationMode}
					/>
				)}

				{/* text area section */}

				<Card id='SummaryStep-2'>
					{/* for tutorial step 1, the summary #SummaryStep-2 */}
					{/* title */}
					<div className='title1'>
						<WrappableRow type='flex' justify='between'>
							<BigTitle>💡 Summary</BigTitle>
							{generationMode === 'from_topic' && (
								<GenModeToggle
									generationMode={generationMode}
									setGenerationMode={setGenerationMode}
								/>
							)}
						</WrappableRow>
						{/* <p id='after1'>
								{' '}
								{generationMode === 'from_topic' ? '(Required)' : '(Optional)'}
							</p> */}
						<Explanation>
							To get started, give us some high-level intro about your project.
						</Explanation>
					</div>
					{generationMode === 'from_topic' && (
						<div>
							<div className='flex items-center gap-1'>
								<Instruction>Project Topic</Instruction>
								<ExplanationPopup>
									The main subject or theme of your project. It will set the
									direction and focus of the contents.
								</ExplanationPopup>
							</div>
							<div className='border border-2 border-gray-200 rounded-md min-h-[10rem] flex flex-col justify-between'>
								<TextareaAutosize
									onChange={(e: any) => updateTopic(e.target.value)}
									className='focus:ring-0 text-l md:text-l'
									id='topic'
									value={topic}
									maxLength={MAX_TOPIC_LENGTH}
									required
									placeholder='What do you have in mind?'
								></TextareaAutosize>
								{!topic && (
									<TopicSuggestions language={language} setTopic={setTopic} />
								)}
							</div>
							<Explanation>
								{/* if no char left, show red */}
								<div
									className={
										MAX_TOPIC_LENGTH - topic.length === 0 ? 'text-red-600' : ''
									}
								>
									{MAX_TOPIC_LENGTH - topic.length} characters left
								</div>
							</Explanation>
							<ErrorMessage>{topicError}</ErrorMessage>
						</div>
					)}

					{/* DropDown menu section */}
					<WrappableRow type='grid' cols={2}>
						<div className='flex flex-col'>
							<div className='flex flex-row gap-1 items-center'>
								<Instruction>Your Audience</Instruction>
								<ExplanationPopup>
									Specify the intended viewers of your projects, tailoring to
									your audience ensures the content resonates effectively.
								</ExplanationPopup>
							</div>
							<DropDown
								onChange={(e) => setAudience(e.target.value)}
								style='input'
								width='80%'
								value={audience}
							>
								<option key='unselected' value='unselected' disabled>
									Choose your audience
								</option>
								{Object.entries(audienceDict).map(([key, displayname]) => (
									<option key={key} value={key}>
										{displayname}
									</option>
								))}
							</DropDown>
						</div>
						<LanguageSelector language={language} setLanguage={setLanguage} />
					</WrappableRow>

					{!advancedMode ? (
						<Instruction>
							<div
								onClick={() => setAdvancedMode(true)}
								className='cursor-pointer text-blue-600'
							>
								Advanced Options
							</div>
						</Instruction>
					) : (
						<AdvancedOptions
							outlineStructure={outlineStructure}
							setOutlineStructure={setOutlineStructure}
							selectedResources={selectedResources}
							pageCountEst={pageCountEst}
							setPageCountEst={setPageCountEst}
							structureMode={structureMode}
							setStructureMode={setStructureMode}
              addCitations={addCitations}
              setAddCitations={setAddCitations}
						/>
					)}
				</Card>

				{/* supporting docs  section */}

				{generationMode === 'from_topic' && (
					<AddResourcesSection
						searchOnlineScope={searchOnlineScope}
						setSearchOnlineScope={setSearchOnlineScope}
						setShowFileModal={setShowFileModal}
						selectedResources={selectedResources}
						setSelectedResources={setSelectedResources}
						removeResourceAtIndex={removeResourceAtIndex}
					/>
				)}
			</Column>
		</div>
	);
}
