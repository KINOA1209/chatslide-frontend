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
import DesignSettingsService from '@/services/DesignSettingService';
import Slide, { LogoPosition } from '@/models/Slide';
import ProjectService from '@/services/ProjectService';
import { BigBlueButton } from '@/components/button/DrlambdaButton';
import { WrappableRow } from '@/components/layout/WrappableRow';
import DesignSystemBadges from '@/components/ui/design_systems/Badges';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
// import SlideDesignPreview from '@/components/slides/SlideDesignPreview';
const SlideDesignPreview = dynamic(
	() => import('@/components/slides/SlideDesignPreview'),
	{ ssr: false },
);
// import FileUploadDropdownButton from '@/components/file/FileUploadDropdownButton';
// import { getBrand, getLogoUrl } from '@/utils/getHost';
// import ResourceService from '@/services/ResourceService';
// import ImageSelector from './ImageSelector';
// import PPTXTemplateSelector from './PPTXTemplateSelector';
import { Suspense } from 'react';
const PPTXTemplateSelector: any = dynamic(
	() => import('@/app/(feature)/design/PPTXTemplateSelector'),
	{
		ssr: false,
	},
);
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
	// const uploadSectionRef = useRef<HTMLDivElement>(null);
	// const [showUploadOptionsMenu, setShowUploadOptionsMenu] = useState(false);
	const [selectedPPTXTemplate, setSelectedPPTXtemplate] = useState<Resource[]>(
		[],
	);

	const [showGenerationStatusModal, setShowGenerationStatusModal] =
		useState(false);

	const handleGenerationStatusModal = () => {
		setShowGenerationStatusModal(!showGenerationStatusModal);
	};

	// Ensure this code runs only on the client side
	const [screenWidth, setScreenWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 1280,
	);

	// const [showTemplatePreview, setShowTemplatePreview] = useState(screenWidth < 1280);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				// console.log('screenWidth: ' + screenWidth);
				setScreenWidth(window.innerWidth);
				// setShowTemplatePreview(window.innerWidth < 1280);
			};

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);
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
	const [slideBackgroundImgUrl, setSlideBackgroundImgUrl] = useState('');

	useEffect(() => {
		console.log('current project details:', project);
	}, [project]);
	useEffect(() => {
		console.log('Current slide background img url:', slideBackgroundImgUrl);
		// setSelectedBackground(
		// 	selectedBackground.map((resource) => ({
		// 		...resource,
		// 		thumbnail_url: slideBackgroundImgUrl,
		// 	})),
		// );

		console.log(
			'changed the selected background',
			selectedBackground?.[0]?.thumbnail_url,
		);
	}, [slideBackgroundImgUrl, setSlideBackgroundImgUrl]); // Add slideBackgroundImgUrl to the dependency array

	useEffect(() => {
		console.log('selected background url', selectedBackground);
		updateProject('selected_background', selectedBackground);
		setSelectedBackground(selectedBackground);
	}, [selectedBackground, setSelectedBackground]);

	useEffect(() => {
		updateProject('selected_logo', selectedLogo);
		setSelectedLogo(selectedLogo);
	}, [selectedBackground, setSelectedLogo]);

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
			// img: MoreImagesImg,
			value: 'more_images',
			text: 'More images',
			explanation: '70% decks contain images',
		},
		{
			// img: FewerImagesImg,
			value: 'fewer_images',
			text: 'Fewer images',
			explanation: '30% decks contain images',
		},
	];

	const [imageLicense, setImageLicense] = useState('all');
	const imageLicenseOptions: RadioButtonOption[] = [
		{
			value: 'stock',
			text: 'Stock',
			explanation: 'Generic, high quality',
		},
		{
			value: 'creative',
			text: 'Creative',
			explanation: 'Wide range',
		},
		{
			value: 'all',
			text: 'All',
			explanation: 'Wider range, personal use',
		},
	];

	if (project?.logo === undefined) {
		updateProject('logo', isPaidUser ? '' : 'Default');
	}

	const [logoMode, setLogoMode] = useState<string>(
		isPaidUser ? (selectedLogo?.length > 0 ? 'Custom' : 'No') : 'Default',
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
						titleFontFamily: HasSelectedCustomizedTemplateTitleFontFamily
							? selectedTemplateTitleFontFamily
							: '',
						subtitleFontFamily: HasSelectedCustomizedTemplateSubtitleFontFamily
							? selectedTemplateSubtitleFontFamily
							: '',
						contentFontFamily: HasSelectedCustomizedTemplateContentFontFamily
							? selectedTemplateContentFontFamily
							: '',
						titleFontColor: hasSelectedCustomizedTemplateTitleFontColor
							? selectedTemplateTitleFontColor
							: '',
						subtitleFontColor: hasSelectedCustomizedTemplateSubtitleFontColor
							? selectedTemplateSubtitleFontColor
							: '',
						contentFontColor: hasSelectedCustomizedTemplateContentFontColor
							? selectedTemplateContentFontColor
							: '',
						logo: logoMode,
						logo_url: selectedLogo?.[0]?.thumbnail_url || '',
						background_url: selectedBackground?.[0]?.thumbnail_url || '',
						media_type: ['image', 'image', 'image'],
						transcript: '',
						logo_position: selectedLogoPosition,
					};
				});

				bulkUpdateProject({
					logo: logoMode,
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

	const saveToDefaultProfile = async (token: string) => {
		const defaultProfile = {
			template,
			color_palette: colorPalette,
			selected_template_bg_color: selectedTemplateBgColor,
			selected_template_title_font_family: selectedTemplateTitleFontFamily,
			selected_template_subtitle_font_family: selectedTemplateSubtitleFontFamily,
			selected_template_content_font_family: selectedTemplateContentFontFamily,
			selected_template_content_font_color: selectedTemplateContentFontColor,
			selected_template_subtitle_font_color: selectedTemplateSubtitleFontColor,
			selected_template_title_font_color: selectedTemplateTitleFontColor,
			selected_logo: selectedLogo,
			selected_background: selectedBackground,
			logo_mode: logoMode,
			selected_logo_position: selectedLogoPosition,
			image_amount: imageAmount,
			image_license: imageLicense,
		};
	
		try {
			await DesignSettingsService.createDesignSettings(defaultProfile, token);
			toast.success('Profile saved successfully');
		} catch (error) {
			console.error('Error saving profile:', error);
			toast.error('Error saving profile');
		}
	};
	
	const loadFromProfile = async (token: string) => {
		try {
			const profile = await DesignSettingsService.getDesignSettings(token);
			if (profile) {
				const {
					template,
					color_palette,
					selected_template_bg_color,
					selected_template_title_font_family,
					selected_template_subtitle_font_family,
					selected_template_content_font_family,
					selected_template_content_font_color,
					selected_template_subtitle_font_color,
					selected_template_title_font_color,
					selected_logo,
					selected_background,
					selected_logo_position,
					image_amount,
					image_license,
				} = profile;
	
				setTemplate(template);
				setColorPalette(color_palette);
				setSelectedTemplateBgColor(selected_template_bg_color);
				setSelectedTemplateTitleFontFamily(selected_template_title_font_family);
				setSelectedTemplateSubtitleFontFamily(selected_template_subtitle_font_family);
				setSelectedTemplateContentFontFamily(selected_template_content_font_family);
				setSelectedTemplateContentFontColor(selected_template_content_font_color);
				setSelectedTemplateSubtitleFontColor(selected_template_subtitle_font_color);
				setSelectedTemplateTitleFontColor(selected_template_title_font_color);
	
				setCustomizedTemplateContentFontFamily(selected_template_content_font_family);
				setCustomizedTemplateTitleFontFamily(selected_template_title_font_family);
				setCustomizedTemplateSubtitleFontFamily(selected_template_subtitle_font_family);
				setCustomizedTemplateContentFontColor(selected_template_content_font_color);
				setCustomizedTemplateSubtitleFontColor(selected_template_subtitle_font_color);
				setCustomizedTemplateTitleFontColor(selected_template_title_font_color);
	
				setSelectedLogo(selected_logo);
				setSelectedBackground(selected_background);
				setSelectedLogoPosition(selected_logo_position);
				setImageAmount(image_amount);
				setImageLicense(image_license);
	
				toast.success('Profile loaded successfully');
			} else {
				toast.error('No profile found');
			}
		} catch (error) {
			console.error('Error loading profile:', error);
			toast.error('Error loading profile');
		}
	};

	const handleLoadFromProfile = (token: string) => () => {
		loadFromProfile(token);
	};
	
	const handleSaveToDefaultProfile = (token: string) => () => {
		saveToDefaultProfile(token);
	};
	
	return (
		<section className='design-page-content-section relative'>
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
				showLoadingButton={project?.presentation_slides ? false : true}
			/>

			<PaywallModal
				showModal={showPaymentModal}
				message='Upgrade for this 🌟premium feature!'
				setShowModal={setShowPaymentModal}
			/>

			<div
				className='template-customization-and-preview'
				style={{
					display: screenWidth < 1280 ? 'block' : 'flex',
					padding: '10px',
					gap: '10px',
				}}
			>
				{/* <div
					className='template-customization-area'
					
				> */}
				{/* template-customization-area */}
				<Column customStyle={{ flex: '1 0 33%' }}>
					<Panel>
						<Card>
							<BigTitle>Template</BigTitle>
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
								setCustomizedTemplateBgColorCallback={
									setSelectedTemplateBgColor
								}
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
								showTemplatePreview={screenWidth < 1280 ? true : false}
								selectedSlideBackgroundImgResource={selectedBackground}
								selectedSlideLogoUrlResource={selectedLogo}
							/>
						</Card>

						<Card>
							<BigTitle>Image</BigTitle>
							<div>
								<Instruction boldenFont={true}>
									How many images do you want to generate?
								</Instruction>
								<RadioButton
									options={imageAmountOptions}
									selectedValue={imageAmount}
									setSelectedValue={setImageAmount}
									name='imageAmount'
									cols={1}
								/>
							</div>
							<div>
								<Instruction boldenFont={true}>
									What image license do you want to use?
								</Instruction>
								{/* <Explanation>
									An image license is a set of rules that tell you how you can
									use a picture. <br />
									You are free to use images with a creative license or stock
									pictures for commercial use. <br />
								</Explanation> */}
								<RadioButton
									options={imageLicenseOptions}
									selectedValue={imageLicense}
									setSelectedValue={setImageLicense}
									name='imageLicense'
									cols={1}
								/>
							</div>
						</Card>

						<Card>
							<BigTitle>Branding</BigTitle>
							<Explanation>
								Select the branding for your slides, you can also change this on
								the slides page, or talk with AI Chatbot
							</Explanation>
							<div className='flex flex-col gap-y-2'>
								<BrandingSelector
									logoMode={logoMode}
									setLogoMode={setLogoMode}
									selectedLogo={selectedLogo}
									setSelectedLogo={setSelectedLogo}
									selectedBackground={selectedBackground}
									setSelectedBackground={setSelectedBackground}
									logoPosition={selectedLogoPosition}
									setLogoPosition={setSelectedLogoPosition}
									buttonCols={1}
								/>
								{/* upload your own template */}
								<PPTXTemplateSelector
									type='PPTX Template'
									selectedTemplate={selectedPPTXTemplate}
									setSelectedTemplate={setSelectedPPTXtemplate}
									showQuestion={true}
									setExtractedTemplateImgUrl={setSlideBackgroundImgUrl}
									extractedTemplateImgUrl={slideBackgroundImgUrl}
									setSelectedBackground={setSelectedBackground}
									selectedBackground={selectedBackground}
									buttonCols={1}
								/>
							</div>
						</Card>

						<Card>
							<BigTitle>Settings (beta)</BigTitle>
							<Instruction>
								You can save all the settings on this page to your profile, and
								apply it in the future for a deck with the same design.
							</Instruction>
							<WrappableRow type='flex' justify='around'>
								<DesignSystemButton
									onClick={handleSaveToDefaultProfile(token)}
									size='md'
									hierarchy='secondary'
									width='12rem'
								>
									Save to Profile
								</DesignSystemButton>
								<DesignSystemButton
									onClick={handleLoadFromProfile(token)}
									size='md'
									hierarchy='secondary'
									width='12rem'
									buttonStatus={
										localStorage.getItem('defaultProfile')
											? 'enabled'
											: 'disabled'
									}
								>
									Load from Profile
								</DesignSystemButton>
							</WrappableRow>
						</Card>
					</Panel>
				</Column>
				{/* </div> */}

				{/* <div className='' style={{}}> */}
				{/* big-template-review */}
				<Column
					customStyle={{
						display: screenWidth < 1280 ? 'none' : 'flex',
						marginTop: '24px',
						// flex: '2 0 66%',
					}}
				>
					<BigTitle>Template Preview</BigTitle>
					<SlideDesignPreview
						selectedTemplate={template}
						selectedPalette={colorPalette}
						axial='y'
						useGridLayout={true}
						gridCols={2}
						slideContainerScale={screenWidth > 1440 ? 0.4 : 0.3}
						selectedSlideBackgroundImgResource={selectedBackground}
						selectedSlideLogoResource={selectedLogo}
					/>
				</Column>
				{/* </div> */}
			</div>
		</section>
	);
}
