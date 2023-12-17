'use client';

import Link from 'next/link';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '@/services/AuthService';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import ProjectTable from './ProjectTable';
import DrlambdaButton, {
	BigBlueButton,
	InversedBigBlueButton,
} from '@/components/button/DrlambdaButton';
import Project from '@/models/Project';
import ProjectService from '@/services/ProjectService';
import { UserStudy } from '@/components/ui/UserStudy';
import Modal from '@/components/ui/Modal';

export default function Dashboard() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [deleteInd, setDeleteInd] = useState('');
	const router = useRouter();
	const promptRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [rendered, setRendered] = useState<boolean>(false);

	const [isOpen, setIsOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	const currentProjects = projects;

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.style.height = contentRef.current.offsetHeight + 'px';
		}
		// Create a scoped async function within the hook.
		const fetchUserAndProject = async () => {
			try {
				const { userId, idToken: token } =
					await AuthService.getCurrentUserTokenAndId();
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
		ProjectService.getProjects(token).then((projects) => {
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
		window.open(`/project/${projectId}`, '_blank');
	};

	const handleDelete = (
		e: React.MouseEvent<HTMLDivElement>,
		projectId: string,
	) => {
		e.stopPropagation();
		// Modal for warning
		setDeleteInd(projectId);
		setIsOpen(true);
	};

	const confirmDelete = async () => {
		setIsDeleting(true);
		if (deleteInd === '') {
			throw 'Error';
		}
		try {
			const { userId, idToken: token } =
				await AuthService.getCurrentUserTokenAndId();
			const response = await ProjectService.deleteProject(token, deleteInd);

			setProjects(projects.filter((proj) => proj.id !== deleteInd));
		} catch (error: any) {
			toast.error(error.message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
		setIsDeleting(false);
		setIsOpen(false);
		setDeleteInd('');
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
			<div className='mt-[3rem] flex items-end w-full z-10 pt-[4rem] border-b-2 px-[5rem]'>
				{/* flex container controlling max width */}
				<div className='w-full max-w-7xl flex flex-wrap items-end justify-center'>
					{/* my project title text */}
					<div className='absolute left-10 md:left-[50%] text-neutral-900 text-base font-bold font-creato-medium leading-10 tracking-wide border-black border-b-2'>
						My Projects
					</div>

					{/* create new project button */}
					<div className='absolute right-10 pb-[1rem] '>
						<DrlambdaButton
							isPaidFeature={false}
							onClick={handleStartNewProject}
						>
							Start
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
						onDelete={handleDelete}
					/>
				) : (
					<div className='flex items-center mt-[1rem] md:mt-[6rem] justify-center text-gray-600 text-[14px] md:text-[20px] font-normal font-creato-medium leading-normal tracking-wide'>
						You haven't created any project yet.
					</div>
				)}
			</div>

			{/* Delete modal */}
			<Modal showModal={isOpen} setShowModal={setIsOpen}>
				<div className='flex flex-col gap-y-2'>
					<h4 className='h4 text-center'>Delete Project</h4>
					<div className=''>Are you sure you want to delete this project?</div>

					<div className='flex gap-x-2 justify-end'>
						<BigBlueButton onClick={confirmDelete} isSubmitting={isDeleting}>
							Confirm
						</BigBlueButton>
						<InversedBigBlueButton onClick={closeModal}>
							Cancel
						</InversedBigBlueButton>
					</div>
				</div>
			</Modal>

			{/* <UserStudy /> */}
		</section>
	);
}
