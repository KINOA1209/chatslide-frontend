'use client'

import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Timer from '@/components/Timer';
import GoBackButton from '@/components/GoBackButton';
import ImageList from '@/components/ImageList';
import ProjectProgress from '@/components/steps';
import AuthService from '@/components/utils/AuthService';
import FeedbackForm from '@/components/forms/feedback';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingIcon } from '@/components/progress';

interface UpdateButtonProps {
    callback: Function,
    text: string,
    ind: number
}

const UpdateButton = ({ callback, text, ind }: UpdateButtonProps) => {
    const [updating, setUpdating] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number, ask: string) => {
        setUpdating(old => { return true });
        callback(e, index, ask).then(() => {
            setUpdating(old => { return false });
        });
    };

    return <button key={ind + text} className="btn w-[154px] text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400"
        onClick={e => handleClick(e, ind, 'shorter')}
        disabled={updating}>
        <div className='h-[22px] mr-2' hidden={!updating}><LoadingIcon /></div>
        {text}
    </button>
}

const TranscriptVisualizer = ({ transcripts, imageUrls }: { transcripts: [], imageUrls: [] }) => {
    const [transcriptList, setTranscriptList] = useState<string[]>(transcripts);
    const router = useRouter();
    const [hasSlides, setHasSlides] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const slidesFlag = sessionStorage.getItem('image_files');
            if (slidesFlag !== null) {
                setHasSlides(true);
            }
        }
    }, []);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newData = [...transcriptList]; // copying the old datas array
        newData[index] = event.target.value; // replace e.target.value with whatever you want to change it to
        sessionStorage.setItem('transcripts', JSON.stringify(newData));
        setTranscriptList(newData); // use the copy to set the state            
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("submitting");
        event.preventDefault();
        sessionStorage.setItem('transcripts', JSON.stringify(transcriptList));

        setIsSubmitting(true);

        const foldername = typeof window !== 'undefined' ? sessionStorage.getItem('foldername') : null;
        const topic = typeof window !== 'undefined' ? sessionStorage.getItem('topic') : null;
        const language = typeof window !== 'undefined' ? sessionStorage.getItem('language') : 'English';

        const formData = {
            res: transcriptList,
            foldername: foldername,
            topic: topic,
            language: language,
        };

        console.log(formData);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch('/api/generate_audio', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
                setIsSubmitting(false);
                // Store the data in local storage
                console.log(resp.data);
                sessionStorage.setItem('audio_files', JSON.stringify(resp.data.res));

                // Redirect to a new page with the data
                router.push('workflow-review-audio');
            } else {
                alert("Request failed: " + response.status);
                console.log(response)
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    };

    const handleUpdateScript = async (e: React.MouseEvent<HTMLButtonElement>, index: number, ask: string) => {
        e.preventDefault();
        const text = transcriptList[index];
        const updateData = {
            ask: ask,
            text: text,
        }
        console.log(updateData);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch('/api/update_script', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const resp = await response.json();
                console.log(resp.data);
                const res = resp.data.res;
                // Update local data
                let newData = [...transcriptList];
                newData[index] = res;
                sessionStorage.setItem('transcripts', JSON.stringify(newData));
                setTranscriptList(newData);
                toast.success('Script has been updated!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

            } else {
                alert("Request failed: " + response.status);
                console.log(response)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {transcriptList.map((data, index) => (
                <div tabIndex={index} className='w-full flex flex-col md:flex-row rounded border-solid border-2 border-blue-200 mt-4 focus-within:border-blue-600'>
                    <div className={`grid ${hasSlides ? 'sm:grid-rows-2' : 'sm:grid-rows-1'} md:grid-rows-1 ${hasSlides ? 'md:grid-cols-2' : 'md:grid-cols-1'} grow`}>
                        {hasSlides && <ImageList urls={[imageUrls[index]]} height={100} />}
                        <textarea
                            key={index}
                            className={`${!hasSlides && 'h-80'} block form-input w-full text-gray-800 mb-2 resize-none border-none p-4`}
                            value={data}
                            onChange={(event) => handleChange(index, event)}
                        // readOnly
                        />
                    </div>
                    <div className='flex flex-row items-center px-1.5 py-2 md:flex-col shrink-0'>
                        {/* <button key={index + 'shorter'} className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full" onClick={e => handleUpdateScript(e, index, 'shorter')}>
                            Shorter
                        </button>
                        <button key={index + 'funnier'} className="mt-4 btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full" onClick={e => handleUpdateScript(e, index, 'funnier')}>
                            Funnier
                        </button> */}
                        <UpdateButton callback={handleUpdateScript} text={'shorter'} ind={index} />
                        <div className='ml-4 md:ml-0 md:mt-4'><UpdateButton callback={handleUpdateScript} text={'funnier'} ind={index} /></div>
                    </div>
                </div>
            ))}

            {/* Form */}
            <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                            <button className="btn text-white bg-gradient-to-r from-purple-500 to-purple-700 font-bold hover:bg-blue-700 w-full disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400"
                                disabled={isSubmitting}>
                                {isSubmitting ? 'Generating...' : '⭐️ Generate Audio'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Timer expectedSeconds={60} isSubmitting={isSubmitting} />

        </div>
    );
};

export default function WorkflowStep4() {
    const transcriptData = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('transcripts') : null;
    const transcripts = transcriptData ? JSON.parse(transcriptData) : [];
    const foldername = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('foldername') : '';
    const image_files = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('image_files') || '[]') : [];
    const imageUrls = image_files.map((filename: string) => `/api/jpg?foldername=${foldername}&filename=${filename}`);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <ToastContainer />
            <ProjectProgress currentInd={3} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Edit Script</h1>
            </div>
            <div className="max-w-4xl mx-auto grow" ref={contentRef}>
                <p className='px-6'>
                    These are the scripts generated. Please edit the scripts to your liking.
                </p>
                <br />
                <TranscriptVisualizer transcripts={transcripts} imageUrls={imageUrls} />
            </div>
            <div className="fixed bottom-10 right-10">
                <button
                    onClick={handleOpenModal}
                    className="bg-gradient-to-r from-blue-600  to-purple-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                >
                    Feedback
                </button>

                {showModal && <FeedbackForm onClose={handleCloseModal} />}
            </div>
        </div>
    )
}
