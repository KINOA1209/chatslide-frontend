"use client"

import React, { useState, ChangeEvent, FormEvent, useEffect, MouseEvent, useRef } from 'react'
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import GuestUploadModal from '@/components/forms/uploadModal';
import 'react-toastify/dist/ReactToastify.css'
import ProjectProgress from '@/components/newWorkflowSteps';
import NewWorkflowGPTToggle from '@/components/button/NewWorkflowGPTToggle';
import AuthService from "@/components/utils/AuthService";
import UserService from "@/components/utils/UserService";
import mixpanel from 'mixpanel-browser';
import { Transition } from '@headlessui/react';
import MyFiles from '@/components/fileManagement';
import PaywallModal from '@/components/forms/paywallModal';
import Timer from '@/components/ui/Timer';
import FileManagement from '@/components/fileManagement';
import FeedbackButton from '@/components/slides/feedback';

import {
　QuestionExplainIcon,
  RightTurnArrowIcon,
} from '@/app/(feature)/icons'

const audienceList = ['Researchers', 'Students', 'Business Clients', 'Office Colleagues', 'Video Viewers', 'Myself', ];

interface Project {
    topic: string;
    audience: string;
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
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [youtubeError, setYoutubeError] = useState('');
    const [isGpt35, setIsGpt35] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [topicSuggestions, setTopicSuggestions] = useState<string[]>(["Ultrasound"]);
    const [audienceSuggestions, setAudienceSuggestions] = useState<string[]>([]);
    const [showAudienceInput, setShowAudienceInput] = useState(false);
    const [showProjectPopup, setProjectPopup] = useState(false);
    const [showAudiencePopup, setAudiencePopup] = useState(false);
    const [showLanguagePopup, setLanguagePopup] = useState(false);
    const [showSupportivePopup, setSupportivePopup] = useState(false);
    const [selectedFileList, setselectedFileList] = useState([]);
    const [selectedFileListName, setselectedFileListName] = useState<string[]>([]);

    // bind form data between input and sessionStorage
    const [topic, setTopic] = useState('');
    const [audience, setAudience] = useState((typeof window !== 'undefined' && sessionStorage.audience != undefined) ? sessionStorage.audience : 'unselected');
    const [language, setLanguage] = useState((typeof window !== 'undefined' && sessionStorage.language != undefined) ? sessionStorage.language : 'English');
    const [youtube, setYoutube] = useState((typeof window !== 'undefined' && sessionStorage.youtube != undefined) ? sessionStorage.youtube : '');
    const [addEquations, setAddEquations] = useState(
        typeof window !== 'undefined' && sessionStorage.addEquations != undefined
            ? JSON.parse(sessionStorage.addEquations)
            : false
    );


