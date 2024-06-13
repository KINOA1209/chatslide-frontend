'use client';

import React, { useState, useEffect } from 'react';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import Folder from '@/models/Folder';
import Project from '@/models/Project';
import Modal from '../ui/Modal';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { useUser } from '@/hooks/use-user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ChangeProjectDescriptionButton: React.FC<{
    project: Project;
    setCurrentProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
    folders?: Folder[];
    setFolders?: React.Dispatch<React.SetStateAction<Folder[]>>;
    setDescription?: React.Dispatch<React.SetStateAction<String>>;
    showChangeProjectDescriptionModal: boolean;
    setShowChangeProjectDescriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    project,
    setCurrentProjects,
    folders,
    setFolders,
    setDescription,
    showChangeProjectDescriptionModal,
    setShowChangeProjectDescriptionModal,
}) => {
    const { token } = useUser();
    const [ProjectDescriptionChangeInput, setProjectDescriptionChangeInput] = useState('')

    useEffect(()=>{
        if(project?.description){
            setProjectDescriptionChangeInput(project.description)
        }
    },[project])

    const confirmChangeProjectDescription = async () => {
        try {
            const response = await fetch('/api/project/change_project_description', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    project_id: project.id,
                    new_description: ProjectDescriptionChangeInput,
                }),
            });

            if (response.ok) {
                if (setCurrentProjects) {
                    setCurrentProjects((prevProjects) =>
                        prevProjects.map((p) =>
                            p.id === project.id ? { ...p, description: ProjectDescriptionChangeInput } : p
                        )
                    );
                }

                if (setFolders && folders) {
                    setFolders((prevFolders) =>
                        prevFolders.map((folder) => ({
                            ...folder,
                            projects: folder.projects.map((p) =>
                                p.id === project.id ? { ...p, description: ProjectDescriptionChangeInput } : p
                            ),
                        }))
                    );
                }

                if (setDescription){
                    setDescription(ProjectDescriptionChangeInput)
                }
                toast.success('Project description updated successfully.', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } 
            else if (response.status === 403) {
                const errorData = await response.json();
                toast.error('You do not have permission to change the description of this project.', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                console.error('Permission denied:', errorData.message);
            }
            else {
                const errorData = await response.json();
                toast.error('Error updating project name, please try again.', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                console.error('Error updating project name:', errorData.message);
            }
        } catch (error: any) {
            toast.error('Error updating project name, please try again.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            console.error('Network error:', error);
        }
        setShowChangeProjectDescriptionModal(false);
        setProjectDescriptionChangeInput('');
    };
    
	return (
        <>
            <Modal
                showModal={showChangeProjectDescriptionModal}
                setShowModal={setShowChangeProjectDescriptionModal}
                title='Change Project Description'
                inputValue={ProjectDescriptionChangeInput}
                setInputValue={setProjectDescriptionChangeInput}
                hasTextArea={true}
                onConfirm={confirmChangeProjectDescription}
                maxInputLength={500}
                rows={10}
            />
            <ButtonWithExplanation
                button={
                    <button onClick={() => setShowChangeProjectDescriptionModal(true)}>
                        <MdDriveFileRenameOutline
                            style={{ width: '16px', height: '16px' }}
                        />
                    </button>
                }
                explanation={'Change Project Description'}
            />
        </>
	);
};
