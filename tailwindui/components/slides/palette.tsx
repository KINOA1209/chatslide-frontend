import { PaletteKeys, TemplateKeys } from './slideTemplates';

export type availablePalettesObject = {
	[templateName in TemplateKeys]?: PaletteKeys[];
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
	Simplistic_008: ['Dynamic Purple', 'Light Cyan', 'Royal Blue', 'Beeswax'],
	New_Education_009: [
		'Ecru White',
		'Moon Mist',
		'Regent St Blue',
		'Shark Black',
	],
	Event_Report_010: [
		'Perfume',
		'Jonquil',
		'Morning Glory',
		'Azalea',
		'Saffron',
		'Feta',
		'Catskill White',
	],
};

export const lightColorPalette: PaletteKeys[] = [
	'Light Cyan',
	'Beeswax',
	'Moon Mist',
	'Ecru White',
	'Regent St Blue',
	'Catskill White',
	'Saffron',
	'Feta',
	'Morning Glory',
	'Jonquil',
];

export const darkColorPalette: PaletteKeys[] = [
	'Dynamic Purple',
	'Royal Blue',
	'Shark Black',
	'Perfume',
	'Azalea',
];

export default availablePalettes;
