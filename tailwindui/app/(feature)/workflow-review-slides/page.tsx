'use client'

import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import FeedbackButton from '@/components/ui/feedback'
import SlideVisualizer from '@/components/slides/SlideVisualizer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserService from '@/services/UserService'
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner'

export default function WorkflowStep3() {
  const contentRef = useRef<HTMLDivElement>(null)
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
    <div className='min-h-[90vh] w-full bg-white'>
      {/* flex col container for steps, title, etc */}
      
      <WorkflowStepsBanner 
        currentIndex={2} 
        isSubmitting={isSubmitting} 
        setIsSubmitting={setIsSubmitting} 
        isPaidUser={isPaidUser} 
        contentRef={contentRef} 
        nextIsPaidFeature={true} 
        nextText={!isSubmitting? 'Write Scripts' : 'Writing Scripts'}
        showGPTToggle={true}
        setIsGpt35={setIsGpt35}
      />

      <ToastContainer enableMultiContainer containerId={'slides'} />

      <div
        className={`mt-[2rem] max-w-4xl px-6 flex flex-col relative mx-auto`}
        ref={contentRef}
      >
        {/* slides */}
        <SlideVisualizer isGpt35={isGpt35} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting}/>

      </div>

      <FeedbackButton timeout={30000} />

    </div>
  )
}
