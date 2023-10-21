import React, { useState, useRef, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import Timer from '@/components/ui/Timer'
import AuthService from '@/components/utils/AuthService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dialog, Transition } from '@headlessui/react'
import GptToggle from '@/components/button/GPTToggle'
import RangeSlider from '../ui/RangeSlider'
import UserService from '../utils/UserService'
import mixpanel from 'mixpanel-browser'
import {
  AddSectionIcon,
  AddTopicIcon,
  DeleteIcon,
  LeftChangeIcon,
  RightChangeIcon,
} from '@/app/(feature)/icons'

const minOutlineDetailCount = 1
const maxOutlineDetailCount = 6
const minOutlineSectionCount = 1
const maxOutlineSectionCount = 10
const maxLength = 60

interface OutlineSection {
  title: string
  content: Array<string>
}

interface OutlineDataType extends Array<OutlineSection> {}

const OutlineVisualizer = ({ outline }: { outline: OutlineDataType }) => {
  const [detailOptions, setDetailOptions] = useState([
    { detailLevel: 'More Slides', description: 'detailed' },
    { detailLevel: 'Fewer Slides', description: 'concise' },
    // { detailLevel: 'Normal Slides', description: 'Medium' },
  ])
  //   const [selectedDetail, setSelectedDetail] = useState(detailOptions[0])
  const router = useRouter()
  const [outlineData, setOutlineData] = useState(outline)
  const [detailLevels, setDetailLevels] = useState(
    Array(outline.length).fill(0)
  )
  const [sectionEditMode, setSectionEditMode] = useState(-1)
  const [titleCache, setTitleCache] = useState('')
  const [isGpt35, setIsGpt35] = useState(true)
  const [slidePages, setSlidePages] = useState(20)
  const [wordPerSubpoint, setWordPerSubpoint] = useState(10)
  const [isPaidUser, setIsPaidUser] = useState<boolean>(false)
  const [hoveredDetailIndex, setHoveredDetailIndex] = useState(-1)
  const [hoveredSectionIndex, setHoveredSectionIndex] = useState(-1)

  useEffect(() => {
    ;(async () => {
      try {
        const result = await UserService.isPaidUser()
        setIsPaidUser(result)
      } catch (error) {
        console.error("Error fetching user's payment status:", error)
        // Handle error appropriately
      }
    })()
  }, [])

  //   const handleDetailLevelOptionChange = (increment: number) => {
  //     const currentIndex = detailOptions.indexOf(selectedDetail)
  //     const totalOptions = detailOptions.length
  //     //If the selectedDetail is found in the array (meaning currentIndex is not -1),
  //     if (currentIndex !== -1) {
  //       const newIndex = (currentIndex + increment + totalOptions) % totalOptions
  //       setSelectedDetail(detailOptions[newIndex])
  //     }
  //   }
  const handleDetailLevelOptionChange = (
    sectionIndex: number,
    increment: number
  ) => {
    setDetailLevels((prevDetailLevels) => {
      const newDetailLevels = [...prevDetailLevels]

      // Calculate the new detail level in a circular manner
      const currentLevel = newDetailLevels[sectionIndex]
      const numberOfOptions = detailOptions.length
      const newIndex = (currentLevel + increment) % numberOfOptions

      // Handle negative results by adding the number of options
      newDetailLevels[sectionIndex] =
        newIndex >= 0 ? newIndex : newIndex + numberOfOptions

      return newDetailLevels
    })
  }

  const handleSlidPagesChange = (n: number) => {
    setSlidePages(20 + n * 10)
  }

  const handleDetailLevelChange = (n: number) => {
    setWordPerSubpoint(15 + n * 10)
  }

  const updateOutlineSessionStorage = (updatedOutline: any) => {
    const entireOutline = JSON.parse(sessionStorage.outline)
    entireOutline.res = JSON.stringify({ ...updatedOutline })
    sessionStorage.setItem('outline', JSON.stringify(entireOutline))
  }

  const handleDetailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    detailIndex: number,
    key: string
  ) => {
    const { value } = e.target
    if (value.length <= maxLength) {
      setOutlineData((prevOutlineData: any) => {
        const updatedOutlineData = [...prevOutlineData]
        updatedOutlineData[sectionIndex]['content'][detailIndex] = value
        updateOutlineSessionStorage(updatedOutlineData)
        return updatedOutlineData
      })
    }
  }

  const [isSubmittingSlide, setIsSubmittingSlide] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isSubmittingScript, setIsSubmittingScript] = useState(false)
  const [toSlides, setToSlides] = useState(true)
  const [isToSlidesOpen, setIsToSlidesOpen] = useState(false)
  const [isToScriptOpen, setIsToScriptOpen] = useState(false)

  function closeToSlidesModal() {
    setIsToSlidesOpen(false)
    setIsSubmittingSlide(false)
  }

  function openToSlidesModal() {
    setIsToSlidesOpen(true)
  }

  function closeToScriptModal() {
    setIsToScriptOpen(false)
    setIsSubmittingScript(false)
  }

  function openToScriptModal() {
    setIsToScriptOpen(true)
  }

  const prepareSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log('submitting')
    event.preventDefault()
    if (toSlides) {
      let hasScript = null
      let hasAudio = null
      let hasVideo = null
      if (typeof window !== 'undefined') {
        hasScript = sessionStorage.getItem('transcripts')
        hasAudio = sessionStorage.getItem('audio_files')
        hasAudio = sessionStorage.getItem('video_file')
      }
      if (hasScript !== null || hasAudio !== null || hasVideo !== null) {
        openToSlidesModal()
      } else {
        setIsSubmittingSlide(true)
        handleSubmit()
      }
    } else {
      let hasSlides = null
      let hasAudio = null
      let hasVideo = null
      if (typeof window !== 'undefined') {
        hasSlides = sessionStorage.getItem('html')
        hasAudio = sessionStorage.getItem('audio_files')
        hasAudio = sessionStorage.getItem('video_file')
      }
      if (hasSlides !== null || hasAudio !== null || hasVideo !== null) {
        openToScriptModal()
      } else {
        setIsSubmittingScript(true)
        handleSubmit()
      }
    }
  }

  const slideModalSubmit = () => {
    closeToSlidesModal()
    setIsSubmittingSlide(true)
    // clean sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pdf_file')
      sessionStorage.removeItem('page_count')
      sessionStorage.removeItem('transcripts')
      sessionStorage.removeItem('audio_files')
      sessionStorage.removeItem('video_file')
    }
    handleSubmit()
  }

  const scriptModalSubmit = () => {
    closeToScriptModal()
    setIsSubmittingScript(true)
    // clean sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('page_count')
      sessionStorage.removeItem('html')
      sessionStorage.removeItem('image_files')
      sessionStorage.removeItem('pdf_file')
      sessionStorage.removeItem('audio_files')
      sessionStorage.removeItem('video_file')
    }
    handleSubmit()
  }

  async function query_resources(
    project_id: any,
    resources: any,
    outlineData: any
  ) {
    const { userId, idToken: token } =
      await AuthService.getCurrentUserTokenAndId()
    const headers = new Headers()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }

    const response = await fetch('/api/query_resources', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        outlines: JSON.stringify({ ...outlineData }),
        resources: resources,
        project_id: project_id,
      }),
    })

    if (response.ok) {
      return await response.json()
    } else {
      // alert("Request failed: " + response.status);
      console.log(response)
      // setIsSubmittingScript(false);
      // setIsSubmittingSlide(false);
    }
  }

  async function generateScripts(formData: any, token: string) {
    mixpanel.track('Generate Script', {
      formData: formData,
    })
    const response = await fetch('/api/scripts_only', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      const resp = await response.json()
      // console.log(resp);
      setIsSubmittingScript(false)
      // Store the data in local storage
      // console.log(resp.data);
      sessionStorage.setItem('transcripts', JSON.stringify(resp.data.res))
      // Redirect to a new page with the data
      router.push('workflow-edit-script')
    } else {
      alert('Request failed: ' + response.status)
      // console.log(response)
      setIsSubmittingScript(false)
    }
  }

  async function generateSlidesPreview(formData: any, token: string) {
    mixpanel.track('Generate HTML', {
      formData: formData,
    })
    const response = await fetch('/api/generate_html', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      const resp = await response.json()
      setIsSubmittingSlide(false)
      sessionStorage.setItem('html', JSON.stringify(resp.data.res))
      router.push('workflow-review-slides')
    } else {
      alert(
        `Server is busy now. Please try again later. Reference code: ` +
          sessionStorage.getItem('project_id')
      )
      console.log(response)
      setIsSubmittingSlide(false)
    }
  }

  const handleSubmit = async () => {
    setTimer(0)
    let formData: any = {}

    // remove empty entries
    const outlineCopy = [...outlineData]
    for (let i = 0; i < outlineCopy.length; i++) {
      outlineCopy[i].content = outlineCopy[i].content.filter((s) => {
        return s.length > 0
      })
    }
    setOutlineData(outlineCopy)
    updateOutlineSessionStorage(outlineCopy)

    const audience =
      typeof window !== 'undefined' ? sessionStorage.getItem('audience') : null
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
    const project_id =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('project_id')
        : null
    const resources =
      typeof window !== 'undefined' ? sessionStorage.getItem('resources') : null
    const addEquations =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('addEquations')
        : null
    const extraKnowledge =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('extraKnowledge')
        : null
    const outline_item_counts =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('outline_item_counts')
        : null

    formData = {
      res: JSON.stringify({ ...outlineData }),
      outlines: JSON.stringify({ ...outlineData }),
      audience: audience,
      foldername: foldername,
      topic: topic,
      language: language,
      project_id: project_id,
      addEquations: addEquations,
      extraKnowledge: extraKnowledge,
      outline_item_counts: outline_item_counts,
      model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
      slidePages: slidePages,
      wordPerSubpoint: wordPerSubpoint,
      // endIndex: 2,  // generate first 2 sections only
    }

    if (resources && resources.length > 0 && !extraKnowledge) {
      try {
        console.log('querying vector database')
        const extraKnowledge = await query_resources(
          project_id,
          resources,
          outlineData
        )
        sessionStorage.setItem(
          'extraKnowledge',
          JSON.stringify(extraKnowledge.data.res)
        )
        sessionStorage.setItem(
          'outline_item_counts',
          JSON.stringify(extraKnowledge.data.outline_item_counts)
        )
        formData.extraKnowledge = extraKnowledge.data.res
        formData.outline_item_counts = extraKnowledge.data.outline_item_counts
        console.log('formData', formData)
      } catch (error) {
        console.log('Error querying vector database', error)
        // return;
      }
    } else {
      console.log('no need to query vector database')
    }

    try {
      const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
      if (toSlides) {
        await generateSlidesPreview(formData, token)
      } else {
        await generateScripts(formData, token)
      }
    } catch (error) {
      console.error('Error:', error)
      setIsSubmittingSlide(false)
      setIsSubmittingScript(false)
    }
  }

  const handleAddDetail = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number,
    detailIndex: number
  ) => {
    e.preventDefault()
    let newOutlineData = [...outlineData]
    newOutlineData[sectionIndex].content.splice(detailIndex + 1, 0, '')
    setOutlineData(newOutlineData)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleDeleteDetail = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number,
    detailIndex: number
  ) => {
    e.preventDefault()
    let newOutlineData = [...outlineData]
    newOutlineData[sectionIndex].content.splice(detailIndex, 1)
    setOutlineData(newOutlineData)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleDeleteSection = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number
  ) => {
    e.preventDefault()
    let newOutlineData = [...outlineData]
    newOutlineData.splice(sectionIndex, 1)
    setOutlineData(newOutlineData)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleAddSection = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number
  ) => {
    e.preventDefault()
    let newOutlineData = [...outlineData]
    newOutlineData.splice(sectionIndex + 1, 0, {
      title: 'New Section',
      content: ['Provide some details about this section'],
    })
    console.log('Add section after section index: ' + sectionIndex)
    setOutlineData(newOutlineData)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleEnterEditSection = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number
  ) => {
    e.preventDefault()
    setTitleCache(outlineData[sectionIndex].title)
    setSectionEditMode(sectionIndex)
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLDivElement>,
    sectionIndex: number
  ) => {
    e.preventDefault()
    if (outlineData[sectionIndex].title.length == 0) {
      toast.error("Outline section can't be empty!", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setOutlineData((prevOutlineData: OutlineDataType) => {
        const updatedOutlineData = [...prevOutlineData]
        updatedOutlineData[sectionIndex].title = titleCache
        updateOutlineSessionStorage(updatedOutlineData)
        return updatedOutlineData
      })
      setTitleCache('')
    }
    setSectionEditMode(-1)
  }

  const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number
  ) => {
    const { value } = e.target
    if (value.length <= maxLength) {
      setOutlineData((prevOutlineData: OutlineDataType) => {
        const updatedOutlineData = [...prevOutlineData]
        updatedOutlineData[sectionIndex].title = value
        updateOutlineSessionStorage(updatedOutlineData)
        return updatedOutlineData
      })
    }
  }

  return (
    <div>
      <ToastContainer />

      {outlineData &&
        outlineData.map((section: OutlineSection, sectionIndex: number) => (
          <>
            {outlineData.length < maxOutlineSectionCount && (
              <div
                className='my-[1.5rem]'
                onClick={(e) => {
                  handleAddSection(e, sectionIndex)
                }}
              >
                <AddSectionIcon />
              </div>
            )}
            <div className='flex flex-row gap-4'>
              <div
                id={String(sectionIndex)}
                key={sectionIndex + 1}
                className='relative w-[40rem] bg-neutral-50 rounded-md shadow border border-gray-200 px-4 py-2'
                onMouseEnter={() => setHoveredSectionIndex(sectionIndex)}
                onMouseLeave={() => setHoveredSectionIndex(-1)}
              >
                <div
                  className='flex flex-col flex-wrap md:flex-nowrap'
                  onClick={(e) => {
                    handleEnterEditSection(e, sectionIndex)
                  }}
                >
                  <h3 className='text-lg'>Section {sectionIndex + 1}</h3>
                  <input
                    key={sectionIndex}
                    className='border-none outline-none focus:outline-slate-300 bg-neutral-50 rounded inline text-xl font-bold grow'
                    value={section.title}
                    onChange={(e) => handleSectionChange(e, sectionIndex)}
                    // onFocus={e => handleFocus(e, sectionIndex)}
                    onBlur={(e) => handleBlur(e, sectionIndex)}
                    autoFocus
                  />
                </div>
                {hoveredSectionIndex === sectionIndex &&
                  outlineData.length > minOutlineSectionCount && (
                    <div
                      className='absolute -top-[7%] right-[10%]'
                      onClick={(e) => {
                        handleDeleteSection(e, sectionIndex)
                      }}
                    >
                      <DeleteIcon></DeleteIcon>
                    </div>
                  )}
                <div className='mt-4'>
                  {section.content.map((content: any, detailIndex: number) => (
                    <ul className='flex mb-2 list-disc px-8'>
                      <li
                        className='w-full relative '
                        onMouseEnter={() => setHoveredDetailIndex(detailIndex)}
                        onMouseLeave={() => setHoveredDetailIndex(-1)}
                      >
                        <input
                          key={detailIndex}
                          className={`form-input border-none w-full text-gray-800 grow  ${
                            hoveredDetailIndex === detailIndex &&
                            sectionIndex === hoveredSectionIndex
                              ? 'bg-gray-200'
                              : 'bg-neutral-50 '
                          }`}
                          value={content}
                          onChange={(e) =>
                            handleDetailChange(
                              e,
                              sectionIndex,
                              detailIndex,
                              'content'
                            )
                          }
                          placeholder={`Detail ${detailIndex + 1}`}
                        />
                        {hoveredDetailIndex === detailIndex &&
                          sectionIndex === hoveredSectionIndex && (
                            <div className='absolute flex flex-row gap-4 bottom-[70%] right-0 mt-1 mr-1'>
                              {outlineData[sectionIndex].content.length >
                                minOutlineDetailCount && (
                                <div
                                  onClick={(e) =>
                                    handleDeleteDetail(
                                      e,
                                      sectionIndex,
                                      detailIndex
                                    )
                                  }
                                >
                                  <DeleteIcon />
                                </div>
                              )}

                              {outlineData[sectionIndex].content.length <
                                maxOutlineDetailCount && (
                                <div
                                  onClick={(e) =>
                                    handleAddDetail(
                                      e,
                                      sectionIndex,
                                      detailIndex
                                    )
                                  }
                                >
                                  <AddTopicIcon />
                                </div>
                              )}
                            </div>
                          )}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
              <div className='"w-48 flex flex-col bg-gray-700 rounded-md border-4 max-h-[16rem] px-2 justify-center items-center gap-8'>
                {/* <div className='flex flex-row'>
                  <LeftChangeIcon></LeftChangeIcon>Concise
                  <RightChangeIcon></RightChangeIcon>
                </div> */}
                <div className='flex flex-row gap-3 justify-center items-center'>
                  <div
                    className='cursor-pointer'
                    onClick={() =>
                      handleDetailLevelOptionChange(sectionIndex, -1)
                    }
                  >
                    <LeftChangeIcon></LeftChangeIcon>
                  </div>
                  <div className='w-20 text-center text-indigo-50 text-xl font-normal font-creato-medium leading-relaxed tracking-tight'>
                    {detailOptions[detailLevels[sectionIndex]].detailLevel}
                  </div>
                  <div
                    className='cursor-pointer'
                    onClick={() =>
                      handleDetailLevelOptionChange(sectionIndex, 1)
                    }
                  >
                    <RightChangeIcon></RightChangeIcon>
                  </div>
                </div>

                <div className='w-40 h-14 text-center'>
                  <span className='text-gray-200 text-xs font-normal font-creato-medium leading-none tracking-tight'>
                    Generate{' '}
                  </span>
                  <span className='text-indigo-300 text-xs font-bold font-creato-medium leading-none tracking-tight'>
                    {detailOptions[detailLevels[sectionIndex]].description}{' '}
                  </span>
                  <span className='text-gray-200 text-xs font-normal font-creato-medium leading-none tracking-tight'>
                    contents for this section
                  </span>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  )
}

export default OutlineVisualizer
