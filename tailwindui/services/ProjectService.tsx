import { LayoutKeys } from '@/components/slides/slideLayout';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import SocialPostSlide from '@/models/SocialPost';
import Project from '@/models/Project';
import Slide from '@/models/Slide';
import Chart, { Group } from '@/models/Chart';
import Folder from '@/models/Folder';

export interface ProjectAndFolder {
	projects: Project[];
	empty_groups: string[];
}

class ProjectService {
	static async getSharedProjectDetails(
		project_id: string,
		server_side: boolean = false, // if true, fetch use abs url
		shareEntry: string = 'slides',
	): Promise<Project> {
		//console.log(`Fetching shared project details.`);
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const baseUrl = process.env.HOST ? process.env.HOST : 'localhost';
		const protocol = baseUrl == 'localhost' ? 'http' : 'https';
		const url = server_side
			? `${protocol}://${baseUrl}/api/get_shared_project`
			: '/api/get_shared_project';
		const url_fecthed =
			shareEntry === 'video'
				? `${url}?project_id=${project_id}&video=True`
				: `${url}?project_id=${project_id}`;

		try {
			// fetch project details
			const response = await fetch(url_fecthed, {
				method: 'GET',
				headers: headers,
			});

			if (response.status === 404) {
				return {
					id: project_id,
					topic: 'Project not found',
					project_name: 'Project not found',
					// description: 'The project you are looking for does not exist, or is no longer shared.',
				} as Project;
			}

			if (!response.ok) {
				throw new Error(`getSharedProjectDetails failed, project_id: ${project_id},
        url: ${url},
        details: ${response.status}`);
			}

			const project = (await response.json()) as Project;
			//console.log('Project data:', project);

			if (project?.presentation_slides) {
				project.parsed_slides = this.parseSlides(project.presentation_slides);
				// console.log('getSharedProjectDetails', project.parsed_slides);
			}
			if (project?.social_posts && project?.post_type) {
				project.parsed_socialPosts = this.parseSocialPosts(
					project.social_posts,
					project.post_type,
				);
			}

			return project;
		} catch (error) {
			console.error(
				`getSharedProjectDetails failed, project_id: ${project_id},
      url: ${url},
      details:`,
				error,
			);
			throw error; // Rethrow the error to be handled by the caller
		}
	}

