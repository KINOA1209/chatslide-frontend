import React, { useState } from 'react';
import { BigBlueButton } from '../button/DrlambdaButton';
import MyFiles from '../FileManagement';
import Modal from '../ui/Modal';
import Resource from '@/models/Resource';

type FileUploadModalProps = {
  selectedResourceId: string[];
  setSelectedResourceId: (resourceId: string[]) => void;
  selectedResources: Resource[]; // Replace 'any' with a more specific type if possible
  setSelectedResources: (resources: Resource[]) => void;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  selectedResourceId,
  setSelectedResourceId,
  selectedResources,
  setSelectedResources,
  showModal,
  setShowModal,
}) => {

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h4 className='h4 text-blue-600 text-center'>
        Select Supporting Material
      </h4>
      <div className='h-[60vh] max-w-[80vw] overflow-y-auto '>
        <MyFiles
          selectable={true}
          selectedResourceId={selectedResourceId}
          setSelectedResourceId={setSelectedResourceId}
          selectedResources={selectedResources}
          setSelectedResources={setSelectedResources}
        />
      </div>
          <div className='w-full flex flex-row items-center justify-center'>
            <BigBlueButton
              onClick={(e) => {
                e.preventDefault()
                setShowModal(false)
              }} >
              OK
            </BigBlueButton>
      </div>
    </Modal>
  );
};

export default FileUploadModal;