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
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'
import { Transition } from '@headlessui/react'
import MyFiles from '@/components/FileManagement'
import FeedbackButton from '@/components/slides/feedback'

import { DeleteIcon, QuestionExplainIcon, RightTurnArrowIcon } from '@/app/(feature)/icons'
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner'
import PaywallModal from '@/components/forms/paywallModal'
import { FaFilePdf, FaYoutube } from 'react-icons/fa'
import YoutubeService from '@/services/YoutubeService'
import { SmallBlueButton } from '@/components/button/DrlambdaButton'
import WebService from '@/services/WebpageService'
import Resource from '@/models/Resource'

const MAX_TOPIC_LENGTH = 80
const MIN_TOPIC_LENGTH = 6

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

export default function Topic() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFileModal, setShowFileModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('' as string)
  const [urlIsYoutube, setUrlIsYoutube] = useState(false)
  const [linkError, setLinkError] = useState('')
  const [topicError, setTopicError] = useState('')
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
  const [isPaidUser, setIsPaidUser] = useState(false)
  const [isAddingLink, setIsAddingLink] = useState(false)

  // bind form data between input and sessionStorage
  const [topic, setTopic] = useState(
    typeof window !== 'undefined' && sessionStorage.topic != undefined
      ? sessionStorage.topic
      : ''
  )
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
  const [addEquations, setAddEquations] = useState(
    typeof window !== 'undefined' && sessionStorage.addEquations != undefined
      ? JSON.parse(sessionStorage.addEquations)
      : false
  )
  const [selectedResourceId, setSelectedResourceId] = useState<string[]>(
    typeof window !== 'undefined' &&
      sessionStorage.selectedResourceId != undefined
      ? JSON.parse(sessionStorage.selectedResourceId)
      : []
  )
  const [selectedResources, setSelectedResources] = useState<Resource[]>(
    typeof window !== 'undefined' &&
      sessionStorage.selectedResources != undefined
      ? JSON.parse(sessionStorage.selectedResources)
      : []
  )


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

  const updateTopic = (topic: string) => {
    if (topic.length >= MIN_TOPIC_LENGTH) {
      setTopicError('')
    }
    if (topic.length > MAX_TOPIC_LENGTH) {
      setTopic(topic.slice(0, MAX_TOPIC_LENGTH))
    } else {
      setTopic(topic)
    }
  }

  const handleAudienceSuggestionClick = (
    audience: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setAudience(audience)
  }

  async function addLink(link: string) {
    if (!link) {
      setLinkError('Please enter a valid link.');
      return;
    }
    if (!isPaidUser && selectedResources.length >= 1) {
      setLinkError('Free users can only add one resource.');
      return;
    }
    setLinkError('');
    setIsAddingLink(true);
    if (urlIsYoutube) {
      addYoutubeLink(link)
    } else {
      addWebpageLink(link)
    }
  }

  async function addYoutubeLink(link: string) {
    try {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
      const videoDetails = await YoutubeService.getYoutubeInfo(link, idToken);

      if (!videoDetails?.id) {
        setLinkError('The Youtube link is invalid.');
        setIsAddingLink(false);
        return;
      }


      setSelectedResources(prevList => [...prevList, videoDetails]);
      setSelectedResourceId(prevList => [...prevList, videoDetails.id]);
      if (!topic) {
        setTopic(videoDetails.name.slice(0, MAX_TOPIC_LENGTH))
      }
    } catch (error: any) {
      console.error("Error fetching YouTube video details: ", error);
      setLinkError("Error fetching YouTube video details");
    }
    setIsAddingLink(false)
  }

  async function addWebpageLink(link: string) {
    try {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
      const pageDetails = await WebService.getWebpageInfo(link, idToken);

      if (!pageDetails?.id) {
        setLinkError('The webpage link is invalid.');
        setIsAddingLink(false)
        return;
      }

      setSelectedResources(prevList => [...prevList, pageDetails]);
      setSelectedResourceId(prevList => [...prevList, pageDetails.id]);
      if (!topic) {
        setTopic(pageDetails.name.slice(0, MAX_TOPIC_LENGTH))
      }
    } catch (error: any) {
      console.error("Error reading webpage details: ", error);
      setLinkError("Error reading webpage details");
    }
    setIsAddingLink(false)
  }


  useEffect(() => {
    if (isSubmitting) {
      handleSubmit()
    }
  }, [isSubmitting])

  const handleSubmit = async () => {
    console.log('submitting')
    if (topic.length < MIN_TOPIC_LENGTH) {
      setTopicError(`Please enter at least ${MIN_TOPIC_LENGTH} characters.`)
      setIsSubmitting(false)
      return
    }

    if (linkError) {
      console.log(linkError) // continue without the valid link
      setIsSubmitting(false)
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
      resources: selectedResourceId,
      model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
    }

    sessionStorage.setItem('topic', formData.topic)
    sessionStorage.setItem('audience', formData.audience)
    sessionStorage.setItem('language', formData.language)
    sessionStorage.setItem('addEquations', formData.addEquations)
    sessionStorage.setItem('selectedResourceId', JSON.stringify(formData.resources))
    sessionStorage.setItem('selectedResources', JSON.stringify(selectedResources))

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

  const handleLinkChange = (link: string) => {
    // url format: https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486
    // search params will be ignored
    // sample: https://www.youtube.com/watch?v=Ir3eJ1t13fk
    // sample: http://youtu.be/lalOy8Mbfdc?t=1s
    // sample: https://www.youtube.com/v/-wtIMTCHWuI?app=desktop

    if (link === '') {
      setLinkUrl('')
      setLinkError('')
      return
    }
    setLinkUrl(link)
    setLinkError('')
    // validate url against youtube 
    const regex1 = /youtube\.com\/watch\?v=[a-zA-z0-9_-]{11}/
    const regex2 = /youtu\.be\/[A-Za-z0-9_-]{11}/
    const regex3 = /youtube\.com\/v\/[a-zA-z0-9_-]{11}/
    if (regex1.test(link)) {
      const essentialLink = link.match(regex1)
      if (essentialLink && essentialLink.length > 0) {
        setLinkUrl('https://www.' + essentialLink[0])
        setUrlIsYoutube(true)
      }
    } else if (regex2.test(link)) {
      const essentialLink = link.match(regex2)
      if (essentialLink && essentialLink.length > 0) {
        const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/)
        if (vID && vID.length > 0) {
          setLinkUrl('https://www.youtube.com/watch?v=' + vID[0])
          setUrlIsYoutube(true)
        }
      }
    } else if (regex3.test(link)) {
      const essentialLink = link.match(regex3)
      if (essentialLink && essentialLink.length > 0) {
        const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/)
        if (vID && vID.length > 0) {
          setLinkUrl('https://www.youtube.com/watch?v=' + vID[0])
          setUrlIsYoutube(true)
        }
      }
    } else {
      // url is not youtube, assuming it is a web link
      setUrlIsYoutube(false)
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

  const removeResourceAtIndex = (indexToRemove: number) => {
    setSelectedResources(currentResources =>
      currentResources.filter((_, index) => index !== indexToRemove)
    );
    setSelectedResourceId(currentResourceIds =>
      currentResourceIds.filter((_, index) => index !== indexToRemove)
    );
  };


  return (
    <section>
      {showPaymentModal && <PaywallModal setShowModal={setShowPaymentModal} message='Upgrade for more ⭐️credits.' showReferralLink={true} />}

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
          className='w-full h-3/4 md:h-2/3
                                md:max-w-2xl z-20 rounded-t-xl md:rounded-xl drop-shadow-2xl 
                                overflow-hidden flex flex-col p-4 bg-white'
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
          <MyFiles
            selectable={true}
            selectedResourceId={selectedResourceId}
            setSelectedResourceId={setSelectedResourceId}
            selectedResources={selectedResources}
            setSelectedResources={setSelectedResources}
          />
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
      <div className='py-10 w-full flex flex-col items-center'>
        {/* Project Summary section */}
        <div className='w-full lg:w-2/3  px-3 my-3 lg:my-1'>
          {/* title */}
          <div className='title1'>
            <p>Project Summary</p>
            <p id='after1'> (Required)</p>
          </div>

          {/* text area section */}
          <div className='project_container w-full my-2 lg:my-5 border border-2 border-gray-200'>
            <div className='flex items-center gap-1'>
              <p>Topic</p>
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
                onChange={(e) => updateTopic(e.target.value)}
                className='focus:ring-0 text-l md:text-xl bg-gray-100'
                id='topic'
                value={topic}
                maxLength={MAX_TOPIC_LENGTH}
                required
                placeholder='How to use ultrasound to detect breast cancer'
              ></textarea>
              {
                <div className='text-gray-500 text-sm mt-1'>
                  {MAX_TOPIC_LENGTH - topic.length} characters left
                </div>
              }
              {topicError && 
                <div className='text-red-500 text-sm mt-1'>{topicError}</div>
              }
            </div>

            {/* DropDown menu section */}
            <div className='dropdown_container w-full gap-2 lg:flex'>
              <div className='audience_container'>
                <div className='your_audience gap-1'>
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
                    className='focus:ring-0 bg-gray-100'
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
                <div className='language gap-1'>
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
                    className='focus:ring-0  bg-gray-100 border border-2 border-gray-200'
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
            <div className='flex flex-wrap -mx-3 my-4'>
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
        <div className='supp_container w-full lg:w-2/3 px-3 my-3 lg:my-1'>
          <div className='title2'>
            <p>Supporting Documents</p>
            <p id='after2'> (Optional)</p>
          </div>

          <div className='additional_container my-2 lg:my-5  border border-2 border-gray-200'>
            <div className='upload gap-1'>
              <span>Add Resources</span>
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
                      className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] md:w-80 md:h-[5rem] flex justify-center items-center'
                    >
                      Any additional files that can enhance and provide
                      context to your projects. This could be research data,
                      images, charts, or reference materials.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='link_container bg-gray-100 border border-2 border-gray-200'>
              <div
                id='link_text_container'
                className='flex justify-center items-center w-full'
              >
                <FaYoutube />
                <div className='w-full'>
                  <label htmlFor='link_text'></label>
                  <input
                    id='link'
                    type='text'
                    className='text-sm md:text-l form-input w-full border-none bg-gray-100'
                    value={linkUrl}
                    onChange={(e) => handleLinkChange(e.target.value)}
                    placeholder='Paste YouTube or webpage link'
                  />
                </div>
                <SmallBlueButton onClick={e => { addLink(linkUrl) }} isSubmitting={isAddingLink}>
                  {isAddingLink ? 'Adding...' : 'Add'}
                </SmallBlueButton>
              </div>

              {linkError && (
                <div id='link_error' className='text-sm text-red-500'>{linkError}</div>
              )}
            </div>

            <div className='drop_file bg-gray-100 border border-2 border-gray-200'>
              <div className='flex items-center w-full'>
                <FaFilePdf />
                <span className="text-sm md:text-l">Drop files here or </span>
                <SmallBlueButton onClick={handleOpenFile}>
                  Browse File
                </SmallBlueButton>
              </div>
            </div>
            <hr id='add_hr' />
            <div className='min-h-[100px] mt-[10px]'>
              <ul
                className='flex flex-col gap-4'
                style={{ overflowY: 'auto' }}
              >
                {selectedResources.map((resource, index) => (
                  <li key={index}>
                    <div
                      id='selectedfile_each'
                      className='flex items-center bg-white rounded min-h-[50px] px-[1rem] justify-between'
                    >
                      <div className='flex items-center gap-2'>
                        {resource.thumbnail_url ?
                          <img src={resource.thumbnail_url} className='w-[40px]' /> :
                          <FaFilePdf className='w-[40px]' />
                        }
                        <div className='flex-wrap'>{resource.name}</div>
                      </div>
                      <button className='' onClick={e => removeResourceAtIndex(index)}><DeleteIcon /></button>
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
