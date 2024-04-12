'use client';

import React, { useState, useEffect, Fragment, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import ProjectTable from '../ProjectTable';
import DrlambdaButton from '@/components/button/DrlambdaButton';
import Project from '@/models/Project';
import ProjectService from '@/services/ProjectService';
import Modal from '@/components/ui/Modal';
import { UserStatus, useUser } from '@/hooks/use-user';
import OnboardingSurvey from '@/components/slides/onboardingSurvey/OnboardingSurvey';
import UserService from '@/services/UserService';
import { Loading, Blank } from '@/components/ui/Loading';
import SessionStorage from '@/utils/SessionStorage';
import { useProject } from '@/hooks/use-project';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';

export default function Dashboard() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [deleteInd, setDeleteInd] = useState('');
	const router = useRouter();
	const contentRef = useRef<HTMLDivElement>(null);
	const [rendered, setRendered] = useState<boolean>(false);
	const { token, userStatus, updateCreditsAndTier } = useUser();
	const { initProject } = useProject();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSurvey, setShowSurvey] = useState(false);

	const currentProjects = projects;

	useEffect(() => {
		if (userStatus != UserStatus.Inited) return;
		if (contentRef.current) {
			contentRef.current.style.height = contentRef.current.offsetHeight + 'px';
		}
		init();
	}, [userStatus]);

	const fetchProjects = async () => {
		try {
			ProjectService.getProjects(token).then((projects) => {
				console.log('projects', projects);
				setProjects(projects);
				setRendered(true);
			});
		} catch (error: any) {
			console.error(error);
		}
	};

	const init = async () => {
		if (!token) return; // sidebar will show a modal to ask user to login

		const promo = SessionStorage.getItem('promo');
		if (promo) {
			const { status, message } = await UserService.applyPromoCode(
				promo,
				token,
			);
			console.log(status, message);
			if (status == 200) {
				toast.success('Your code is successfully applied!', {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				SessionStorage.removeItem('promo');
				updateCreditsAndTier();
			}
		}

		fetchProjects();
		const surveyFinished = await UserService.checkSurveyFinished(token);
		if (!surveyFinished) {
			setShowSurvey(true);
		} else if (rendered && projects.length === 0) {
			router.push('/type-choice');
		}
	};

	const handleCloseSurvey = () => {
		setShowSurvey(false);
		console.log('back to choices');
		// console.log('rendered', rendered)
		if (rendered && projects.length === 0) {
			router.push('/type-choice');
		}
	};

	const handleDelete = (projectId: string) => {
		setDeleteInd(projectId);
		setShowDeleteModal(true);
	};

	const confirmDelete = async () => {
		if (deleteInd === '') {
			throw 'Error';
		}
		try {
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
		setShowDeleteModal(false);
		setDeleteInd('');
	};

	// function to handle click start new project, clear sessionstorage
	const handleStartNewProject = () => {
		sessionStorage.clear();
		router.push('/type-choice');
	};

	const AIIcon = (
		<div
			className='Badge'
			style={{
				width: 24,
				height: 22,
				paddingLeft: 6,
				paddingRight: 6,
				paddingTop: 2,
				paddingBottom: 2,
				background: '#EFF4FF',
				borderRadius: 6,
				border: '1px #C7D7FE solid',
				justifyContent: 'flex-start',
				alignItems: 'center',
				display: 'inline-flex',
			}}
		>
			<div
				className='Text'
				style={{
					textAlign: 'center',
					color: '#3538CD',
					fontSize: 12,
					fontFamily: 'Creato Display',
					fontWeight: '500',
					lineHeight: 18,
					wordWrap: 'break-word',
				}}
			>
				AI
			</div>
		</div>
	);

	return (
		<section className='grow flex flex-col'>
			<ToastContainer />
			{/* top background container of my projects title text and button */}
			<div className='grow flex flex-col'>
				<div className='flex flex-row items-end w-full z-10 pt-[2rem] px-[2rem]'>
					{/* flex container controlling max width */}
					<div className='w-full max-w-7xl flex flex-wrap items-center justify-between'>
						{/* my project title text */}
						{/* <div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-black text-base font-bold font-creato-medium leading-10 tracking-wide border-white border-b-2'>
							My Projects
						</div> */}
						<div className='text-black text-[24px] font-bold font-creato-medium leading-10 tracking-wide'>
							My Projects
						</div>

						{/* create new project button */}
						<div className=''>
							{/* <DrlambdaButton
								isPaidFeature={false}
								onClick={handleStartNewProject}
								id='start_new_project'
							>
								Start
							</DrlambdaButton> */}
							<DesignSystemButton
								isPaidFeature={false}
								size='lg'
								hierarchy='primary'
								buttonStatus='enabled'
								iconRight={AIIcon}
								// text='Create New'
								onClick={handleStartNewProject}
							>
								Create New
							</DesignSystemButton>
						</div>
					</div>
				</div>

				{/* projects details area */}
				<div
					className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto '
					ref={contentRef}
				>
					{rendered ? (
						projects && projects.length > 0 ? (
							<ProjectTable
								currentProjects={currentProjects}
								setCurrentProjects={setProjects}
								onDelete={handleDelete}
								isDiscover={false}
							/>
						) : (
							<Blank text={`You haven't created any project yet.`} />
						)
					) : (
						<Loading />
					)}
				</div>

				{/* Delete modal */}
				<Modal
					showModal={showDeleteModal}
					setShowModal={setShowDeleteModal}
					title='Delete Project'
					description='Are you sure you want to delete this project?'
					onConfirm={confirmDelete}
				/>
			</div>
			{showSurvey && (
				<Modal
					showModal={showSurvey}
					setShowModal={handleCloseSurvey}
					// title='Welcome to DrLambda!'
					// description='We are excited to have you onboard. Please take a few minutes to complete the onboarding survey.'
				>
					<OnboardingSurvey handleBack={handleCloseSurvey} />
				</Modal>
			)}
		</section>
	);
}
