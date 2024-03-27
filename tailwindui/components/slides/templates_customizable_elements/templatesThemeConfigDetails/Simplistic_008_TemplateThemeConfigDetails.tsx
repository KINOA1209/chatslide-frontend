import { ThemeElements } from '../theme_elements';
import { PaletteKeys } from '../../slideTemplates';

// type SimplisticPalettes =
// 	(typeof availablePalettes)['Simplistic_008'][number];
// const currentTemplateColorOptions =
// 	availablePalettes['Simplistic_008'] ?? [];
// type AvailablePaletteKeys = (typeof currentTemplateColorOptions)[number];
// type CurrentThemeConfig = {
// 	[palette in AvailablePaletteKeys]: ThemeElements;
// };

export const Simplistic_008_TemplateThemeConfig: {
	[key in PaletteKeys]?: ThemeElements;
} = {
	'Dynamic Purple': {
		backgroundColorCover: 'bg-gradient-to-br from-[#7E96F7] to-[#A388F7]',
		backgroundColor: 'bg-gradient-to-br from-[#7E96F7] to-[#A388F7]',
		titleFontCSS: {
			fontSize: '16pt',
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#FFFFFF',
		},
		subtopicFontCSS: {
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			fontSize: '30pt',
			lineHeight: 1,
			color: '#FFFFFF',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Regular',
			lineHeight: 1.5,
			color: '#FFFFFF',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'DM Sans Medium',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#FFFFFF',
			opacity: '0.5',
		},
		headFontCSS: {
			fontSize: '48pt',
			fontWeight: 'bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#FFFFFF',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Regular',
			lineHeight: 1.5,
			color: '#FFFFFF',
		},
	},
	'Light Cyan': {
		backgroundColorCover: 'bg-[#ECF4F9]',
		backgroundColor: 'bg-[#ECF4F9]',
		titleFontCSS: {
			fontSize: '16pt',
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#0D0451',
		},
		subtopicFontCSS: {
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Regular',
			fontSize: '30pt',
			lineHeight: 1,
			color: '#0D0451',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Regular',
			lineHeight: 1.5,
			color: '#0D0451',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'DM Sans Medium',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#0D0451',
			opacity: '0.5',
		},
		headFontCSS: {
			fontSize: '48pt',
			fontWeight: 'bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#0D0451',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Regular',
			lineHeight: 1.5,
			color: '#0D0451',
		},
	},
	'Royal Blue': {
		backgroundColorCover: 'bg-[#5A55F4]',
		backgroundColor: 'bg-[#5A55F4]',
		titleFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#EDFDCA',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'DM Sans Bold',
			fontSize: '30pt',
			lineHeight: 1,
			color: '#EDFDCA',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Regular',
			lineHeight: 1.5,
			color: '#EDFDCA',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'DM Sans Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#EDFDCA',
			opacity: '0.5',
		},
		headFontCSS: {
			fontSize: '48pt',
			fontWeight: 'bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#EDFDCA',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Regular',
			lineHeight: 1.5,
			color: '#EDFDCA',
		},
	},
	Beeswax: {
		backgroundColorCover: 'bg-[#FDF1C4]',
		backgroundColor: 'bg-[#FDF1C4]',
		titleFontCSS: {
			fontSize: '16pt',
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#F44737',
		},
		subtopicFontCSS: {
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			fontSize: '30pt',
			lineHeight: 1,
			color: '#F44737',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Regular',
			lineHeight: 1.5,
			color: '#F44737',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'DM Sans Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#F44737',
			opacity: '0.5',
		},
		headFontCSS: {
			fontSize: '48pt',
			fontWeight: 'bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#F44737',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Regular',
			lineHeight: 1.5,
			color: '#F44737',
		},
	},
	// Add configurations for other color themes if needed
};
