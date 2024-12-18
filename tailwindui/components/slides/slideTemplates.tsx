'use client';

import { useEffect, useMemo, useState } from 'react';
import { LayoutKeys } from './slideLayout';
import { layoutOptions } from './slideLayout';
import Image from 'next/image';
import { LogoPosition, Media, SlideKeys } from '@/models/Slide';
import Chart from '@/models/Chart';
import Position from '@/types/Position';

import { ThemeElements } from './templates_customizable_elements/theme_elements';
import { LayoutElements } from './templates_customizable_elements/layout_elements';
import { useSlides } from '@/hooks/use-slides';

export const generateTemplate = (templateName: string) => {
	return ({
		user_name,
		username_position,
		title,
		title_position,
		topic,
		topic_position,
		subtopic,
		subtopic_position,
		content,
		content_positions,
		imgs,
		update_callback,
		canEdit,
		scale,
		// autoSave,
		isCoverPage,
		layoutOptionNonCover,
		layoutOptionCover,
		templateLogo,
		uploadedLogoUrl,
		uploadedBackgroundImageUrl,
		charts,
		ischarts,
		handleSlideEdit,
		currentSlideIndex,
		image_positions,
		image_container_positions,
		palette,
		themeElements,
		layoutElements,
		embed_code,
		media_types,
		logo_position,
		logo_numeric_position,
	}: // initialTemplateTitleFontFamily,
	MainSlideProps) => {
		const {
			customTemplateBgColor,
			hasSelectedCustomTemplateBgColor,
			setInitialLoadedTitleFontFamily,
			HasSelectedCustomizedTemplateTitleFontFamily,
			setHasSelectedCustomizedTemplateTitleFontFamily,
		} = useSlides();
		const ChosenLayoutNonCover =
			layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
		const ChosenLayoutCover =
			layoutOptions[layoutOptionCover as keyof typeof layoutOptions];

		// useEffect(() => {
		// 	// set initial loaded title font family
		// 	console.log(
		// 		'themeElements titleFontCSS fontFamily',
		// 		themeElements?.titleFontCSS.fontFamily,
		// 	);
		// 	setInitialLoadedTitleFontFamily(themeElements?.titleFontCSS.fontFamily);
		// }, []);

		return (
			<>
				{/* for not-cover page slides */}
				<div
					className={`${
						!isCoverPage
							? 'rounded-md w-full h-full bg-cover box-border border-none relative'
							: 'hidden '
					} `}
					style={{
						backgroundImage:
							themeElements?.isGradientBackground &&
							!hasSelectedCustomTemplateBgColor
								? themeElements.backgroundColor
								: undefined,
						backgroundColor:
							!themeElements?.isGradientBackground ||
							hasSelectedCustomTemplateBgColor
								? themeElements.backgroundColor
								: undefined,
					}}
				>
					{/* background picture when user uploaded this  */}
					{uploadedBackgroundImageUrl && (
						<div
							style={{
								...uploadedBackgroundImgStyle,
								opacity: layoutOptionNonCover === 'Blank_layout' ? 1 : 0.5,
							}}
						>
							<Image
								style={{ objectFit: 'cover', height: '100%' }}
								width={960}
								height={540}
								src={`${uploadedBackgroundImageUrl}`}
								alt='Background Image'
								unoptimized={true}
							/>
						</div>
					)}
					<ChosenLayoutNonCover
						content={content}
						content_positions={content_positions}
						user_name={user_name}
						username_position={username_position}
						title={title}
						title_position={title_position}
						topic={topic}
						topic_position={topic_position}
						subtopic={subtopic}
						subtopic_position={subtopic_position}
						imgs={imgs}
						update_callback={update_callback}
						canEdit={canEdit}
						scale={scale}
						// autoSave={autoSave}
						isCoverPage={isCoverPage}
						layoutOptionNonCover={layoutOptionNonCover}
						layoutOptionCover={layoutOptionCover}
						themeElements={themeElements}
						layoutElements={layoutElements}
						templateLogo={templateLogo}
						charts={charts}
						ischarts={ischarts}
						handleSlideEdit={handleSlideEdit}
						currentSlideIndex={currentSlideIndex}
						image_positions={image_positions}
						image_container_positions={image_container_positions}
						embed_code={embed_code}
						media_types={media_types}
						logo_position={logo_position}
						logo_numeric_position={logo_numeric_position}
					></ChosenLayoutNonCover>
				</div>
				{/* for cover page */}
				<div
					className={`${
						isCoverPage
							? 'rounded-md w-full h-full bg-cover flex flex-row justify-start items-start box-border border-none relative'
							: 'hidden'
					} `}
					style={{
						backgroundImage:
							themeElements?.isGradientBackground &&
							!hasSelectedCustomTemplateBgColor
								? themeElements.backgroundColorCover
								: undefined,
						backgroundColor:
							!themeElements?.isGradientBackground ||
							hasSelectedCustomTemplateBgColor
								? themeElements.backgroundColorCover
								: undefined,
					}}
				>
					{/* background picture when user uploaded this  */}
					{uploadedBackgroundImageUrl && (
						<div
							style={{
								...uploadedBackgroundImgStyle,
								opacity: layoutOptionNonCover === 'Blank_layout' ? 1 : 0.5,
							}}
						>
							<Image
								style={{ objectFit: 'cover', height: '100%' }}
								width={960}
								height={540}
								src={`${uploadedBackgroundImageUrl}`}
								alt='Background Image'
								unoptimized={true}
							/>
						</div>
					)}
					<ChosenLayoutCover
						content={content}
						content_positions={content_positions}
						user_name={user_name}
						username_position={username_position}
						title={title}
						title_position={title_position}
						topic={topic}
						topic_position={topic_position}
						subtopic={subtopic}
						subtopic_position={subtopic_position}
						imgs={imgs}
						update_callback={update_callback}
						canEdit={canEdit}
						scale={scale}
						// autoSave={autoSave}
						isCoverPage={isCoverPage}
						layoutOptionNonCover={layoutOptionNonCover}
						layoutOptionCover={layoutOptionCover}
						themeElements={themeElements}
						layoutElements={layoutElements}
						templateLogo={templateLogo}
						charts={charts}
						ischarts={ischarts}
						handleSlideEdit={handleSlideEdit}
						currentSlideIndex={currentSlideIndex}
						image_positions={image_positions}
						image_container_positions={image_container_positions}
						embed_code={embed_code}
						media_types={media_types}
						logo_position={logo_position}
						logo_numeric_position={logo_numeric_position}
					></ChosenLayoutCover>
				</div>
			</>
		);
	};
};

