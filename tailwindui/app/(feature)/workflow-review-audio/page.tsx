'use client'

import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Timer from '@/components/Timer';
import Audio from '@/components/Audio';
import GoBackButton from '@/components/GoBackButton';
import ImageList from '@/components/ImageList';
import ProjectProgress from "@/components/steps";
import AuthService from '@/components/utils/AuthService';
import FeedbackForm from '@/components/feedback';

const TranscriptAudioVisualizer = ({ transcripts, audioFiles, foldername, imageUrls }: { transcripts: [], audioFiles: [], foldername: string, imageUrls: [] }) => {
    const [transcriptList, setTranscriptList] = useState<string[]>(transcripts);
    const router = useRouter();
    const [hasSlides, setHasSlides] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const slidesFlag = sessionStorage.getItem('has_slides');
            if (slidesFlag === 'true') {
                setHasSlides(true);
            }
        }
    }, []);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newData = [...transcriptList]; // copying the old datas array
        newData[index] = event.target.value; // replace e.target.value with whatever you want to change it to
        setTranscriptList(newData); // use the copy to set the state
        sessionStorage.setItem('transcripts', JSON.stringify(newData));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("submitting");
        event.preventDefault();
        sessionStorage.setItem('transcripts', JSON.stringify(transcriptList));

        setIsSubmitting(true);

        const foldername = typeof window !== 'undefined' ? sessionStorage.getItem('foldername') : null;
        const image_files = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('image_files') || '') : [];
        const language = typeof window !== 'undefined' ? sessionStorage.getItem('language') : 'English';

        const formData = {
            img_filenames: image_files,
            voice_filenames: audioFiles,
            foldername: foldername,
            language: language,
        };

        console.log(formData);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch('/api/generate_video', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const resp = await response.json();
                setIsSubmitting(false);
                // Store the data in local storage
                console.log(resp.data);
                sessionStorage.setItem('video_file', resp.data);

                // Redirect to a new page with the data
                router.push('workflow-review-video');
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

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
            {transcriptList.map((data, index) => (

                <div tabIndex={index} className='w-full flex flex-col md:flex-row rounded border-solid border-2 border-blue-200 mt-4 focus-within:border-blue-600'>
                    <div className={`grid ${hasSlides ? 'grid-rows-2' : 'grid-rows-1'} md:grid-rows-1 md:${hasSlides ? 'grid-cols-2' : 'grid-cols-1'} grow`}>
                        {hasSlides && <ImageList urls={[imageUrls[index]]} height={100} />}
                        <textarea
                            key={index}
                            className={`${!hasSlides && 'h-80'} block form-input w-full text-gray-800 mb-2 resize-none border-none p-4`}
                            value={data}
                            onChange={(event) => handleChange(index, event)}
                            readOnly
                        />
                    </div>
                    <div className='md:w-28 flex flex-row items-center px-1.5 py-2 md:flex-col shrink-0'>
                        {index < audioFiles.length &&
                            <Audio filename={audioFiles[index]} foldername={foldername} />
                        }
                    </div>
                </div>
            ))}

            {/* Form */}
            <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                                Combine to Video
                            </button>
                        </div>
                    </div>
                </form>

            </div>

            <Timer expectedSeconds={60} isSubmitting={isSubmitting} />
        </div>
    );
};

export default function WorkflowStep5() {
    const transcriptData = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('transcripts') : null;
    const transcripts = transcriptData ? JSON.parse(transcriptData) : [];
    const foldername = typeof sessionStorage !== 'undefined' ? (sessionStorage.getItem('foldername') || '') : '';
    const image_files = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('image_files') || '[]') : [];
    const imageUrls = image_files.map((filename: string) => `/api/jpg?foldername=${foldername}&filename=${filename}`);
    const audioData = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('audio_files') : null;
    const audioFiles = audioData ? JSON.parse(audioData) : [];
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
            <ProjectProgress currentInd={4} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Step 5: Review Audio</h1>
            </div>

            <div className="max-w-4xl mx-auto" ref={contentRef}>
                <p className='px-6'>
                    This is the voices generated. If you want to change the transcript, you can edit in the previous step.
                    You get the voice generation of the first four slides for free!
                </p>
                <br />
                <TranscriptAudioVisualizer transcripts={transcripts} audioFiles={audioFiles} foldername={foldername} imageUrls={imageUrls} />
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
    )
}
