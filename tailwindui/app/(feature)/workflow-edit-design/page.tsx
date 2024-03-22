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
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import { availableColorThemes } from '@/components/slides/slideTemplates';
// const { changeTemplate } = useSlides();

export default function DesignPage() {
	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const [template, setTemplate] = useState('Clean_Lifestyle_003' as string);
	const [colorPalette, setColorPalette] = useState('Original' as string);
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
			text: 'More images (70% decks contain images)',
		},
		{
			img: ContentOnlyImg,
			value: 'content_only',
			text: 'Fewer images (30% decks contain images)',
		},
	];

	const [imageLicense, setImageLicense] = useState('creative');
	const imageLicenseOptions: RadioButtonOption[] = [
		{
			value: 'creative',
			text: 'Creative (wide range)',
		},
		{
			value: 'stock',
			text: 'Stock (high quality)',
		},
		{
			value: 'all',
			text: 'All (wider range, personal use)',
		},
	];

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;
	console.log('Template:', template);
	console.log('Color Palette:', colorPalette);

	return (
		<section className='relative'>
			{/* user tutorial */}
			{/* <div className='absolute right-[3rem] top-[7rem] flex flex-col items-end space-x-4'>
				<ActionsToolBar startTour={startTour} onlyShowTutorial={true} />
			</div> */}
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
				palette={colorPalette}
				imageAmount={imageAmount}
				imageLicense={imageLicense}
				logo_ids={selectedLogo.map((resource) => resource.id)}
				background_ids={selectedBackground.map((resource) => resource.id)}
			/>

			<Column>
				<Panel>
					{/* design */}
					<Card>
						<BigTitle>Design</BigTitle>
						<Explanation>
							Customize the design for your slide, you can also skip this step
							and use the default
						</Explanation>
						{/* tempalte */}
						<TemplateSelector
							template={template}
							setTemplate={setTemplate}
							setColorTheme={setColorPalette}
							colorThemeOptions={
								availableColorThemes[
									template as keyof typeof availableColorThemes
								] || ['Original']
							}
							colorTheme={colorPalette}
						/>

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
								For images on your slides, what image license do you want to
								use?
							</span>
							<Explanation>
								An image license is a set of rules that tell you how you can use
								a picture. <br />
								You are free to use images with a creative license or stock
								pictures for commercial use. <br />
							</Explanation>
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
				</Panel>
			</Column>
		</section>
	);
}
