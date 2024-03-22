import { ThemeElements } from '../theme_elements';
import { ColorThemeKeys, availableColorThemes } from '../../slideTemplates';

// type SimplisticColorThemes =
// 	(typeof availableColorThemes)['Simplistic_008'][number];
// const currentTemplateColorOptions =
// 	availableColorThemes['Simplistic_008'] ?? [];
// type AvailableColorThemeKeys = (typeof currentTemplateColorOptions)[number];
// type CurrentThemeConfig = {
// 	[colorTheme in AvailableColorThemeKeys]: ThemeElements;
// };

export const Simplistic_008_TemplateThemeConfig: {
	[key in ColorThemeKeys]?: ThemeElements;
} = {
	Original: {
		backgroundColorCover: 'bg-[#FFFFFF]',
		backgroundColor: 'bg-[#FFFFFF]',
		titleFontCSS: {
			fontSize: '24pt',
			fontWeight: 'normal',
			fontFamily: 'Yrsa Medium',
			lineHeight: 1.2,
			color: '#3E3E3E',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Helvetica Neue',
			fontSize: '16pt',
			lineHeight: 1,
			color: '#3E3E3E',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#000000',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '1rem',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#5F5F5F',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Yrsa Medium',
			lineHeight: 1.2,
			color: '#1C1B1F',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#000000',
		},
	},
	Blue: {
		backgroundColorCover: 'bg-[#35A3F9]',
		backgroundColor: 'bg-[#35A3F9]',
		titleFontCSS: {
			fontSize: '24pt',
			fontWeight: 'normal',
			fontFamily: 'Yrsa Medium',
			lineHeight: 1.2,
			color: '#3E3E3E',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Helvetica Neue',
			fontSize: '16pt',
			lineHeight: 1,
			color: '#3E3E3E',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#000000',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '1rem',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#5F5F5F',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Yrsa Medium',
			lineHeight: 1.2,
			color: '#35A3F9',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#000000',
		},
	},
	Red: {
		backgroundColorCover: 'bg-[#EF8888]',
		backgroundColor: 'bg-[#EF8888]',
		titleFontCSS: {
			fontSize: '24pt',
			fontWeight: 'normal',
			fontFamily: 'Yrsa Medium',
			lineHeight: 1.2,
			color: '#3E3E3E',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Helvetica Neue',
			fontSize: '16pt',
			lineHeight: 1,
			color: '#3E3E3E',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#000000',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '1rem',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#5F5F5F',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Yrsa Medium',
			lineHeight: 1.2,
			color: '#EF8888',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#000000',
		},
	},
	Yellow: {
		backgroundColorCover: 'bg-[#E1AD22]',
		backgroundColor: 'bg-[#E1AD22]',
		titleFontCSS: {
			fontSize: '44pt',
			fontWeight: 'normal',
			fontFamily: 'Yrsa Medium',
			lineHeight: 1.2,
			color: '#3E3E3E',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Helvetica Neue',
			fontSize: '16pt',
			lineHeight: 1,
			color: '#3E3E3E',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#000000',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '1rem',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#5F5F5F',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Yrsa Medium',
			lineHeight: 1.2,
			color: '#E1AD22',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#000000',
		},
	},
	// Add configurations for other color themes if needed
};
