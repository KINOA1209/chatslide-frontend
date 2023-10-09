'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from "../utils/AuthService";
import UserService from "../utils/UserService";
import { FileUploadButton } from '../fileUpload';
import Timer from '../ui/Timer';
import GuestUploadModal from './uploadModal';
import MyFiles from '../fileManagement';
import { Transition } from '@headlessui/react'
import GPTToggle from '../button/GPTToggle';
import PaywallModal from './paywallModal';
import mixpanel from 'mixpanel-browser';

const audienceList = ['Researchers', 'Students', 'Business Clients', 'Office Colleagues', 'Video Viewers', 'Myself', ];

interface Project {
    topic: string;
    audience: string;
}

const TopicForm: React.FC = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [youtubeError, setYoutubeError] = useState('');
    const [isGpt35, setIsGpt35] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

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

    // bind form data between input and sessionStorage
    const [topic, setTopic] = useState((typeof window !== 'undefined' && sessionStorage.topic != undefined) ? sessionStorage.topic : '');
    const [audience, setAudience] = useState((typeof window !== 'undefined' && sessionStorage.audience != undefined) ? sessionStorage.audience : 'unselected');
    const [language, setLanguage] = useState((typeof window !== 'undefined' && sessionStorage.language != undefined) ? sessionStorage.language : 'English');
    const [youtube, setYoutube] = useState((typeof window !== 'undefined' && sessionStorage.youtube != undefined) ? sessionStorage.youtube : '');
    const [addEquations, setAddEquations] = useState(
        typeof window !== 'undefined' && sessionStorage.addEquations != undefined
            ? JSON.parse(sessionStorage.addEquations)
            : false
    );
    const [topicSuggestions, setTopicSuggestions] = useState<string[]>(["Ultrasound"]);
    const [audienceSuggestions, setAudienceSuggestions] = useState<string[]>([]);
    const [showAudienceInput, setShowAudienceInput] = useState(false);

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

        console.log("created form data");

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

            // console.log(formData);
            // console.log(response);

            if (response.ok) {
                const outlinesJson = await response.json();
                setIsSubmitting(false);
                // Handle the response data here
                // console.log(outlinesJson);
                // console.log(outlinesJson.data.audience);
                // console.log(outlinesJson.data.topic);
                // console.log(outlinesJson.data.res);
                // console.log(outlinesJson.data.foldername);


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
                console.log(response);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    };

    const handleSelectResources = (resource: Array<string>) => {
        sessionStorage.setItem('resources', JSON.stringify(resource));
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

    return (
        <div>
            { showPaymentModal && <PaywallModal setShowModal={setShowPaymentModal} message='Upgrade for more ⭐️credits.'/> }

            <form onSubmit={handleSubmit}>
                <Transition
                    className='h-full w-full z-10 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
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

                <div className="w-full flex flex-row flex-wrap -mx-3 mb-4">

                    {/* Left Column */}
                    <div className="w-full md:w-1/2 px-3">


                        {/* Topic Section */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">

                                <br />
                                <label
                                    className="block text-gray-800 text-sm font-medium mb-1"
                                    htmlFor="topic">
                                    Topic<span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="topic"
                                    type="text"
                                    className="form-input w-full text-gray-800 mb-2"
                                    placeholder="Your topic here"
                                    value={topic}
                                    onChange={e => setTopic(e.target.value)}
                                    maxLength={80}
                                    required />
                                {topicSuggestions.length > 0 && (
                                    <div>
                                        <div className="flex text-gray-600 flex-wrap gap-3 mb-4">
                                            Try:
                                            {topicSuggestions.map((topic, index) => (
                                                <button
                                                    key={index}
                                                    className="text-sm text-gray-800 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-sm cursor-pointer"
                                                    onClick={(event) => handleTopicSuggestionClick(topic, event)}
                                                >
                                                    {topic}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Audience Section */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label
                                    className="block text-gray-800 text-sm font-medium mb-1"
                                    htmlFor="audience">
                                    Audience: <span className="text-red-600">*</span>
                                </label>
                                <select
                                    className="form-input w-full text-gray-800 pb-3 mb-2"
                                    value={audienceList.includes(audience) ? audience : audience === 'unselected' ? 'unselected' : 'other'}
                                    onChange={e => audienceDropDown(e.target.value)}
                                    required
                                >
                                    <option value="unselected" selected disabled>Choose your audience</option>
                                    {audienceList.map((value) => (
                                        <option value={value}>{value}</option>
                                    ))}
                                    <option value="other">Other (please specify)</option>
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
                                {/* {audienceSuggestions.length > 0 && (
                                <div>
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {audienceSuggestions.map((audience, index) => (
                                            <button
                                                key={index}
                                                className="text-sm text-gray-800 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-sm cursor-pointer"
                                                onClick={(event) => handleAudienceSuggestionClick(audience, event)}
                                            >
                                                {audience}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )} */}
                            </div>
                        </div>

                        {/* Language Section */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label
                                    className="block text-gray-800 text-sm font-medium mb-1"
                                    htmlFor="language">
                                    Language: <span className="text-red-600">*</span>
                                </label>
                                <select
                                    id="language"
                                    className="form-input w-full text-gray-800"
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

                    {/* Right Column */}
                    <div className="w-full md:w-1/2 px-3">

                        <div className='flex flex-row flex-nowrap w-full items-center'>
                            <hr className='border-gray-400 grow' />
                            <div className='mx-4 text-gray-400'>Optional</div>
                            <hr className='border-gray-400 grow' />
                        </div>

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

                        {/* YouTube Section */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label
                                    className="block text-gray-800 text-sm font-medium mb-1"
                                    htmlFor="youtube">
                                    Supporting Youtube Video Link:
                                </label>
                                <input
                                    id="youtube"
                                    type="text"
                                    className="form-input w-full text-gray-800 mb-2"
                                    value={youtube}
                                    onChange={e => handleYoutubeChange(e.target.value)}
                                />
                                {youtubeError && <div className="text-sm text-red-500">{youtubeError}</div>}
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div className="max-w-sm mx-auto">
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    {user ?
                                        <button
                                            className="btn text-blue-600 bg-gray-100 hover:bg-gray-200 w-full border border-blue-600"
                                            onClick={e => handleOpenFile(e)}
                                        >
                                            Add Supporting File
                                        </button> :
                                        <GuestUploadModal />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='border-gray-400 grow mt-6' />



                <div className="max-w-sm mx-auto">
                    <div className="flex flex-wrap -mx-3 mt-6 justify-center">
                        <GPTToggle isGpt35={isGpt35} setIsGpt35={setIsGpt35} />
                        <div className="w-full px-3">
                            <button
                                className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400"
                                disabled={isSubmitting}
                                // style={{ backgroundColor: '#8b2e2d'}}
                                type="submit">
                                {isSubmitting ? "Generating..." : "Generate Outline"}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Timer */}
                <Timer expectedSeconds={15} isSubmitting={isSubmitting} />


            </form >
        </div>
    );
};

export default TopicForm;