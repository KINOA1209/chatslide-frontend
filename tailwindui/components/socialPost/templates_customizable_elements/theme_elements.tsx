import { casualDefault } from './casual_topic/casual_default_template';
import { seriousDefault } from './serious_subject/serious_default_template';
import { readingDefault } from './reading_notes/reading_default_template';
import { SocialPostTemplateKeys } from '../socialPostLayouts';
import { Classic_SocialPost_TemplateThemeConfig } from './classic_template/theme_config';
import { Default_SocialPost_TemplateThemeConfig } from './default_template/theme_config';
export type SocialPostThemeElements = {
	topicCSS?: React.CSSProperties;
	keywordCoverCSS?: React.CSSProperties;
	keywordCSS?: React.CSSProperties;
	subtopicCSS?: React.CSSProperties;
	originalTitleCoverCSS?: React.CSSProperties;
	originalTitleCSS?: React.CSSProperties;
	briefCSS?: React.CSSProperties;
	sectionTitleCSS?: React.CSSProperties;
	userNameCSS?: React.CSSProperties;
	contentCSS?: React.CSSProperties;
	readingtitleCSS?: React.CSSProperties;
	quoteCSS?: React.CSSProperties;
	sourceCSS?: React.CSSProperties;
	lastPageTitleCSS?: React.CSSProperties;
	lastPageContentCSS?: React.CSSProperties;
	useIllustraion?: boolean;
};

export type PostTypeKeys = 'casual_topic' | 'serious_subject' | 'reading_notes';

// export type SocialPostThemeConfig = {
// 	[post_type in PostTypeKeys]: ThemeElements;
// };

export type SocialPostThemeConfig = {
	[templateName in SocialPostTemplateKeys]?: {
		[post_type in PostTypeKeys]?: SocialPostThemeElements;
	};
};

const SocialPostThemeConfigData: SocialPostThemeConfig = {
	classic: Classic_SocialPost_TemplateThemeConfig,
	default: Default_SocialPost_TemplateThemeConfig,
	// bold: Classic_SocialPost_TemplateThemeConfig,
};

export default SocialPostThemeConfigData;
