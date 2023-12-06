import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import sanitizeHtml from 'sanitize-html'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import './slidesHTML.css'
import dynamic from 'next/dynamic'
import {
  availableTemplates,
  // templateSamples,
} from '@/components/slides/slideTemplates'
import { LayoutKeys } from '@/components/slides/slideLayout'
import ClickableLink from '../ui/ClickableLink'
import LayoutChanger from './LayoutChanger'
import {
  PresentButton,
  SlideLeftNavigator,
  SlideRightNavigator,
  SlidePagesIndicator,
  AddSlideButton,
  DeleteSlideButton,
  ChangeTemplateOptions,
} from './SlideButtons'

import SlideContainer from './SlideContainer'
import { h1Style, h2Style, h3Style, h4Style, listStyle } from './Styles'
import ButtonWithExplanation from '../button/ButtonWithExplanation'
import { templateDispatch } from './templateDispatch'
import { ScriptEditIcon } from '@/app/(feature)/workflow-review-slides/icons'
import { useRouter } from 'next/navigation'
import { availableLayouts } from './slideLayout'
import TestSlidesData from './TestSlidesData.json'
import AuthService from '@/services/AuthService'
export interface SlideElement {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div'
  className:
  | 'head'
  | 'title'
  | 'subtopic'
  | 'content'
  | 'userName'
  | 'images'
  | 'template'
  | 'layout'
  content: string | string[]
}

export type SlideKeys =
  | 'head'
  | 'title'
  | 'subtopic'
  | 'userName'
  | 'template'
  | 'content'
  | 'images'
  | 'layout'

export class Slide {
  head: string
  title: string
  subtopic: string
  userName: string
  template: string
  content: string[]
  images: string[]
  layout: LayoutKeys

  constructor() {
    this.head = 'New Slide'
    this.title = 'New Slide'
    this.subtopic = 'New Slide'
    this.userName = ''
    this.template = 'Default_template'
    this.content = ['Your content here']
    this.images = []
    this.layout = 'Col_2_img_1_layout'
  }
}

type SlidesHTMLProps = {
  finalSlides: Slide[]
  setFinalSlides: Function
  isViewing?: boolean // viewing another's shared project
  transcriptList?: string[]
}

