'use client'

import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ProjectProgress from '@/components/newWorkflowSteps'
import FeedbackButton from '@/components/slides/feedback'
import SlideVisualizer from '@/components/slides/NewSlideVisualizer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LeftTurnArrowIcon } from '../icons'
import { ScriptEditIcon } from './icons'
import { useRouter } from 'next/navigation'
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation'

export default function WorkflowStep3() {
  const router = useRouter()
  const slide_files =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('slide_files') || []
      : []
  const contentRef = useRef<HTMLDivElement>(null)
  // fetch isGpt35 from sessionStorage
  const isGpt35 =
    typeof sessionStorage !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('isGpt35') || 'true')
      : true
  // script data
  const transcriptData =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('transcripts')
      : null
  const transcripts = transcriptData ? JSON.parse(transcriptData) : []
  const [transcriptList, setTranscriptList] = useState<string[]>(transcripts)
  // const [transcriptList, setTranscriptList] = useState(null)

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

      <div
        className={`mt-[10rem] max-w-4xl ${
          transcriptList !== null && transcriptList.length > 0
            ? 'max-w-7xl'
            : ''
        } px-6 flex flex-row relative mx-auto`}
        ref={contentRef}
      >
        {/* <p className='px-6'>
          These are the slides generated. To edit content, click on the text to
          reveal the input box.
        </p>
        <br /> */}
        <SlideVisualizer isGpt35={isGpt35} />
        {/* scriptlist textbox */}
        {transcriptList !== null && transcriptList.length > 0 && (
          <div className='w-72 h-[540px] absolute top-[48px] -right-[10%] bg-zinc-100 rounded-md flex flex-col overflow-y-auto'>
            <div className='px-4 py-2 h-8 bg-zinc-100 flex flex-row justify-between items-center sticky top-0 border-b-2 border-gray-300'>
              <div className=' text-neutral-900 text-xs font-bold font-creato-medium leading-snug tracking-tight '>
                Script
              </div>
              <div
                className='cursor-pointer'
                onClick={() => router.push('/workflow-edit-script')}
              >
                <ButtonWithExplanation
                  button={<ScriptEditIcon />}
                  explanation='Edit Script'
                />
              </div>
            </div>
            <div className='flex flex-col gap-4 '>
              {transcriptList.map((item, index) => (
                <div
                  key={index} // Make sure to provide a unique key
                  className='px-4 py-2 w-full text-gray-700 text-xs font-normal font-creato-medium leading-[1.125rem] tracking-[0.015rem]'
                >
                  "{item}"
                  {/* Insert the content of each transcriptList item here */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* {transcriptList !== null && transcriptList.length > 0 && (
        <div className='w-72 h-96 relative bg-zinc-100 rounded-md'>
          <div className="w-60 left-[17px] top-[50px] absolute text-gray-700 text-xs font-normal font-['Creato Display'] leading-none tracking-tight">
            “ Welcome to 'Tropical Plants 101.' From the luscious rainforests to
            the coastal shores of the tropics, today, we're diving deep into the
            world of tropical plants."
          </div>
          <div className="w-60 left-[17px] top-[138px] absolute text-gray-700 text-xs font-normal font-['Creato Display'] leading-none tracking-tight">
            “ Welcome to 'Tropical Plants 101.' From the luscious rainforests to
            the coastal shores of the tropics, today, we're diving deep into the
            world of tropical plants."
          </div>
          <div className="w-60 left-[17px] top-[226px] absolute text-gray-700 text-xs font-normal font-['Creato Display'] leading-none tracking-tight">
            “ Welcome to 'Tropical Plants 101.' From the luscious rainforests to
            the coastal shores of the tropics, today, we're diving deep into the
            world of tropical plants."
          </div>
          <div className="w-60 left-[17px] top-[314px] absolute text-gray-700 text-xs font-normal font-['Creato Display'] leading-none tracking-tight">
            “ Welcome to 'Tropical Plants 101.' From the luscious rainforests to
            the coastal shores of the tropics, today, we're diving deep into the
            world of tropical plants."
          </div>
          <div className="w-60 left-[17px] top-[402px] absolute text-gray-700 text-xs font-normal font-['Creato Display'] leading-none tracking-tight">
            “ Welcome to 'Tropical Plants 101.' From the luscious rainforests to
            the coastal shores of the tropics, today, we're diving deep into the
            world of tropical plants."
          </div>
          <div className='w-96 h-9 left-0 top-0 absolute'>
            <div className='w-96 h-8 left-0 top-0 absolute bg-zinc-100' />
            <div className="w-14 h-7 left-[9.66px] top-[6.04px] absolute text-neutral-900 text-xs font-bold font-['Creato Display'] leading-snug tracking-tight">
              Script
            </div>
          </div>
        </div>
      )} */}


      <FeedbackButton timeout={30000} />

    </div>
  )
}
