'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import SaveToPDF from '@/components/forms/SaveToPdf';
import Slides from '@/components/Slides';


const SlideVisualizer = ({ slide_files }: { slide_files: any }) => {
  console.log(slide_files);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);
  const router = useRouter();  

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSubmitting) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1); // Increment the timer
      }, 1000); // Increment every second
    }

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [isSubmitting]);

  const handleSubmitTranscript = async (event: FormEvent<HTMLFormElement>) => {
    console.log("submitting");
    event.preventDefault();

    setIsSubmitting(true);
    setTimer(0);

    const latex_filename = 'final_latex.tex';
    const foldername = typeof localStorage !== 'undefined' ? localStorage.getItem('foldername') : null;
    const topic = typeof localStorage !== 'undefined' ? localStorage.getItem('topic') : null;

    const formData = {
      latex_filename: latex_filename,
      foldername: foldername,
      topic: topic,
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
        localStorage.setItem('transcript', resp.data.res);
        console.log(resp.data.res);
        // Redirect to a new page with the data
        
        router.push('workflow-step4');
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
          <div>
            <Slides />
          </div>

          {/* Form */}
          {/* <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Generate Slides
                  </button>
                </div>
              </div>
            </form>
          </div> */}

          <SaveToPDF />

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmitTranscript}>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                    Continue to Transcript
                  </button>
                </div>
              </div>
            </form>
          </div>

          {isSubmitting && (
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500">
                This usually takes 15 seconds. Time elapsed: {timer} seconds
              </span>
            </div>
          )}

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
