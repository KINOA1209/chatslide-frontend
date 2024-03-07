import React, { useState } from 'react';
import moment from 'moment';
import { DeleteIcon, SpinIcon } from '@/app/(feature)/icons';
import { ResourceItem } from '@/components/ui/ResourceItem';
import Project from '@/models/Project';
import { FaPhotoVideo, FaRegClone } from 'react-icons/fa';
import { RiSlideshow2Fill } from 'react-icons/ri';
import Image from 'next/image';
import { useUser } from '@/hooks/use-user';
import ProjectService from '@/services/ProjectService';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { LuTrash2 } from 'react-icons/lu';
import Modal from '@/components/ui/Modal';
import { Instruction } from '@/components/ui/Text';
import LanguageSelector from '../(feature)/workflow-generate-outlines/LanguageSelector';

const DEFAULT_THUMBNAIL =
	'https://ph-files.imgix.net/76b477f1-bc1b-4432-b52b-68674658d62b.png';


const CloneButton: React.FC<{
	project: Project;
	setCurrentProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}> = ({ project, setCurrentProjects }) => {
	const [targetCloneLanguage, setTargetCloneLanguage] = useState<string>('English');
	const [showCloneModal, setShowCloneModal] = useState(false);
	const { token } = useUser();

	async function onClone() {
		console.log(`cloning project ${project.id} to ${'English'}`);
		if (!project) return;
		try {
			const newProject = await ProjectService.clone(
				project.id,
				targetCloneLanguage,
				token,
			);
			setCurrentProjects(projects => [newProject, ...projects]);
		} catch (e) {
			console.error(e);
		}
	}

	return <>
		<Modal
			showModal={showCloneModal}
			setShowModal={setShowCloneModal}
			title='Clone / Translate Project'
			description='You can create a new project with the same content, but optionally in a different language.'
			onConfirm={onClone}
		>
			<LanguageSelector
				language={targetCloneLanguage}
				setLanguage={setTargetCloneLanguage}
				text='New project language:'
				showExplanation={false}
			/>
		</Modal>
		<ButtonWithExplanation
			button={
				<button
					onClick={() => setShowCloneModal(true)}
				>
					<FaRegClone
						style={{
							strokeWidth: '1',
							flex: '1',
							width: '1.3rem',
							height: '1.3rem',
							fontWeight: 'bold',
							color: '#2943E9',
						}}
					/>
				</button>
			}
			explanation={'Clone / Translate'}
		/>
	</>
};

const ProjectItem: React.FC<{
	project: Project;
	onProjectClick: (projectId: string) => void;
	onDelete?: (projectId: string) => void;
	index: number;
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
}> = ({ project, onProjectClick, onDelete, index, setCurrentProjects }) => {
	const isCloning = index === -1;

	return (
		<React.Fragment key={project.id}>
			{/* type */}
			<div
				className={`hidden md:flex col-span-1 p-2 items-center justify-center border-b-2 ${!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'} font-creato-medium leading-normal`}
				onClick={() => onProjectClick(project.id)}
			>
				<div className=''>
					{project.content_type === 'presentation' ? (
						<Image
							unoptimized={true}
							src={project.thumbnail_url || DEFAULT_THUMBNAIL}
							alt='project thumbnail'
							layout='responsive'
							width={16}
							height={9}
							onError={(e) => {
								e.currentTarget.src = DEFAULT_THUMBNAIL;
							}}
						/>
					) : (
						<FaPhotoVideo className='text-gray-600 w-[40px] h-[40px]' />
					)}
				</div>
			</div>

			{/* topic */}
			<div
				className={`col-span-2 p-2 flex items-center border-b-2 ${!isCloning ? 'cursor-pointer' : 'cursor-not-allowed'} font-creato-medium leading-normal`}
				onClick={() => onProjectClick(project.id)}
			>
				<div className='flex-wrap'>
					{project.name} {isCloning && '(Cloning...⏳)'}
				</div>
			</div>

			{/* resources */}
			<div className='col-span-2 p-[2rem] border-b-2 hidden md:flex items-center text-gray-600 text-[17px] font-normal font-creato-medium leading-normal tracking-wide'>
				<div className='flex flex-col items-start'>
					{/* <FileIcon fileType='pdf' /> */}
					{project.resources &&
						project.resources.map((resource, resourceIndex) => (
							<ResourceItem key={resourceIndex} {...resource} />
						))}
				</div>
			</div>

			{/* buttons */}
			<div className='col-span-1 p-2 border-b-2 flex'>
				<div className='h-full flex justify-end items-center w-full gap-4'>
					{/* <span className='hidden md:flex'>
						{moment(project.created_datetime).format('L')}
					</span> */}

					{setCurrentProjects &&
						<CloneButton
							project={project}
							setCurrentProjects={setCurrentProjects}
						/>}

					{/* deletable if this is dashboard, not discover */}
					{onDelete && (
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
											color: '#2943E9',
										}}
									/>
								</button>
							}
							explanation={'Delete'}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

interface Props {
	currentProjects: Project[];
	setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
	onProjectClick: (projectId: string) => void;
	onDelete?: (projectId: string) => void;
}

const ProjectTable: React.FC<Props> = ({
	currentProjects,
	setCurrentProjects,
	onProjectClick,
	onDelete,
}) => {
	const [cloningProject, setCloningProject] = useState<Project>();

	return (
		<>
			<div className='w-full lg:w-2/3 mx-auto'>
				<div className='grid bg-[#ECF1FE] border border-gray-200 grid-cols-3 md:grid-cols-6'>
					<div className='hidden md:flex col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
						Type
					</div>
					<div className='col-span-2 flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
						Topic
					</div>
					<div className='hidden md:flex col-span-2 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
						Resources
					</div>
					<div className='col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>

					</div>
				</div>
				<div className='grid border bg-[white] border-gray-200 grid-cols-3 md:grid-cols-6'>
					{' '}
					{cloningProject && (
						<ProjectItem
							key={cloningProject.id + '_clone'}
							project={cloningProject}
							onProjectClick={() => { }}
							index={-1}
						/>
					)}
					{currentProjects.map((project, index) => (
						<ProjectItem
							key={project.id}
							project={project}
							onProjectClick={onProjectClick}
							onDelete={onDelete}
							setCurrentProjects={setCurrentProjects}
							index={index}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default ProjectTable;
