import { PaletteKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const Clean_Lifestyle_003_TemplateThemeConfig: {
	[key in PaletteKeys]?: ThemeElements;
} = {
	Original: {
		backgroundUrlCoverImg1:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundUrlCoverImg0:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundUrlCol_1_img_0:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundUrlCol_2_img_0:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundUrlCol_3_img_0:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundUrlCol_1_img_1:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundUrlCol_2_img_1:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundUrlCol_2_img_2:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundUrlCol_3_img_3:
			'/images/template/Clean_Lifestyle_003/BackgroundImg.png',
		backgroundColorCover: '#FFFFFF',
		backgroundColor: '#FFFFFF',
		// backgroundColorCoverImg0: '#000000',
		// backgroundUrlCover: 'https://via.placeholder.com/1200x800',
		titleFontCSS: {
			fontSize: '20pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Libre Baskerville Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#000', // text-black color
		},

		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#666666', // text-neutral-900 color
		},
		contentFontCSS: {
			fontSize: '16pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#000000', // text-neutral-900 color
			display: 'list-item',
		},
		// userNameFont:
		// 	'text-[14pt] font-normal leading-[140%] tracking-[0.026rem]',
		// userNameFontColor: 'text-[#A9A9A9]',
		userNameFontCSS: {
			fontSize: '1rem', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: 'black', // Equivalent to text-[#3D3D3D]
		},
		headFontCSS: {
			fontSize: '30pt', // text-4xl in points
			fontWeight: 'bold', // font-normal
			fontFamily: 'Libre Baskerville Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#000000', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '14pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#00000', // text-neutral-900 color
		},
	},
};
