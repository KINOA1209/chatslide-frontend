'use client';

import React, { useEffect, useState } from 'react';
import { ResourceItem } from '@/components/ui/ResourceItem';
import Project from '@/models/Project';
import { FaPhotoVideo, FaRegClone } from 'react-icons/fa';
import Image from 'next/image';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { LuTrash2 } from 'react-icons/lu';
import { CloneButton } from '@/components/button/CloneButton';
import Link from 'next/link';
import ShareButton from '@/components/button/ShareButton';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
import DesignSystemBadges from '@/components/ui/design_systems/Badges';
import { PiSlideshow } from 'react-icons/pi';
import { MdOndemandVideo } from 'react-icons/md';
import { MdOutlineShare } from 'react-icons/md';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import '@/components/ui/design_systems/variables.css';

const DEFAULT_THUMBNAIL = '/images/ogimage.png';

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
	if (secondsDiff < 60) {
		return `${secondsDiff} second${secondsDiff === 1 ? '' : 's'} ago`;
	} else if (minutesDiff < 60) {
		return `${minutesDiff} minute${minutesDiff === 1 ? '' : 's'} ago`;
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

const ProjectItem: React.FC<{
	project: Project;
	onDelete?: (projectId: string) => void;
	index: number;
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
	isDiscover?: boolean;
}> = ({ project, onDelete, index, setCurrentProjects, isDiscover = false }) => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const isCloning = index === -1;
	const { token } = useUser();
	const [isShared, setIsShared] = React.useState(false);
	// Parent component
	const [showCloneModal, setShowCloneModal] = useState(false); // Define state in the parent component
	const [showShareModal, setShowShareModal] = useState(false);
	const toggleDropdown = () => {
		setIsDropdownVisible((prev) => !prev);
	};

	// for hovering effect change dropdown menu section color
	const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
		event.currentTarget.style.background =
			'var(--Colors-Background-bg-tertiary, #F2F4F7)';
	};

	const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
		event.currentTarget.style.background = 'transparent';
	};

	useEffect(() => {
		console.log(project);
	}, []);

	return (
		<React.Fragment key={project.id}>
			{/* thumbnail */}
			<div
				className={`hidden md:flex col-span-1 p-2 items-center justify-center ${
					!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'
				} font-creato-medium leading-normal`}
				style={{ padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)` }}
			>
				<Link href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}>
					<div
						className='flex items-center justify-center w-[50px] h-[40px] lg:w-[72px]'
						style={{
							objectFit: 'contain' as 'contain',
						}}
					>
						{project.content_type === 'presentation' ? (
							<Image
								className=''
								unoptimized={true}
								src={project.thumbnail_url || DEFAULT_THUMBNAIL}
								alt='project thumbnail'
								layout='responsive'
								width={72}
								height={40}
								style={{ width: '72px', height: '40px' }}
								// onError={(e) => {
								// 	e.currentTarget.src = DEFAULT_THUMBNAIL;
								// }}
							/>
						) : (
							<FaPhotoVideo className='text-gray-600 w-[72px] h-[40px]' />
						)}
					</div>
				</Link>
			</div>
			{/* title */}
			<div
				className={`col-span-2 p-2 flex items-center ${
					!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'
				} font-creato-medium leading-normal`}
				style={{ padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)` }}
			>
				<Link href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}>
					<div className='flex-wrap'>
						{project.name} {isCloning && '(Cloning...⏳)'}
					</div>
				</Link>
			</div>
			{/* type */}
			{
				<div
					className='col-span-2 hidden md:block items-center '
					style={{
						padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)`,
					}}
				>
					<div className='flex flex-row gap-[2px]'>
						{project.content_type === 'presentation' ? (
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
						) : (
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
						)}{' '}
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
					className='col-span-3 hidden md:block items-center text-gray-600'
					style={{
						padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)`,
					}}
				>
					{/* <FileIcon fileType='pdf' /> */}
					{project.resources &&
						project.resources.map((resource, resourceIndex) => (
							<ResourceItem key={resourceIndex} {...resource} />
						))}
				</div>
			)}
			{/* laste edited time */}
			{
				<div
					className='col-span-2 hidden md:block items-center text-gray-600'
					style={{
						padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)`,
					}}
				>
					{/* <FileIcon fileType='pdf' /> */}
					{project.updated_datetime && formatDate(project.updated_datetime)}
				</div>
			}
			{/* buttons drop down */}
			<div
				className='col-span-1 p-2 flex'
				style={{ padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)` }}
			>
				<div className='h-full flex justify-end items-center w-full gap-4 relative'>
					{/* <span className='hidden md:flex'>
						{moment(project.created_datetime).format('L')}
					</span> */}

					{/* drop down menu click icon */}
					<div
						style={{
							display: 'flex',
							cursor: 'pointer',
							padding: '5px',
							alignItems: 'center',
							borderRadius: 'var(--radius-sm, 6px)',
							transition: 'background-color 0.3s', // Smooth transition
						}}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						onClick={() => {
							toggleDropdown();
							// Add functionality for the share button
						}}
					>
						<HiOutlineDotsVertical
							style={{ color: '#667085', width: '12px', height: '12px' }}
						></HiOutlineDotsVertical>
					</div>

					{/* dropdown menu items area */}
					{isDropdownVisible && (
						<div
							className='absolute top-full right-0 bg-white shadow-md rounded-md mt-1 md:w-[180px]'
							style={{
								zIndex: 999,
								display: 'flex',
								flexDirection: 'column',
								borderRadius: 'var(--radius-xl, 12px)',
							}}
							onMouseLeave={() => {
								setIsDropdownVisible(false);
							}}
						>
							<button
								className='block px-[10px] py-[9px] text-sm text-[#182230] hover:bg-[#F2F4F7] w-full text-left'
								onClick={() => {
									setShowShareModal(true);
								}}
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'flex-start',
									gap: 'var(--spacing-lg, 12px)',
									borderRadius: 'var(--radius-xl, 12px)',
								}}
							>
								<ShareButton
									share={isShared}
									setShare={(share: boolean) => {
										setIsShared(share);
										ProjectService.SlideShareLink(token, project.id, share);
									}}
									project={project}
									showShareModal={showShareModal}
									setShowShareModal={setShowShareModal}
									isDropdownVisible={isDropdownVisible}
									setIsDropdownVisible={setIsDropdownVisible}
									width='16px'
									height='16px'
								/>
								Share
							</button>

							{!isDiscover && setCurrentProjects && (
								<button
									className='block px-[10px] py-[9px] text-sm text-[#182230] hover:bg-[#F2F4F7] w-full text-left'
									onClick={() => {
										setShowCloneModal(true);
										// setIsDropdownVisible(false);
									}} // Toggle showCloneModal in the parent component
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'flex-start',
										gap: 'var(--spacing-lg, 12px)',
										borderRadius: 'var(--radius-xl, 12px)',
									}}
								>
									<CloneButton
										project={project}
										setCurrentProjects={setCurrentProjects}
										showCloneModal={showCloneModal} // Pass showCloneModal as prop
										setShowCloneModal={setShowCloneModal}
										isDropdownVisible={isDropdownVisible}
										setIsDropdownVisible={setIsDropdownVisible}
									/>
									Duplicate
								</button>
							)}

							{!isDiscover && onDelete && (
								<button
									className='block px-[10px] py-[9px] text-sm text-[#182230] hover:bg-[#F2F4F7] w-full text-left'
									onClick={() => {
										setIsDropdownVisible(false);
										onDelete(project.id);
									}}
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'flex-start',
										gap: 'var(--spacing-lg, 12px)',
										borderRadius: 'var(--radius-xl, 12px)',
										color: 'var(--colors-text-text-error-primary-600, #D92D20)',
									}}
								>
									<ButtonWithExplanation
										button={
											<button onClick={() => onDelete(project.id)}>
												<LuTrash2
													style={{
														strokeWidth: '2',
														flex: '1',
														width: '16px',
														height: '16px',
														fontWeight: 'bold',
														color:
															'var(--colors-text-text-error-primary-600, #D92D20)',
													}}
												/>
											</button>
										}
										explanation={'Delete'}
									/>
									Delete
								</button>
							)}
						</div>
					)}

					{/* <ShareButton
						share={isShared}
						setShare={(share: boolean) => {
							setIsShared(share);
							ProjectService.SlideShareLink(token, project.id, share);
						}}
						project={project}
					/>

					{!isDiscover && setCurrentProjects && (
						<CloneButton
							project={project}
							setCurrentProjects={setCurrentProjects}
						/>
					)}

					
					{!isDiscover && onDelete && (
						<ButtonWithExplanation
							button={
								<button onClick={() => onDelete(project.id)}>
									<LuTrash2
										style={{
											strokeWidth: '2',
											flex: '1',
											width: '16px',
											height: '16px',
											fontWeight: 'bold',
											color: '#344054',
										}}
									/>
								</button>
							}
							explanation={'Delete'}
						/>
					)} */}
				</div>
			</div>
		</React.Fragment>
	);
};

interface Props {
	currentProjects: Project[];
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
	onDelete?: (projectId: string) => void;
	isDiscover?: boolean;
}

const ProjectTable: React.FC<Props> = ({
	currentProjects,
	setCurrentProjects,
	onDelete,
	isDiscover = false,
}) => {
	const grids = isDiscover
		? 'grid-cols-3 md:grid-cols-8'
		: 'grid-cols-3 md:grid-cols-11';

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
					{/* <div className='hidden md:flex col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'> */}
					<div
						className='hidden md:flex col-span-3 w-full ml-4 text-[13px] font-bold font-creato-medium capitalize leading-normal tracking-wide'
						style={{
							padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)`,
							whiteSpace: 'nowrap',
						}}
					>
						Title
					</div>
					<div
						className='col-span-2 flex w-full ml-4 text-[13px] font-bold font-creato-medium capitalizeleading-normal tracking-wide'
						style={{
							padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)`,
							whiteSpace: 'nowrap',
						}}
					>
						Type
					</div>
					{!isDiscover && (
						<div
							className='hidden md:flex col-span-3 w-full ml-4 text-[13px] font-bold font-creato-medium capitalize leading-normal tracking-wide'
							style={{
								padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)`,
								whiteSpace: 'nowrap',
							}}
						>
							Resources
						</div>
					)}
					{/* last edited header */}
					{
						<div
							className='hidden md:flex col-span-2 w-full ml-4 text-[13px] font-bold font-creato-medium capitalize leading-normal tracking-wide'
							style={{
								padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)`,
								whiteSpace: 'nowrap',
							}}
						>
							Last edited
						</div>
					}
					{/* header: for pop up menu */}
					{
						<div
							className='hidden md:flex col-span-1 w-full ml-4 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'
							style={{
								padding: `var(--spacing-xl, 16px) var(--spacing-3xl, 24px)`,
							}}
						></div>
					}
					{/* */}
					{/* <div className='col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'></div> */}
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
							className={`grid bg-white ${grids}`}
							style={{
								alignItems: 'center',
								borderBottom: '1px solid #EAECF0',
							}}
						>
							<ProjectItem
								key={project.id}
								project={project}
								onDelete={onDelete}
								setCurrentProjects={setCurrentProjects}
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

export default ProjectTable;
