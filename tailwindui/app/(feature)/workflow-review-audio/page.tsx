'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Timer from '@/components/Timer';
import Audio from '@/components/Audio';
import GoBackButton from '@/components/GoBackButton';
import ImageList from '@/components/ImageList';


const TranscriptAudioVisualizer = ({ transcripts, audioFiles, foldername, imageUrls }: { transcripts: [], audioFiles: [], foldername: string, imageUrls: [] }) => {
    const [transcriptList, setTranscriptList] = useState<string[]>(transcripts);
    const router = useRouter();

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
            const response = await fetch('/api/generate_video', {
                method: 'POST',
                headers: {
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {transcriptList.map((data, index) => (
                <div className='flex flex-col md:flex-row rounded border-solid border-2 border-blue-200 mt-4'>
                    <div className='grid grid-rows-2 md:grid-rows-1 md:grid-cols-2'>
                        <ImageList urls={[imageUrls[index]]} height={100} />
                        <textarea
                            key={index}
                            className="form-input w-full text-gray-800 mb-2 resize-none h-full border-none p-4"
                            value={data}
                            onChange={(event) => handleChange(index, event)}
                            readOnly
                        />
                    </div>
                    <div className='w-48 flex flex-row items-center px-1.5 py-2 md:flex-col'>
                        {index < audioFiles.length &&
                            <Audio filename={audioFiles[index]} foldername={foldername} />
                        }
                    </div>
                </div>
            ))}

            <div className='block md:hidden'>
                <GoBackButton />
            </div>

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
    const foldername = typeof sessionStorage !== 'undefined' ? (sessionStorage.getItem('foldername') || ''): '';
    const image_files = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('image_files') || '[]') : [];
    const imageUrls = image_files.map((filename: string) => `/api/jpg?foldername=${foldername}&filename=${filename}`);
    const audioData = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('audio_files') : null;
    const audioFiles = audioData ? JSON.parse(audioData) : [];

    return (
        <div>
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Step 5: Review Audio</h1>
            </div>

            <div className="max-w-6xl mx-auto">
                <p>
                    This is the voices generated. If you want to change the transcript, you can edit in the previous step.
                    You get the voice generation of the first four slides for free!
                </p>
                <br />
                <TranscriptAudioVisualizer transcripts={transcripts} audioFiles={audioFiles} foldername={foldername} imageUrls={imageUrls} />
            </div>
        </div>
    )
}
