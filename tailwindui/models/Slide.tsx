import { LayoutKeys } from "@/components/slides/slideLayout";
import { TemplateKeys } from "@/components/slides/slideTemplates";

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
  images: string[];
  layout: LayoutKeys;
  logo: string;

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
    this.images = [];
    this.layout = 'Col_2_img_1_layout';
    this.logo = 'Default';
  }
}