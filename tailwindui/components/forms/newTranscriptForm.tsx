import { useRouter } from 'next/navigation'
import React, { useState, useEffect, FormEvent, use } from 'react'

import AuthService from '../utils/AuthService'

import { Slide } from '@/components/slides/NewSlidesHTML'
import UserService from '../utils/UserService'
import GptToggle from '../button/GPTToggle'
import PaywallModal from './paywallModal'
import mixpanel from 'mixpanel-browser'
import { ScriptsIcon } from '@/app/(feature)/icons'

interface TranscriptFormProps {
  isSubmitting: boolean
  setIsSubmitting: (isSubmitting: boolean) => void
  finalSlides: Slide[]
  isGpt35: boolean
}

const TranscriptForm: React.FC<TranscriptFormProps> = ({
  finalSlides,
  isSubmitting,
  setIsSubmitting,
  isGpt35,
}) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isPaid, setIsPaid] = useState(false)
  //   const [isGpt35, setIsGpt35] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  useEffect(() => {
    // Create a scoped async function within the hook.
    const fetchUser = async () => {
      const user = await AuthService.getCurrentUser()
      if (user) {
        setUser(user)
      }
    }
    // Execute the created function directly
    fetchUser()
  }, [])

  useEffect(() => {
    ;(async () => {
      const paid = await UserService.isPaidUser()
      setIsPaid(paid)
    })()
  }, [])

  const handleSubscribeOnclick = () => {
    setShowPaymentModal(true)
  }

  const handleSubmitTranscript = async (event: FormEvent<HTMLFormElement>) => {
    // console.log('submitting');
    event.preventDefault()

    setIsSubmitting(true)
    console.log('isSubmitting', isSubmitting)

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
      html: finalSlides,
      model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
    }

    // console.log(formData);

    try {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()

      // mixpanel.track('Script Generated', {
      //     'Project ID': sessionStorage.getItem('project_id'),
      //     'Language': language,
      // });

      const response = await fetch('/api/transcript_html', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // console.log(response);

      if (response.ok) {
        const resp = await response.json()
        setIsSubmitting(false)
        // Store the data in local storage
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

  return (
    <div className='mx-auto'>
      {/* want some scripts? */}
      {showPaymentModal && (
        <PaywallModal
          setShowModal={setShowPaymentModal}
          message='Upgrade to unlock more features. 🚀'
        />
      )}
      <form onSubmit={handleSubmitTranscript}>
        {!isPaid ? (
          <>
            <div
              className='h-8 px-3 py-1 bg-zinc-100 rounded-lg flex justify-center items-center gap-2.5 cursor-pointer'
              onClick={handleSubscribeOnclick}
            >
              <div className='flex items-center overflow-hidden'>
                <div className='text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-wide whitespace-nowrap overflow-hidden text-ellipsis'>
                  🔒 Subscribe to Generate Script
                </div>
              </div>
              <div className='w-5 h-5 relative'>
                <ScriptsIcon />
              </div>
            </div>
          </>
        ) : (
          <div className='h-8 px-3 py-1 bg-zinc-100 rounded-lg flex justify-center items-center gap-2.5 cursor-pointer'>
            <div className='flex items-center overflow-hidden'>
              {isSubmitting ? (
                'Generating...'
              ) : (
                <div className='text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-wide whitespace-nowrap overflow-hidden text-ellipsis'>
                  {isPaid ? '🚀' : '🔒'} Want some scripts?{' '}
                  <span className='text-blue-700 text-sm font-medium font-creato-medium leading-normal tracking-wide'>
                    (10 credits)
                  </span>
                </div>
              )}
            </div>
            <div className='w-5 h-5 relative'>
              <ScriptsIcon />
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default TranscriptForm
