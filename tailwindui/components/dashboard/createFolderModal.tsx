'use client'

import React, { useState, useEffect, Fragment, useRef } from 'react';
import Modal from "../ui/Modal";
import { BigBlueButton } from '../button/DrlambdaButton';
import { useUser } from '@/hooks/use-user';
import Folder from '@/models/Folder';
import { InputBox } from '../ui/InputBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateFolderModal: React.FC<{
    showCreateFolderModal: boolean;
    setShowCreateFolderModal: (showCreateFolderModal: boolean) => void;
    setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
}> = ({
    showCreateFolderModal,
    setShowCreateFolderModal,
    setFolders
}) => {
        const [folderName, setFolderName] = useState('');
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const { token } = useUser()

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFolderName(event.target.value);
        };

        const handleFormSubmit = async () => {
            setIsSubmitting(true);
            console.log('Attempting to create folder:', folderName);
            // Prepare the request options
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({ group_name: folderName })
            };

            try {
                const response = await fetch('/api/create_project_group', requestOptions);
                const data = await response.json();

                if (response.ok) {
                    console.log('Folder created successfully:', data);
                    setFolders(prevFolders => {
                        const newFolders = [
                            ...prevFolders,
                            { folderName: folderName, projects: [] }
                        ];
                        return newFolders.sort((a, b) => a.folderName.localeCompare(b.folderName));
                    });
                    setShowCreateFolderModal(false);
                } else {
                    // Handle server-side errors (e.g., group already exists)
                    console.error('Failed to create folder:', data.message);
                    toast.error(data.message, {
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
            } catch (error) {
                // Handle errors in the fetch operation
                console.error('Error submitting form:', error);
            } finally {
                setIsSubmitting(false);  // Ensure this is called even if an error occurs
            }
            console.log('create folder resolved');
            setShowCreateFolderModal(false);
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
									className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
                  maxLength={100}
									value={folderName}
									onChange={handleInputChange}
								/>
							</InputBox>
						</Modal>
					</>
				);
    }

export default CreateFolderModal