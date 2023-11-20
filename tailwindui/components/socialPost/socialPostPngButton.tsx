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
import { templateDispatch as defaultTemplateDispatch } from '@/components/socialPost/socialPostTemplateDispatch';
import { templateDispatch as defaultTemplateDispatch2 } from '@/components/socialPost//socialPostTemplate2Dispatch';
import { templateDispatch as defaultTemplateDispatch3 } from '@/components/socialPost/socialPostTemplate3Dispatch';
import html2canvas from 'html2canvas'
import { toPng } from 'html-to-image';

interface ExportToPdfProps {
  finalSlides: SocialPostSlide[]
  currentSlideIndex: number
  //setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
}
const ExportToPngButton: React.FC<ExportToPdfProps> = ({ finalSlides, currentSlideIndex }) => {
  const topic =
    typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('topic') : ''

const res_scenario =
    typeof sessionStorage !== 'undefined'
    ? sessionStorage.getItem('selectedScenario')
    : ''
  const [user, setUser] = useState(null)
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const exportSlidesRef = useRef<HTMLDivElement>(null)
  const [slideRef, setSlideRef] = useState(React.createRef<HTMLDivElement>());
  let pdfIsBeingGenerated = false

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

  const areAllImagesLoaded = (container: HTMLElement) => {
    const images = container.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        if (!images[i].complete || images[i].naturalWidth === 0) {
            return false;
        }
    }
    return true;
};

  const downloadImage = async (ref: React.RefObject<HTMLDivElement>): Promise<void> => {
    if (ref.current && areAllImagesLoaded(ref.current)) {
        try {
            const dataUrl = await toPng(ref.current);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = (topic ? topic : 'drlambda') + '.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error capturing image:', error);
        }
    }
    else{
        console.log('Waiting for images to load')
    }
};

  function selectTemplateDispatch() {
    switch (res_scenario) {
      case 'casual_topic':
        return defaultTemplateDispatch;
      case 'serious_subject':
        return defaultTemplateDispatch2;
      case 'reading_notes':
        return defaultTemplateDispatch3;
      default:
        return defaultTemplateDispatch; 
    }
  }

  const handleSaveImage = async () => {
    setDownloadingPDF(true)

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
        downloadImage(slideRef)
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
            onClick={handleSaveImage}
        >
            <div className='text-center text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-wide'>
                Export to PNG (Current Page)
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
            <div key={`exportToPdfContainer` + currentSlideIndex.toString()}>
              <SocialPostContainer
                slides={finalSlides}
                currentSlideIndex={currentSlideIndex}
                exportToPdfMode={true}
                templateDispatch={selectTemplateDispatch()}
                slideRef={slideRef}
                onSlideRefUpdate={setSlideRef}
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ExportToPngButton
