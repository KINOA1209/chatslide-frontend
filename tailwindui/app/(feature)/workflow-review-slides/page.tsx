'use client'

import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ProjectProgress from '@/components/newWorkflowSteps'
import FeedbackForm from '@/components/slides/feedback'
import SlideVisualizer from '@/components/slides/NewSlideVisualizer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  DownloadIcon,
  LeftTurnArrowIcon,
  PresentationModeIcon,
  ChangeLayoutIcon,
  AddSlideIcon,
  DeleteSlideIcon,
} from '../icons'

import { useRouter } from 'next/navigation'

export default function WorkflowStep3() {
  const router = useRouter()
  const slide_files =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('slide_files') || []
      : []
  const contentRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState<boolean>(false)

  // State variable to track whether the timer has finished
  const [timerFinished, setTimerFinished] = useState(false)

  // Timer completion handler
  const handleTimerCompletion = () => {
    setTimerFinished(true)
  }

  // Start the timer when the component mounts
  useEffect(() => {
    const timer = setTimeout(handleTimerCompletion, 30000) // 30 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer)
  }, [])

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  // Check if the timer has finished before opening the modal
  useEffect(() => {
    if (timerFinished && window.location.hostname !== 'localhost') {
      handleOpenModal()
    }
  }, [timerFinished])

  useEffect(() => {
    const signed_in =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('signed_in')
        : 'false'
    if (signed_in && signed_in === 'true') {
      toast.success('Sign in successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        containerId: 'slides',
      })
      sessionStorage.removeItem('signed_in')
    }
  }, [])

  return (
    <div className='bg-gradient-to-b from-[#6A7EF9] to-[#415AF1]'>
      {/* flex col container for steps, title, etc */}
      <div className='fixed mt-[3rem] flex flex-col w-full bg-Grey-50 justify-center z-10 gap-1 py-[0.75rem] border-b-2'>
        {/* steps bar */}
        <div className='self-center'>
          <ProjectProgress currentInd={2} contentRef={contentRef} />
        </div>

        {/* flex row container for backlink, title*/}
        <div className='flex justify-start items-center mx-[5rem]'>
          <div
            className='flex flex-row justify-center items-center gap-4 cursor-pointer'
            onClick={() => router.push('/workflow-edit-outlines')}
          >
            <LeftTurnArrowIcon></LeftTurnArrowIcon>
            <div className='text-center self-center text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap'>
              Back to Outline
            </div>
          </div>

          <div className='flex-auto text-center self-center text-neutral-900 text-xl font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap'>
            Enjoy your slides! : )
          </div>

          <div className='w-[9rem]'></div>

          {/* <div className='flex flex-grow'></div> */}
        </div>
      </div>
      {/* <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Review Slides</h1>
            </div> */}

      <ToastContainer enableMultiContainer containerId={'slides'} />

      <div className='mt-[10rem] max-w-4xl mx-auto px-6' ref={contentRef}>
        {/* <p className='px-6'>
          These are the slides generated. To edit content, click on the text to
          reveal the input box.
        </p>
        <br /> */}
        <SlideVisualizer />
      </div>
      <div className='fixed bottom-10 right-10 hidden sm:block'>
        <button
          onClick={handleOpenModal}
          className='bg-gradient-to-r from-blue-600  to-purple-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700'
        >
          Feedback
        </button>

        {showModal && <FeedbackForm onClose={handleCloseModal} />}
      </div>
    </div>
  )
}
