'use client'

import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  MouseEvent,
  useRef,
} from 'react'
import { useRouter } from 'next/navigation'
import '@/app/css/workflow-edit-topic-css/topic_style.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthService from '@/components/utils/AuthService'
import UserService from '@/components/utils/UserService'
import { Transition } from '@headlessui/react'
import MyFiles from '@/components/fileManagement'
import FeedbackButton from '@/components/slides/feedback'

import { QuestionExplainIcon, RightTurnArrowIcon } from '@/app/(feature)/icons'
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner'
import PaywallModal from '@/components/forms/paywallModal'

const audienceList = [
  'Researchers',
  'Students',
  'Business Clients',
  'Office Colleagues',
  'Video Viewers',
  'Myself',
]

interface Project {
  topic: string
  audience: string
}

interface UserFile {
  id: string
  uid: string
  filename: string
  thumbnail_name: string
  timestamp: string
}

export default function Topic() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFileModal, setShowFileModal] = useState(false)
  const [youtubeError, setYoutubeError] = useState('')
  const [isGpt35, setIsGpt35] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [topicSuggestions, setTopicSuggestions] = useState<string[]>([
    'Ultrasound',
  ])
  const [audienceSuggestions, setAudienceSuggestions] = useState<string[]>([])
  const [showAudienceInput, setShowAudienceInput] = useState(false)
  const [showProjectPopup, setProjectPopup] = useState(false)
  const [showAudiencePopup, setAudiencePopup] = useState(false)
  const [showLanguagePopup, setLanguagePopup] = useState(false)
  const [showSupportivePopup, setSupportivePopup] = useState(false)
  const [selectedFileList, setselectedFileList] = useState([])
  const [selectedFileListName, setselectedFileListName] = useState<string[]>([])
  const [isPaidUser, setIsPaidUser] = useState(false)

  // bind form data between input and sessionStorage
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState(
    typeof window !== 'undefined' && sessionStorage.audience != undefined
      ? sessionStorage.audience
      : 'unselected'
  )
  const [language, setLanguage] = useState(
    typeof window !== 'undefined' && sessionStorage.language != undefined
      ? sessionStorage.language
      : 'English'
  )
  const [youtube, setYoutube] = useState(
    typeof window !== 'undefined' && sessionStorage.youtube != undefined
      ? sessionStorage.youtube
      : ''
  )
  const [addEquations, setAddEquations] = useState(
    typeof window !== 'undefined' && sessionStorage.addEquations != undefined
      ? JSON.parse(sessionStorage.addEquations)
      : false
  )

  useEffect(() => {
    const clientTopic = sessionStorage.getItem('topic')
    if (clientTopic) {
      setTopic(clientTopic)
    }
  }, [])

  useEffect(() => {
    UserService.isPaidUser().then(
      (isPaidUser) => {
        setIsPaidUser(isPaidUser)
      }
    )
  }, [])

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
      if (userId) {
        const data = await UserService.getUserHistoricalInput(idToken)
        if (data) {
          //to avoid duplicates, however do not check for cases
          const uniqueTopics = new Set(
            data.map((project: Project) => project.topic)
          )
          const uniqueAudiences = new Set(
            data.map((project: Project) => project.audience)
          )

          setTopicSuggestions(Array.from(uniqueTopics) as string[])
          setAudienceSuggestions(Array.from(uniqueAudiences) as string[])
        }
      }
    }
    const fetchUser = async () => {
      const user = await AuthService.getCurrentUser()
      if (user) {
        setUser(user)
      }
    }
    fetchHistoricalData()
    fetchUser()
  }, [])

  const openFile = () => {
    setShowFileModal(true)
  }

  const closeFile = () => {
    setShowFileModal(false)
  }

  const handleOpenFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    openFile()
  }
  const handleTopicSuggestionClick = (
    topic: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setTopic(topic)
  }

  const handleAudienceSuggestionClick = (
    audience: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setAudience(audience)
  }

  useEffect(() => {
    if (isSubmitting) {
      handleSubmit()
    }
  }, [isSubmitting])

  const handleSubmit = async () => {
    console.log('submitting')
    if (youtubeError) {
      console.log('youtube error')
      return
    }

    const project_id =
      typeof window !== 'undefined' && sessionStorage.project_id != undefined
        ? sessionStorage.project_id
        : ''

    setIsSubmitting(true)

    const formData = {
      topic: topic,
      audience: audience,
      language: language,
      addEquations: addEquations,
      project_id: project_id,
      youtube_url: youtube,
      resources: JSON.parse(sessionStorage.getItem('resources') || '[]'),
      model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
    }

    sessionStorage.setItem('topic', formData.topic)
    sessionStorage.setItem('audience', formData.audience)
    sessionStorage.setItem('language', formData.language)
    sessionStorage.setItem('addEquations', formData.addEquations)

    try {
      const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
      const response = await fetch('/api/outlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const outlinesJson = await response.json()
        setIsSubmitting(false)
        // Handle the response data here
        console.log(outlinesJson)

        // cookies doesn't work because it needs 'use server'
        // cookies().set("topic", outlinesJson.data.audience);

        // Store the data in session storage
        sessionStorage.setItem('outline', JSON.stringify(outlinesJson.data))
        sessionStorage.setItem('foldername', outlinesJson.data.foldername)
        sessionStorage.setItem('project_id', outlinesJson.data.project_id)
        sessionStorage.setItem(
          'pdf_images',
          JSON.stringify(outlinesJson.data.pdf_images)
        )

        // Retrieve the existing resources from sessionStorage and parse them
        const resources: string[] = JSON.parse(
          sessionStorage.getItem('resources') || '[]'
        )

        // Add the new YouTube URL to the resources list if it's not empty
        const youtube_id: string = outlinesJson.data.youtube_id

        if (youtube_id.trim() !== '') {
          resources.push(youtube_id)
        }

        // Convert the updated list to a JSON string
        const updatedResourcesJSON: string = JSON.stringify(resources)

        // Store the updated JSON string back in sessionStorage
        sessionStorage.setItem('resources', updatedResourcesJSON)

        // Redirect to a new page with the data
        router.push('workflow-edit-outlines')
      } else if (response.status == 402) {
        setShowPaymentModal(true)
        setIsSubmitting(false)
      } else {
        alert(
          `Server is busy now. Please try again later. Reference code: ` +
          sessionStorage.getItem('project_id')
        )
        // alert("Request failed: " + response.status);
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false)
    }
  }

  const handleSelectResources = (resource: Array<string>) => {
    sessionStorage.setItem('resources', JSON.stringify(resource))
    const selectedResourcesJson = sessionStorage.getItem('resources')
    const allHistoryResourcesJson = sessionStorage.getItem('history_resource')

    if (selectedResourcesJson && allHistoryResourcesJson) {
      const selectedResources = JSON.parse(selectedResourcesJson)
      setselectedFileList(selectedResources)

      //find the corresponding file name
      const selectedResourcesIdArray: string[] = JSON.parse(
        selectedResourcesJson
      )
      const allHistoryResourcesArray: Array<{ id: string; filename: string }> =
        JSON.parse(allHistoryResourcesJson)
      const fileNamesArray = selectedResourcesIdArray.map((id) => {
        const correspondingFile = allHistoryResourcesArray.find(
          (file) => file.id === id
        )
        return correspondingFile ? correspondingFile.filename : 'Unkown File'
      })
      setselectedFileListName(fileNamesArray)
    }
  }

  const audienceDropDown = (value: string) => {
    if (value === 'other') {
      setAudience('')
      setShowAudienceInput(true)
    } else {
      setShowAudienceInput(false)
      setAudience(value)
    }
  }

  // Show/hide audience input based on `audience` value
  useEffect(() => {
    if (audienceList.includes(audience)) {
      setShowAudienceInput(false)
    } else if (audience === 'unselected') {
      setShowAudienceInput(false)
    } else {
      setShowAudienceInput(true)
    }
  }, [audience])

  const handleYoutubeChange = (link: string) => {
    // url format: https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486
    // search params will be ignored
    // sample: https://www.youtube.com/watch?v=Ir3eJ1t13fk
    // sample: http://youtu.be/lalOy8Mbfdc?t=1s
    // sample: https://www.youtube.com/v/-wtIMTCHWuI?app=desktop

    if (link === '') {
      setYoutube('')
      setYoutubeError('')
      return
    }
    setYoutube(link)
    setYoutubeError('')
    // validate url
    const regex1 = /youtube\.com\/watch\?v=[a-zA-z0-9_-]{11}/
    const regex2 = /youtu\.be\/[A-Za-z0-9_-]{11}/
    const regex3 = /youtube\.com\/v\/[a-zA-z0-9_-]{11}/
    if (regex1.test(link)) {
      const essentialLink = link.match(regex1)
      if (essentialLink && essentialLink.length > 0) {
        setYoutube('https://www.' + essentialLink[0])
      }
    } else if (regex2.test(link)) {
      const essentialLink = link.match(regex2)
      if (essentialLink && essentialLink.length > 0) {
        const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/)
        if (vID && vID.length > 0) {
          setYoutube('https://www.youtube.com/watch?v=' + vID[0])
        }
      }
    } else if (regex3.test(link)) {
      const essentialLink = link.match(regex3)
      if (essentialLink && essentialLink.length > 0) {
        const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/)
        if (vID && vID.length > 0) {
          setYoutube('https://www.youtube.com/watch?v=' + vID[0])
        }
      }
    } else {
      setYoutubeError('Please use a valid YouTube video link')
    }
  }

  // Function to open the popup
  const openPopup = () => {
    setShowPopup(true)
  }

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false)
  }

  // The functions that manage the pop-up windows for questionmark
  const openProjectPopup = () => {
    setProjectPopup(true)
  }

  const closeProjectPopup = () => {
    setProjectPopup(false)
  }

  const openAudiencePopup = () => {
    setAudiencePopup(true)
  }

  const closeAudiencePopup = () => {
    setAudiencePopup(false)
  }

  const openLanguagePopup = () => {
    setLanguagePopup(true)
  }

  const closeLanguagePopup = () => {
    setLanguagePopup(false)
  }

  const openSupportivePopup = () => {
    setSupportivePopup(true)
  }

  const closeSupportivePopup = () => {
    setSupportivePopup(false)
  }

  return (
    <section>
      {showPaymentModal && <PaywallModal setShowModal={setShowPaymentModal} message='Upgrade for more ⭐️credits.' />}

        <Transition
          className='h-full w-full z-50 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
          show={showFileModal}
          onClick={closeFile}
          enter='transition ease duration-300 transform'
          enterFrom='opacity-0 translate-y-12'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease duration-300 transform'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-12'
        >
          <div className='grow md:grow-0'></div>
          <Transition
            className='bg-gray-100 w-full h-3/4 md:h-2/3
                                md:max-w-2xl z-20 rounded-t-xl md:rounded-xl drop-shadow-2xl 
                                overflow-hidden flex flex-col p-4'
            show={showFileModal}
            enter='transition ease duration-500 transform delay-300'
            enterFrom='opacity-0 translate-y-12'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease duration-300 transform'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-12'
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <h4 className='h4 text-blue-600 text-center'>
              Select Supporting Material
            </h4>
            <MyFiles selectable={true} callback={handleSelectResources} />
            <div className='max-w-sm mx-auto'>
              <div className='flex flex-wrap -mx-3 mt-6'>
                <div className='w-full px-3'>
                  <button
                    className='btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full'
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      closeFile()
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </Transition>

        {/* project progress section */}
        <WorkflowStepsBanner
          currentIndex={0}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          isPaidUser={isPaidUser}
          contentRef={contentRef}
          nextIsPaidFeature={false}
          showGPTToggle={true}
          nextText={!isSubmitting ? 'Next' : 'Writing Outline...'}
          setIsGpt35={setIsGpt35}
        />

        {/* main content */}
        <div className='main_container w-full lg:flex'>
          {/* Project Summary section */}
          <div className='summary_container w-full lg:w-1/2 px-3 my-3 lg:my-1'>
            {/* title */}
            <div className='title1'>
              <p>Project Summary</p>
              <p id='after1'> (Required)</p>
            </div>

            {/* text area section */}
            <div className='project_container w-full h-[665px] lg:h-[550px] my-2 lg:my-5'>
              <div className='project_topic'>
                <p>Project Topic</p>
                <div className='relative inline-block'>
                  <div
                    className='cursor-pointer'
                    onMouseEnter={openProjectPopup}
                    onMouseLeave={closeProjectPopup}
                    onTouchStart={openProjectPopup}
                    onTouchEnd={closeProjectPopup}
                  >
                    <QuestionExplainIcon />
                    {showProjectPopup && (
                      <div
                        id='project_popup'
                        className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[5rem] md:w-80 md:h-[4rem] flex justify-center items-center'
                      >
                        The main subject or theme of your project. It will set
                        the direction and focus of the contents.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='textfield'>
                <textarea
                  onChange={(e) => setTopic(e.target.value)}
                  className='focus:ring-0 text-xl'
                  id='topic'
                  value={topic}
                  maxLength={80}
                  required
                  placeholder='e.g. How to use ultrasound to detect breast cancer'
                ></textarea>
                {
                  <div className='charcnt' id='charcnt'>
                    {80 - topic.length} characters left
                  </div>
                }
              </div>

              {/* DropDown menu section */}
              <div className='dropdown_container w-full lg:flex'>
                <div className='audience_container'>
                  <div className='your_audience '>
                    <span>Your Audience</span>
                    <div className='relative inline-block'>
                      <div
                        className='cursor-pointer'
                        onMouseEnter={openAudiencePopup}
                        onMouseLeave={closeAudiencePopup}
                        onTouchStart={openAudiencePopup}
                        onTouchEnd={closeAudiencePopup}
                      >
                        <QuestionExplainIcon />
                        {showAudiencePopup && (
                          <div
                            id='audience_popup'
                            className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[6rem] md:w-[17rem] md:h-[5rem] flex justify-center items-center'
                          >
                            Specify the intended viewers of your projects,
                            tailoring to your audience ensures the content
                            resonates effectively.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='audience_drop'>
                    <label htmlFor='audience'></label>
                    <select
                      className='focus:ring-0'
                      value={
                        audienceList.includes(audience)
                          ? audience
                          : audience === 'unselected'
                            ? 'unselected'
                            : 'other'
                      }
                      onChange={(e) => setAudience(e.target.value)}
                      required
                    >
                      <option key='unselected' value='unselected' disabled>
                        Choose your audience
                      </option>
                      {audienceList.map((value) => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                    <input
                      id='audience'
                      type='text'
                      className={`form-input w-full text-gray-800 mb-2 ${showAudienceInput ? '' : 'hidden'
                        }`}
                      placeholder='Other (please specify)'
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      required
                      maxLength={40}
                    />
                  </div>
                </div>
                <div className='language_container mt-[1rem] lg:mt-[0rem]'>
                  <div className='language '>
                    <span>Language</span>
                    <div className='relative inline-block'>
                      <div
                        className='cursor-pointer'
                        onMouseEnter={openLanguagePopup}
                        onMouseLeave={closeLanguagePopup}
                        onTouchStart={openLanguagePopup}
                        onTouchEnd={closeLanguagePopup}
                      >
                        <QuestionExplainIcon />
                        {showLanguagePopup && (
                          <div
                            id='language_popup'
                            className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[13rem] h-[3rem] md:w-[14rem] md:h-[3rem] flex justify-center items-center'
                          >
                            Specify the intended language of your projects.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='language_drop'>
                    <select
                      className='focus:ring-0'
                      id='language'
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      required
                    >
                      <option key='English' value='English'>English</option>
                      <option key='Chinese' value='Chinese'>中文</option>
                      <option key='Spanish' value='Spanish'>Español</option>
                      <option key='French' value='French'>Français</option>
                      <option key='German' value='German'>Deutsch</option>
                      <option key='Russian' value='Russian'>Русский</option>
                      <option key='Japanese' value='Japanese'>日本語</option>
                      <option key='Portuguese' value='Portuguese'>Português</option>
                      <option key='Ukrainian' value='Ukrainian'>Українська</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* check equation section */}
              <div className='flex flex-wrap -mx-3 mb-4'>
                <div className='w-full px-3 mt-2 flex flex-row'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id='addEquations'
                      className='form-checkbox text-gray-800'
                      checked={addEquations} // Use 'checked' instead of 'value'
                      onChange={(e) => setAddEquations(e.target.checked)}
                    />
                  </div>
                  <label
                    className=' ml-2 block text-gray-800 text-sm font-medium'
                    htmlFor='addEquations'
                  >
                    Select to <b>add equations and formulas</b> to my content,
                    recommended for Math/Science subjects
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* supplementary section */}
          <div className='supp_container w-full lg:w-2/5 px-3 my-3 lg:my-1'>
            <div className='title2'>
              <p>Supplementary Materials</p>
              <p id='after2'> (Optional)</p>
            </div>

            <div className='additional_container my-2 lg:my-5'>
              <div className='upload'>
                <span>Upload Files</span>
                {/* <QuestionExplainIcon /> */}
                <div className='relative inline-block'>
                  <div
                    className='cursor-pointer'
                    onMouseEnter={openSupportivePopup}
                    onMouseLeave={closeSupportivePopup}
                    onTouchStart={openSupportivePopup}
                    onTouchEnd={closeSupportivePopup}
                  >
                    <QuestionExplainIcon />
                    {showSupportivePopup && (
                      <div
                        id='supportive_popup'
                        className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[6rem] md:w-80 md:h-[5rem] flex justify-center items-center'
                      >
                        Any additional files that can enhance and provide
                        context to your projects. This could be research data,
                        images, charts, or reference materials.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='youtube_container'>
                <div
                  id='youtube_text_container'
                  className='flex items-center w-full'
                >
                  <img className='w-4 h-4' src='/icons/youtube_icon.png' />
                  <div className='w-full'>
                    <label htmlFor='youtube_text'></label>
                    <input
                      id='youtube'
                      type='text'
                      className='form-input w-full'
                      value={youtube}
                      onChange={(e) => handleYoutubeChange(e.target.value)}
                      placeholder='Paste YouTube link here'
                    />
                  </div>
                </div>

                {youtubeError && (
                  <div id='youtube_error' className='text-sm text-red-500'>{youtubeError}</div>
                )}
              </div>

              <div className='drop_file'>
                <div className='flex items-center w-full'>
                  <img className='' src='/icons/drop_files_icon.png' />
                  <span>Drop files here or </span>
                  <button id='browse_btn' onClick={(e) => handleOpenFile(e)}>
                    Browse File
                  </button>
                </div>
              </div>
              <hr id='add_hr' />
              <div className='h-[290px] mt-[10px]'>
                <ul
                  className='flex flex-col gap-4'
                  style={{ maxHeight: '280px', overflowY: 'auto' }}
                >
                  {selectedFileListName.map((selectedFile, index) => (
                    <li key={index}>
                      <div
                        id='selectedfile_each'
                        className='flex items-center gap-2 bg-white rounded h-[50px] pl-[1rem]'
                      >
                        <img src='/icons/selectedFiles_icon.png' />
                        <span>{selectedFile}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      <FeedbackButton />
    </section>
  )
}
