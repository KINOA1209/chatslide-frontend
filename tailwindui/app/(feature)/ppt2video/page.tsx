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
import ProjectService from '@/services/ProjectService';
import Project from '@/models/Project';
import { useSlides } from '@/hooks/use-slides';
import SlidesService from '@/services/SlidesService';
import { addIdToRedir } from '@/utils/redirWithId';

export default function Topic() {
	const { token, isPaidUser, updateCreditsFE } = useUser();
	const { project, bulkUpdateProject, initProject } = useProject();
  const { initSlides } = useSlides();

	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);
	const [resourcesErrorMessage, setResourcesErrorMessage] = useState('');

	const [selectedResources, setSelectedResources] = useState<Resource[]>(
		project?.resources || [],
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

  const router = useRouter();

	const handleGenerationStatusModal = () => {
		// console.log('user Research Modal toggled');
		setShowGenerationStatusModal(!showGenerationStatusModal);
	};

	const removeResourceAtIndex = (indexToRemove: number) => {
		setSelectedResources((currentResources) =>
			currentResources.filter((_, index) => index !== indexToRemove),
		);
	};

	useEffect(() => {
		if (isSubmitting) {
			handleSubmit();
		}
	}, [isSubmitting]);

	const handleSubmit = async () => {
    if (selectedResources.length == 0) {
      toast.error("Please select at least one file.");
      setIsSubmitting(false);
      setShowGenerationStatusModal(false);
      return;
    } else if (selectedResources.length > 1) {
      toast.error("Please select only one file.");
      setIsSubmitting(false);
      setShowGenerationStatusModal(false);
      return;
    } 
    
		setShowGenerationStatusModal(true);
		const selectedResourceIds = selectedResources.map(
			(resource) => resource.id,
		);
		try {
      updateCreditsFE(-20);

			const data = await SlidesService.ppt2slides(
				selectedResourceIds,
				'',
				token,
			);
      const slides = data.slides;
      const project_id = data.project_id;
      const project_name = data.project_name;
      const foldername = data.foldername;

      initProject({
				id: project_id,
				name: project_name,
        foldername: foldername,
				content_type: 'ppt2video',
        language: 'English',
        presentation_slides: JSON.stringify(slides),
        has_scripts: false,
        resources: selectedResources,
			} as Project);

      const parsedSlides = ProjectService.parseSlides(JSON.stringify(slides));
      
      console.log('parsed slides: ', parsedSlides);
      initSlides(parsedSlides);

      router.push(addIdToRedir('slides', project_id));

		} catch (error) {
			if (error instanceof Error) {
        console.log('error during ppt2video: ', error);
				toast.error(error.message);
			} else {
        console.log('error during ppt2video: ', error);
				toast.error('An unknown error occurred');
			}
		}
    setIsSubmitting(false);
    setShowGenerationStatusModal(false);
	};

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
        contentType='ppt2video'
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
