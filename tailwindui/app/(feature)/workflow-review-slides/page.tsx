'use client'

import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import FeedbackButton from '@/components/slides/feedback'
import SlideVisualizer from '@/components/slides/NewSlideVisualizer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ScriptEditIcon } from './icons'
import { useRouter } from 'next/navigation'
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation'
import UserService from '@/components/utils/UserService'
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner'

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
  const [isPaidUser, setIsPaidUser] = useState(false);

  useEffect(() => {
    ; (async () => {
      const isPaidUser = await UserService.isPaidUser()
      setIsPaidUser(isPaidUser)
    })()
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className='bg-gradient-to-b from-[#6A7EF9] to-[#415AF1]'>
      {/* flex col container for steps, title, etc */}
      
      <WorkflowStepsBanner currentIndex={2} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} isPaidUser={isPaidUser} contentRef={contentRef} nextIsPaidFeature={true} />

      <ToastContainer enableMultiContainer containerId={'slides'} />

      <div
        className={`mt-[10rem] max-w-4xl ${transcriptList !== null && transcriptList.length > 0
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
        <SlideVisualizer isGpt35={isGpt35} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
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

      <FeedbackButton timeout={30000} />

    </div>
  )
}
