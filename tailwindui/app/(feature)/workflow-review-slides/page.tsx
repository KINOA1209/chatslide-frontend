'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { FormEvent } from 'react';
import SaveToPDF from '@/components/forms/SaveToPdf';
import Slides from '@/components/Slides';
import Timer from '@/components/Timer';

const SlideVisualizer = ({ slide_files }: { slide_files: any }) => {
    console.log(slide_files);

    const [accessToken, setAccessToken] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setAccessToken(token);
      } else {
        setAccessToken("");
      }
    }, [pathname]);

    const handleSubmitTranscript = async (event: FormEvent<HTMLFormElement>) => {
        console.log("submitting");
        event.preventDefault();

        if (accessToken === "") {
            router.push("/signin");
            return;
        }

        setIsSubmitting(true);

        const latex_filename = 'final_latex.tex';
        const foldername = typeof localStorage !== 'undefined' ? localStorage.getItem('foldername') : null;
        const topic = typeof localStorage !== 'undefined' ? localStorage.getItem('topic') : null;
        const language = typeof window !== 'undefined' ? localStorage.getItem('language') : 'English';

        const formData = {
            latex_filename: latex_filename,
            foldername: foldername,
            topic: topic,
            language: language,
        };

        console.log(formData);

        try {
            const response = await fetch('/api/transcript', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log(response);

            if (response.ok) {
                const resp = await response.json();
                setIsSubmitting(false);
                // Store the data in local storage
                console.log(resp.data.res);
                localStorage.setItem('transcripts', JSON.stringify(resp.data.res));
                // Redirect to a new page with the data

                router.push('workflow-edit-transcript');
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
                <div className="max-w-3xl mx-auto mt-8">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">Step 3: Review Slides</h1>
                    </div>

                    <p>
                        This is the slides generated.
                    </p>
                    <br />
                    {accessToken === "" && (<p>To download PDF or continue to generate transcript, please {" "}
                        <Link
                            href="/signin?next=workflow-review-slides"
                            className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                        >
                            sign in
                        </Link>.</p>)}

                    <Slides height={160} />

                    <SaveToPDF disabled={ accessToken === "" } />

                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        <form onSubmit={handleSubmitTranscript}>
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                                        {isSubmitting ? 'Generating...' : 'Generate Transcript'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

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
