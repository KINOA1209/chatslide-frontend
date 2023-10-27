import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ClickableLink from '@/components/ui/ClickableLink'
import { Slide } from '@/components/slides/NewSlidesHTML'
import ExportToPdfButton from './exportToPdfButton'
import dynamic from 'next/dynamic'
import { ScriptsIcon } from '@/app/(feature)/icons'
import { ShareSlidesIcon } from '@/app/(feature)/workflow-review-slides/icons'
import { ShareToggleButton } from '@/components/slides/SlideButtons'

const SlidesHTML = dynamic(() => import('@/components/slides/NewSlidesHTML'))

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
        <div className='flex flex-row justify-end items-center'>
          {/* want some scripts? */}
          <div className='h-8 px-3 py-1 bg-zinc-100 rounded-lg flex justify-center items-center gap-2.5 cursor-pointer'>
            <div className='flex items-center overflow-hidden'>
              <div className='text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-wide whitespace-nowrap overflow-hidden text-ellipsis'>
                Want some scripts? (10⭐️)
              </div>
            </div>
            <div className='w-5 h-5 relative'>
              <ScriptsIcon />
            </div>
          </div>
          <ExportToPdfButton finalSlides={finalSlides} />
          <ShareToggleButton setShare={setShare} share={share} />
        </div>

        {/* shareable link */}
        {share && (
          <div className='w-fit flex-grow'>
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
