import React, { useState, useEffect, Fragment, useRef } from 'react';
import Modal from "../ui/Modal";
import { BigBlueButton } from '../button/DrlambdaButton';
import { useUser } from '@/hooks/use-user';

const CreateFolderModal: React.FC<{
    showCreateFolderModal: boolean;
    setShowCreateFolderModal: (showCreateFolderModal: boolean) => void;
}> = ({
    showCreateFolderModal,
    setShowCreateFolderModal,
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
                    // Perform any actions on successful creation, like closing the modal
                    setShowCreateFolderModal(false);
                } else {
                    // Handle server-side errors (e.g., group already exists)
                    console.error('Failed to create folder:', data.message);
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
                >
                    <input
                        type="text"
                        placeholder="New folder name"
                        value={folderName}
                        onChange={handleInputChange}
                        className="w-full p-2.5 mb-2.5 min-w-[300px] font-creato-medium rounded-md"
                    />
                    <BigBlueButton
                        id='create-folder-confirm'
                        isSubmitting={isSubmitting}
                        onClick={handleFormSubmit}
                        wfull={true}
                    >
                        Create
                    </BigBlueButton>
                </Modal>
            </>
        )
    }

export default CreateFolderModal