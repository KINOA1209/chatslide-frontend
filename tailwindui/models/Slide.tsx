import { LayoutKeys } from "@/components/slides/slideLayout";
import { TemplateKeys } from "@/components/slides/slideTemplates";
import Chart from "./Chart";

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
  | 'logo';
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
  | 'logo';


export default class Slide {
  head: string;
  title: string;
  subtopic: string;
  userName: string;
  template: TemplateKeys;
  content: string[];
  is_chart: boolean[];  // if is_chart[i] is false, then use image[i] for visualization, else use chart[i]
  images: string[];  // urls of images
  charts: Chart[];  // data of charts
  layout: LayoutKeys;
  logo: string;  // enum for school tempaltes, if user has custom logo, then use logo_url
  logo_url?: string;  // overwrites logo if present
  backgrouund_url?: string;
  transcript?: string;

  constructor() {
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
    this.charts = [];
    this.layout = 'Col_2_img_1_layout';
    this.logo = 'Default';
  }
}