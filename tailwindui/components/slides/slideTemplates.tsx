import { useEffect, useMemo, useState } from 'react';
// import { TemplatesLogos } from './templates_customizable_elements/Templates_logos';
import { Berkeley_school_template } from './school_templates/Berkeley_school_template';
import { Harvard_school_template } from './school_templates/Harvard_school_template';
import { Stanford_school_template } from './school_templates/Stanford_school_template';
import { MIT_school_template } from './school_templates/MIT_school_template';
import { Princeton_school_template } from './school_templates/Princeton_University_school_template';
import { Caltech_school_template } from './school_templates/Caltech_school_template';
import { Columbia_school_template } from './school_templates/Columbia_University_school_template';
import { JHU_school_template } from './school_templates/Johns_Hopkins_University_school_template';
import { University_of_Chicago_school_template } from './school_templates/University_of_Chicago_school_template';
import { Yale_school_template } from './school_templates/Yale_school_template';
import { UPenn_school_template } from './school_templates/University_of_Pennsylvania_school_template';

import { Default } from './new_templates/Default_template';
import { Fun_Education_001_template } from './new_templates/Fun_Education_001_templates';
import { Clean_Lifestyle_003_template } from './new_templates/Clean_Lifestyle_003_template';
import { Fun_Education_004_template } from './new_templates/Fun_Education_004_template';
import { Business_002_template } from './new_templates/Business_002_template';
import { Fun_Vibrant_007_template } from './new_templates/Fun_Vibrant_007_template';
import { Business_Light_006_template } from './new_templates/Business_Light_006_template';
import { Simplistic_008_template } from './new_templates/Simplistic_008_template';
import { LayoutKeys } from './slideLayout';
import { layoutOptions } from './slideLayout';
import {
	loadCustomizableElements,
	loadLayoutConfigElements,
} from './SlidesHTML';
import Image from 'next/image';
import { SlideKeys } from '@/models/Slide';
import Chart from '@/models/Chart';
import ImagesPosition from '@/models/ImagesPosition';
import { Business_Dark_005_template } from './new_templates/Business_Dark_005_template';

export interface MainSlideProps {
	user_name: JSX.Element;
	title: JSX.Element;
	topic: JSX.Element;
	subtopic: JSX.Element;
	content: JSX.Element | JSX.Element[];
	imgs: string[];
	//   imgs: JSX.Element
	update_callback: (
		imgs: string[],
		ischart: boolean[],
		images_position: ImagesPosition[],
	) => void;
	canEdit: boolean;
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
	isShowingLogo?: boolean;
	images_position: ImagesPosition[];
	color_theme?: ColorThemeKeys;
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

export type ColorThemeKeys = 'Original' | 'Blue' | 'Red' | 'Yellow' | '';

export type availableColorThemesObject = {
	[templateName in TemplateKeys]?: ColorThemeKeys[];
};

export const availableColorThemes: availableColorThemesObject = {
	Stanford: ['Original'],
	Berkeley: ['Original'],
	Harvard: ['Original'],
	MIT: ['Original'],
	Princeton: ['Original'],
	Caltech: ['Original'],
	Columbia: ['Original'],
	JHU: ['Original'],
	UChicago: ['Original'],
	Yale: ['Original'],
	UPenn: ['Original'],
	Default: ['Original'],
	Fun_Education_001: ['Original'],
	Business_002: ['Original'],
	Clean_Lifestyle_003: ['Original'],
	Fun_Education_004: ['Original'],
	Business_Dark_005: ['Original'],
	Business_Light_006: ['Original'],
	Fun_Vibrant_007: ['Original'],
	Simplistic_008: ['Original', 'Blue', 'Yellow', 'Red'],
};

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
};

// Define a type for template keys
type AvailableTemplateKeys = keyof typeof availableTemplates;
// Define a type for additional template keys
type AdditionalTemplateKeys = 'Default_template';

// Combine both types using a union
export type TemplateKeys = AvailableTemplateKeys | AdditionalTemplateKeys;

// Define templateKeys with the type TemplateKeys
// export const TemplateKeys: TemplateKeys[] = Object.keys(
// 	availableTemplates,
// ) as TemplateKeys[];
