import { PostTypeKeys } from '@/components/socialPost/templates_customizable_elements/theme_elements';
import { SocialPostThemeElements } from '@/components/socialPost/templates_customizable_elements/theme_elements';

export const Classic_SocialPost_TemplateThemeConfig: {
	[key in PostTypeKeys]?: SocialPostThemeElements;
} = {
	casual_topic: {
		topicCSS: {
			fontSize: '72pt',
			fontWeight: 'bold',
			lineHeight: 'normal',
			// fontStyle: 'italic',
			textAlign: 'left',
			color: '#333330',
			fontFamily: 'Georgia',
			letterSpacing: '-1.04px',
		},
		keywordCoverCSS: {
			fontSize: '10pt',
			lineHeight: '133%',
			fontWeight: 'bold',
			textAlign: 'center',
			color: '#FFF',
			letterSpacing: '0.36px',
			fontFamily: 'Nunito',
		},
		keywordCSS: {
			fontSize: '14pt',
			fontWeight: 'bold',
			color: '#ABBEFF',
			fontFamily: 'Nunito',
			letterSpacing: '0.6px',
		},
		subtopicCSS: {
			fontSize: '22pt',
			fontWeight: 'bold',
			color: '#FBFBFB',
			fontFamily: 'Nunito',
			letterSpacing: '0.56px',
		},
		contentCSS: {
			fontFamily: 'Nunito',
			letterSpacing: '0.36px',
			display: 'list-item',
			fontSize: '10pt',
			fontWeight: 'normal',
		},
	},
	serious_subject: {
		originalTitleCoverCSS: {
			color: '#1B1C22',
			fontWeight: 'bold',
			fontSize: '24pt',
			fontFamily: 'Arimo',
		},
		originalTitleCSS: {
			color: 'rgba(27, 27, 27, 0.50)',
			fontFamily: 'Nunito',
			fontSize: '10pt',
			fontStyle: 'bold',
		},
		briefCSS: {
			fontSize: '10pt',
			color: '#1B1B1B',
			fontFamily: 'Nunito',
			letterSpacing: '0.48px',
			fontWeight: 'normal',
		},
		sectionTitleCSS: {
			fontSize: '16pt',
			fontWeight: 'bold',
			color: '#1B1B1B',
			fontFamily: 'Nunito',
		},
		contentCSS: {
			fontSize: '10pt',
			color: '#1B1B1B',
			fontFamily: 'Nunito',
			letterSpacing: '0.48px',
			fontWeight: 'normal',
		},
		userNameCSS: {
			fontSize: '9pt',
			color: '#DAE9EA',
			backgroundColor: '#1B1B1B',
			borderRadius: '16px',
			lineHeight: '25.126px',
			letterSpacing: '0.628px',
			fontFamily: 'Arimo',
			fontWeight: 'normal',
		},
	},
	reading_notes: {
		readingtitleCSS: {
			color: '#121212',
			fontFamily: 'Cormorant',
			fontSize: '45pt',
			textAlign: 'center',
			fontWeight: 'normal',
		},
		quoteCSS: {
			color: '#1D222A',
			fontFamily: 'Cormorant',
			fontSize: '13pt',
			lineHeight: '155%',
			textAlign: 'center',
			fontWeight: 'bold',
		},
		sourceCSS: {
			color: '#3A3A3A',
			fontFamily: 'Cormorant',
			fontSize: '13pt',
			lineHeight: '222%',
			textAlign: 'center',
			fontWeight: 'bold',
		},
	},
};
