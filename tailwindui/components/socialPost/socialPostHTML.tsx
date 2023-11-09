import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import sanitizeHtml from 'sanitize-html'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import '@/components/slides/slidesHTML.css'
import dynamic from 'next/dynamic'
import templates, { templateSamples } from '@/components/slides/slideTemplates'
import ClickableLink from '../ui/ClickableLink'
import LayoutChanger from '../slides/LayoutChanger'
import {
    PresentButton,
    SlideLeftNavigator,
    SlideRightNavigator,
    SlidePagesIndicator,
    AddSlideButton,
    DeleteSlideButton,
} from '@/components/slides/SlideButtons'

import socialMediaSlideContainer from '@/components/socialPost/socialPostSlideContainer'
import SocialPostContainer from '@/components/socialPost/socialPostContainer'
import { h1Style, h2Style, h3Style, h4Style, listStyle } from '../slides/Styles'
import ButtonWithExplanation from '../button/ButtonWithExplanation'
import { templateDispatch } from '@/components/socialPost/socialPostTemplateDispatch'


export interface SlideElement {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div'
    className: 'subtopic' | 'keywords' | 'content' | 'template'
    content: string | string[]
}

export type SlideKeys =
    | 'subtopic'
    | 'keywords'
    | 'content'
    | 'template'

export class SocialPostSlide {
    subtopic: string
    keywords: string[]
    content: string[]
    template: string

    constructor() {
        this.subtopic = 'New Slide';
        this.keywords = ['New Slide'];
        this.content = ['Your content here'];
        this.template = 'Col_1_img_0'
    }
}

type SlidesHTMLProps = {
    finalSlides: SocialPostSlide[]
    setFinalSlides: Function
    isViewing?: boolean // viewing another's shared project
}

