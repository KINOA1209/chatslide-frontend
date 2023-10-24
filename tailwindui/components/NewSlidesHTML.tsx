import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import sanitizeHtml from 'sanitize-html'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import './slidesHTML.css'
import dynamic from 'next/dynamic'
import templates, { templateSamples } from '@/components/slideTemplates'
import ClickableLink from './ui/ClickableLink'
import LayoutChanger from './slides/LayoutChanger'
import {
  PresentButton,
  SaveButton,
  ShareToggleButton,
  SlideNavigator,
  SlideLeftNavigator,
  SlideRightNavigator,
  SlidePagesIndicator,
  AddSlideButton,
  DeleteSlideButton,
} from './slides/SlideButtons'

import SlideContainer from './slides/SlideContainer'
import { h1Style, h2Style, h3Style, h4Style, listStyle } from './slides/Styles'

export interface SlideElement {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div'
  className: 'head' | 'title' | 'subtopic' | 'content' | 'userName' | 'images'
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

export class Slide {
  head: string
  title: string
  subtopic: string
  userName: string
  template: string
  content: string[]
  images: string[]

  constructor() {
    this.head = ''
    this.title = ''
    this.subtopic = ''
    this.userName = ''
    this.template = ''
    this.content = []
    this.images = []
  }
}

type SlidesHTMLProps = {
  finalSlides: Slide[]
  setFinalSlides: Function
  viewingMode?: boolean // viewing another's shared project
}

// it will render the slides fetched from `foldername` in sessionStorage
const SlidesHTML: React.FC<SlidesHTMLProps> = ({
  finalSlides,
  setFinalSlides,
  viewingMode = false,
}) => {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const foldername =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('foldername')
      : ''
  const [showLayout, setShowLayout] = useState(false)
  const [present, setPresent] = useState(false)
  const [share, setShare] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [host, setHost] = useState('https://drlambda.ai')
  const [saveStatus, setSaveStatus] = useState('Up to date')
  const [dimensions, setDimensions] = useState({ width: 960, height: 540 })
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const isFirstRender = useRef(true)
  const [isEditMode, setIsEditMode] = useState(false)

  const scale = Math.min(dimensions.width / 960, dimensions.height / 540)
  const SaveToPdfHtml = dynamic(
    () => import('@/components/forms/newSaveToPdfHtml')
  )

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

  useEffect(() => {
    setShare(sessionStorage.getItem('is_shared') === 'true')
    // console.log('share', sessionStorage.getItem('is_shared'));
  }, [])

  useEffect(() => {
    if (unsavedChanges) {
      setSaveStatus('Unsaved changes')
    }
  })

  // Watch for changes in finalSlides
  useEffect(() => {
    // if (isFirstRender.current) {
    //     isFirstRender.current = false;
    //     console.log('First render, skip saving')
    //     return;
    // }

    console.log('finalSlides changed')
    setUnsavedChanges(true)
    // saveSlides();
  }, [finalSlides])

  // Function to send a request to auto-save finalSlides
  const saveSlides = () => {
    if (finalSlides.length === 0) {
      console.log('Final slides not yet loaded, skip saving')
      return
    }

    setSaveStatus('Saving...')

    const formData = {
      foldername: foldername,
      html: finalSlides,
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
    if (foldername !== null) {
      loadHtmlFile(foldername, 'html_init.html')
    } else {
      console.error('foldername is null')
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  function loadHtmlFile(foldername: string, filename: string) {
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
        displaySlides(doc)
        sessionStorage.setItem('html', 'html_init.html')
      })
      .catch((error) => {
        console.error('Failed to load HTML file:', error)
      })
  }

  function displaySlides(doc: Document) {
    const slideElements = Array.from(doc.getElementsByClassName('slide'))
    const newSlides: Slide[] = slideElements.map((slide, index) => {
      const elements = new Slide()
      const slideChildren = Array.from(slide.children)
      for (const child of slideChildren) {
        let className = child.className
        if (className === 'head') {
          elements.head = sanitizeHtml(child.innerHTML)
        } else if (className === 'title') {
          elements.title = sanitizeHtml(child.innerHTML)
        } else if (className === 'userName') {
          elements.userName = sanitizeHtml(child.innerHTML)
        } else if (className === 'subtopic') {
          elements.subtopic = sanitizeHtml(child.innerHTML)
        } else if (className === 'template') {
          elements.template = sanitizeHtml(child.innerHTML)
        } else if (className === 'content') {
          const listItems = Array.from(child.getElementsByTagName('li'))
          elements.content = listItems.map((li) => sanitizeHtml(li.innerHTML))
        } else if (child.className === 'images') {
          const listItems = Array.from(child.getElementsByTagName('img'))
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

      if (elements.template === '') {
        if (index === 0) {
          elements.template = 'First_page_img_1'
        } else {
          elements.template = 'Col_1_img_0'
        }
      }
      return elements
    })
    setFinalSlides(newSlides)
    setSlides(newSlides)
  }

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

      currentSlide.content = newContent
      currNewFinalSlides.content = newContent
    } else {
      console.error(`Unknown tag: ${tag}`)
    }
    setSlides(newSlides)
    setFinalSlides(newFinalSlides)
  }

  function goToSlide(index: number) {
    console.log('Goinng to slide', index)
    isFirstRender.current = true
    setCurrentSlideIndex(index)
  }

  function wrapWithLiTags(content: string): string {
    if (!content.includes('<li>') || !content.includes('</li>')) {
      return `<li style="font-size: 18pt;">${content}</li>`
    }
    return content
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

  useEffect(() => {
    console.log(`present: ${present}`)
    if (!containerRef.current || !slideRef.current) {
      return // Exit if containerRef is not loaded
    }

    setDimensions({ width: window.innerWidth, height: window.innerHeight })

    const resizeSlide = () => {
      if (!present && containerRef.current && slideRef.current) {
        let scale = 1
        const viewWidth = window.innerWidth
        if (viewWidth < 976) {
          scale = (viewWidth - 80) / 960
          containerRef.current.style.height = present
            ? '100%'
            : `${540 * scale}px`
          containerRef.current.style.width = present
            ? '100%'
            : `${960 * scale}px`
          slideRef.current.style.transform = `scale(${scale})`
          slideRef.current.style.left = `-${(960 * (1 - scale)) / 2}px`
          slideRef.current.style.top = `-${(540 * (1 - scale)) / 2}px`
        } else {
          ;(containerRef.current.style.height = present ? '100%' : '540px'),
            (containerRef.current.style.width = present ? '100%' : '960px'),
            (slideRef.current.style.transform = `scale(1)`)
          slideRef.current.style.left = ''
          slideRef.current.style.top = ''
        }
      }
    }
    window.addEventListener('resize', resizeSlide)
    resizeSlide()
    console.log('resize')
  }, [slideRef.current, containerRef.current])

  const templateDispatch = (
    slide: Slide,
    index: number,
    canEdit: boolean
  ): JSX.Element => {
    const Template = templates[slide.template as keyof typeof templates]
    if (index === 0) {
      return (
        <Template
          autoSave={saveSlides}
          key={index}
          user_name={
            <div
              key={0}
              className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
              contentEditable={canEdit}
              onFocus={() => {
                if (canEdit) {
                  setIsEditMode(true)
                }
              }}
              onBlur={(e) =>
                handleSlideEdit(e.target.innerText, index, 'userName')
              }
              style={h4Style}
              dangerouslySetInnerHTML={{ __html: slide.userName }}
            />
          }
          title={
            <div
              key={1}
              className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
              contentEditable={canEdit}
              onFocus={() => {
                if (canEdit) {
                  setIsEditMode(true)
                }
              }}
              onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'head')}
              style={h1Style}
              dangerouslySetInnerHTML={{ __html: slide.head }}
            />
          }
          topic={<></>}
          subtopic={<></>}
          content={[<></>]}
          imgs={slide.images}
          update_callback={updateImgUrlArray(index)}
          canEdit={canEdit}
        />
      )
    } else {
      return (
        <Template
          autoSave={saveSlides}
          canEdit={canEdit}
          key={index}
          user_name={<></>}
          title={<></>}
          topic={
            <div
              key={0}
              className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
              contentEditable={canEdit}
              onFocus={() => {
                if (canEdit) {
                  setIsEditMode(true)
                }
              }}
              onBlur={(e) =>
                handleSlideEdit(e.target.innerText, index, 'title')
              }
              style={h2Style}
              dangerouslySetInnerHTML={{ __html: slide.title }}
            />
          }
          subtopic={
            <div
              key={1}
              className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
              contentEditable={canEdit}
              onFocus={() => {
                if (canEdit) {
                  setIsEditMode(true)
                }
              }}
              onBlur={(e) => {
                handleSlideEdit(e.target.innerText, index, 'subtopic')
              }}
              style={h3Style}
              dangerouslySetInnerHTML={{ __html: slide.subtopic }}
            />
          }
          content={slide.content.map(
            (content: string, contentIndex: number) => {
              if (content.includes('$$') || content.includes('\\(')) {
                if (isEditMode) {
                  return (
                    <div
                      key={index}
                      className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                      contentEditable={canEdit}
                      style={listStyle}
                      onFocus={() => {
                        if (canEdit) {
                          setIsEditMode(true)
                        }
                      }}
                      onBlur={(e) => {
                        const modifiedContent = [...slide.content]
                        modifiedContent[contentIndex] = e.target.innerText
                        handleSlideEdit(modifiedContent, index, 'content')
                      }}
                    >
                      {content}
                    </div>
                  )
                } else {
                  return (
                    <MathJaxContext key={index}>
                      <MathJax>
                        <div
                          onClick={toggleEditMode}
                          className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                          style={listStyle}
                        >
                          {content}
                        </div>
                      </MathJax>
                    </MathJaxContext>
                  )
                }
              }
              return (
                <div
                  key={index}
                  className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                  contentEditable={canEdit}
                  onFocus={() => {
                    if (canEdit) {
                      setIsEditMode(true)
                    }
                  }}
                  onBlur={(e) => {
                    const modifiedContent = [...slide.content]
                    modifiedContent[contentIndex] = e.target.innerText
                    handleSlideEdit(modifiedContent, index, 'content')
                  }}
                  dangerouslySetInnerHTML={{ __html: wrapWithLiTags(content) }}
                ></div>
              )
            }
          )}
          imgs={slide.images as string[]}
          update_callback={updateImgUrlArray(index)}
        />
      )
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      {share && (
        <div>
          <label className='text-sm text-zinc-100'>View only link:</label>
          <ClickableLink
            link={`${host}/shared/${sessionStorage.getItem('project_id')}`}
          />
        </div>
      )}
      {!viewingMode && (
        <label className='text-sm text-zinc-100'>
          Save status: {saveStatus}
        </label>
      )}

      {/* buttons and contents */}
      <div className='relative w-fit h-fit flex flex-row items-center justify-center gap-4'>
        <ToastContainer />
        <SlideLeftNavigator
          currentSlideIndex={currentSlideIndex}
          slides={slides}
          goToSlide={goToSlide}
        />
        <SlideContainer
          present={present}
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          viewingMode={viewingMode}
          scale={scale}
          templateDispatch={templateDispatch}
        />
        <SlideRightNavigator
          currentSlideIndex={currentSlideIndex}
          slides={slides}
          goToSlide={goToSlide}
        />

        {/* buttons for change layout, present, add and save slides */}
        <div className='absolute -right-[10rem] top-[7rem] flex flex-col justify-between items-center mb-6 gap-[1.25rem] ml-[6rem]'>
          <PresentButton openPresent={openPresent} />
          {!viewingMode && (
            <ShareToggleButton setShare={setShare} share={share} />
          )}

          {!viewingMode && (
            <LayoutChanger
              openModal={openModal}
              showLayout={showLayout}
              closeModal={closeModal}
              currentSlideIndex={currentSlideIndex}
              templateSamples={templateSamples}
              slides={slides}
              handleSlideEdit={handleSlideEdit}
            />
          )}
          {!viewingMode && <SaveButton saveSlides={saveSlides} />}
          <AddSlideButton />
          <DeleteSlideButton />
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
      <div className='mx-auto max-w-3xl py-6 justify-center items-center flex flex-row gap-4 overflow-x-auto'>
        <div className='h-24 py-6 flex gap-2'>
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
          <div className='w-14 h-11 opacity-20 bg-zinc-100 rounded-md' />
        </div>
      </div>
    </div>
  )
}
export default SlidesHTML
