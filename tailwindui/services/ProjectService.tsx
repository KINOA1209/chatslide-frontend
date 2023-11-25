import Project from "@/models/Project";

class ProjectService {

  static async getProjectDetails(token: string, project_id: string): Promise<Project> {
    console.log(`Fetching project details.`);
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    try {
      // fetch project details
      const response = await fetch('/api/get_project_details', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ project_id: project_id }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching project details: ${response.status}`);
      }

      const data = await response.json();
      console.log('Project data:', data);
      return data;

    } catch (error) {
      console.error('Error fetching project details:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

}

export default ProjectService;