'use client';

import React, { useState, useEffect, Fragment, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import ProjectTable from '../ProjectTable';
import DrlambdaButton, {
} from '@/components/button/DrlambdaButton';
import Project from '@/models/Project';
import ProjectService from '@/services/ProjectService';
import Modal from '@/components/ui/Modal';
import { UserStatus, useUser } from '@/hooks/use-user';
import OnboardingSurvey from '@/components/slides/onboardingSurvey/OnboardingSurvey';
import UserService from '@/services/UserService';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [deleteInd, setDeleteInd] = useState('');
  const router = useRouter();
  const promptRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState<boolean>(false);
  const { token, userStatus } = useUser();

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
    if (!token) return;  // sidebar will show a modal to ask user to login
    fetchProjects();
    const surveyFinished = await UserService.checkSurveyFinished(token)
    if (!surveyFinished) {
      setShowSurvey(true);
    } 
  }

  const closeSurvey = () => { 
    setShowSurvey(false);
    if (projects.length === 0) {
      router.push('/workflow-type-choice');
    }
  }

  const handleBackToChoices = () => {
    setShowSurvey(false)
    console.log('back to choices')
    // console.log('rendered', rendered)
    if (rendered && projects.length === 0) {
      router.push('/workflow-type-choice');
    }
  }

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
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
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
    setShowDeleteModal(false);
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
    router.push('/workflow-type-choice');
  };

  return (
    <section className='grow flex flex-col'>
      <ToastContainer />
      {/* top background container of my projects title text and button */}
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
          {rendered ? projects && projects.length > 0 ? (
            <ProjectTable
              currentProjects={currentProjects}
              setCurrentProjects={setProjects}
              onProjectClick={handleProjectClick}
              onDelete={handleDelete}
            />
          ) : (
            <div className='flex items-center mt-[1rem] md:mt-[6rem] justify-center text-gray-600 text-[14px] md:text-[20px] font-normal font-creato-medium leading-normal tracking-wide'>
              You haven't created any project yet.
            </div>
          ) : (
            <div className='flex items-center mt-[1rem] md:mt-[6rem] justify-center text-gray-600 text-[14px] md:text-[20px] font-normal font-creato-medium leading-normal tracking-wide'>
              Loading... ⏳
            </div>
          )}
        </div>

        {/* Delete modal */}
        <Modal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          title='Delete Project'
          description='Are you sure you want to delete this project?'
          onConfirm={confirmDelete} />
      </div>
      {showSurvey && (
        <Modal
          showModal={showSurvey}
          setShowModal={closeSurvey}
        // title='Welcome to DrLambda!'
        // description='We are excited to have you onboard. Please take a few minutes to complete the onboarding survey.'
        >
          <OnboardingSurvey handleBack={handleBackToChoices} />
        </Modal>
      )}
    </section>
  );
}
