import React, { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML'
import dynamic from 'next/dynamic'
import UserService from '../../services/UserService'
import ExportToPngButton from '@/components/socialPost/socialPostPngButton'
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger'
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const SocialPostHTML = dynamic(() => import('@/components/socialPost/socialPostHTML'), { ssr: false })

type SocialPostVisualizerProps = {
    finalSlides: SocialPostSlide[]
    setFinalSlides: Function
    borderColorOptions: ThemeObject[]
}
const SocialPostVisualizer: React.FC<SocialPostVisualizerProps> = ({
    finalSlides,
    setFinalSlides,
    borderColorOptions,
}) => {
    const [host, setHost] = useState('https://drlambda.ai')
    const [share, setShare] = useState(false)
    const [isPaidUser, setIsPaidUser] = useState(false);
    const [finalSlideIndex, setFinalSlideIndex] = useState<number>(0)
    const [currentEditingProperty, setCurrentEditingProperty] = useState<string>("topic");

    const updateSlideProperty = (newValue: string) => {
        const updatedSlides = [...finalSlides];
        updatedSlides[finalSlideIndex] = {
            ...updatedSlides[finalSlideIndex],
            [currentEditingProperty]: newValue,
        };
        setFinalSlides(updatedSlides);
    };

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
                <ExportToPngButton 
                    finalSlides={finalSlides} 
                    currentSlideIndex={finalSlideIndex} 
                    borderColorOptions={borderColorOptions}
                />
                </div>
                
                <SocialPostHTML 
                    finalSlides={finalSlides} 
                    setFinalSlides={setFinalSlides} 
                    finalSlideIndex={finalSlideIndex} 
                    setFinalSlideIndex={setFinalSlideIndex}
                    borderColorOptions={borderColorOptions}
                />
            </div>
        </div>
    )
}

export default SocialPostVisualizer