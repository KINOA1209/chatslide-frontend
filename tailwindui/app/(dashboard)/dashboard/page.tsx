'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import OnboardingSurvey from '@/components/slides/onboardingSurvey/OnboardingSurvey';
import SessionStorage from '@/utils/SessionStorage';
import { useUser, UserStatus } from '@/hooks/use-user';
import ProjectService from '@/services/ProjectService';
import TeamService from '@/services/TeamService';
import { groupProjectsByFolder } from '@/components/dashboard/folder_helper';
import FolderList from '@/components/dashboard/FolderList';
import ProjectSection from '@/components/dashboard/ProjectSection';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CreateFolderModal from '@/components/dashboard/createFolderModal';
import Project from '@/models/Project';
import Folder from '@/models/Folder';
import UserService from '@/services/UserService';
import { useTeam } from '@/hooks/use-team';
import { isChatslide } from '@/utils/getHost';
import { getUserCountryCode } from '@/utils/userLocation';

export default function Dashboard() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [deleteInd, setDeleteInd] = useState('');
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
  const router = useRouter();
  const [NoTeam, setNoTeam] = useState(false);
  const [currentTeam, setCurrentTeam] = useState('');
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const isTeamMode = mode === 'team';
  const { teamId, team} = useTeam();


  useEffect(() => {
    if (userStatus != UserStatus.Inited) return;
    init();
  }, [userStatus]);

  useEffect(() => {
    const currentFolder = folders.find((folder) => folder.folderName === activeFolder);
    if (currentFolder) {
      setCurrentProjects(currentFolder.projects);
    }
  }, [activeFolder, folders]);

  useEffect(() => {
    const hasNonDefaultFolder = folders.some(folder => folder.folderName !== 'drlambda-default');
    setHasFolder(hasNonDefaultFolder);
  }, [folders]);

  useEffect(() => {
		const submitPartialSurvey = async () => {
			const platform = isChatslide() ? 'chatslide' : 'drlambda';

			try {
				// Get the user's country code
				const code = await getUserCountryCode();

				// Prepare the formData object with the resolved location
				const formData = {
					platform: platform,
					location: code,
				};

				// Send the data to the server
				await fetch('/api/user/save_survey', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ OnboardingSurvey: formData }),
				});
			} catch (error) {
				console.error('Failed to submit partial survey:', error);
			}
		};

		submitPartialSurvey(); // Call the async function to submit the survey
	}, [token]);

  const fetchProjects = async () => {
    try {
      const currentTeam = SessionStorage.getItem('currentTeam') || '';
      console.log('current team', currentTeam);
      const response = isTeamMode && !NoTeam
        ? await TeamService.getTeamProjects(currentTeam, token)
        : await ProjectService.getProjects(token, false, false, true);
      
      console.log('response', response);
      if (Array.isArray(response)) {
        setProjects(response);
      } else {
        setProjects(response.projects);
        setFolders(groupProjectsByFolder(response.projects, response.empty_groups));
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
          return { ...proj, project_group_name: folder.folderName };
        }
        return proj;
      });
      setProjects(updatedProjects);
      const updatedFolders = folders.map((f) => {
        if (f.folderName === folder.folderName) {
          return { ...f, projects: [...f.projects, project] };
        }
        if (f.folderName === activeFolder) {
          return {
            ...f,
            projects: f.projects.filter((proj) => proj.id !== draggingProjectId),
          };
        }
        return f;
      });
      setFolders(updatedFolders);
      if (isTeamMode) {
        TeamService.moveProjectToFolder(currentTeam, draggingProjectId, token);
      } else {
        ProjectService.moveToFolder(token, draggingProjectId, folder.folderName);
      }
    }
  };

  const init = async () => {
    if (!token) return;
    const promo = SessionStorage.getItem('promo');
    if (promo) {
      const { status, message } = await UserService.applyPromoCode(promo, token);
      if (status == 200) {
        toast.success('Your code is successfully applied!', { position: 'top-center', autoClose: 2000, theme: 'light' });
        SessionStorage.removeItem('promo');
        updateCreditsAndTier();
      }
    }
    if (isTeamMode) {
      if (!teamId) {
        setNoTeam(true);
        router.push('/team');
      } else {
        sessionStorage.setItem('currentTeam', teamId);
      }
    } else {
      sessionStorage.removeItem('currentTeam');
    }
    fetchProjects();
    const surveyFinished = await UserService.checkSurveyFinished(token);
    if (!surveyFinished) {
      setShowSurvey(true);
    } else if (rendered && projects.length === 0 && !isTeamMode) {
			router.push('/type-choice');
		}
  };

  const handleCloseSurvey = () => {
    setShowSurvey(false);
    if (rendered && projects.length === 0 && !isTeamMode) {
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
      await ProjectService.deleteProject(token, deleteInd);
      const updatedProjects = projects.filter(proj => proj.id !== deleteInd);
      setProjects(updatedProjects);
      const updatedFolders = folders.map(folder => ({
        ...folder,
        projects: folder.projects.filter(proj => proj.id !== deleteInd),
      }));
      setFolders(updatedFolders);
    } catch (error: any) {
      toast.error(error.message, { position: 'top-center', autoClose: 5000, theme: 'light' });
    }
    setShowDeleteModal(false);
    setDeleteInd('');
  };

  const handleStartNewProject = () => {
    console.log('currentTeam', SessionStorage.getItem('currentTeam'));
    router.push('/type-choice');
  };

  const handleCreateFolderClick = () => {
    setShowCreateFolderModal(true);
  };

  const handleFolderDoubleClick = (folderName: string) => {
    setActiveFolder(folderName);
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
      if (isTeamMode) {
        await TeamService.deleteFolder(currentTeam, 'project', deleteFolderName, token);
      } else {
        await ProjectService.deleteFolder(token, deleteFolderName);
      }
      setFolders(folders.filter((folder) => folder.folderName !== deleteFolderName));
    } catch (error: any) {
      toast.error(error.message, { position: 'top-center', autoClose: 5000, theme: 'light' });
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
      toast.error('Folder name cannot be empty.', { position: 'top-center', autoClose: 5000 });
      return;
    }
    try {
      if (isTeamMode) {
        await TeamService.renameFolder(currentTeam, 'project', prevFolderName, renameInput, token);
      } else {
        await ProjectService.renameFolder(token, prevFolderName, renameInput);
      }
      setFolders((prevFolders) => {
        const updatedFolders = prevFolders.map((folder) =>
          folder.folderName === prevFolderName ? { ...folder, folderName: renameInput } : folder,
        );
        return updatedFolders.sort((a, b) => a.folderName.localeCompare(b.folderName));
      });
    } catch (error: any) {
      toast.error(error.message, { position: 'top-center', autoClose: 5000, theme: 'light' });
    }
    setShowRenameFolderModal(false);
    setRenameInput('');
    setPrevFolderName('');
  };

  const handleBackToDefaultFolder = () => {
    setActiveFolder('drlambda-default');
  };

  return (
    <section className='grow flex flex-col'>
      <ToastContainer />
      <div className='grow flex flex-col'>
        <DashboardHeader
          activeFolder={activeFolder}
          projects={projects}
          handleCreateFolderClick={handleCreateFolderClick}
          handleStartNewProject={handleStartNewProject}
          handleBackToDefaultFolder={handleBackToDefaultFolder}
          moveProjectToFolder={moveProjectToFolder}
          isTeamMode={isTeamMode} 
          teamId={currentTeam}
        />
        {hasFolder && !isTeamMode && (
          <FolderList
            folders={folders}
            activeFolder={activeFolder}
            handleFolderDoubleClick={handleFolderDoubleClick}
            handleDeleteFolder={handleDeleteFolder}
            handleRenameFolder={handleRenameFolder}
            moveProjectToFolder={moveProjectToFolder}
          />
        )}
        <ProjectSection
          rendered={rendered}
          currentProjects={currentProjects}
          folders={folders}
          setProjects={setProjects}
          setFolders={setFolders}
          activeFolder={activeFolder}
          handleDelete={handleDelete}
          setDraggingProjectId={setDraggingProjectId}
        />
        <Modal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          title='Delete Project'
          description='Are you sure you want to delete this project?'
          onConfirm={confirmDelete}
        />
        <CreateFolderModal
          showCreateFolderModal={showCreateFolderModal}
          setShowCreateFolderModal={setShowCreateFolderModal}
          setFolders={setFolders}
          isTeamMode={isTeamMode}
          teamId={currentTeam}
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
