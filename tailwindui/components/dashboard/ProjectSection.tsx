import React, { ReactNode, useRef, useState } from 'react';
import ProjectTable, {
} from '@/components/dashboard/ProjectTable';
import Image from 'next/image';
import { Title } from '@/components/ui/Text';
import { Blank, Loading } from '@/components/ui/Loading';
import Project from '@/models/Project';
import Folder from '@/models/Folder';
import { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import ProjectCard from './ProjectCard';
import { WrappableRow } from '../layout/WrappableRow';
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
  projectToggle?: ReactNode;
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
  projectToggle 
}) => {
	const exportSlidesRef = useRef<HTMLDivElement>(null);
	const [refreshMenu, setRefreshMenu] = useState(false);

	return (
		<div className='pb-[1rem] w-full px-4 pt-4 sm:px-8 sm:pt-8 flex flex-col grow overflow-auto gap-2'>
			<div className='flex flex-row justify-between items-center'>
				<Title center={false}>📑 Projects</Title>
				{projectToggle}
			</div>
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
