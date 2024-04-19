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
import { Blank } from '@/components/ui/Loading';
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit';
import OutlinePageView from '@/components/outline/OutlinePageView';
import { useUser } from '@/hooks/use-user';
import Project from '@/models/Project';
import { CardReviewIcon, PageReviewIcon } from '@/components/outline/OutlineIcons';
import { convertOutlineToPlainText, convertPlainTextToOutlines } from '@/components/outline/OutlineUtils';

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
			<div className='absolute right-[3rem] top-[7rem] flex flex-col items-end space-x-4'>
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
				{/* overview nav section */}
				{/* <div className='w-1/4 fixed top-[150px] overflow-y-auto flex justify-center'>
					<div className='OutlineStep-4 w-2/3 bg-neutral-50 rounded-md border border-gray-200 hidden sm:block'>
						<div className='h-5 text-neutral-900 text-xs font-bold font-creato-medium leading-tight tracking-wide px-4 py-3'>
							OVERVIEW
						</div>
						<ol className='list-none px-4 py-4'>
							{outlines?.map((section, index) => (
								<li
									className='pb-2 opacity-60 text-neutral-900 text-s tracking-wider font-medium font-creato-medium leading-normal tracking-tight cursor-pointer hover:text-black  hover:rounded-md hover:bg-gray-200'
									key={index}
									onClick={() => scrollToSection(index)}
								>
									<span className=''>
										{index + 1}. {section.title}
									</span>
								</li>
							))}
						</ol>
					</div>
				</div> */}
				<div className='toggle flex justify-center mt-4 items-center font-creato-medium'>
					<div className='flex items-center rounded-md border bg-gray-200 px-0.5 py-0.5 my-1'>
						<div
							className={`cursor-pointer w-[130px] h-[36px] px-2 py-1 flex justify-center items-center rounded-md ${viewMode === 'card' ? 'bg-white text-[#5168F6]' : ''}`}
							onClick={() => setViewMode('card')}
						>
							<div
								className={`flex flex-row gap-2 text-[16px] font-medium break-words items-center justify-center
										   ${viewMode === 'card' ? 'text-[#5168F6]' : 'text-[#707C8A]'}
										  `}
							>
								<CardReviewIcon color={`${viewMode === 'card' ? '#5168F6' : '#707C8A'}`} />Card View
							</div>
						</div>
						<div
							className={`cursor-pointer w-[130px] h-[36px] px-2 py-1 flex justify-center items-center rounded-md ${viewMode === 'page' ? 'bg-white text-[#5168F6]' : ''}`}
							onClick={() => setViewMode('page')}
						>
							<div
								className={`flex flex-row gap-2 text-[16px] font-medium break-words items-center justify-center
								           ${viewMode === 'page' ? 'text-[#5168F6]' : 'text-[#707C8A]'}
										  `}
							>
								<PageReviewIcon color={`${viewMode === 'page' ? '#5168F6' : '#707C8A'}`} />Page View
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col items-center justify-center'>
					<div className='flex flex-col font-creato-medium items-center justify-start w-full sm:w-1/2 gap-3'>
						<div className='w-full flex flex-row items-baseline justify-start'>
							<span className='text-2xl font-bold'>Outline&nbsp;</span>
							<span className='text-sm text-[#707C8A]'>(modify this outline until you're satisfied)</span>
						</div>
						<span className='w-full text-base'>{outlines.length} slides total</span>
					</div>
					{loading ? (
						<div>Loading...</div>
					) : (
						<div className='w-full sm:w-2/3 gap-10 auto-rows-min'>
							<div className='lg:col-span-2 flex flex-col'>
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
				</div>
			</div>
		</div>
	);
}
