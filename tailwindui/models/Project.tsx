import Resource from './Resource';
import Slide from './Slide';
import SocialPostSlide from './SocialPost'

export default interface Project {
	id: string;
	task: 'video' | 'scripts' | 'slides' | 'presentation' | 'social post';
	name: string;
  author: string;
	description: string;
	resources: Resource[];
	created_datetime: string;
	project_name: string;
	topic: string;
	content_type: string;
	language: string;
	foldername: string;
	// resource_ids: string;
	// fields for Presentation start here
	requirements: string;
	audience: string;
	add_equations: boolean;  // deprecated
	page_count: string;  // deprecated, use slides.length
	outline: string;
	extra_knowledge: string;
	outline_item_counts: string;
	transcripts: string;
	image_files: string;
	audio_files: string;
	pdf_file: string; 
	video_file: string;
	video_url: string;
	html: string;
	pdf_images: string;
	is_shared: boolean;
	presentation_slides: string;  // JSONified slide object 
	parsed_slides: Slide[];
	scenario_type: string;
  thumbnail_url: string;
	// fields for Social Post start here
	post_type: string;
	social_platform: string;
	social_posts: string;
	parsed_socialPosts: SocialPostSlide[];
}
