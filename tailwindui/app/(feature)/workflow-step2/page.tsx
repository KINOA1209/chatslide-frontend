'use client'

import React, { useState, useEffect } from 'react';
import OutlineFrom from '@/components/outline-form'
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import Timer from '@/components/Timer';


const OutlineVisualizer = ({ outline }: { outline: any }) => {
    const router = useRouter();
    console.log(outline);
    const [outlineData, setOutlineData] = useState(outline);

    console.log(outlineData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, sectionIndex: string, detailIndex: number, key: string) => {
        const { value } = e.target;
        setOutlineData((prevOutlineData: any) => {
            const updatedOutlineData = JSON.parse(JSON.stringify(prevOutlineData));
            updatedOutlineData[sectionIndex]['content'][detailIndex] = value;
            return updatedOutlineData;
        });
    };

    const [isSubmitting, setIsSubmitting] = useState(false);    const [timer, setTimer] = useState(0);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("submitting");
        event.preventDefault();

        setIsSubmitting(true);
        setTimer(0);

        const audience = typeof window !== 'undefined' ? localStorage.getItem('audience') : null;
        const foldername = typeof window !== 'undefined' ? localStorage.getItem('foldername') : null;
        const topic = typeof window !== 'undefined' ? localStorage.getItem('topic') : null;
        const language = typeof window !== 'undefined' ? localStorage.getItem('language') : null;

        const formData = {
            res: outlineData,
            audience: audience,
            foldername: foldername,
            topic: topic,
            language: language,
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

            //           console.log(formData);
            //           console.log(response);

            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
                setIsSubmitting(false);
                // Store the data in local storage
                console.log(resp.data);
                localStorage.setItem('image_files', JSON.stringify(resp.data.image_files));
                localStorage.setItem('pdf_file', resp.data.pdf_file);

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
                        <h1 className="h1">Step 2: Edit Guidelines</h1>
                    </div>

                    <p>
                        This is the outline generated. You can edit the details below.
                    </p>
                    <br/>
                    
                    {outlineData && Object.keys(outlineData).map((sectionIndex) => (
                        <div key={sectionIndex} className="mb-8">
                            <h3 className="text-xl font-bold">
                                {parseInt(sectionIndex)}: {outlineData[sectionIndex].title}
                            </h3>
                            <div className="mt-4">
                                {outlineData[sectionIndex].content.map((detail: any, detailIndex: number) => (
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
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                                        {isSubmitting ? 'Generating...' : 'Generate Slides'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Timer */}
                    <Timer expectedSeconds={30} isSubmitting={isSubmitting} />

                </div>
            </div>
        </section>
    );
};

const App = () => {
    const storedOutline = typeof localStorage !== 'undefined' ? localStorage.getItem('outline') : null;
    const outline = storedOutline ? JSON.parse(storedOutline) : null;
    const outlineRes = outline ? JSON.parse(outline.res) : null;

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <OutlineVisualizer outline={outlineRes} />
        </div>
    );
};

export default App;
