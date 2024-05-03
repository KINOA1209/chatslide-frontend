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
import { Title } from '@/components/ui/Text'
import CreateFolderModal from '@/components/dashboard/createFolderModal';
import { groupProjectsByFolder } from '@/components/dashboard/folder_helper';
import Folder from '@/models/Folder';
import FolderButton from '@/components/dashboard/FolderButton';

export default function Dashboard() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [folders, setFolders] = useState<Folder[]>([])
	const [deleteInd, setDeleteInd] = useState('');
	const router = useRouter();
	const contentRef = useRef<HTMLDivElement>(null);
	const [rendered, setRendered] = useState<boolean>(false);
	const { token, userStatus, updateCreditsAndTier } = useUser();
	const { initProject } = useProject();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSurvey, setShowSurvey] = useState(false);
	const [hasFolder, setHasFolder] = useState(true);
	const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
	const [activeFolder, setActiveFolder] = useState('drlambda-default');
	const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
	const [showDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
	const [deleteFolderName, setDeleteFolderName] = useState('');
	const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
	const [renameInput, setRenameInput] = useState('')
	const [prevFolderName, setPrevFolderName] = useState('')

	useEffect(() => {
		if (userStatus != UserStatus.Inited) return;
		if (contentRef.current) {
			contentRef.current.style.height = contentRef.current.offsetHeight + 'px';
		}
		init();
	}, [userStatus]);

	const fetchProjects = async () => {
		try {
			// ProjectService.getProjects(token, false, false, true).then((projects) => {
			// 	console.log('projects', projects);
			// 	console.log(groupProjectsByFolder(projects))
			// 	setProjects(projects);
			// 	setRendered(true);
			// });
			const response = await ProjectService.getProjects(token, false, false, true);

			// response is data.projects
			if (Array.isArray(response)) {
				console.log('Projects only:', response);
				setProjects(response);
			} else {
				console.log('Projects and Folders:', response);
				setProjects(response.projects);
				console.log(projects)
				setFolders(groupProjectsByFolder(response.projects, response.empty_groups));
				console.log(groupProjectsByFolder(response.projects, response.empty_groups))
				setCurrentProjects(response.projects)
			}
			setRendered(true);
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

	const handleCreateFolderClick = () => {
		setShowCreateFolderModal(true)
	}

	const handleFolderDoubleClick = (folderName: string) => {
		console.log('Entering folder:', folderName);
		setActiveFolder(folderName);
		const filteredProjects = projects.filter(project => project.project_group_name === folderName);
		setCurrentProjects(filteredProjects)
		console.log(currentProjects)
	}

	const handleDeleteFolder = (folderName: string) => {
		setDeleteFolderName(folderName);
		setShowDeleteFolderModal(true);
	};

	const confirmDeleteFolder = async () => {
		if (deleteFolderName === '') {
			throw 'Error';
		}
		try {
			const response = await ProjectService.deleteFolder(token, deleteFolderName);

			setFolders(folders.filter((folder) => folder.folderName !== deleteFolderName));
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
		setShowDeleteFolderModal(false);
		setDeleteFolderName('');
	};

	const handleRenameFolder = (folderName: string) => {
		setPrevFolderName(folderName)
		setShowRenameFolderModal(true)
	}

	const confirmRenameFolder = async () => {
		if (renameInput === '') {
			toast.error('Folder name cannot be empty.', {
				position: 'top-center',
				autoClose: 5000,
			});
			return;
		}
		try {
			const response = await ProjectService.renameFolder(token, prevFolderName, renameInput);

			setFolders((prevFolders) =>
				prevFolders.map(folder =>
					folder.folderName === prevFolderName
						? { ...folder, folderName: renameInput }
						: folder
				)
			);
			setFolders(prevFolders => {
				// Map through folders to find and update the renamed folder
				const updatedFolders = prevFolders.map(folder =>
					folder.folderName === prevFolderName
						? { ...folder, folderName: renameInput }
						: folder
				);
				return updatedFolders.sort((a, b) => a.folderName.localeCompare(b.folderName));
			});
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
		setShowRenameFolderModal(false);
		setRenameInput('');
		setPrevFolderName('');
	};

	return (
		<section className='grow flex flex-col'>
			<ToastContainer />
			{/* top background container of my projects title text and button */}
			<div className='grow flex flex-col'>
				<div className='flex flex-row items-end w-full z-10 pt-[2rem] px-[2rem]'>
					{/* flex container controlling max width */}
					<div className='w-full flex flex-wrap items-center justify-between'>
						{/* my project title text */}
						{/* <div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-black text-base font-bold leading-10 tracking-wide border-white border-b-2'>
							My Projects
						</div> */}
						<div
							className='text-[24px] font-bold leading-[32px] tracking-wide'
							style={{
								color: 'var(--colors-text-text-secondary-700, #344054)',
							}}
						>
							My Projects
						</div>

						{/* create new project button */}
						<div className='flex flex-row gap-2'>
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
								onClick={handleCreateFolderClick}
							>
								Create Folder
							</DesignSystemButton>
							<DesignSystemButton
								isPaidFeature={false}
								size='lg'
								hierarchy='primary'
								buttonStatus='enabled'
								// iconRight={AIIcon}
								// text='Create New'
								onClick={handleStartNewProject}
							>
								Create New
							</DesignSystemButton>
						</div>
					</div>
				</div>

				{/* placeholder for card/list layout */}
				{/* width: 69px;
					height: 36px;
					flex-shrink: 0; */}
				{/* select sorting key: last update time, created time or title */}
				{hasFolder && (
					<div
						className='w-full px-8 pt-8 flex flex-col grow overflow-auto'
					>
						<span className='font-creato-medium text-[#707C8A]'>Folders</span>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
							{folders.map((folder, index) => {
								if (folder.folderName !== 'drlambda-default') {
									return (
										<div
											key={'folderButton' + index}
											className='cursor-pointer hover:bg-gray-200 p-2 rounded-md border border-solid border-gray-200 bg-white'
											onDoubleClick={() => handleFolderDoubleClick(folder.folderName)}
										>
											<FolderButton
												folder={folder}
												handleDeleteFolder={handleDeleteFolder}
												handleRenameFolder={handleRenameFolder}
											/>
										</div>
									);
								}
								return null;
							})}
						</div>
					</div>
				)}

				{/* projects details area */}
				<div
					className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto'
					ref={contentRef}
				>
					<span className='font-creato-medium text-[#707C8A]'>Projects</span>
					{rendered ? (
						currentProjects && currentProjects.length > 0 ? (
							<ProjectTable
								currentProjects={currentProjects}
								setCurrentProjects={setProjects}
								onDelete={handleDelete}
								isDiscover={false}
							/>
						) : (
							<Blank text={`${activeFolder === "drlambda-default" ? "You haven't created any project yet." :
								`No projects found in ${activeFolder}.`
								}`} />
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


				{/* Create Folder modal */}
				<CreateFolderModal
					showCreateFolderModal={showCreateFolderModal}
					setShowCreateFolderModal={setShowCreateFolderModal}
					setFolders={setFolders}
				/>

				<Modal
					showModal={showDeleteFolderModal}
					setShowModal={setShowDeleteFolderModal}
					title='Delete Folder'
					description='Are you sure you want to delete this folder?'
					onConfirm={confirmDeleteFolder}
				/>

				<Modal
					showModal={showRenameFolderModal}
					setShowModal={setShowRenameFolderModal}
					title='Rename Folder'
					inputValue={renameInput}
					setInputValue={setRenameInput}
					hasInputArea={true}
					onConfirm={confirmRenameFolder}
				/>
			</div>
			{showSurvey && (
				<Modal showModal={showSurvey} setShowModal={handleCloseSurvey}>
					<OnboardingSurvey handleBack={handleCloseSurvey} />
				</Modal>
			)}
		</section>
	);
}
