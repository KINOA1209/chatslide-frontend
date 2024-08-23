'use client'

import React, { useState } from 'react';
import Modal from "../ui/Modal";
import { InputBox } from '../ui/InputBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@/hooks/use-user';
import Folder from '@/models/Folder';
import TeamService from '@/services/TeamService';

const CreateFolderModal: React.FC<{
    showCreateFolderModal: boolean;
    setShowCreateFolderModal: (showCreateFolderModal: boolean) => void;
    setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
    isTeamMode: boolean;
    teamId: string;
}> = ({
    showCreateFolderModal,
    setShowCreateFolderModal,
    setFolders,
    isTeamMode,
    teamId
}) => {
    const [folderName, setFolderName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useUser();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFolderName(event.target.value);
    };

    const handleFormSubmit = async () => {
        setIsSubmitting(true);
        console.log('Attempting to create folder:', folderName);

        try {
            let responseMessage;
            if (isTeamMode) {
                responseMessage = await TeamService.createFolder(teamId, 'project', folderName, token);
            } else {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ group_name: folderName })
                };

                const response = await fetch('/api/create_project_group', requestOptions);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                responseMessage = data.message;
            }

            console.log('Folder created successfully:', responseMessage);
            setFolders(prevFolders => {
                const newFolders = [
                    ...prevFolders,
                    { folderName: folderName, projects: []}
                ];
                return newFolders.sort((a, b) => a.folderName.localeCompare(b.folderName));
            });
            setShowCreateFolderModal(false);
        } catch (error: any) {
            console.error('Failed to create folder:', error.message);
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
        } finally {
            setIsSubmitting(false); // Ensure this is called even if an error occurs
        }
        console.log('create folder resolved');
    };

    return (
        <>
            <Modal
                showModal={showCreateFolderModal}
                setShowModal={setShowCreateFolderModal}
                title='Create new folder'
                onConfirm={handleFormSubmit}
            >
                <InputBox>
                    <input
                        id='key'
                        type='text'
                        placeholder='New folder name'
                        className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800'
                        maxLength={100}
                        value={folderName}
                        onChange={handleInputChange}
                    />
                </InputBox>
            </Modal>
            <ToastContainer />
        </>
    );
}

export default CreateFolderModal;