// generate all templates

const Stanford_school_template = generateTemplate('Stanford_school_template');
const Berkeley_school_template = generateTemplate('Berkeley_school_template');
const Harvard_school_template = generateTemplate('Harvard_school_template');
const MIT_school_template = generateTemplate('MIT_school_template');
const Princeton_school_template = generateTemplate('Princeton_school_template');
const Caltech_school_template = generateTemplate('Caltech_school_template');
const Columbia_school_template = generateTemplate('Columbia_school_template');
const JHU_school_template = generateTemplate('JHU_school_template');
const University_of_Chicago_school_template = generateTemplate(
	'University_of_Chicago_school_template',
);
const Yale_school_template = generateTemplate('Yale_school_template');
const UPenn_school_template = generateTemplate('UPenn_school_template');
const Default = generateTemplate('Default');
const Fun_Education_001_template = generateTemplate(
	'Fun_Education_001_template',
);
const Business_002_template = generateTemplate('Business_002_template');
const Clean_Lifestyle_003_template = generateTemplate(
	'Clean_Lifestyle_003_template',
);
const Fun_Education_004_template = generateTemplate(
	'Fun_Education_004_template',
);
const Business_Dark_005_template = generateTemplate(
	'Business_Dark_005_template',
);
const Business_Light_006_template = generateTemplate(
	'Business_Light_006_template',
);
const Fun_Vibrant_007_template = generateTemplate('Fun_Vibrant_007_template');
const Simplistic_008_template = generateTemplate('Simplistic_008_template');
const New_Education_009_template = generateTemplate(
	'New_Education_009_template',
);
const Event_Report_010_template = generateTemplate('Event_Report_010_template');

const Creative_Brief_011_template = generateTemplate(
	'Creative_Brief_011_template',
);

const Business_Review_012_template = generateTemplate(
	'Business_Review_012_template',
);
export interface MainSlideProps {
	user_name: JSX.Element;
	username_position: Position;
	title: JSX.Element;
	title_position: Position;
	topic: JSX.Element;
	topic_position: Position;
	subtopic: JSX.Element;
	subtopic_position: Position;
	content: JSX.Element | JSX.Element[];
	content_positions: Position[];
	imgs: string[];
	//   imgs: JSX.Element
	update_callback: (
		imgs: string[],
		ischart: boolean[],
		image_positions: Position[],
		embed_code: string[],
		media_types: Media[],
	) => void;
	canEdit: boolean;
	scale: number;
	isCoverPage: boolean;
	layoutOptionNonCover: LayoutKeys;
	layoutOptionCover: LayoutKeys;
	brandingColor?: string;
	templateLogo?: JSX.Element;
	uploadedLogoUrl?: string;
	uploadedBackgroundImageUrl?: string;
	charts: Chart[];
	ischarts: boolean[];
	handleSlideEdit: Function;
	currentSlideIndex: number;
	image_positions: Position[];
	image_container_positions: Position[];
	palette?: PaletteKeys;
	template?: TemplateKeys;
	themeElements: ThemeElements;
	layoutElements: LayoutElements;
	embed_code: string[];
	media_types: Media[];
	logo_position: LogoPosition;
	logo_numeric_position: Position;
	// initialTemplateTitleFontFamily?: string;
}

