'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Timer from './Timer';

const TopicForm: React.FC = () => {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const project_id = localStorage.getItem('project_id') || '';

        setIsSubmitting(true);

        const formData = {
            topic: (event.target as HTMLFormElement).topic.value,
            requirements: (event.target as HTMLFormElement).requirements.value,
            audience: (event.target as HTMLFormElement).audience.value,
            language: (event.target as HTMLFormElement).language.value,
            project_id: project_id,
        };

        localStorage.clear();
        localStorage.setItem('topic', formData.topic);
        localStorage.setItem('requirements', formData.requirements);
        localStorage.setItem('audience', formData.audience);
        localStorage.setItem('language', formData.language);

        console.log("created form data");

        try {
            const response = await fetch('/api/guidelines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log(formData);
            console.log(response);

            if (response.ok) {
                const outlinesJson = await response.json();
                setIsSubmitting(false);
                // Handle the response data here
                console.log(outlinesJson);
                console.log(outlinesJson.data.audience);
                console.log(outlinesJson.data.requirements);
                console.log(outlinesJson.data.topic);
                console.log(outlinesJson.data.res);
                console.log(outlinesJson.data.foldername);


                // cookies doesn't work because it needs 'use server'
                // cookies().set("topic", outlinesJson.data.audience);

                // Store the data in local storage
                localStorage.setItem('outline', JSON.stringify(outlinesJson.data));
                localStorage.setItem('foldername', outlinesJson.data.foldername);
                localStorage.setItem('project_id', outlinesJson.data.project_id);

                // Redirect to a new page with the data
                router.push('workflow-edit-outlines');
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
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <p>
                        Please specify the topic you want to learn, and indicate the audience and their prior knowledge.
                    </p>
                    <br />
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="topic">
                        Specific Topic<span className="text-red-600">*</span>
                    </label>
                    <input
                        id="topic"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="P/E Ratio"
                        required />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="audience">
                        Audience: <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="audience"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Econ students"
                        required
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="requirements">
                        Prior Knowledge: <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="requirements"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Basic economics"
                        required
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="language">
                        Language: <span className="text-red-600">*</span>
                    </label>
                    <select
                        id="language"
                        className="form-input w-full text-gray-800"
                        required
                    >
                        <option value="English">English</option>
                        <option value="Chinese">中文</option>
                        <option value="Spanish">Español</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                    <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        type="submit">
                        {isSubmitting ? "Generating..." : "Generate outline"}
                    </button>
                </div>
            </div>

            {/* Timer */}
            <Timer expectedSeconds={15} isSubmitting={isSubmitting} />


        </form>
    );
};

export default TopicForm;