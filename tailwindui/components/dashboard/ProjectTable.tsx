'use client';

import React, { use, useEffect, useRef, useState } from 'react';
import { ResourceItem } from '@/components/ui/ResourceItem';
import Project from '@/models/Project';
import Image from 'next/image';
import Link from 'next/link';
import DesignSystemBadges from '@/components/ui/design_systems/Badges';
import { PiSlideshow } from 'react-icons/pi';
import { MdOndemandVideo, MdOutlineInsertChartOutlined } from 'react-icons/md';
import { MdOutlineShare } from 'react-icons/md';
import '@/components/ui/design_systems/variables.css';
import dynamic from 'next/dynamic';
import defaultDrLambdaThumbnail from '@/public/images/ogimage_drlambda.png';
import defaultChatSlideThumbnail from '@/public/images/ogimage_chatslide.png';
import causalTopicThumbnail from '@/public/images/socialpost/casual_topic_thumbnail_classic.png';
import readingNotesThumbnail from '@/public/images/socialpost/reading_notes_thumbnail_classic.png';
import seriousSubjectThumbnail from '@/public/images/socialpost/serious_subject_thumbnail_classic.png';
import { isChatslide } from '@/utils/getHost';
import { FaEye } from 'react-icons/fa';
import Folder from '@/models/Folder';
import ProjectDropdownMenu from './ProjectDowndownMenu';

const ExportToPdfButton = dynamic(
	() => import('@/components/slides/ExportButton'), // Path to your ExportToPdfButton component
	{ ssr: false }, // Disable SSR
);

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const currentDate = new Date();

	// Calculate the time difference in milliseconds
	const timeDiff = currentDate.getTime() - date.getTime();

	// Calculate the time difference in seconds, minutes, hours, days, months, or years
	const secondsDiff = Math.floor(timeDiff / 1000);
	const minutesDiff = Math.floor(secondsDiff / 60);
	const hoursDiff = Math.floor(minutesDiff / 60);
	const daysDiff = Math.floor(hoursDiff / 24);
	const monthsDiff = Math.floor(daysDiff / 30);
	const yearsDiff = Math.floor(monthsDiff / 12);

	// Determine the appropriate time unit and format the result
	if (minutesDiff < 60) {
		return `${minutesDiff} min${minutesDiff === 1 ? '' : 's'} ago`;
	} else if (hoursDiff < 24) {
		return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`;
	} else if (daysDiff < 30) {
		return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`;
	} else if (monthsDiff < 12) {
		return `${monthsDiff} month${monthsDiff === 1 ? '' : 's'} ago`;
	} else {
		return `${yearsDiff} year${yearsDiff === 1 ? '' : 's'} ago`;
	}
}

export function getThumbnailUrl(project: Project | null) {
	if (!project)
		return isChatslide() ? defaultChatSlideThumbnail : defaultDrLambdaThumbnail;
	if (
		project.content_type === 'presentation' ||
		project.content_type === 'ppt2video'
	) {
		return (
			project.thumbnail_url ||
			(isChatslide() ? defaultChatSlideThumbnail : defaultDrLambdaThumbnail)
		);
	} else if (project.content_type === 'chart') {
		return (
			project.thumbnail_url ||
			(isChatslide() ? defaultChatSlideThumbnail : defaultDrLambdaThumbnail)
		);
	} else if (project.post_type === 'casual_topic') {
		return causalTopicThumbnail;
	} else if (project.post_type === 'reading_notes') {
		return readingNotesThumbnail;
	} else if (project.post_type === 'serious_subject') {
		return seriousSubjectThumbnail;
	} else return causalTopicThumbnail;
}

