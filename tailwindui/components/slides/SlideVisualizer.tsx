import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ClickableLink from '@/components/ui/ClickableLink'
import { Slide } from '@/components/slides/SlidesHTML'
import ExportToPdfButton from './exportToPdfButton'
import dynamic from 'next/dynamic'
import { ShareToggleButton } from '@/components/slides/SlideButtons'
import AuthService from '../../services/AuthService'
import ScriptEditor from './ScriptEditor'
import { TextLabel } from '../ui/GrayLabel'

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
  ssr: false,
})

type SlideVisualizerProps = {
  isGpt35: boolean
  isSubmitting: boolean
  setIsSubmitting: (isSubmitting: boolean) => void
}

const SlideVisualizer: React.FC<SlideVisualizerProps> = ({
  isGpt35,
  isSubmitting,
  setIsSubmitting,
}) => {
  const [host, setHost] = useState('https://drlambda.ai')

  const [slides, setSlides] = useState<Slide[]>([])
  const [share, setShare] = useState(false)

  // script data
  const transcriptData =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('transcripts')
      : null
  const transcripts = transcriptData ? JSON.parse(transcriptData) : []
  const [transcriptList, setTranscriptList] = useState<string[]>(transcripts)
  const exportSlidesRef = useRef<HTMLDivElement>(null)

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
      json_list: slides,
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
        setTranscriptList(resp.data.res)
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
    <div className='flex flex-col justify-center items-center gap-4 my-4'>
      {/* buttons: export and scripts and share slides */}
      <div className='flex flex-row justify-end items-center'>
        <ExportToPdfButton slides={slides} exportSlidesRef={exportSlidesRef} />
        <ShareToggleButton setShare={setShare} share={share} />
      </div>
      {/* shareable link */}
      {share && (
        <div className='w-[100] md:w-[40rem] flex-grow'>
          <TextLabel>View only link:</TextLabel>
          <ClickableLink
            link={`${host}/shared/${sessionStorage.getItem('project_id')}`}
          />
        </div>
      )}

      {/* slides and scripts contents */}
      <SlidesHTML
        slides={slides}
        setSlides={setSlides}
        transcriptList={transcriptList}
        setTranscriptList={setTranscriptList}
        exportSlidesRef={exportSlidesRef}
      />

    </div>
  )
}

export default SlideVisualizer
