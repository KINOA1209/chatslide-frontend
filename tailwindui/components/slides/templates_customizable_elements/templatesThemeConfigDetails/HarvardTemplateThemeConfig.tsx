import { ColorThemeKeys } from '../../slideTemplates';
import { ThemeElements } from '../theme_elements';

export const HarvardTemplateThemeConfig: {
	[key in ColorThemeKeys]?: ThemeElements;
} = {
	Original: {
		backgroundColorCover: 'bg-[#F0F0F2]',
		backgroundColor: 'bg-[#F0F0F2]',
		// titleFont:
		//   "text-3xl font-normal font-['Georgia'] leading-[120%] whitespace-nowrap",
		// titleFontColor: 'text-neutral-800 ',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Georgia', // font-['Georgia']
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			// whiteSpace: 'nowrap', // whitespace-nowrap
			color: '#374151', // text-neutral-800 color
		},
		// subtopicFont: "text-xl font-bold font-['Arial'] leading-[120%]",
		// subtopicFontColor: 'text-neutral-700',
		subtopicFontCSS: {
			fontSize: '16pt', // Assuming 'xxl' represents 2.625rem (converted to points)
			fontWeight: 'bold', // font-bold
			fontFamily: 'Arial', // font-['Arial']
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#4A5568', // text-neutral-700 color
		},
		// contentFont:
		//   "opacity-70 text-base font-normal font-['Arial'] leading-loose",
		// contentFontColor: 'text-neutral-700 ',
		contentFontCSS: {
			opacity: 0.7, // opacity-70
			fontSize: '16pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Arial', // font-['Arial']
			lineHeight: 1.2, // leading-loose, assuming 'normal' or '1.5' depending on your design
			color: '#4A5568', // text-neutral-700 color
			display: 'list-item',
		},
		// userNameFont: "opacity-70 text-sm font-normal font-['Arial'] leading-loose",
		// userNameFontColor: 'text-neutral-700',
		userNameFontCSS: {
			fontSize: '1rem', // Equivalent to text-sm
			// fontWeight: '400',
			fontFamily: 'Creato Display Regular',
			lineHeight: '140%', // Equivalent to leading-[140%]
			letterSpacing: '0.026rem', // Equivalent to tracking-[0.026rem]
			color: '#404040', // Equivalent to text-[#3D3D3D]
		},
		// headFont: "text-4xl font-normal font-['Gorgia'] leading-[120%]",
		// headFontColor: 'text-neutral-800',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Georgia', // font-['Gorgia']
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#374151', // text-neutral-800 color
		},
		contentFontCSS_non_vertical_content: {
			opacity: 0.7, // opacity-70
			fontSize: '14pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Arial', // font-['Arial']
			lineHeight: 1.2, // leading-loose, assuming 'normal' or '1.5' depending on your design
			color: '#4A5568', // text-neutral-700 color
		},
	},
};
