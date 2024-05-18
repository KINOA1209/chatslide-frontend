'use client';

// React related imports
import React, { useState, useRef, useEffect, Fragment } from 'react';
import dynamic from 'next/dynamic';

// Third-party library imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Stylesheets
import '@/app/css/workflow-edit-topic-css/topic_style.css';

// Your project's global imports
import MoreImagesImg from '@/public/images/design/more_images.png';
import FewerImagesImg from '@/public/images/design/fewer_images.png';

import Resource from '@/models/Resource';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import useTourStore from '@/components/user_onboarding/TourStore';
import availablePalettes from '@/components/slides/palette';
import { GenerationStatusProgressModal } from '@/components/ui/GenerationStatusProgressModal';

// UI Components and Layouts
import Card from '@/components/ui/Card';
import RadioButton, { RadioButtonOption } from '@/components/ui/RadioButton';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit';

// Local component imports
import { PaletteKeys, TemplateKeys } from '@/components/slides/slideTemplates';
import BrandingSelector from './BrandingSelector';
import { useSlides } from '@/hooks/use-slides';
import { useUser } from '@/hooks/use-user';
import PaywallModal from '@/components/paywallModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { Blank } from '@/components/ui/Loading';
import Project from '@/models/Project';
import { addIdToRedir } from '@/utils/redirWithId';
import SlidesService from '@/services/SlidesService';
import Slide, { LogoPosition } from '@/models/Slide';
import ProjectService from '@/services/ProjectService';
import { BigBlueButton } from '@/components/button/DrlambdaButton';
import { WrappableRow } from '@/components/layout/WrappableRow';
import DesignSystemBadges from '@/components/ui/design_systems/Badges';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
const colorPreviews: any = dynamic(
	() => import('@/app/(feature)/design/TemplateSelector'),
	{
		ssr: false,
	},
);

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
		setShowGenerationStatusModal(!showGenerationStatusModal);
	};
	const {
		slides,
		initSlides,
		initialLoadedContentFontFamily,
		initialLoadedSubtitleFontFamily,
		initialLoadedTitleFontFamily,
		initialLoadedTitleFontColor,
		initialLoadedContentFontColor,
		initialLoadedSubtitleFontColor,
		initialLoadedTemplateBgColor,
		customTemplateBgColor,
		customizedTemplateContentFontFamily,
		customizedTemplateTitleFontFamily,
		customizedTemplateSubtitleFontFamily,
		customizedTemplateContentFontColor,
		customizedTemplateSubtitleFontColor,
		customizedTemplateTitleFontColor,
		hasSelectedCustomTemplateBgColor,
		HasSelectedCustomizedTemplateContentFontFamily,
		HasSelectedCustomizedTemplateSubtitleFontFamily,
		HasSelectedCustomizedTemplateTitleFontFamily,
		hasSelectedCustomizedTemplateContentFontColor,
		hasSelectedCustomizedTemplateTitleFontColor,
		hasSelectedCustomizedTemplateSubtitleFontColor,
		setCustomizedTemplateContentFontFamily,
		setCustomizedTemplateTitleFontFamily,
		setCustomizedTemplateSubtitleFontFamily,
		setCustomizedTemplateContentFontColor,
		setCustomizedTemplateSubtitleFontColor,
		setCustomizedTemplateTitleFontColor,
	} = useSlides();
	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const { token, isPaidUser } = useUser();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { outlines, project, updateProject, bulkUpdateProject } = useProject();
	const { debouncedSyncSlides } = useSlides();
	const [template, setTemplate] = useState<TemplateKeys>(
		project?.template || getTemplateFromAudicence(project?.audience || ''),
	);
	const [colorPalette, setColorPalette] = useState<PaletteKeys>(
		project?.palette ||
			availablePalettes[template as keyof typeof availablePalettes]?.[0] ||
			'Original',
	);

	const [selectedTemplateBgColor, setSelectedTemplateBgColor] = useState(
		hasSelectedCustomTemplateBgColor
			? customTemplateBgColor
			: colorPreviews[colorPalette as PaletteKeys],
	);
	const [selectedTemplateTitleFontFamily, setSelectedTemplateTitleFontFamily] =
		useState(
			HasSelectedCustomizedTemplateTitleFontFamily
				? customizedTemplateTitleFontFamily
				: initialLoadedTitleFontFamily || 'Arial',
		);
	const [
		selectedTemplateSubtitleFontFamily,
		setSelectedTemplateSubtitleFontFamily,
	] = useState(
		HasSelectedCustomizedTemplateSubtitleFontFamily
			? customizedTemplateSubtitleFontFamily
			: initialLoadedSubtitleFontFamily || 'Arial',
	);
	const [
		selectedTemplateContentFontFamily,
		setSelectedTemplateContentFontFamily,
	] = useState(
		HasSelectedCustomizedTemplateContentFontFamily
			? customizedTemplateContentFontFamily
			: initialLoadedContentFontFamily || 'Arial',
	);

	const [
		selectedTemplateContentFontColor,
		setSelectedTemplateContentFontColor,
	] = useState(
		hasSelectedCustomizedTemplateContentFontColor
			? customizedTemplateContentFontColor
			: initialLoadedContentFontColor || '#000000',
	);

	const [
		selectedTemplateSubtitleFontColor,
		setSelectedTemplateSubtitleFontColor,
	] = useState(
		hasSelectedCustomizedTemplateSubtitleFontColor
			? customizedTemplateSubtitleFontColor
			: initialLoadedSubtitleFontColor || '#000000',
	);

	const [selectedTemplateTitleFontColor, setSelectedTemplateTitleFontColor] =
		useState(
			hasSelectedCustomizedTemplateTitleFontColor
				? customizedTemplateTitleFontColor
				: initialLoadedTitleFontColor || '#000000',
		);

	const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
		project?.selected_logo || [],
	);
	const [selectedBackground, setSelectedBackground] = useState<Resource[]>(
		project?.selected_background || [],
	);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	const params = useSearchParams();
	const router = useRouter();

	if (!project) {
		if (params.get('id')) {
			router.push(`/project/${params.get('id')}`);
		}
		return <Blank>Project not found</Blank>;
	}

	useEffect(() => {
		if (project?.parsed_slides && project?.parsed_slides?.length !== 0) {
			setTemplate(slides[0].template);
			setColorPalette(slides[0].palette);
		}
	}, []);

	const [imageAmount, setImageAmount] = useState('more_images');
	const imageAmountOptions: RadioButtonOption[] = [
		{
			img: MoreImagesImg,
			value: 'more_images',
			text: 'More images (70% decks contain images)',
		},
		{
			img: FewerImagesImg,
			value: 'fewer_images',
			text: 'Fewer images (30% decks contain images)',
		},
	];

	const [imageLicense, setImageLicense] = useState('all');
	const imageLicenseOptions: RadioButtonOption[] = [
		{
			value: 'stock',
			text: 'Stock (generic, high quality)',
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

	if (project?.logo === undefined) {
		updateProject('logo', isPaidUser ? '' : 'Default');
	}

	const [showLogo, setShowLogo] = useState<boolean>(
		project?.logo === ''
			? false
			: project?.logo === 'Default'
				? true
				: isPaidUser
					? false
					: true,
	);

	const [selectedLogoPosition, setSelectedLogoPosition] =
		useState<LogoPosition>(project?.logo_position || 'BottomLeft');

	async function viewSlidesSubmit() {
		if (!project) {
			console.error('Project not found');
			setIsSubmitting(false);
			return;
		}
		try {
			if (project.id && project.topic && token) {
				const { slides, additional_images } = await SlidesService.initImages(
					project.id,
					project.topic,
					imageLicense,
					imageAmount,
					token,
				);

				const newSlides = slides.map((slide) => {
					return {
						...slide,
						template: template,
						palette: colorPalette,
						background_color: hasSelectedCustomTemplateBgColor
							? selectedTemplateBgColor
							: undefined,
						titleFontFamily: selectedTemplateTitleFontFamily,
						subtitleFontFamily: selectedTemplateSubtitleFontFamily,
						contentFontFamily: selectedTemplateContentFontFamily,
						titleFontColor: selectedTemplateTitleFontColor,
						subtitleFontColor: selectedTemplateSubtitleFontColor,
						contentFontColor: selectedTemplateContentFontColor,
						logo: showLogo ? 'Default' : '',
						logo_url: selectedLogo?.[0]?.thumbnail_url || '',
						background_url: selectedBackground?.[0]?.thumbnail_url || '',
						media_type: ['image', 'image', 'image'],
						transcript: '',
						logo_position: selectedLogoPosition,
					};
				});

				bulkUpdateProject({
					logo: showLogo ? 'Default' : '',
					selected_background: selectedBackground,
					selected_logo: selectedLogo,
					template: template,
					palette: colorPalette,
					additional_images: additional_images,
					parsed_slides: newSlides as Slide[],
					logo_position: selectedLogoPosition,
				} as Project);

				initSlides(newSlides);
				debouncedSyncSlides(newSlides);

				router.push(addIdToRedir('/slides'));
			} else {
				console.error('One or more required variables are undefined.');
			}
		} catch (e) {
			setIsSubmitting(false);
			console.error(e);
			toast.error(
				'Server is busy now. Please try again later. Reference code: ' +
					project?.id,
			);
		}
	}

	useEffect(() => {
		if (isSubmitting) {
			if (project?.presentation_slides) {
				const parsedSlides = ProjectService.parseSlides(
					project.presentation_slides,
				);
				initSlides(parsedSlides);
				setShowGenerationStatusModal(true);
				viewSlidesSubmit();
				setIsSubmitting(false);
			}
		}
	}, [isSubmitting]);

	if (!useHydrated()) return <></>;

	const saveToDefaultProfile = () => {
		const defaultProfile = {
			template,
			colorPalette,
			selectedTemplateBgColor,
			selectedTemplateTitleFontFamily,
			selectedTemplateSubtitleFontFamily,
			selectedTemplateContentFontFamily,
			selectedTemplateContentFontColor,
			selectedTemplateSubtitleFontColor,
			selectedTemplateTitleFontColor,
			selectedLogo,
			selectedBackground,
			showLogo,
			selectedLogoPosition,
			imageAmount,
			imageLicense,
		};
		localStorage.setItem('defaultProfile', JSON.stringify(defaultProfile));
		toast.success('Profile saved successfully');
	};

	const loadFromProfile = () => {
		const profile = localStorage.getItem('defaultProfile');
		if (profile) {
			const {
				template,
				colorPalette,
				selectedTemplateBgColor,
				selectedTemplateTitleFontFamily,
				selectedTemplateSubtitleFontFamily,
				selectedTemplateContentFontFamily,
				selectedTemplateContentFontColor,
				selectedTemplateSubtitleFontColor,
				selectedTemplateTitleFontColor,
				selectedLogo,
				selectedBackground,
				showLogo,
				selectedLogoPosition,
				imageAmount,
				imageLicense,
			} = JSON.parse(profile);

			setTemplate(template);
			setColorPalette(colorPalette);
			setSelectedTemplateBgColor(selectedTemplateBgColor);

			setSelectedTemplateTitleFontFamily(selectedTemplateTitleFontFamily);
			setSelectedTemplateSubtitleFontFamily(selectedTemplateSubtitleFontFamily);
			setSelectedTemplateContentFontFamily(selectedTemplateContentFontFamily);
			setSelectedTemplateContentFontColor(selectedTemplateContentFontColor);
			setSelectedTemplateSubtitleFontColor(selectedTemplateSubtitleFontColor);
			setSelectedTemplateTitleFontColor(selectedTemplateTitleFontColor);

			setCustomizedTemplateContentFontFamily(selectedTemplateContentFontFamily);
			setCustomizedTemplateTitleFontFamily(selectedTemplateTitleFontFamily);
			setCustomizedTemplateSubtitleFontFamily(
				selectedTemplateSubtitleFontFamily,
			);
			setCustomizedTemplateContentFontColor(selectedTemplateContentFontColor);
			setCustomizedTemplateSubtitleFontColor(selectedTemplateSubtitleFontColor);
			setCustomizedTemplateTitleFontColor(selectedTemplateTitleFontColor);

			setSelectedLogo(selectedLogo);
			setSelectedBackground(selectedBackground);
			setShowLogo(showLogo);
			setSelectedLogoPosition(selectedLogoPosition);
			setImageAmount(imageAmount);
			setImageLicense(imageLicense);

			toast.success('Profile loaded successfully');
		} else {
			toast.error('No profile found');
		}
	};

	return (
		<section className='relative'>
			<ToastContainer />
			{showGenerationStatusModal && (
				<GenerationStatusProgressModal
					onClick={handleGenerationStatusModal}
					prompts={[['📊 Finding the right images for your slides...', 12]]}
				></GenerationStatusProgressModal>
			)}

			<WorkflowStepsBanner
				currentIndex={2}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				nextIsPaidFeature={false}
				nextText={isSubmitting ? 'Designing Slides' : 'Design Slides'}
				handleClickingGeneration={handleGenerationStatusModal}
				lastStep={project?.presentation_slides ? false : true}
			/>

			<PaywallModal
				showModal={showPaymentModal}
				message='Upgrade for this 🌟premium feature!'
				setShowModal={setShowPaymentModal}
			/>

			<Column>
				<Panel>
					<Card>
						<BigTitle>✍️ Design</BigTitle>
						<Explanation>
							Customize the design for your slide, you can also skip this step
							and use the default
						</Explanation>
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
							showCustomColorPicker={true}
							setCustomizedTemplateBgColorCallback={setSelectedTemplateBgColor}
							setCustomizedTemplateContentFontFamilyCallback={
								setSelectedTemplateContentFontFamily
							}
							setCustomizedTemplateSubtitleFontFamilyCallback={
								setSelectedTemplateSubtitleFontFamily
							}
							setCustomizedTemplateTitleFontFamilyCallback={
								setSelectedTemplateTitleFontFamily
							}
							setCustomizedTemplateContentFontColorCallback={
								setSelectedTemplateContentFontColor
							}
							setCustomizedTemplateSubtitleFontColorCallback={
								setSelectedTemplateSubtitleFontColor
							}
							setCustomizedTemplateTitleFontColorCallback={
								setSelectedTemplateTitleFontColor
							}
						/>

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
						<BigTitle>🏷️ Branding</BigTitle>
						<Explanation>
							Select the branding for your slides, you can also change this on
							the slides page, or talk with AI Chatbot
						</Explanation>
						<BrandingSelector
							showLogo={showLogo}
							setShowLogo={setShowLogo}
							selectedLogo={selectedLogo}
							setSelectedLogo={setSelectedLogo}
							selectedBackground={selectedBackground}
							setSelectedBackground={setSelectedBackground}
							logoPosition={selectedLogoPosition}
							setLogoPosition={setSelectedLogoPosition}
						/>
					</Card>

					<Card>
						<BigTitle>⚙️ Settings</BigTitle>
						<Instruction>
							You can save all the settings on this page to your profile, and
							apply it in the future for a deck with the same design.
						</Instruction>
						<WrappableRow type='flex' justify='around'>
							<DesignSystemButton
								onClick={saveToDefaultProfile}
								size='md'
								hierarchy='secondary'
								width='12rem'
							>
								Save to Profile
							</DesignSystemButton>
							<DesignSystemButton
								onClick={loadFromProfile}
								size='md'
								hierarchy='secondary'
								width='12rem'
							>
								Load from Profile
							</DesignSystemButton>
						</WrappableRow>
					</Card>
				</Panel>
			</Column>
		</section>
	);
}
