'use client';

import LanguageSelector from '@/components/language/LanguageSelector';
import { Instruction } from '../ui/Text';
import ButtonWithExplanation from './ButtonWithExplanation';
import { FaRegClone } from 'react-icons/fa';
import Modal from '../ui/Modal';
import Project from '@/models/Project';
import { useUser } from '@/hooks/use-user';
import ProjectService from '@/services/ProjectService';
import { useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';

export const CloneButton: React.FC<{
	project: Project;
	setCurrentProjects: React.Dispatch<React.SetStateAction<Project[]>>;
	showCloneModal: boolean; // Accept showCloneModal as prop
	setShowCloneModal: React.Dispatch<React.SetStateAction<boolean>>; // Accept setShowCloneModal as prop
	isDropdownVisible?: boolean;
	setIsDropdownVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
	project,
	setCurrentProjects,
	showCloneModal,
	setShowCloneModal,
	isDropdownVisible,
	setIsDropdownVisible,
}) => {
	const [targetCloneLanguage, setTargetCloneLanguage] =
		useState<string>('English');
	// const [showCloneModal, setShowCloneModal] = useState(false);
	const { token } = useUser();

	async function onClone() {
		console.log(`cloning project ${project.id} to ${'English'}`);

		if (!project) return;
		try {
			const newProject = await ProjectService.clone(
				project.id,
				targetCloneLanguage,
				token,
				project.content_type,
			);
			setCurrentProjects((projects) => [newProject, ...projects]);
			setIsDropdownVisible && setIsDropdownVisible(false);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<>
			<Modal
				showModal={showCloneModal}
				setShowModal={setShowCloneModal}
				title='Clone / Translate Project'
				description='You can create a new project with the same content.'
				onConfirm={onClone}
			>
				{project.content_type === 'presentation' || project.content_type === 'ppt2video' && (
					<>
						<Instruction>
							Your current project language is {project.language}.
						</Instruction>
						<LanguageSelector
							language={targetCloneLanguage}
							setLanguage={setTargetCloneLanguage}
							text='New project language:'
							showExplanation={false}
						/>
					</>
				)}
			</Modal>
			<ButtonWithExplanation
				button={
					<button onClick={() => setShowCloneModal(true)}>
						{/* <FaRegClone
							style={{
								strokeWidth: '1',
								flex: '1',
								width: '16px',
								height: '16px',
								fontWeight: 'bold',
								color: '#344054',
							}}
						/> */}
						<MdOutlineContentCopy
							style={{
								color: 'var(--colors-text-text-secondary-700, #344054)',
								width: '16px',
								height: '16px',
							}}
						></MdOutlineContentCopy>
					</button>
				}
				explanation={'Clone / Translate'}
			/>
		</>
	);
};
