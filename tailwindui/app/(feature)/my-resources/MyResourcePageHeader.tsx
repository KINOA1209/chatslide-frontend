'use client'
import React, { useState } from 'react';
import UploadToLibraryWindow from './UploadToLibraryWindow';
import { Transition } from '@headlessui/react';

const MyResourcePageHeader = () => {
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
      <div className='bg-gray-200 pt-16 md:pt-18 flex justify-center '>
        {/* flex container controlling max width */}
        <div className='w-full h-[6.25rem] max-w-7xl flex flex-wrap items-center justify-center lg:items-end lg:justify-between '>
          {/* my project title text */}
          <div className='w-full lg:w-40 rounded-md justify-center items-center inline-flex'>
            <div className='text-neutral-900 text-base font-bold font-creato-medium leading-10 tracking-wide border-black lg:border-b-2'>
              My Library
            </div>
          </div>
          {/* upload new file button */}
          <div
            className='h-9 px-5 py-2 bg-[#2943E9] rounded-3xl justify-center items-center inline-flex self-start whitespace-no-wrap'
            onClick={openModal}
          >
            <div className='text-center text-zinc-100 text-sm font-medium font-creato-medium leading-none tracking-tight cursor-pointer'>
              Upload New File
            </div>
          </div>
        </div>
      </div>
      <Transition
        className='h-full w-full z-50 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
        show={showModal}
        onClick={ (e) => {
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
        />
      )}
      </Transition>
    </section>
  )
}

export default MyResourcePageHeader
