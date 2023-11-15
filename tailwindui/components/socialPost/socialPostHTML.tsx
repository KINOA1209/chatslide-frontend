import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import '@/components/slides/slidesHTML.css'
import dynamic from 'next/dynamic'
import ClickableLink from '../ui/ClickableLink'
import LayoutChanger from '@/components/socialPost/socialPostLayoutChanger'
import {
    PresentButton,
    SlideLeftNavigator,
    SlideRightNavigator,
    SlidePagesIndicator,
    AddSlideButton,
    DeleteSlideButton,
} from '@/components/socialPost/socialPostButtons'

import SocialPostContainer from '@/components/socialPost/socialPostContainer'
import ButtonWithExplanation from '../button/ButtonWithExplanation'
import { templateDispatch } from '@/components/socialPost/socialPostTemplateDispatch'
import templates, { templateSamples } from '@/components/socialPost/socialPostTemplates'

export interface SlideElement {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div'
    className: 
    | 'subtopic' 
    | 'keywords' 
    | 'content' 
    | 'template' 
    | 'images' 
    | 'section_title' 
    | 'brief' 
    | 'original_title' 
    | 'English_title'
    | 'title'
    | 'illustration'
    | 'quote'
    | 'source'
    content: string | string[]
}

export type SlideKeys =
    | 'subtopic'
    | 'keywords'
    | 'content'
    | 'template'
    | 'images'
    | 'section_title'
    | 'brief'
    | 'original_title'
    | 'English_title'
    | 'title'
    | 'illustration'
    | 'quote'
    | 'source'

export class SocialPostSlide {
    subtopic: string
    keywords: string[]
    content: string[]
    template: string
    images: string[]
    section_title: string
    brief: string
    original_title: string
    English_title: string
    title: string
    illustration: string[]
    quote: string
    source: string


