'use client'

import React, {useState, useEffect, FormEvent} from 'react';
import { useRouter } from 'next/navigation';

const TranscriptVisualizer = ({transcript}: { transcript: any }) => {
  const [transcriptData, setTranscriptData] = useState(transcript);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, sectionIndex: string, detailIndex: number, key: string) => {
    const {value} = e.target;
    setTranscriptData((prevOutlineData: any) => {
        const updatedOutlineData = JSON.parse(JSON.stringify(prevOutlineData));
        updatedOutlineData[sectionIndex]['content'][detailIndex] = value;
        return updatedOutlineData;
    });
  };

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
    localStorage.setItem('transcript', JSON.stringify(transcriptData));

    setIsSubmitting(true);
    setTimer(0);

    const foldername = typeof window !== 'undefined' ? localStorage.getItem('foldername') : null;

    const formData = {
        res: transcriptData,
        foldername: foldername,
    };

    console.log(formData);

    try {
      const response = await fetch('/api/generate_audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const resp = await response.json();
        console.log(resp);
        setIsSubmitting(false);
        // Store the data in local storage
        console.log(resp.data);
        localStorage.setItem('audio_files', JSON.stringify(resp.data.res));

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
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

        {/* Page header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Step 4: Edit Transcript</h1>
        </div>

        {transcriptData && Object.keys(transcriptData).map((sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
                <h3 className="text-xl font-bold">
                    Section {parseInt(sectionIndex)}: {transcriptData[sectionIndex].title}
                </h3>
                <div className="mt-4">
                    {transcriptData[sectionIndex].content.map((detail: any, detailIndex: number) => (
                        <input
                            key={detailIndex}
                            className="form-input w-full text-gray-800 mb-2"
                            value={detail}
                            onChange={(e) => handleChange(e, sectionIndex, detailIndex, 'content')}
                            placeholder={`Detail ${detailIndex}`}
                        />
                    ))}
                </div>
            </div>
        ))}

        {/* Form */}
        <div className="max-w-sm mx-auto">
            {/* todo */}
        </div>

        </div>
    </div>
    </section>
  );
};

export default function WorkflowStep4() {
  const transcriptData = typeof localStorage !== 'undefined' ? localStorage.getItem('transcript') : null;

}
    