'use client';

import React, { useState, useEffect } from 'react';
import SaveToPDF from '@/components/forms/SaveToPdf';
import TranscriptForm from '@/components/forms/TranscriptForm';
import Slides from '@/components/Slides';
import Timer from '@/components/Timer';
import GoBackButton from '@/components/GoBackButton';


const SlideVisualizer = ({ slide_files }: { slide_files: any }) => {
    console.log(slide_files);
    const [isSubmitting, setIsSubmitting] = useState(false);

    
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


                    <SaveToPDF />

                    {/* Form */}
                    <TranscriptForm 
                        isSubmitting={isSubmitting} 
                        setIsSubmitting={setIsSubmitting}
                    />

                    {/* Timer */}
                    <Timer expectedSeconds={60} isSubmitting={isSubmitting} />

                </div>
            </div>
        </section>
    );
};

const App = () => {
    const slide_files = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('slide_files') : [];

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <SlideVisualizer slide_files={slide_files} />
        </div>
    );
};

export default App;