// deprecated
export const useLocalImgs = (
	imgs: string[],
	imgCount: number,
	update_callback: (imgs: string[]) => void,
) => {
	const initialImgs = useMemo(() => {
		let cleanedImgs = imgs.filter((url) => url !== '');
		if (cleanedImgs.length > imgCount) {
			cleanedImgs = cleanedImgs.slice(0, imgCount);
		} else if (cleanedImgs.length < imgCount) {
			cleanedImgs = [
				...cleanedImgs,
				...new Array(imgCount - cleanedImgs.length).fill(''),
			];
		}
		return cleanedImgs;
	}, [imgs, imgCount]);

	const [localImgs, setLocalImgs] = useState<string[]>(initialImgs);

	useEffect(() => {
		update_callback(localImgs);
	}, [localImgs]);

	const updateImgAtIndex = (index: number) => {
		const updateLocalImgs = (url: string) => {
			const newLocalImgs = [...localImgs];
			newLocalImgs[index] = url;
			setLocalImgs(newLocalImgs);
			console.log('updateLocalImgs', newLocalImgs);
		};
		return updateLocalImgs;
	};

	return { localImgs, updateImgAtIndex };
};

export type PaletteKeys =
	| 'Original'
	| 'Blue'
	| 'Red'
	| 'Yellow'
	| 'Dynamic Purple'
	| 'Light Cyan'
	| 'Royal Blue'
	| 'Beeswax'
	| 'Ecru White'
	| 'Shark Black'
	| 'Moon Mist'
	| 'Regent St Blue'
	| 'Perfume'
	| 'Jonquil'
	| 'Morning Glory'
	| 'Azalea'
	| 'Saffron'
	| 'Feta'
	| 'Catskill White'
	| 'Customize'
	| 'Serenade'
	| 'Seashell'
	| 'Cod Gray'
	| '';

// add template keys here
export const availableTemplates = {
	Stanford: Stanford_school_template,
	Berkeley: Berkeley_school_template,
	Harvard: Harvard_school_template,
	MIT: MIT_school_template,
	Princeton: Princeton_school_template,
	Caltech: Caltech_school_template,
	Columbia: Columbia_school_template,
	JHU: JHU_school_template,
	UChicago: University_of_Chicago_school_template,
	Yale: Yale_school_template,
	UPenn: UPenn_school_template,
	Default: Default,
	Fun_Education_001: Fun_Education_001_template,
	Business_002: Business_002_template,
	Clean_Lifestyle_003: Clean_Lifestyle_003_template,
	Fun_Education_004: Fun_Education_004_template,
	Business_Dark_005: Business_Dark_005_template,
	Business_Light_006: Business_Light_006_template,
	Fun_Vibrant_007: Fun_Vibrant_007_template,
	Simplistic_008: Simplistic_008_template,
	New_Education_009: New_Education_009_template,
	Event_Report_010: Event_Report_010_template,
	Creative_Brief_011: Creative_Brief_011_template,
	Business_Review_012: Business_Review_012_template,
};

export const templateDisplayNames = {
	// extracted_from_pptx: 'Use my own template (extract from pptx file)',
	Simplistic_008: '🌅 Simplistic',
	New_Education_009: '📚 Education',
	Event_Report_010: '📈 Report',
	Creative_Brief_011: ' ✨ Creative Brief',
	Business_Review_012: '🔍 Business Review',
	Default: '📃 Blank',
	Business_002: '📎 Business',
	Business_Dark_005: '💼 Business Dark',
	Business_Light_006: '📄 Business Light',
	Clean_Lifestyle_003: '☀️ Clean Lifestyle',
	Fun_Education_004: '🍿 Fun',
	Fun_Vibrant_007: '🎨 Vibrant',
	Fun_Education_001: '📚 Bright',
	Stanford: '🏛️ Stanford University',
	Berkeley: '🏛️ UC Berkeley',
	Harvard: '🏛️ Harvard University',
	MIT: '🏛️ Massachusetts Institute of Technology',
	Princeton: '🏛️ Princeton University',
	Caltech: '🏛️ California Institute of Technology',
	Columbia: '🏛️ Columbia University',
	JHU: '🏛️ Johns Hopkins University',
	Yale: '🏛️ Yale University',
	UPenn: '🏛️ University of Pennsylvania',
};

// Define a type for template keys
type AvailableTemplateKeys = keyof typeof availableTemplates;
// Define a type for additional template keys
type AdditionalTemplateKeys = 'Default_template';
// type AdditionalTemplateKeys = 'Default_template' | 'extracted_from_pptx';

// Combine both types using a union
export type TemplateKeys = AvailableTemplateKeys | AdditionalTemplateKeys;

// Define templateKeys with the type TemplateKeys
// export const TemplateKeys: TemplateKeys[] = Object.keys(
// 	availableTemplates,
// ) as TemplateKeys[];

export const uploadedBackgroundImgStyle = {
	zIndex: 0,
	width: '100%',
	height: '100%',
	position: 'absolute' as const, // Specify 'absolute' as a valid value for position
	pointerEvents: 'none' as const,
	top: '0%',
	opacity: '0.5',
};
