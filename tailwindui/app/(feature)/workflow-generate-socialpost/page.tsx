'use client'

import React, {
  useState,
  FormEvent,
  useEffect,
  useRef,
} from 'react'
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-edit-topic-css/topic_style.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthService from '@/components/utils/AuthService'
import UserService from '@/components/utils/UserService'
import { Transition } from '@headlessui/react'
import MyFiles, { Resource } from '@/components/fileManagement'
import PaywallModal from '@/components/forms/paywallModal'
import FeedbackButton from '@/components/slides/feedback'
import WorkflowStepsBanner from '@/components/socialPost/socialPostWorkflowStep';
import { DeleteIcon, QuestionExplainIcon, RightTurnArrowIcon } from '@/app/(feature)/icons'
import { FaFilePdf, FaYoutube } from 'react-icons/fa'
import YoutubeService from '@/components/utils/YoutubeService'
import { SmallBlueButton } from '@/components/button/DrlambdaButton'
import WebService from '@/components/utils/WebpageService';

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

interface FormatData {
  topic: string;
  language: string;
  project_id: string;
  youtube_url: string;
  resources: string[];
  model_name: string;
  post_style: string | null;
}

export default function Topic_SocialPost() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFileModal, setShowFileModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('' as string)
  const [linkError, setLinkError] = useState('')
  const [topicError, setTopicError] = useState('')
  const [urlIsYoutube, setUrlIsYoutube] = useState(false)
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
  const [isAddingLink, setIsAddingLink] = useState(false)

  // bind form data between input and sessionStorage
  const [topic, setTopic] = useState(
    typeof window !== 'undefined' && sessionStorage.topic != undefined
      ? sessionStorage.topic
      : ''
  )

  const [selectedScenario, setSelectedScenario] = useState(
    typeof window !== 'undefined' && sessionStorage.selectedScenario != undefined
      ? sessionStorage.selectedScenario
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
    const clientTopic = sessionStorage.getItem('topic')
    if (clientTopic) {
      setTopic(clientTopic)
    }
    const currScenario = sessionStorage.getItem('selectedScenario')
    if (currScenario){
      setSelectedScenario(currScenario)
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
    if (isSubmitting) {
      handleSubmit()
    }
  }, [isSubmitting])

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
      language: language,
      project_id: project_id,
      //youtube_url: youtube,
      resources: JSON.parse(sessionStorage.getItem('resources') || '[]'),
      model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
      post_style: selectedScenario,
    }
    sessionStorage.setItem('topic', formData.topic)
    sessionStorage.setItem('language', formData.language)

    try {
      const outlinesJson = await callSocialPost(formData as FormatData)
      console.log(outlinesJson)
      //const searchImagesResponse = await callSearchImages(JSON.stringify(formData.topic))
      setIsSubmitting(false)

      // Store the data in session storage
      sessionStorage.setItem('outline', JSON.stringify(outlinesJson.data))
      sessionStorage.setItem('foldername', outlinesJson.data.foldername)
      sessionStorage.setItem('project_id', outlinesJson.data.project_id)
      sessionStorage.setItem('socialPost', outlinesJson.data.res)
      //sessionStorage.setItem('socialPostImages', JSON.stringify(searchImagesResponse.data.images))

      // Retrieve the existing resources from sessionStorage and parse them
      const resources: string[] = JSON.parse(
        sessionStorage.getItem('resources') || '[]'
      )

      // Add the new YouTube URL to the resources list if it's not empty
      // const youtube_id: string = outlinesJson.data.youtube_id

      // if (youtube_id.trim() !== '') {
      //   resources.push(youtube_id)
      // }

      // Convert the updated list to a JSON string
      const updatedResourcesJSON: string = JSON.stringify(resources)

      // Store the updated JSON string back in sessionStorage
      sessionStorage.setItem('resources', updatedResourcesJSON)

      // Redirect to a new page with the data
      router.push('/workflow-review-socialpost')
    } 
    catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false)
    }
  }

  // api/social_posts helper function
  async function callSocialPost(formData: FormatData) {
    const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
    const response = await fetch('/api/social_posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData)
    })
    if (!response.ok){
      if (response.status == 402){
        setShowPaymentModal(true)
        setIsSubmitting(false)
      }
      else{
        alert(
          `Server is busy now. Please try again later. Reference code: ` +
          sessionStorage.getItem('project_id')
        )
        // alert("Request failed: " + response.status);
        setIsSubmitting(false)
      }
    }
    return await response.json()
  }

  // api/search_images helper function
  async function callSearchImages(search_keyword:string) {
    const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
    const response = await fetch('/api/search_images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({search_keyword: search_keyword })
    })
    if (!response.ok){
      const errorData = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errorData}`);
    }
    return await response.json()
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

      const newFile = {
        id: videoDetails.id,
        uid: '',
        title: videoDetails.title,
        thumbnail_url: videoDetails.thumbnail,
        timestamp: new Date().toISOString()
      };

      setSelectedResources(prevList => [...prevList, newFile]);
      setSelectedResourceId(prevList => [...prevList, newFile.id]);

      if (!topic) {
        setTopic(videoDetails.title.slice(0, MAX_TOPIC_LENGTH));
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

      const newFile = {
        id: pageDetails.id,
        uid: '',
        title: pageDetails.title,
        thumbnail_url: pageDetails.thumbnail,
        timestamp: new Date().toISOString()
      };

      setSelectedResources(prevList => [...prevList, newFile]);
      setSelectedResourceId(prevList => [...prevList, newFile.id]);

      if (!topic) {
        setTopic(pageDetails.title.slice(0, MAX_TOPIC_LENGTH));
      }
    } catch (error: any) {
      console.error("Error fetching webpage details: ", error);
      setLinkError("Error fetching webpage details");
    }
    setIsAddingLink(false)
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
      {showPaymentModal && (
        <PaywallModal
          setShowModal={setShowPaymentModal}
          message='Upgrade for more ⭐️credits.'
          showReferralLink={true}
        />
      )}
      <form onSubmit={handleSubmit}>
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

        <WorkflowStepsBanner
          currentIndex={0}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          isPaidUser={isPaidUser}
          contentRef={contentRef}
          nextIsPaidFeature={false}
          showGPTToggle={true}
          nextText={!isSubmitting ? 'Next' : 'Creating Post'}
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
                      className='focus:ring-0 bg-gray-100 border border-2 border-gray-200'
                      id='language'
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      required
                    >
                      <option value='English'>English</option>
                      <option value='Chinese'>中文</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* supplementary section */}
          <div className='supp_container w-full lg:w-2/3 px-3 my-3 lg:my-1'>
            <div className='title2'>
              <p>Supplementary Materials</p>
              <p id='after2'> (Optional)</p>
            </div>

            <div className='additional_container my-2 lg:my-5 border border-2 border-gray-200'>
              <div className='upload gap-1'>
                <span>Add Resources</span>
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

              <div className='link_container bg-gray-100 border border-2 border-gray-200'>
                <div
                  id='link_text_container'
                  className='flex items-center w-full'
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
                      <div className="flex-wrap">{resource.title}</div>
                      </div>
                      <button className='' onClick={e => removeResourceAtIndex(index)}><DeleteIcon/></button>
                    </div>
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
      <FeedbackButton />
    </section>
  )
}
