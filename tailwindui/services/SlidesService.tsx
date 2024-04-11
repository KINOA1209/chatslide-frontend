import Slide from '@/models/Slide';

class SlidesService {
	static async generateSlides(formData: any, token: string) {
		const response = await fetch('/api/generate_slides', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			const resp = await response.json();
			const presentation_slides = JSON.stringify(resp.data.res);
			const description = resp.data.description;
			const keywords = resp.data.keywords;
			return {
				presentation_slides,
				description,
				keywords,
			};
		} else {
			throw new Error('Error when generating slides: ' + response.status);
		}
	}

	static async saveSlides(formData: any, token: string) {
		const resp = await fetch('/api/save_slides', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		});

		return resp.ok;
	}

	static async initImages(
		project_id: string,
		topic: string,
		license: string,
		image_amount: string,
		token: string,
	) {
		const resp = await fetch('/api/init_slide_images', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				project_id: project_id,
				topic: topic,
				license: license,
				image_amount: image_amount,
			}),
		});
		const data = await resp.json();
		console.log(data);
		return {
			slides: Object.values(data.data.slides) as Slide[],
			additional_images: data.data.additional_images as string[],
		};
	}

	static async updateThumbnail(project_id: string, token: string) {
		try {
			const resp = await fetch('/api/update_thumbnail', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ project_id: project_id }),
			});
			return resp.ok;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async generateScripts(formData: any, token: string): Promise<string[]> {
		const response = await fetch('/api/generate_script', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			const resp = await response.json();
			const transcripts = resp.data.res;
			return transcripts;
		} else {
			throw new Error('Error when generating scripts: ' + response.status);
		}
	}
}

export default SlidesService;
