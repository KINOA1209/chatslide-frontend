import { ColorThemeKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const Business_Dark_005_TemplateThemeConfig: {
	[key in ColorThemeKeys]?: ThemeElements;
} = {
	Original: {
		backgroundUrlCoverImg1:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',
		backgroundUrlCoverImg0:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',
		backgroundUrlCol_1_img_0:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',
		backgroundUrlCol_2_img_0:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',
		backgroundUrlCol_3_img_0:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',
		backgroundUrlCol_2_img_1:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',
		backgroundUrlCol_1_img_1:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',
		backgroundUrlCol_2_img_2:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',
		backgroundUrlCol_3_img_3:
			'/images/template/Business_Dark_005/BackgroundVisualElement.png',

		backgroundColorCover: 'bg-[#06163E]',
		backgroundColor: 'bg-[#06163E]',
		titleFontCSS: {
			fontSize: '24pt',
			fontWeight: 'normal',
			fontFamily: 'Playfair Display Bold',
			lineHeight: 1.2,
			// whiteSpace: 'nowrap',
			color: '#FFFFFF',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Assistant Medium',
			fontSize: '16pt',
			lineHeight: 1,
			color: '#8891AB',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3,
			color: '#FFFFFF',
			display: 'list-item',
		},
		// userNameFont: 'text-[1rem] font-creato-regular font-normal leading-[100%]',
		// userNameFontColor: 'text-[#8891AB]',
		userNameFontCSS: {
			fontSize: '1rem', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: '#8891AB', // Equivalent to text-[#3D3D3D]
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Playfair Display Medium',
			lineHeight: 1.2,
			color: '#FFFFFF',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Assistant Regular',
			lineHeight: 1.3, // leading-9 is equivalent to a line height of 1.5
			color: '#FFFFFF', // text-zinc-800 color
		},
	},
};