const SocialPostHTML: React.FC<SlidesHTMLProps> = ({
    finalSlides,
    setFinalSlides,
    isViewing = false,
}) => {
    const [slides, setSlides] = useState<SocialPostSlide[]>([])
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
    const foldername =
        typeof sessionStorage !== 'undefined'
            ? sessionStorage.getItem('foldername')
            : ''
    
    const project_id =
        typeof sessionStorage !== 'undefined'
            ? sessionStorage.getItem('project_id')
            : ''

    const res_slide = 
        typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('socialpost')
        : ''

    const [showLayout, setShowLayout] = useState(false)
    const [present, setPresent] = useState(false)
    const slideRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [saveStatus, setSaveStatus] = useState('Up to date')
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 960,
        height: typeof window !== 'undefined' ? window.innerHeight : 540,
      });
    const [unsavedChanges, setUnsavedChanges] = useState(false)
    const isFirstRender = useRef(true)
    const [isEditMode, setIsEditMode] = useState(false)

    const presentScale = Math.min(dimensions.width / 960, dimensions.height / 540)
    const nonPresentScale = Math.min(1, presentScale * 0.9)

    useEffect(() => {
        if (unsavedChanges) {
            setSaveStatus('Unsaved changes')
        }
    })

    // Watch for changes in finalSlides
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            console.log('First render, skip saving')
            return;
        }

        console.log('finalSlides changed')
        setUnsavedChanges(true)
        saveSlides();
    }, [finalSlides])

    useEffect(() => {
        if (res_slide) {
            const parse_slide = JSON.parse(res_slide)
            const slidesArray: SocialPostSlide[] = Object.keys(parse_slide).map(key => {
                const slideData = parse_slide[key]
                const slide = new SocialPostSlide()
                slide.subtopic = slideData.subtopic,
                slide.keywords = slideData.keywords || ['New Slide'],
                slide.content = slideData.content || ['Your content here']
                slide.template = 'Col_1_img_0'
                return slide
            });
            console.log(slidesArray)
            setSlides(slidesArray);
            setFinalSlides(slidesArray)
        };
    }, []);

    console.log(finalSlides)

    // Function to send a request to auto-save finalSlides
    const saveSlides = () => {
        if (finalSlides.length === 0) {
            console.log('Final slides not yet loaded, skip saving')
            return
        }

        if (!foldername) {
            console.log('Foldername not found, skip saving')
            return 
        }

        setSaveStatus('Saving...')

        const formData = {
            foldername: foldername,
            html: finalSlides,
            project_id: project_id,
        }
        // Send a POST request to the backend to save finalSlides
        fetch('/api/auto_save_html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    setUnsavedChanges(false)
                    console.log('Auto-save successful.')
                    setSaveStatus('Up to date')
                } else {
                    // Handle save error
                    console.error('Auto-save failed.')
                }
            })
            .catch((error) => {
                // Handle network error
                console.error('Auto-save failed:', error)
            })
    }

    const openModal = () => {
        setShowLayout(true)
    }

    const closeModal = () => {
        setShowLayout(false)
    }

    const openPresent = () => {
        toast.success(
            'Use ESC to exit presentation mode, use arrow keys to navigate slides.'
        )
        setPresent(true)
    }

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape') {
                setPresent(false) // Exit presentation mode
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        // Cleanup: remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, []) // Empty dependency array to ensure this effect runs only once (similar to componentDidMount)

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    const scrollContainerRef = useRef<HTMLDivElement | null>(null) // Specify the type as HTMLDivElement

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = -20 // Set the scroll position to the left
        }
    }, [])

    function handleKeyDown(event: KeyboardEvent) {
        if (!isEditMode) {
            if (event.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
                goToSlide(currentSlideIndex + 1)
            } else if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
                goToSlide(currentSlideIndex - 1)
            }
        }
    }

    // function handleSlideEdit(
    //     content: string | string[],
    //     slideIndex: number,
    //     tag: SlideKeys
    // ) {
    //     setIsEditMode(false)
    //     const newSlides = [...slides]
    //     const newFinalSlides = [...finalSlides]

    //     const currentSlide = newSlides[slideIndex]
    //     const currNewFinalSlides = newFinalSlides[slideIndex]
    //     const className = tag

    //     if (className === 'subtopic') {
    //         currentSlide.subtopic = content as string
    //         currNewFinalSlides.subtopic = content as string
    //     } 
    //     else if (className === 'keywords') {
    //         currentSlide.keywords = content as string
    //         currNewFinalSlides.keywords = content as string
    //     } 

    //     else if (className === 'content') {
    //         let newContent: string[] = []
    //         content = content as string[]
    //         content.forEach((str) => {
    //             newContent.push(...str.split('\n'))
    //         })
    //         newContent = newContent.filter((item) => item !== '')

    //         if (newContent.length === 0) { // leave one empty line for editing
    //             newContent.push('')
    //         }

    //         currentSlide.content = newContent
    //         currNewFinalSlides.content = newContent
    //     } else {
    //         console.error(`Unknown tag: ${tag}`)
    //     }
    //     setSlides(newSlides)
    //     setFinalSlides(newFinalSlides)
    // }

    function goToSlide(index: number) {
        console.log('Goinng to slide', index)
        isFirstRender.current = true
        setCurrentSlideIndex(index)
    }


    function toggleEditMode() {
        setIsEditMode(!isEditMode)
    }


    const editableTemplateDispatch = (slide: SocialPostSlide, index: number, canEdit: boolean) => 
    templateDispatch(slide, index, canEdit, false, isEditMode, saveSlides, setIsEditMode);

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            {/* buttons and contents */}
            <div className='max-w-4xl relative flex flex-row items-center justify-center gap-4'>
                <ToastContainer />

                <SlideLeftNavigator
                    currentSlideIndex={currentSlideIndex}
                    slides={slides}
                    goToSlide={goToSlide}
                />

                <SocialPostContainer
                    isPresenting={present}
                    slides={slides}
                    currentSlideIndex={currentSlideIndex}
                    isViewing={isViewing}
                    scale={present ? presentScale : nonPresentScale}
                    templateDispatch={editableTemplateDispatch}
                    slideRef={slideRef}
                    containerRef={containerRef}
                />

                <SlideRightNavigator
                    currentSlideIndex={currentSlideIndex}
                    slides={slides}
                    goToSlide={goToSlide}
                />
            </div>
        </div>
    )
}
export default SocialPostHTML