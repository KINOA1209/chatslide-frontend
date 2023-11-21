'use client'

import React, { useState, MouseEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import CSS from 'csstype'
import AuthService from '@/components/utils/AuthService'
import { RightArrowIcon } from '@/app/(feature)/icons'
import { NewStepIcon, CurrentStepIcon, FinishedStepIcon } from './icons';

interface StepProps {
  id: number
  current: boolean
  finished: boolean
  desc: string
  redirect: string
  unavailable?: boolean
  isLastStep: boolean // Pass this prop to indicate if it's the last step
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
  isLastStep, // Pass this prop to indicate if it's the last step
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

  // Conditionally render the RightArrowIcon based on whether it's the last step
  const renderRightArrow = <div className='hidden lg:flex'>{!isLastStep ? <RightArrowIcon /> : null}</div>

  if (current) {
    return (
      <div className='w-full flex items-center'>
        {/* <div
          className='bg-white border-blue-500 text-blue-500 text-center'
          style={StepStyle}
        >
          {id}
        </div> */}
        <span className='text-neutral-800 text-sm font-medium font-creato-bold leading-normal tracking-tight mx-3 overflow-x-auto inline-flex items-center gap-1'>
          <CurrentStepIcon />{desc}
        </span>
        {renderRightArrow}
      </div>
    )
  } else if (finished) {
    return (
      <div
        className='w-full flex items-center cursor-pointer hidden md:flex'
        onClick={handleClick}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
        {/* <div className={circleClass} style={StepStyle}>
          {id}
        </div> */}
        <span
          className={` mx-3 text-gray-600 text-sm font-normal font-creato-medium leading-normal tracking-tight ${textClass} overflow-x-auto inline-flex items-center gap-1`}
        >
          <FinishedStepIcon />{desc}
        </span>
        {renderRightArrow}
      </div>
    )
  } else if (unavailable) {
    return (
      <div className='w-full flex items-center hidden md:flex'>
        {/* <div
          className='bg-gray-400 border-gray-400 text-white text-center'
          style={StepStyle}
        >
          {id}
        </div> */}
        <span className='text-gray-600 text-sm font-normal font-creato-medium leading-normal tracking-tight mx-3 overflow-x-auto inline-flex items-center gap-1'>
          <NewStepIcon />{desc}
        </span>
        {renderRightArrow}
      </div>
    )
  } else {
    return (
      <div className='w-full flex items-center hidden md:flex'>
        {/* <div
          className='bg-gray-400 border-gray-400 text-white text-center'
          style={StepStyle}
        >
          {id}
        </div> */}
        <span className='text-gray-600 text-sm font-normal font-creato-medium leading-normal tracking-tight mx-3 overflow-x-auto inline-flex items-center gap-1'>
          <NewStepIcon />{desc}
        </span>
        {renderRightArrow}
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

    // useEffect(() => {
    //   handSidebarPosition()
    //   window.addEventListener('resize', handSidebarPosition)
    //   window.addEventListener('scroll', handSidebarPosition)
    // }, [])

    // Mobile sidebar panel is only determined by mobileOpened
    // useEffect(() => {
    //   if (mobileOpended) {
    //     setMobileDisplay('flex')
    //   } else {
    //     setMobileDisplay('none')
    //   }
    // }, [mobileOpended])

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
        <div
          //   style={{ visibility: desktopVisibility }}
          className='w-fit select-none grow-0'
          ref={progressRefDesktop}
        >
          {/* <div className='-top-4 p-5 mb-6 flex justify-center border-2 border-r-blue-200 sticky'> */}
          <div className='flex justify-center'>
            <div className='w-fit flex flex-row flex-nowrap content-start'>
              {/* <div className='w-fit flex flex-col flex-nowrap content-start'> */}
              {/* {dashboardButton} */}
              {stepRedirectPair.map((pair, index) => (
                <OneStep
                  key={`step` + index.toString()} // Add a unique key prop here
                  id={index + 1}
                  current={currentInd === index}
                  finished={finishedSteps.includes(index)}
                  desc={pair[0]}
                  redirect={pair[1]}
                  unavailable={unavailableSteps.includes(index)}
                  isLastStep={index === stepRedirectPair.length - 1} // Check if it's the last step
                />
              ))}
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
  const steps = ['Summary', 'Post']
  const redirect = [
    '/workflow-generate-socialpost',
    '/workflow-review-socialpost',
  ]
  const projectFinishedSteps: () => number[] = () => {
    const finishedStepsArray: number[] = []
    if (typeof window !== 'undefined' && sessionStorage.getItem('topic')) {
      finishedStepsArray.push(0)
    }
    if (typeof window !== 'undefined' && sessionStorage.getItem('socialPost')) {
      finishedStepsArray.push(1)
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
