import { PaletteKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const Business_Review_012_TemplateThemeConfig: {
	[key in PaletteKeys]?: ThemeElements;
} = {
	'Cod Gray': {
		userNamaAndHeadColumnBackgroundColor: '#FFFFFF',
		slideColumnBackgroundColor: '#FFFFFF',
		slideContentContainerBackgroundColor: '#FFFFFF',
		titleAndSubtopicBoxBackgroundColor: '#FFFFFF',
		backgroundColorCover: '#111111', //Lin: with a background image and shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		backgroundColor: '#111111', //Lin: Text box color #E4F9F6, shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		// backgroundColorCoverImg0: '#ACEAE1',
		titleFontCSS: {
			fontSize: '12pt', // text-3xl in points
			fontWeight: 'normal', // font-bold,(Lin: 700)
			fontFamily: 'Roboto Condensed Regular', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[110%] is equivalent to a line height of 1.1
			// whiteSpace: 'nowrap', // whitespace-nowrap},
			color: '#111111', // text-[#8C1515] color
			opacity: 0.7,
		},
		subtopicFontCSS: {
			opacity: 1, // opacity-70
			fontWeight: 'normal', // font-nimbus-sans-bold (Lin: 500)
			fontFamily: 'Roboto Condensed Medium', // font-nimbus-sans-bold
			fontSize: '24pt', // text-xl in points
			fontStyle: 'normal', // font-normal
			lineHeight: 1, // leading-[150%] is equivalent to a line height of 1.5
			color: '#111111', // text-red-800 color
		},
		contentFontCSS: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal (Lin: 400)
			fontFamily: 'Inter Regular', // font-nimbus-sans-regular
			lineHeight: 1.5, // leading-9 is equivalent to a line height of 1.5
			color: '#111111', // text-zinc-800 color
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
			color: '#111111', // Equivalent to text-[#3D3D3D]
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-bold, (Lin: 700)
			fontFamily: 'Roboto Condensed Regular',
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#111111', // text-white color
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal (Lin: 400)
			fontFamily: 'Inter Regular', // font-nimbus-sans-regular
			lineHeight: 1.5, // leading-9 is equivalent to a line height of 1.5
			color: '#111111', // text-zinc-800 color
		},
	},
};
