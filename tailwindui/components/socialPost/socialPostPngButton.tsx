'use client'

import React, { useState, useEffect, useRef } from 'react'
import ExportToPDFModal from '@/components/socialPost/socialPostPdfModal'
import AuthService from '../../services/AuthService'
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
import { ThemeObject } from './socialPostThemeChanger'
import { BigGrayButton } from '../button/DrlambdaButton'
import { FaDownload } from 'react-icons/fa'

interface ExportToPdfProps {
}
const ExportToPngButton: React.FC<ExportToPdfProps> = ({
}) => {
  const topic =
    typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('topic') : ''

  const res_scenario =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('scenarioType')
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
    else {
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
      const response = await fetch('/api/export_socialpost', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        await downloadImage(slideRef);
      } else if (response.status === 402) {
        setShowPaymentModal(true)
      } else {
        console.error('Failed to save PNG.')
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
            showReferralLink={true}
          />
        )}

        <BigGrayButton onClick={handleSaveImage} isSubmitting={downloadingPDF}>
          <div className='flex flex-row items-center gap-x-2'>
            Save this page
            <FaDownload className='text-gray-800' />
          </div>
        </BigGrayButton>

      </div>
    </div>
  )
}

export default ExportToPngButton
