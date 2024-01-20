import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';

export interface SlideElement {
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div';
	className:
		| 'topic'
		| 'subtopic'
		| 'keywords'
		| 'content'
		| 'template'
		| 'images'
		| 'section_title'
		| 'brief'
		| 'original_title'
		| 'English_title'
		| 'title'
		| 'illustration'
		| 'quote'
		| 'source'
		| 'theme';
	content: string | string[];
}


export type SlideKeys =
	| 'topic'
	| 'subtopic'
	| 'keywords'
	| 'content'
	| 'template'
	| 'images'
	| 'section_title'
	| 'brief'
	| 'original_title'
	| 'English_title'
	| 'title'
	| 'illustration'
	| 'quote'
	| 'source'
	| 'theme';

export default class SocialPostSlide {
	topic: string;
	subtopic: string;
	keywords: string;
	content: string[];
	template: string;
	images: string[];
	section_title: string;
	brief: string;
	original_title: string;
	English_title: string;
	title: string;
	illustration: string[];
	quote: string;
	source: string;
	theme: ThemeObject;

	constructor() {
		this.topic = 'Your topic';
		this.subtopic = 'Your subtopic';
		this.keywords = 'Your keywords';
		this.content = ['Your content'];
		this.template = 'Col_1_img_0';
		this.images = [''];
		this.section_title = 'Your section title';
		this.brief = 'Your brief';
		this.original_title = 'Your Topic';
		this.English_title = '';
		this.title = '';
		this.illustration = [
			'https://stories.freepiklabs.com/storage/61572/life-in-a-city-cuate-9773.png',
		];
		this.quote = 'Your quote';
		this.source = 'Your source';
		this.theme = {
			border_start: '',
			border_end: '',
			cover_start: '',
			cover_end: '',
		};
	}
}