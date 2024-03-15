import { ThemeElements } from '../theme_elements';

export const ColumbiaTemplateThemeConfig: ThemeElements = {
	// color: '#1f2937',
	// fontWeight: 'bold',
	// fontSize: '27pt',
	backgroundColorCover: 'bg-[#B9D9EB]',
	backgroundColor: 'bg-[#B9D9EB]',
	// titleFont: 'text-3xl font-bold font-creato-medium leading-[100%] ',
	// titleFontColor: 'text-black',
	titleFontCSS: {
		fontSize: '24pt', // text-3xl in points
		fontWeight: 'bold', // font-bold
		fontFamily: 'Creato Display Medium', // font-creato-medium
		lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
		color: '#000', // text-black color
	},
	// subtopicFont:
	//   'text-xl font-normal font-creato-medium uppercase leading-[150%] tracking-[0.15rem]',
	// subtopicFontColor: 'text-neutral-900',
	subtopicFontCSS: {
		fontSize: '16pt', // text-xl in points
		fontWeight: 'normal', // font-normal
		fontFamily: 'Creato Display Medium', // font-creato-medium
		textTransform: 'uppercase', // Uppercase for font style
		lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
		letterSpacing: '0.15rem', // tracking-[0.15rem]},
		color: '#111827', // text-neutral-900 color
	},
	// contentFont:
	//   'text-opacity-70 text-base font-normal font-creato-medium leading-[140%] tracking-[0.025rem] ',
	// contentFontColor: 'text-neutral-900',
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
	// userNameFontColor: 'text-[#000]',
	userNameFontCSS: {
		fontSize: '1rem', // Equivalent to text-sm
		// fontWeight: '400',
		fontFamily: 'Creato Display Regular',
		lineHeight: '140%', // Equivalent to leading-[140%]
		letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
		color: '#000000', // Equivalent to text-[#3D3D3D]
	},
	// headFont:
	//   'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight',
	// headFontColor: 'text-neutral-800',
	headFontCSS: {
		fontSize: '32pt', // text-4xl in points
		fontWeight: 'normal', // font-normal
		fontFamily: 'Creato Display Medium', // font-creato-medium
		lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
		letterSpacing: '-0.0125rem', // tracking-tight
		color: '#000', // text-neutral-800 color},
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
