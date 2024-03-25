import { PaletteKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const BerkeleyTemplateThemeConfig: {
	[key in PaletteKeys]?: ThemeElements;
} = {
	Original: {
		backgroundColorCover: 'bg-[#003262]',
		backgroundColor: 'bg-[#F0F2F5]',
		// titleFont: 'text-3xl leading-[120%] font-sans font-bold whitespace-nowrap',
		// titleFontColor: 'text-[#003262]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points (assuming 1rem is 1pt)
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			fontWeight: 'bold', // font-bold
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			// whiteSpace: 'nowrap', // whitespace-nowrap
			color: '#003262', // text-[#003262] color
		},
		// subtopicFont: 'text-xl font-semibold leading-[120%] font-sans',
		// subtopicFontColor: 'text-[#525252]',
		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points (assuming 1rem is 1pt)
			fontWeight: 'bold', // font-semibold
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			color: '#525252', // text-[#525252] color
		},
		// contentFont: 'text-base font-normal font-sans leading-[120%]',
		// contentFontColor: 'text-[#1B1B1B]',
		contentFontCSS: {
			fontSize: '16pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			color: '#1B1B1B', // text-[#1B1B1B] color
			display: 'list-item',
		},
		// userNameFont: 'text-sm font-normal font-sans leading-[120%]',
		// userNameFontColor: 'text-white',
		userNameFontCSS: {
			fontSize: '1rem', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: '#FFFFFF', // Equivalent to text-[#3D3D3D]
		},
		// headFont: 'text-4xl font-bold font-sans leading-[120%]',
		// headFontColor: 'text-white',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'bold', // font-bold
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#FFFFFF', // text-white color
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			color: '#1B1B1B', // text-[#1B1B1B] color
		},
	},
};
