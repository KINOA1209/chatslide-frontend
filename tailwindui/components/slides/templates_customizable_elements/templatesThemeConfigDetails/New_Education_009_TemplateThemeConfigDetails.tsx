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

export const New_Education_009_TemplateThemeConfig: {
	[key in PaletteKeys]?: ThemeElements;
} = {
	'Ecru White': {
		backgroundColorCover: 'bg-[#F5F1E2]',
		backgroundColor: 'bg-[#F5F1E2]',
		titleFontCSS: {
			fontSize: '14pt',
			fontWeight: 'bold',
			fontFamily: 'Open Sans Medium',
			lineHeight: 1.2,
			color: '#333330',
			textTransform: 'uppercase', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'bold',
			fontFamily: 'Georgia',
			fontSize: '24pt',
			lineHeight: 1,
			color: '#333330',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Open Sans Regular',
			lineHeight: 1.5,
			color: '#333330',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Open Sans Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#333330',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '32pt',
			fontWeight: 'bold',
			fontFamily: 'Georgia',
			lineHeight: 1.2,
			color: '#333330',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Open Sans Regular',
			lineHeight: 1.5,
			color: '#333330',
		},
	},
	'Shark Black': {
		backgroundColorCover: 'bg-[#272A2D]',
		backgroundColor: 'bg-[#272A2D]',
		titleFontCSS: {
			fontSize: '14pt',
			fontWeight: 'bold',
			fontFamily: 'Open Sans Medium',
			lineHeight: 1.2,
			color: '#F3F5F2',
			textTransform: 'uppercase', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'bold',
			fontFamily: 'Georgia',
			fontSize: '24pt',
			lineHeight: 1,
			color: '#F3F5F2',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Open Sans Regular',
			lineHeight: 1.5,
			color: '#F3F5F2',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Open Sans Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#F3F5F2',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '32pt',
			fontWeight: 'bold',
			fontFamily: 'Georgia',
			lineHeight: 1.2,
			color: '#F3F5F2',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Open Sans Regular',
			lineHeight: 1.5,
			color: '#F3F5F2',
		},
	},
	'Moon Mist': {
		backgroundColorCover: 'bg-[#DDDFD2]',
		backgroundColor: 'bg-[#DDDFD2]',
		titleFontCSS: {
			fontSize: '14pt',
			fontWeight: 'bold',
			fontFamily: 'Open Sans Medium',
			lineHeight: 1.2,
			color: '#26323B',
			textTransform: 'uppercase', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'bold',
			fontFamily: 'Georgia',
			fontSize: '24pt',
			lineHeight: 1,
			color: '#26323B',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Open Sans Regular',
			lineHeight: 1.5,
			color: '#26323B',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Open Sans Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#26323B',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '32pt',
			fontWeight: 'bold',
			fontFamily: 'Georgia',
			lineHeight: 1.2,
			color: '#26323B',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Open Sans Regular',
			lineHeight: 1.5,
			color: '#26323B',
		},
	},
	'Regent St Blue': {
		backgroundColorCover: 'bg-[#ACC9E0]',
		backgroundColor: 'bg-[#ACC9E0]',
		titleFontCSS: {
			fontSize: '14pt',
			fontWeight: 'bold',
			fontFamily: 'Open Sans Medium',
			lineHeight: 1.2,
			color: '#000000',
			textTransform: 'uppercase', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'bold',
			fontFamily: 'Georgia',
			fontSize: '24pt',
			lineHeight: 1,
			color: '#000000',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Open Sans Regular',
			lineHeight: 1.5,
			color: '#000000',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Open Sans Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#000000',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '32pt',
			fontWeight: 'bold',
			fontFamily: 'Georgia',
			lineHeight: 1.2,
			color: '#000000',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Open Sans Regular',
			lineHeight: 1.5,
			color: '#000000',
		},
	},
	// Add configurations for other color themes if needed
};
