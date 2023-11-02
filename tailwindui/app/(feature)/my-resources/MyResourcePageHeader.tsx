'use client'
import React, { useState } from 'react'
import UploadToLibraryWindow from './UploadToLibraryWindow'

const MyResourcePageHeader = () => {
  const [showModal, setShowModal] = useState(true)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <>
      {/* top background container of my projects title text and  */}
      <div className='bg-gray-200 pt-16 md:pt-32 flex justify-center '>
        {/* flex container controlling max width */}
        <div className='w-full h-[6.25rem] max-w-7xl flex flex-wrap items-end justify-between '>
          {/* my project title text */}
          <div className='w-40 rounded-md justify-center items-center inline-flex '>
            <div className='text-neutral-900 text-base font-bold font-creato-medium leading-10 tracking-wide border-black border-b-2'>
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
      {showModal && (
        <UploadToLibraryWindow
          showModal={showModal}
          closeModal={closeModal}
          selectable={false}
        />
      )}
    </>
  )
}

export default MyResourcePageHeader
