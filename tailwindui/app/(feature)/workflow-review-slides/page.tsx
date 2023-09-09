'use client';

import React, { useState, useEffect, useRef } from 'react';
import SaveToPDF from '@/components/forms/saveToPdf';
import TranscriptForm from '@/components/forms/transcriptForm';
import Slides from '@/components/Slides';
import Timer from '@/components/Timer';
import GoBackButton from '@/components/GoBackButton';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectProgress from "@/components/steps";
import FeedbackForm from '@/components/feedback';
import SaveToPPTX from '@/components/forms/saveToPptx';
import BgImagePopup from '@/components/bgImagePopup';
//import SlidesHTML from '@/components/SlidesHTML';
//import SaveToPdfHtml from '@/components/forms/saveToPdfHtml';
import dynamic from 'next/dynamic'

const SlidesHTML = dynamic(
    () => import('@/components/SlidesHTML'),
    { ssr: false }
)

const SaveToPdfHtml = dynamic(
    () => import('@/components/forms/saveToPdfHtml'),
    { ssr: false }
)

interface SlideElement {
    type: 'h1' | 'h2' | 'h3' | 'p' | 'ul'| 'li' | 'br';
    className: 'head'|'title'|'subtopic'|'content';
    content: string | string[];
}

interface Slide {
    elements: SlideElement[];
}

type SlidesHTMLProps = {
    finalSlides: Slide[]; 
    setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>; 
};

const SlideVisualizer = ({ slide_files }: { slide_files: any }) => {
    console.log(slide_files);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const [finalSlides, setFinalSlides] = useState<Slide[]>([]);

    const handlePopupOpen = () => {
        setShowPopup(true);
    };
    
    const handlePopupClose = () => {
        setShowPopup(false);
    };

    // Get language from session storage
    const language = typeof window !== 'undefined' ? sessionStorage.getItem("language") : null;

    useEffect(() => {
        console.log("Language:", language);
    }, [language]);

    useEffect(() => {
        const signed_in = typeof window !== 'undefined' ? sessionStorage.getItem("signed_in") : 'false';
        console.log("signed_in", signed_in);
        if (signed_in && signed_in === "true") {
            toast.success("Sign in successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            sessionStorage.removeItem("signed_in");
        }
    });

    return (
        <div>
            <ToastContainer />
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                <SlidesHTML finalSlides={finalSlides}  setFinalSlides={setFinalSlides} />

                <SaveToPdfHtml finalSlides={finalSlides}/>
                {/*{language === "English" && <SaveToPPTX />}*/}

                {/*<div className="max-w-sm mx-auto">
                    <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                        <button
                            onClick={handlePopupOpen}
                            className="btn text-blue-600 bg-gray-100 hover:bg-gray-200 w-full border border-blue-600"
                        >
                            Add Slides Background
                        </button>
                        {showPopup && <BgImagePopup onClose={handlePopupClose} />}
                        </div>
                    </div>
            </div>*/}

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

export default function WorkflowStep3() {
    const slide_files = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('slide_files') : [];
    const contentRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    // State variable to track whether the timer has finished
    const [timerFinished, setTimerFinished] = useState(false);

    // Timer completion handler
    const handleTimerCompletion = () => {
        setTimerFinished(true);
    };

    // Start the timer when the component mounts
    useEffect(() => {
        const timer = setTimeout(handleTimerCompletion, 30000); // 30 seconds

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Check if the timer has finished before opening the modal
    useEffect(() => {
        if (timerFinished) {
            handleOpenModal();
        }
    }, [timerFinished]);

    return (
        <div>
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Review Slides</h1>
            </div>

            <div className="max-w-4xl mx-auto px-6" ref={contentRef}>
                <p className='px-6'>
                    These are the slides generated.
                </p>
                <br />
                <SlideVisualizer slide_files={slide_files} />
            </div>
            
            <ProjectProgress currentInd={2} contentRef={contentRef} />
            <div className="fixed bottom-10 right-10">
                <button
                onClick={handleOpenModal}
                className="bg-gradient-to-r from-blue-600  to-purple-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                >
                Feedback
                </button>

                {showModal && <FeedbackForm onClose={handleCloseModal} />}
            </div>
        </div>
    );
};
