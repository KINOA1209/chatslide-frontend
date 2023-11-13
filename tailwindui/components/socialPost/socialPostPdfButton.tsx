'use client'

import React, { useState, useEffect, useRef } from 'react'
import ExportToPDFModal from '@/components/socialPost/socialPostPdfModal'
import AuthService from '../utils/AuthService'
import { LoadingIcon } from '@/components/ui/progress'
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML'
import PaywallModal from '../forms/paywallModal'
import { DownloadIcon } from '@/app/(feature)/icons'
import SocialPostContainer from '@/components/socialPost/socialPostContainer'
import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf'

type SlidesHTMLProps = {
  finalSlides: SocialPostSlide[]
  setFinalSlides: React.Dispatch<React.SetStateAction<SocialPostSlide[]>>
}

interface ExportToPdfProps {
  finalSlides: SocialPostSlide[]
  //setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
}

const ExportToPdfButton: React.FC<ExportToPdfProps> = ({ finalSlides }) => {
  const topic =
    typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('topic') : ''
  const [user, setUser] = useState(null)
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const exportSlidesRef = useRef<HTMLDivElement>(null)
  let pdfIsBeingGenerated = false

  const exportOptions: Options = {
    filename: (topic ? topic : 'drlambda') + '.pdf',
    method: 'save',
    resolution: Resolution.MEDIUM,
    page: {
      margin: Margin.NONE,
      format: [119.0625, 158.75], // 450x600 px in mm
      orientation: 'portrait',
    },
    canvas: {
      mimeType: 'image/jpeg',
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: false,
      },
      canvas: {
        useCORS: true,
      },
    },
  }

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

  function exportToPdf() {
    generatePDF(exportSlidesRef, exportOptions)
  }

  const handleSavePDF = async () => {
    setDownloadingPDF(true)
    const element = document.getElementById('pdf-content')

    try {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()

      const response = await fetch('/api/save_final_html_pdf', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        exportToPdf()
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
    <div className='flex flex-wrap flex-grow-0'>
      <div className='px-3'>
        {showPaymentModal && (
          <PaywallModal
            setShowModal={setShowPaymentModal}
            message='Upgrade for more ⭐️credits.'
          />
        )}

        
        <div
            className='h-8 px-3 py-1 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 cursor-pointer hidden sm:flex'
            onClick={handleSavePDF}
        >
            <div className='text-center text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-wide'>
                Export to PDF (10⭐️)
            </div>
            <div className='w-4 h-4 relative' hidden={downloadingPDF}>
                <DownloadIcon />
            </div>
            <div className='text-black h-[22px] mr-2' hidden={!downloadingPDF}>
                <LoadingIcon />
            </div>
        </div>
      </div>

      {/* hidden div for export to pdf */}
      <div style={{ display: downloadingPDF ? 'block' : 'none', zIndex: -1 }}>
        <div ref={exportSlidesRef}>
          {/* Render all of your slides here. This can be a map of your slides array */}
          {finalSlides.map((slide, index) => (
            <div key={`exportToPdfContainer` + index.toString()} style={{ pageBreakAfter: 'always' }}>
              <SocialPostContainer
                slides={finalSlides}
                currentSlideIndex={index}
                exportToPdfMode={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExportToPdfButton
