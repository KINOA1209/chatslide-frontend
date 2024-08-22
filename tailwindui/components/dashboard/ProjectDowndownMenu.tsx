import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
	MdOutlineOpenInNew,
	MdOutlineDelete,
	MdOutlineShare,
} from 'react-icons/md';
import { CloneButton } from '@/components/button/CloneButton';
import ShareButton from '@/components/button/ShareButton';
import { RenameProjectButton } from './renameProjectButton';
import { MoveToTeamButton } from '@/components/dashboard/MoveToTeamButton';
import { MoveToFolderButton } from '@/components/dashboard/MoveToFolderButton';
import { ChangeProjectDescriptionButton } from './changeProjectDescriptionButton';
import Project from '@/models/Project';
import Folder from '@/models/Folder';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { useRouter } from 'next/navigation';
import { Menu } from '@/components/button/Menu';
import dynamic from 'next/dynamic';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
const ExportToPdfButton = dynamic(
	() => import('@/components/slides/ExportButton'), // Path to your ExportToPdfButton component
	{ ssr: false }, // Disable SSR
);

interface ProjectDropdownMenuProps {
	project: Project;
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
	folders?: Folder[];
	setFolders?: React.Dispatch<React.SetStateAction<Folder[]>>;
	onDelete?: (projectId: string) => void;
	isDiscover?: boolean;
	activeFolder?: string;
	setRefreshMenu: React.Dispatch<React.SetStateAction<boolean>>;
	exportSlidesRef?: React.RefObject<HTMLDivElement>;
	dropdownTrigger?: React.ReactNode;
}

const ProjectDropdownMenu: React.FC<ProjectDropdownMenuProps> = ({
	project,
	setCurrentProjects,
	folders,
	setFolders,
	onDelete,
	isDiscover = false,
	activeFolder,
	setRefreshMenu,
	exportSlidesRef = useRef<HTMLDivElement>(null),
	dropdownTrigger = null,
}) => {
	const [showCloneModal, setShowCloneModal] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const [showExportToPdfModal, setShowExportToPdfModal] = useState(false);
	const [showMoveToFolderModal, setShowMoveToFolderModal] = useState(false);
	const [showMoveToTeamModal, setShowMoveToTeamModal] = useState(false);
	const [showRenameProjectModal, setShowRenameProjectModal] = useState(false);
	const [
		showChangeProjectDescriptionModal,
		setShowChangeProjectDescriptionModal,
	] = useState(false);
	const [isShared, setIsShared] = useState(false);
	const router = useRouter();
	const { token } = useUser();

	return (
		<Menu button={dropdownTrigger}>
			<button className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'>
				<Link
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 'var(--spacing-lg, 12px)',
					}}
					href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}
				>
					<MdOutlineOpenInNew style={{ width: '16px', height: '16px' }} />
					Open
				</Link>
			</button>

			{project.id && setCurrentProjects && folders && setFolders && (
				<button
					className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
					onClick={() => setShowRenameProjectModal(true)}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 'var(--spacing-lg, 12px)',
					}}
				>
					<RenameProjectButton
						project={project}
						setCurrentProjects={setCurrentProjects}
						folders={folders}
						setFolders={setFolders}
						showRenameProjectModal={showRenameProjectModal}
						setShowRenameProjectModal={setShowRenameProjectModal}
					/>
					Rename
				</button>
			)}

			{project.id &&
				setCurrentProjects &&
				folders &&
				setFolders &&
				project.content_type === 'presentation' && (
					<button
						className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
						onClick={() => setShowChangeProjectDescriptionModal(true)}
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: 'var(--spacing-lg, 12px)',
						}}
					>
						<ChangeProjectDescriptionButton
							project={project}
							setCurrentProjects={setCurrentProjects}
							folders={folders}
							setFolders={setFolders}
							showChangeProjectDescriptionModal={
								showChangeProjectDescriptionModal
							}
							setShowChangeProjectDescriptionModal={
								setShowChangeProjectDescriptionModal
							}
						/>
						Change Description
					</button>
				)}

			{!isDiscover && setCurrentProjects && (
				<button
					className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
					onClick={() => setShowCloneModal(true)}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 'var(--spacing-lg, 12px)',
						borderBottom:
							'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
					}}
				>
					<CloneButton
						project={project}
						setCurrentProjects={setCurrentProjects}
						showCloneModal={showCloneModal}
						setShowCloneModal={setShowCloneModal}
					/>
					Duplicate
				</button>
			)}

			{!isDiscover && setCurrentProjects && !project.team_id && project.content_type !== "chart" && (
				<button
					className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
					onClick={() => setShowMoveToTeamModal(true)}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 'var(--spacing-lg, 12px)',
					}}
				>
					<MoveToTeamButton
						project={project}
						setCurrentProjects={setCurrentProjects}
						teamId={""}
						showMoveToTeamModal={showMoveToTeamModal}
						setShowMoveToTeamModal={setShowMoveToTeamModal}
						setRefreshMenu={setRefreshMenu}
					/>
					Move to team
				</button>
			)}

			{!isDiscover &&
				folders &&
				setFolders &&
				setCurrentProjects &&
				activeFolder && (
					<button
						className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
						onClick={() => setShowMoveToFolderModal(true)}
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: 'var(--spacing-lg, 12px)',
							borderBottom:
								'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
						}}
					>
						<MoveToFolderButton
							project={project}
							setCurrentProjects={setCurrentProjects}
							folders={folders}
							setFolders={setFolders}
							showMoveToFolderModal={showMoveToFolderModal}
							setShowMoveToFolderModal={setShowMoveToFolderModal}
							activeFolder={activeFolder}
						/>
						Move to folder
					</button>
				)}

			{project.thumbnail_url && project.content_type !== "chart" && (
				<button
					className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
					onClick={() => setShowShareModal(true)}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 'var(--spacing-lg, 12px)',
					}}
				>
					<ShareButton
						share={isShared}
						setShare={(share: boolean) => {
							setIsShared(share);
							const video_is_shared =
								project.video_url && project.video_url !== '' ? true : false;
							ProjectService.SlideShareLink(
								token,
								project.id,
								share,
								video_is_shared,
							);
						}}
						project={project}
						showShareModal={showShareModal}
						setShowShareModal={setShowShareModal}
						width='16px'
						height='16px'
					/>
					Share
				</button>
			)}

			{!isDiscover && setCurrentProjects && project.thumbnail_url && project.content_type !== "chart" && (
				<button
					className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
					onClick={() => {
						if (project.content_type === 'presentation')
							setShowExportToPdfModal(true);
						else router.push(`/project/${project.id}`);
					}}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 'var(--spacing-lg, 12px)',
						borderBottom:
							'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
					}}
				>
					<ExportToPdfButton
						exportSlidesRef={exportSlidesRef}
						setShowExportToPdfModal={setShowExportToPdfModal}
						showExportToPdfModal={showExportToPdfModal}
						width='16px'
						height='16px'
					/>
					Download
				</button>
			)}

			{!isDiscover && onDelete && (
				<button
					className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
					onClick={() => onDelete(project.id)}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 'var(--spacing-lg, 12px)',
						color: 'var(--colors-text-text-error-primary-600, #D92D20)',
					}}
				>
					<ButtonWithExplanation
						button={
							<button onClick={() => onDelete(project.id)}>
								<MdOutlineDelete
									style={{
										width: '16px',
										height: '16px',
										color: 'var(--colors-text-text-error-primary-600, #D92D20)',
									}}
								/>
							</button>
						}
						explanation={'Delete'}
					/>
					Delete
				</button>
			)}
		</Menu>
	);
};

export default ProjectDropdownMenu;
