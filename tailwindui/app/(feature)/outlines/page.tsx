'use client';

import React, { useState, useRef, useEffect, Fragment } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import OutlineVisualizer from '@/components/outline/OutlineVisulizer';
import { useRouter, useSearchParams } from 'next/navigation';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { ToastContainer } from 'react-toastify';
import MyCustomJoyride from '@/components/user_onboarding/MyCustomJoyride';
import StepsOutlinePage from '@/components/user_onboarding/StepsOutlinePage';
import { useProject } from '@/hooks/use-project';
import ActionsToolBar from '@/components/ui/ActionsToolBar';
import useTourStore from '@/components/user_onboarding/TourStore';
import useHydrated from '@/hooks/use-hydrated';
import { addIdToRedir } from '@/utils/redirWithId';
import { Blank, Loading } from '@/components/ui/Loading';
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit';
import OutlinePageView from '@/components/outline/OutlinePageView';
import { useUser } from '@/hooks/use-user';
import Project from '@/models/Project';
import { CardReviewIcon, PageReviewIcon } from '@/components/outline/OutlineIcons';
import { convertOutlineToPlainText, convertPlainTextToOutlines } from '@/components/outline/OutlineUtils';
import { BigTitle, Instruction, Explanation } from '@/components/ui/Text';
import { Column } from '@/components/layout/Column';
import Toggle from '@/components/button/Toggle';
import { WrappableRow } from '@/components/layout/WrappableRow';
import Card from '@/components/ui/Card';

export type OutlineViewMode = 'card' | 'page';

export default function WorkflowStep2() {
	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const [isGpt35, setIsGpt35] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const { project, outlines, updateOutlines, bulkUpdateProject } = useProject();
	const [viewMode, setViewMode] = useState<OutlineViewMode>('card');
	const [outlinesPlainText, setOutlinesPlainText] = useState<string>('');
	const { token } = useUser();
	const language = project?.language || 'English'
	const [loading, setLoading] = useState(false);
	//keep track of whether the text in the page view has been modified or not
	const [textModified, setTextModified] = useState(false);

	const params = useSearchParams();
	const fetchData = async () => {
		setLoading(true);
		try {
			const convertedOutlineJSON = await convertPlainTextToOutlines(
				token,
				outlinesPlainText,
				language,
				isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
			);
			updateOutlines(Object.values(JSON.parse(convertedOutlineJSON.data.outlines)));
			bulkUpdateProject({
				outlines: convertedOutlineJSON.data.outlines
			} as Project)
		} catch (error) {
			console.error('Failed to convert plain text to outlines:', error);
		} finally {
			setLoading(false)
		}
	}

	if (!project) {
		if (params.get('id')) {
			router.push(`/project/${params.get('id')}`);
		}
		return <Blank>Project not found</Blank>;
	}

	// set current page to local storage
	useEffect(() => {
		if (typeof window !== 'undefined' && localStorage) {
			localStorage.setItem('currentWorkflowPage', 'OutlinePage');
		}
	}, []);

	useEffect(() => {
		if (isSubmitting) {
			if (outlines) {
				router.push(addIdToRedir('/design'));
			}
		}
	}, [isSubmitting]);

	useEffect(() => {
		if (viewMode === 'page') {
			const plainText = convertOutlineToPlainText(outlines);
			setOutlinesPlainText(plainText);
			setLoading(false);
		}
		else if (viewMode === 'card' && outlinesPlainText !== '' && textModified) {
			fetchData();
			setTextModified(false);
		}
	}, [viewMode]);

	// Function to scroll to a specific section
	const scrollToSection = (sectionId: number) => {
		const sectionElement = document.getElementById(String(sectionId));
		if (sectionElement) {
			const offset = 240; // Adjust this value based on your rem size
			const elementPosition = sectionElement.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	if (!outlines || !outlines.length) {
		return <></>;
	}
	return (
		<div className='relative'>
			{/* user tutorial */}
			<div className='absolute right-[1rem] top-[8em] sm:top-[6rem] flex flex-col items-end space-x-4'>
				<ActionsToolBar startTour={startTour} onlyShowTutorial={true} />
			</div>
			<MyCustomJoyride steps={StepsOutlinePage()} />
			{/* flex col container for steps, title, generate slides button etc */}
			<ToastContainer />

			<GenerateSlidesSubmit
				outlines={outlines}
				outlinesPlainText={outlinesPlainText}
				isGPT35={isGpt35}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				viewMode={viewMode}
			/>

			<WorkflowStepsBanner
				currentIndex={1}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				nextIsPaidFeature={false}
				nextText={!isSubmitting ? 'Select Design' : 'Select Design'}
			/>
			<div className='flex flex-col mb-[3rem]'>

				<Column>
						<WrappableRow type='flex' justify='around'>
							<div className='flex flex-col gap-2'>
								<BigTitle>🗒️ Outline</BigTitle>
								{/* <Instruction>Modify this outline until you're satisfied.</Instruction> */}
								<Explanation>Around {outlines.length * 3} slide pages total.</Explanation>
							</div>
							<Toggle
								isLeft={viewMode === 'card'}
								setIsLeft={(value: boolean) => setViewMode(value ? 'card' : 'page')}
								leftElement={<><CardReviewIcon color={`${viewMode === 'card' ? '#5168F6' : '#707C8A'}`} />Card View</>}
								rightElement={<><PageReviewIcon color={`${viewMode === 'page' ? '#5168F6' : '#707C8A'}`} />Page View</>}
							/>
						</WrappableRow>
					{loading ? (
						<Loading />
					) : (
						<div className='w-full gap-10 auto-rows-min'>
							<div className='flex flex-col'>
								{/* only trigger re-render after data is fetched */}
								{viewMode === 'card' ? (
									<OutlineVisualizer
										outlineData={outlines}
										setOutlineData={updateOutlines}
										isGPT35={isGpt35}
									/>
								) : (
									<OutlinePageView
										outlinesPlainText={outlinesPlainText}
										setOutlinesPlainText={setOutlinesPlainText}
										isGPT35={isGpt35}
										setTextModified={setTextModified}
									/>
								)}

							</div>
						</div>
					)}
				</Column>
			</div>
		</div >
	);
}
