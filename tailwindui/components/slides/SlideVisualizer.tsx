import React, { useState, useEffect, useRef } from 'react';
import TranscriptForm from '@/components/forms/transcriptForm';
import Timer from '@/components/ui/Timer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SlideElement, Slide } from '@/components/SlidesHTML';
import dynamic from 'next/dynamic'


const SlidesHTML = dynamic(() => import('@/components/SlidesHTML'), { ssr: false });

const SlideVisualizer = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const [finalSlides, setFinalSlides] = useState<Slide[]>([]);

    return (
        <div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                <SlidesHTML finalSlides={finalSlides} setFinalSlides={setFinalSlides}/>

                {/* Form */}
                <TranscriptForm
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    finalSlides={finalSlides}
                />

                {/* Timer */}
                <Timer expectedSeconds={60} isSubmitting={isSubmitting} />
            </div>

        </div>
    );
};

export default SlideVisualizer;