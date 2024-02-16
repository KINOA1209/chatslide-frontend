import { LayoutKeys } from '@/components/slides/slideLayout';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import Project from '@/models/Project';
import Slide from '@/models/Slide';


class ProjectService {

  static async getSharedProjectDetails(
    project_id: string,
    server_side: boolean = false  // if true, fetch use abs url
  ): Promise<Project> {
    //console.log(`Fetching shared project details.`);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const baseUrl = process.env.HOST ? process.env.HOST : 'localhost';
    const protocol = baseUrl == 'localhost' ? 'http' : 'https';
    const url = server_side ? `${protocol}://${baseUrl}/api/get_shared_project` : '/api/get_shared_project';

    try {
      // fetch project details
      const response = await fetch(`${url}?project_id=${project_id}`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`getSharedProjectDetails failed, project_id: ${project_id},
        url: ${url},
        details: ${response.status}`);
      }

      const project = await response.json() as Project;
      //console.log('Project data:', project);

      if (project?.presentation_slides) {
        project.parsed_slides = this.parseSlides(project.presentation_slides);
      }
      if (project?.social_posts) {
        project.parsed_socialPosts = this.parseSocialPosts(project.social_posts, project.post_type, project.project_name)
      }

      return project;
    } catch (error) {
      console.error(`getSharedProjectDetails failed, project_id: ${project_id},
      url: ${url},
      details:`, error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }


  static async getProjectDetails(
    token: string,
    project_id: string,
    server_side: boolean = false  // if true, fetch use abs url 
  ): Promise<Project> {
    //console.log(`Fetching project details.`);
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    const baseUrl = process.env.HOST ? process.env.HOST : 'localhost';
    const protocol = baseUrl == 'localhost' ? 'http' : 'https';
    const url = server_side ? `${protocol}://${baseUrl}/api/get_project_details` : '/api/get_project_details';

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

      const project = await response.json() as Project;
      //console.log('Project data:', project);

      if (project?.presentation_slides) {
        project.parsed_slides = this.parseSlides(project.presentation_slides);
      }

      return project;
    } catch (error) {
      console.error(`getProjectDetails Error fetching project details: ${error}
      url: ${url}`);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  static async getProjects(token: string, is_public: boolean = false): Promise<Project[]> {
    const headers = new Headers();
    if (token.length == 0 && is_public) {
      token = process.env.SELF_TOKEN || '';
    }
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    try {
      const response = await fetch('/api/get_projects', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ public: is_public }),
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

    // mapping data to slides
    const slidesArray: Slide[] = Object.keys(jsonSlides).map(
      (key, index) => {
        const slideData = typeof jsonSlides[key] === 'string' ? JSON.parse(jsonSlides[key]) : jsonSlides[key];
        //console.log('slideData:', slideData);
        const slide = new Slide();
        slide.head = slideData.head || 'New Slide';
        slide.title = slideData.title || 'New Slide';
        slide.subtopic = slideData.subtopic || 'New Slide';
        slide.userName = slideData.userName || '';
        slide.template =
          slideData.template ||
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
        slide.transcript = slideData.transcript || '';
        slide.logo_url = slideData.logo_url || '';
        slide.background_url = slideData.background_url || '';
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

    //console.log('slidesArray:', slidesArray);
    return slidesArray;
  }

  static parseSocialPosts(social_posts: string, post_type: string, project_name: string): SocialPostSlide[] {
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
            slide.template =
              slideData.template || 'First_page_img_1_template2';
          } else if (post_type === 'reading_notes') {
            slide.template =
              slideData.template || 'First_page_img_1_template3';
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
        slide.images = slideData.images;
        slide.theme = slideData.theme;
        slide.content = slideData.content || ['Your content here'];
        slide.section_title = slideData.section_title || [
          'Your section title here',
        ];
        slide.brief = slideData.brief || ['Your brief here'];
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

        return slide;
      },
    );
    return slidesArray
  }


  static async exportToFileBackend(token: string, project_id: string, type: string = 'pdf'): Promise<void> {
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    try {
      const response = await fetch(`/api/export_to_${type}`, {
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

  static async SlideShareLink(token: string, project_id: string, setShare: (share: boolean) => void): Promise<void> {
    const newShareStatus = true
    setShare(newShareStatus)
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');
    try {
      const response = await fetch('/api/share_project', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          project_id: project_id,
          is_shared: newShareStatus,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        sessionStorage.setItem('is_shared', newShareStatus.toString());
      } else {
        console.error(responseData.error);
      }
    } catch (error) {
      console.error('Failed to toggle share status:', error);
    }
  }
}

export default ProjectService;
