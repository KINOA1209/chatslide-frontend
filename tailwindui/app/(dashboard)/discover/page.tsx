'use client';

import React, { useState, useEffect, Fragment, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import ProjectTable from '../ProjectTable';
import DrlambdaButton, {
	BigBlueButton,
	InversedBigBlueButton,
} from '@/components/button/DrlambdaButton';
import Project from '@/models/Project';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';

export default function Dashboard() {
	const [projects, setProjects] = useState<Project[]>([]);
  const { token } = useUser();
	const router = useRouter();
	const promptRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [rendered, setRendered] = useState<boolean>(false);


	const currentProjects = projects;

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.style.height = contentRef.current.offsetHeight + 'px';
		}
		// Create a scoped async function within the hook.
		const fetchUserAndProject = async () => {
			try {
				handleRequest(token);
			} catch (error: any) {
				console.error(error);
			}
		};
		// Execute the created function directly
		fetchUserAndProject();
	}, []);

	// get projects from backend
	const handleRequest = async (token: string) => {
		ProjectService.getProjects(token, true).then((projects) => {
			setProjects(projects);
			setRendered(true);
			if (projects.length == 0) {
				sessionStorage.clear();
				router.push('/workflow-type-choice');
			}
		});
	};

	const handleProjectClick = (projectId: string) => {
		// Open the project detail page in a new tab
		window.open(`/shared/${projectId}`, '_blank');
	};

	useEffect(() => {
		if (rendered && projects.length === 0 && promptRef.current) {
			promptRef.current.innerHTML = 'You have no project created.';
		}
	}, [projects, rendered]);

	// function to handle click start new project, clear sessionstorage
	const handleStartNewProject = () => {
		sessionStorage.clear();
		//route to workflow-generate-outlines
		router.push('/workflow-type-choice');
		//route to type choosing page (new workflow)
		// router.push('/workflow-type-choice')
	};

	return (
		<section className='grow flex flex-col'>
			<ToastContainer />
			{/* top background container of my projects title text and button */}
			<div className='flex items-end w-full z-10 pt-[4rem] bg-Blue border-b-2 px-[5rem]'>
				{/* flex container controlling max width */}
				<div className='w-full max-w-7xl flex flex-wrap items-end justify-center'>
					{/* my project title text */}
          <div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-white text-base font-bold font-creato-medium leading-10 tracking-wide border-white border-b-2'>
            Discover Community Projects
					</div>

					{/* create new project button */}
					<div className='absolute right-5 pb-1'>
						<DrlambdaButton
							isPaidFeature={false}
							onClick={handleStartNewProject}
						>
							Start your own project
						</DrlambdaButton>
					</div>
				</div>
			</div>

			{/* projects details area */}
			<div
				className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto'
				ref={contentRef}
			>
				{projects && projects.length > 0 ? (
					<ProjectTable
						currentProjects={currentProjects}
						onProjectClick={handleProjectClick}
					/>
				) : (
					<div className='flex items-center mt-[1rem] md:mt-[6rem] justify-center text-gray-600 text-[14px] md:text-[20px] font-normal font-creato-medium leading-normal tracking-wide'>
						There are no community projects yet.
					</div>
				)}
			</div>

		</section>
	);
}
