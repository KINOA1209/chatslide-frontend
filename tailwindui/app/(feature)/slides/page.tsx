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
import { GenerationStatusProgressModal } from '@/components/ui/GenerationStatusProgressModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { Blank } from '@/components/ui/Loading';
export default function WorkflowStep3() {
	const { isPaidUser } = useUser();
	const { project } = useProject();
	const [isGpt35, setIsGpt35] = useState(true);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

	const params = useSearchParams();
	const router = useRouter();

	if (!project) {
		if (params.get('id')) {
			router.push(`/project/${params.get('id')}`);
		}
		return <Blank>Project not found</Blank>;
	}

	const handleGenerationStatusModal = () => {
		// console.log('user Research Modal toggled');
		setShowGenerationStatusModal(!showGenerationStatusModal);
	};
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
				handleClickingGeneration={handleGenerationStatusModal}
			/>

			<ToastContainer enableMultiContainer containerId={'slides'} />
			{showGenerationStatusModal && (
				<GenerationStatusProgressModal
					onClick={handleGenerationStatusModal}
					prompts={[['✍️ Writing the scripts based on your slides...', 5]]}
				></GenerationStatusProgressModal>
			)}
			{/* slides */}
			<SlideVisualizer
				isGpt35={isGpt35}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				showScript={project?.has_scripts || false}
			/>
		</div>
	);
}
