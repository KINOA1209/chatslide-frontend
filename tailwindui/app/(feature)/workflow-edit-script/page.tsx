'use client'

import React, { useState, useRef, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Timer from '@/components/ui/Timer'
import GoBackButton from '@/components/button/GoBackButton'
import ImageList from '@/components/ImageList'
import ProjectProgress from '@/components/newWorkflowSteps'
import AuthService from '@/components/utils/AuthService'
import FeedbackButton from '@/components/slides/feedback'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoadingIcon } from '@/components/ui/progress'
import mixpanel from 'mixpanel-browser'
import { LeftTurnArrowIcon, QuestionExplainIcon } from '../icons'
import NewWorkflowGPTToggle from '@/components/button/NewWorkflowGPTToggle'
interface UpdateButtonProps {
  callback: Function
  text: string
  ind: number
}

interface TranscriptWithTitle {
  title: string
  subtitle: string
  script: string
}
const UpdateButton = ({ callback, text, ind }: UpdateButtonProps) => {
  const [updating, setUpdating] = useState(false)

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    ask: string
  ) => {
    setUpdating((old) => {
      return true
    })
    callback(e, index, ask).then(() => {
      setUpdating((old) => {
        return false
      })
    })
  }

  return (
    <button
      key={ind + text}
      className='btn w-[154px] text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400'
      onClick={(e) => handleClick(e, ind, 'shorter')}
      disabled={updating}
    >
      <div className='h-[22px] mr-2' hidden={!updating}>
        <LoadingIcon />
      </div>
      {text}
    </button>
  )
}

