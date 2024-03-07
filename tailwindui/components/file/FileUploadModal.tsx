import React, { useState } from 'react';
import { BigBlueButton } from '../button/DrlambdaButton';
import MyFiles from './FileManagement';
import Modal from '../ui/Modal';
import Resource from '@/models/Resource';

type FileUploadModalProps = {
	selectedResources: Resource[]; // Replace 'any' with a more specific type if possible
	setSelectedResources: (resources: Resource[]) => void;
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	pageInvoked: string;
	type?: string;
};

const FileUploadModal: React.FC<FileUploadModalProps> = ({
	selectedResources,
	setSelectedResources,
	showModal,
	setShowModal,
	pageInvoked,
	type = 'file',
}) => {
	return (
		<Modal showModal={showModal} setShowModal={setShowModal}>
			<h4 className='h4 text-blue-600 text-center'>Select {type}</h4>
			<div className='h-[60vh] w-full overflow-y-hidden '>
				<MyFiles
					selectable={true}
					selectedResources={selectedResources}
					setSelectedResources={setSelectedResources}
					pageInvoked={pageInvoked}
					fileType={type}
				/>
			</div>
			<div className='w-full flex flex-row items-center justify-center'>
				<BigBlueButton
					onClick={(e) => {
						e.preventDefault();
						setShowModal(false);
					}}
				>
					OK
				</BigBlueButton>
			</div>
		</Modal>
	);
};

export default FileUploadModal;
