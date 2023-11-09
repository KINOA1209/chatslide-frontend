'use client'
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SocialPostProjectProgress from '@/components/newWorkflowStepsSocialpost';
import FeedbackButton from '@/components/slides/feedback';
import SocialPostVisualizer from '@/components/socialPost/socialPostVisualizer';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  DownloadIcon,
  LeftTurnArrowIcon,
  PresentationModeIcon,
  ChangeLayoutIcon,
  AddSlideIcon,
  DeleteSlideIcon,
} from '@/app/(feature)/icons'

import { useRouter } from 'next/navigation';

export default function SocialMediaTemplate() {
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)
  return(
    <div className='bg-gradient-to-b from-[#6A7EF9] to-[#415AF1]'>
      {/* flex col container for steps, title, etc */}
      <div className='fixed mt-[3rem] flex flex-col w-full bg-Grey-50 justify-center z-10 gap-1 py-[0.75rem] border-b-2'>
        {/* steps bar */}
        <div className='self-center'>
          <SocialPostProjectProgress currentInd={1} contentRef={contentRef} />
        </div>

        {/* flex row container for backlink, title*/}
        <div className='flex justify-start items-center mx-[5rem]'>
          <div
            className='flex-row justify-center items-center gap-4 cursor-pointer hidden sm:flex'
            onClick={() => router.push('/workflow-generate-socialpost')}
          >
            <LeftTurnArrowIcon></LeftTurnArrowIcon>
            <div className='text-center self-center text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap hidden sm:block'>
              Back to Summary
            </div>
          </div>

          <div className='flex-auto text-center self-center text-neutral-900 text-xl font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap hidden sm:block'>
            Enjoy your posts! : )
          </div>

          <div className='w-[9rem]'></div>
        </div>

        <div className='flex-auto text-center self-center text-neutral-900 font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap sm:hidden'>
            Use our desktop version to see all the functionalities!
        </div>
      </div>

      <ToastContainer enableMultiContainer containerId={'slides'} />

      

      <div className='mt-[10rem] max-w-4xl mx-auto px-6' ref={contentRef}>
        <SocialPostVisualizer />
      </div>
      
    </div>
  )
}