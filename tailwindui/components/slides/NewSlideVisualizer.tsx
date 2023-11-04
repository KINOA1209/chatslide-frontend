import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ClickableLink from '@/components/ui/ClickableLink'
import { Slide } from '@/components/slides/NewSlidesHTML'
import ExportToPdfButton from './exportToPdfButton'
import dynamic from 'next/dynamic'
import { ScriptsIcon } from '@/app/(feature)/icons'
import { ShareSlidesIcon } from '@/app/(feature)/workflow-review-slides/icons'
import { ShareToggleButton } from '@/components/slides/SlideButtons'
import UserService from '../utils/UserService'
import TranscriptForm from '@/components/forms/newTranscriptForm'
import PreviousTranscriptForm from '@/components/forms/transcriptForm'
import Timer from '@/components/ui/Timer'

const SlidesHTML = dynamic(() => import('@/components/slides/NewSlidesHTML'), {
  ssr: false,
})

const SlideVisualizer = ({ isGpt35 }: { isGpt35: boolean }) => {
  const [host, setHost] = useState('https://drlambda.ai')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const [finalSlides, setFinalSlides] = useState<Slide[]>([])
  const [share, setShare] = useState(false)
  const [isPaidUser, setIsPaidUser] = useState(false)

  useEffect(() => {
    ;(async () => {
      const isPaidUser = await UserService.isPaidUser()
      setIsPaidUser(isPaidUser)
    })()
  }, [])

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
          {/* want some more script Form submission */}
          <TranscriptForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            finalSlides={finalSlides}
            isGpt35={isGpt35}
          />
          <ExportToPdfButton finalSlides={finalSlides} />
          <ShareToggleButton setShare={setShare} share={share} />
        </div>
        {/* Timer */}
        <Timer expectedSeconds={60} isSubmitting={isSubmitting} />
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

        {/* <PreviousTranscriptForm
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          finalSlides={finalSlides}
        /> */}
      </div>
    </div>
  )
}

export default SlideVisualizer
