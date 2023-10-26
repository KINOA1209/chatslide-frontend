'use client'

import React, { useState, useEffect, useRef } from 'react'
import ExportToPDFModal from './exportToPdfModal'
import AuthService from '../utils/AuthService'
import { LoadingIcon } from '@/components/ui/progress'
import { Slide } from './NewSlidesHTML'
import PaywallModal from '../forms/paywallModal'
import mixpanel from 'mixpanel-browser'
import { DownloadIcon } from '@/app/(feature)/icons'
import SlideContainer from './SlideContainer'
import { templateDispatch } from './templateDispatch'
import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf';

type SlidesHTMLProps = {
    finalSlides: Slide[]
    setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>
}

interface ExportToPdfProps {
    finalSlides: Slide[]
    //setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
}

const ExportToPdfButton: React.FC<ExportToPdfProps> = ({ finalSlides }) => {
    const topic = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('topic') : '';
    const [user, setUser] = useState(null)
    const [downloadingPDF, setDownloadingPDF] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const exportSlidesRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);

    const exportOptions: Options = {
        filename: (topic ? topic : 'drlambda') + '.pdf',
        method: "save",
        resolution: Resolution.MEDIUM,
        page: {
            margin: Margin.NONE,
            format: [254, 143], // 960x540 px in mm
            orientation: "landscape"
        },
        canvas: {
            mimeType: "image/jpeg",
            qualityRatio: 1
        },
        overrides: {
            pdf: {
                compress: true
            },
            canvas: {
                useCORS: true,
            }
        }
    };

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
        generatePDF(exportSlidesRef, exportOptions);
    }

    const handleSavePDF = async () => {
        setDownloadingPDF(true)
        const element = document.getElementById('pdf-content')

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();

            mixpanel.track('PDF Downloaded', {
                'Project ID': sessionStorage.getItem('project_id'),
            });

            const response = await fetch('/api/save_final_html_pdf', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok && (typeof window !== "undefined")) {
                exportToPdf();  
            } else if (response.status === 402) {
                setShowPaymentModal(true);
            } else {
                console.error('Failed to save PDF.');
            }
        } catch (error) {
            console.error('An error occurred:', error)
        }
        setDownloadingPDF(false)
    }

    return (
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
                    <ExportToPDFModal />
                ) : (
                    <div
                        className='h-8 px-3 py-1 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer'
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

            {/* hidden div for export to pdf */}
            <div style={{ overflow: 'hidden', height: 0 }} >
                <div
                    ref={exportSlidesRef}>
                    {/* Render all of your slides here. This can be a map of your slides array */}
                    {finalSlides.map((slide, index) => (
                        <div key={index} style={{ pageBreakAfter: 'always' }}>
                            <SlideContainer
                                present={false}
                                slides={finalSlides}
                                currentSlideIndex={index}
                                viewingMode={false}
                                scale={1}
                                templateDispatch={templateDispatch}
                                containerRef={containerRef}
                                slideRef={slideRef}
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
