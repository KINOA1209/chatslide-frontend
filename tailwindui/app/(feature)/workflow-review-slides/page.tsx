'use client';

import React, { useRef, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import FeedbackButton from '@/components/ui/feedback';
import SlideVisualizer from '@/components/slides/SlideVisualizer';
import { ToastContainer } from 'react-toastify';
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner';
import { useUser } from '@/hooks/use-user';
import MyCustomJoyride from '@/components/user_onboarding/MyCustomJoyride';
import StepsSlidesPage from '@/components/user_onboarding/StepsSlidesPage';
export default function WorkflowStep3() {
	const contentRef = useRef<HTMLDivElement>(null);
	const { isPaidUser } = useUser();
	const [isGpt35, setIsGpt35] = useState(
		typeof sessionStorage !== 'undefined'
			? JSON.parse(sessionStorage.getItem('isGpt35') || 'true')
			: true,
	);

	const [isSubmitting, setIsSubmitting] = useState(false);

	// set current page to local storage
	useEffect(() => {
		localStorage.setItem('currentWorkflowPage', 'SlidesPage');
	}, []);
	return (
		<div className='min-h-[90vh] w-full bg-white'>
			{/* flex col container for steps, title, etc */}
			<MyCustomJoyride steps={StepsSlidesPage()} />
			<WorkflowStepsBanner
				currentIndex={2}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={isPaidUser}
				contentRef={contentRef}
				nextIsPaidFeature={true}
				nextText={!isSubmitting ? 'Write Scripts' : 'Writing Scripts'}
				showGPTToggle={true}
				setIsGpt35={setIsGpt35}
			/>

			<ToastContainer enableMultiContainer containerId={'slides'} />

			<div
				className={`max-w-4xl px-6 flex flex-col relative mx-auto`}
				ref={contentRef}
			>
				{/* slides */}
				<SlideVisualizer
					isGpt35={isGpt35}
					isSubmitting={isSubmitting}
					setIsSubmitting={setIsSubmitting}
				/>
			</div>

			<FeedbackButton timeout={30000} />
		</div>
	);
}
