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
								gap-4 
								small:grid-cols-2 
								medium:grid-cols-3 
								large:grid-cols-4 
								xlarge:grid-cols-5'
						>
							{currentProjects.map((project, index) => (
								<ProjectDropdownMenu
									dropdownTrigger={
										<Card key={index} className='cursor-pointer'>
											<CardContent className='p-0'>
												<div
													className='flex items-center justify-center w-full'
													style={{
														objectFit: 'contain' as 'contain',
													}}
												>
													<Image
														className=''
														unoptimized={true}
														src={getThumbnailUrl(project)}
														alt={project.name + ' project thumbnail'}
														layout='responsive'
														width={72}
														height={40}
														style={{ width: '72px', height: '40px' }}
													/>
												</div>
												<div
													className='flex-wrap'
													style={{
														fontSize: '14px',
														color:
															'var(--colors-text-text-secondary-700, #344054)',
													}}
												>
													{project.name}
												</div>
												<p>
													Edited{' '}
													{project.updated_datetime &&
														formatDate(project.updated_datetime)}
												</p>
												<div className='flex flex-row gap-[4px]'>
													{project.content_type === 'presentation' ? (
														<DesignSystemBadges
															size='sm'
															text=''
															iconLeading={PiSlideshow}
															bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #EFF4FF)'
															borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #C7D7FE)'
															borderRadius='6px'
															textColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
															iconColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
														/>
													) : (
														<DesignSystemBadges
															size='sm'
															text=''
															iconLeading={MdOutlineShare}
															bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #F4F3FF)'
															borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #D9D6FE)'
															borderRadius='6px'
															textColor='var(--Component-colors-Utility-Purple-utility-purple-700, #5925DC)'
															iconColor='var(--Component-colors-Utility-Purple-utility-purple-700, #5925DC)'
														/>
													)}
													{project.video_url ? (
														<DesignSystemBadges
															size='sm'
															text=''
															iconLeading={MdOndemandVideo}
															bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #EFF4FF)'
															borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #C7D7FE)'
															borderRadius='6px'
															textColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
															iconColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
														/>
													) : null}
												</div>
											</CardContent>
										</Card>
									}
									project={project}
									setCurrentProjects={setProjects}
									folders={folders}
									setFolders={setFolders}
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
