import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';
import Chart, { Group } from '@/models/Chart';
import ImagesPosition from './ImagesPosition';
import {
	SocialPostLayoutKeys,
	SocialPostTemplateKeys,
} from '@/components/socialPost/socialPostLayouts';

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
		| 'theme'
		| 'chart'
		| 'is_chart'
		| 'images_position'
		| 'layout'
		| 'template_theme'
		| 'last_page_title'
		| 'last_page_content';
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
	| 'theme'
	| 'chart'
	| 'is_chart'
	| 'images_position'
	| 'layout'
	| 'template_theme'
	| 'last_page_title'
	| 'last_page_content';

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
	template_theme: SocialPostTemplateKeys;
	images_position: ImagesPosition[];
	chart: Chart[];
	is_chart: boolean[];
	layout: SocialPostLayoutKeys; // new
	last_page_title: string;
	last_page_content: string;

	constructor() {
		const emptyGroup: Group = {
			values: [],
			color: '',
			keys: [],
			legend: '',
		};

		this.topic = 'Your topic';
		this.subtopic = 'Your subtopic';
		this.keywords = 'Your keywords';
		this.content = ['Your content'];
		this.template = 'Col_1_img_0'; // need to change
		this.layout = 'Col_1_img_0_casual_topic';
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
		this.is_chart = [false, false, false];
		this.images_position = [];
		this.chart = Array.from({ length: 3 }, () => ({
			type: '',
			title: '',
			groups: [emptyGroup],
			axis: { x: '', y: '' },
		}));
		this.template_theme = 'classic';
		this.last_page_content = 'Thank you! Follow to learn more!';
		this.last_page_title = 'Like & Share';
	}
}
