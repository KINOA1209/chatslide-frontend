import { PaletteKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const Fun_Vibrant_007_TemplateThemeConfig: {
	[key in PaletteKeys]?: ThemeElements;
} = {
	Original: {
		backgroundUrlCoverImg1:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCover_img_0.png',
		backgroundUrlCoverImg0:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCover_img_0.png',
		backgroundUrlCol_1_img_0:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCol_1_img_0.png',
		backgroundUrlCol_2_img_0:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCol_2_img_0.png',
		backgroundUrlCol_3_img_0:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCol_3_img_0.png',
		backgroundUrlCol_2_img_1:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCol_2_img_1.png',
		backgroundUrlCol_1_img_1:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCol_1_img_1.png',
		backgroundUrlCol_2_img_2:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCol_2_img_2.png',
		backgroundUrlCol_3_img_3:
			'/images/template/Fun_Vibrant_007/BackgroundElementsCol_3_img_3.png',

		backgroundColorCover: '#FFFFFF',
		backgroundColor: '#FFFFFF',
		titleFontCSS: {
			fontSize: '24pt',
			fontWeight: 'bold',
			fontFamily: 'Brygada 1918 SemiBold',
			lineHeight: 1.2,
			// whiteSpace: 'nowrap',
			color: '#004260',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Helvetica Neue',
			fontSize: '16pt',
			lineHeight: 1,
			color: '#004260',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Helvetica Neue',
			lineHeight: 1.3,
			color: '#000000',
			display: 'list-item',
		},
		// userNameFont: 'text-[1rem] font-creato-regular font-normal leading-[100%]',
		// userNameFontColor: 'text-[#838383]',
		userNameFontCSS: {
			fontSize: '1rem', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Creato Display Regular',
			lineHeight: '100%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: '#000000', // Equivalent to text-[#3D3D3D]
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Brygada 1918 Semibold',
			lineHeight: 1.2,
			color: '#004260',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Helvetica Neue', // font-nimbus-sans-regular
			lineHeight: 1.3, // leading-9 is equivalent to a line height of 1.5
			color: '#000000', // text-zinc-800 color
		},
	},
};
