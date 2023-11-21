import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ClickableLink from '@/components/ui/ClickableLink'
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML'
import ExportToPdfButton from '@/components/socialPost/socialPostPdfButton'
import dynamic from 'next/dynamic'
import { ShareSlidesIcon } from '@/app/(feature)/workflow-review-slides/icons'
import { ShareToggleButton } from '@/components/slides/SlideButtons'
import UserService from '../utils/UserService'
import ExportToPngButton from '@/components/socialPost/socialPostPngButton'

const SocialPostHTML = dynamic(() => import('@/components/socialPost/socialPostHTML'), { ssr: false })


const SocialPostVisualizer = () => {
    const [host, setHost] = useState('https://drlambda.ai')
    const [finalSlides, setFinalSlides] = useState<SocialPostSlide[]>([])
    const [share, setShare] = useState(false)
    const [isPaidUser, setIsPaidUser] = useState(false);
    const [finalSlideIndex, setFinalSlideIndex] = useState<number>(0)
    const res_scenario =
    typeof sessionStorage !== 'undefined'
    ? sessionStorage.getItem('selectedScenario')
    : ''

    useEffect(() => {
        (async () => {
            const isPaidUser = await UserService.isPaidUser();
            setIsPaidUser(isPaidUser);
        })();
    }, []);

    useEffect(() => {
        setShare(sessionStorage.getItem('is_shared') === 'true')
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
                {/* slides contents */}
                <div className='flex flex-row justify-end items-center'>
                {/* want some more script Form submission */}
                <ExportToPngButton finalSlides={finalSlides} currentSlideIndex={finalSlideIndex}/>
                </div>
                <SocialPostHTML 
                    finalSlides={finalSlides} 
                    setFinalSlides={setFinalSlides} 
                    finalSlideIndex={finalSlideIndex} 
                    setFinalSlideIndex={setFinalSlideIndex}
                />
            </div>
        </div>
    )
}

export default SocialPostVisualizer