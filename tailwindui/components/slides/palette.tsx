import { ColorThemeKeys, TemplateKeys } from "./slideTemplates";

export type availablePalettesObject = {
	[templateName in TemplateKeys]?: ColorThemeKeys[];
};

const availablePalettes: availablePalettesObject = {
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

export default availablePalettes;
