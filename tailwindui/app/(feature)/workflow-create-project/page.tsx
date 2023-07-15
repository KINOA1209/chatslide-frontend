"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '@/components/utils/AuthService';

function CreateProject() {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const router = useRouter();

    useEffect(() => {
        sessionStorage.clear()
      }, []);

    const handleProjectNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
    };

    const handleProjectDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setProjectDescription(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check if project name is empty
        if (projectName.trim() === '') {
            toast.error('Project name cannot be empty', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return; // Stop form submission
        }

        // Perform submission logic here
        const formData = {
            project_name: (event.target as HTMLFormElement).project_name.value,
            project_description: (event.target as HTMLFormElement).project_description.value,
        }

        try {
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            console.log('Access token:', token);
            const response = await fetch("/api/create_project", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            console.log(formData);
            console.log(response);

            if (response.ok) {
                const projectCreateInfo = await response.json();
                console.log(projectCreateInfo);
                if (projectCreateInfo.status === "success") {
                    sessionStorage.setItem("project_id", projectCreateInfo.project_id);
                    setTimeout(() => {
                        router.push("/workflow-intro");
                    }, 500);
                } else {
                    toast.error(projectCreateInfo.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } else {
                toast.error(response.status, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Form */}
                <div className="max-w-sm mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="project_name" className="block font-medium text-gray-700">
                                Project Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="project_name"
                                className="mt-1 focus:ring-blue-600 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={projectName}
                                onChange={handleProjectNameChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="project_description" className="block font-medium text-gray-700">
                                Project Description
                            </label>
                            <textarea
                                id="project_description"
                                className="mt-1 focus:ring-blue-600 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-32 resize-none"
                                value={projectDescription}
                                onChange={handleProjectDescriptionChange}
                                placeholder="Enter project description..."
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Create Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default function WorkflowStepCreate() {
    return (
        <div>
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Create new project</h1>
            </div>

            <div className="max-w-4xl mx-auto">
                <CreateProject />
            </div>
        </div>
    )
}