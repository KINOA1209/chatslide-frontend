import { ThemeElements } from '../theme_elements';

export const UChicagoTemplateThemeConfig: ThemeElements = {
	backgroundColorCover: 'bg-[#800]',
	backgroundColor: 'bg-[#F0F0F2]',
	titleFontCSS: {
		fontSize: '24pt', // text-3xl in points
		fontWeight: 'bold', // font-bold
		fontFamily: 'Creato Display Medium', // font-creato-medium
		lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
		color: '#800', // text-black color
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
	// userNameFont:
	// 	'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
	// userNameFontColor: 'text-[#F0F0F2]',
	userNameFontCSS: {
		fontSize: '1rem', // Equivalent to text-sm
		// fontWeight: '400',
		fontFamily: 'Creato Display Regular',
		lineHeight: '140%', // Equivalent to leading-[140%]
		letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
		color: '#F0F0F2', // Equivalent to text-[#3D3D3D]
	},
	// headFont:
	//   'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight',
	// headFontColor: 'text-neutral-800',
	headFontCSS: {
		fontSize: '32pt', // text-4xl in points
		fontWeight: 'bold', // font-normal
		fontFamily: 'Creato Display Medium', // font-creato-medium
		lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
		letterSpacing: '-0.0125rem', // tracking-tight
		color: '#F0F0F2', // text-neutral-800 color},
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
