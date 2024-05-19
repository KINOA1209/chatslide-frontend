import {
	SocialPostLayoutElements,
	SocialPostLayoutKeys,
} from '../../socialPostLayouts';

export const Classis_SocialPost_TemplateLayoutsConfig: {
	[key in SocialPostLayoutKeys]: SocialPostLayoutElements;
} = {
	// | 'Col_2_img_1_right_casual_topic' // new layout
	// | 'Col_2_img_1_left_casual_topic' // new layout
	// | 'First_page_img_1_casual_topic'
	// | 'Col_1_img_0_casual_topic'
	// // template2 serious subject
	// | 'First_page_img_1_serious_subject'
	// | 'img_0_serious_subject'
	// // template3 reading notes
	// | 'First_page_img_1_reading_notes'
	// | 'Col_1_img_1_reading_notes'
	// | 'Col_1_img_0_reading_notes'
	// // last page layout
	// | 'last_page_layout';
	//casual
	Col_2_img_1_left_casual_topic: {},
	Col_2_img_1_right_casual_topic: {},
	Col_1_img_0_casual_topic: {
		canvasCSS: {
			width: '100%',
			height: '100%',
			background: 'white',
			border: 'none',
		},
	},
	First_page_img_1_casual_topic: {
		canvasCSS: {
			width: '100%',
			height: '100%',
			background: 'white',
			border: 'none',
		},
		topicAndKeywordsContainerCSS: {
			display: 'flex',
			flexDirection: 'column',
		},
	},
	//serious
	First_page_img_1_serious_subject: {},
	img_0_serious_subject: {},
	//reading notes
	First_page_img_1_reading_notes: {},
	Col_1_img_0_reading_notes: {},
	Col_1_img_1_reading_notes: {},
	// last page
	last_page_layout: {},
};
