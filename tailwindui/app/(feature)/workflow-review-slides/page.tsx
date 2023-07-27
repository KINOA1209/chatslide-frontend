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

const SlideVisualizer = ({ slide_files }: { slide_files: any }) => {
    console.log(slide_files);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    if (typeof window !== "undefined") {
        var signed_in = sessionStorage.getItem("signed_in");
    }

    useEffect(() => {
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

                <Slides height={160} />


                <SaveToPDF />
                <SaveToPPTX />

                {/* Form */}
                <TranscriptForm
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
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
        const timer = setTimeout(handleTimerCompletion, 10000); // 10 seconds

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
            <ProjectProgress currentInd={2} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Step 3: Review Slides</h1>
            </div>

            <div className="max-w-4xl mx-auto px-6" ref={contentRef}>
                <p className='px-6'>
                    These are the slides generated.
                </p>
                <br />
                <SlideVisualizer slide_files={slide_files} />
            </div>
            <div className="fixed bottom-10 right-10">
                <button
                onClick={handleOpenModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                >
                Feedback
                </button>

                {showModal && <FeedbackForm onClose={handleCloseModal} />}
            </div>
        </div>
    );
};