// it will render the slides fetched from `foldername` in sessionStorage
const SlidesHTML: React.FC<SlidesHTMLProps> = ({
  finalSlides,
  setFinalSlides,
  isViewing = false,
  transcriptList = [],
}) => {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const foldername =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('foldername')
      : ''
  const project_id =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('project_id')
      : ''
  // default to use test data for slides
  const res_slide =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('presentation_slides') ||
      JSON.stringify(TestSlidesData)
      : ''

  const [chosenLayout, setChosenLayout] = useState<LayoutKeys>('')

  const [showLayout, setShowLayout] = useState(false)
  const [present, setPresent] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const allSlidesRef = useRef<HTMLDivElement>(null)
  const [saveStatus, setSaveStatus] = useState('Up to date')
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 960,
    height: typeof window !== 'undefined' ? window.innerHeight : 540,
  })
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const isFirstRender = useRef(true)
  const [isEditMode, setIsEditMode] = useState(false)

  const router = useRouter()

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
      isFirstRender.current = false
      console.log('First render, skip saving')
      return
    }

    console.log('finalSlides changed')
    setUnsavedChanges(true)
    saveSlides()
  }, [finalSlides])

  useEffect(() => {
    console.log('layout Changed to: ', chosenLayout)
    setUnsavedChanges(true)
    saveSlides()
  }, [chosenLayout])

  // Function to change the template of slides starting from the second one
  const changeTemplate = (newTemplate: string) => {
    console.log('Changing template to:', newTemplate)
    const newSlides = slides.map((slide, index) => {
      // Keep the template of the first slide unchanged
      //   if (index === 0) {
      //     return slide
      //   }
      // Update the template for slides starting from the second one
      return { ...slide, template: newTemplate }
    })
    // console.log('Slides after changing template:', newSlides)
    setSlides(newSlides)

    const newFinalSlides = finalSlides.map((slide, index) => {
      // Keep the template of the first slide unchanged
      //   if (index === 0) {
      //     return slide
      //   }
      // Update the template for slides starting from the second one
      return { ...slide, template: newTemplate }
    })
    setFinalSlides(newFinalSlides)
    console.log('Slides after changing template:', newSlides)

    setUnsavedChanges(true)
    saveSlides()
  }

  // Function to send a request to auto-save finalSlides
  const saveSlides = async () => {
    if (isViewing) {
      console.log("Viewing another's shared project, skip saving")
      return
    }

    if (finalSlides.length === 0) {
      console.log('Final slides not yet loaded, skip saving')
      return
    }

    if (!foldername) {
      console.log('Foldername not found, skip saving')
      return
    }

    setSaveStatus('Saving...')

    const { userId, idToken: token } =
      await AuthService.getCurrentUserTokenAndId()
    const formData = {
      foldername: foldername,
      final_slides: finalSlides,
      project_id: project_id,
    }
    // Send a POST request to the backend to save finalSlides
    fetch('/api/save_slides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
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
    // toast.success(
    //   'Use ESC to exit presentation mode, use arrow keys to navigate slides.'
    // )
    setPresent(true)
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape') {
        setPresent(false) // Exit presentation mode
      }
    }

    const handleDoubleClick = () => {
      setPresent(false);
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('dblclick', handleDoubleClick)

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('dblclick', handleDoubleClick)
    }
  }, []) // Empty dependency array to ensure this effect runs only once (similar to componentDidMount)

  // fetch slides data
  useEffect(() => {
    if (res_slide) {
      console.log('typeof res_slide:', typeof res_slide)
      // const slides_response_JSON = JSON.stringify(TestSlidesData)
      const parsed_slides = JSON.parse(res_slide)
      // console.log('parseSlides:', parsed_slides)
      // log the type of parsed_slides
      console.log('typeof parsed_slides:', typeof parsed_slides)

      // mapping data to slides
      const slidesArray: Slide[] = Object.keys(parsed_slides).map(
        (key, index) => {
          const slideData = parsed_slides[key]
          console.log('slideData:', slideData)
          const slide = new Slide()
          slide.head = slideData.head || 'New Slide'
          slide.title = slideData.title || 'New Slide'
          slide.subtopic = slideData.subtopic || 'New Slide'
          slide.userName = slideData.userName || ''
          slide.template = slideData.template || 'Default_template'
          slide.content = slideData.content || ['Your content here']
          slide.images = slideData.images || []
          if (index === 0) {
            slide.layout =
              slideData.layout || ('Cover_img_1_layout' as LayoutKeys)
          } else {
            slide.layout = slideData.layout || 'Col_2_img_1_layout'
          }

          // Return the modified slide object
          return slide
        }
      )
      console.log('the parsed slides array:', slidesArray)
      setSlides(slidesArray)
      setFinalSlides(slidesArray)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  useEffect(() => console.log('slides contents changed', slides), [slides])

  const scrollContainerRef = useRef<HTMLDivElement | null>(null) // Specify the type as HTMLDivElement

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = -20 // Set the scroll position to the left
    }
  }, [])

  function loadHtmlFile(foldername: string, filename: string) {
    console.log('start reloading html file')
    fetch(`/api/html?foldername=${foldername}&filename=${filename}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((html) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        console.log('doc info:', doc)
        displaySlides(doc)
        console.log('loaded slides information', doc)
        sessionStorage.setItem('html', 'html_init.html')
      })
      .catch((error) => {
        console.error('Failed to load HTML file:', error)
      })
  }

  function displaySlides(doc: Document) {
    const slideElements = Array.from(doc.getElementsByClassName('slide'))
    console.log('display slides information', slideElements)
    const newSlides: Slide[] = slideElements.map((slide, index) => {
      const elements = new Slide()
      const slideChildren = Array.from(slide.children)
      for (const child of slideChildren) {
        // need backend to return the layout class
        let className = child.className
        // console.log('className:', className)
        // console.log('child inner html:', child.innerHTML.trim())
        if (className === 'head' && child.innerHTML.trim() !== '') {
          elements.head = sanitizeHtml(child.innerHTML)
        } else if (className === 'title' && child.innerHTML.trim() !== '') {
          elements.title = sanitizeHtml(child.innerHTML)
        } else if (className === 'userName' && child.innerHTML.trim() !== '') {
          elements.userName = sanitizeHtml(child.innerHTML)
        } else if (className === 'subtopic' && child.innerHTML.trim() !== '') {
          // console.log('child inner html:', child.innerHTML.trim())
          elements.subtopic = sanitizeHtml(child.innerHTML)
        } else if (
          className === 'template' &&
          child.textContent?.trim() !== ''
        ) {
          // console.log('template child:', child.textContent?.trim())
          // Use child.textContent for simple string content
          elements.template = sanitizeHtml(child.textContent ?? '') // Use nullish coalescing
        } else if (className === 'layout' && child.textContent?.trim() !== '') {
          // Use child.textContent for simple string content
          elements.layout = sanitizeHtml(child.textContent ?? '') as LayoutKeys // Use nullish coalescing
          console.log('layout: ', elements.layout)
        } else if (className === 'content' && child.innerHTML.trim() !== '') {
          const listItems = Array.from(child.getElementsByTagName('li'))
          elements.content = listItems.map((li) => sanitizeHtml(li.innerHTML))
        } else if (child.className === 'images') {
          const listItems = Array.from(child.getElementsByTagName('img'))
          console.log('listItems of imgs:', listItems)
          let urls = listItems.map((img) => {
            const src = img.getAttribute('src')
            if (src) {
              return src
            } else {
              return ''
            }
          })
          elements.images = urls
        }
      }

      // default template
      if (elements.template === '') {
        // if (index === 0) {
        //   elements.template = 'First_page_img_1'
        // } else {
        //   elements.template = 'Col_1_img_0'
        // }
        elements.template = 'Default_template'
      }

      // default layout setting

      if (index === 0) {
        elements.layout = 'Cover_img_1_layout' as LayoutKeys
        setChosenLayout(elements.layout)
        // console.log('current page is cover page: ', elements.layout)
      } else if (index !== 0 && index % 2 === 0) {
        elements.layout = 'Col_2_img_1_layout' as LayoutKeys
        setChosenLayout(elements.layout)
        // console.log('current page is non cover page: ', elements.layout)
      } else if (index !== 0 && index % 2 !== 0) {
        elements.layout = 'Col_1_img_0_layout' as LayoutKeys
        setChosenLayout(elements.layout)
        // console.log('current page is non cover page: ', elements.layout)
      }
      return elements
    })

    setFinalSlides(newSlides)
    console.log('new slides: ', newSlides)
    setSlides(newSlides)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!isEditMode) {
      if ((event.key === 'ArrowRight' || event.key === 'ArrowDown')
        && currentSlideIndex < slides.length - 1) {
        event.preventDefault()
        goToSlide(currentSlideIndex + 1)
      }
      else if ((event.key === 'ArrowLeft' || event.key === 'ArrowUp')
        && currentSlideIndex > 0) {
        event.preventDefault()
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

    if (className === 'head') {
      currentSlide.head = content as string
      currNewFinalSlides.head = content as string
    } else if (className === 'title') {
      currentSlide.title = content as string
      currNewFinalSlides.title = content as string
    } else if (className === 'subtopic') {
      currentSlide.subtopic = content as string
      currNewFinalSlides.subtopic = content as string
    } else if (className === 'userName') {
      currentSlide.userName = content as string
      currNewFinalSlides.userName = content as string
    } else if (className === 'template') {
      currentSlide.template = content as string
      currNewFinalSlides.template = content as string
    } else if (className === 'layout') {
      currentSlide.layout = content as LayoutKeys
      currNewFinalSlides.layout = content as LayoutKeys
    } else if (className === 'images') {
      currentSlide.images = content as string[]
      currNewFinalSlides.images = content as string[]
    } else if (className === 'content') {
      let newContent: string[] = []
      content = content as string[]
      content.forEach((str) => {
        newContent.push(...str.split('\n'))
      })
      newContent = newContent.filter((item) => item !== '')

      if (newContent.length === 0) {
        // leave one empty line for editing
        newContent.push('')
      }

      currentSlide.content = newContent
      currNewFinalSlides.content = newContent
    } else {
      console.error(`Unknown tag: ${tag}`)
    }
    sessionStorage.setItem('presentation_slides', JSON.stringify(newSlides))
    setSlides(newSlides)
    setFinalSlides(newFinalSlides)
  }

  function goToSlide(index: number) {
    console.log('Goinng to slide', index)
    isFirstRender.current = true
    setCurrentSlideIndex(index)
  }

  function handleAddPage() {
    const newSlides = [...slides]
    const newFinalSlides = [...finalSlides]
    const newSlide = new Slide()
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

  function toggleEditMode() {
    setIsEditMode(!isEditMode)
  }

  const updateImgUrlArray = (slideIndex: number) => {
    const updateImgUrl = (urls: string[]) => {
      handleSlideEdit(urls, slideIndex, 'images')
    }
    return updateImgUrl
  }

  function wrapWithLiTags(content: string): string {
    if (!content.includes('<li>') || !content.includes('</li>')) {
      return `<li style="font-size: 18pt;">${content}</li>`
    }
    return content
  }

  const editableTemplateDispatch = (
    slide: Slide,
    index: number,
    canEdit: boolean
  ) =>
    templateDispatch(
      slide,
      index,
      canEdit,
      false,
      isEditMode,
      saveSlides,
      setIsEditMode,
      handleSlideEdit,
      updateImgUrlArray,
      toggleEditMode,
      index === 0,
      slide.layout,
      slide.layout
    )

  return (
    <div className='flex flex-col items-center justify-center gap-4'>


      {/* buttons and contents */}
      <div className='max-w-4xl relative flex flex-row items-center justify-center gap-4'>
        <SlideLeftNavigator
          currentSlideIndex={currentSlideIndex}
          slides={slides}
          goToSlide={goToSlide}
        />

        <SlideContainer
          isPresenting={present}
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          isViewing={isViewing}
          scale={present ? presentScale : nonPresentScale}
          templateDispatch={editableTemplateDispatch}
          slideRef={slideRef}
          containerRef={containerRef}
          setIsPresenting={setPresent}
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

          {!isViewing && (
            <ButtonWithExplanation
              button={
                <LayoutChanger
                  openModal={openModal}
                  showLayout={showLayout}
                  closeModal={closeModal}
                  currentSlideIndex={currentSlideIndex}
                  // templateSamples={templateSamples}
                  slides={slides}
                  handleSlideEdit={handleSlideEdit}
                  availableLayouts={availableLayouts}
                />
              }
              explanation='Change Layout'
            />
          )}

          {!isViewing && currentSlideIndex != 0 && (
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

          {!isViewing && currentSlideIndex != 0 && (
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

      {!isViewing && (
        <div className='py-2 hidden sm:block'>
          <ChangeTemplateOptions
            templateOptions={Object.keys(availableTemplates)}
            onChangeTemplate={changeTemplate}
          />
        </div>
      )}

      {/* preview little image */}

      {/* scriptlist textbox */}
      {transcriptList !== null && transcriptList.length > 0 && (
        <div
          className={`w-screen max-w-[960px] h-[200px] bg-zinc-100 rounded shadow flex flex-col overflow-y-auto my-4 ml-2`}
        >
          <div className='px-4 py-2 h-8 bg-zinc-100 flex flex-row justify-between items-center sticky top-0 border-b-2 border-gray-300'>
            <div className='text-neutral-900 text-s font-creato-medium '>
              Script
            </div>
            <div
              className='cursor-pointer'
              onClick={() => router.push('/workflow-edit-script')}
            >
              <ButtonWithExplanation
                button={<ScriptEditIcon />}
                explanation='Edit Script'
              />
            </div>
          </div>
          <div className='flex flex-col gap-4 '>
            <div className='px-4 py-2 w-full text-gray-700 text-xs font-normal font-creato-medium leading-[1.125rem] tracking-[0.015rem]'>
              {transcriptList[currentSlideIndex]}
            </div>
          </div>
        </div>
      )}

      {/* horizontal  */}
      <div className='block lg:hidden max-w-xs sm:max-w-4xl mx-auto py-6 justify-center items-center'>
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
                <SlideContainer
                  slides={slides}
                  currentSlideIndex={index}
                  scale={0.12}
                  isViewing={true}
                  templateDispatch={editableTemplateDispatch}
                  highlightBorder={currentSlideIndex === index}
                />
              </div>
            ))}
        </div>
      </div>

      <div className='absolute top-[32px] -left-[15rem] h-4/5 hidden lg:block mx-auto justify-center items-center'>
        <div className='h-full flex flex-col flex-nowrap overflow-y-auto  overflow-y-scroll overflow-x-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'>
          {Array(slides.length)
            .fill(0)
            .map((_, index) => (
              <div
                key={`previewContainer` + index.toString()}
                className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
                onClick={() => setCurrentSlideIndex(index)} // Added onClick handler
              >
                {/* {index + 1} */}
                <SlideContainer
                  slides={slides}
                  currentSlideIndex={index}
                  scale={0.12}
                  isViewing={true}
                  templateDispatch={editableTemplateDispatch}
                  slideRef={slideRef}
                  containerRef={containerRef}
                  highlightBorder={currentSlideIndex === index}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default SlidesHTML
