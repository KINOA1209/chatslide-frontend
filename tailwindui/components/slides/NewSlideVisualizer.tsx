import React, { useState, useEffect, useRef } from 'react'
import TranscriptForm from '@/components/forms/transcriptForm'
import Timer from '@/components/ui/Timer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClickableLink from '@/components/ui/ClickableLink'
//import SlidesHTML from '@/components/SlidesHTML';
//import SaveToPdfHtml from '@/components/forms/saveToPdfHtml';
import { SlideElement, Slide } from '@/components/SlidesHTML'
import dynamic from 'next/dynamic'
import {
  PresentationModeIcon,
  ChangeLayoutIcon,
  AddSlideIcon,
  DeleteSlideIcon,
  ScriptsIcon,
} from '@/app/(feature)/icons'
import { ShareSlidesIcon } from '@/app/(feature)/workflow-review-slides/icons'
import { ShareToggleButton } from '@/components/slides/SlideButtons'

const SlidesHTML = dynamic(() => import('@/components/NewSlidesHTML'))
const SaveToPdfHtml = dynamic(
  () => import('@/components/forms/newSaveToPdfHtml')
)

// const SlidesHTML = dynamic(
//     () => import('@/components/SlidesHTML'),
//     { ssr: false }
// )

// const SaveToPdfHtml = dynamic(
//     () => import('@/components/forms/saveToPdfHtml'),
//     { ssr: false }
// )

const SlideVisualizer = () => {
  const [host, setHost] = useState('https://drlambda.ai')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const [finalSlides, setFinalSlides] = useState<Slide[]>([])
  const [share, setShare] = useState(false)

  useEffect(() => {
    setShare(sessionStorage.getItem('is_shared') === 'true')
    // console.log('share', sessionStorage.getItem('is_shared'));
  }, [])

  useEffect(() => {
    if (
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      setHost('https://' + window.location.hostname)
    } else {
      setHost(window.location.hostname)
    }
  }, [])

  return (
    <div>
      <div className='px-4 sm:px-6 flex flex-col justify-center items-center gap-4'>
        {/* buttons: export and scripts and share slides */}
        <div className='flex flex-row justify-end items-center gap-4 self-end'>
          {/* want some scripts? */}
          <div className='w-72 h-8 px-3 py-1 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer'>
            <div className='text-center'>
              <span className='text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-wide'>
                {' '}
                Want some scripts?{' '}
              </span>
              <span className='text-blue-700 text-sm font-medium font-creato-medium leading-normal tracking-wide'>
                (10 credits)
              </span>
            </div>
            <div className='w-5 h-5 relative'>
              <ScriptsIcon />
            </div>
          </div>
          {/* export to pdf */}
          <SaveToPdfHtml finalSlides={finalSlides} />
          {/* share slides */}
          <ShareToggleButton setShare={setShare} share={share} />
        </div>
        {/* shareable link */}
        {share && (
          <div>
            <label className='text-sm text-zinc-100'>View only link:</label>
            <ClickableLink
              link={`${host}/shared/${sessionStorage.getItem('project_id')}`}
            />
          </div>
        )}
        {/* slides contents */}
        <SlidesHTML finalSlides={finalSlides} setFinalSlides={setFinalSlides} />

        {/* Form */}
        {/* <TranscriptForm
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          finalSlides={finalSlides}
        /> */}

        {/* Timer */}
        {/* <Timer expectedSeconds={60} isSubmitting={isSubmitting} /> */}
      </div>
    </div>
  )
}

export default SlideVisualizer
