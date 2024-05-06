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
import { BigTitle, Instruction, Title } from '@/components/ui/Text';
import CreateFolderModal from '@/components/dashboard/createFolderModal';
import { groupProjectsByFolder } from '@/components/dashboard/folder_helper';
import Folder from '@/models/Folder';
import FolderButton from '@/components/dashboard/FolderButton';
import { FolderItem } from '@/components/dashboard/FolderItem';

export default function Dashboard() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [folders, setFolders] = useState<Folder[]>([]);
	const [deleteInd, setDeleteInd] = useState('');
	const router = useRouter();
	const [rendered, setRendered] = useState<boolean>(false);
	const { token, userStatus, updateCreditsAndTier } = useUser();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSurvey, setShowSurvey] = useState(false);
	const [hasFolder, setHasFolder] = useState(false);
	const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
	const [activeFolder, setActiveFolder] = useState('drlambda-default');
	const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
	const [showDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
	const [deleteFolderName, setDeleteFolderName] = useState('');
	const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
	const [renameInput, setRenameInput] = useState('');
	const [prevFolderName, setPrevFolderName] = useState('');
	const [draggingProjectId, setDraggingProjectId] = useState<string>('');

	useEffect(() => {
		if (userStatus != UserStatus.Inited) return;
		init();
	}, [userStatus]);

	useEffect(() => {
		const currentFolder = folders.find(
			(folder) => folder.folderName === activeFolder,
		);
		if (currentFolder) {
			setCurrentProjects(currentFolder.projects);
		}
	}, [activeFolder, folders]);

	// useEffect(() => {
	// 	// Example: log when projects change
	// 	console.log('Projects updated:', projects);
	// }, [projects]);

	// useEffect(() => {
	// 	// Handle logic when folders change
	// 	console.log('Folders updated:', folders);
	// }, [folders]);

	useEffect(() => {
		//folder drlambda-default is not shown
		if (folders.length > 1) {
			setHasFolder(true);
		} else {
			setHasFolder(false);
		}
	}, [folders]);

	const fetchProjects = async () => {
		try {
			// ProjectService.getProjects(token, false, false, true).then((projects) => {
			// 	console.log('projects', projects);
			// 	console.log(groupProjectsByFolder(projects))
			// 	setProjects(projects);
			// 	setRendered(true);
			// });
			const response = await ProjectService.getProjects(
				token,
				false,
				false,
				true,
			);

			// response is data.projects
			if (Array.isArray(response)) {
				console.log('Projects only:', response);
				setProjects(response);
			} else {
				console.log('Projects and Folders:', response);
				setProjects(response.projects);
				//console.log(projects)
				setFolders(
					groupProjectsByFolder(response.projects, response.empty_groups),
				);
				console.log(
					groupProjectsByFolder(response.projects, response.empty_groups),
				);
				setCurrentProjects(response.projects);
			}
			setRendered(true);
		} catch (error: any) {
			console.error(error);
		}
	};

	const moveProjectToFolder = (folder: Folder) => {
		const project = projects.find((proj) => proj.id === draggingProjectId);
		if (project) {
			const updatedProjects = projects.map((proj) => {
				if (proj.id === draggingProjectId) {
					return {
						...proj,
						project_group_name: folder.folderName,
					};
				}
				return proj;
			});
			setProjects(updatedProjects);
			const updatedFolders = folders.map((f) => {
				if (f.folderName === folder.folderName) {
					return {
						...f,
						projects: [...f.projects, project],
					};
				}
				if (f.folderName === activeFolder) {
					return {
						...f,
						projects: f.projects.filter(
							(proj) => proj.id !== draggingProjectId,
						),
					};
				}
				return f;
			});
			setFolders(updatedFolders);
			ProjectService.moveToFolder(token, draggingProjectId, folder.folderName);
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

	const handleCreateFolderClick = () => {
		setShowCreateFolderModal(true);
	};

	const handleFolderDoubleClick = (folderName: string) => {
		console.log('Entering folder:', folderName);
		setActiveFolder(folderName);
		// const filteredProjects = projects.filter(project => project.project_group_name === folderName);
		// setCurrentProjects(filteredProjects)
		//console.log(currentProjects)
	};

	const handleDeleteFolder = (folderName: string) => {
		setDeleteFolderName(folderName);
		setShowDeleteFolderModal(true);
	};

	const confirmDeleteFolder = async () => {
		if (deleteFolderName === '') {
			throw 'Error';
		}
		try {
			const response = await ProjectService.deleteFolder(
				token,
				deleteFolderName,
			);

			setFolders(
				folders.filter((folder) => folder.folderName !== deleteFolderName),
			);
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
		setPrevFolderName(folderName);
		setRenameInput(folderName);
		setShowRenameFolderModal(true);
	};

	const confirmRenameFolder = async () => {
		if (renameInput === '') {
			toast.error('Folder name cannot be empty.', {
				position: 'top-center',
				autoClose: 5000,
			});
			return;
		}
		try {
			const response = await ProjectService.renameFolder(
				token,
				prevFolderName,
				renameInput,
			);

			setFolders((prevFolders) =>
				prevFolders.map((folder) =>
					folder.folderName === prevFolderName
						? { ...folder, folderName: renameInput }
						: folder,
				),
			);
			setFolders((prevFolders) => {
				// Map through folders to find and update the renamed folder
				const updatedFolders = prevFolders.map((folder) =>
					folder.folderName === prevFolderName
						? { ...folder, folderName: renameInput }
						: folder,
				);
				return updatedFolders.sort((a, b) =>
					a.folderName.localeCompare(b.folderName),
				);
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

	const handleBackToDefaultFolder = () => {
		console.log('Back to default page');
		setActiveFolder('drlambda-default');
		// const filteredProjects = projects.filter(project => project.project_group_name === null);
		// setCurrentProjects(filteredProjects)
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
						<div
							className='text-[24px] font-bold leading-[32px] tracking-wide cursor-pointer'
							style={{
								color: 'var(--colors-text-text-secondary-700, #344054)',
							}}
							onClick={handleBackToDefaultFolder}
							onDragOver={(e) => e.preventDefault()}
							onDrop={(e) => {
								e.preventDefault();
								moveProjectToFolder({
									folderName: 'drlambda-default',
									projects: [],
								});
							}}
						>
							{activeFolder === 'drlambda-default'
								? 'My Projects'
								: `My Projects > ${activeFolder}`}
						</div>

						{/* create new project button */}
						<div className='flex flex-row gap-2'>
							{activeFolder === 'drlambda-default' && (
								<DesignSystemButton
									isPaidFeature={false}
									size='lg'
									hierarchy='secondary'
									buttonStatus='enabled'
									onClick={handleCreateFolderClick}
								>
									Create Folder
								</DesignSystemButton>
							)}
							<DesignSystemButton
								isPaidFeature={false}
								size='lg'
								hierarchy='primary'
								buttonStatus='enabled'
								// iconRight={AIIcon}
								// text='Create New'
								onClick={handleStartNewProject}
							>
								Start New Project
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
					<div className='w-full px-8 pt-8 flex flex-col mb-5'>
						<Title center={false}>📂 Folders</Title>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
							{activeFolder !== 'drlambda-default' ? (
								<FolderItem
                  folder={{
                    folderName: 'drlambda-default',
                    projects: [],
                  }}
                  handleFolderDoubleClick={handleFolderDoubleClick}
                  handleDeleteFolder={handleDeleteFolder}
                  handleRenameFolder={handleRenameFolder}
                  moveProjectToFolder={moveProjectToFolder}
                  index={0}
                />
							) : (
								folders
									.filter((folder) => folder.folderName !== 'drlambda-default')
									.map((folder, index) => {
										return (
											<FolderItem
												key={index}
												folder={folder}
												handleFolderDoubleClick={handleFolderDoubleClick}
												handleDeleteFolder={handleDeleteFolder}
												handleRenameFolder={handleRenameFolder}
												moveProjectToFolder={moveProjectToFolder}
												index={index}
											/>
										);
									})
							)}
						</div>
					</div>
				)}

				{/* projects details area */}
				<div className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto'>
					<Title center={false}>📑 Projects</Title>
					{rendered ? (
						currentProjects && currentProjects.length > 0 ? (
							<ProjectTable
								currentProjects={currentProjects}
								setCurrentProjects={setProjects}
								currentFolders={folders}
								setCurrentFolders={setFolders}
								onDelete={handleDelete}
								isDiscover={false}
								activeFolder={activeFolder}
								onDrag={setDraggingProjectId}
							/>
						) : (
							<Blank
								text={`${
									activeFolder === 'drlambda-default'
										? "You haven't created any project yet."
										: `No projects found in ${activeFolder}.`
								}`}
							/>
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
					description='Are you sure you want to delete this folder? The projects in the folder will be moved to the default folder.'
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
					maxInputLength={100}
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
