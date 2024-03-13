import { ThemeElements } from '../theme_elements';

export const Business_Light_006_TemplateThemeConfig: ThemeElements = {
	backgroundColorCover: 'bg-[#FFFFFF]',
	backgroundColor: 'bg-[#FFFFFF]',
	titleFontCSS: {
		fontSize: '24pt',
		fontWeight: 'normal',
		fontFamily: 'Yrsa Medium',
		lineHeight: 1.2,
		// whiteSpace: 'nowrap',
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
	// userNameFont: 'text-[1rem] font-creato-regular font-normal leading-[100%]',
	// userNameFontColor: 'text-[#5F5F5F]',
	userNameFontCSS: {
		fontSize: '1rem', // Equivalent to text-sm
		// fontWeight: '400',
		fontFamily: 'Creato Display Regular',
		lineHeight: '140%', // Equivalent to leading-[140%]
		letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
		color: '#5F5F5F', // Equivalent to text-[#3D3D3D]
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
		lineHeight: 1.3, // leading-9 is equivalent to a line height of 1.5
		color: '#000000', // text-zinc-800 color
	},
};
