'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SaveToPDF from '@/components/forms/SaveToPdf';
import TranscriptForm from '@/components/forms/TranscriptForm';
import Slides from '@/components/Slides';
import Timer from '@/components/Timer';
import GoBackButton from '@/components/GoBackButton';


const SlideVisualizer = ({ slide_files }: { slide_files: any }) => {
    console.log(slide_files);

    const [accessToken, setAccessToken] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setAccessToken(token);
      } else {
        setAccessToken("");
      }
    }, [pathname]);

    

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="max-w-3xl mx-auto mt-8">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">Step 3: Review Slides</h1>
                    </div>

                    <p>
                        This is the slides generated.
                    </p>
                    <br />

                    <Slides height={160} />


                    <GoBackButton />


                    <SaveToPDF accessToken={accessToken} setAccessToken={setAccessToken} />

                    {/* Form */}
                    <TranscriptForm 
                        isSubmitting={isSubmitting} 
                        setIsSubmitting={setIsSubmitting} 
                        accessToken={accessToken} 
                        setAccessToken={setAccessToken} 
                    />

                    {/* Timer */}
                    <Timer expectedSeconds={60} isSubmitting={isSubmitting} />

                </div>
            </div>
        </section>
    );
};

const App = () => {
    const slide_files = typeof localStorage !== 'undefined' ? localStorage.getItem('slide_files') : [];

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <SlideVisualizer slide_files={slide_files} />
        </div>
    );
};

export default App;
