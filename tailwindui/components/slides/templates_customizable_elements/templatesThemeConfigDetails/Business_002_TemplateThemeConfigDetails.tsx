import { ColorThemeKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const Business_002_TemplateThemeConfig: {
	[key in ColorThemeKeys]?: ThemeElements;
} = {
	Original: {
		backgroundUrlCoverImg0:
			'/images/template/Business_002/cover_img_0_layout/BackgroundImg.png',
		backgroundColorCover: '',
		backgroundColor: 'bg-[#FFFFFF]',
		backgroundColorCoverImg0: '#2E2E2E',
		titleFontCSS: {
			fontSize: '24pt',
			fontWeight: 'bold',
			fontFamily: 'Big Shoulders Text',
			lineHeight: 1.2,
			// whiteSpace: 'nowrap',
			color: '#2E2E2E',
		},
		subtopicFontCSS: {
			opacity: 1,
			fontWeight: 'bold',
			fontFamily: 'Arimo',
			fontSize: '16pt',
			fontStyle: 'normal',
			lineHeight: 1,
			color: '#6B7A2D',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Arimo',
			lineHeight: 1.3,
			color: '#2E2E2E',
			display: 'list-item',
		},
		// userNameFont:
		// 	'text-[16pt] font-Creato-Display-Medium font-normal leading-[100%]',
		// userNameFontColor: 'text-[#6B7A2D]',
		userNameFontCSS: {
			fontSize: '1rem', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: '#6B7A2D', // Equivalent to text-[#3D3D3D]
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Big Shoulders Text',
			lineHeight: 1.2,
			color: '#2E2E2E',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Arimo',
			lineHeight: 1.3,
			color: '#2E2E2E',
		},
	},
};
