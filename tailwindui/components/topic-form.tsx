'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from "./utils/AuthService";
import UserService from "./utils/UserService";
import {FileUploadButton} from './fileUpload';
import Timer from './Timer';

interface Project {
    topic: string;
    audience: string;
}


const TopicForm: React.FC = () => {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    // bind form data between input and sessionStorage
    const [topic, setTopic] = useState((typeof window !== 'undefined' && sessionStorage.topic != undefined) ? sessionStorage.topic : '');
    const [audience, setAudience] = useState((typeof window !== 'undefined' && sessionStorage.audience != undefined) ? sessionStorage.audience : 'High school students');
    const [language, setLanguage] = useState((typeof window !== 'undefined' && sessionStorage.language != undefined) ? sessionStorage.language : 'English');
    const [addEquations, setAddEquations] = useState(
        typeof window !== 'undefined' && sessionStorage.addEquations != undefined
          ? JSON.parse(sessionStorage.addEquations)
          : false
      );
    const [topicSuggestions, setTopicSuggestions] = useState<string[]>([]);
    const [audienceSuggestions, setAudienceSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            if (userId) {
                const data = await UserService.getUserHistoricalInput(idToken)
                if(data){
                    //to avoid duplicates, however do not check for cases
                    const uniqueTopics = new Set(data.map((project: Project) => project.topic));
                    const uniqueAudiences = new Set(data.map((project: Project) => project.audience));

                    setTopicSuggestions(Array.from(uniqueTopics) as string[]);
                    setAudienceSuggestions(Array.from(uniqueAudiences) as string[]); 
                }
            }
        };
        fetchHistoricalData();
    }, []);

    const handleTopicSuggestionClick = (topic: string, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTopic(topic);
    };

    const handleAudienceSuggestionClick = (audience: string, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAudience(audience);
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const project_id = (typeof window !== 'undefined' && sessionStorage.project_id != undefined) ? sessionStorage.project_id : '';

        setIsSubmitting(true);

        const formData = {
            topic: (event.target as HTMLFormElement).topic.value,
            audience: (event.target as HTMLFormElement).audience.value,
            language: (event.target as HTMLFormElement).language.value,
            addEquations: addEquations,
            project_id: project_id,
        };

        sessionStorage.setItem('topic', formData.topic);
        sessionStorage.setItem('audience', formData.audience);
        sessionStorage.setItem('language', formData.language);
        sessionStorage.setItem('addEquations', formData.addEquations);

        console.log("created form data");

        try {
            const response = await fetch('/api/outlines', {
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
                console.log(outlinesJson.data.topic);
                console.log(outlinesJson.data.res);
                console.log(outlinesJson.data.foldername);


                // cookies doesn't work because it needs 'use server'
                // cookies().set("topic", outlinesJson.data.audience);

                // Store the data in session storage
                sessionStorage.setItem('outline', JSON.stringify(outlinesJson.data));
                sessionStorage.setItem('foldername', outlinesJson.data.foldername);
                sessionStorage.setItem('project_id', outlinesJson.data.project_id);

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

    const onFileSelected = async (file: File | null) => {
        console.log("will upload file", file);
        if (file == null) {
            alert("Please select non-null file");
            return;
        }
        console.log("file name: ", file.name)

        const body = new FormData();
        body.append("file", file);

        const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        
        const response = await fetch("/api/upload_user_file", {
            method: "POST",
            headers: headers,
            body: body
        });

        if (response.ok) {
            alert("File upload successful!");
            const data = await response.json();
            console.log("data: ", data);
            sessionStorage.setItem('pdf_file_name', file.name);
        } else {
            console.log(response);
            alert("File upload failed!" + response.status);
        }
    }


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
                        className="form-input w-full text-gray-800 mb-2"
                        placeholder="P/E Ratio"
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        required />
                    {topicSuggestions.length > 0 && (
                    <div>
                        <div className="flex flex-wrap gap-3 mb-4">
                            {topicSuggestions.map((topic, index) => (
                            <button
                                key={index}
                                className="text-sm text-gray-800 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-sm cursor-pointer"
                                onClick={(event) => handleTopicSuggestionClick(topic, event)}
                            >
                                {topic}
                            </button>
                            ))}
                        </div>
                    </div>
                    )}
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
                        className="form-input w-full text-gray-800 mb-2"
                        placeholder="High school students"
                        value={audience}
                        onChange={e => setAudience(e.target.value)}
                        required
                    />
                    {audienceSuggestions.length > 0 && (
                    <div>
                        <div className="flex flex-wrap gap-3 mb-4">
                            {audienceSuggestions.map((audience, index) => (
                            <button
                                key={index}
                                className="text-sm text-gray-800 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-sm cursor-pointer"
                                onClick={(event) => handleAudienceSuggestionClick(audience, event)}
                            >
                                {audience}
                            </button>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3 mt-2 flex">
                    <input
                    type="checkbox"
                    id="addEquations"
                    className="form-checkbox text-gray-800"
                    checked={addEquations} // Use 'checked' instead of 'value'
                    onChange={(e) => setAddEquations(e.target.checked)}
                    />
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="addEquations">
                        &nbsp; &nbsp; Add equations and formulas to my slides
                    </label>
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
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        required
                    >
                        <option value="English">English</option>
                        <option value="Chinese">中文</option>
                        <option value="Spanish">Español</option>
                    </select>
                </div>
            </div>
            <div className="max-w-sm mx-auto">
                <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                         <FileUploadButton onFileSelected={onFileSelected} />
                    </div>
                </div>
            </div>
            <div className="max-w-sm mx-auto">
                <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                        <button
                            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                            type="submit">
                            {isSubmitting ? "Generating..." : "Generate outline"}
                        </button>
                    </div>
                </div>
            </div>
            {/* Timer */}
            <Timer expectedSeconds={15} isSubmitting={isSubmitting} />


        </form>
    );
};

export default TopicForm;