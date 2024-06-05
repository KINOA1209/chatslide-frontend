import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
import Project from '@/models/Project';
import Folder from '@/models/Folder';
import TeamService from '@/services/TeamService';
import TeamModal from './TeamModal';
import { useUser } from '@/hooks/use-user';

interface DashboardHeaderProps {
  activeFolder: string;
  projects: Project[];
  handleCreateFolderClick: () => void;
  handleStartNewProject: () => void;
  handleBackToDefaultFolder: () => void;
  moveProjectToFolder: (folder: Folder) => void;
  isTeamMode: boolean;
  teamId: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeFolder,
  projects,
  handleCreateFolderClick,
  handleStartNewProject,
  handleBackToDefaultFolder,
  moveProjectToFolder,
  isTeamMode,
  teamId
}) => {

  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [showTeamManagement, setShowTeamManagement] = useState(false);
  const [error, setError] = useState('');
  const { token } = useUser();

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
              folderId: 'default-id',
            });
          }}
        >
          {isTeamMode 
            ? 'Team Projects'
            : activeFolder === 'drlambda-default'
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

          {isTeamMode && (
            <>
              <DesignSystemButton
                isPaidFeature={false}
                size='lg'
                hierarchy='secondary'
                buttonStatus='enabled'
                onClick={() => setShowTeamManagement(true)}
              >
                <span className='whitespace-nowrap'>Invite Members</span>
              </DesignSystemButton>
              {inviteCode && (
                <div className='text-[16px] font-medium leading-[24px] tracking-wide'>
                  Invite Code: {inviteCode}
                </div>
              )}
              {error && (
                <div className='text-[16px] font-medium leading-[24px] tracking-wide text-red-500'>
                  Error: {error}
                </div>
              )}
            </>
          )}

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
      {showTeamManagement && (
        <TeamModal
          showModal={showTeamManagement}
          setShowModal={setShowTeamManagement}
          teamId={teamId}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
