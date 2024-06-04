'use client';

import React, { useState, useEffect } from 'react';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import Folder from '@/models/Folder';
import Project from '@/models/Project';
import Modal from '../ui/Modal';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { useUser } from '@/hooks/use-user';


export const RenameProjectButton: React.FC<{
    project: Project;
    setCurrentProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    folders: Folder[];
    setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
    showRenameProjectModal: boolean;
    setShowRenameProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    project,
    setCurrentProjects,
    folders,
    setFolders,
    showRenameProjectModal,
    setShowRenameProjectModal,
}) => {
    const { token } = useUser();
    const [ProjectRenameInput, setProjectRenameInput] = useState('')

    useEffect(()=>{
        setProjectRenameInput(project.name)
    },[project])

    const confirmRenameProject = async () => {
        try {
            const response = await fetch('/api/project/change_project_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    project_id: project.id,
                    new_name: ProjectRenameInput,
                }),
            });

            if (response.ok) {
                setCurrentProjects((prevProjects) =>
                    prevProjects.map((p) =>
                        p.id === project.id ? { ...p, name: ProjectRenameInput } : p
                    )
                );

                setFolders((prevFolders) =>
                    prevFolders.map((folder) => ({
                        ...folder,
                        projects: folder.projects.map((p) =>
                            p.id === project.id ? { ...p, name: ProjectRenameInput } : p
                        ),
                    }))
                );
            } else {
                const errorData = await response.json();
                console.error('Error updating project name:', errorData.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
        setShowRenameProjectModal(false);
        setProjectRenameInput('');
    };
    
	return (
        <>
            <Modal
                showModal={showRenameProjectModal}
                setShowModal={setShowRenameProjectModal}
                title='Rename Project'
                inputValue={ProjectRenameInput}
                setInputValue={setProjectRenameInput}
                hasInputArea={true}
                onConfirm={confirmRenameProject}
                maxInputLength={100}
            />
            <ButtonWithExplanation
                button={
                    <button onClick={() => setShowRenameProjectModal(true)}>
                        <MdDriveFileRenameOutline
                            style={{ width: '16px', height: '16px' }}
                        />
                    </button>
                }
                explanation={'Rename Project'}
            />
        </>
	);
};
