'use client';

import React, { useState, useEffect } from 'react';
import OutlineFrom from '@/components/outline-form'
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import SaveToPDF from '@/components/forms/SaveToPdf';
import Slides from '@/components/slides';


const SlideVisualizer = ({ slide_files }: { slide_files: any }) => {
  console.log(slide_files);
  // const [backendResponse, setBackendResponse] = useState(slide);

  //
  //     const handleChange = (e: React.ChangeEvent<HTMLInputElement>, sectionIndex: string, detailIndex: number, key: string) => {
  //         const {value} = e.target;
  //         setOutlineData((prevOutlineData: any) => {
  //             const updatedOutlineData = JSON.parse(JSON.stringify(prevOutlineData));
  //             updatedOutlineData[sectionIndex]['content'][detailIndex] = value;
  //             return updatedOutlineData;
  //         });
  //     };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log("submitting");
    event.preventDefault();

    setIsSubmitting(true);
    setTimer(0);

    const formData = {
      // res: outline,
      audience: localStorage.getItem('audience'),
      foldername: localStorage.getItem('foldername'),
      topic: localStorage.getItem('topic'),
      additional_requirements: 'test',
    };

    console.log(formData);

    try {
      const response = await fetch('/api/generate_slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log(formData);
      console.log(response);

      if (response.ok) {
        const resp = await response.json();
        const router = useRouter();
        setIsSubmitting(false);
        // Store the data in local storage

        // Redirect to a new page with the data
        router.push('workflow-step3');
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

        </div>
      </div>
    </section>
  );
};

const App = () => {
  const slide_files = localStorage.getItem('slide_files');

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <SlideVisualizer slide_files={slide_files} />
    </div>
  );
};

export default App;
