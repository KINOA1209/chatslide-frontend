'use client';

import React, { useState, useRef, useEffect, Fragment } from 'react';
import ContentWithImageImg from '@/public/images/summary/content_with_image.png';
import ContentOnlyImg from '@/public/images/summary/content_only.png';
import 'react-toastify/dist/ReactToastify.css';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { ToastContainer } from 'react-toastify';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit';

import Resource from '@/models/Resource';
import ImageSelector from './ImageSelector';
import RadioButton, { RadioButtonOption } from '@/components/ui/RadioButton';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import Card from '@/components/ui/Card';
import ActionsToolBar from '@/components/ui/ActionsToolBar';
import useTourStore from '@/components/user_onboarding/TourStore';
import TemplateSelector from './TemplateSelector';
import { BigTitle, Explanation, Title } from '@/components/ui/Text';
// const { changeTemplate } = useSlides();


export default function DesignPage() {
	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const [template, setTemplate] = useState('Business_002' as string);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isGpt35, setIsGpt35] = useState(true);
	const { outlines } = useProject();

	const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
		typeof window !== 'undefined' && sessionStorage.selectedLogo != undefined
			? JSON.parse(sessionStorage.selectedLogo)
			: [],
	);
	const [selectedBackground, setSelectedBackground] = useState<Resource[]>([]);

	const [imageAmount, setImageAmount] = useState('content_with_image');
	const imageAmountOptions: RadioButtonOption[] = [
		{
			img: ContentWithImageImg,
			value: 'content_with_image',
			text: 'More images(70% decks contain images)',
		},
		{
			img: ContentOnlyImg,
			value: 'content_only',
			text: 'Less images(30% decks contain images)',
		},
	];

	const [imageLicense, setImageLicense] = useState('all');
	const imageLicenseOptions: RadioButtonOption[] = [
		{
			value: 'all',
			text: 'All',
		},
		{
			value: 'commercial',
			text: 'Commercial',
		},
		{
			value: 'creative',
			text: 'Creative Commons',
		},
	];

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='relative'>
			{/* user tutorial */}
			<div className='absolute right-[3rem] top-[7rem] flex flex-col items-end space-x-4'>
				<ActionsToolBar startTour={startTour} onlyShowTutorial={true} />
			</div>
			<ToastContainer />

			<WorkflowStepsBanner
				currentIndex={2}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				nextIsPaidFeature={false}
				nextText={!isSubmitting ? 'Create Slides' : 'Creating Slides'}
			/>

			<GenerateSlidesSubmit
				outlines={outlines}
				isGPT35={isGpt35}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				template={template}
				imageAmount={imageAmount}
				imageLicense={imageLicense}
				logo_ids={selectedLogo.map((resource) => resource.id)}
				background_ids={selectedBackground.map((resource) => resource.id)}
			/>

			<div className='w-full flex flex-col items-center'>
				{/* design */}
				<div
					className='supp_container w-full lg:w-2/3 px-3 my-3 lg:my-1 font-creato-regular'
					id='SummaryStep-4'
				>
					<Card>
						<BigTitle>Design</BigTitle>
						<Explanation>
							Customize the design for your slide, you can also skip this step
							and use the default
						</Explanation>
						{/* tempalte */}
						<TemplateSelector template={template} setTemplate={setTemplate} />
						{/* images */}
						<div>
							<span className='text-md font-bold'>
								How many images do you want to generate?
							</span>
							<RadioButton
								options={imageAmountOptions}
								selectedValue={imageAmount}
								setSelectedValue={setImageAmount}
								name='imageAmount'
							/>
						</div>
						<div>
							<span className='text-md font-bold'>
								What online image lincese do you want to use?
							</span>
							<RadioButton
								options={imageLicenseOptions}
								selectedValue={imageLicense}
								setSelectedValue={setImageLicense}
								name='imageLicense'
							/>
						</div>
						{/* logo */}
						<ImageSelector
							type='logo'
							selectedImage={selectedLogo}
							setSelectedImage={setSelectedLogo}
						/>
						{/* background */}
						<ImageSelector
							type='background'
							selectedImage={selectedBackground}
							setSelectedImage={setSelectedBackground}
						/>
					</Card>
				</div>
			</div>
		</div>
	);
}
