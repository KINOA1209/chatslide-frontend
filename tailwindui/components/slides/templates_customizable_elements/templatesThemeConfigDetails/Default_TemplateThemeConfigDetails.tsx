import { ThemeElements } from '../theme_elements';

export const Default_TemplateThemeConfig: ThemeElements = {
	backgroundColorCover: 'bg-[#FFFFFF]',
	backgroundColor: 'bg-[#FFFFFF]',
	// backgroundUrlCover: 'https://via.placeholder.com/1200x800',
	titleFontCSS: {
		fontSize: '24pt', // text-3xl in points
		fontWeight: 'bold', // font-bold
		fontFamily: 'Creato Display Bold', // font-creato-medium
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
		color: '#111827', // text-neutral-900 color
	},
	contentFontCSS: {
		fontSize: '16pt', // base size sent from backend
		fontWeight: 'normal', // font-normal
		fontFamily: 'Creato Display Regular', // font-creato-medium
		lineHeight: 1.2, // leading-[140%]
		letterSpacing: '0.025rem', // tracking-[0.025rem]
		color: '#111827', // text-neutral-900 color
		display: 'list-item',
	},

	userNameFont: {
		fontSize: '0.875rem', // Equivalent to text-sm
		// fontWeight: '400',
		fontFamily: 'Cursive',
		lineHeight: '140%', // Equivalent to leading-[140%]
		letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
	},
	userNameFontColor: {
		color: '#3D3D3D', // Equivalent to text-[#3D3D3D]
	},

	headFontCSS: {
		fontSize: '32pt', // text-4xl in points
		fontWeight: 'bold', // font-normal
		fontFamily: 'Creato Display Bold', // font-creato-medium
		lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
		letterSpacing: '-0.0125rem', // tracking-tight
		color: '#374151', // text-neutral-800 color},
	},

	contentFontCSS_non_vertical_content: {
		fontSize: '14pt', // base size sent from backend
		fontWeight: 'normal', // font-normal
		fontFamily: 'Creato Display Regular', // font-creato-medium
		lineHeight: 1.2, // leading-[140%]
		letterSpacing: '0.025rem', // tracking-[0.025rem]
		color: '#111827', // text-neutral-900 color
	},
};
