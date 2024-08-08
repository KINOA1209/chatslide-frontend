import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ProjectTable, {
	formatDate,
	getThumbnailUrl,
} from '@/components/dashboard/ProjectTable';
import Image from 'next/image';
import { Title } from '@/components/ui/Text';
import { Blank, Loading } from '@/components/ui/Loading';
import Project from '@/models/Project';
import Folder from '@/models/Folder';
import { Dispatch, SetStateAction } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/shadcnUI/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/shadcnUI/dropdown-menu';
import DesignSystemBadges from '../ui/design_systems/Badges';
import { PiSlideshow } from 'react-icons/pi';
import {
	MdDriveFileRenameOutline,
	MdGroup,
	MdOndemandVideo,
	MdOutlineContentCopy,
	MdOutlineDelete,
	MdOutlineOpenInNew,
	MdOutlineShare,
} from 'react-icons/md';
import { FiFolderPlus } from 'react-icons/fi';
import { useTeam } from '@/hooks/use-team';
import dynamic from 'next/dynamic';
import ShareButton from '../button/ShareButton';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
import ProjectDropdownMenu from './ProjectDowndownMenu';
import ProjectCard from './ProjectCard';
const ExportToPdfButton = dynamic(
	() => import('@/components/slides/ExportButton'), // Path to your ExportToPdfButton component
	{ ssr: false }, // Disable SSR
);
interface ProjectSectionProps {
	rendered: boolean;
	currentProjects: Project[];
	folders: Folder[];
	setProjects: Dispatch<SetStateAction<Project[]>>;
	setFolders: Dispatch<SetStateAction<Folder[]>>;
	activeFolder: string;
	handleDelete: (projectId: string) => void;
	setDraggingProjectId: (id: string) => void;
	isTableView?: boolean;
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
	isTableView = true,
}) => {
	const { teamId } = useTeam();
	const exportSlidesRef = useRef<HTMLDivElement>(null);
	const [showExportToPdfModal, setShowExportToPdfModal] = useState(false);
	const [showMoveToFolderModal, setShowMoveToFolderModal] = useState(false);
	const [isShared, setIsShared] = React.useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const { token } = useUser();
	const [refreshMenu, setRefreshMenu] = useState(false);

	return (
		<div className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto'>
			<Title center={false}>📑 Projects</Title>
			{rendered ? (
				currentProjects && currentProjects.length > 0 ? (
					!isTableView ? (
						// cardview
						<div
							className='
								grid 
								grid-cols-2 
								gap-[24px] 
								small:grid-cols-2 
								medium:grid-cols-3 
								large:grid-cols-4 
								xlarge:grid-cols-5'
						>
							{currentProjects.map((project, index) => (
								// <ProjectDropdownMenu
								// 	dropdownTrigger={
								// 		<ProjectCard key={index} project={project} index={index} />
								// 	}
								// 	project={project}
								// 	setCurrentProjects={setProjects}
								// 	folders={folders}
								// 	setFolders={setFolders}
								// 	onDelete={handleDelete}
								// 	isDiscover={false}
								// 	activeFolder={activeFolder}
								// 	setRefreshMenu={setRefreshMenu}
								// 	exportSlidesRef={exportSlidesRef}
								// />

								<ProjectCard
									key={index}
									index={index}
									project={project}
									currentProjects={currentProjects}
									setCurrentProjects={setProjects}
									currentFolders={folders}
									setCurrentFolders={setFolders}
									onDelete={handleDelete}
									isDiscover={false}
									activeFolder={activeFolder}
									setRefreshMenu={setRefreshMenu}
									exportSlidesRef={exportSlidesRef}
								/>
							))}
						</div>
					) : (
						// list view
						<ProjectTable
							currentProjects={currentProjects}
							setCurrentProjects={setProjects}
							currentFolders={folders}
							setCurrentFolders={setFolders}
							onDelete={handleDelete}
							isDiscover={false}
							activeFolder={activeFolder}
							onDrag={setDraggingProjectId}
							refreshMenu={refreshMenu}
							setRefreshMenu={setRefreshMenu}
						/>
					)
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
