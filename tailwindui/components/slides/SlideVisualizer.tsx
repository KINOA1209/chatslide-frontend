import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ClickableLink from '@/components/ui/ClickableLink'
import { Slide } from '@/components/slides/SlidesHTML'
import ExportToPdfButton from './exportToPdfButton'
import dynamic from 'next/dynamic'
import { ShareToggleButton } from '@/components/slides/SlideButtons'
import UserService from '../../services/UserService'
import AuthService from '../../services/AuthService'
import { useRouter } from 'next/navigation'

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
  ssr: false,
})

type SlideVisualizerProps = {
  isGpt35: boolean
  isSubmitting: boolean
  setIsSubmitting: (isSubmitting: boolean) => void
  transcriptList?: string[]
}

const SlideVisualizer: React.FC<SlideVisualizerProps> = ({
  isGpt35,
  isSubmitting,
  setIsSubmitting,
  transcriptList = [],
}) => {
  const [host, setHost] = useState('https://drlambda.ai')

  const [finalSlides, setFinalSlides] = useState<Slide[]>([])
  const [share, setShare] = useState(false)
  const [isPaidUser, setIsPaidUser] = useState(false)
  const router = useRouter()

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

  async function handleSubmitTranscript() {
    console.log('submitting')

    const html_filename = 'html_init.html'
    const foldername =
      typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('foldername')
        : null
    const topic =
      typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('topic')
        : null
    const language =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('language')
        : 'English'

    const project_id =
      typeof window !== 'undefined' ? sessionStorage.getItem('project_id') : ''
    const formData = {
      html_filename: html_filename,
      foldername: foldername,
      topic: topic,
      project_id: project_id,
      language: language,
      json_list: finalSlides,
      model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
    }

    try {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()

      const response = await fetch('/api/transcript_json', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const resp = await response.json()
        setIsSubmitting(false)
        console.log(resp.data.res)
        sessionStorage.setItem('transcripts', JSON.stringify(resp.data.res))
        sessionStorage.setItem(
          'image_files',
          JSON.stringify(resp.data.image_files)
        )
        // Redirect to a new page with the data
        router.push('/workflow-edit-script')
      } else {
        alert('Request failed: ' + response.status)
        console.log(response)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isSubmitting) {
      handleSubmitTranscript()
    }
  }, [isSubmitting])

  return (
    <div>
      <div className='px-4 sm:px-6 flex flex-col justify-center items-center gap-4'>
        {/* buttons: export and scripts and share slides */}
        <div className='flex flex-row justify-end items-center'>
          {/* want some more script Form submission */}
          <ExportToPdfButton finalSlides={finalSlides} />
          <ShareToggleButton setShare={setShare} share={share} />
        </div>
        {/* Timer */}
        {/* <Timer expectedSeconds={60} isSubmitting={isSubmitting} /> */}
        {/* shareable link */}
        {share && (
          <div className='w-[40rem] flex-grow'>
            <label className='text-sm text-zinc-100'>View only link:</label>
            <ClickableLink
              link={`${host}/shared/${sessionStorage.getItem('project_id')}`}
            />
          </div>
        )}
        {/* slides contents */}
        <SlidesHTML finalSlides={finalSlides} setFinalSlides={setFinalSlides} transcriptList={transcriptList} />

      </div>
    </div>
  )
}

export default SlideVisualizer