	static async getProjectDetails(
		token: string,
		project_id: string,
		server_side: boolean = false, // if true, fetch use abs url
	): Promise<Project> {
		//console.log(`Fetching project details.`);
		const headers = new Headers();
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		headers.append('Content-Type', 'application/json');

		const baseUrl = process.env.HOST ? process.env.HOST : 'localhost';
		const protocol = baseUrl == 'localhost' ? 'http' : 'https';
		const url = server_side
			? `${protocol}://${baseUrl}/api/get_project_details`
			: '/api/get_project_details';

		try {
			// fetch project details
			const response = await fetch(url, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ project_id: project_id }),
			});

			if (!response.ok) {
				throw new Error(`getProjectDetails Error fetching project details: ${response.status}
        project_id: ${project_id},
        url: ${url}`);
			}

			const project = (await response.json()) as Project;
			//console.log('Project data:', project);

			if (project?.presentation_slides) {
				project.content_type = 'presentation';
				project.parsed_slides = this.parseSlides(project.presentation_slides);
				if (project.parsed_slides && project.parsed_slides.length > 0) {
					const slide = project.parsed_slides[0];
					project.has_scripts = slide.transcript ? true : false;
					project.template = slide.template;
					project.palette = slide.palette;
				}
			}
			if (project?.social_posts && project?.post_type) {
				project.parsed_socialPosts = this.parseSocialPosts(
					project.social_posts,
					project.post_type,
				);
			}

			return project;
		} catch (error) {
			console.error(`getProjectDetails Error fetching project details: ${error}
      url: ${url}`);
			throw error; // Rethrow the error to be handled by the caller
		}
	}

	static async getProjects(
		token: string,
		is_public: boolean = false,
		server_side = false,
		need_folder = false,
	): Promise<Project[] | ProjectAndFolder> {
		const headers = new Headers();
		if (is_public) {
			token = process.env.SELF_TOKEN || '';
		}
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		headers.append('Content-Type', 'application/json');

		const baseUrl = process.env.HOST ? process.env.HOST : 'localhost';
		const protocol = baseUrl == 'localhost' ? 'http' : 'https';
		const url = server_side
			? `${protocol}://${baseUrl}/api/get_projects`
			: '/api/get_projects';

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ public: is_public }),
			});
			if (response.ok) {
				const data = await response.json();
				// data.projects.forEach((item: Project) => {
				// 	if (item.content_type === null) {
				// 		item.content_type = 'presentation';
				// 	}
				// });
				if (Array.isArray(data.projects)) {
					data.projects.forEach((item: Project) => {
						if (item.content_type === null) {
							item.content_type = 'presentation';
						}
					});
				} else {
					Array.from(data.projects as Project[]).forEach((item: Project) => {
						if (item.content_type === null) {
							item.content_type = 'presentation';
						}
					});
				}

				if (need_folder) {
					return {
						projects: data.projects,
						empty_groups: data.empty_groups || [],
					};
				} else {
					return data.projects;
				}
			} else {
				// Handle error cases
				console.error(`getProjects failed: ${response.status}`);
			}
		} catch (error) {
			console.error(`getProjects failed: error: ${error}`);
		}
		return [];
	}

	static async deleteProject(
		token: string,
		project_id: string,
	): Promise<boolean> {
		const response = await fetch('/api/delete_project', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				project_id: project_id,
			}),
		});
		return response.ok;
	}

	static parseSlides(presentation_slides: string): Slide[] {
		if (!presentation_slides) {
			return [];
		}

		let jsonSlides = JSON.parse(presentation_slides);
		if (typeof jsonSlides === 'string') {
			jsonSlides = JSON.parse(jsonSlides);
		}
		// console.log('jsonSlides:', jsonSlides);
		// console.log('typeof jsonSlides:', typeof jsonSlides);
		const emptyGroup: Group = {
			values: [],
			color: '',
			keys: [],
			legend: '',
		};
		const default_chartsArr = Array.from({ length: 3 }, () => ({
			type: '',
			title: '',
			groups: [emptyGroup],
			axis: { x: '', y: '' },
		}));
		// mapping data to slides
		const slidesArray: Slide[] = Object.keys(jsonSlides).map((key, index) => {
			const slideData =
				typeof jsonSlides[key] === 'string'
					? JSON.parse(jsonSlides[key])
					: jsonSlides[key];
			// console.log('slideData:', slideData);
			const slide = new Slide();
			slide.head = slideData.head || '';
			slide.title = slideData.title || 'New Slide';
			slide.subtopic = slideData.subtopic || 'New Slide';
			slide.userName = slideData.userName || '';
			slide.template =
				slideData.template || ('Business_Light_006' as TemplateKeys);
			slide.palette = slideData.palette || 'Original';
			slide.content = slideData.content || [
				'Some content here',
				'Some more content here',
				'Even more content here',
			];
			slide.images =
				slideData.images.filter((img: string) => img && img !== '') || [];
			slide.additional_images = (slideData.additional_images || []).filter(
				(img: string) => img && img !== '' && img !== ';',
			);
			slide.chart = slideData.chart;
			slide.is_chart = slideData.is_chart || [false, false, false];
			slide.media_types = slideData.media_types || ['image', 'image', 'image'];
			slide.embed_code = slideData.embed_code || ['', '', ''];
			slide.images_position = slideData.images_position;
			// console.log(
			//     'slideData.content.length',
			//     slideData.content.length        // );
			slide.transcript = slideData.transcript || '';
			slide.logo = slideData.logo;
			slide.logo_url = slideData.logo_url || '';
			// slide.is_logo_left = slideData.is_logo_left || true;
			slide.logo_position = slideData.logo_position || 'BottomLeft';
			slide.background_url = slideData.background_url || '';
			slide.background_color = slideData.background_color || ''; // for customized background color
			slide.titleFontFamily = slideData.titleFontFamily || '';
			slide.subtitleFontFamily = slideData.subtitleFontFamily || '';
			slide.contentFontFamily = slideData.contentFontFamily || '';
			// slide.show_logo = slideData.hasOwnProperty('show_logo')
			// 	? slideData.show_logo
			// 	: true;

			// console.log('slide.images', slide.images);
			if (index === 0) {
				slide.layout = slideData.layout || ('Cover_img_1_layout' as LayoutKeys);
			} else {
				// choose default layout based on number of bullet points
				if (slideData.content.length === 1) {
					slide.layout =
						slideData.layout || ('Col_2_img_1_layout' as LayoutKeys);
				} else if (slideData.content.length === 2) {
					slide.layout =
						slideData.layout || ('Col_2_img_2_layout' as LayoutKeys);
				} else if (slideData.content.length >= 3) {
					// Generate a random number between 0 and 1
					const randomNumber = Math.random();
					// Choose layout based on probability distribution
					if (randomNumber < 0.7) {
						slide.layout =
							slideData.layout || ('Col_3_img_0_layout' as LayoutKeys);
					} else {
						slide.layout =
							slideData.layout || ('Col_3_img_3_layout' as LayoutKeys);
					}
				}
			}

			// Return the modified slide object
			return slide;
		});

		//console.log('slidesArray:', slidesArray);
		return slidesArray;
	}

	static parseSocialPosts(
		social_posts: string,
		post_type: string,
	): SocialPostSlide[] {
		const parse_slide = JSON.parse(social_posts);
		const slidesArray: SocialPostSlide[] = Object.keys(parse_slide).map(
			(key, index) => {
				const slideData = parse_slide[key];
				const slide = new SocialPostSlide();
				if (index === 0) {
					if (post_type === 'casual_topic') {
						slide.template = slideData.template || 'First_page_img_1';
					} else if (post_type === 'serious_subject') {
						slide.English_title = slideData.English_title;
						slide.template = slideData.template || 'First_page_img_1_template2';
					} else if (post_type === 'reading_notes') {
						slide.template = slideData.template || 'First_page_img_1_template3';
					}
				} else {
					if (post_type === 'casual_topic') {
						slide.template = slideData.template || 'Col_1_img_0';
					} else if (post_type === 'serious_subject') {
						slide.template = slideData.template || 'img_0_template2';
					} else if (post_type === 'reading_notes') {
						slide.template = slideData.template || 'img_1_template3';
					}
				}
				slide.keywords = slideData.keywords || '';
				slide.topic = slideData.topic || 'Your topic here';
				slide.subtopic = slideData.subtopic;
				slide.images =
					slideData.images.filter((img: string) => img && img !== '') || [];
				slide.theme = slideData.theme;
				slide.content = slideData.content || ['Your content here'];
				slide.section_title =
					slideData.section_title || 'Your section title here';
				slide.brief = slideData.brief || 'Your brief here';
				slide.original_title = slideData.original_title;
				slide.title = slideData.title || '';
				slide.illustration =
					slideData.illustration !== null
						? slideData.illustration
						: [
								'https://stories.freepiklabs.com/storage/61572/life-in-a-city-cuate-9773.png',
							];
				slide.quote = slideData.quote || 'Your quote here';
				slide.source = slideData.source || '';
				slide.chart = slideData.chart;
				slide.is_chart = slideData.is_chart || [false, false, false];
				slide.images_position = slideData.images_position;

				return slide;
			},
		);
		return slidesArray;
	}

	static async exportToFileBackend(
		token: string,
		project_id: string,
		type: 'pdf' | 'pptx' | 'key',
	): Promise<void> {
		const headers = new Headers();
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		headers.append('Content-Type', 'application/json');

		let endpoint = '';
		if (type === 'pdf') {
			endpoint = '/api/export/export_to_pdf';
		} else {
			endpoint = `/api/export/export_to_pptx`;
		}

		try {
			fetch(endpoint, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({
					project_id: project_id,
					to_key: type === 'key',
				}),
			});
		} catch (error) {
			console.error('Error exporting to pdf:', error);
		}
	}

	static async downloadFile(
		foldername: string,
		filename: string,
		type: string,
	): Promise<boolean> {
		const headers = new Headers();

		try {
			const response = await fetch(
				`/api/${type}?foldername=${foldername}&filename=${filename}`,
				{
					method: 'GET',
					mode: 'cors',
					headers: headers,
				},
			);

			if (response.ok) {
				const file = await response.blob();
				const fileUrl = URL.createObjectURL(file);
				const link = document.createElement('a');
				link.href = fileUrl;
				link.download = filename;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				return true;
			} else {
				return false; // pdf not ready
			}
		} catch (error) {
			console.error('Error exporting to pdf:', error);
			return false;
		}
	}

	static async SlideShareLink(
		token: string,
		project_id: string,
		is_shared: boolean,
		video_is_shared: boolean,
		is_public: boolean = false,
	): Promise<void> {
		const headers = new Headers();
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		} else {
			console.error('SlideShareLink: No token provided');
			return;
		}
		headers.append('Content-Type', 'application/json');
		try {
			const response = await fetch('/api/share_project', {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({
					project_id: project_id,
					is_shared: is_shared,
					video_is_shared: video_is_shared,
					is_public: is_public,
				}),
			});
			const responseData = await response.json();
			if (response.ok) {
			} else {
				console.error(responseData.error);
			}
		} catch (error) {
			console.error('Failed to toggle share status:', error);
		}
	}

	static async clone(
		project_id: string,
		target_language: string,
		token: string,
	): Promise<Project> {
		const headers = new Headers();
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}

		const response = await fetch('/api/clone_project', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				project_id: project_id,
				target_language: target_language,
			}),
		});

		if (response.ok) {
			const resp = await response.json();
			return resp.project as Project;
		} else {
			throw new Error(
				`Failed to clone project ${project_id}, ${response.status}`,
			);
		}
	}

	static async deleteFolder(
		token: string,
		folder_name: string,
	): Promise<any> {
		const response = await fetch('/api/delete_project_group', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				group_name: folder_name,
			}),
		});
		const responseJson = await response.json();

		if (!response.ok) {
			throw new Error(responseJson.message || 'An error occurred during deleting project');
		}
		return responseJson
	}

	static async renameFolder(
		token: string,
		prev_folder_name: string,
		new_folder_name: string,
	): Promise<any> {
		const response = await fetch('/api/change_project_group_name', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				group_name: prev_folder_name,
				new_group_name: new_folder_name,
			}),
		});
		const responseJson = await response.json();

		if (!response.ok) {
			throw new Error(responseJson.message || 'An error occurred during renaming project');
		}
		return responseJson
	}

	static async moveToFolder(
		token: string,
		project_id: string,
		folder_name: string,
	): Promise<any> {
		const response = await fetch('/api/move_project', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				project_id: project_id,
				group_name: folder_name,
			}),
		});
		const responseJson = await response.json();

		if (!response.ok) {
			throw new Error(responseJson.message || 'An error occurred during the moving project');
		}
		return responseJson
	}
}

export default ProjectService;
