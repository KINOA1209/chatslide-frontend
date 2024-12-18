import { LayoutKeys } from '@/components/slides/slideLayout';
import { PaletteKeys, TemplateKeys } from '@/components/slides/slideTemplates';
import Chart, { Group } from '@/models/Chart';
import Position from '@/types/Position';

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
		| 'palette'
		| 'embed_code'
		| 'is_logo_left';
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
	| 'image_positions'
	| 'palette'
	| 'embed_code'
	| 'media_types'
	| 'logo_position';

export type Media = 'image' | 'chart' | 'embed';
export type LogoPosition =
	| 'No'
	| 'BottomLeft'
	| 'BottomRight'
	| 'TopLeft'
	| 'TopRight';

export default class Slide {
	head: string;
	head_position: Position;
	title: string;
	title_position: Position;
	subtopic: string;
	subtopic_position: Position;
	userName: string;
	username_position: Position;
	template: TemplateKeys;
	content: string[];
	content_positions: Position[];
	is_chart: boolean[]; // deprecated, if is_chart[i] is false, then use image[i] for visualization, else use chart[i]
	media_types: Media[]; // use this instead of is_chart
	images: string[]; // urls of images
	image_positions: Position[];
	image_container_positions: Position[];
	chart: Chart[]; // data of charts
	layout: LayoutKeys;
	embed_code?: string[];
	// show_logo?: boolean;
	logo: string; // enum for school template, if user has custom logo, then use logo_url
	logo_url?: string; // overwrites logo if present
	background_url?: string;
	background_color?: string; // hex color with the #, 8 digit with transparency, will be rendered on top of the background_url
	titleFontColor?: string; // hex color with the #,
	subtitleFontColor?: string; // hex color with the #
	contentFontColor?: string; // hex color with the #
	titleFontFamily?: string;
	subtitleFontFamily?: string;
	contentFontFamily?: string;
	transcript?: string;
	additional_images?: string[];
	palette: PaletteKeys;
	// is_logo_left: boolean;
	logo_position: LogoPosition;
	logo_numeric_position: Position;
  
  isHidden: boolean;

	constructor() {
		const emptyGroup: Group = {
			values: [],
			color: '',
			keys: [],
			legend: '',
		};

		this.head = '';
		this.head_position = {};
		this.title = 'New Slide';
		this.title_position = {};
		this.subtopic = 'New Slide';
		this.subtopic_position = {};
		this.userName = '';
		this.username_position = {};
		this.template = 'Default';
		this.content = [
			'You can edit this text',
			'You can also ask AI Assistant to generate content for you',
			'AI Assistant is at bottom right corner of the screen',
		];
		this.content_positions = [{}, {}, {}];
		this.is_chart = [false, false, false];
		this.images = ['', '', ''];
		this.media_types = ['image', 'image', 'image'];
		this.chart = Array.from({ length: 3 }, () => ({
			type: '',
			title: '',
			groups: [emptyGroup],
			axis: { x: '', y: '' },
		}));
		this.image_positions = [{}, {}, {}];
		this.image_container_positions = [{}, {}, {}];
		this.layout = 'Col_2_img_1_layout';
		this.logo = 'Default';
		this.additional_images = [];
		this.palette = 'Original';
		this.embed_code = ['', '', ''];
		// this.is_logo_left = true;
		this.logo_position = 'BottomLeft';
		this.logo_numeric_position = {};
    this.isHidden = false;
	}
}
