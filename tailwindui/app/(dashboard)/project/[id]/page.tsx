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
import { Blank, Loading } from '@/components/ui/Loading';
import { addIdToRedir } from '@/utils/redirWithId';
import { useSocialPosts } from '@/hooks/use-socialpost';

const ProjectLoading = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { initSlides } = useSlides();
	const { project, initProject, updateProject, bulkUpdateProject } =
		useProject();
	const { token } = useUser();
	const { initSocialPosts } = useSocialPosts();
	const [failed, setFailed] = useState(false);

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
			let project_id = pathname?.split('/').pop();
      // remove any text after space or . 
      project_id = project_id?.split(' ')[0];
      project_id = project_id?.split('.')[0];
      project_id = project_id?.split('%20')[0];

			if (project_id) {
				console.log('loading project with id', project_id);
				const project = await ProjectService.getProjectDetails(
					token,
					project_id,
				);
				await initProject(project); // will also init outlines
				const parsedSlides = project?.parsed_slides; // Assign to a variable to simplify null check

				// console.log('fetchProhectDetails loaded parsedSlides', parsedSlides);

				if (parsedSlides && parsedSlides.length > 0) {
					initSlides(parsedSlides, true);
				}
				if (project?.parsed_socialPosts) {
					initSocialPosts(project.parsed_socialPosts);
				}
				// setSessionStorage(project);
				handleRedirect(project, project_id);
			}
		} catch (error) {
			setFailed(true);
		}
	};

	const handleRedirect = async (project: Project, project_id: string) => {
		router.push(addIdToRedir(getLastStepReidrect(project), project_id));
	};

	if (failed) {
		return (
			<Blank>
				❌ The project is not found or you do not have access to it.
			</Blank>
		);
	}
	return <Loading />;
};

export default ProjectLoading;
