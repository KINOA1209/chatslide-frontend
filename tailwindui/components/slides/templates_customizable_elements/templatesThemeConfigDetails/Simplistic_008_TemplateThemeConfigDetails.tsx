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
		backgroundColorCover: '#A388F7',
		// isGradientBackground: true,
		// backgroundColorCover: 'linear-gradient(to bottom right, #7E96F7, #A388F7)',
		// backgroundColor: 'linear-gradient(to bottom right, #7E96F7, #A388F7)',
		backgroundColor: '#A388F7',
		titleFontCSS: {
			fontSize: '14pt',
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#FFFFFF',
			textTransform: 'uppercase', // Add this line to capitalize the text
		},
		subtopicFontCSS: {
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			fontSize: '24pt',
			lineHeight: 1,
			color: '#FFFFFF',
			overflowY: 'hidden',
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
			fontSize: '30pt',
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
		backgroundColorCover: '#ECF4F9',
		backgroundColor: '#ECF4F9',
		titleFontCSS: {
			fontSize: '14pt',
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#0D0451',
			textTransform: 'uppercase', // Add this line to capitalize the text
		},
		subtopicFontCSS: {
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Regular',
			fontSize: '24pt',
			lineHeight: 1,
			color: '#0D0451',
			overflowY: 'hidden',
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
			fontSize: '30pt',
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
		backgroundColorCover: '#5A55F4',
		backgroundColor: '#5A55F4',
		titleFontCSS: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#EDFDCA',
			textTransform: 'uppercase', // Add this line to capitalize the text
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'DM Sans Bold',
			fontSize: '24pt',
			lineHeight: 1,
			color: '#EDFDCA',
			overflowY: 'hidden',
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
			fontSize: '30pt',
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
		backgroundColorCover: '#FDF1C4',
		backgroundColor: '#FDF1C4',
		titleFontCSS: {
			fontSize: '14pt',
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			lineHeight: 1.2,
			color: '#F44737',
			textTransform: 'uppercase', // Add this line to capitalize the text
		},
		subtopicFontCSS: {
			fontWeight: 'Bold',
			fontFamily: 'DM Sans Bold',
			fontSize: '24pt',
			lineHeight: 1,
			color: '#F44737',
			overflowY: 'hidden',
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
			fontSize: '30pt',
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
