'use client';

import React, { useState, useEffect } from 'react';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import Modal from '../ui/Modal';
import Project from '@/models/Project';
import { useUser } from '@/hooks/use-user';
import { FiFolderPlus } from "react-icons/fi";
import Folder from '@/models/Folder';
import { MoveToFolderSelector } from './MoveToFolderSelector';
import { ToastContainer, toast } from 'react-toastify';
import ProjectService from '@/services/ProjectService';

export const MoveToFolderButton: React.FC<{
    project: Project;
    setCurrentProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    folders: Folder[];
    setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
    showMoveToFolderModal: boolean;
    setShowMoveToFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
    isDropdownVisible?: boolean;
    setIsDropdownVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    activeFolder: string;
}> = ({
    project,
    setCurrentProjects,
    folders,
    setFolders,
    showMoveToFolderModal,
    setShowMoveToFolderModal,
    isDropdownVisible,
    setIsDropdownVisible,
    activeFolder,
}) => {
        const { token } = useUser();
        const [selectedFolder, setSelectedFolder] = useState<string>(
					project?.project_group_name || 'drlambda-default',
				);

        const confirmMoveToFolder = async () => {
            if (!selectedFolder) {
                toast.error('No folder selected', {
                    position: 'top-center',
                    autoClose: 5000,
                });
                return;
            }
            try {
                const response = await ProjectService.moveToFolder(token, project.id, selectedFolder);

                // setCurrentProjects(prevProjects => {
                //     if (activeFolder === selectedFolder) {
                //         // If moving to the currently active folder, add the project to display
                //         return [...prevProjects, project];
                //     } else if (activeFolder !== selectedFolder) {
                //         // If moving out of the active folder, remove the project from display
                //         return prevProjects.filter(p => p.id !== project.id);
                //     }
                //     return prevProjects;
                // });

                setFolders(prevFolders => prevFolders.map(folder => {
                    if (folder.folderName === selectedFolder) {
                        // Adding the project to the new selected folder
                        return { ...folder, projects: [...folder.projects, project] };
                    } else if (folder.folderName === activeFolder) {
                        // Removing the project from the current active folder if it was there
                        return { ...folder, projects: folder.projects.filter(p => p.id !== project.id) };
                    }
                    return folder;
                }));
                toast.success('Project moved successfully!', {
                    position: 'top-center',
                    autoClose: 2000,
                });
            } catch (error: any) {
                toast.error(error.message, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
            setShowMoveToFolderModal(false);
            setSelectedFolder('');
        };

        return (
            <>
                <Modal
                    showModal={showMoveToFolderModal}
                    setShowModal={setShowMoveToFolderModal}
                    title='Move project'
                    onConfirm={confirmMoveToFolder}
                    width='400px'
                >
                    <MoveToFolderSelector
                        folders={folders}
                        setFolders={setFolders}
                        selectedFolder={selectedFolder}
                        setSelectedFolder={setSelectedFolder}
                    />
                </Modal>
                <ButtonWithExplanation
                    button={
                        <button onClick={() => setShowMoveToFolderModal(true)}>
                            <FiFolderPlus
                                style={{
                                    color: 'var(--colors-text-text-secondary-700, #344054)',
                                    width: '16px',
                                    height: '16px',
                                }}
                            ></FiFolderPlus>
                        </button>
                    }
                    explanation={'Move project to folder'}
                />
            </>
        );
    };
