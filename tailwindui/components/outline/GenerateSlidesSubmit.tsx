import React, { useState, useRef, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import Timer from '@/components/ui/Timer'
import AuthService from '@/components/utils/AuthService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dialog, Transition } from '@headlessui/react'
import UserService from '../utils/UserService'
import DrlambdaButton from '../button/DrlambdaButton'

const minOutlineDetailCount = 1
const maxOutlineDetailCount = 6
const minOutlineSectionCount = 1
const maxOutlineSectionCount = 10
const maxLength = 60

interface OutlineSection {
  title: string
  content: Array<string>
  detailLevel: string
  section_style: string
}

interface OutlineDataType extends Array<OutlineSection> {}

const GenerateSlidesSubmit = ({
  outline,
  isGPT35,
}: {
  outline: OutlineDataType
  isGPT35: boolean
}) => {
  const router = useRouter()
  const [outlineData, setOutlineData] = useState(outline)
  //   const [isGpt35, setIsGpt35] = useState(true)
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

  const updateOutlineSessionStorage = (updatedOutline: any) => {
    const entireOutline = JSON.parse(sessionStorage.outline)
    entireOutline.res = JSON.stringify({ ...updatedOutline })
    sessionStorage.setItem('outline', JSON.stringify(entireOutline))
  }

  const [isSubmittingSlide, setIsSubmittingSlide] = useState(false)
  const [timer, setTimer] = useState(0)
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
      // Store the data in local storage
      // console.log(resp.data);
      sessionStorage.setItem('transcripts', JSON.stringify(resp.data.res))
      // Redirect to a new page with the data
      router.push('workflow-edit-script')
    } else {
      alert('Request failed: ' + response.status)
      // console.log(response)
    }
  }

  async function generateSlidesPreview(formData: any, token: string) {
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
      model_name: isGPT35 ? 'gpt-3.5-turbo' : 'gpt-4',
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
    }
  }

  return (
    <div>
      <ToastContainer />

      {/* generate slides popup */}
      <Transition appear show={isToSlidesOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeToSlidesModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Continue to generate slides?
                  </Dialog.Title>
                  {/* <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Generate slides will delete current scripts, audio, and
                      video.
                    </p>
                  </div> */}

                  <div className='flex'>
                    <div className='flex justify-center mt-4'>
                      <button
                        className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2 btn-size'
                        onClick={slideModalSubmit}
                      >
                        Yes
                      </button>
                    </div>

                    <div className='flex justify-center mt-4'>
                      <button
                        className='text-blue-600 bg-gray-100 hover:bg-gray-200 border border-blue-600 py-2 px-4 rounded mr-2 btn-size'
                        onClick={closeToSlidesModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Form */}
      <div className='max-w-sm mx-auto'>
        <form onSubmit={prepareSubmit}>
          <div className='flex flex-wrap justify-center'>
            {/* <GptToggle isGpt35={isGpt35} setIsGpt35={setIsGpt35} /> */}

            {/* <SlideLengthSelector /> */}
            <div className='w-full px-3'>
              <DrlambdaButton
                onClick={() => {
                  setToSlides(true)
                }}
                isSubmitting={isSubmittingSlide}
              >
                {!isSubmittingSlide ? 'Next' : 'Generating Slides'}
              </DrlambdaButton>
              {/* Timer */}
              {/* <Timer expectedSeconds={60} isSubmitting={isSubmittingSlide} /> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GenerateSlidesSubmit
