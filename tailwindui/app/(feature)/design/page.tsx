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
import { GenerationStatusProgressModal } from '@/components/ui/GenerationStatusProgressModal';

// UI Components and Layouts
import Card from '@/components/ui/Card';
import RadioButton, { RadioButtonOption } from '@/components/ui/RadioButton';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import {
	BigTitle,
	Explanation,
	Instruction,
	Title,
} from '@/components/ui/Text';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit';

// Local component imports
import { PaletteKeys, TemplateKeys } from '@/components/slides/slideTemplates';
import BrandingSelector from './BrandingSelector';
import { useSlides } from '@/hooks/use-slides';
import { useUser } from '@/hooks/use-user';
import PaywallModal from '@/components/paywallModal';

const TemplateSelector = dynamic(() => import('./TemplateSelector'), {
	ssr: false,
});

const getTemplateFromAudicence = (audience: string): TemplateKeys => {
	switch (audience) {
		case 'Business Clients' as TemplateKeys:
			return 'Business_Dark_005';
		case 'Office Colleagues':
			return 'Business_Light_006';
		case 'Myself':
			return 'Clean_Lifestyle_003';
		case 'Video Viewers':
		// return 'Fun_Vibrant_007';
		case 'Students':
		// return 'Fun_Education_004';
		case 'Researchers':
			// return 'Fun_Education_004';
			return 'Simplistic_008';
	}
	return 'Simplistic_008';
};

export default function DesignPage() {
	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

	const handleGenerationStatusModal = () => {
		// console.log('user Research Modal toggled');
		setShowGenerationStatusModal(!showGenerationStatusModal);
	};

	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const { isPaidUser } = useUser();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isGpt35, setIsGpt35] = useState(true);
	const { outlines, project, updateProject } = useProject();
	const { showDrLambdaLogo, hideLogo } = useSlides();
	const [template, setTemplate] = useState<TemplateKeys>(
		project?.template || getTemplateFromAudicence(project?.audience || ''),
	);

	const [colorPalette, setColorPalette] = useState<PaletteKeys>(
		project?.palette ||
		availablePalettes[template as keyof typeof availablePalettes]?.[0] ||
		'Original',
	);
	const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
		project?.selected_logo || [],
	);
	const [selectedBackground, setSelectedBackground] = useState<Resource[]>(
		project?.selected_background || [],
	);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	// Initialize the palette state with the first available palette for the current template
	useEffect(() => {
		if (template && availablePalettes) {
			const paletteForTemplate = availablePalettes[template];
			if (paletteForTemplate && paletteForTemplate.length > 0) {
				setColorPalette(paletteForTemplate[0]);
			}
		}
	}, [template]);

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

	const [branding, setBranding] = useState(project?.logo === "" ? 'no' : 'yes');

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
			{/* user research modal */}
			{showGenerationStatusModal && (
				<GenerationStatusProgressModal
					onClick={handleGenerationStatusModal}
					waitingTime={25}
				></GenerationStatusProgressModal>
			)}

			<WorkflowStepsBanner
				currentIndex={2}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				nextIsPaidFeature={false}
				nextText={!isSubmitting ? 'Create Slides' : 'Creating Slides'}
				handleClickingGeneration={handleGenerationStatusModal}
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
				selectedLogo={selectedLogo}
				selectedBackground={selectedBackground}
			/>

			<PaywallModal
				showModal={showPaymentModal}
				message='Upgrade for this 🌟premium feature!'
				setShowModal={setShowPaymentModal}
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
							<Instruction>
								How many images do you want to generate?
							</Instruction>
							<RadioButton
								options={imageAmountOptions}
								selectedValue={imageAmount}
								setSelectedValue={setImageAmount}
								name='imageAmount'
							/>
						</div>
						<div>
							<Instruction>
								For images on your slides, what image license do you want to
								use?
							</Instruction>
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
					</Card>

					<Card>
						<BigTitle>Branding</BigTitle>
						<Explanation>
							Select the branding for your slides, you can also change this on
							the slides page, or talk with AI Chatbot
						</Explanation>
						<BrandingSelector
							branding={branding}
							setBranding={(e) => {
								if (!isPaidUser) {
									setShowPaymentModal(true);
									return;
								}
								if (e === 'yes') {
									showDrLambdaLogo();
								}
								else {
									hideLogo();
									updateProject('selected_logo', []);
								}
								setBranding(e);
							}}
							selectedLogo={selectedLogo}
							setSelectedLogo={setSelectedLogo}
							selectedBackground={selectedBackground}
							setSelectedBackground={setSelectedBackground}
						/>
					</Card>
				</Panel>
			</Column>
		</section>
	);
}
