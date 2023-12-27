import { LayoutKeys } from '@/components/slides/slideLayout';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import Project from '@/models/Project';
import Slide from '@/models/Slide';

class ProjectService {

  static async getSharedProjectDetails(
    project_id: string,
  ): Promise<Project> {
    console.log(`Fetching shared project details.`);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    try {
      // fetch project details
      const response = await fetch(`/api/get_shared_project?project_id=${project_id}`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`Error fetching project ${project_id} details: ${response.status}`);
      }

      const project = await response.json() as Project;
      console.log('Project data:', project);

      if (project?.presentation_slides) {
        project.parsed_slides = this.parseSlides(project.presentation_slides);
      }

      return project;
    } catch (error) {
      console.error(`Error fetching project ${project_id} details:`, error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }


  static async getProjectDetails(
    token: string,
    project_id: string,
  ): Promise<Project> {
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

      const project = await response.json() as Project;
      console.log('Project data:', project);

      if(project?.presentation_slides) {
        project.parsed_slides = this.parseSlides(project.presentation_slides);
      }

      return project;
    } catch (error) {
      console.error('Error fetching project details:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  static async getProjects(token: string): Promise<Project[]> {
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    try {
      const response = await fetch('/api/get_projects', {
        method: 'POST',
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        data.projects.forEach((item: Project) => {
          if (item.task === null) {
            item.task = 'presentation';
          }
        });
        return data.projects;
      } else {
        // Handle error cases
        console.error('Failed to fetch projects:', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
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

    let jsonSlides = JSON.parse(presentation_slides);
    if(typeof jsonSlides === 'string') {
      jsonSlides = JSON.parse(jsonSlides);
    }
    // console.log('jsonSlides:', jsonSlides);
    // console.log('typeof jsonSlides:', typeof jsonSlides);

    // mapping data to slides
    const slidesArray: Slide[] = Object.keys(jsonSlides).map(
      (key, index) => {
        const slideData = typeof jsonSlides[key] === 'string' ? JSON.parse(jsonSlides[key]) : jsonSlides[key];
        console.log('slideData:', slideData);
        const slide = new Slide();
        slide.head = slideData.head || 'New Slide';
        slide.title = slideData.title || 'New Slide';
        slide.subtopic = slideData.subtopic || 'New Slide';
        slide.userName = slideData.userName || '';
        slide.template =
          slideData.template ||
          sessionStorage.getItem('schoolTemplate') ||
          ('Default' as TemplateKeys);
        slide.content = slideData.content || [
          'Some content here',
          'Some more content here',
          'Even more content here',
        ];
        slide.images = slideData.images || [];
        // console.log(
        //     'slideData.content.length',
        //     slideData.content.length        // );
        slide.logo = slideData.logo || 'Default';
        if (index === 0) {
          slide.layout =
            slideData.layout || ('Cover_img_1_layout' as LayoutKeys);
        } else {
          // choose default layout based on number of bullet points
          if (slideData.content.length === 1) {
            slide.layout =
              slideData.layout || ('Col_2_img_1_layout' as LayoutKeys);
          } else if (slideData.content.length === 2) {
            slide.layout =
              slideData.layout || ('Col_2_img_2_layout' as LayoutKeys);
          } else if (slideData.content.length === 3) {
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
      })

      console.log('slidesArray:', slidesArray);
      return slidesArray;
    }


    static async exportToPdfBackend( token: string, project_id: string ): Promise<void> {
      const headers = new Headers();
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
      }
      headers.append('Content-Type', 'application/json');

      try {
        const response = await fetch('/api/export_to_pdf', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ project_id: project_id }),
        });
        if (response.ok) {
          const data = await response.json();
          const url = data.url;

          const topic = sessionStorage.getItem('topic') || 'export';

          //download file
          const a = document.createElement('a');
          a.href = url;
          a.download = `${topic}.pdf`
          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

        } else {
          // Handle error cases
          console.error('Failed to export to pdf:', response.status);
        }
      } catch (error) {
        console.error('Error exporting to pdf:', error);
      }
    }
}

export default ProjectService;
