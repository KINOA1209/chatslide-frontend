'use client'

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Video from '@/components/Video';
import GoBackButton from '@/components/GoBackButton';
import ProjectProgress from "@/components/steps";

const VideoVisualizer = ({ videoFile, foldername }: { videoFile: string, foldername: string }) => {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className='w-fit block m-auto'>
                <Video filename={videoFile} foldername={foldername} />
            </div>
        </div>
    );
};

export default function WorkflowStep6() {
    const videoFile = typeof sessionStorage !== 'undefined' ? (sessionStorage.getItem('video_file') || "") : "";
    const foldername = typeof sessionStorage !== 'undefined' ? (sessionStorage.getItem('foldername') || "") : "";
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <ProjectProgress currentInd={5} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Step 6: Review Video</h1>
            </div>

            <div className="max-w-4xl mx-auto" ref={contentRef}>
                <VideoVisualizer videoFile={videoFile} foldername={foldername} />
            </div>
        </div>
    )
}
