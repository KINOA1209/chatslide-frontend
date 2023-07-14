'use client';

import React, { useState, useEffect, useRef } from 'react';
import SaveToPDF from '@/components/forms/SaveToPdf';
import TranscriptForm from '@/components/forms/TranscriptForm';
import Slides from '@/components/Slides';
import Timer from '@/components/Timer';
import GoBackButton from '@/components/GoBackButton';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectProgress from "@/components/steps";

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
                <div className='block lg:hidden'>
                    <GoBackButton />
                </div>


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
    );
};

export default function WorkflowStep3() {
    const slide_files = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('slide_files') : [];
    const contentRef = useRef<HTMLDivElement>(null);
    return (
        <div>
            <ProjectProgress currentInd={2} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Step 3: Review Slides</h1>
            </div>

            <div className="max-w-4xl mx-auto px-6" ref={contentRef}>
                <p className='px-6'>
                    This is the slides generated.
                </p>
                <br />
                <SlideVisualizer slide_files={slide_files} />
            </div>
        </div>
    );
};
