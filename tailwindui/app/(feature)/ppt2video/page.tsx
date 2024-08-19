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
import AddResourcesSection from '@/components/summary/AddResourcesSection';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import useTourStore from '@/components/user_onboarding/TourStore';
import { Column } from '@/components/layout/Column';
import { GenerationStatusProgressModal } from '@/components/ui/GenerationStatusProgressModal';

export default function Topic() {
	const { token, isPaidUser, updateCreditsFE } = useUser();
	const {
		project,
		bulkUpdateProject,
		initProject,
	} = useProject();

	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);
	const [resourcesErrorMessage, setResourcesErrorMessage] = useState('');

	const [selectedResources, setSelectedResources] = useState<Resource[]>(
		project?.resources || [],
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

	const handleGenerationStatusModal = () => {
		// console.log('user Research Modal toggled');
		setShowGenerationStatusModal(!showGenerationStatusModal);
	};

	const removeResourceAtIndex = (
		indexToRemove: number,
	) => {
		setSelectedResources((currentResources) =>
			currentResources.filter((_, index) => index !== indexToRemove),
		);
	};

	useEffect(() => {
		if (isSubmitting) {
			handleSubmit();
		}
	}, [isSubmitting]);

	const handleSubmit = async () => {};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='relative'>
			<PaywallModal
				showModal={showPaymentModal}
				setShowModal={setShowPaymentModal}
				message='You need more ⭐️credits'
				showReferralLink={true}
				trigger='summary/credits'
			/>

			<ToastContainer />
			{showGenerationStatusModal && (
				<GenerationStatusProgressModal
					onClick={handleGenerationStatusModal}
					prompts={[['📝 Writing outlines for your slides...', 20]]}
				></GenerationStatusProgressModal>
			)}

			<FileUploadModal
				selectedResources={selectedResources}
				setSelectedResources={setSelectedResources}
				showModal={showFileModal}
				setShowModal={setShowFileModal}
				pageInvoked={'ppt2video'}
			/>

			{/* project progress section */}
			<WorkflowStepsBanner
				currentIndex={0}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={isPaidUser}
				nextIsPaidFeature={false}
				nextText={
					!isSubmitting ? `Preview Slides (20⭐️)` : 'Generating Preview...'
				}
				onClickNext={handleGenerationStatusModal}
			/>

			{/* main content */}
			<Column>
				{/* Project Summary section */}
				<AddResourcesSection
					setShowFileModal={setShowFileModal}
					selectedResources={selectedResources}
					setSelectedResources={setSelectedResources}
					removeResourceAtIndex={removeResourceAtIndex}
					generationMode='ppt2video'
					setGenerationMode={undefined}
					errorMessage={resourcesErrorMessage}
					setErrorMessage={setResourcesErrorMessage}
				/>
			</Column>
		</div>
	);
}
