'use client';

import React from 'react';
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


const DEFAULT_THUMBNAIL =
	'https://ph-files.imgix.net/76b477f1-bc1b-4432-b52b-68674658d62b.png';

const ProjectItem: React.FC<{
	project: Project;
	onDelete?: (projectId: string) => void;
	index: number;
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
	isDiscover?: boolean;
}> = ({ project, onDelete, index, setCurrentProjects, isDiscover = false }) => {
	const isCloning = index === -1;
	const { token } = useUser();
	const [ isShared, setIsShared ] = React.useState(false);

	return (
		<React.Fragment key={project.id}>
			{/* thumbnail */}

			<div
				className={`hidden md:flex col-span-1 p-2 items-center justify-center border-b-2 ${!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'} font-creato-medium leading-normal`}
			>
				<Link href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}>
					<div className=''>
						{project.content_type === 'presentation' ? (
							<Image
								unoptimized={true}
								src={project.thumbnail_url || DEFAULT_THUMBNAIL}
								alt='project thumbnail'
								layout='responsive'
								width={16}
								height={9}
							// onError={(e) => {
							// 	e.currentTarget.src = DEFAULT_THUMBNAIL;
							// }}
							/>
						) : (
							<FaPhotoVideo className='text-gray-600 w-[40px] h-[40px]' />
						)}
					</div>
				</Link>
			</div>


			{/* topic */}

			<div
				className={`col-span-2 p-2 flex items-center border-b-2 ${!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'} font-creato-medium leading-normal`}
			>
				<Link href={`/${isDiscover ? 'shared' : 'project'}/${project.id}`}>
					<div className='flex-wrap'>
						{project.name} {isCloning && '(Cloning...⏳)'}
					</div>
				</Link>
			</div>


			{/* resources */}
			{!isDiscover &&
				<div className='col-span-2 p-[2rem] border-b-2 hidden md:flex items-center text-gray-600 text-[17px] font-normal font-creato-medium leading-normal tracking-wide'>
					<div className='flex flex-col items-start'>
						{/* <FileIcon fileType='pdf' /> */}
						{project.resources &&
							project.resources.map((resource, resourceIndex) => (
								<ResourceItem key={resourceIndex} {...resource} />
							))}
					</div>
				</div>}

			{/* buttons */}
			<div className='col-span-1 p-2 border-b-2 flex'>
				<div className='h-full flex justify-end items-center w-full gap-4'>
					{/* <span className='hidden md:flex'>
						{moment(project.created_datetime).format('L')}
					</span> */}

					<ShareButton
						share={isShared}
						setShare={(share: boolean) => {
							setIsShared(share);
							ProjectService.SlideShareLink(token, project.id, share)
						}}
						project={project}/>

					{!isDiscover && setCurrentProjects &&
						<CloneButton
							project={project}
							setCurrentProjects={setCurrentProjects}
						/>}

					{/* deletable if this is dashboard, not discover */}
					{!isDiscover && onDelete && (
						<ButtonWithExplanation
							button={
								<button
									onClick={() => onDelete(project.id)}
								>
									<LuTrash2
										style={{
											strokeWidth: '2',
											flex: '1',
											width: '1.5rem',
											height: '1.5rem',
											fontWeight: 'bold',
											color: '#344054',
										}}
									/>
								</button>
							}
							explanation={'Delete'}
						/>
					)}

				</div>
			</div>
		</React.Fragment >
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

	const grids = isDiscover ? 'grid-cols-3 md:grid-cols-4' : 'grid-cols-3 md:grid-cols-6';

	return (
		<>
			<div className='w-full lg:w-2/3 mx-auto'>
				<div className={`grid bg-[#ECF1FE] border border-gray-200 ${grids}`}>
					<div className='hidden md:flex col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
						Type
					</div>
					<div className='col-span-2 flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
						Topic
					</div>
					{!isDiscover &&
						<div className='hidden md:flex col-span-2 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
							Resources
						</div>}
					<div className='col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>

					</div>
				</div>
				<div className={`grid border bg-[white] border-gray-200 ${grids}`}>
					{' '}
					{currentProjects.map((project, index) => (
						<ProjectItem
							key={project.id}
							project={project}
							onDelete={onDelete}
							setCurrentProjects={setCurrentProjects}
							index={index}
							isDiscover={isDiscover}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default ProjectTable;