const ProjectItem: React.FC<{
	project: Project;
	onDelete?: (projectId: string) => void;
	index: number;
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
	isDiscover?: boolean;
	exportSlidesRef?: React.RefObject<HTMLDivElement>;
	folders?: Folder[];
	setFolders?: React.Dispatch<React.SetStateAction<Folder[]>>;
	activeFolder?: string;
	onDrag?: (projectId: string) => void;
	setRefreshMenu: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
	project,
	onDelete,
	index,
	setCurrentProjects,
	isDiscover = false,
	exportSlidesRef = useRef<HTMLDivElement>(null),
	folders,
	setFolders,
	activeFolder,
	onDrag,
	setRefreshMenu,
}) => {
	const isCloning = index === -1;
	const [loaded, setLoaded] = useState(false);

	const url = project.content_type !== 'chart' ? `/${isDiscover ? 'shared' : 'project'}/${project.id}` : `/charts/${project.id}`;

	return (
		<React.Fragment key={project.id}>
			{/* thumbnail */}
			<div
				className={`h-full hidden lg:flex col-span-1 p-1 items-center justify-center ${
					!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'
				} leading-normal`}
				draggable={onDrag ? true : false}
				onDragStart={() => onDrag && onDrag(project.id)}
			>
				{/* view count */}
				{isDiscover && (
					<div className='flex flex-col items-center justify-center w-full text-xs text-[#475467] mx-1 gap-y-1'>
						<FaEye />
						{project.view_count || 0}
					</div>
				)}
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
			</div>
			{/* title */}
			<div
				className={`col-span-3 lg:col-span-2 p-2 flex items-center ${!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'
					} leading-[20px]`}
				style={{ padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)` }}
				draggable={onDrag ? true : false}
				onDragStart={() => onDrag && onDrag(project.id)}
			>
				<Link href={url}>
					<div
						className='flex-wrap'
						style={{
							fontSize: '14px',
							color: 'var(--colors-text-text-secondary-700, #344054)',
						}}
					>
						{project.name} {isCloning && '(Cloning...⏳)'}
					</div>
				</Link>
			</div>
			{/* type */}
			{
				<div
					className='col-span-1 hidden lg:block items-center '
					style={{
						padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
					}}
				>
					<div className='flex flex-col gap-[4px]'>
						{project.content_type === 'presentation' || project.content_type==='ppt2video' ? (
							<DesignSystemBadges
								size='sm'
								text={'Slide'}
								iconLeading={PiSlideshow}
								bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #EFF4FF)'
								borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #C7D7FE)'
								borderRadius='6px'
								textColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
								iconColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
							></DesignSystemBadges>
						) : project.content_type === "social_posts" ? (
							<DesignSystemBadges
								size='sm'
								text={'Social Post'}
								iconLeading={MdOutlineShare}
								bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #F4F3FF)'
								borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #D9D6FE)'
								borderRadius='6px'
								textColor='var(--Component-colors-Utility-Purple-utility-purple-700, #5925DC)'
								iconColor='var(--Component-colors-Utility-Purple-utility-purple-700, #5925DC)'
							></DesignSystemBadges>
							) :  // charts 
								<DesignSystemBadges
									size='sm'
									text={'Chart'}
									iconLeading={MdOutlineInsertChartOutlined}
									bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #FEF2FF)'
									borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #FCC7F8)'
									borderRadius='6px'
									textColor='var(--Component-colors-Utility-Purple-utility-purple-700, #B01C99)'
									iconColor='var(--Component-colors-Utility-Purple-utility-purple-700, #B01C99)'
								></DesignSystemBadges>}
						{project.video_url ? (
							<DesignSystemBadges
								size='sm'
								text={'Video'}
								iconLeading={MdOndemandVideo}
								bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #EFF4FF)'
								borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #C7D7FE)'
								borderRadius='6px'
								textColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
								iconColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
							></DesignSystemBadges>
						) : (
							<></>
						)}
					</div>

					{/* {project.content_type} */}
				</div>
			}
			{/* resources */}
			{!isDiscover && (
				<div
					className='col-span-2 hidden lg:flex lg:flex-col lg:gap-1 items-center'
					style={{
						padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
					}}
				>
					{/* <div className='flex-wrap'> */}
					{project.resources &&
						project.resources.map((resource, resourceIndex) => (
							<ResourceItem key={resourceIndex} {...resource} />
						))}
					{/* </div> */}
				</div>
			)}
			{/* laste edited time */}
			{
				<div className='flex flex-row justify-between'>
					<div
						className='col-span-1 block items-center '
						style={{
							padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
							fontSize: '14px',
							color: 'var(--colors-text-text-tertiary-600, #475467)',
							lineHeight: '20px',
							fontStyle: 'normal',
							fontWeight: 'normal',
						}}
					>
						{/* <FileIcon fileType='pdf' /> */}
						{project.updated_datetime && formatDate(project.updated_datetime)}
					</div>
					{/* buttons drop down */}
					<ProjectDropdownMenu
						project={project}
						setCurrentProjects={setCurrentProjects}
						folders={folders}
						setFolders={setFolders}
						onDelete={onDelete}
						isDiscover={isDiscover}
						activeFolder={activeFolder}
						setRefreshMenu={setRefreshMenu}
						exportSlidesRef={exportSlidesRef}
					/>
				</div>
			}
		</React.Fragment>
	);
};

interface Props {
	currentProjects: Project[];
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
	currentFolders?: Folder[];
	setCurrentFolders?: React.Dispatch<React.SetStateAction<Folder[]>>;
	onDelete?: (projectId: string) => void;
	isDiscover?: boolean;
	activeFolder?: string;
	onDrag?: (projectId: string) => void;
	refreshMenu: boolean;
	setRefreshMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectTable: React.FC<Props> = ({
	currentProjects,
	setCurrentProjects,
	currentFolders,
	setCurrentFolders,
	onDelete,
	isDiscover = false,
	activeFolder,
	onDrag,
	refreshMenu,
	setRefreshMenu,
}) => {
	const grids = isDiscover
		? 'grid-cols-4 lg:grid-cols-5'
		: 'grid-cols-4 lg:grid-cols-7';
	// const [refreshMenu, setRefreshMenu] = useState(false);

	return (
		<>
			<div className='w-full mx-auto'>
				{/* the table header */}
				{/* <div className={`grid bg-[#ECF1FE] border border-gray-200 ${grids}`}> */}
				<div
					className={`grid ${grids}`}
					style={{
						borderTop: '1px solid #EAECF0',
						borderLeft: '1px solid #EAECF0',
						borderRight: '1px solid #EAECF0',
						background: 'var(--Colors-Background-bg-secondary, #F9FAFB)',
						borderRadius: 'var(--radius-md) var(--radius-md) 0px 0px',
					}}
				>
					{/* <div className='hidden lg:flex col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold uppercase leading-normal tracking-wide'> */}
					<div
						className='flex col-span-3 w-full capitalize '
						style={{
							padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
							whiteSpace: 'nowrap',
							color: 'var(--colors-text-text-tertiary-600, #475467)',

							fontSize: '12px',
							fontStyle: 'normal',
							lineHeight: '18px',
							fontWeight: 500,
						}}
					>
						Title
					</div>
					<div
						className='hidden lg:flex col-span-1 w-full capitalize '
						style={{
							padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
							whiteSpace: 'nowrap',
							color: 'var(--colors-text-text-tertiary-600, #475467)',

							fontSize: '12px',
							fontStyle: 'normal',
							lineHeight: '18px',
							fontWeight: 500,
						}}
					>
						Type
					</div>
					{!isDiscover && (
						<div
							className='hidden lg:flex col-span-2 w-full capitalize '
							style={{
								padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
								whiteSpace: 'nowrap',
								color: 'var(--colors-text-text-tertiary-600, #475467)',

								fontSize: '12px',
								fontStyle: 'normal',
								lineHeight: '18px',
								fontWeight: 500,
							}}
						>
							Resources
						</div>
					)}
					{/* last edited header */}
					{
						<div
							className='flex col-span-1 w-full capitalize '
							style={{
								padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
								whiteSpace: 'nowrap',
								color: 'var(--colors-text-text-tertiary-600, #475467)',

								fontSize: '12px',
								fontStyle: 'normal',
								lineHeight: '18px',
								fontWeight: 500,
							}}
						>
							Last edited
						</div>
					}
				</div>
				{/* projectItem container */}
				<div
					style={{
						alignItems: 'center',
						border: '1px solid #EAECF0',
						borderRadius: ' 0px 0px var(--radius-md) var(--radius-md)',
					}}
				>
					{' '}
					{currentProjects.map((project, index) => (
						<div
							key={'project_list' + index}
							className={`grid bg-white ${grids}`}
							style={{
								alignItems: 'center',
								borderBottom: '1px solid #EAECF0',
							}}
						>
							<ProjectItem
								key={`${project.id}-${refreshMenu}`}
								project={project}
								onDelete={onDelete}
								setCurrentProjects={setCurrentProjects}
								index={index}
								isDiscover={isDiscover}
								folders={currentFolders}
								setFolders={setCurrentFolders}
								activeFolder={activeFolder}
								onDrag={onDrag}
								setRefreshMenu={setRefreshMenu}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ProjectTable;
