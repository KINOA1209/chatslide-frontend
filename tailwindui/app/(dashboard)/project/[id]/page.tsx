'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import ProjectService from '@/services/ProjectService';
import Project from '@/models/Project';
import { useSlides } from '@/hooks/use-slides';
import { useProject } from '@/hooks/use-project';
import { useUser } from '@/hooks/use-user';
import { getLastStepReidrect } from '@/components/layout/WorkflowSteps';
import { Loading } from '@/components/ui/Loading';
import { addIdToRedir } from '@/utils/redirWithId';

const ProjectLoading = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { initSlides } = useSlides();
	const { project, initProject } = useProject();
	const { token } = useUser();

	useEffect(() => {
		sessionStorage.clear();

		const loadProject = async () => {
			try {
				await fetchProjectDetails(token);
			} catch (error) {
				console.error(error);
			}
		};

		loadProject();
	}, []);

	const setSessionStorage = (project: Project) => {
		// Store values in sessionStorage if they exist, will be deprecated in favor of bear storage
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
		if (project.resources) {
			sessionStorage.setItem(
				'selectedResources',
				JSON.stringify(project.resources),
			);
			sessionStorage.setItem(
				'selectedResourceId',
				JSON.stringify(project.resources.map((r) => r.id)),
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
	};

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
				const project = await ProjectService.getProjectDetails(
					token,
					project_id,
				);
				await initProject(project); // will also init outlines
				if (project?.parsed_slides) {
					initSlides(project.parsed_slides);
				}
				setSessionStorage(project);
				handleRedirect(project, project_id);
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

	const handleRedirect = async (project: Project, project_id: string) => {
		router.push(addIdToRedir(getLastStepReidrect(project), project_id));
	};

	return <Loading />;
};

export default ProjectLoading;
