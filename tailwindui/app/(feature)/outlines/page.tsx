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

export default function WorkflowStep2() {
	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const [isGpt35, setIsGpt35] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const { outlines, updateOutlines } = useProject();

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

			<WorkflowStepsBanner
				currentIndex={1}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				nextIsPaidFeature={false}
				nextText={!isSubmitting ? 'Select Design' : 'Select Design'}
			/>

			<div className='mb-[3rem]'>
				{/* overview nav section */}
				<div className='w-1/4 fixed top-[150px] overflow-y-auto flex justify-center'>
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
				</div>
				<div className='flex justify-end'>
					<div className='w-full sm:w-2/3 gap-10 auto-rows-min'>
						<div className='lg:col-span-2 flex flex-col'>
							<OutlineVisualizer
								outlineData={outlines}
								setOutlineData={updateOutlines}
								isGPT35={isGpt35}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
