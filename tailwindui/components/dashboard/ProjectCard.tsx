import React, { useRef } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/shadcnUI/card';
import Image from 'next/image';
import DesignSystemBadges from '@/components/ui/design_systems/Badges'; // Adjust the import path
import { PiSlideshow } from 'react-icons/pi';
import { MdOutlineShare, MdOndemandVideo } from 'react-icons/md';
import Project from '@/models/Project'; // Adjust the import path to your Project model
import ProjectTable, {
	formatDate,
	getThumbnailUrl,
} from '@/components/dashboard/ProjectTable';
import Folder from '@/models/Folder';
import ProjectDropdownMenu from './ProjectDowndownMenu';
import Link from 'next/link';

interface ProjectCardProps {
	project: Project;
	index: number;
	currentProjects: Project[];
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
	currentFolders?: Folder[];
	setCurrentFolders?: React.Dispatch<React.SetStateAction<Folder[]>>;
	onDelete?: (projectId: string) => void;
	isDiscover?: boolean;
	activeFolder?: string;
	onDrag?: (projectId: string) => void;
	setRefreshMenu: React.Dispatch<React.SetStateAction<boolean>>;
	exportSlidesRef?: React.RefObject<HTMLDivElement>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	index,
	currentProjects,
	setCurrentProjects,
	currentFolders,
	setCurrentFolders,
	onDelete,
	isDiscover = false,
	activeFolder,
	onDrag,
	setRefreshMenu,
	exportSlidesRef = useRef<HTMLDivElement>(null),
}) => {
	return (
		<Link href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}>
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
							color: 'var(--colors-text-text-secondary-700, #344054)',
						}}
					>
						{project.name}
					</div>
					<p>
						Edited{' '}
						{project.updated_datetime && formatDate(project.updated_datetime)}
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
						<ProjectDropdownMenu
							dropdownTrigger={null}
							project={project}
							setCurrentProjects={setCurrentProjects}
							folders={currentFolders}
							setFolders={setCurrentFolders}
							onDelete={onDelete}
							isDiscover={isDiscover}
							activeFolder={activeFolder}
							setRefreshMenu={setRefreshMenu}
							exportSlidesRef={exportSlidesRef}
						/>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default ProjectCard;
