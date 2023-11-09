import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ClickableLink from '@/components/ui/ClickableLink'
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML'
import ExportToPdfButton from '../slides/exportToPdfButton'
import dynamic from 'next/dynamic'
import { ScriptsIcon } from '@/app/(feature)/icons'
import { ShareSlidesIcon } from '@/app/(feature)/workflow-review-slides/icons'
import { ShareToggleButton } from '@/components/slides/SlideButtons'
import UserService from '../utils/UserService'


const SocialPostHTML = dynamic(() => import('@/components/socialPost/socialPostHTML'), { ssr: false })


const SocialPostVisualizer = () => {
    const [host, setHost] = useState('https://drlambda.ai')
    const [finalSlides, setFinalSlides] = useState<SocialPostSlide[]>([])
    const [share, setShare] = useState(false)
    const [isPaidUser, setIsPaidUser] = useState(false);

    useEffect(() => {
        (async () => {
            const isPaidUser = await UserService.isPaidUser();
            setIsPaidUser(isPaidUser);
        })();
    }, []);

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
    console.log(finalSlides)
    return (
        <div>
            <div className='px-4 sm:px-6 flex flex-col justify-center items-center gap-4'>
                {/* slides contents */}
                <SocialPostHTML finalSlides={finalSlides} setFinalSlides={setFinalSlides} />
            </div>
        </div>
    )
}

export default SocialPostVisualizer