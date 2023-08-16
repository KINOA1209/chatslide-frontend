'use client'

import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import Timer from '@/components/Timer';
import ProjectProgress from "@/components/steps";
import AuthService from '@/components/utils/AuthService';
import FeedbackForm from '@/components/feedback';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Transition } from '@headlessui/react';
import { eventManager } from 'react-toastify/dist/core';

const minOutlineDetailCount = 1;
const maxOutlineDetailCount = 6;
const minOutlineSectionCount = 1;
const maxOutlineSectionCount = 10;
const maxLength = 60;

interface OutlineSection {
    title: string,
    content: Array<string>
}

interface OutlineDataType extends Array<OutlineSection> { }

const OutlineVisualizer = ({ outline }: { outline: OutlineDataType }) => {
    const router = useRouter();
    const [outlineData, setOutlineData] = useState(outline);
    const [sectionEditMode, setSectionEditMode] = useState(-1);
    const [titleCache, setTitleCache] = useState('');

    const updateOutlineSessionStorage = (updatedOutline: any) => {
        const entireOutline = JSON.parse(sessionStorage.outline);
        entireOutline.res = JSON.stringify({ ...updatedOutline });
        sessionStorage.setItem('outline', JSON.stringify(entireOutline));
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>, sectionIndex: number, detailIndex: number, key: string) => {
        const { value } = e.target;
        if (value.length <= maxLength) {
            setOutlineData((prevOutlineData: any) => {
                const updatedOutlineData = [...prevOutlineData];
                updatedOutlineData[sectionIndex]['content'][detailIndex] = value;
                updateOutlineSessionStorage(updatedOutlineData);
                return updatedOutlineData;
            });
        }
    };

    const [isSubmittingSlide, setIsSubmittingSlide] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isSubmittingScript, setIsSubmittingScript] = useState(false);
    const [toSlides, setToSlides] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
        setIsSubmittingSlide(false);
    };

    function openModal() {
        setIsOpen(true);
    };

    const prepareSubmit = (event: FormEvent<HTMLFormElement>) => {
        console.log("submitting");
        event.preventDefault();
        if (toSlides) {
            let hasScript = null;
            let hasAudio = null;
            if (typeof window !== 'undefined') {
                hasScript = sessionStorage.getItem('transcripts');
                hasAudio = sessionStorage.getItem('audio_files');
            }
            if (hasScript !== null || hasAudio !== null) {
                openModal();
            } else {
                setIsSubmittingSlide(true);
                handleSubmit();
            }
        } else {
            handleSubmit();
        }
    }

    const slideModalSubmit = () => {
        closeModal();
        setIsSubmittingSlide(true);
        // clean sessionStorage
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('transcripts');
            sessionStorage.removeItem('audio_files');
        }
        handleSubmit();
    };

    const handleSubmit = async () => {
        setTimer(0);
        setIsDisabled(true);
        let formData: any = {};


        // remove empty entries
        console.log(outlineData);
        const outlineCopy = [...outlineData];
        for (let i = 0; i < outlineCopy.length; i++) {
            outlineCopy[i].content = outlineCopy[i].content.filter(s => { return s.length > 0 });
        }
        setOutlineData(outlineCopy);
        updateOutlineSessionStorage(outlineCopy);

        const audience = typeof window !== 'undefined' ? sessionStorage.getItem('audience') : null;
        const foldername = typeof window !== 'undefined' ? sessionStorage.getItem('foldername') : null;
        const topic = typeof window !== 'undefined' ? sessionStorage.getItem('topic') : null;
        const language = typeof window !== 'undefined' ? sessionStorage.getItem('language') : 'English';
        const project_id = typeof window !== 'undefined' ? sessionStorage.getItem('project_id') : null;
        const resources = typeof window !== 'undefined' ? sessionStorage.getItem('resources') : null;
        const addEquations = typeof window !== 'undefined' ? sessionStorage.getItem('addEquations') : null;
        const extraKnowledge = typeof window !== 'undefined' ? sessionStorage.getItem('extraKnowledge') : null;


        async function query_resources(project_id: any, resources: any, outlineData: any) {
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            const headers = new Headers();
            if (token) {
                headers.append('Authorization', `Bearer ${token}`);
            }

            const response = await fetch('/api/query_resources', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    outlines: JSON.stringify({ ...outlineData }),
                    resources: resources,
                    project_id: project_id
                })
            });

            if (response.ok) {
                return await response.json();
            } else {
                alert("Request failed: " + response.status);
                console.log(response)
                setIsSubmittingScript(false);
                setIsSubmittingSlide(false);
            }
        }

        if (resources && !extraKnowledge) {
            try {
                const extraKnowledge = await query_resources(project_id, resources, outlineData);
                sessionStorage.setItem('extraKnowledge', JSON.stringify(extraKnowledge.data.res));
                sessionStorage.setItem('outline_item_counts',
                    JSON.stringify(extraKnowledge.data.outline_item_counts));
            } catch (error) {
                console.log('Error querying vector database', error);
                // return; 
            }
        }


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
        };

        console.log(formData);


        try {
            // this is defined before
            const extraKnowledge = sessionStorage.getItem('extraKnowledge');
            const outline_item_counts = sessionStorage.getItem('outline_item_counts');
            if (extraKnowledge) {
                // add pdf knowledge to formData
                formData.extraKnowledge = extraKnowledge;
            }
            if (outline_item_counts) {
                // add outline item counts to formData
                formData.outline_item_counts = outline_item_counts;
            }

            // generate slides
            if (toSlides === true) {
                const response = await fetch('/api/generate_slides', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                console.log('formData is:', formData);

                if (response.ok) {
                    const resp = await response.json();
                    console.log(resp);
                    setIsSubmittingSlide(false);
                    // Store the data in local storage
                    console.log(resp.data);
                    sessionStorage.setItem('image_files', JSON.stringify(resp.data.image_files));
                    sessionStorage.setItem('pdf_file', resp.data.pdf_file);
                    sessionStorage.setItem('page_count', resp.data.page_count);

                    // Redirect to a new page with the data
                    router.push('workflow-review-slides');
                } else {
                    alert("Request failed: " + response.status);
                    console.log(response)
                    setIsSubmittingSlide(false);
                }
            }
            // generate script direclty
            else {
                const response = await fetch('/api/scripts_only', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                console.log('formData is:', formData);

                if (response.ok) {
                    const resp = await response.json();
                    console.log(resp);
                    setIsSubmittingScript(false);
                    // Store the data in local storage
                    console.log(resp.data);
                    sessionStorage.setItem('transcripts', JSON.stringify(resp.data.res));
                    // Redirect to a new page with the data
                    router.push('workflow-edit-script');
                } else {
                    alert("Request failed: " + response.status);
                    console.log(response)
                    setIsSubmittingScript(false);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setIsSubmittingSlide(false);
            setIsSubmittingScript(false);
        }

        setIsDisabled(false);
    };

    const handleAddDetail = (e: React.MouseEvent<SVGSVGElement>, sectionIndex: number, detailIndex: number) => {
        e.preventDefault();
        let newOutlineData = [...outlineData];
        newOutlineData[sectionIndex].content.splice(detailIndex + 1, 0, '');
        setOutlineData(newOutlineData);
        updateOutlineSessionStorage(newOutlineData);
    };

    const handleDeleteDetail = (e: React.MouseEvent<SVGSVGElement>, sectionIndex: number, detailIndex: number) => {
        e.preventDefault();
        let newOutlineData = [...outlineData];
        newOutlineData[sectionIndex].content.splice(detailIndex, 1);
        setOutlineData(newOutlineData);
        updateOutlineSessionStorage(newOutlineData);
    };

    const handleDeleteSection = (e: React.MouseEvent<SVGSVGElement>, sectionIndex: number) => {
        e.preventDefault();
        let newOutlineData = [...outlineData];
        newOutlineData.splice(sectionIndex, 1);
        setOutlineData(newOutlineData);
        updateOutlineSessionStorage(newOutlineData);
    };

    const handleAddSection = (e: React.MouseEvent<SVGSVGElement>, sectionIndex: number) => {
        e.preventDefault();
        let newOutlineData = [...outlineData];
        newOutlineData.splice(sectionIndex + 1, 0, { title: 'New Section', content: ['Provide some details about this section'] });
        setOutlineData(newOutlineData);
        updateOutlineSessionStorage(newOutlineData);
    };

    const handleEnterEditSection = (e: React.MouseEvent<SVGSVGElement>, sectionIndex: number) => {
        e.preventDefault();
        setTitleCache(outlineData[sectionIndex].title);
        setSectionEditMode(sectionIndex);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>, sectionIndex: number) => {
        e.preventDefault();
        if (outlineData[sectionIndex].title.length == 0) {
            toast.error('Outline section can\'t be empty!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOutlineData((prevOutlineData: OutlineDataType) => {
                const updatedOutlineData = [...prevOutlineData];
                updatedOutlineData[sectionIndex].title = titleCache;
                updateOutlineSessionStorage(updatedOutlineData);
                return updatedOutlineData;
            });
            setTitleCache('');
        }
        setSectionEditMode(-1);
    }

    const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>, sectionIndex: number) => {
        const { value } = e.target;
        if (value.length <= maxLength) {
            setOutlineData((prevOutlineData: OutlineDataType) => {
                const updatedOutlineData = [...prevOutlineData];
                updatedOutlineData[sectionIndex].title = value;
                updateOutlineSessionStorage(updatedOutlineData);
                return updatedOutlineData;
            });
        }
    };

    return (
        <div>
            <ToastContainer />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Continue to generate slides?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Generate slides will delete current scripts and audio.
                                        </p>
                                    </div>

                                    <div className="flex">
                                        <div className="flex justify-center mt-4">
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2 btn-size"
                                                onClick={slideModalSubmit}>
                                                Yes
                                            </button>
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <button className="text-blue-600 bg-gray-100 hover:bg-gray-200 border border-blue-600 py-2 px-4 rounded mr-2 btn-size"
                                                onClick={closeModal}>
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
            {outlineData && outlineData.map((section: OutlineSection, sectionIndex: number) => (
                <div key={sectionIndex + 1} className="mb-8">
                    <div className='flex flex-wrap md:flex-nowrap'>
                        {sectionIndex === sectionEditMode ?
                            <>
                                <h3 className="text-xl font-bold">
                                    {sectionIndex + 1}.&nbsp;
                                </h3>
                                <input key={sectionIndex}
                                    className='focus:outline-none border border-[#7F7F7F] rounded inline text-xl font-bold grow px-2'
                                    value={section.title}
                                    onChange={e => handleSectionChange(e, sectionIndex)}
                                    // onFocus={e => handleFocus(e, sectionIndex)}
                                    onBlur={e => handleBlur(e, sectionIndex)}
                                    autoFocus />
                            </> :
                            <h3 className='text-xl font-bold'>{sectionIndex + 1}. {section.title}</h3>
                        }
                        <div className='flex items-center justify-center'>
                            {sectionEditMode == -1 && <div>
                                <svg onClick={e => { handleEnterEditSection(e, sectionIndex) }} className='ml-2 w-5 h-5 md:opacity-25 hover:opacity-100 cursor-pointer' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <g>
                                        <path d="M500.111,71.068l-59.195-59.174c-15.859-15.849-41.531-15.862-57.386-0.014l-38.378,38.378L57.257,338.187
                                        c-7.775,7.768-13.721,17.165-17.443,27.498L1.801,471.476c-3.968,11.039-1.202,23.367,7.086,31.655
                                        c8.298,8.296,20.634,11.046,31.669,7.083l105.778-38.024c10.332-3.722,19.73-9.674,27.501-17.443l277.874-277.888l0.017,0.013
                                        l10.031-10.048l38.353-38.378l0.017-0.007C515.907,112.591,515.973,86.937,500.111,71.068z M136.729,445.475l-67.393,24.227
                                        l-27.02-27.02l24.213-67.393c0.184-0.485,0.416-0.964,0.609-1.441l71.024,71.024C137.679,445.073,137.221,445.302,136.729,445.475z
                                        M153.759,434.678c-0.956,0.956-1.978,1.836-3.011,2.703L74.63,361.263c0.863-1.025,1.739-2.051,2.696-3.007L363.814,71.732
                                        l76.443,76.437L153.759,434.678z M480.031,108.385l-28.319,28.329l-1.421,1.421l-76.444-76.437l29.75-29.75
                                        c4.758-4.74,12.463-4.747,17.245,0.014l59.199,59.174C484.796,95.884,484.806,103.575,480.031,108.385z"/>
                                    </g>
                                </svg>
                            </div>}
                            {outlineData.length < maxOutlineSectionCount && <div>
                                <svg onClick={e => { handleAddSection(e, sectionIndex) }} className='md:ml-2 w-8 h-8 md:opacity-25 hover:opacity-100 cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Edit / Add_Plus">
                                        <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </div>}
                            {outlineData.length > minOutlineSectionCount && <div>
                                <svg onClick={e => { handleDeleteSection(e, sectionIndex) }} className='md:ml-2 w-6 h-6 md:opacity-25 hover:opacity-100 cursor-pointer' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#000000"
                                        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                                </svg>
                            </div>}
                        </div>
                    </div>
                    <div className="mt-4">
                        {section.content.map((content: any, detailIndex: number) => (
                            <div className='flex mb-2'>
                                <input
                                    key={detailIndex}
                                    className="form-input w-full text-gray-800 grow"
                                    value={content}
                                    onChange={(e) => handleDetailChange(e, sectionIndex, detailIndex, 'content')}
                                    placeholder={`Detail ${detailIndex + 1}`}
                                />
                                <div className='flex items-center justify-center'>
                                    <div className='ml-2'>
                                        {outlineData[sectionIndex].content.length < maxOutlineDetailCount && <svg onClick={(e) => handleAddDetail(e, sectionIndex, detailIndex)} className='w-8 h-8 md:opacity-25 hover:opacity-100 cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Edit / Add_Plus">
                                                <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                        </svg>}
                                    </div>
                                    <div className='ml-2'>
                                        {outlineData[sectionIndex].content.length > minOutlineDetailCount && <svg onClick={(e) => handleDeleteDetail(e, sectionIndex, detailIndex)} className='w-6 h-6 md:opacity-25 hover:opacity-100 cursor-pointer' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#000000"
                                                d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                                        </svg>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Form */}
            <div className="max-w-sm mx-auto">
                <form onSubmit={prepareSubmit}>
                    <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full disabled:bg-gray-200 disabled:text-gray-400"
                                disabled={isDisabled}
                            >
                                {isSubmittingSlide ? 'Generating...' : 'Generate Slides'}
                            </button>
                            {/* Timer */}
                            <Timer expectedSeconds={60} isSubmitting={isSubmittingSlide} />
                            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mt-4 disabled:bg-gray-200 disabled:text-gray-400"
                                onClick={() => { setToSlides(false); setIsSubmittingScript(true) }}
                                disabled={isDisabled}
                            >
                                {isSubmittingScript ? 'Generating...' : 'Generate Scripts'}
                            </button>
                            {/* Timer */}
                            <Timer expectedSeconds={60} isSubmitting={isSubmittingScript} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function WorkflowStep2() {
    const storedOutline = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('outline') : null;
    const outline = storedOutline ? JSON.parse(storedOutline) : null;
    const outlineRes = outline ? JSON.parse(outline.res) : null;
    const contentRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const outlineContent = outlineRes ? Object.keys(outlineRes).map(key => {
        return {
            title: outlineRes[key]['title'],
            content: outlineRes[key]['content']
        }
    }) : null;


    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <ProjectProgress currentInd={1} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Edit Outlines</h1>
            </div>
            <div className="max-w-4xl mx-auto px-6" ref={contentRef}>
                <p>
                    This is the outline generated. You can edit the details below.
                </p>
                <br />
                {outlineContent && <OutlineVisualizer outline={outlineContent} />}
            </div>
            <div className="fixed bottom-10 right-10">
                <button
                    onClick={handleOpenModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                >
                    Feedback
                </button>

                {showModal && <FeedbackForm onClose={handleCloseModal} />}
            </div>
        </div>
    );
};
