'use client'
import React, { useState } from 'react';
import UploadToLibraryWindow from './UploadToLibraryWindow';
import { Transition } from '@headlessui/react';
import DrlambdaButton from '@/components/button/DrlambdaButton';

interface MyResourcePageHeaderProps {
  onFilesUploaded: () => void;
}
const MyResourcePageHeader: React.FC<MyResourcePageHeaderProps> = ({
  onFilesUploaded,
}) => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <section>
      {/* top background container of my projects title text and  */}
      <div className='mt-[3rem] flex items-end w-full z-10 pt-[4rem] border-b-2 px-[5rem]'>
        {/* flex container controlling max width */}
        <div className='w-full max-w-7xl flex flex-wrap items-end justify-between md:justify-center'>
          {/* my project title text */}
          <div className='text-neutral-900 text-base font-bold font-creato-medium leading-10 tracking-wide border-black border-b-2'>
            My Projects
          </div>

          {/* create new project button */}
          <div className="absolute right-10 pb-[1rem] ">
            <DrlambdaButton
              onClick={openModal}
            >
              Upload File
            </DrlambdaButton>
          </div>
        </div>
      </div>

      <Transition
        className='h-full w-full z-[10] bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
        show={showModal}
        onClick={(e) => {
          e.stopPropagation();
          closeModal;
        }}
        enter="transition ease duration-300 transform"
        enterFrom="opacity-0 translate-y-12"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease duration-300 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-12"
      >
        {showModal && (
          <UploadToLibraryWindow
            showModal={showModal}
            closeModal={closeModal}
            selectable={false}
            onFilesUploaded={onFilesUploaded}
          />
        )}
      </Transition>
    </section>
  )
}

export default MyResourcePageHeader
