'use client'

import React, { useState, useEffect, useRef } from 'react'
import SavePDFModal from './savePDFModal'
import AuthService from '../utils/AuthService'
import { LoadingIcon } from '@/components/ui/progress'
import { SlideElement, Slide } from '../SlidesHTML'
import PaywallModal from './paywallModal'
import mixpanel from 'mixpanel-browser'
import { DownloadIcon } from '@/app/(feature)/icons'

type SlidesHTMLProps = {
  finalSlides: Slide[]
  setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>
}

interface SaveToPdfHtmlProps {
  finalSlides: Slide[]
  //setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
}

const SaveToPdfHtml: React.FC<SaveToPdfHtmlProps> = ({ finalSlides }) => {
  const [user, setUser] = useState(null)
  const [downloadingPDF, setDownloadingPDF] = useState(false)
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

  const handleSavePDF = async () => {
    setDownloadingPDF(true)
    const element = document.getElementById('pdf-content')

    try {
      //call api to save the html first
      const foldername =
        typeof sessionStorage !== 'undefined'
          ? sessionStorage.getItem('foldername')
          : ''
      const formData = {
        foldername: foldername,
        html: finalSlides,
      }
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()

      mixpanel.track('PDF Downloaded', {
        'Project ID': sessionStorage.getItem('project_id'),
      })

      const response = await fetch('/api/save_final_html_pdf', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok && typeof window !== 'undefined') {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const topic =
          typeof sessionStorage !== 'undefined'
            ? sessionStorage.getItem('topic')
            : ''
        a.download = `${topic}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        console.log('PDF saved successfully.')
      } else if (response.status === 402) {
        setShowPaymentModal(true)
      } else {
        console.error('Failed to save PDF.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
    setDownloadingPDF(false)
  }

  return (
    // <div className=''>
    <div className='flex flex-wrap'>
      <div className='w-full px-3'>
        {showPaymentModal && (
          <PaywallModal
            setShowModal={setShowPaymentModal}
            message='Upgrade for more ⭐️credits.'
          />
        )}

        {!user ? (
          // insert here
          <SavePDFModal />
        ) : (
          // <button
          //   className='btn text-blue-600 bg-gray-100 hover:bg-gray-200 w-full border border-blue-600 disabled:from-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0'
          //   onClick={handleSavePDF}
          //   disabled={downloadingPDF}
          // >
          //   <div
          //     className='text-black h-[22px] mr-2'
          //     hidden={!downloadingPDF}
          //   >
          //     <LoadingIcon />
          //   </div>
          //   Save as PDF (10 ⭐️)
          // </button>
          <div
            className='h-8 px-3 py-1 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 inline-flex'
            onClick={handleSavePDF}
          >
            <div className='text-center text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-wide'>
              Export to PDF
            </div>
            <div className='w-4 h-4 relative' hidden={downloadingPDF}>
              <DownloadIcon />
            </div>
            <div className='text-black h-[22px] mr-2' hidden={!downloadingPDF}>
              <LoadingIcon />
            </div>
          </div>
        )}
      </div>
    </div>
    // </div>
  )
}

export default SaveToPdfHtml
