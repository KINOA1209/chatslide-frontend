import Resource from './Resource';
import Slide from './Slide';

export default interface Project {
	id: string;
	task: 'video' | 'scripts' | 'slides' | 'presentation' | 'social post';
	name: string;
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
	add_equations: boolean;
	page_count: string;
	outline: string;
	extra_knowledge: string;
	outline_item_counts: string;
	transcripts: string;
	image_files: string;
	audio_files: string;
	pdf_file: string; 
	video_file: string;
	html: string;
	pdf_images: string;
	is_shared: boolean;
	presentation_slides: string;
	scenario_type: string;
	// fields for Social Post start here
	post_type: string;
	social_platform: string;
	social_posts: string;
}
