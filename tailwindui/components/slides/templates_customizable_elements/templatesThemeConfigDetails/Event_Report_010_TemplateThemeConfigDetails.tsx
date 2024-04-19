import { ThemeElements } from '../theme_elements';
import { PaletteKeys } from '../../slideTemplates';

// type SimplisticPalettes =
// 	(typeof availablePalettes)['Simplistic_008'][number];
// const currentTemplateColorOptions =
// 	availablePalettes['Simplistic_008'] ?? [];
// type AvailablePaletteKeys = (typeof currentTemplateColorOptions)[number];
// type CurrentThemeConfig = {
// 	[palette in AvailablePaletteKeys]: ThemeElements;
// };

export const Event_Report_010_TemplateThemeConfig: {
	[key in PaletteKeys]?: ThemeElements;
} = {
	Perfume: {
		backgroundColorCover: 'bg-[#ACA1F7]',
		backgroundColor: 'bg-[#ACA1F7]',
		titleAndSubtopicBoxBackgroundColor: '#2B2A34',
		headFontAlignment: {
			textAlign: 'center',
		},
		userNameAlignment: {
			textAlign: 'center',
		},
		titleFontCSS: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins SemiBold',
			lineHeight: '32px',
			color: '#ACA1F6',
			textTransform: 'capitalize', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Poppins Bold',
			fontSize: '24pt',
			lineHeight: '32px',
			textTransform: 'uppercase', // Add this line to capitalize the text
			color: '#ACA1F6',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Poppins Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#2B2A34',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Poppins Bold',
			lineHeight: '32px',
			color: '#2B2A34',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
		},
	},
	Jonquil: {
		backgroundColorCover: 'bg-[#E9FEA2]',
		backgroundColor: 'bg-[#E9FEA2]',
		titleAndSubtopicBoxBackgroundColor: '#2B2A34',
		headFontAlignment: {
			textAlign: 'center',
		},
		userNameAlignment: {
			textAlign: 'center',
		},
		titleFontCSS: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins SemiBold',
			lineHeight: '32px',
			color: '#E9FEA2',
			textTransform: 'capitalize', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Poppins Bold',
			fontSize: '24pt',
			lineHeight: '32px',
			textTransform: 'uppercase', // Add this line to capitalize the text
			color: '#E9FEA2',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Poppins Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#2B2A34',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Poppins Bold',
			lineHeight: '32px',
			color: '#2B2A34',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
		},
	},
	'Morning Glory': {
		backgroundColorCover: 'bg-[#94DCD8]',
		backgroundColor: 'bg-[#94DCD8]',
		titleAndSubtopicBoxBackgroundColor: '#2B2A34',
		headFontAlignment: {
			textAlign: 'center',
		},
		userNameAlignment: {
			textAlign: 'center',
		},
		titleFontCSS: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins SemiBold',
			lineHeight: '32px',
			color: '#94DCD8',
			textTransform: 'capitalize', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Poppins Bold',
			fontSize: '24pt',
			lineHeight: '32px',
			textTransform: 'uppercase', // Add this line to capitalize the text
			color: '#94DCD8',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Poppins Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#2B2A34',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Poppins Bold',
			lineHeight: '32px',
			color: '#2B2A34',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
		},
	},
	Azalea: {
		backgroundColorCover: 'bg-[#F2BAD7]',
		backgroundColor: 'bg-[#F2BAD7]',
		titleAndSubtopicBoxBackgroundColor: '#304A56',
		headFontAlignment: {
			textAlign: 'center',
		},
		userNameAlignment: {
			textAlign: 'center',
		},
		titleFontCSS: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins SemiBold',
			lineHeight: '32px',
			color: '#F2BAD7',
			textTransform: 'capitalize', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Poppins Bold',
			fontSize: '24pt',
			lineHeight: '32px',
			textTransform: 'uppercase', // Add this line to capitalize the text
			color: '#F2BAD7',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Poppins Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#2B2A34',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Poppins Bold',
			lineHeight: '32px',
			color: '#2B2A34',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
		},
	},
	Saffron: {
		backgroundColorCover: 'bg-[#F6C343]',
		backgroundColor: 'bg-[#F6C343]',
		titleAndSubtopicBoxBackgroundColor: '#250643',
		headFontAlignment: {
			textAlign: 'center',
		},
		userNameAlignment: {
			textAlign: 'center',
		},
		titleFontCSS: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins SemiBold',
			lineHeight: '32px',
			color: '#F6C343',
			textTransform: 'capitalize', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Poppins Bold',
			fontSize: '24pt',
			lineHeight: '32px',
			textTransform: 'uppercase', // Add this line to capitalize the text
			color: '#F6C343',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Poppins Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#2B2A34',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Poppins Bold',
			lineHeight: '32px',
			color: '#2B2A34',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
		},
	},
	Feta: {
		backgroundColorCover: 'bg-[#EFFDE9]',
		backgroundColor: 'bg-[#EFFDE9]',
		titleAndSubtopicBoxBackgroundColor: '#271921',
		headFontAlignment: {
			textAlign: 'center',
		},
		userNameAlignment: {
			textAlign: 'center',
		},
		titleFontCSS: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins SemiBold',
			lineHeight: '32px',
			color: '#EFFDE9',
			textTransform: 'capitalize', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Poppins Bold',
			fontSize: '24pt',
			lineHeight: '32px',
			textTransform: 'uppercase', // Add this line to capitalize the text
			color: '#EFFDE9',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Poppins Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#2B2A34',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Poppins Bold',
			lineHeight: '32px',
			color: '#2B2A34',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
		},
	},
	'Catskill White': {
		backgroundColorCover: 'bg-[#EEF5F7]',
		backgroundColor: 'bg-[#EEF5F7]',
		titleAndSubtopicBoxBackgroundColor: '#EF93B4',
		headFontAlignment: {
			textAlign: 'center',
		},
		userNameAlignment: {
			textAlign: 'center',
		},
		titleFontCSS: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins SemiBold',
			lineHeight: 1.2,
			color: '#EEF5F7',
			textTransform: 'capitalize', // Add this line to capitalize the text
			opacity: '0.7',
		},
		subtopicFontCSS: {
			fontWeight: 'normal',
			fontFamily: 'Poppins Bold',
			fontSize: '24pt',
			lineHeight: '32px',
			textTransform: 'uppercase', // Add this line to capitalize the text
			color: '#EEF5F7',
		},
		contentFontCSS: {
			fontSize: '16pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
			display: 'list-item',
		},
		userNameFontCSS: {
			fontSize: '12pt',
			fontFamily: 'Poppins Regular',
			lineHeight: '140%',
			letterSpacing: '0.026rem',
			color: '#2B2A34',
			opacity: '0.7',
		},
		headFontCSS: {
			fontSize: '30pt',
			fontWeight: 'bold',
			fontFamily: 'Poppins Bold',
			lineHeight: '32px',
			color: '#2B2A34',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '14pt',
			fontWeight: 'normal',
			fontFamily: 'Poppins Regular',
			lineHeight: 1.5,
			color: '#333330',
		},
	},
};
