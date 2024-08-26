import React, { useState } from 'react';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
import Project from '@/models/Project';
import Folder from '@/models/Folder';
import TeamModal from './TeamModal';
import { useUser } from '@/hooks/use-user';
import useHydrated from '@/hooks/use-hydrated';
import { useTeam } from '@/hooks/use-team';

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
	const [showTeamManagement, setShowTeamManagement] = useState(false);
	const { username } = useUser();
  const { team } = useTeam();

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-row items-end w-full z-40  pt-4 px-4 sm:pt-8 sm:px-8'>
			<div className='w-full flex flex-wrap items-center justify-between gap-2'>
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
					{isTeamMode
						? (team?.name + `'s` || 'Team') + ' Projects'
						: activeFolder === 'drlambda-default'
							? username + `'s Projects`
							: username + `'s Projects > ${activeFolder}`}
				</div>

				<div className='ml-auto flex flex-row gap-2 justify-end'>
					{activeFolder === 'drlambda-default' &&
						projects.length > 0 &&
						!isTeamMode && (
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
								<span className='whitespace-nowrap'> Members </span>
							</DesignSystemButton>
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
