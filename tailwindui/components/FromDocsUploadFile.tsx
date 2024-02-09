'use client';

import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import 'react-toastify/dist/ReactToastify.css';
import { QuestionExplainIcon } from '@/app/(feature)/icons';
import { FaFilePdf, FaYoutube } from 'react-icons/fa';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import SelectedResourcesList from '@/components/SelectedResources';
import { FiFilePlus, FiYoutube } from "react-icons/fi";
import ResourceService from '@/services/ResourceService';
import { toast, ToastContainer } from 'react-toastify';
import AuthService from '@/services/AuthService';
import Resource from '@/models/Resource';
import { IoIosLink } from 'react-icons/io';


interface FromDocsUploadFileProps {
  openSupportivePopup: () => void;
  closeSupportivePopup: () => void;
  showSupportivePopup: boolean;
  linkUrl: string;
  handleLinkChange: (link: string) => void;
  addLink: (link: string) => void;
  isAddingLink: boolean;
  linkError: string;
  setShowFileModal: (show: boolean) => void;
  selectedResources: any[];
  setSelectedResources: (resources: Resource[]) => void;
  removeResourceAtIndex: (index: number) => void;

}

const FromDocsUploadFile: React.FC<FromDocsUploadFileProps> = ({
  openSupportivePopup,
  closeSupportivePopup,
  showSupportivePopup,
  linkUrl,
  handleLinkChange,
  addLink,
  isAddingLink,
  linkError,
  setShowFileModal,
  selectedResources,
  setSelectedResources,
  removeResourceAtIndex,

}) => {
  const [resources, setResources] = useState<Resource[]>([]);

  const onFileSelected = async (file: File | null) => {
    if (file == null) return;
    const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
    try {
      ResourceService.uploadResource(file, idToken, 'summary').then((newResource) => {
        setResources([newResource, ...resources]);
        if (setSelectedResources && selectedResources)
          setSelectedResources([newResource, ...selectedResources]);
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(`File upload failed.`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          containerId: 'fileManagement',
        });
      }
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await onFileSelected(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`additional_container my-2 lg:my-5  border border-2 border-gray-200`}
    >
      <div className='title2'>
        <p className='text-3xl'>Import Files</p>
        <p id='after2'> (Required)</p>
      </div>
      <div className='my-4'>
        <span className='text-sm text-gray-500'>
          To get started, select the files you would like to transform
        </span>
      </div>
      <div className='upload gap-1'>
        <span>Add Supporting File</span>
        <div className='relative inline-block'>
          <div
            className='cursor-pointer'
            onMouseEnter={openSupportivePopup}
            onMouseLeave={closeSupportivePopup}
            onTouchStart={openSupportivePopup}
            onTouchEnd={closeSupportivePopup}
          >
            <QuestionExplainIcon />
            {showSupportivePopup && (
              <div
                id='supportive_popup'
                className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] md:w-80 md:h-[5rem] flex justify-center items-center'
              >
                Any additional files that can enhance and provide context
                to your projects. This could be research data, images,
                charts, or reference materials.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`w-full h-[250px] flex flex-col items-center justify-center border rounded-md border-2 border-gray-200 mt-4 ${isDragging ? 'bg-blue-100 border-blue-500' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className='flex flex-col items-center gap-2'>
          <FiFilePlus size={40} color='gray' />
          <span className='font-creato-medium leading-snug tracking-wide text-lg'>Drag files here or{' '}
            <span className='text-blue-600 cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                setShowFileModal(true);
              }}>
              Browse File
            </span>
          </span>
          <span className='font-creato-medium leading-snug tracking-wide text-gray-400 text-sm'>(Supports PDF, TXT, DOCX, PPTX)</span>
        </div>
      </div>
      {selectedResources.length > 0 && <hr id='add_hr' />}
      <div className='mt-[10px]'>
        <SelectedResourcesList
          selectedResources={selectedResources}
          removeResourceAtIndex={removeResourceAtIndex}
        />
      </div>

      <div className='link_container bg-gray-100 border border-2 border-gray-200'>
        <div
          id='link_text_container'
          className='flex justify-center items-center w-full'
        >
          <div className='flex items-center gap-1'>
            <IoIosLink />
            <FiYoutube />
            𝕏
          </div>
          <div className='w-full'>
            <label htmlFor='link_text'></label>
            <input
              id='link'
              type='text'
              className='text-sm md:text-l form-input w-full border-none bg-gray-100'
              value={linkUrl}
              onChange={(e) => handleLinkChange(e.target.value)}
              placeholder='Paste webpage, Youtube, or 𝕏 link'
            />
          </div>
          <SmallBlueButton
            onClick={(e) => {
              addLink(linkUrl);
            }}
            isSubmitting={isAddingLink}
          >
            {isAddingLink ? 'Adding...' : 'Add'}
          </SmallBlueButton>
        </div>

        {linkError && (
          <div id='link_error' className='text-sm text-red-500'>
            {linkError}
          </div>
        )}
      </div>

    </div>
  );
};

export default FromDocsUploadFile;
