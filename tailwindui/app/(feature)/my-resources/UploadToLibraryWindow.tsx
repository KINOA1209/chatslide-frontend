'use client'
import React from 'react'
import { FromCloudIcon, FromComputerIcon } from './icons'
import { NewFileUploadButton } from '@/components/fileUpload'
import { ToastContainer, toast } from 'react-toastify'
import AuthService from '@/components/utils/AuthService'
import UserService from '@/components/utils/UserService'
interface UploadToLibraryWindowProps {
  showModal: boolean
  closeModal: () => void
  selectable: boolean
}

const UploadToLibraryWindow: React.FC<UploadToLibraryWindowProps> = ({
  showModal,
  closeModal,
  selectable = false,
}) => {
  if (!showModal) {
    return null // Don't render the modal if showModal is false
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div
        className='fixed top-0 left-0 w-full h-full bg-black opacity-70'
        onClick={closeModal}
      ></div>
      {/* pop up modal box container */}
      <div className='w-[34rem] h-[35rem] relative bg-gray-200 rounded-lg flex flex-col gap-[2.5rem] items-center'>
        {/* Upload to my library text */}
        <div className='pt-[1.25rem] w-[444px] text-center text-gray-700 text-lg font-bold font-creato-medium leading-normal tracking-wide'>
          Upload to My Library
        </div>
        {/* flex row container for two buttons */}
        <div className='flex flex-row w-full'>
          {/* From computer button */}
          <div className='flex-1 h-10 px-3 py-1 bg-neutral-800 bg-opacity-0 justify-center items-center gap-2.5 inline-flex border-b-2 border-black'>
            <div className='w-[17px] h-[17px] relative'>
              <div className='w-[15.79px] h-3.5 left-[0.61px] top-[2.43px] absolute'>
                <FromComputerIcon />
              </div>
            </div>
            <div className='text-center text-neutral-900 text-sm font-medium font-creato-medium leading-normal tracking-wide'>
              From Computer
            </div>
          </div>
          {/* from cloud button */}
          <div className='flex-1 h-10 px-3 py-1 opacity-50 bg-neutral-800 bg-opacity-0 justify-center items-center gap-2.5 inline-flex'>
            <div className='w-[17px] h-[17px] relative'>
              <div className='w-[15.79px] h-[15.79px] left-[0.61px] top-[0.60px] absolute'>
                <FromCloudIcon></FromCloudIcon>
              </div>
            </div>
            <div className='text-center text-neutral-900 text-sm font-normal font-creato-medium leading-normal tracking-wide'>
              From Cloud
            </div>
          </div>
        </div>
        {/* cancel button */}
        <div className='w-[68.48px] h-7 px-[7.40px] py-[2.47px] left-[20px] top-[516px] absolute rounded-[4.94px] border-2 border-zinc-800 justify-center items-center gap-[6.17px] inline-flex'>
          <div
            className='text-center text-zinc-800 text-sm font-medium font-creato-medium leading-[14.81px] tracking-wide cursor-pointer'
            onClick={closeModal}
          >
            Cancel
          </div>
        </div>
        {/* continue button */}
        <div className='w-[80.81px] h-7 px-[7.40px] py-[2.47px] left-[440px] top-[516px] absolute bg-zinc-600 rounded-[4.94px] justify-center items-center gap-[6.17px] inline-flex'>
          <div className='text-center text-zinc-100 text-sm font-medium font-creato-medium leading-[14.81px] tracking-wide'>
            Continue
          </div>
        </div>
        {/* File upload area */}
        <div className='w-[478px] h-[20rem] bg-gray-200 rounded-lg border border-gray-400 flex flex-col items-center justify-center'>
          {' '}
          {/* select local file button */}
          <div className='mt-auto px-5 py-1.5 bg-indigo-500 rounded-[70px] justify-center items-center gap-5 inline-flex'>
            {/* <NewFileUploadButton
              onFileSelected={onFileSelected}
            ></NewFileUploadButton> */}
            <div className='text-zinc-100 text-sm font-medium font-creato-medium leading-tight tracking-tight'>
              Select Local File
            </div>
          </div>
          <div className='w-[334.50px] h-[29.16px] text-center text-blue-700 text-[15px] font-medium font-creato-medium leading-tight tracking-tight'>
            or drop here
          </div>
          {/* Select Local file explanation text */}
          <div className='w-[336px] h-8 text-center mt-auto'>
            <span className='text-slate-500 text-sm font-normal font-creato-medium leading-normal tracking-tight'>
              PDF, TXT, DOCX, PNG, JPG, JPEG{' '}
            </span>
            <span className='text-neutral-300 text-sm font-normal font-creato-medium leading-normal tracking-tight'>
              I
            </span>
            <span className='text-slate-500 text-sm font-normal font-creato-medium leading-normal tracking-tight'>
              {' '}
              16MB Maximum
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadToLibraryWindow
