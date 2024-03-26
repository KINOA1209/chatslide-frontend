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
	const { project, initProject, updateProject } = useProject();
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

					if (project.parsed_slides?.some((slide) => slide.transcript)){
						updateProject('has_scripts', true);
					}
					updateProject('template', project.parsed_slides[0].template);
					updateProject('palette', project.parsed_slides[0].palette);
				}
				// setSessionStorage(project);
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
