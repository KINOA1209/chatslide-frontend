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
import { AddSectionIcon } from '@/app/(feature)/icons'

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
  const router = useRouter()
  const [outlineData, setOutlineData] = useState(outline)
  const [sectionEditMode, setSectionEditMode] = useState(-1)
  const [titleCache, setTitleCache] = useState('')
  const [isGpt35, setIsGpt35] = useState(true)
  const [slidePages, setSlidePages] = useState(20)
  const [wordPerSubpoint, setWordPerSubpoint] = useState(10)
  const [isPaidUser, setIsPaidUser] = useState<boolean>(false)

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
    e: React.MouseEvent<SVGSVGElement>,
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
    e: React.MouseEvent<SVGSVGElement>,
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
    e: React.MouseEvent<SVGSVGElement>,
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
    setOutlineData(newOutlineData)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleEnterEditSection = (
    e: React.MouseEvent<SVGSVGElement>,
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
          <div key={sectionIndex + 1} className='mb-8 bg-white px-4 py-2'>
            <div className='flex flex-wrap md:flex-nowrap'>
              {sectionIndex === sectionEditMode ? (
                <>
                  <h3 className='text-xl font-bold '>
                    {sectionIndex + 1}.&nbsp;
                  </h3>
                  <input
                    key={sectionIndex}
                    className='focus:outline-none border border-[#7F7F7F] rounded inline text-xl font-bold grow px-2'
                    value={section.title}
                    onChange={(e) => handleSectionChange(e, sectionIndex)}
                    // onFocus={e => handleFocus(e, sectionIndex)}
                    onBlur={(e) => handleBlur(e, sectionIndex)}
                    autoFocus
                  />
                </>
              ) : (
                outlineData.length < maxOutlineSectionCount && (
                  <div className='flex flex-col'>
                    <div
                      className=''
                      onClick={(e) => {
                        handleAddSection(e, sectionIndex)
                      }}
                    >
                      <AddSectionIcon />
                    </div>

                    <h3 className='text-lg'>Section {sectionIndex + 1}</h3>
                    <h3 className='text-xl font-bold'>{section.title}</h3>
                  </div>
                )
              )}
              <div className='flex items-center justify-center'>
                {sectionEditMode == -1 && (
                  <div>
                    <svg
                      onClick={(e) => {
                        handleEnterEditSection(e, sectionIndex)
                      }}
                      className='ml-2 w-5 h-5 md:opacity-25 hover:opacity-100 cursor-pointer'
                      version='1.1'
                      id='_x32_'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <g>
                        <path
                          d='M500.111,71.068l-59.195-59.174c-15.859-15.849-41.531-15.862-57.386-0.014l-38.378,38.378L57.257,338.187
                                        c-7.775,7.768-13.721,17.165-17.443,27.498L1.801,471.476c-3.968,11.039-1.202,23.367,7.086,31.655
                                        c8.298,8.296,20.634,11.046,31.669,7.083l105.778-38.024c10.332-3.722,19.73-9.674,27.501-17.443l277.874-277.888l0.017,0.013
                                        l10.031-10.048l38.353-38.378l0.017-0.007C515.907,112.591,515.973,86.937,500.111,71.068z M136.729,445.475l-67.393,24.227
                                        l-27.02-27.02l24.213-67.393c0.184-0.485,0.416-0.964,0.609-1.441l71.024,71.024C137.679,445.073,137.221,445.302,136.729,445.475z
                                        M153.759,434.678c-0.956,0.956-1.978,1.836-3.011,2.703L74.63,361.263c0.863-1.025,1.739-2.051,2.696-3.007L363.814,71.732
                                        l76.443,76.437L153.759,434.678z M480.031,108.385l-28.319,28.329l-1.421,1.421l-76.444-76.437l29.75-29.75
                                        c4.758-4.74,12.463-4.747,17.245,0.014l59.199,59.174C484.796,95.884,484.806,103.575,480.031,108.385z'
                        />
                      </g>
                    </svg>
                  </div>
                )}

                {outlineData.length > minOutlineSectionCount && (
                  <div>
                    <svg
                      onClick={(e) => {
                        handleDeleteSection(e, sectionIndex)
                      }}
                      className='md:ml-2 w-6 h-6 md:opacity-25 hover:opacity-100 cursor-pointer'
                      viewBox='0 0 1024 1024'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill='#000000'
                        d='M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z'
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className='mt-4'>
              {section.content.map((content: any, detailIndex: number) => (
                <div className='flex mb-2'>
                  <input
                    key={detailIndex}
                    className='form-input w-full text-gray-800 grow'
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
                  <div className='flex items-center justify-center'>
                    <div className='ml-2'>
                      {outlineData[sectionIndex].content.length <
                        maxOutlineDetailCount && (
                        <svg
                          onClick={(e) =>
                            handleAddDetail(e, sectionIndex, detailIndex)
                          }
                          className='w-8 h-8 md:opacity-25 hover:opacity-100 cursor-pointer'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g id='Edit / Add_Plus'>
                            <path
                              id='Vector'
                              d='M6 12H12M12 12H18M12 12V18M12 12V6'
                              stroke='#000000'
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                    <div className='ml-2'>
                      {outlineData[sectionIndex].content.length >
                        minOutlineDetailCount && (
                        <svg
                          onClick={(e) =>
                            handleDeleteDetail(e, sectionIndex, detailIndex)
                          }
                          className='w-6 h-6 md:opacity-25 hover:opacity-100 cursor-pointer'
                          viewBox='0 0 1024 1024'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fill='#000000'
                            d='M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z'
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default OutlineVisualizer
