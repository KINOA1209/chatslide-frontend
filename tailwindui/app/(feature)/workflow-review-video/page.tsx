'use client'

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Video from '@/components/Video';
import ProjectProgress from "@/components/steps";
import FeedbackForm from '@/components/slides/feedback';

const VideoVisualizer = ({ videoFile, foldername }: { videoFile: string, foldername: string }) => {
    const router = useRouter();
    const videoSource = `/api/video?foldername=${foldername}&filename=${videoFile}`;
    const topic = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('topic') : '';

    const handleDownload = async () => {
        const response = await fetch(videoSource, {
            method: 'GET',
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${topic}.mp4`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            console.log('Video saved successfully.');
        } else {
            console.error('Failed to save Video.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className='w-fit block m-auto'>
                <Video filename={videoFile} foldername={foldername} />
            </div>
            <div className="max-w-sm mx-auto">
                <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                        <button className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full" onClick={handleDownload}>
                            Download Video
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function WorkflowStep6() {
    const videoFile = typeof sessionStorage !== 'undefined' ? (sessionStorage.getItem('video_file') || "") : "";
    const foldername = typeof sessionStorage !== 'undefined' ? (sessionStorage.getItem('foldername') || "") : "";
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
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Review Video</h1>
            </div>

            <div className="max-w-4xl mx-auto" ref={contentRef}>
                <VideoVisualizer videoFile={videoFile} foldername={foldername} />
            </div>
            
            <ProjectProgress currentInd={5} contentRef={contentRef} />
            <div className="fixed bottom-10 right-10 hidden sm:block">
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
