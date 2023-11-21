'use client'
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SocialPostProjectProgress from '@/components/newWorkflowStepsSocialpost';
import FeedbackButton from '@/components/slides/feedback';
import SocialPostVisualizer from '@/components/socialPost/socialPostVisualizer';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  LeftTurnArrowIcon,
} from '@/app/(feature)/icons'

import { useRouter } from 'next/navigation';
import WorkflowStepsBanner from '@/components/socialPost/socialPostWorkflowStep';

export default function SocialMediaTemplate() {
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)
  return (
    <section>
      <div className='bg-[#E7E9EB]'>
        {/* flex col container for steps, title, etc */}
        <WorkflowStepsBanner
          currentIndex={1}
          isSubmitting={false}
          setIsSubmitting={() => { }}
          isPaidUser={true}
          contentRef={contentRef}
          nextIsPaidFeature={false}
          showGPTToggle={false}
          setIsGpt35={() => { }}
          nextText={'Next'}
          showNextButton={false}
        />

        <ToastContainer enableMultiContainer containerId={'slides'} />

        <div className='mt-[1rem] max-w-4xl mx-auto px-6' ref={contentRef}>
          <SocialPostVisualizer />
        </div>
        <FeedbackButton timeout={30000} />
      </div>
    </section>
  )
}