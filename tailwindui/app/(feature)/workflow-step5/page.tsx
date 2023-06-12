'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Timer from '@/components/Timer';
import Slides from '@/components/Slides';
import Audio from '@/components/Audio';

const TranscriptAudioVisualizer = ({ transcripts, audioFiles, foldername }: { transcripts: [], audioFiles: [], foldername: string }) => {
    const [transcriptList, setTranscriptList] = useState<string[]>(transcripts);
    const router = useRouter();

    const handleChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newData = [...transcriptList]; // copying the old datas array
        newData[index] = event.target.value; // replace e.target.value with whatever you want to change it to
        setTranscriptList(newData); // use the copy to set the state            
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("submitting");
        event.preventDefault();
        localStorage.setItem('transcripts', JSON.stringify(transcriptList));

        setIsSubmitting(true);

        const foldername = typeof window !== 'undefined' ? localStorage.getItem('foldername') : null;
        const image_files = typeof localStorage !== 'undefined' ?  JSON.parse(localStorage.getItem('image_files') || '') : [];

        const formData = {
            img_filenames: image_files,
            voice_filenames: audioFiles,
            foldername: foldername,
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
                localStorage.setItem('video_file', resp.data);

                // Redirect to a new page with the data
                router.push('workflow-step6');
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
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">Step 5: Review Audio</h1>
                    </div>

                    <p>
                        This is the voices generated. If you want to change the transcript, you can edit in the previous step.
                    </p>
                    <br/>

                    <div className="flex">
                        <div className="w-2/5">
                            <Slides />
                        </div>
                        <div className="w-2/5 mt-4">
                            {transcriptList.map((data, index) => (
                                <div className="h-80 p-4">
                                    <textarea
                                        key={index}
                                        className="form-input w-full text-gray-800 mb-2 resize-none h-full"
                                        value={data}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="w-1/5 mt-4">
                            {audioFiles.map((data, index) => (
                                <div className="h-80 p-4">
                                    <Audio filename={data} foldername={foldername} />
                                </div>
                            ))}
                        </div>
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
            </div>
        </section>
    );
};

export default function WorkflowStep5() {
    const transcriptData = typeof localStorage !== 'undefined' ? localStorage.getItem('transcripts') : null;
    const transcripts = transcriptData ? JSON.parse(transcriptData) : [];

    const audioData = typeof localStorage !== 'undefined' ? localStorage.getItem('audio_files') : null;
    const audioFiles = audioData ? JSON.parse(audioData) : [];
    const foldername = typeof localStorage !== 'undefined' ? (localStorage.getItem('foldername') || "") : "";

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <TranscriptAudioVisualizer transcripts={transcripts} audioFiles={audioFiles} foldername={foldername} />
        </div>)
}
