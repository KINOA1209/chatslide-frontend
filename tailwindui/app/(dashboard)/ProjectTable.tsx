import React, { useState } from 'react';
import moment from 'moment';
import { DeleteIcon, SpinIcon } from '@/app/(feature)/icons';
import { ResourceItem } from '@/components/ui/ResourceItem';
import Project from '@/models/Project';
import { FaPhotoVideo, FaRegClone } from 'react-icons/fa';
import { RiSlideshow2Fill } from 'react-icons/ri';
import Image from 'next/image';
import { useUser } from '@/hooks/use-user';
import ProjectService from '@/services/ProjectService';

const DEFAULT_THUMBNAIL = 'https://ph-files.imgix.net/76b477f1-bc1b-4432-b52b-68674658d62b.png'

const ProjectItem: React.FC<{
  project: Project;
  onProjectClick: (projectId: string) => void;
  onDelete?: (e: React.MouseEvent<HTMLDivElement>, projectId: string) => void;
  onClone?: (index: number) => void;
  index: number;
}> = ({ project, onProjectClick, onDelete, onClone, index }) => {
  const isCloning = index === -1;

  return (
    <React.Fragment key={project.id}>
      {/* type */}
      <div
        className={`hidden md:flex col-span-1 p-2 items-center justify-center border-b-2 ${!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'} font-creato-medium leading-normal`}
        onClick={() => onProjectClick(project.id)}
      >
        <div className=''>
          {project.content_type === 'presentation' ? (
            <Image
              unoptimized={true}
              src={project.thumbnail_url || DEFAULT_THUMBNAIL}
              alt='project thumbnail'
              layout='responsive'
              width={16}
              height={9}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_THUMBNAIL;
              }}
            />
          ) : (
            <FaPhotoVideo className='text-gray-600 w-[40px] h-[40px]' />
          )}
        </div>
      </div>

      {/* topic */}
      <div
        className={`col-span-2 p-2 flex items-center border-b-2 ${!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'} font-creato-medium leading-normal`}
        onClick={() => onProjectClick(project.id)}
      >
        <div className='flex-wrap'>
          {project.name} {isCloning && '(Cloning...⏳)'}
        </div>
      </div>

      {/* resources */}
      <div className='col-span-2 p-[2rem] border-b-2 hidden md:flex items-center text-gray-600 text-[17px] font-normal font-creato-medium leading-normal tracking-wide'>
        <div className='flex flex-col items-start'>
          {/* <FileIcon fileType='pdf' /> */}
          {project.resources &&
            project.resources.map((resource, resourceIndex) => (
              <ResourceItem key={resourceIndex} {...resource} />
            ))}
        </div>
      </div>

      {/* create date */}
      <div className='col-span-1 p-2 border-b-2 flex'>
        <div className='h-full flex justify-between items-center w-full py-4 px-2 text-gray-600 text-[13px] font-normal font-creato-medium leading-normal tracking-[0.12rem]'>
          <span className='hidden md:flex'>
            {moment(project.created_datetime).format('L')}
          </span>

          {/* clonable if deletable, and not already a clone */}
          {onClone && onDelete && (
            <div className='cursor-pointer' onClick={() => onClone(index)}>
              <FaRegClone className='h-[16px] w-[16px]' />
            </div>
          )}

          {/* deletable if this is dashboard, not discover */}
          {onDelete && (
            <div
              className='cursor-pointer'
              onClick={(e) => onDelete(e, project.id)}
            >
              <DeleteIcon />
            </div>
          )}

          {/* loading spinner */}
          {isCloning && <SpinIcon />}
        </div>
      </div>
    </React.Fragment>
  );
};

interface Props {
  currentProjects: Project[];
  setCurrentProjects?: (projects: Project[]) => void;
  onProjectClick: (projectId: string) => void;
  onDelete?: (e: React.MouseEvent<HTMLDivElement>, projectId: string) => void;
}

const ProjectTable: React.FC<Props> = ({
  currentProjects,
  setCurrentProjects,
  onProjectClick,
  onDelete,
}) => {
  const [cloningProject, setCloningProject] = useState<Project>();
  const { token } = useUser();
  const [isCloning, setIsCloning] = useState(false);
  // const [targetLanguage, setTargetLanguage] = useState('en');
  // const [showModal, setShowModal] = useState(false);

  async function onClone(project: Project) {
    console.log(`cloning project ${project.id} to ${'English'}`);
    if (!project) return;
    setIsCloning(true);
    setCloningProject(project);
    try {
      const newProject = await ProjectService.clone(
        project.id,
        'English',
        token,
      );
      const newProjects = [...currentProjects];
      newProjects.splice(0, 0, newProject);
      setCurrentProjects && setCurrentProjects(newProjects);
    } catch (e) {
      console.error(e);
    }
    setCloningProject(undefined);
    setIsCloning(false);
  }

  return (
    <>
      {/* {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title='Clone Project'
          description='You can clone this project into another language:'
          onConfirm={onClone}
        >
          <div className='flex flex-col items-center justify-center'>
            <button
              onClick={() => setTargetLanguage('en')}
              className='bg-[#ECF1FE] border border-gray-200 p-2 m-2 rounded-md text-lg font-bold text-indigo-300'
            >
              English
            </button>
            <button
              onClick={() => setTargetLanguage('es')}
              className='bg-[#ECF1FE] border border-gray-200 p-2 m-2 rounded-md text-lg font-bold text-indigo-300'
            >
              Spanish
            </button>
          </div>
        </Modal>
      )} */}
      <div className='w-full lg:w-2/3 mx-auto'>
        <div className='grid bg-[#ECF1FE] border border-gray-200 grid-cols-3 md:grid-cols-6'>
          <div className='hidden md:flex col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
            Type
          </div>
          <div className='col-span-2 flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
            Topic
          </div>
          <div className='hidden md:flex col-span-2 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
            Resources
          </div>
          <div className='col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
            Date
          </div>
        </div>
        <div className='grid border bg-[white] border-gray-200 grid-cols-3 md:grid-cols-6'>
          {' '}
          {cloningProject && (
            <ProjectItem
              key={cloningProject.id + '_clone'}
              project={cloningProject}
              onProjectClick={() => { }}
              index={-1}
            />
          )}
          {currentProjects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              onProjectClick={onProjectClick}
              onDelete={onDelete}
              onClone={() => {
                onClone(project);
                setCloningProject(currentProjects[index]);

                // setShowModal(true)
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectTable;