    constructor() {
        this.subtopic = 'New Slide'
        this.keywords = ['New Slide']
        this.content = ['Your content here']
        this.template = 'Col_1_img_0'
        this.images = ['']
        this.section_title = ''
        this.brief = ''
        this.original_title = ''
        this.English_title = ''
        this.title = ''
        this.illustration = ['']
        this.quote = ''
        this.source = ''
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
        ? sessionStorage.getItem('socialPost')
        : ''

    const res_images =
        typeof sessionStorage !== 'undefined'
        ? JSON.parse(sessionStorage.getItem('socialPostImages') ?? '[]') 
        : []
    
    const cover_title = 
        typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('topic')
        : ''
    
    const res_scenario =
        typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('selectedScenario')
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

    const presentScale = Math.min(dimensions.width / 450, dimensions.height / 600)
    const nonPresentScale = Math.min(1, presentScale * 0.6)
    console.log(slides)
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
            const slidesArray: SocialPostSlide[] = Object.keys(parse_slide).map((key, index) => {
                const slideData = parse_slide[key]
                const slide = new SocialPostSlide()
                if (index === 0 && res_images && res_images.length > 0){
                    const randomIndex = Math.floor(Math.random() * res_images.length)
                    slide.images = [res_images[randomIndex]]
                }
                else{
                    slide.images = ['']
                }
                if (index === 0) {
                    if (res_scenario === 'casual_topic'){
                        slide.subtopic = cover_title || 'Your topic here'
                        slide.template = 'First_page_img_1'
                    }
                    else if (res_scenario === 'serious_subject'){
                        slide.English_title = slideData.English_title
                        slide.template = 'First_page_img_1_template2'
                    }
                    else if (res_scenario === 'reading_notes'){
                        slide.template = 'First_page_img_1_template3'
                    }
                }
                else {
                    if (res_scenario === 'casual_topic'){
                        slide.subtopic = slideData.subtopic
                        slide.template = 'Col_1_img_0'
                    }
                    else if (res_scenario === 'serious_subject'){
                        slide.template = 'img_0_template2'
                    }
                    else if (res_scenario === 'reading_notes'){
                        slide.template = 'img_1_template3'
                    }      
                }
                slide.keywords = slideData.keywords || ['']
                slide.content = slideData.content || ['Your content here']
                slide.section_title = slideData.section_title || ['Your section title here']
                slide.brief = slideData.brief || ['Your brief here']
                slide.original_title = slideData.original_title || cover_title
                slide.title = slideData.title || ''
                slide.illustration = [slideData.illustration] || ['']
                slide.quote = slideData.quote || ''
                slide.source = slideData.source || ''

                return slide
            });
            setSlides(slidesArray);
            setFinalSlides(slidesArray)
        };
    }, []);

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

    function handleSlideEdit(
        content: string | string[],
        slideIndex: number,
        tag: SlideKeys
    ) {
        setIsEditMode(false)
        const newSlides = [...slides]
        const newFinalSlides = [...finalSlides]

        const currentSlide = newSlides[slideIndex]
        const currNewFinalSlides = newFinalSlides[slideIndex]
        const className = tag

        if (className === 'subtopic') {
            currentSlide.subtopic = content as string
            currNewFinalSlides.subtopic = content as string
        } 
        else if (className === 'keywords') {
            currentSlide.keywords = content as string[]
            currNewFinalSlides.keywords = content as string[]
        } 
        else if (className === 'content') {
            let newContent: string[] = []
            content = content as string[]
            content.forEach((str) => {
                newContent.push(...str.split('\n'))
            })
            newContent = newContent.filter((item) => item !== '')

            if (newContent.length === 0) { // leave one empty line for editing
                newContent.push('')
            }

            currentSlide.content = newContent
            currNewFinalSlides.content = newContent
        }
        else if (className === 'template'){
            currentSlide.template = content as string
            currNewFinalSlides.template = content as string
        }
        else if (className === 'images') {
            currentSlide.images = content as string[]
            currNewFinalSlides.images = content as string[]
        }
        else {
            console.error(`Unknown tag: ${tag}`)
        }
        console.log(newSlides)
        setSlides(newSlides)
        setFinalSlides(newFinalSlides)
    }

    function goToSlide(index: number) {
        console.log('Goinng to slide', index)
        isFirstRender.current = true
        setCurrentSlideIndex(index)
    }


    function toggleEditMode() {
        setIsEditMode(!isEditMode)
    }

    function handleAddPage() {
        const newSlides = [...slides]
        const newFinalSlides = [...finalSlides]
        const newSlide = new SocialPostSlide()
        if (currentSlideIndex != 0) {
            newSlides.splice(currentSlideIndex, 0, newSlide)
            newFinalSlides.splice(currentSlideIndex, 0, newSlide)
        }
        setSlides(newSlides)
        setFinalSlides(newFinalSlides)
    }

    function handleDeletePage() {
        const newSlides = [...slides]
        const newFinalSlides = [...finalSlides]
        if (currentSlideIndex != 0) {
            newSlides.splice(currentSlideIndex, 1)
            newFinalSlides.splice(currentSlideIndex, 1)

            if (currentSlideIndex >= newSlides.length) {
                setCurrentSlideIndex(newSlides.length - 1)
            }
        }
        setSlides(newSlides)
        setFinalSlides(newFinalSlides)
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

                {/* 4 buttons for change layout, present, add and add / delete slide */}
                <div className='absolute -right-[10rem] top-[7rem] flex flex-col justify-between items-center mb-6 gap-[1.25rem] ml-[6rem]'>
                    <ButtonWithExplanation
                        button={<PresentButton openPresent={openPresent} />}
                        explanation='Present'
                    />

                    {res_scenario === 'casual_topic' && !isViewing && (currentSlideIndex!=0) &&(
                        <ButtonWithExplanation
                            button={
                                <LayoutChanger
                                    openModal={openModal}
                                    showLayout={showLayout}
                                    closeModal={closeModal}
                                    currentSlideIndex={currentSlideIndex}
                                    templateSamples={templateSamples}
                                    slides={slides}
                                    handleSlideEdit={handleSlideEdit}
                                />
                            }
                            explanation='Change Layout'
                        />
                    )}

                    {!isViewing && (currentSlideIndex!=0) && (
                        <ButtonWithExplanation
                            button={
                                <AddSlideButton
                                    addPage={handleAddPage}
                                    currentSlideIndex={currentSlideIndex}
                                />
                            }
                            explanation='Add Page'
                        />
                    )}

                    {!isViewing && (currentSlideIndex!=0) && (
                        <ButtonWithExplanation
                            button={
                                <DeleteSlideButton
                                    deletePage={handleDeletePage}
                                    currentSlideIndex={currentSlideIndex}
                                />
                            }
                            explanation='Delete Page'
                        />
                    )}
                </div>

                {/* White modal for presentation mode */}
                {present && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            zIndex: 40,
                        }}
                    ></div>
                )}
            </div>
            <SlidePagesIndicator
                currentSlideIndex={currentSlideIndex}
                slides={slides}
                goToSlide={goToSlide}
            />

            {/* preview little image */}

            <div className='max-w-xs sm:max-w-4xl mx-auto py-6 justify-center items-center'>
                <div className='w-full py-6 flex flex-nowrap overflow-x-auto overflow-x-scroll overflow-y-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'>
                    {Array(slides.length)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={`previewContainer` + index.toString()}
                                className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
                                onClick={() => setCurrentSlideIndex(index)} // Added onClick handler
                            >
                                {/* {index + 1} */}
                                <SocialPostContainer
                                    slides={slides}
                                    currentSlideIndex={index}
                                    scale={0.1}
                                    isViewing={true}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default SocialPostHTML