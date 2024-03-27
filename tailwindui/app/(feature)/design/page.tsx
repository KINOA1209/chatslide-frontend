'use client';

// React related imports
import React, { useState, useRef, useEffect, Fragment } from 'react';
import dynamic from 'next/dynamic';

// Third-party library imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Stylesheets
import '@/app/css/workflow-edit-topic-css/topic_style.css';

// Your project's global imports
import ContentWithImageImg from '@/public/images/summary/content_with_image.png';
import ContentOnlyImg from '@/public/images/summary/content_only.png';
import Resource from '@/models/Resource';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import useTourStore from '@/components/user_onboarding/TourStore';
import availablePalettes from '@/components/slides/palette';
// import { TemplateKeys, getTemplateFromAudicence } from '@/components/slides/slideTemplates';

// UI Components and Layouts
import Card from '@/components/ui/Card';
import RadioButton, { RadioButtonOption } from '@/components/ui/RadioButton';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import { BigTitle, Explanation, Title } from '@/components/ui/Text';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit';

// Local component imports
import ImageSelector from './ImageSelector';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import { getTemplateFromAudicence } from '@/components/slides/slideTemplates';

const TemplateSelector = dynamic(() => import('./TemplateSelector'), {
	ssr: false,
});

export default function DesignPage() {
	const { isTourActive, startTour, setIsTourActive } = useTourStore();

	const [colorPalette, setColorPalette] = useState('Original' as string);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isGpt35, setIsGpt35] = useState(true);
	const { outlines, project } = useProject();
	const [template, setTemplate] = useState<string>(
		getTemplateFromAudicence(project?.audience || ''),
	);

	const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
		project?.selected_logo || [],
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

	const [imageLicense, setImageLicense] = useState('stock');
	const imageLicenseOptions: RadioButtonOption[] = [
		{
			value: 'stock',
			text: 'Stock (high quality)',
		},
		{
			value: 'creative',
			text: 'Creative (wide range)',
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
	console.log(
		'current template color options:',
		template,
		availablePalettes[template as keyof typeof availablePalettes],
	);

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
							setPalette={setColorPalette}
							paletteOptions={
								availablePalettes[
									template as keyof typeof availablePalettes
								] || ['Original']
							}
							palette={colorPalette}
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
