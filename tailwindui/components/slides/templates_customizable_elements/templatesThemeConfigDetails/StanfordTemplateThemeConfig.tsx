import { ThemeElements } from '../theme_elements';

export const StanfordTemplateThemeConfig: ThemeElements = {
	backgroundColorCover: 'bg-[#8C1515]',
	backgroundColor: 'bg-[#F0E9E9]',
	titleFontCSS: {
		fontSize: '24pt', // text-3xl in points
		fontWeight: 'bold', // font-bold
		fontFamily: 'Nimbus Sans Bold', // font-nimbus-sans-bold
		lineHeight: 1.2, // leading-[110%] is equivalent to a line height of 1.1
		// whiteSpace: 'nowrap', // whitespace-nowrap},
		color: '#8C1515', // text-[#8C1515] color
	},
	subtopicFontCSS: {
		opacity: 0.7, // opacity-70
		fontWeight: 'bold', // font-nimbus-sans-bold
		fontSize: '16pt', // text-xl in points
		fontStyle: 'normal', // font-normal
		lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
		color: '#EF4444', // text-red-800 color
	},
	contentFontCSS: {
		fontSize: '16pt', // text-base in points (assuming 1rem is 1pt)
		fontWeight: 'normal', // font-normal
		fontFamily: 'Nimbus Sans Regular', // font-nimbus-sans-regular
		lineHeight: 1.2, // leading-9 is equivalent to a line height of 1.5
		color: '#4B5563', // text-zinc-800 color
		display: 'list-item',
	},
	userNameFont: 'text-sm font-nimbus-sans-regular font-normal leading-[120%]',
	userNameFontColor: 'text-white',
	headFontCSS: {
		fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
		fontWeight: 'bold', // font-bold
		fontFamily: 'Nimbus Sans Bold', // font-nimbus-sans-bold
		lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
		color: '#FFFFFF', // text-white color
	},
	contentFontCSS_non_vertical_content: {
		fontSize: '14pt', // text-base in points (assuming 1rem is 1pt)
		fontWeight: 'normal', // font-normal
		fontFamily: 'Nimbus Sans Regular', // font-nimbus-sans-regular
		lineHeight: 1.2, // leading-9 is equivalent to a line height of 1.5
		color: '#4B5563', // text-zinc-800 color
	},
};
