'use client'

import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ProjectProgress from '@/components/newWorkflowSteps'
import FeedbackButton from '@/components/slides/feedback'
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
            className='flex-row justify-center items-center gap-4 cursor-pointer hidden sm:flex'
            onClick={() => router.push('/workflow-edit-outlines')}
          >
            <LeftTurnArrowIcon></LeftTurnArrowIcon>
            <div className='text-center self-center text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap hidden sm:block'>
              Back to Outline
            </div>
          </div>

          <div className='flex-auto text-center self-center text-neutral-900 text-xl font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap hidden sm:block'>
            Enjoy your slides! : )
          </div>

          <div className='w-[9rem]'></div>

          {/* <div className='flex flex-grow'></div> */}
        </div>

        <div className='flex-auto text-center self-center text-neutral-900 font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap sm:hidden'>
            Use our desktop version to see all the functionalities!
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
      
      <FeedbackButton timer={3000} />
    </div>
  )
}
