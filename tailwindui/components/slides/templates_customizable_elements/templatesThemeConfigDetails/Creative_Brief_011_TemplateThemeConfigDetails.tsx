import { PaletteKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const Creative_Brief_011_TemplateThemeConfig: {
	[key in PaletteKeys]?: ThemeElements;
} = {
	Serenade: {
		backgroundUrlCoverImg1:
			'/images/template/Creative_Brief_011/Serenade/Cover_img_1_Background.png',
		backgroundUrlCoverImg0:
			'/images/template/Creative_Brief_011/Serenade/Cover_img_0_Background.png',
		backgroundUrlCol_1_img_0:
			'/images/template/Creative_Brief_011/Serenade/Col_1_img_0_Background.png',
		backgroundUrlCol_2_img_0:
			'/images/template/Creative_Brief_011/Serenade/Col_2_img_0_Background.png',
		backgroundUrlCol_3_img_0:
			'/images/template/Creative_Brief_011/Serenade/Col_3_img_0_Background.png',
		backgroundUrlCol_2_img_1:
			'/images/template/Creative_Brief_011/Serenade/Col_2_img_1_Background.png',
		backgroundUrlCol_1_img_1:
			'/images/template/Creative_Brief_011/Serenade/Col_1_img_1_Background.png',
		backgroundUrlCol_2_img_2:
			'/images/template/Creative_Brief_011/Serenade/Col_2_img_2_Background.png',
		backgroundUrlCol_3_img_3:
			'/images/template/Creative_Brief_011/Serenade/Col_3_img_3_Background.png',

		backgroundColorCover: '#FFFFFF', //Lin: with a background image and shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		backgroundColor: '#FFFFFF', //Lin: Text box color #E4F9F6, shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		// backgroundColorCoverImg0: '#ACEAE1',
		titleFontCSS: {
			fontSize: '14pt', // text-3xl in points
			fontWeight: 'normal', // font-bold,(Lin: 700)
			fontFamily: 'Big Shoulders Display Bold', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[110%] is equivalent to a line height of 1.1
			// whiteSpace: 'nowrap', // whitespace-nowrap},
			color: '#333330', // text-[#8C1515] color
			opacity: 0.7,
		},
		subtopicFontCSS: {
			opacity: 1, // opacity-70
			fontWeight: 'normal', // font-nimbus-sans-bold (Lin: 500)
			fontFamily: 'Big Shoulders Display SemiBold', // font-nimbus-sans-bold
			fontSize: '24pt', // text-xl in points
			fontStyle: 'normal', // font-normal
			lineHeight: 1, // leading-[150%] is equivalent to a line height of 1.5
			color: '#333330', // text-red-800 color
		},
		contentFontCSS: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal (Lin: 400)
			fontFamily: 'Inter Regular', // font-nimbus-sans-regular
			lineHeight: 1.5, // leading-9 is equivalent to a line height of 1.5
			color: '#333330', // text-zinc-800 color
			display: 'list-item',
		},
		// userNameFont: 'text-sm font-creato-regular  font-normal leading-[100%]',
		// userNameFontColor: 'text-[#868686]', //(Lin: color #868686)
		userNameFontCSS: {
			fontSize: '12pt', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Inter Regular',
			lineHeight: '140%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: '#333330', // Equivalent to text-[#3D3D3D]
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-bold, (Lin: 700)
			fontFamily: 'Big Shoulders Display Bold', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#333330', // text-white color
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal (Lin: 400)
			fontFamily: 'Inter Regular', // font-nimbus-sans-regular
			lineHeight: 1.5, // leading-9 is equivalent to a line height of 1.5
			color: '#333330', // text-zinc-800 color
		},
	},

	Seashell: {
		backgroundUrlCoverImg1:
			'/images/template/Creative_Brief_011/Seashell/Cover_img_1_Background.png',
		backgroundUrlCoverImg0:
			'/images/template/Creative_Brief_011/Seashell/Cover_img_0_Background.png',
		backgroundUrlCol_1_img_0:
			'/images/template/Creative_Brief_011/Seashell/Col_1_img_0_Background.png',
		backgroundUrlCol_2_img_0:
			'/images/template/Creative_Brief_011/Seashell/Col_2_img_0_Background.png',
		backgroundUrlCol_3_img_0:
			'/images/template/Creative_Brief_011/Seashell/Col_3_img_0_Background.png',
		backgroundUrlCol_2_img_1:
			'/images/template/Creative_Brief_011/Seashell/Col_2_img_1_Background.png',
		backgroundUrlCol_1_img_1:
			'/images/template/Creative_Brief_011/Seashell/Col_1_img_1_Background.png',
		backgroundUrlCol_2_img_2:
			'/images/template/Creative_Brief_011/Seashell/Col_2_img_2_Background.png',
		backgroundUrlCol_3_img_3:
			'/images/template/Creative_Brief_011/Seashell/Col_3_img_3_Background.png',

		backgroundColorCover: '#FFFFFF', //Lin: with a background image and shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		backgroundColor: '#FFFFFF', //Lin: Text box color #E4F9F6, shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		// backgroundColorCoverImg0: '#ACEAE1',
		titleFontCSS: {
			fontSize: '14pt', // text-3xl in points
			fontWeight: 'normal', // font-bold,(Lin: 700)
			fontFamily: 'Big Shoulders Display Bold', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[110%] is equivalent to a line height of 1.1
			// whiteSpace: 'nowrap', // whitespace-nowrap},
			color: '#333330', // text-[#8C1515] color
			opacity: 0.7,
		},
		subtopicFontCSS: {
			opacity: 1, // opacity-70
			fontWeight: 'normal', // font-nimbus-sans-bold (Lin: 500)
			fontFamily: 'Big Shoulders Display SemiBold', // font-nimbus-sans-bold
			fontSize: '24pt', // text-xl in points
			fontStyle: 'normal', // font-normal
			lineHeight: 1, // leading-[150%] is equivalent to a line height of 1.5
			color: '#333330', // text-red-800 color
		},
		contentFontCSS: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal (Lin: 400)
			fontFamily: 'Inter Regular', // font-nimbus-sans-regular
			lineHeight: 1.5, // leading-9 is equivalent to a line height of 1.5
			color: '#333330', // text-zinc-800 color
			display: 'list-item',
		},
		// userNameFont: 'text-sm font-creato-regular  font-normal leading-[100%]',
		// userNameFontColor: 'text-[#868686]', //(Lin: color #868686)
		userNameFontCSS: {
			fontSize: '12pt', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Inter Regular',
			lineHeight: '140%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: '#333330', // Equivalent to text-[#3D3D3D]
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-bold, (Lin: 700)
			fontFamily: 'Big Shoulders Display Bold', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#333330', // text-white color
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal (Lin: 400)
			fontFamily: 'Inter Regular', // font-nimbus-sans-regular
			lineHeight: 1.5, // leading-9 is equivalent to a line height of 1.5
			color: '#333330', // text-zinc-800 color
		},
	},
};
