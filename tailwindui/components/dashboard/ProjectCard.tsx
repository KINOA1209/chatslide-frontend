import React, { useRef, useState } from 'react';
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
import { MdOutlineShare, MdOndemandVideo, MdOutlineInsertChartOutlined } from 'react-icons/md';
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
	const [loaded, setLoaded] = useState(false);
	const url = project.content_type !== "chart" ? `/${isDiscover ? 'shared' : 'project'}/${project.id}` : `/charts/${project.id}`;
	return (
		// <Link href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}>
		<Card
			key={index}
			className='cursor-pointer h-full flex flex-col justify-between'
		>
			<CardContent className='p-0 flex flex-col h-full justify-between'>
				{/* project image */}
				<Link href={url}>
					<div
						className='flex items-center justify-center w-full'
						style={{
							objectFit: 'contain' as 'contain',
						}}
					>
						{!loaded && <Image
							className='w-[72px] h-[40px]'
							unoptimized={true}
							src={getThumbnailUrl(null)}
							alt={project.name + ' project thumbnail'}
							layout='responsive'
							width={72}
							height={40}
						/>}
						<Image
							className='w-[72px] h-[40px]'
							unoptimized={true}
							src={getThumbnailUrl(project)}
							alt={project.name + ' project thumbnail'}
							layout='responsive'
							width={72}
							height={40}
							style={loaded ? {} : { display: 'none' }}
							onLoad={() => setLoaded(true)}
							loading='eager'
						/>
					</div>
				</Link>

				{/* project information other than image */}
				<div
					style={{ padding: 'var(--spacing-lg, 12px)' }}
					className='projectInfo'
				>
					{/* project title name */}
					<Link href={url}>
						<div
							className='flex-wrap'
							style={{
								fontSize: '14px',
								color: 'var(--colors-text-text-secondary-700, #344054)',
								fontFamily: 'Creato Display Medium',
								fontWeight: 'normal',
								lineHeight: '20px',
							}}
						>
							{project.name}
						</div>
					</Link>

					{/* row: edited time, badge and dropdown menu icon */}
					<div className='flex flex-row justify-between items-center'>
						<span
							style={{
								fontSize: '12px',
								color: 'var(--colors-text-text-quaternary-500, #667085)',
								fontFamily: 'Creato Display Regular',
								fontWeight: 'normal',
								lineHeight: '18px',
							}}
						>
							Edited{' '}
							{project.updated_datetime && formatDate(project.updated_datetime)}
						</span>

						{/* flex row: badge and menu icon */}
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
							) : project.content_type === 'social_posts' ? (
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
							) :
								<DesignSystemBadges
									size='sm'
									text=''
									iconLeading={MdOutlineInsertChartOutlined}
									bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #FEF2FF)'
									borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #FCC7F8)'
									borderRadius='6px'
									textColor='var(--Component-colors-Utility-Purple-utility-purple-700, #B01C99)'
									iconColor='var(--Component-colors-Utility-Purple-utility-purple-700, #B01C99)'
								/>
							}
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
					</div>
				</div>
			</CardContent>
		</Card>
		// </Link>
	);
};

export default ProjectCard;
