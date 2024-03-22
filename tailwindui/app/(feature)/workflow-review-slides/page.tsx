'use client';

import React, { useRef, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SlideVisualizer from '@/components/slides/SlideVisualizer';
import { ToastContainer } from 'react-toastify';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { useUser } from '@/hooks/use-user';
import MyCustomJoyride from '@/components/user_onboarding/MyCustomJoyride';
import StepsSlidesPage from '@/components/user_onboarding/StepsSlidesPage';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
export default function WorkflowStep3() {
	const { isPaidUser } = useUser();
	const { hasScripts } = useProject();
	const [isGpt35, setIsGpt35] = useState(
		typeof sessionStorage !== 'undefined'
			? JSON.parse(sessionStorage.getItem('isGpt35') || 'true')
			: true,
	);

	const [isSubmitting, setIsSubmitting] = useState(false);

	// set current page to local storage
	useEffect(() => {
		if (typeof window !== 'undefined' && localStorage) {
			localStorage.setItem('currentWorkflowPage', 'SlidesPage');
		}
	}, []);

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='h-full w-full flex flex-col relative'>
			{/* flex col container for steps, title, etc */}
			<MyCustomJoyride steps={StepsSlidesPage()} />
			<WorkflowStepsBanner
				currentIndex={3}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={isPaidUser}
				nextIsPaidFeature={true}
				nextText={!isSubmitting ? 'Write Scripts' : 'Writing Scripts'}
			/>

			<ToastContainer enableMultiContainer containerId={'slides'} />

			{/* slides */}
			<SlideVisualizer
				isGpt35={isGpt35}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				showScript={hasScripts}
			/>
		</div>
	);
}
