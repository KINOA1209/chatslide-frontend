import Project from '@/models/Project';
import Image from 'next/image';
import Link from 'next/link';
import DesignSystemBadges from '@/components/ui/design_systems/Badges';
import { PiSlideshow } from 'react-icons/pi';
import { MdOndemandVideo, MdOutlineOpenInNew } from 'react-icons/md';
import { MdOutlineShare } from 'react-icons/md';
import '@/components/ui/design_systems/variables.css';
import defaultDrLambdaThumbnail from '@/public/images/ogimage_drlambda.png';
import defaultChatSlideThumbnail from '@/public/images/ogimage_chatslide.png';
import causalTopicThumbnail from '@/public/images/socialpost/casual_topic_thumbnail_classic.png';
import readingNotesThumbnail from '@/public/images/socialpost/reading_notes_thumbnail_classic.png';
import seriousSubjectThumbnail from '@/public/images/socialpost/serious_subject_thumbnail_classic.png';
import { isChatslide } from '@/utils/getHost';
import { FaEye } from 'react-icons/fa';
import Folder from '@/models/Folder';
import { Menu } from '@/components/button/Menu';
import { Fragment } from 'react';

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

export function getThumbnailUrl(project: Project) {
	if (!project)
		return isChatslide() ? defaultChatSlideThumbnail : defaultDrLambdaThumbnail;
	if (project.content_type === 'presentation' || project.content_type === 'ppt2video') {
		return (
			project.thumbnail_url ||
			(isChatslide() ? defaultChatSlideThumbnail : defaultDrLambdaThumbnail)
		);
	}
	else if (project.post_type === 'casual_topic') {
		return causalTopicThumbnail;
	}
	else if (project.post_type === 'reading_notes') {
		return readingNotesThumbnail;
	}
	else if (project.post_type === 'serious_subject') {
		return seriousSubjectThumbnail;
	}
	return causalTopicThumbnail;
}

const ProjectItem: React.FC<{
	project: Project;
	index: number;
	isDiscover?: boolean;
}> = ({ project, index, isDiscover = false }) => {
	const isCloning = index === -1;

	return (
		<Fragment key={project.id}>
			{/* thumbnail */}
			<div
				className={`h-full hidden lg:flex col-span-1 p-1 items-center justify-center ${
					!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'
				} leading-normal`}
			>
				{/* view count */}
				{isDiscover && (
					<div className='flex flex-col items-center justify-center w-full text-xs text-[#475467] mx-1 gap-y-1'>
						<FaEye />
						{project.view_count || 0}
					</div>
				)}
				<Link href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}>
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
							alt={project.name + 'project thumbnail'}
							layout='responsive'
							width={72}
							height={40}
							style={{ width: '72px', height: '40px' }}
							//priority={isPriority}
							// onError={(e) => {
							// 	e.currentTarget.src = DEFAULT_THUMBNAIL;
							// }}
						/>
					</div>
				</Link>
			</div>
			{/* title */}
			<div
				className={`col-span-3 lg:col-span-2 p-2 flex items-center ${
					!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'
				} leading-[20px]`}
				style={{ padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)` }}
			>
				<Link href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}>
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
						{project.content_type === 'presentation' ? (
							<DesignSystemBadges
								size='sm'
								text={'Slide'}
								iconLeading={<PiSlideshow />}
								bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #EFF4FF)'
								borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #C7D7FE)'
								borderRadius='6px'
								textColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
								iconColor='var(--Component-colors-Utility-Brand-utility-brand-700, #3538CD)'
							></DesignSystemBadges>
						) : (
							<DesignSystemBadges
								size='sm'
								text={'Social Post'}
								iconLeading={<MdOutlineShare />}
								bgColor='var(--Component-colors-Utility-Purple-utility-purple-50, #F4F3FF)'
								borderColor='var(--Component-colors-Utility-Purple-utility-purple-200, #D9D6FE)'
								borderRadius='6px'
								textColor='var(--Component-colors-Utility-Purple-utility-purple-700, #5925DC)'
								iconColor='var(--Component-colors-Utility-Purple-utility-purple-700, #5925DC)'
							></DesignSystemBadges>
						)}{' '}
						{project.video_url ? (
							<DesignSystemBadges
								size='sm'
								text={'Video'}
								iconLeading={<MdOndemandVideo />}
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
					<Menu>
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
								<MdOutlineOpenInNew
									style={{ width: '16px', height: '16px' }}
								></MdOutlineOpenInNew>
								Open
							</Link>
						</button>
					</Menu>
				</div>
			}
		</Fragment>
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
}

const ProjectTableSSR: React.FC<Props> = ({
	currentProjects,
	setCurrentProjects,
	currentFolders,
	setCurrentFolders,
	onDelete,
	isDiscover = false,
	activeFolder,
	onDrag,
}) => {
	const grids = 'grid-cols-4 lg:grid-cols-5';

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
								key={`${project.id}`}
								project={project}
								index={index}
								isDiscover={isDiscover}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ProjectTableSSR;
