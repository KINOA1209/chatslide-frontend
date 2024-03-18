// YourConfig.tsx
import { LayoutKeys } from '../slideLayout';
import { TemplateKeys } from '../slideTemplates';
import { StanfordTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/StanfordTemplateLayoutsConfig';
import { Clean_Lifestyle_003_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Clean_Lifestyle_003_TemplateLayoutsConfig';
import { Business_002_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Business_002_TemplateLayoutsConfig';
import { Fun_Education_004_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Fun_Education_004_TemplateLayoutsConfig';
import { Fun_Education_001_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Fun_Education_001_TemplateLayoutsConfig';
import { Default_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Default_TemplateLayoutsConfig';
import { Fun_Vibrant_007_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Fun_Vibrant_007_TemplateLayoutsConfig';
import { Business_Dark_005_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Business_Dark_005_TemplateLayoutsConfig';
import { Business_Light_006_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Business_Light_006_TemplateLayoutsConfig';
import { BerkeleyTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/BerkeleyTemplateLayoutsConfig';
import { HarvardTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/HarvardTemplateLayoutsConfig';
import { MITTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/MITTemplateLayoutsConfig';
import { CaltechTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/CaltechTemplateLayoutsConfig';
import { PrincetonTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/PrincetonTemplateLayoutsConfig';
import { UPennTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/UPennTemplateLayoutsConfig';
import { YaleTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/YaleTemplateLayoutsConfig';
import { JHUTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/JHUTemplateLayoutsConfig';
import { ColumbiaTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/ColumbiaTemplateLayoutsConfig';
import { UChicagoTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/UChicagoLayoutsConfigDetails';
export type LayoutElements = {
	canvaCSS?: React.CSSProperties;
	logoCSS?: React.CSSProperties;
	backgroundCSS?: React.CSSProperties;
	titleCSS?: React.CSSProperties;
	headCSS?: React.CSSProperties;
	topicCSS?: React.CSSProperties;
	subtopicCSS?: React.CSSProperties;
	contentCSS?: React.CSSProperties;
	userNameCSS?: React.CSSProperties;
	imageCSS?: React.CSSProperties;
	imageContainerCSS?: React.CSSProperties;
	columnCSS?: React.CSSProperties;
	visualElementsCSS?: React.CSSProperties; // if a certain layout of one page needs some visual elements on top.
	titleAndSubtopicBoxCSS?: React.CSSProperties;
	contentContainerCSS?: React.CSSProperties;
	contentIndexCSS?: React.CSSProperties;
	contentIndexTextDividerCSS?: React.CSSProperties;
	contentTextCSS?: React.CSSProperties;
	userNameTextDividerCSS?: React.CSSProperties;
	titlesAndContentDividerCSS?: React.CSSProperties;
	rndContainerCSS?: React.CSSProperties;
	rndCSS?: React.CSSProperties;
};

export type TemplateLayoutsConfig = {
	[templateName in TemplateKeys]?: {
		[key in LayoutKeys]?: LayoutElements;
	};
};

const layoutConfigData: TemplateLayoutsConfig = {
	Fun_Education_001: Fun_Education_001_TemplateLayoutsConfig,
	Business_002: Business_002_TemplateLayoutsConfig,
	Clean_Lifestyle_003: Clean_Lifestyle_003_TemplateLayoutsConfig,
	Fun_Education_004: Fun_Education_004_TemplateLayoutsConfig,
	Business_Dark_005: Business_Dark_005_TemplateLayoutsConfig,
	Business_Light_006: Business_Light_006_TemplateLayoutsConfig,
	Fun_Vibrant_007: Fun_Vibrant_007_TemplateLayoutsConfig,
	Default: Default_TemplateLayoutsConfig,
	Berkeley: BerkeleyTemplateLayoutsConfig,
	Stanford: StanfordTemplateLayoutsConfig,
	Harvard: HarvardTemplateLayoutsConfig,
	MIT: MITTemplateLayoutsConfig,
	Princeton: PrincetonTemplateLayoutsConfig,
	Caltech: CaltechTemplateLayoutsConfig,
	Columbia: ColumbiaTemplateLayoutsConfig,
	JHU: JHUTemplateLayoutsConfig,
	UChicago: UChicagoTemplateLayoutsConfig,
	Yale: YaleTemplateLayoutsConfig,
	UPenn: UPennTemplateLayoutsConfig,
};

export default layoutConfigData;
