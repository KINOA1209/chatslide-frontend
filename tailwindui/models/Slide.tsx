import { LayoutKeys } from "@/components/slides/slideLayout";
import { TemplateKeys } from "@/components/slides/slideTemplates";
import Chart, {Group} from '@/models/Chart';
import ImagesPosition from "./ImagesPosition";

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
  | 'chart'
  | 'is_chart'
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
  | 'chart'
  | 'is_chart'


export default class Slide {
  head: string;
  title: string;
  subtopic: string;
  userName: string;
  template: TemplateKeys;
  content: string[];
  is_chart: boolean[];  // if is_chart[i] is false, then use image[i] for visualization, else use chart[i]
  images: string[];  // urls of images
  images_position: ImagesPosition[];
  chart: Chart[];  // data of charts
  layout: LayoutKeys;
  logo: string;  // enum for school tempaltes, if user has custom logo, then use logo_url
  logo_url?: string;  // overwrites logo if present
  background_url?: string;
  transcript?: string;

  constructor() {
    const emptyGroup: Group = {
      values: [],
      color: '',
      keys: [],
      legend: ''
    };

    this.head = 'New Slide';
    this.title = 'New Slide';
    this.subtopic = 'New Slide';
    this.userName = '';
    this.template = 'Default';
    this.content = [
      'Some content here',
      'Some more content here',
      'Even more content here',
    ];
    this.is_chart = [false, false, false];
    this.images = ['', '', ''];
    this.chart = Array.from({ length: 3 }, () => ({
      type: '',
      title: '',
      groups: [emptyGroup],
      axis: { x: '', y: '' }
    }));
    this.images_position = [{}, {}, {}]
    this.layout = 'Col_2_img_1_layout';
    this.logo = 'Default';
  }
}