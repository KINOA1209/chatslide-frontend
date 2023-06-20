'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Video from '@/components/Video';
import GoBackButton from '@/components/GoBackButton';

const VideoVisualizer = ({ videoFile, foldername }: { videoFile: string, foldername: string }) => {
    const router = useRouter();

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">Step 6: Review Video</h1>
                    </div>

                    <Video filename={videoFile} foldername={foldername} />


                    <GoBackButton />


                </div>
            </div>
        </section>
    );
};

export default function WorkflowStep6() {
    const videoFile = typeof localStorage !== 'undefined' ? (localStorage.getItem('video_file') || "") : "";
    const foldername = typeof localStorage !== 'undefined' ? (localStorage.getItem('foldername') || "") : "";

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <VideoVisualizer videoFile={videoFile} foldername={foldername} />
        </div>)
}
