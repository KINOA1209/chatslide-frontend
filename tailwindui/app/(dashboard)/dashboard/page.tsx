'use client';

import React, { useState, useEffect, Fragment, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import ProjectTable from '../ProjectTable';
import DrlambdaButton, {
	BigBlueButton,
	InversedBigBlueButton,
} from '@/components/button/DrlambdaButton';
import Project from '@/models/Project';
import ProjectService from '@/services/ProjectService';
import Modal from '@/components/ui/Modal';
import { UserStatus, useUser } from '@/hooks/use-user';
import OnboardingSurvey from '@/components/slides/onboardingSurvey/OnboardingSurvey';

export default function Dashboard() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [deleteInd, setDeleteInd] = useState('');
	const router = useRouter();
	const promptRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [rendered, setRendered] = useState<boolean>(false);
	const { token, userStatus } = useUser();

	const [isOpen, setIsOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const [isNewUser, setIsNewUser] = useState(false)
	const [showSurvey, setShowSurvey] = useState(false)

	function closeModal() {
		setIsOpen(false);
	}

	const currentProjects = projects;

	useEffect(() => {
    if (userStatus != UserStatus.Inited) return; 

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
  }, [userStatus]);

  	//check user survey status
	useEffect(() => {
		const checkUserSurveyStatus = async () => {
			try {
				const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
				const response = await fetch('/api/user/check_survey_status', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${idToken}`,
					},
				});

				if (response.ok) {
					const data = await response.json();
					if (data.survey_status === 'incomplete'){
						setIsNewUser(true)
						setShowSurvey(true)
						console.log('The user had not completed the survey before')
					}
					else{
						console.log('The user had completed the survey before')
					}
				} 
				else {
					console.error('HTTP Error:', response.statusText);
				}
			} 
			catch (error) {
				console.error('Error:', error);
			}
		};
		checkUserSurveyStatus();
	}, []);

	// useEffect(() => {
	// 	const updateHeight = () => {
	// 		if (activeSlideRef.current && parentContainerRef.current) {
	// 			const height = activeSlideRef.current.offsetHeight;
	// 			parentContainerRef.current.style.height = `${height}px`;
	// 		}
	// 	};

	// 	// MutataionObserver to dynamically adjust the container's height
	// 	if (activeSlideRef.current && parentContainerRef.current) {
	// 		const observer = new MutationObserver(updateHeight);
	// 		// looking for anychange in onboardingsurvey, once a section shows, it will call updateHeight
	// 		observer.observe(activeSlideRef.current, {
	// 			childList: true,
	// 			subtree: true,  
	// 			characterData: true
	// 		});

	// 		//also trigger updateHeight when the user resizes the window
	// 		window.addEventListener('resize', updateHeight);

	// 		updateHeight();

	// 		return () => {
	// 			observer.disconnect();
	// 			window.removeEventListener('resize', updateHeight);
	// 		};
	// 	}
	// }, [showSurvey, activeSlideRef, parentContainerRef]);

	const handleBackToChoices = () => {
		setShowSurvey(false)
	}

	// get projects from backend
	const handleRequest = async (token: string) => {
		ProjectService.getProjects(token).then((projects) => {
      console.log('projects', projects);
			setProjects(projects);
			setRendered(true);
			if (projects.length == 0) {
				sessionStorage.clear();
				//router.push('/workflow-type-choice');
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
	};

	return (
		<section className='grow flex flex-col'>
			<ToastContainer />
			{/* top background container of my projects title text and button */}
			{!showSurvey && (
			<div className='grow flex flex-col'>
				<div className='flex items-end w-full z-10 pt-[4rem] bg-Blue border-b-2 px-[5rem]'>
					{/* flex container controlling max width */}
					<div className='w-full max-w-7xl flex flex-wrap items-end justify-center'>
						{/* my project title text */}
						<div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-white text-base font-bold font-creato-medium leading-10 tracking-wide border-white border-b-2'>
							My Projects
						</div>

						{/* create new project button */}
						<div className='absolute right-5 pb-1'>
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
					className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto '
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
			</div>
			)}
			{showSurvey && (
                <OnboardingSurvey handleBack={handleBackToChoices}/>
            )}
		</section>
	);
}
