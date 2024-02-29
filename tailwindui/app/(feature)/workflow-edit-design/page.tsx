'use client';

import React, { useState, useRef, useEffect, Fragment } from 'react';
import ContentWithImageImg from '@/public/images/summary/content_with_image.png';
import ContentOnlyImg from '@/public/images/summary/content_only.png';
import 'react-toastify/dist/ReactToastify.css';
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner';
import { ToastContainer } from 'react-toastify';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit';
import { DropDown, SmallBlueButton } from '@/components/button/DrlambdaButton';
import Resource from '@/models/Resource';
import dynamic from 'next/dynamic';
import ImageSelector from './ImageSelector';
import RadioButton, { RadioButtonOption } from '@/components/ui/RadioButton';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import { image } from 'd3';
import Card from '@/components/ui/Card';
import ActionsToolBar from '@/components/ui/ActionsToolBar';
import useTourStore from '@/components/user_onboarding/TourStore';
// const { changeTemplate } = useSlides();

const SlideDesignPreview = dynamic(
	() => import('@/components/slides/SlideDesignPreview'),
	{
		ssr: false,
	},
);

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

			<div className='w-full flex flex-col items-center md:my-[6rem]'>
				{/* design */}
				<div
					className='supp_container w-full lg:w-2/3 px-3 my-3 lg:my-1 font-creato-regular'
					id='SummaryStep-4'
				>
          <Card>
						<div className='title2'>
							<p className='text-3xl'>Design</p>
							<p id='after2'> (Optional)</p>
						</div>
						<span className='text-md text-gray-500'>
							Customize the design for your slide, you can also skip this step
							and use the default
						</span>
						{/* school */}
						<div className='grid grid-cols-2 gap-x-4'>
							<div
								className={`transition-opacity duration-300 ease-in-out gap-1 flex flex-col justify-start`}
							>
								<span className='text-md font-bold'>Select your template:</span>
								<DropDown
									width='20rem'
									onChange={(e) => setTemplate(e.target.value)}
									// onChange={(e) =>
									// 	changeTemplate(e.target.value as TemplateKeys)
									// }
									defaultValue={template}
									style='input'
								>
									<option value='Default'>Default</option>
									<option value='Fun_Education_001'>Education</option>
									<option value='Business_002'>Business</option>
									<option value='Clean_Lifestyle_003'>Clean Lifestyle</option>
									<option value='Fun_Education_004'>Fun</option>
									<option value='Business_002'>Business</option>
									<option value='Stanford'>Stanford University</option>
									<option value='Berkeley'>UC Berkeley</option>
									<option value='Harvard'>Harvard University</option>
									<option value='MIT'>
										Massachusetts Institute of Technology
									</option>
									<option value='Princeton'>Princeton University</option>
									<option value='Caltech'>
										California Institute of Technology
									</option>
									<option value='Columbia'>Columbia University</option>
									<option value='JHU'>Johns Hopkins University</option>
									<option value='Yale'>Yale University</option>
									<option value='UPenn'>University of Pennsylvania</option>
								</DropDown>
							</div>
						</div>
						<div className='w-full mt-4 flex flex-col'>
							<span className='text-md font-bold'>Template preview</span>
							<SlideDesignPreview selectedTemplate={template} />
						</div>
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
