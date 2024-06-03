import React from 'react';
import ProjectTable from '@/components/dashboard/ProjectTable';
import { Title } from '@/components/ui/Text';
import { Blank, Loading } from '@/components/ui/Loading';
import Project from '@/models/Project';
import Folder from '@/models/Folder';
import { Dispatch, SetStateAction } from 'react';

interface ProjectSectionProps {
  rendered: boolean;
  currentProjects: Project[];
  folders: Folder[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  setFolders: Dispatch<SetStateAction<Folder[]>>;
  activeFolder: string;
  handleDelete: (projectId: string) => void;
  setDraggingProjectId: (id: string) => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  rendered,
  currentProjects,
  folders,
  setProjects,
  setFolders,
  activeFolder,
  handleDelete,
  setDraggingProjectId,
}) => {
  return (
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
  );
};

export default ProjectSection;
