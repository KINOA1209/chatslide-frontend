'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AuthService from '@/services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectService from '@/services/ProjectService';
import Project from '@/models/Project';
import { useSlides } from '@/hooks/use-slides';
import { useProject } from '@/hooks/use-project';
import { useUser } from '@/hooks/use-user';
import { getLastStepReidrect } from '@/components/WorkflowSteps';

const ProjectLoading = () => {
	const pathname = usePathname();
	const router = useRouter();
  const { initSlides } = useSlides();
  const { initProject } = useProject();
  const { token } = useUser();

  const { project, updateProject } = useProject();

	useEffect(() => {
		sessionStorage.clear();
    initSlides([]);
    try {
      fetchProjectDetails(token);
    } catch (error: any) {
      console.error(error);
    }
	}, []);

	useEffect(() => {
		if (project) {
      initProject(project);

			// Store values in sessionStorage if they exist
			if (project.topic) {
				sessionStorage.setItem('topic', project.topic);
			}
			if (project.language) {
				sessionStorage.setItem('language', project.language);
			}
			if (project.foldername) {
				sessionStorage.setItem('foldername', project.foldername);
			}
			if (project.project_name) {
				sessionStorage.setItem('project_name', project.project_name);
			}
			// if (project.resource_ids) {
			//     sessionStorage.setItem('selectedResourceId', JSON.stringify(project.resource_ids));
			// }
			if (project.resources) {
				sessionStorage.setItem(
					'selectedResources',
					JSON.stringify(project.resources),
				);
			}
			const content_type = project.content_type ?? 'presentation';
			sessionStorage.setItem('content_type', content_type);
			if (content_type == 'presentation') {
				if (project.scenario_type) {
					sessionStorage.setItem('scenarioType', project.scenario_type);
				}
				if (project.audience) {
					sessionStorage.setItem('audience', project.audience);
				}
				if (project.presentation_slides) {
					sessionStorage.setItem(
						'presentation_slides',
						JSON.stringify(project.presentation_slides),
					);
				}
				if (project.pdf_images) {
					sessionStorage.setItem(
						'pdf_images',
						JSON.stringify(project.pdf_images),
					);
				}
				if (project.video_url) {
					sessionStorage.setItem('video_url', project.video_url);
				}
				if (project.extra_knowledge) {
					sessionStorage.setItem('extraKnowledge', project.extra_knowledge);
				}
				if (project.outline_item_counts) {
					sessionStorage.setItem(
						'outline_item_counts',
						JSON.stringify(project.outline_item_counts),
					);
				}
			} else if (content_type == 'social_posts') {
				if (project.post_type) {
					sessionStorage.setItem('scenarioType', project.post_type);
				}
				if (project.social_platform) {
					sessionStorage.setItem('social_platform', project.social_platform);
				}
				if (project.social_posts) {
					sessionStorage.setItem('socialPost', project.social_posts);
				}
			}
			handleRedirect(project);
		}
	}, [project]);

	const fetchProjectDetails = async (token: string) => {
		console.log(`Fetching project details.`);
		const headers = new Headers();
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		headers.append('Content-Type', 'application/json');

		try {
			const project_id = pathname?.split('/').pop();
			if (project_id) {
				console.log('loading project with id', project_id);
				const project = await ProjectService.getProjectDetails(token, project_id);
        initProject(project);  // will also init outlines
        if (project?.parsed_slides){
          initSlides(project.parsed_slides)
        }
			}
		} catch (error) {
			toast.error('The project is not found or you do not have access to it.', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
	};

	const handleRedirect = async (project: Project) => {
    router.push(getLastStepReidrect(project));
	};

	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
						<p>Loading project...</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectLoading;
