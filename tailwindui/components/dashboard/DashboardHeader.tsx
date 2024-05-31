import React from 'react';
import { useRouter } from 'next/navigation';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
import Project from '@/models/Project';
import Folder from '@/models/Folder';

interface DashboardHeaderProps {
  activeFolder: string;
  projects: Project[];
  handleCreateFolderClick: () => void;
  handleStartNewProject: () => void;
  handleBackToDefaultFolder: () => void;
  moveProjectToFolder: (folder: Folder) => void;
  isTeamMode: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeFolder,
  projects,
  handleCreateFolderClick,
  handleStartNewProject,
  handleBackToDefaultFolder,
  moveProjectToFolder,
  isTeamMode,
}) => {
  const router = useRouter();

  return (
    <div className='flex flex-row items-end w-full z-10 pt-[2rem] px-[2rem]'>
      <div className='w-full flex flex-wrap items-center justify-between'>
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

        <div className='flex flex-row gap-2'>
          {activeFolder === 'drlambda-default' && projects.length > 0 && (
            <DesignSystemButton
              isPaidFeature={false}
              size='lg'
              hierarchy='secondary'
              buttonStatus='enabled'
              onClick={handleCreateFolderClick}
            >
              <span className='whitespace-nowrap'>Create Folder</span>
            </DesignSystemButton>
          )}
            <div>
            {isTeamMode && (
                <DesignSystemButton
                isPaidFeature={false}
                size="lg"
                hierarchy="secondary"
                buttonStatus="enabled"
                onClick={() => router.push('/discover')}
                >
                <span className="whitespace-nowrap">Discover</span>
                </DesignSystemButton>
            )}
            </div>

          <DesignSystemButton
            isPaidFeature={false}
            size='lg'
            hierarchy='primary'
            buttonStatus='enabled'
            onClick={handleStartNewProject}
          >
            <span className='whitespace-nowrap'>Start New Project</span>
          </DesignSystemButton>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