    useEffect(() => {
        const clientTopic = sessionStorage.getItem('topic');
        if (clientTopic) {
            setTopic(clientTopic);
        }
    }, []);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            if (userId) {
                const data = await UserService.getUserHistoricalInput(idToken)
                if (data) {
                    //to avoid duplicates, however do not check for cases
                    const uniqueTopics = new Set(data.map((project: Project) => project.topic));
                    const uniqueAudiences = new Set(data.map((project: Project) => project.audience));

                    setTopicSuggestions(Array.from(uniqueTopics) as string[]);
                    setAudienceSuggestions(Array.from(uniqueAudiences) as string[]);
                }
            }
        };
        const fetchUser = async () => {
            const user = await AuthService.getCurrentUser();
            if (user) {
                setUser(user);
            }
        };
        fetchHistoricalData();
        fetchUser();
    }, []);

    const openFile = () => {
        setShowFileModal(true);
    };

    const closeFile = () => {
        setShowFileModal(false);
    };

    const handleOpenFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        openFile();
    };
    const handleTopicSuggestionClick = (topic: string, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTopic(topic);
    };

    const handleAudienceSuggestionClick = (audience: string, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAudience(audience);
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (youtubeError) {
            return;
        }

        const project_id = (typeof window !== 'undefined' && sessionStorage.project_id != undefined) ? sessionStorage.project_id : '';

        setIsSubmitting(true);

        const formData = {
            topic: (event.target as HTMLFormElement).topic.value,
            audience: (event.target as HTMLFormElement).audience.value,
            language: (event.target as HTMLFormElement).language.value,
            addEquations: addEquations,
            project_id: project_id,
            youtube_url: (event.target as HTMLFormElement).youtube.value,
            resources: JSON.parse(sessionStorage.getItem('resources') || '[]'),
            model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4'
        };

        sessionStorage.setItem('topic', formData.topic);
        sessionStorage.setItem('audience', formData.audience);
        sessionStorage.setItem('language', formData.language);
        sessionStorage.setItem('addEquations', formData.addEquations);

        mixpanel.track("Generate Outline", {
            "audience": formData.audience,
            "language": formData.language,
            "addEquations": formData.addEquations,
            "model_name": formData.model_name
        });

        try {
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch('/api/outlines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const outlinesJson = await response.json();
                setIsSubmitting(false);
                // Handle the response data here
                 console.log(outlinesJson);

                // cookies doesn't work because it needs 'use server'
                // cookies().set("topic", outlinesJson.data.audience);

                // Store the data in session storage
                sessionStorage.setItem('outline', JSON.stringify(outlinesJson.data));
                sessionStorage.setItem('foldername', outlinesJson.data.foldername);
                sessionStorage.setItem('project_id', outlinesJson.data.project_id);
                sessionStorage.setItem('pdf_images', JSON.stringify(outlinesJson.data.pdf_images));

                // Retrieve the existing resources from sessionStorage and parse them
                const resources: string[] = JSON.parse(sessionStorage.getItem('resources') || '[]');

                // Add the new YouTube URL to the resources list if it's not empty
                const youtube_id: string = outlinesJson.data.youtube_id;

                if (youtube_id.trim() !== "") {
                    resources.push(youtube_id);
                }

                // Convert the updated list to a JSON string
                const updatedResourcesJSON: string = JSON.stringify(resources);

                // Store the updated JSON string back in sessionStorage
                sessionStorage.setItem('resources', updatedResourcesJSON);

                // Redirect to a new page with the data
                router.push('workflow-edit-outlines');
            } else if (response.status == 402) {
                setShowPaymentModal(true);
                setIsSubmitting(false);
            } else {
                alert(`Server is busy now. Please try again later. Reference code: ` + sessionStorage.getItem('project_id'));
                // alert("Request failed: " + response.status);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    };

    const handleSelectResources = (resource: Array<string>) => {
        sessionStorage.setItem('resources', JSON.stringify(resource));
        const selectedResourcesJson = sessionStorage.getItem('resources')
        const allHistoryResourcesJson = sessionStorage.getItem('history_resource')

        if (selectedResourcesJson && allHistoryResourcesJson) {
            const selectedResources = JSON.parse(selectedResourcesJson);
            setselectedFileList(selectedResources);

            // set recreate_collection to true in session storage
            sessionStorage.setItem('recreate_collection', JSON.stringify(true));

            //clear extraKnowledge from session storage
            sessionStorage.removeItem('extraKnowledge');

            //find the corresponding file name
            const selectedResourcesIdArray: string[] = JSON.parse(selectedResourcesJson)
            const allHistoryResourcesArray: Array<{id:string, filename:string}> = JSON.parse(allHistoryResourcesJson);
            const fileNamesArray = selectedResourcesIdArray.map((id) => {
                const correspondingFile = allHistoryResourcesArray.find((file) => file.id === id);
                return correspondingFile ? correspondingFile.filename : 'Unkown File';
            });
            setselectedFileListName(fileNamesArray)
        }
    };

    const audienceDropDown = (value: string) => {
        if (value === 'other') {
            setAudience('');
            setShowAudienceInput(true);
        } else {
            setShowAudienceInput(false);
            setAudience(value);
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

    const handleYoutubeChange = (link: string) => {
        // url format: https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486 
        // search params will be ignored
        // sample: https://www.youtube.com/watch?v=Ir3eJ1t13fk
        // sample: http://youtu.be/lalOy8Mbfdc?t=1s
        // sample: https://www.youtube.com/v/-wtIMTCHWuI?app=desktop

        if (link === '') {
            setYoutube('');
            setYoutubeError('');
            return;
        }
        setYoutube(link);
        setYoutubeError('');
        // validate url
        const regex1 = /youtube\.com\/watch\?v=[a-zA-z0-9_-]{11}/;
        const regex2 = /youtu\.be\/[A-Za-z0-9_-]{11}/;
        const regex3 = /youtube\.com\/v\/[a-zA-z0-9_-]{11}/;
        if (regex1.test(link)) {
            const essentialLink = link.match(regex1);
            if (essentialLink && essentialLink.length > 0) {
                setYoutube('https://www.' + essentialLink[0]);
            }
        } else if (regex2.test(link)) {
            const essentialLink = link.match(regex2);
            if (essentialLink && essentialLink.length > 0) {
                const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/);
                if (vID && vID.length > 0) {
                    setYoutube('https://www.youtube.com/watch?v=' + vID[0]);
                }
            }
        } else if (regex3.test(link)) {
            const essentialLink = link.match(regex3);
            if (essentialLink && essentialLink.length > 0) {
                const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/);
                if (vID && vID.length > 0) {
                    setYoutube('https://www.youtube.com/watch?v=' + vID[0]);
                }
            }
        } else {
            setYoutubeError('Please use a valid YouTube video link');
        }
    };

    // Function to open the popup
    const openPopup = () => {
        setShowPopup(true)
    }

    // Function to close the popup
    const closePopup = () => {
        setShowPopup(false)
    }

    

    // code for stripe to make fake payment
    // useEffect(() => {
    //     // Include the Stripe.js script dynamically
    //     const stripeScript = document.createElement('script');
    //     stripeScript.src = 'https://js.stripe.com/v3/';
    //     stripeScript.async = true;
    
    //     stripeScript.onload = () => {
    //       // Stripe.js has loaded, you can now use it
    //       const stripe = window.Stripe('');
    //       // Rest of your Stripe-related code here
    //     };
    
    //     document.head.appendChild(stripeScript);
    
    //     return () => {
    //       // Cleanup if necessary
    //       document.head.removeChild(stripeScript);
    //     };
    //   }, []);


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
            { showPaymentModal && <PaywallModal setShowModal={setShowPaymentModal} message='Upgrade for more ⭐️credits.'/> }
            <form onSubmit={handleSubmit}>
                <Transition
                    className='h-full w-full z-50 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
                    show={showFileModal}
                    onClick={closeFile}
                    enter="transition ease duration-300 transform"
                    enterFrom="opacity-0 translate-y-12"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease duration-300 transform"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-12"
                >
                    <div className='grow md:grow-0'></div>
                    <Transition
                        className='bg-gray-100 w-full h-3/4 md:h-2/3
                                md:max-w-2xl z-20 rounded-t-xl md:rounded-xl drop-shadow-2xl 
                                overflow-hidden flex flex-col p-4'
                        show={showFileModal}
                        enter="transition ease duration-500 transform delay-300"
                        enterFrom="opacity-0 translate-y-12"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease duration-300 transform"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-12"
                        onClick={e => { e.stopPropagation() }}
                    >
                        <h4 className="h4 text-blue-600 text-center">Select Supporting Material</h4>
                        <MyFiles selectable={true} callback={handleSelectResources} />
                        <div className="max-w-sm mx-auto">
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button
                                        className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full"
                                        type="button"
                                        onClick={e => { e.preventDefault(); closeFile(); }}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </Transition>

                {/* questionmark after gpt toggle */}
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

                {/* project progress section */}
                <div className='mt-[3rem] flex flex-col w-full bg-Grey-50 justify-center gap-1 py-[0.75rem] border-b-2'>
                    <div className='self-center'>
                        <ProjectProgress currentInd={0} contentRef={contentRef} />
                    </div>

                    <div className='self-end mx-auto lg:mx-[5rem] flex flex-row gap-4 cursor-pointer'>
                        <NewWorkflowGPTToggle isGpt35={isGpt35} setIsGpt35={setIsGpt35} />
                        <div className='cursor-pointer' onClick={openPopup}>
                            <QuestionExplainIcon />
                        </div>
                    </div>

                    <div className="self-end w-full mx-auto lg:mx-[5rem] flex gap-4">

                        <div id='progress_title' className='flex-auto text-center self-center text-neutral-900 text-xl hidden md:block hidden font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap lg:pl-[35%]'>
                            To get started, give us some high-level intro about your project.
                        </div>
                        <div className='flex flex-col w-full lg:mx-[0rem] lg:w-[23rem]'>
                            <button 
                                id="generate_button"
                                disabled={isSubmitting}
                                className='w-[11rem] mx-auto h-8 px-5 py-1.5 bg-Generate-slides-bg-color rounded-3xl justify-center items-center gap-5 inline-flex cursor-pointer disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400  lg:mr-[1%]'
                                type="submit"
                                >
                                <div className='w-[6rem] text-zinc-100 text-sm font-medium font-creato-medium leading-none tracking-tight whitespace-nowrap'>
                                    Generate Outline
                                </div>
                                <div>
                                    <RightTurnArrowIcon />
                                </div>
                            </button>
                            <div className='mx-auto py-1.5 lg:mr-[0%]'>
                                <Timer expectedSeconds={15} isSubmitting={isSubmitting} />
                            </div>
                        </div> 
                    </div>
                    <div className='w-[9rem]'></div>
                </div>                   
            

            {/* main content */}
            <div className="main_container w-full lg:flex">
                {/* Project Summary section */}
                <div className="summary_container w-full lg:w-1/2 px-3 my-3 lg:my-1">
                    {/* title */}
                    <div className="title1">
                        <p>Project Summary</p>
                        <p id="after1"> (Required)</p>
                    </div>

                    {/* text area section */}
                    <div className="project_container w-full h-[665px] lg:h-[550px] my-2 lg:my-5">
                        <div className="project_topic">
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
                                    { showProjectPopup && (
                                        <div 
                                        id='project_popup' 
                                        className=
                                        "absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[5rem] md:w-80 md:h-[4rem] flex justify-center items-center">
                                            The main subject or theme of your project. It will set the direction and focus of the contents.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="textfield">
                            <textarea 
                                onChange={(e) => setTopic(e.target.value)} 
                                className="focus:ring-0 text-xl" 
                                id="topic"
                                value={topic}
                                maxLength={80}
                                required
                                placeholder="e.g. How to make healthy & yummy salad. Talk about multi aspects, from ingredients selection to secret sauce making, perfect recipes, etc.">                                               
                            </textarea>
                            {<div className="charcnt" id="charcnt">{80 - topic.length} characters left</div>}
                        </div>

                        {/* DropDown menu section */}
                        <div className="dropdown_container w-full lg:flex">
                            <div className="audience_container">
                                <div className="your_audience ">
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
                                            { showAudiencePopup && (
                                                <div 
                                                id='audience_popup' 
                                                className=
                                                "absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[6rem] md:w-[17rem] md:h-[5rem] flex justify-center items-center">
                                                    Specify the intended viewers of your projects, tailoring to your audience ensures the content resonates effectively.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="audience_drop">
                                    <label
                                        htmlFor="audience">
                                    </label>
                                    <select 
                                        className="focus:ring-0"
                                        value={audienceList.includes(audience) ? audience : audience === 'unselected' ? 'unselected' : 'other'}
                                        onChange={e => audienceDropDown(e.target.value)}
                                        required
                                    >
                                        <option value="unselected" selected disabled>Choose your audience</option>
                                        {audienceList.map((value) => (
                                            <option value = {value}>{value}</option>
                                        ))}
                                    </select>
                                    <input
                                        id="audience"
                                        type="text"
                                        className={`form-input w-full text-gray-800 mb-2 ${showAudienceInput ? '' : 'hidden'}`}
                                        placeholder="Other (please specify)"
                                        value={audience}
                                        onChange={e => setAudience(e.target.value)}
                                        required
                                        maxLength={40}
                                    />
                                </div>
                            </div>
                            <div className="language_container mt-[1rem] lg:mt-[0rem]">
                                <div className="language ">
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
                                            { showLanguagePopup && (
                                                <div 
                                                id='language_popup' 
                                                className=
                                                "absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[13rem] h-[3rem] md:w-[14rem] md:h-[3rem] flex justify-center items-center">
                                                    Specify the intended language of your projects.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="language_drop">
                                    <select 
                                        className="focus:ring-0" 
                                        id="language"
                                        value={language}
                                        onChange={e => setLanguage(e.target.value)}
                                        required
                                    >
                                        <option value="English">English</option>
                                        <option value="Chinese">中文</option>
                                        <option value="Spanish">Español</option>
                                        <option value="French">Français</option>
                                        <option value="German">Deutsch</option>
                                        <option value="Russian">Русский</option>
                                        <option value="Japanese">日本語</option>
                                        <option value="Portuguese">Português</option>
                                        <option value="Ukrainian">Українська</option>
                                    </select>
                                </div>
                            </div>           
                        </div>

                        {/* check equation section */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3 mt-2 flex flex-row">
                                <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        id="addEquations"
                                        className="form-checkbox text-gray-800"
                                        checked={addEquations} // Use 'checked' instead of 'value'
                                        onChange={(e) => setAddEquations(e.target.checked)}
                                    />
                                </div>
                                <label
                                    className=" ml-2 block text-gray-800 text-sm font-medium"
                                    htmlFor="addEquations">
                                    Select to <b>add equations and formulas</b> to my content, recommended for Math/Science subjects
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* supplementary section */}
                <div className="supp_container w-full lg:w-2/5 px-3 my-3 lg:my-1">
                    <div className="title2">
                        <p>Supplementary Materials</p>
                        <p id="after2"> (Optional)</p>
                    </div>

                    <div className="additional_container my-2 lg:my-5">
                        <div className="upload">
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
                                    { showSupportivePopup && (
                                        <div 
                                        id='supportive_popup' 
                                        className=
                                        "absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[6rem] md:w-80 md:h-[5rem] flex justify-center items-center">
                                            Any additional files that can enhance and provide context to your projects. This could be research data, images, charts, or reference materials.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="youtube_container">
                            <div id='youtube_text_container' className="flex items-center w-full">
                                <img className="w-4 h-4" src="/icons/youtube_icon.png" />
                                <div className="w-full">
                                    <label htmlFor="youtube_text"></label>
                                    <input
                                        id="youtube"
                                        type="text"
                                        className="form-input w-full"
                                        value={youtube}
                                        onChange={e => handleYoutubeChange(e.target.value)}
                                        placeholder= 'Paste YouTube link here'
                                    />  
                                </div>
                            </div>
                            {youtubeError && <div className="text-sm text-red-500">{youtubeError}</div>}  
                        </div>

                        <div className="drop_file">
                            <div className='flex items-center w-full'>
                                <img className="" src="/icons/drop_files_icon.png" />
                                {/* <span>Drop files here or </span>*/}
                                    <button
                                        id = "browse_btn"
                                        onClick={e => handleOpenFile(e)}
                                    >
                                        Browse File
                                    </button> 
                            </div>
                        </div>
                        <hr id="add_hr" />
                        <div className='h-[290px] mt-[10px]'>
                            <ul className='flex flex-col gap-4' style={{ maxHeight: '280px', overflowY: 'auto' }}>
                                {selectedFileListName.map((selectedFile, index) => (
                                    <li key={index}>
                                        <div id='selectedfile_each' className='flex items-center gap-2 bg-white rounded h-[50px] pl-[1rem]'>
                                            <img src="/icons/selectedFiles_icon.png"/>
                                            <span>{selectedFile}</span>
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