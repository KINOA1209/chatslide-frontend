'use client'

import React, { useState, MouseEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import CSS from 'csstype'
import AuthService from '@/services/AuthService'

interface StepProps {
  id: number
  current: boolean
  finished: boolean
  desc: string
  redirect: string
  unavailable?: boolean
}

const StepStyle: CSS.Properties = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: '3px',
  fontSize: '15px',
}

const OneStep: React.FC<StepProps> = ({
  id,
  current,
  finished,
  desc,
  redirect,
  unavailable = false,
}) => {
  const router = useRouter()

  let exitClass = 'bg-blue-500 border-blue-500 text-white text-center'
  let enterClass = 'bg-blue-700 border-blue-700 text-white text-center'
  let textEnterClass = 'text-blue-700 ml-3'

  const [circleClass, setCircleClass] = useState(exitClass)
  const [textClass, setTextClass] = useState('ml-3')

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    router.push(redirect)
  }

  const handleHoverEnter = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setCircleClass(enterClass)
    setTextClass(textEnterClass)
  }

  const handleHoverLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setCircleClass(exitClass)
    setTextClass('ml-3')
  }

  if (current) {
    return (
      <div className='w-full h-14 flex items-center'>
        <div
          className='bg-white border-blue-500 text-blue-500 text-center'
          style={StepStyle}
        >
          {id}
        </div>
        <span className='text-blue-500 ml-3'>{desc}</span>
      </div>
    )
  } else if (finished) {
    return (
      <div
        className='w-full h-14 flex items-center cursor-pointer'
        onClick={handleClick}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
        <div className={circleClass} style={StepStyle}>
          {id}
        </div>
        <span className={textClass}>{desc}</span>
      </div>
    )
  } else if (unavailable) {
    return (
      <div className='w-full h-14 flex items-center'>
        <div
          className='bg-gray-400 border-gray-400 text-white text-center'
          style={StepStyle}
        >
          {id}
        </div>
        <span className='text-gray-400 ml-3 line-through'>{desc}</span>
      </div>
    )
  } else {
    return (
      <div className='w-full h-14 flex items-center'>
        <div
          className='bg-gray-400 border-gray-400 text-white text-center'
          style={StepStyle}
        >
          {id}
        </div>
        <span className='text-gray-400 ml-3'>{desc}</span>
      </div>
    )
  }
}

interface Current {
  currentInd: number
  contentRef: React.RefObject<HTMLDivElement>
}

