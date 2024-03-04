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
import SessionStorage from '@/components/utils/SessionStorage';
import AddResourcesSection from '@/components/AddResourcesSection';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import ActionsToolBar from '@/components/ui/ActionsToolBar';
import useTourStore from '@/components/user_onboarding/TourStore';
import Card from '@/components/ui/Card';
import {
	ErrorMessage,
	Explanation,
	ExplanationPopup,
	Instruction,
} from '@/components/ui/Text';
import { DropDown } from '@/components/button/DrlambdaButton';

const MAX_TOPIC_LENGTH = 128;
const MIN_TOPIC_LENGTH = 6;

const audienceList = [
	'Researchers',
	'Students',
	'Business Clients',
	'Office Colleagues',
	'Video Viewers',
	'Myself',
];

export default function Topic() {
	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);
	const { token } = useUser();
	const [topicError, setTopicError] = useState('');
	const [isGpt35, setIsGpt35] = useState(true);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [showAudienceInput, setShowAudienceInput] = useState(false);
	const { isPaidUser } = useUser();
	const { project, updateOutlines, updateProject, initProject } = useProject();
	const [searchOnlineScope, setSearchOnlineScope] = useState('none');

	// bind form data between input and sessionStorage
	const [topic, setTopic] = useState(
		typeof window !== 'undefined' && sessionStorage.topic != undefined
			? sessionStorage.topic
			: '',
	);
	const [audience, setAudience] = useState(
		typeof window !== 'undefined' && sessionStorage.audience != undefined
			? sessionStorage.audience
			: 'unselected',
	);
	const [language, setLanguage] = useState(
		typeof window !== 'undefined' && sessionStorage.language != undefined
			? sessionStorage.language
			: 'English',
	);
	const [selectedResources, setSelectedResources] = useState<Resource[]>(
		typeof window !== 'undefined' &&
			sessionStorage.selectedResources != undefined
			? JSON.parse(sessionStorage.selectedResources)
			: [],
	);
	const generationMode = SessionStorage.getItem(
		'generation_mode',
		'from_topic',
	);

	const tourSteps: Step[] = [
		{
			target: '.first-element',
			content: 'This is the first element!',
		},
		// Add more steps as needed
	];

	useEffect(() => {
		if (selectedResources.length > 0) {
			if (topic.length == 0) {
				setTopic(formatName(selectedResources[0].name));
			}
		}

		console.log('selectedResources', selectedResources);
	}, [selectedResources]);

	function formatName(name: string) {
		// remove file extension
		name = name.replace(/\.[^/.]+$/, '');

		if (name.length > MAX_TOPIC_LENGTH) {
			return name.slice(0, MAX_TOPIC_LENGTH - 3) + '...';
		}
		return name;
	}

	const updateTopic = (topic: string) => {
		if (topic.length >= MIN_TOPIC_LENGTH) {
			setTopicError('');
		}
		if (topic.length > MAX_TOPIC_LENGTH) {
			setTopic(topic.slice(0, MAX_TOPIC_LENGTH));
		} else {
			setTopic(topic);
		}
	};

	useEffect(() => {
		if (isSubmitting) {
			handleSubmit();
		}
	}, [isSubmitting]);

	const handleSubmit = async () => {
		console.log('submitting');
		if (generationMode === 'from_topic' && topic.length < MIN_TOPIC_LENGTH) {
			setTopicError(`Please enter at least ${MIN_TOPIC_LENGTH} characters.`);
			toast.error(
				`Please enter at least ${MIN_TOPIC_LENGTH} characters for topic.`,
			);
			setIsSubmitting(false);
			return;
		}

		const project_id = project?.id || '';

		const scenarioType =
			typeof window !== 'undefined' && sessionStorage.scenarioType != undefined
				? sessionStorage.scenarioType
				: '';

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
		};

		sessionStorage.setItem('topic', formData.topic);
		sessionStorage.setItem('audience', formData.audience);
		sessionStorage.setItem('language', formData.language);
		sessionStorage.setItem(
			'selectedResources',
			JSON.stringify(selectedResources),
		);
		//sessionStorage.setItem('schoolTemplate', schoolTemplate);

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

				// cookies doesn't work because it needs 'use server'
				// cookies().set("topic", outlinesJson.data.audience);

				// Store the data in session storage
				sessionStorage.setItem('topic', outlinesJson.data.topic);
				updateProject('topic', outlinesJson.data.topic);
				updateOutlines(Object.values(JSON.parse(outlinesJson.data.outlines)));
				sessionStorage.setItem('foldername', outlinesJson.data.foldername);
				updateProject('id', outlinesJson.data.id);
				updateProject('foldername', outlinesJson.data.foldername);
				updateProject('pdf_images', outlinesJson.data.pdf_images);
				updateProject('outlines', outlinesJson.data.outlines);
				// initProject(outlinesJson.data);
				sessionStorage.setItem(
					'pdf_images',
					JSON.stringify(outlinesJson.data.pdf_images),
				);

				// Redirect to a new page with the data
				router.push('workflow-edit-outlines');
			} else if (response.status == 402) {
				setShowPaymentModal(true);
				setIsSubmitting(false);
			} else {
				toast.error(
					'Server is busy now. Please try again later. Reference code: ' +
						project?.id,
				);
				setIsSubmitting(false);
			}
		} catch (error) {
			console.error('Error:', error);
			setIsSubmitting(false);
		}
	};

	// Show/hide audience input based on `audience` value
	useEffect(() => {
		if (audienceList.includes(audience)) {
			setShowAudienceInput(false);
		} else if (audience === 'unselected') {
			setShowAudienceInput(false);
		} else {
			setShowAudienceInput(true);
		}
	}, [audience]);

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
		<section>
			<MyCustomJoyride steps={StepsSummaryPage()} />
			{showPaymentModal && (
				<PaywallModal
					setShowModal={setShowPaymentModal}
					message='Upgrade for more ⭐️credits.'
					showReferralLink={true}
				/>
			)}

			<ToastContainer />

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
					!isSubmitting ? 'Write Outline (20⭐️)' : 'Writing Outline...'
				}
			/>

			{/* main content */}
			<div className='my-4 gap-y-4 w-full flex flex-col items-center relative'>
				{/* user tutorial */}
				<div className='absolute right-[3rem] top-[0rem] flex flex-col items-end space-x-4'>
					<ActionsToolBar startTour={startTour} onlyShowTutorial={true} />
				</div>
				<GPTToggleWithExplanation setIsGpt35={setIsGpt35} />

				{/* Project Summary section */}
				<div className='w-full lg:w-2/3 px-3 my-3 lg:my-1' id='SummaryStep-2'>
					{generationMode === 'from_files' && (
						<AddResourcesSection
							searchOnlineScope={searchOnlineScope}
							setSearchOnlineScope={setSearchOnlineScope}
							setShowFileModal={setShowFileModal}
							selectedResources={selectedResources}
							setSelectedResources={setSelectedResources}
							removeResourceAtIndex={removeResourceAtIndex}
						/>
					)}
					{/* text area section */}
					<Card>
						{/* title */}
						<div className='title1'>
							<p className='text-3xl'>Summary</p>
							<p id='after1'>
								{' '}
								{generationMode === 'from_topic' ? '(Required)' : '(Optional)'}
							</p>
							<Explanation>
								To get started, give us some high-level intro about your
								project.
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
								<div className='border border-2 border-gray-200 rounded-md'>
									<textarea
										onChange={(e) => updateTopic(e.target.value)}
										className='focus:ring-0 text-l md:text-xl'
										id='topic'
										value={topic}
										maxLength={MAX_TOPIC_LENGTH}
										required
										placeholder='How to use ultrasound to detect breast cancer'
									></textarea>
								</div>
								<Explanation>
									{MAX_TOPIC_LENGTH - topic.length} characters left
								</Explanation>
								<ErrorMessage>{topicError}</ErrorMessage>
							</div>
						)}

						{/* DropDown menu section */}
						<div className='w-full gap-2 flex flex-col sm:grid sm:grid-cols-2'>
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
									defaultValue='unselected'
								>
									<option key='unselected' value='unselected' disabled>
										Choose your audience
									</option>
									{audienceList.map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</DropDown>
							</div>
							<div className='flex flex-col'>
								<div className='flex flex-row gap-1 items-center'>
									<Instruction>Language</Instruction>
									<ExplanationPopup>
										Specify the intended language of your projects.
									</ExplanationPopup>
								</div>
								<DropDown
									onChange={(e) => setLanguage(e.target.value)}
									style='input'
									width='80%'
									defaultValue='English'
								>
									<option key='English' value='English'>
										🇺🇸 English (United States)
									</option>
									<option key='British English' value='British English'>
										🇬🇧 English (British)
									</option>
									<option key='Spanish' value='Spanish'>
										🌎 Español (Latinoamérica)
									</option>
									<option key='Continental Spanish' value='Continental Spanish'>
										🇪🇸 Español (España)
									</option>
									<option key='Chinese' value='Chinese'>
										🇨🇳 中文 (简体)
									</option>
									<option key='Traditional Chinese' value='Traditional Chinese'>
										🇹🇼 中文 (繁體)
									</option>
									<option key='French' value='French'>
										🇫🇷 Français
									</option>
									<option key='Russian' value='Russian'>
										🇷🇺 Русский
									</option>
									<option key='Ukrainian' value='Ukrainian'>
										🇺🇦 Українська
									</option>
									<option key='German' value='German'>
										🇩🇪 Deutsch
									</option>
									<option
										key='Brazilian Portuguese'
										value='Brazilian Portuguese'
									>
										🇧🇷 Português (Brasil)
									</option>
									<option key='Portuguese' value='Portuguese'>
										🇵🇹 Português
									</option>
									<option key='Hindi' value='Hindi'>
										🇮🇳 हिन्दी
									</option>
									<option key='Japanese' value='Japanese'>
										🇯🇵 日本語
									</option>
									<option key='Korean' value='Korean'>
										🇰🇷 한국어
									</option>
									<option key='Arabic' value='Arabic'>
										🇸🇦 العربية
									</option>
									<option key='Hebrew' value='Hebrew'>
										🇮🇱 עברית
									</option>
								</DropDown>
							</div>
						</div>
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
				</div>
			</div>
		</section>
	);
}
