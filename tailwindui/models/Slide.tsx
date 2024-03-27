import { LayoutKeys } from '@/components/slides/slideLayout';
import {
	PaletteKeys,
	TemplateKeys,
} from '@/components/slides/slideTemplates';
import Chart, { Group } from '@/models/Chart';
import ImagesPosition from './ImagesPosition';

export interface SlideElement {
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div';
	className:
		| 'head'
		| 'title'
		| 'subtopic'
		| 'content'
		| 'userName'
		| 'images'
		| 'template'
		| 'layout'
		| 'logo'
		// | 'show_logo'
		| 'logo_url'
		| 'background_url'
		| 'transcript'
		| 'additional_images'
		| 'chart'
		| 'is_chart'
		| 'palette';
	content: string | string[];
}

export type SlideKeys =
	| 'head'
	| 'title'
	| 'subtopic'
	| 'userName'
	| 'template'
	| 'content'
	| 'images'
	| 'layout'
	| 'logo'
	// | 'show_logo'
	| 'logo_url'
	| 'background_url'
	| 'transcript'
	| 'additional_images'
	| 'chart'
	| 'is_chart'
	| 'images_position'
	| 'palette';

export default class Slide {
	head: string;
	title: string;
	subtopic: string;
	userName: string;
	template: TemplateKeys;
	content: string[];
	is_chart: boolean[]; // if is_chart[i] is false, then use image[i] for visualization, else use chart[i]
	images: string[]; // urls of images
	images_position: ImagesPosition[];
	chart: Chart[]; // data of charts
	layout: LayoutKeys;
	// show_logo?: boolean;
	logo: string; // enum for school tempaltes, if user has custom logo, then use logo_url
	logo_url?: string; // overwrites logo if present
	background_url?: string;
	transcript?: string;
	additional_images?: string[];
	palette: PaletteKeys;

	constructor() {
		const emptyGroup: Group = {
			values: [],
			color: '',
			keys: [],
			legend: '',
		};

		this.head = 'New Slide';
		this.title = 'New Slide';
		this.subtopic = 'New Slide';
		this.userName = '';
		this.template = 'Default';
		this.content = [
			'You can edit this text',
			'You can also ask AI Assistant to generate content for you',
			'AI Assistant is at bottom right corner of the screen',
		];
		this.is_chart = [false, false, false];
		this.images = ['', '', ''];
		this.chart = Array.from({ length: 3 }, () => ({
			type: '',
			title: '',
			groups: [emptyGroup],
			axis: { x: '', y: '' },
		}));
		this.images_position = [{}, {}, {}];
		this.layout = 'Col_2_img_1_layout';
		this.logo = 'Default';
		this.additional_images = [];
		this.palette = 'Original';
	}
}
