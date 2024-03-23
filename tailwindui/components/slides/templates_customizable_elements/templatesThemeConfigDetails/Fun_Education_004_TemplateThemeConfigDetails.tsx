import { ColorThemeKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const Fun_Education_004_TemplateThemeConfig: {
	[key in ColorThemeKeys]?: ThemeElements;
} = {
	Original: {
		backgroundUrlCoverImg1:
			'/images/template/Fun_Education_004/BackgroundElements.png',
		backgroundUrlCoverImg0:
			'/images/template/Fun_Education_004/BackgroundElements.png',
		backgroundUrlCol_1_img_0:
			'/images/template/Fun_Education_004/BackgroundElementsCol1_2_3_img_0.png',
		backgroundUrlCol_2_img_0:
			'/images/template/Fun_Education_004/BackgroundElementsCol1_2_3_img_0.png',
		backgroundUrlCol_3_img_0:
			'/images/template/Fun_Education_004/BackgroundElementsCol1_2_3_img_0.png',
		backgroundUrlCol_2_img_1:
			'/images/template/Fun_Education_004/BackgroundElementsCol_2_img_1.png',
		backgroundUrlCol_1_img_1:
			'/images/template/Fun_Education_004/BackgroundElementsCol_1_img_1.png',
		backgroundUrlCol_2_img_2:
			'/images/template/Fun_Education_004/BackgroundElementsCol_2_img_2.png',
		backgroundUrlCol_3_img_3:
			'/images/template/Fun_Education_004/BackgroundElementsCol_3_img_3.png',

		backgroundColorCover: 'bg-[#FFFFFF]', //Lin: with a background image and shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		backgroundColor: 'bg-[#FFFFFF]', //Lin: Text box color #E4F9F6, shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		backgroundColorCoverImg0: '#ACEAE1',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold,(Lin: 700)
			fontFamily: 'Caveat', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[110%] is equivalent to a line height of 1.1
			// whiteSpace: 'nowrap', // whitespace-nowrap},
			color: '#4B4B4B', // text-[#8C1515] color
		},
		subtopicFontCSS: {
			opacity: 1, // opacity-70
			fontWeight: 'normal', // font-nimbus-sans-bold (Lin: 500)
			fontFamily: 'Helvetica Neue', // font-nimbus-sans-bold
			fontSize: '16pt', // text-xl in points
			fontStyle: 'normal', // font-normal
			lineHeight: 1, // leading-[150%] is equivalent to a line height of 1.5
			color: '#BCBCBC', // text-red-800 color
		},
		contentFontCSS: {
			fontSize: '16pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal (Lin: 400)
			fontFamily: 'Helvetica Neue', // font-nimbus-sans-regular
			lineHeight: 1.3, // leading-9 is equivalent to a line height of 1.5
			color: '#4B4B4B', // text-zinc-800 color
			display: 'list-item',
		},
		// userNameFont: 'text-sm font-creato-regular  font-normal leading-[100%]',
		// userNameFontColor: 'text-[#868686]', //(Lin: color #868686)
		userNameFontCSS: {
			fontSize: '1rem', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: '#868686', // Equivalent to text-[#3D3D3D]
		},
		headFontCSS: {
			fontSize: '30pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-bold, (Lin: 700)
			fontFamily: 'Caveat', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#2E2E2E', // text-white color
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Helvetica Neue', // font-nimbus-sans-regular
			lineHeight: 1.3, // leading-9 is equivalent to a line height of 1.5
			color: '#4B4B4B', // text-zinc-800 color
		},
	},
};
