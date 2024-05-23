import { Classis_SocialPost_TemplateLayoutsConfig } from './templates_customizable_elements/classic_template/layout_config';
import { Default_SocialPost_TemplateLayoutsConfig } from './templates_customizable_elements/default_template/layout_config';

export type SocialPostLayoutElements = {
	canvasCSS?: React.CSSProperties;
	topicCSS?: React.CSSProperties;
	subtopicCSS?: React.CSSProperties;
	contentCSS?: React.CSSProperties;
	columnCSS?: React.CSSProperties;
	userNameCSS?: React.CSSProperties;
	originalTitleCSS?: React.CSSProperties;
	sectionTitleCSS?: React.CSSProperties;
	briefCSS?: React.CSSProperties;
	briefAndContentCSS?: React.CSSProperties;
	iconCSS?: React.CSSProperties;
	readingTitleCSS?: React.CSSProperties;
	quoteCSS?: React.CSSProperties;
	sourceCSS?: React.CSSProperties;
	keywordsCSS?: React.CSSProperties;
	topicAndKeywordsContainerCSS?: React.CSSProperties;
	imageContainerCSS?: React.CSSProperties;
	imageCSS?: React.CSSProperties;
	logoCSS?: React.CSSProperties;
	indicatorCSS?: React.CSSProperties;
	pageNumberIndexCSS?: React.CSSProperties;
	pageNumberIndexContainerCSS?: React.CSSProperties;
	imageAndTextContentContainerCSS?: React.CSSProperties;
	// last page specific CSS properties
	lastPageTitleCSS?: React.CSSProperties;
	lastPageContentCSS?: React.CSSProperties;
	userNameAndLogoAndIndicatorBoxCSS?: React.CSSProperties;
	userNameAndLogoBoxCSS?: React.CSSProperties;
};

export type SocialPostLayoutKeys =
	// casual topic layouts

	| 'Col_2_img_1_right_casual_topic' // new layout
	| 'Col_2_img_1_left_casual_topic' // new layout
	| 'First_page_img_1_casual_topic'
	| 'Col_1_img_0_casual_topic'
	// template2 serious subject
	| 'First_page_img_1_serious_subject'
	| 'img_0_serious_subject'
	// template3 reading notes
	| 'First_page_img_1_reading_notes'
	| 'Col_1_img_1_reading_notes'
	| 'Col_1_img_0_reading_notes'
	// last page layout
	| 'last_page_layout';

export type SocialPostTemplateKeys = 'classic' | 'default' | 'bold';

export type SocialPostLayoutsConfig = {
	[socialPostThemeKey in SocialPostTemplateKeys]?: {
		[key in SocialPostLayoutKeys]?: SocialPostLayoutElements;
	};
};

export const SocialPostLayoutConfigData: SocialPostLayoutsConfig = {
	classic: Classis_SocialPost_TemplateLayoutsConfig,
	// default: Default_SocialPost_TemplateLayoutsConfig,
};

// export default SocialPostLayoutConfigData;
