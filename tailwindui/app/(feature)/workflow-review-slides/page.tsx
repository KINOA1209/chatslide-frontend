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
  // script data
  const transcriptData =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('transcripts')
      : null
  const transcripts = transcriptData ? JSON.parse(transcriptData) : []
  const [transcriptList, setTranscriptList] = useState<string[]>(transcripts)
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [isGpt35, setIsGpt35] = useState(typeof sessionStorage !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('isGpt35') || 'true')
    : true)

  useEffect(() => {
    ; (async () => {
      const isPaidUser = await UserService.isPaidUser()
      setIsPaidUser(isPaidUser)
    })()
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className='min-h-[90vh] bg-gradient-to-b from-[#6A7EF9] to-[#415AF1]'>
      {/* flex col container for steps, title, etc */}
      
      <WorkflowStepsBanner 
        currentIndex={2} 
        isSubmitting={isSubmitting} 
        setIsSubmitting={setIsSubmitting} 
        isPaidUser={isPaidUser} 
        contentRef={contentRef} 
        nextIsPaidFeature={true} 
        nextText={!isSubmitting? 'Next' : 'Writing Scripts'}
        showGPTToggle={true}
        setIsGpt35={setIsGpt35}
      />

      <ToastContainer enableMultiContainer containerId={'slides'} />

      <div
        className={`mt-[2rem] max-w-4xl px-6 flex flex-col relative mx-auto`}
        ref={contentRef}
      >
        {/* slides */}
        <SlideVisualizer isGpt35={isGpt35} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} transcriptList={transcriptList}/>

      </div>

      <FeedbackButton timeout={30000} />

    </div>
  )
}
