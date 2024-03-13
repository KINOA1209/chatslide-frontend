// YourConfig.tsx
import { TemplateKeys } from '../slideTemplates';
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
};

export type ThemeConfig = {
	[templateName in TemplateKeys]?: ThemeElements;
};

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
};

export default themeConfigData;
