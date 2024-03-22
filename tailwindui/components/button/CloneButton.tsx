'use client';

import LanguageSelector from "@/components/language/LanguageSelector";
import { Instruction } from "../ui/Text";
import ButtonWithExplanation from "./ButtonWithExplanation";
import { FaRegClone } from "react-icons/fa";
import Modal from "../ui/Modal";
import Project from "@/models/Project";
import { useUser } from "@/hooks/use-user";
import ProjectService from "@/services/ProjectService";
import { useState } from "react";

export const CloneButton: React.FC<{
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
			description='You can create a new project with the same content.'
			onConfirm={onClone}
		>
			{project.content_type === 'presentation' &&
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
				</>}
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