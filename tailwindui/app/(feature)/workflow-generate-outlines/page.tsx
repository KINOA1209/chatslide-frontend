'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import 'react-toastify/dist/ReactToastify.css';
import FeedbackButton from '@/components/ui/feedback';
import { QuestionExplainIcon } from '@/app/(feature)/icons';
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner';
import PaywallModal from '@/components/forms/paywallModal';
import { FaFilePdf, } from 'react-icons/fa';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import Resource from '@/models/Resource';
import { toast, ToastContainer } from 'react-toastify';
import FileUploadModal from '@/components/forms/FileUploadModal';
import SelectedResourcesList from '@/components/SelectedResources';
import { useUser } from '@/hooks/use-user';
import { Step } from 'react-joyride';
import MyCustomJoyride from '@/components/user_onboarding/MyCustomJoyride';
import StepsSummaryPage from '@/components/user_onboarding/StepsSummaryPage';
import { GPTToggleWithExplanation } from '@/components/button/WorkflowGPTToggle';
import SessionStorage from '@/components/utils/SessionStorage';
import FromDocsUploadFile from '@/components/FromDocsUploadFile';
import useHydrated from '@/hooks/use-hydrated';
import LinkInput from '@/components/summary/LinkInput';

const MAX_TOPIC_LENGTH = 128;
const MIN_TOPIC_LENGTH = 6;

const audienceList = [
  'Researchers',
  'Students',
  'Business Clients',
  'Office Colleagues',
  'Video Viewers',
  'Myself',
];

