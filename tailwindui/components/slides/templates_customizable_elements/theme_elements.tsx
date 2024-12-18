// YourConfig.tsx
import { PaletteKeys, TemplateKeys } from '../slideTemplates';

import { StanfordTemplateThemeConfig } from './templatesThemeConfigDetails/StanfordTemplateThemeConfig';
import { Clean_Lifestyle_003_TemplateThemeConfig } from './templatesThemeConfigDetails/Clean_Lifestyle_003_TemplateThemeConfigDetails';
import { Business_002_TemplateThemeConfig } from './templatesThemeConfigDetails/Business_002_TemplateThemeConfigDetails';
import { Fun_Education_001_TemplateThemeConfig } from './templatesThemeConfigDetails/Fun_Education_001_TemplateThemeConfigDetails';
import { Fun_Education_004_TemplateThemeConfig } from './templatesThemeConfigDetails/Fun_Education_004_TemplateThemeConfigDetails';
import { Default_TemplateThemeConfig } from './templatesThemeConfigDetails/Default_TemplateThemeConfigDetails';
import { Fun_Vibrant_007_TemplateThemeConfig } from './templatesThemeConfigDetails/Fun_Vibrant_007_TemplateThemeConfigDetails';
import { Business_Dark_005_TemplateThemeConfig } from './templatesThemeConfigDetails/Business_Dark_005_TemplateThemeConfigDetails';
import { Business_Light_006_TemplateThemeConfig } from './templatesThemeConfigDetails/Business_Light_006_TemplateThemeConfigDetails';
import { BerkeleyTemplateThemeConfig } from './templatesThemeConfigDetails/BerkeleyTemplateThemeConfig';
import { HarvardTemplateThemeConfig } from './templatesThemeConfigDetails/HarvardTemplateThemeConfig';
import { MITTemplateThemeConfig } from './templatesThemeConfigDetails/MITTemplateThemeConfig';
import { PrincetonTemplateThemeConfig } from './templatesThemeConfigDetails/PrincetonTemplateThemeConfig';
import { CaltechTemplateThemeConfig } from './templatesThemeConfigDetails/CaltechTemplateThemeConfig';
import { ColumbiaTemplateThemeConfig } from './templatesThemeConfigDetails/ColumbiaTemplateThemeConfig';
import { UChicagoTemplateThemeConfig } from './templatesThemeConfigDetails/UChicagoTemplateThemeConfig';
import { YaleTemplateThemeConfig } from './templatesThemeConfigDetails/YaleTemplateThemeConfig';
import { UPennTemplateThemeConfig } from './templatesThemeConfigDetails/UPennTemplateThemeConfig';
import { JHUTemplateThemeConfig } from './templatesThemeConfigDetails/JHUTemplateThemeConfig';
import { Simplistic_008_TemplateThemeConfig } from './templatesThemeConfigDetails/Simplistic_008_TemplateThemeConfigDetails';
import { New_Education_009_TemplateThemeConfig } from './templatesThemeConfigDetails/New_Education_009_TemplateThemeConfigDetails';
import { Event_Report_010_TemplateThemeConfig } from './templatesThemeConfigDetails/Event_Report_010_TemplateThemeConfigDetails';
import { Creative_Brief_011_TemplateThemeConfig } from './templatesThemeConfigDetails/Creative_Brief_011_TemplateThemeConfigDetails';
import { Business_Review_012_TemplateThemeConfig } from './templatesThemeConfigDetails/Business_Review_012_TemplateThemeConfigDetails';

export type ThemeElements = {
	backgroundColorCover?: string;
	backgroundColor?: string;
	backgroundColorCoverImg0?: string;
	backgroundUrlCoverImg1?: string;
	backgroundUrlCoverImg0?: string;
	backgroundUrlCol_1_img_0?: string;
	backgroundUrlDividerCol_1_img_0?: string;
	backgroundUrlCol_2_img_0?: string;
	backgroundUrlCol_3_img_0?: string;
	backgroundUrlCol_1_img_1?: string;
	backgroundUrlCol_2_img_1?: string;
	backgroundUrlCol_2_img_2?: string;
	backgroundUrlCol_3_img_3?: string;
	titleFontCSS: React.CSSProperties;
	subtopicFontCSS: React.CSSProperties;
	contentFontCSS: React.CSSProperties;
	userNameFontCSS: React.CSSProperties;
	userNameFont?: React.CSSProperties | string;
	userNameFontColor?: React.CSSProperties | string;
	headFontCSS: React.CSSProperties;
	contentFontCSS_non_vertical_content: React.CSSProperties;
	headFontAlignment?: React.CSSProperties;
	userNameAlignment?: React.CSSProperties;
	isGradientBackground?: boolean;
	// customize boxes background color
	titleAndSubtopicBoxBackgroundColor?: string;
	imageContainerBackgroundColor?: string;
	slideColumnBackgroundColor?: string;
	userNamaAndHeadColumnBackgroundColor?: string;
	slideCanvasBackgroundColor?: string;
	slideContentContainerBackgroundColor?: string;
};

export type ThemeConfig = {
	[templateName in TemplateKeys]?: {
		[key in PaletteKeys]?: ThemeElements;
	};
};

// type TemplatePalettes<T extends TemplateKeys> =
// 	keyof availablePalettesObject[T];

// export type ThemeConfig = {
// 	[templateName in TemplateKeys]?: {
// 		[palette: string]: ThemeElements; // Use conditional type to ensure palette matches available color options for the current template
// 	};
// };

const themeConfigData: ThemeConfig = {
	Stanford: StanfordTemplateThemeConfig,
	Berkeley: BerkeleyTemplateThemeConfig,
	Harvard: HarvardTemplateThemeConfig,
	MIT: MITTemplateThemeConfig,
	Princeton: PrincetonTemplateThemeConfig,
	Caltech: CaltechTemplateThemeConfig,
	Columbia: ColumbiaTemplateThemeConfig,
	JHU: JHUTemplateThemeConfig,
	UChicago: UChicagoTemplateThemeConfig,
	Yale: YaleTemplateThemeConfig,
	UPenn: UPennTemplateThemeConfig,
	Default: Default_TemplateThemeConfig,
	Fun_Education_001: Fun_Education_001_TemplateThemeConfig,
	Business_002: Business_002_TemplateThemeConfig,
	Clean_Lifestyle_003: Clean_Lifestyle_003_TemplateThemeConfig,
	Fun_Education_004: Fun_Education_004_TemplateThemeConfig,
	Business_Dark_005: Business_Dark_005_TemplateThemeConfig,
	Business_Light_006: Business_Light_006_TemplateThemeConfig,
	Fun_Vibrant_007: Fun_Vibrant_007_TemplateThemeConfig,
	Simplistic_008: Simplistic_008_TemplateThemeConfig,
	New_Education_009: New_Education_009_TemplateThemeConfig,
	Event_Report_010: Event_Report_010_TemplateThemeConfig,
	Creative_Brief_011: Creative_Brief_011_TemplateThemeConfig,
	Business_Review_012: Business_Review_012_TemplateThemeConfig,
};

export default themeConfigData;
