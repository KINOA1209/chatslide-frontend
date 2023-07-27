'use client'

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import Timer from '@/components/Timer';
import GoBackButton from '@/components/GoBackButton';
import ProjectProgress from "@/components/steps";
import AuthService from '@/components/utils/AuthService';

const OutlineVisualizer = ({ outline }: { outline: any }) => {
    const router = useRouter();
    const [outlineData, setOutlineData] = useState(outline);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, sectionIndex: string, detailIndex: number, key: string) => {
        const { value } = e.target;
        setOutlineData((prevOutlineData: any) => {
            const updatedOutlineData = JSON.parse(JSON.stringify(prevOutlineData));
            updatedOutlineData[sectionIndex]['content'][detailIndex] = value;
            let entireOutline = JSON.parse(sessionStorage.outline);
            entireOutline.res = JSON.stringify(updatedOutlineData);
            sessionStorage.setItem('outline', JSON.stringify(entireOutline));
            return updatedOutlineData;
        });
    };

    const [isSubmitting, setIsSubmitting] = useState(false); const [timer, setTimer] = useState(0);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("submitting");
        event.preventDefault();

        setIsSubmitting(true);
        setTimer(0);

        const audience = typeof window !== 'undefined' ? sessionStorage.getItem('audience') : null;
        const foldername = typeof window !== 'undefined' ? sessionStorage.getItem('foldername') : null;
        const topic = typeof window !== 'undefined' ? sessionStorage.getItem('topic') : null;
        const language = typeof window !== 'undefined' ? sessionStorage.getItem('language') : 'English';
        const project_id = typeof window !== 'undefined' ? sessionStorage.getItem('project_id') : null;

        const formData = {
            res: JSON.stringify(outlineData),
            audience: audience,
            foldername: foldername,
            topic: topic,
            language: language,
            additional_requirements: 'test',
            project_id: project_id
        };

        console.log(formData);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch('/api/generate_slides', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
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
                sessionStorage.setItem('image_files', JSON.stringify(resp.data.image_files));
                sessionStorage.setItem('pdf_file', resp.data.pdf_file);
                sessionStorage.setItem('page_count', resp.data.page_count);

                // Redirect to a new page with the data
                router.push('workflow-review-slides');
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
        <div>
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
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                        <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                            {isSubmitting ? 'Generating...' : 'Generate Slides'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Timer */}
            <Timer expectedSeconds={60} isSubmitting={isSubmitting} />
        </div>
    );
};

export default function WorkflowStep2() {
    const storedOutline = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('outline') : null;
    const outline = storedOutline ? JSON.parse(storedOutline) : null;
    const outlineRes = outline ? JSON.parse(outline.res) : null;
    const contentRef = useRef<HTMLDivElement>(null);
    return (
        <div>
            <ProjectProgress currentInd={1} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Step 2: Edit Outlines</h1>
            </div>
            <div className="max-w-4xl mx-auto px-6" ref={contentRef}>
                <p className='px-6'>
                    This is the outline generated. You can edit the details below.
                </p>
                <br />
                <OutlineVisualizer outline={outlineRes} />
            </div>
        </div>
    );
};
