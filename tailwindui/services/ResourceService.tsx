import Resource from '@/models/Resource';

class ResourceService {
	static async fetchResources(
		resourceType: string[],
		token: string,
	): Promise<Resource[]> {
		const headers = new Headers();
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		headers.append('Content-Type', 'application/json');
		try {
			const response = await fetch('/api/resource_info', {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ resource_type: resourceType }),
			});
			if (response.ok) {
				const data = await response.json();

				return data.data.resources;
			} else {
				throw new Error(`Failed to fetch resources: ${response.status}`);
			}
		} catch (error) {
			console.error(error);
		}
		return [];
	}

	static async deleteResource(
		resource_id: string,
		token: string,
	): Promise<boolean> {
		const response = await fetch('/api/delete_user_resource', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				resource_id: resource_id,
			}),
		});
		return response.ok || response.status === 404; // 404 means resource already deleted
	}

	static async uploadResource(
		file: File,
		token: string,
		pageInvoked: string | undefined,
		type: string = '',
	): Promise<Resource> {
		const body = new FormData();
		body.append('file', file);
		if (pageInvoked === 'theme') {
			body.append('resource_type', type || 'logo');
		}

		const response = await fetch('/api/upload_user_file', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: body,
		});

		if (response.ok) {
			const data = await response.json();
			return data.data;
		} else {
			throw new Error(
				`Failed to upload resource: ${response.status}; filename: ${file.name}`,
			);
		}
	}

	static async summarizeResource(
		project_id: string,
		resources: string[],
		topic: string,
		audience: string,
		language: string,
		search_online: string,
		toekn: string,
	): Promise<any> {
		const header = new Headers();
		if (toekn) {
			header.append('Authorization', `Bearer ${toekn}`);
		}

		const response = await fetch('/api/summary', {
			method: 'POST',
			headers: header,
			body: JSON.stringify({
				project_id: project_id,
				resources: resources,
				topic: topic,
				audience: audience,
				language: language,
				search_online: search_online,
			}),
		});

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(`Failed to summarize resources: ${response.status}`);
		}
	}

	static async queryResource(
		project_id: string,
		resource_id: string[],
		outlineData: any,
		search_online: string,
		token: string,
	): Promise<any> {
		console.log('project_id', project_id);
		const headers = new Headers();
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		const response = await fetch('/api/query_resources', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				outlines: JSON.stringify({ ...outlineData }),
				resources: resource_id,
				project_id: project_id,
				search_online: search_online,
			}),
		});

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(`Failed to query resources: ${response.status}`);
		}
	}

	static async ocr(resource_id: string, token: string): Promise<boolean> {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		try {
			const response = await fetch('/api/ocr', {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({
					resource_id: resource_id,
				}),
			});

			if (response.ok) {
				return true;
			} else {
				console.error(
					`Failed to OCR resource ${resource_id}: ${response.status}`,
				);
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}

export default ResourceService;
