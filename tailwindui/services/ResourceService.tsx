import Resource from "@/models/Resource";


class ResourceService {

  static async fetchResources(resourceType: string[], token: string): Promise<Resource[]> {
    const headers = new Headers()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }
    headers.append('Content-Type', 'application/json')
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

  static async deleteResource(resource_id: string, token: string): Promise<boolean> {
    const response = await fetch('/api/delete_user_resource', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        resource_id: resource_id,
      }),
    })
    return response.ok
  }
}

export default ResourceService;