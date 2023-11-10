'use client'

import React, { useState, useRef, useEffect, Fragment } from 'react'
import ProjectProgress from '@/components/newWorkflowSteps'
import FeedbackButton from '@/components/slides/feedback'
import 'react-toastify/dist/ReactToastify.css'
import NewOutlineVisualizer from '@/components/outline/NewOutlineVisulizer'
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit'
import {
  AddSectionIcon,
  AddTopicIcon,
  DeleteIcon,
  LeftChangeIcon,
  RightChangeIcon,
  LeftTurnArrowIcon,
  RightTurnArrowIcon,
  QuestionExplainIcon,
} from '../icons'
import NewWorkflowGPTToggle from '@/components/button/NewWorkflowGPTToggle'
import { useRouter } from 'next/navigation'
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner'

interface OutlineSection {
  title: string
  content: string[]
  detailLevel: string
  section_style: string
}

export default function WorkflowStep2() {
  const [activeSection, setActiveSection] = useState(-1)
  const router = useRouter()
  const storedOutline =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('outline')
      : null
  const outline = storedOutline ? JSON.parse(storedOutline) : null
  const outlineRes = outline ? JSON.parse(outline.res) : null
  const contentRef = useRef<HTMLDivElement>(null)
  const [showPopup, setShowPopup] = useState(false) // State for the popup visibility
  const [outlineContent, setOutlineContent] = useState<OutlineSection[] | null>(
    null
  )
  const [isGpt35, setIsGpt35] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  useEffect(() => {
    if (outlineRes) {
      const newOutlineContent = Object.keys(outlineRes).map((key) => {
        return {
          title: outlineRes[key]['title'],
          content: outlineRes[key]['content'],
          detailLevel: outlineRes[key]['detailLevel'],
          section_style: outlineRes[key]['section_style'],
        }
      })
      setOutlineContent(newOutlineContent)
    }
  }, [])

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: number) => {
    const sectionElement = document.getElementById(String(sectionId))
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  // Function to open the popup
  const openPopup = () => {
    setShowPopup(true)
  }

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false)
  }
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     // Calculate the offset due to the fixed navbar's height
  //     // const navbarHeight = 112 // 7rem * 16px/rem

  //     // Scroll to the adjusted position
  //     window.scrollTo(0, 0)
  //   }
  // }, [])
  // initialize a isGpt35 value in session storagee
  //   useEffect(() => {
  //     sessionStorage.setItem('isGpt35', 'true')
  //     console.log('session storage isGpt35', sessionStorage.getItem('isGpt35'))
  //   }, [])
  return (
    <div className=' bg-zinc-100'>
      {/* flex col container for steps, title, generate slides button etc */}
      <WorkflowStepsBanner 
        currentIndex={1} 
        isSubmitting={isSubmitting} 
        setIsSubmitting={setIsSubmitting} 
        isPaidUser={true} 
        contentRef={contentRef} 
        nextIsPaidFeature={false} 
        showGPTToggle={true} 
        setIsGpt35={setIsGpt35} 
        nextText={!isSubmitting? 'Next' : 'Creating Slides'}
      />

      {outlineContent && (
        <GenerateSlidesSubmit outline={outlineContent} isGPT35={isGpt35} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting}/>
      )}

      <div className='mb-[3rem]'>
        {/* overview nav section */}
        <div className='w-1/4 fixed top-[14.5rem] overflow-y-auto flex justify-center'>
          <div className='w-2/3 bg-neutral-50 rounded-md border border-gray-200 hidden sm:block'>
            <div className='h-5 text-neutral-900 text-xs font-bold font-creato-medium leading-tight tracking-wide px-4 py-3'>
              OVERVIEW
            </div>
            <ol className='list-none px-4 py-4'>
              {outlineContent?.map((section, index) => (
                <li
                  className='pb-2 opacity-60 text-neutral-900 text-s font-medium font-creato-medium leading-normal tracking-tight cursor-pointer hover:text-black  hover:rounded-md hover:bg-gray-200'
                  key={index}
                  onClick={() => scrollToSection(index)}
                >
                  <span className=''>
                    {index + 1}. {section.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className='flex justify-end'>
          <div className='w-full sm:w-3/4 gap-10 auto-rows-min'>
            <div className='lg:col-span-2 flex flex-col'>
              {outlineContent && (
                <NewOutlineVisualizer
                  outlineData={outlineContent}
                  setOutlineData={setOutlineContent}
                  isGPT35={isGpt35}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <ProjectProgress currentInd={1} contentRef={contentRef} /> */}
      {/* <div className='pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20'>
        <h1 className='h1'>Edit Outlines</h1>
      </div> */}
      {/* <div className='max-w-4xl mx-auto px-6 pt-[10rem]' ref={contentRef}> */}
      {/* <p>This is the outline generated. You can edit the details below.</p> */}
      {/* <br /> */}

      {/* </div> */}
      {/* feedback from fixed on the page */}
      <FeedbackButton />
    </div>
  )
}
