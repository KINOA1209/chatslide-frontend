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

	static async uploadResource(file: File, token: string, pageInvoked: string | undefined): Promise<Resource> {
		const body = new FormData();
		body.append('file', file);
		if (pageInvoked === 'theme'){
			body.append('resource_type', 'logo')
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
			throw new Error(`Failed to upload resource: ${response.status}; filename: ${file.name}`);
		}
	}

	static async queryResource(
		project_id: string,
		resource_id: string[],
		outlineData: any,
		token: string,
	): Promise<any> {
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
			}),
		});

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(`Failed to query resources: ${response.status}`);
		}
	}
}

export default ResourceService;