const TranscriptVisualizer = ({
  transcripts,
}: //   imageUrls,
{
  transcripts: TranscriptWithTitle[]
  //   imageUrls: []
}) => {
  // const [transcriptList, setTranscriptList] = useState<string[]>(transcripts)
  const [transcriptList, setTranscriptList] =
    useState<TranscriptWithTitle[]>(transcripts)
  const router = useRouter()
  const [hasSlides, setHasSlides] = useState<boolean>(false)
  const [authToken, setAuthToken] = useState<string>()

  //   useEffect(() => {
  //     if (typeof window !== 'undefined') {
  //       const slidesFlag = sessionStorage.getItem('image_files')
  //       if (slidesFlag !== null) {
  //         setHasSlides(true)
  //       }
  //     }
  //   }, [])

  useEffect(() => {
    const fetchData = async () => {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
      setAuthToken(idToken)
    }

    fetchData()
  }, [])

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let newData = [...transcriptList] // copying the old datas array
    newData[index].script = event.target.value // replace e.target.value with whatever you want to change it to
    sessionStorage.setItem('transcripts', JSON.stringify(newData))
    setTranscriptList(newData) // use the copy to set the state
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log('submitting')
    event.preventDefault()
    sessionStorage.setItem('transcripts', JSON.stringify(transcriptList))

    setIsSubmitting(true)

    const foldername =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('foldername')
        : null
    const topic =
      typeof window !== 'undefined' ? sessionStorage.getItem('topic') : null
    const language =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('language')
        : 'English'

    const formData = {
      res: transcriptList,
      foldername: foldername,
      topic: topic,
      language: language,
    }

    console.log(formData)

    try {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
      mixpanel.track('Audio Generated', {
        'Project ID': foldername,
        Topic: topic,
        Language: language,
      })
      const response = await fetch('/api/generate_audio', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const resp = await response.json()
        console.log(resp)
        setIsSubmitting(false)
        // Store the data in local storage
        console.log(resp.data)
        sessionStorage.setItem('audio_files', JSON.stringify(resp.data.res))

        // Redirect to a new page with the data
        router.push('workflow-review-audio')
      } else {
        alert('Request failed: ' + response.status)
        console.log(response)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false)
    }
  }

  // const handleUpdateScript = async (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   index: number,
  //   ask: string
  // ) => {
  //   e.preventDefault()
  //   const text = transcriptList[index]
  //   const language =
  //     typeof window !== 'undefined'
  //       ? sessionStorage.getItem('language')
  //       : 'English'
  //   const updateData = {
  //     ask: ask,
  //     text: text,
  //     language: language,
  //   }
  //   console.log(updateData)

  //   try {
  //     const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
  //     mixpanel.track('Script Updated', {
  //       Ask: ask,
  //       Text: text,
  //       Language: language,
  //     })
  //     const response = await fetch('/api/update_script', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${idToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updateData),
  //     })

  //     if (response.ok) {
  //       const resp = await response.json()
  //       console.log(resp.data)
  //       const res = resp.data.res
  //       // Update local data
  //       let newData = [...transcriptList]
  //       newData[index] = res
  //       sessionStorage.setItem('transcripts', JSON.stringify(newData))
  //       setTranscriptList(newData)
  //       toast.success('Script has been updated!', {
  //         position: 'top-center',
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light',
  //       })
  //     } else {
  //       alert('Request failed: ' + response.status)
  //       console.log(response)
  //     }
  //   } catch (error) {
  //     console.error('Error:', error)
  //   }
  // }
  const handleUpdateScript = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    ask: string
  ) => {
    e.preventDefault()
    const { title, subtitle, script } = transcriptList[index]
    const language =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('language')
        : 'English'

    const updateData = {
      ask: ask,
      text: script, // Use the 'script' field from the object
      language: language,
    }

    console.log(updateData)

    try {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
      mixpanel.track('Script Updated', {
        Ask: ask,
        Text: script, // Use the 'script' field from the object
        Language: language,
      })

      const response = await fetch('/api/update_script', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        const resp = await response.json()
        console.log(resp.data)
        const res = resp.data.res

        // Update local data
        let newData = [...transcriptList]
        newData[index] = { title, subtitle, script: res }
        sessionStorage.setItem('transcripts', JSON.stringify(newData))
        setTranscriptList(newData)

        toast.success('Script has been updated!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      } else {
        alert('Request failed: ' + response.status)
        console.log(response)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      {transcriptList.map((data, index) => (
        <div className='rounded bg-[#FCFCFC] border-solid border-2 border-blue-200 mb-[1rem]'>
          <div className='flex flex-col px-4 py-2'>
            <div className='text-gray-400 text-xs font-bold font-creto-medium leading-tight tracking-tight'>
              Section{index + 1}
            </div>
            <div className='text-neutral-900 text-lg font-bold font-creto-medium leading-tight tracking-tight'>
              {data.title}
            </div>
            <div className='text-neutral-900 text-base font-medium font-creto-medium leading-tight tracking-tight'>
              {data.subtitle}
            </div>
          </div>

          <div
            id={index.toString()}
            tabIndex={index}
            className='w-full flex flex-col md:flex-row  mt-4 focus-within:border-blue-600]'
          >
            <div className={`grid grow`}>
              {/* {hasSlides && authToken && <ImageList urls={[imageUrls[index]]} token={authToken} height={100} />} */}
              <textarea
                key={index}
                className={`h-80 block form-input w-full text-gray-800 mb-2 resize-none border-none p-4`}
                value={data.script}
                onChange={(event) => handleChange(index, event)}
                // readOnly
              />
            </div>
            <div className='flex flex-row items-center px-1.5 py-2 md:flex-col shrink-0'>
              {/* <button key={index + 'shorter'} className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full" onClick={e => handleUpdateScript(e, index, 'shorter')}>
                            Shorter
                        </button>
                        <button key={index + 'funnier'} className="mt-4 btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full" onClick={e => handleUpdateScript(e, index, 'funnier')}>
                            Funnier
                        </button> */}
              <UpdateButton
                callback={handleUpdateScript}
                text={'shorter'}
                ind={index}
              />
              <div className='ml-4 md:ml-0 md:mt-4'>
                <UpdateButton
                  callback={handleUpdateScript}
                  text={'funnier'}
                  ind={index}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Form */}
      {/* <div className='max-w-sm mx-auto'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-wrap -mx-3 mt-6'>
            <div className='w-full px-3'>
              <button
                className='btn text-white bg-gradient-to-r from-purple-500 to-purple-700 font-bold hover:bg-blue-700 w-full disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Generating...' : '🚀 Generate Audio'}
              </button>
            </div>
          </div>
        </form>
      </div> */}
      {/* <Timer expectedSeconds={60} isSubmitting={isSubmitting} /> */}
    </div>
  )
}

export default function WorkflowStep4() {
  const storedOutline =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('outline')
      : null
  const outline = storedOutline ? JSON.parse(storedOutline) : null
  const outlineRes = outline ? JSON.parse(outline.res) : null

  const transcriptData =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('transcripts')
      : null
  // parsed transcriptData
  const transcripts = transcriptData ? JSON.parse(transcriptData) : []

  const flattenedOutline = Object.keys(outlineRes).flatMap((sectionIndex) => {
    const section = outlineRes[sectionIndex]
    return section.content.map((subtitle: string) => ({
      title: section.title,
      subtitle,
    }))
  })

  const transcriptWithTitleData = flattenedOutline.map((item, index) => ({
    title: item.title,
    subtitle: item.subtitle,
    script: transcripts[index] || '',
  }))

  const [transcriptWithTitle, setTranscriptWithTitle] = useState<
    TranscriptWithTitle[]
  >(transcriptWithTitleData)
  const foldername =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('foldername')
      : ''
  useEffect(() => {
    // if (outlineRes && transcripts) {
    //   // Flatten the 'outlineRes' data
    //   const flattenedOutline = Object.keys(outlineRes).flatMap(
    //     (sectionIndex) => {
    //       const section = outlineRes[sectionIndex]
    //       return section.content.map((subtitle: string) => ({
    //         title: section.title,
    //         subtitle,
    //       }))
    //     }
    //   )

    //   console.log('flattened outline: ', flattenedOutline)
    //   console.log('transcriptData: ', transcriptData)
    //   // Combine 'flattenedOutline' and 'transcript' data
    //   const transcriptWithTitleData = flattenedOutline.map((item, index) => ({
    //     title: item.title,
    //     subtitle: item.subtitle,
    //     script: transcripts[index] || '',
    //   }))

    //   console.log('transcriptData with title:', transcriptWithTitleData)
    // setTranscriptWithTitle(transcriptWithTitleData)
    // Store 'transcriptWithTitle' in session storage
    sessionStorage.setItem(
      'transcriptWithTitle',
      JSON.stringify(transcriptWithTitleData)
    )
  }, [])

  useEffect(() => {
    console.log(
      'transcriptData with title state variable:',
      transcriptWithTitle
    )
  }, [transcriptWithTitle])
  //   const image_files =
  //     typeof sessionStorage !== 'undefined'
  //       ? JSON.parse(sessionStorage.getItem('image_files') || '[]')
  //       : []
  //   const imageUrls = image_files.map(
  //     (filename: string) =>
  //       `/api/jpg?foldername=${foldername}&filename=${filename}`
  //   )
  const contentRef = useRef<HTMLDivElement>(null)
  const [isGpt35, setIsGpt35] = useState(true)
  const [showPopup, setShowPopup] = useState(false) // State for the popup visibility
  const [activeSection, setActiveSection] = useState(-1)
  const router = useRouter()
  // Function to open the popup
  const openPopup = () => {
    setShowPopup(true)
  }

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false)
  }

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: number) => {
    const sectionElement = document.getElementById(String(sectionId))
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div>
      <ToastContainer />
      {/* <ProjectProgress currentInd={3} contentRef={contentRef} />
      <div className='pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20'>
        <h1 className='h1'>Edit Script</h1>
      </div> */}
      {/* flex col container for steps, title, generate slides button etc */}
      <div className='fixed mt-[3rem] flex flex-col w-full bg-Grey-50 justify-center z-10 gap-1 py-[0.75rem] border-b-2'>
        {/* steps bar */}
        <div className='self-center'>
          <ProjectProgress currentInd={3} contentRef={contentRef} />
        </div>

        {/* gpt model switch area */}
        <div className='self-end mx-[5rem] flex flex-row gap-4 cursor-pointer'>
          <NewWorkflowGPTToggle setIsGpt35={setIsGpt35} />
          <div className='cursor-pointer' onClick={openPopup}>
            <QuestionExplainIcon />
          </div>
        </div>

        {/* Popup for explaining model difference */}
        {showPopup && (
          <div className='fixed top-[15%] left-[70%] w-[27rem] h-48 bg-gradient-to-l from-gray-950 to-slate-600 rounded-md shadow backdrop-blur-2xl flex flex-col'>
            {/* Popup content */}
            {/* You can add content, explanations, and close button here */}
            <div
              onClick={closePopup}
              className='text-gray-50 cursor-pointer self-end px-4 py-2'
            >
              Close
            </div>
            {/* columns for two models */}
            <div className='grid grid-cols-2 gap-8'>
              <div className='flex flex-col justify-center items-center border-r-2 border-black/25'>
                <div className='w-32 h-10 text-center mb-4'>
                  <span className='text-zinc-100 text-2xl font-normal font-creato-medium leading-loose tracking-wide'>
                    GPT
                  </span>
                  <span className='text-zinc-100 text-2xl font-bold font-creato-medium leading-loose tracking-wide'>
                    {' '}
                    3.5
                  </span>
                </div>
                <div className="w-40 h-12 text-center text-neutral-300 text-xs font-normal font-['Creato Display'] leading-tight tracking-tight mb-[1.5rem]">
                  Fast generation, great for small projects.
                </div>
                <div className="w-40 h-5 text-center text-zinc-100 text-xs font-medium font-['Creato Display'] leading-tight tracking-tight">
                  Available to All Users
                </div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div className='w-32 h-10 text-center mb-4'>
                  <span className='text-zinc-100 text-2xl font-normal font-creato-medium leading-loose tracking-wide'>
                    GPT
                  </span>
                  <span className='text-zinc-100 text-2xl font-bold font-creato-medium leading-loose tracking-wide'>
                    {' '}
                  </span>
                  <span className='text-violet-500 text-2xl font-bold font-creato-medium leading-loose tracking-wide'>
                    4.0
                  </span>
                </div>
                <div className='w-40 h-12 text-center text-neutral-300 text-xs font-normal font-creato-medium leading-tight tracking-tight mb-[1.5rem]'>
                  Master of deep & complex subjects.
                </div>
                <div className='w-40 h-5 text-center text-zinc-100 text-xs font-medium font-creato-medium leading-tight tracking-tight'>
                  Exclusive to Plus & Pro Users
                </div>
              </div>
            </div>
          </div>
        )}

        {/* flex row container for backlink, title*/}
        <div className='flex justify-start items-center mx-[5rem]'>
          <div
            className='flex-row justify-center items-center gap-4 cursor-pointer hidden sm:flex'
            onClick={() => router.push('/workflow-review-slides')}
          >
            <LeftTurnArrowIcon></LeftTurnArrowIcon>
            <div className='text-center self-center text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap hidden sm:block'>
              Back to Slides
            </div>
          </div>

          <div className='flex-auto text-center self-center text-neutral-900 text-xl font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap hidden sm:block'>
            Edit Script
          </div>

          <div className='w-[9rem]'></div>

          {/* <div className='flex flex-grow'></div> */}
        </div>

        <div className='flex-auto text-center self-center text-neutral-900 font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap sm:hidden'>
          Use our desktop version to see all the functionalities!
        </div>
      </div>

      {/* overview nav section */}
      <div className='w-1/4 fixed top-[16.5rem] overflow-y-auto flex justify-center'>
        <div className='w-2/3 bg-neutral-50 rounded-md border border-gray-200 hidden sm:block'>
          <div className='h-5 text-neutral-900 text-xs font-bold font-creato-medium leading-tight tracking-wide px-4 py-3'>
            OVERVIEW
          </div>
          <ol className='list-none px-4 py-4'>
            {transcriptWithTitle?.map((section, index) => (
              <li
                className='pb-2 opacity-60 text-neutral-900 text-s font-medium font-creato-medium leading-normal tracking-tight cursor-pointer hover:text-black  hover:rounded-md hover:bg-gray-200'
                key={index}
                onClick={() => scrollToSection(index)}
              >
                <span className=''>
                  {index + 1}. {section.subtitle}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className='mt-[10rem] max-w-4xl mx-auto grow' ref={contentRef}>
        <TranscriptVisualizer transcripts={transcriptWithTitle} />
      </div>
      <FeedbackButton />
    </div>
  )
}
