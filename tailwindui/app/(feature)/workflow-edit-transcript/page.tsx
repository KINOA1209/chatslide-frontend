'use client'

import React, { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Timer from '@/components/Timer';
import GoBackButton from '@/components/GoBackButton';
import ImageList from '@/components/ImageList';
import ProjectProgress from '@/components/steps';

const TranscriptVisualizer = ({ transcripts, imageUrls }: { transcripts: [], imageUrls: [] }) => {
    const [transcriptList, setTranscriptList] = useState<string[]>(transcripts);
    const router = useRouter();

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
            const response = await fetch('/api/generate_audio', {
                method: 'POST',
                headers: {
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

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {transcriptList.map((data, index) => (
                <div tabIndex={index} className='grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 mt-4 rounded border-solid border-2 border-blue-200 focus-within:border-blue-600'>
                    <ImageList urls={[imageUrls[index]]} height={100} />
                    <textarea
                        key={index}
                        className="form-input w-full text-gray-800 mb-2 resize-none h-full border-none p-4"
                        value={data}
                        onChange={(event) => handleChange(index, event)}
                    />
                </div>
            ))}
            
            {/* Form */}
            <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                                {isSubmitting ? 'Generating...' : 'Generate Voice'}
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

    return (
        <div>
            <ProjectProgress currentInd={3} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Step 4: Edit Transcript</h1>
            </div>
            <div className="max-w-4xl mx-auto grow" ref={contentRef}>
                <p className='px-6'>
                    This is the transcripts generated. Please edit the transcripts to your liking.
                </p>
                <br />
                <TranscriptVisualizer transcripts={transcripts} imageUrls={imageUrls} />
            </div>
        </div>
    )
}