export default function Topic() {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const { token } = useUser();
  const [topicError, setTopicError] = useState('');
  const [isGpt35, setIsGpt35] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAudienceInput, setShowAudienceInput] = useState(false);
  const [showProjectPopup, setProjectPopup] = useState(false);
  const [showAudiencePopup, setAudiencePopup] = useState(false);
  const [showLanguagePopup, setLanguagePopup] = useState(false);
  const [showSupportivePopup, setSupportivePopup] = useState(false);
  const { isPaidUser } = useUser();

  // bind form data between input and sessionStorage
  const [topic, setTopic] = useState(
    typeof window !== 'undefined' && sessionStorage.topic != undefined
      ? sessionStorage.topic
      : '',
  );
  const [audience, setAudience] = useState(
    typeof window !== 'undefined' && sessionStorage.audience != undefined
      ? sessionStorage.audience
      : 'unselected',
  );
  const [language, setLanguage] = useState(
    typeof window !== 'undefined' && sessionStorage.language != undefined
      ? sessionStorage.language
      : 'English',
  );
  const [selectedResources, setSelectedResources] = useState<Resource[]>(
    typeof window !== 'undefined' &&
      sessionStorage.selectedResources != undefined
      ? JSON.parse(sessionStorage.selectedResources)
      : [],
  );
  const generationMode = SessionStorage.getItem('generation_mode', 'from_topic');

  const tourSteps: Step[] = [
    {
      target: '.first-element',
      content: 'This is the first element!',
    },
    // Add more steps as needed
  ];

  useEffect(() => {
    if (selectedResources.length > 0) {
      if (topic.length == 0) {
        setTopic(formatName(selectedResources[0].name));
      }
    }

    console.log('selectedResources', selectedResources);
  }, [selectedResources]);

  function formatName(name: string) {
    // remove file extension
    name = name.replace(/\.[^/.]+$/, '');

    if (name.length > MAX_TOPIC_LENGTH) {
      return name.slice(0, MAX_TOPIC_LENGTH - 3) + '...';
    }
    return name;
  }

  const updateTopic = (topic: string) => {
    if (topic.length >= MIN_TOPIC_LENGTH) {
      setTopicError('');
    }
    if (topic.length > MAX_TOPIC_LENGTH) {
      setTopic(topic.slice(0, MAX_TOPIC_LENGTH));
    } else {
      setTopic(topic);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      handleSubmit();
    }
  }, [isSubmitting]);

  const handleSubmit = async () => {
    console.log('submitting');
    if (generationMode === 'from_topic' && topic.length < MIN_TOPIC_LENGTH) {
      setTopicError(`Please enter at least ${MIN_TOPIC_LENGTH} characters.`);
      toast.error(
        `Please enter at least ${MIN_TOPIC_LENGTH} characters for topic.`,
      );
      setIsSubmitting(false);
      return;
    }

    const project_id =
      typeof window !== 'undefined' && sessionStorage.project_id != undefined
        ? sessionStorage.project_id
        : '';

    const scenarioType =
      typeof window !== 'undefined' && sessionStorage.scenarioType != undefined
        ? sessionStorage.scenarioType
        : '';

    setIsSubmitting(true);

    const formData = {
      topic: topic,
      audience: audience,
      language: language,
      project_id: project_id,
      resources: selectedResources.map((resource: Resource) => resource.id),
      model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
      //schoolTemplate: schoolTemplate,
      scenario_type: scenarioType,
      generation_mode: generationMode,
    };

    sessionStorage.setItem('topic', formData.topic);
    sessionStorage.setItem('audience', formData.audience);
    sessionStorage.setItem('language', formData.language);
    sessionStorage.setItem(
      'selectedResources',
      JSON.stringify(selectedResources),
    );
    //sessionStorage.setItem('schoolTemplate', schoolTemplate);

    try {
      const response = await fetch('/api/outlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const outlinesJson = await response.json();
        setIsSubmitting(false);
        // Handle the response data here
        console.log(outlinesJson);

        // cookies doesn't work because it needs 'use server'
        // cookies().set("topic", outlinesJson.data.audience);

        // Store the data in session storage
        sessionStorage.setItem('topic', outlinesJson.data.topic);
        sessionStorage.setItem('outline', JSON.stringify(outlinesJson.data));
        sessionStorage.setItem('foldername', outlinesJson.data.foldername);
        sessionStorage.setItem('project_id', outlinesJson.data.project_id);
        sessionStorage.setItem(
          'pdf_images',
          JSON.stringify(outlinesJson.data.pdf_images),
        );

        // Redirect to a new page with the data
        router.push('workflow-edit-outlines');
      } else if (response.status == 402) {
        setShowPaymentModal(true);
        setIsSubmitting(false);
      } else {
        alert(
          `Server is busy now. Please try again later. Reference code: ` +
          sessionStorage.getItem('project_id'),
        );
        // alert("Request failed: " + response.status);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  // Show/hide audience input based on `audience` value
  useEffect(() => {
    if (audienceList.includes(audience)) {
      setShowAudienceInput(false);
    } else if (audience === 'unselected') {
      setShowAudienceInput(false);
    } else {
      setShowAudienceInput(true);
    }
  }, [audience]);

  // set current page to local storage
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('currentWorkflowPage', 'SummaryPage');
    }
  }, []);

  // The functions that manage the pop-up windows for questionmark
  const openProjectPopup = () => {
    setProjectPopup(true);
  };

  const closeProjectPopup = () => {
    setProjectPopup(false);
  };

  const openAudiencePopup = () => {
    setAudiencePopup(true);
  };

  const closeAudiencePopup = () => {
    setAudiencePopup(false);
  };

  const openLanguagePopup = () => {
    setLanguagePopup(true);
  };

  const closeLanguagePopup = () => {
    setLanguagePopup(false);
  };

  const openSupportivePopup = () => {
    setSupportivePopup(true);
  };

  const closeSupportivePopup = () => {
    setSupportivePopup(false);
  };

  const removeResourceAtIndex = (indexToRemove: number) => {
    setSelectedResources((currentResources) =>
      currentResources.filter((_, index) => index !== indexToRemove),
    );
  };

  // avoid hydration error during development caused by persistence
  if (!useHydrated()) return <></>;

  return (
    <section>
      <MyCustomJoyride steps={StepsSummaryPage()} />
      {showPaymentModal && (
        <PaywallModal
          setShowModal={setShowPaymentModal}
          message='Upgrade for more ⭐️credits.'
          showReferralLink={true}
        />
      )}

      <ToastContainer />

      <FileUploadModal
        selectedResources={selectedResources}
        setSelectedResources={setSelectedResources}
        showModal={showFileModal}
        setShowModal={setShowFileModal}
        pageInvoked={'summary'}
      />

      {/* project progress section */}
      <WorkflowStepsBanner
        currentIndex={0}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        isPaidUser={isPaidUser}
        contentRef={contentRef}
        nextIsPaidFeature={false}
        nextText={
          !isSubmitting ? 'Write Outline (20⭐️)' : 'Writing Outline...'
        }
      />

      {/* main content */}
      <div className='my-4 gap-y-4 w-full flex flex-col items-center'>
        <GPTToggleWithExplanation setIsGpt35={setIsGpt35} />

        {/* Project Summary section */}
        <div className='w-full lg:w-2/3 px-3 my-3 lg:my-1' id='SummaryStep-2'>

          {generationMode === 'from_files' &&
            <>
              <FromDocsUploadFile
                openSupportivePopup={openSupportivePopup}
                closeSupportivePopup={closeSupportivePopup}
                showSupportivePopup={showSupportivePopup}
                setShowFileModal={setShowFileModal}
                selectedResources={selectedResources}
                setSelectedResources={setSelectedResources}
                removeResourceAtIndex={removeResourceAtIndex}
              />
            </>
          }
          {/* text area section */}
          <div className='project_container w-full my-2 lg:my-5 border border-2 border-gray-200'>
            {/* title */}
            <div className='title1'>
              <p className='text-3xl'>Summary</p>
              <p id='after1'> {generationMode === 'from_topic' ? '(required)' : '(optional)'}</p>
            </div>
            <div className='my-4'>
              <span className='text-sm text-gray-500'>
                To get started, give us some high-level intro about your project
              </span>
            </div>
            {generationMode === 'from_topic' && (
              <div className='flex items-center gap-1'>
                <p className='text-sm'>Project Topic</p>
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
                        The main subject or theme of your project. It will set the
                        direction and focus of the contents.
                      </div>
                    )}
                  </div>
                </div>
              </div>)}
            {generationMode === 'from_topic' && (
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
                {topicError && (
                  <div className='text-red-500 text-sm mt-1'>{topicError}</div>
                )}
              </div>)}

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
                      <option key={value} value={value}>
                        {value}
                      </option>
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
                    <option key='English' value='English'>
                      🇺🇸 English (United States)
                    </option>
                    <option key='British English' value='British English'>
                      🇬🇧 English (British)
                    </option>
                    <option key='Spanish' value='Spanish'>
                      🌎 Español (Latinoamérica)
                    </option>
                    <option
                      key='Continental Spanish'
                      value='Continental Spanish'
                    >
                      🇪🇸 Español (España)
                    </option>
                    <option key='Chinese' value='Chinese'>
                      🇨🇳 中文 (简体)
                    </option>
                    <option
                      key='Traditional Chinese'
                      value='Traditional Chinese'
                    >
                      🇹🇼 中文 (繁體)
                    </option>
                    <option key='French' value='French'>
                      🇫🇷 Français
                    </option>
                    <option key='Russian' value='Russian'>
                      🇷🇺 Русский
                    </option>
                    <option key='Ukrainian' value='Ukrainian'>
                      🇺🇦 Українська
                    </option>
                    <option key='German' value='German'>
                      🇩🇪 Deutsch
                    </option>
                    <option key='Brazilian Portuguese' value='Brazilian Portuguese'>
                      🇧🇷 Português (Brasil)
                    </option>
                    <option key='Portuguese' value='Portuguese'>
                      🇵🇹 Português
                    </option>
                    <option key='Hindi' value='Hindi'>
                      🇮🇳 हिन्दी
                    </option>
                    <option key='Japanese' value='Japanese'>
                      🇯🇵 日本語
                    </option>
                    <option key='Korean' value='Korean'>
                      🇰🇷 한국어
                    </option>
                    <option key='Arabic' value='Arabic'>
                      🇸🇦 العربية
                    </option>
                    <option key='Hebrew' value='Hebrew'>
                      🇮🇱 עברית
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* supporting docs  section */}
        {generationMode === 'from_topic' && (
          <div
            className='supp_container w-full lg:w-2/3 px-3 my-3 lg:my-1'
            id='SummaryStep-3'
          >
            <div className='additional_container my-2 lg:my-5  border border-2 border-gray-200'>
              <div className='title2'>
                <p className='text-3xl'>Supporting Documents</p>
                <p id='after2'> (Optional)</p>
              </div>
              <div className='my-4'>
                <span className='text-sm text-gray-500'>
                  Offer more brilliant materials, your decks will been engaged
                  with more depth
                </span>
              </div>
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
                        Any additional files that can enhance and provide context
                        to your projects. This could be research data, images,
                        charts, or reference materials.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <LinkInput
                selectedResources={selectedResources}
                setSelectedResources={setSelectedResources}
              />

              <div className='drop_file bg-gray-100 border border-2 border-gray-200'>
                <div className='flex items-center w-full'>
                  <FaFilePdf />
                  <span className='text-sm md:text-l'>Drop files here or </span>
                  <SmallBlueButton
                    onClick={(e) => {
                      e.preventDefault();
                      setShowFileModal(true);
                    }}
                  >
                    Browse File
                  </SmallBlueButton>
                </div>
              </div>
              {selectedResources.length > 0 && <hr id='add_hr' />}
              <div className='mt-[10px]'>
                <SelectedResourcesList
                  selectedResources={selectedResources}
                  removeResourceAtIndex={removeResourceAtIndex}
                />
              </div>
            </div>
          </div>)}
      </div>
      <FeedbackButton />
    </section>
  );
}
