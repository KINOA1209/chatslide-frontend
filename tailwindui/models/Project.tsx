import { PaletteKeys, TemplateKeys } from '@/components/slides/slideTemplates';
import Resource from './Resource';
import Slide, { LogoPosition } from './Slide';
import { SocialPostSlide } from './SocialPost';

export type ContentType = 'social_posts' | 'presentation' | 'chart' | 'ppt2video';

type Project = {
	id: string;
	name: string;
	author?: string;
	description?: string;
	keywords?: string[];
	resources?: Resource[];
	created_datetime: string;
	updated_datetime?: string;
	project_name?: string;
	topic?: string;
	content_type: ContentType;
	language: string;
	foldername?: string;
	thumbnail_url?: string;
	is_shared?: boolean;
	is_public?: boolean;
	additional_images?: string[];
	project_group_id?: string;
	project_group_name?: string;

	logo?: string; // overwriten by selected_logo, '' means no logo
	selected_logo?: Resource[];
	// is_logo_left?: boolean; // true if logo on left side otherwise right side
	logo_position?: LogoPosition;
	selected_background?: Resource[];
	template?: TemplateKeys;
	palette?: PaletteKeys;

	// Presentation-specific fields
	audience?: string;
	outlines?: string; // will be parsed into Outlines type: todo: use outlines type in backend as well
	knowledge_summary?: string;
	extra_knowledge?: string;
	outline_item_counts?: number[];
	video_url?: string;
	pdf_images?: string[];
	presentation_slides?: string; // JSONified slide object
	parsed_slides?: Slide[];
	scenario_type?: string;
	has_scripts?: boolean;
	search_online?: string;
	add_citations?: boolean;

	outline_structure?: string;

	view_count?: number;

	// Social Post-specific fields
	post_type?: string;
	social_platform?: string;
	social_posts?: string;
	parsed_socialPosts?: SocialPostSlide[];
	team_id?: string;
};

export default Project;