// General progress indicator component
const ProgressBox = (
  steps: string[],
  redirect: string[],
  finishedStepsFunc: () => number[],
  unavailableStepsFunc: () => number[]
) => {
  const stepRedirectPair = steps.map((desc, index) => {
    return [desc, redirect[index]]
  })
  const CurrentProgress: React.FC<Current> = ({ currentInd, contentRef }) => {
    const progressRefDesktop = useRef<HTMLDivElement>(null)
    const progressRefMobile = useRef<HTMLDivElement>(null)
    const [mobileDisplay, setMobileDisplay] =
      useState<CSS.Property.Display>('none')
    const [desktopVisibility, setDesktopVisibility] =
      useState<CSS.Property.Visibility>('hidden')
    const [mobileOpended, setMobileOpened] = useState<boolean>(false)
    const [mobileButtonDisplay, setMobileButtonDisplay] =
      useState<CSS.Property.Display>('none')
    const router = useRouter()
    const [user, setUser] = useState(null)

    const [finishedSteps, setFinishedSteps] = useState<number[]>([])
    const [unavailableSteps, setUnavailableSteps] = useState<number[]>([])

    useEffect(() => {
      setFinishedSteps(finishedStepsFunc())
      setUnavailableSteps(unavailableStepsFunc())
    }, [])

    // fire on every window resize
    const handSidebarPosition = () => {
      if (window && document) {
        // Constants -> working for workflow now
        const minTitleHeight = 100
        const headerHeight = 80
        const gap = 20

        const viewWidth = window.innerWidth
        const viewHeight = window.innerHeight
        const pageHeight = document.body.scrollHeight
        const scrollPos = window.scrollY

        var contentWidth = viewWidth
        if (contentRef.current) {
          contentWidth = contentRef.current.offsetWidth
        }
        var progressWidth = 0
        var progressHeight = 0
        if (
          progressRefDesktop.current &&
          progressRefDesktop.current.offsetWidth > 0
        ) {
          progressWidth = progressRefDesktop.current.offsetWidth
          progressHeight = progressRefDesktop.current.offsetHeight
        }
        const marginAvailable = (viewWidth - contentWidth) / 2
        if (
          progressRefDesktop.current &&
          marginAvailable >= gap + progressWidth
        ) {
          setDesktopVisibility('visible')
          setMobileButtonDisplay('none')
          setMobileOpened(false)
          progressRefDesktop.current.style.left = `${
            marginAvailable - gap - progressWidth
          }px`
          progressRefDesktop.current.style.top = `${Math.max(
            (viewHeight - headerHeight - progressHeight) / 2,
            minTitleHeight
          )}px`
          progressRefDesktop.current.style.bottom = ''
          if (viewHeight < 650 && pageHeight - scrollPos - viewHeight < 100) {
            const footerHeight = 100 - (pageHeight - scrollPos - viewHeight)
            progressRefDesktop.current.style.top = ''
            progressRefDesktop.current.style.bottom = `${footerHeight}px`
          }
        } else {
          setDesktopVisibility('hidden')
          setMobileButtonDisplay('flex')
        }
      }
    }

    useEffect(() => {
      handSidebarPosition()
      window.addEventListener('resize', handSidebarPosition)
      window.addEventListener('scroll', handSidebarPosition)
    }, [])

    // Mobile sidebar panel is only determined by mobileOpened
    useEffect(() => {
      if (mobileOpended) {
        setMobileDisplay('flex')
      } else {
        setMobileDisplay('none')
      }
    }, [mobileOpended])

    useEffect(() => {
      // Create a scoped async function within the hook.
      const fetchUser = async () => {
        try {
          const currentUser = await AuthService.getCurrentUser()
          setUser(currentUser)
        } catch (error: any) {}
      }
      // Execute the created function directly
      fetchUser()
    }, [])

    const handleMobileClose = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setMobileOpened(false)
    }

    const handleMobileOpen = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setMobileOpened(true)
    }

    const handleDashboard = (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      router.push('/dashboard')
    }

    const dashboardButton = user ? (
      <div
        className='w-full h-14 flex items-center cursor-pointer'
        onClick={handleDashboard}
      >
        <div
          className='w-full bg-gradient-to-r from-blue-600  to-purple-500 text-white text-center rounded-2xl flex justify-center items-center'
          style={{ height: '30px' }}
        >
          <span className='w-fit h-fit'>Projects</span>
        </div>
      </div>
    ) : (
      <></>
    )

    return (
      <>
        {/* open mobile sidebar button */}
        <div
          className='select-none fixed rounded-full bottom-20 left-10 w-16 h-16 flex items-center justify-center border-solid border-2 border-blue-200 text-blue-600 cursor-pointer'
          style={{
            display: mobileButtonDisplay,
            background: `radial-gradient(closest-side, white 61%, transparent 60% 100%),conic-gradient(#0070f4 ${
              ((currentInd + 1) / steps.length) * 100
            }%, white 0)`,
          }}
          onClick={handleMobileOpen}
        >
          <div>
            {currentInd + 1}/{steps.length}
          </div>
        </div>
        <div
          style={{ visibility: desktopVisibility }}
          className='fixed w-fit select-none grow-0'
          ref={progressRefDesktop}
        >
          <div className='-top-4 p-5 mb-6 flex justify-center border-r-2 border-r-blue-200 sticky'>
            <div className='w-fit flex flex-col flex-nowrap content-start'>
              {dashboardButton}
              {stepRedirectPair.map((pair, index) => (
                <OneStep
                  key={`step` + index.toString()} // Add a unique key prop here
                  id={index + 1}
                  current={currentInd === index}
                  finished={finishedSteps.includes(index)}
                  desc={pair[0]}
                  redirect={pair[1]}
                  unavailable={unavailableSteps.includes(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          style={{ display: mobileDisplay }}
          className='fixed top-0 left-0 w-full h-full z-10 bg-gray-500/75 items-center justify-center'
          onClick={handleMobileClose}
        >
          <div
            className='w-fit select-none grow-0 drop-shadow-xl border-solid border-2 border-blue-600 rounded-lg bg-white z-20 fixed'
            ref={progressRefMobile}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className='-top-4 flex justify-center sticky'>
              <div className='w-fit flex flex-col flex-nowrap content-start'>
                <div className='flex flex-row-reverse'>
                  <div
                    className='text-lg opacity-25 hover:opacity-100 cursor-pointer'
                    onClick={handleMobileClose}
                  >
                    <svg
                      className='w-12'
                      data-name='Capa 1'
                      id='Capa_1'
                      viewBox='0 0 20 19.84'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z' />
                    </svg>
                  </div>
                </div>
                <div className='px-5 pb-5'>
                  {dashboardButton}
                  {stepRedirectPair.map((pair, index) => (
                    <OneStep
                      key={index} // Add a unique key prop here
                      id={index + 1}
                      current={currentInd === index}
                      finished={finishedSteps.includes(index)}
                      desc={pair[0]}
                      redirect={pair[1]}
                      unavailable={unavailableSteps.includes(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  return CurrentProgress
}

// Set up actual progress indicators with texts and redirections
const ProjectProgress = () => {
  const steps = ['Topic', 'Outlines', 'Slides', 'Script', 'Audio', 'Video']
  const redirect = [
    '/workflow-generate-outlines',
    '/workflow-edit-outlines',
    '/workflow-review-slides',
    '/workflow-edit-script',
    '/workflow-review-audio',
    '/workflow-review-video',
  ]
  const projectFinishedSteps: () => number[] = () => {
    const finishedStepsArray: number[] = []
    if (typeof window !== 'undefined' && sessionStorage.getItem('topic')) {
      finishedStepsArray.push(0)
    }
    if (typeof window !== 'undefined' && sessionStorage.getItem('outline')) {
      finishedStepsArray.push(1)
    }
    if (typeof window !== 'undefined' && sessionStorage.getItem('presentation_slides')) {
      finishedStepsArray.push(2)
    }
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('transcripts')
    ) {
      finishedStepsArray.push(3)
    }
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('audio_files')
    ) {
      finishedStepsArray.push(4)
    }
    if (typeof window !== 'undefined' && sessionStorage.getItem('video_file')) {
      finishedStepsArray.push(5)
    }
    return finishedStepsArray
  }
  const projectUnavailableSteps: () => number[] = () => {
    const unavailableStepsArray: number[] = []
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('has_slides') == 'false'
    ) {
      unavailableStepsArray.push(2)
    }
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('has_script') == 'false'
    ) {
      unavailableStepsArray.push(3)
    }
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('has_audio') == 'false'
    ) {
      unavailableStepsArray.push(4)
    }
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('has_video') == 'false'
    ) {
      unavailableStepsArray.push(5)
    }
    return unavailableStepsArray
  }
  return ProgressBox(
    steps,
    redirect,
    projectFinishedSteps,
    projectUnavailableSteps
  )
}

export default ProjectProgress()
