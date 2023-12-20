'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML'
import PaywallModal from '../forms/paywallModal'
import SocialPostContainer from '@/components/socialPost/socialPostContainer'
import { templateDispatch as defaultTemplateDispatch } from '@/components/socialPost/socialPostTemplateDispatch';
import { templateDispatch as defaultTemplateDispatch2 } from '@/components/socialPost//socialPostTemplate2Dispatch';
import { templateDispatch as defaultTemplateDispatch3 } from '@/components/socialPost/socialPostTemplate3Dispatch';
import { BigGrayButton } from '../button/DrlambdaButton'
import { FaDownload } from 'react-icons/fa'
import {downloadImage} from '../utils/DownloadImage'

interface ExportToPdfProps {
  socialPostSlide: SocialPostSlide[]
  currentSlideIndex: number
}
const ExportToPngButton: React.FC<ExportToPdfProps> = ({
  socialPostSlide,
  currentSlideIndex,
}) => {
  const topic =
    typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('topic') : ''

  const res_scenario =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('scenarioType')
      : ''
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const exportSlidesRef = useRef<HTMLDivElement>(null)
  const [slideRef, setSlideRef] = useState(React.createRef<HTMLDivElement>());

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
    await downloadImage(topic || '', slideRef);
    setDownloadingPDF(false)
  }

  return (
    <div className='flex flex-wrap flex-grow-0'>
      <div className='px-3'>
        {showPaymentModal && (
          <PaywallModal
            setShowModal={setShowPaymentModal}
            message='Upgrade for more ⭐️credits.'
            showReferralLink={true}
          />
        )}

        <BigGrayButton onClick={handleSaveImage} isSubmitting={downloadingPDF}>
          <div className='flex flex-row items-center gap-x-2'>
            Save this page
            <FaDownload className='text-gray-800' />
          </div>
        </BigGrayButton>

        {/* hidden div for export to pdf */}
        <div className='absolute left-[-9999px] top-[-9999px] -z-1'>
          <div ref={exportSlidesRef}>
            <div key={`exportToPdfContainer` + currentSlideIndex.toString()}>
              <SocialPostContainer
                slides={socialPostSlide}
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
    </div>
  )
}

export default ExportToPngButton
