'use client'

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthService from '@/components/utils/AuthService';

interface Project {
    project_name: string;
    project_description: string;
    topic: string;
    requirements: string;
    audience: string;
    language: string;
    foldername: string;
    page_count: string;
    outline: string;
    transcripts: string;
    image_files: string;
    audio_files: string;
    video_file: string;
}

const ProjectDetail = () => {
    const [project, setProject] = useState<Project | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Create a scoped async function within the hook.
        const fetchUser = async () => {
            try {
                const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
                fetchProjectDetails(token)
            }
            catch (error: any) {
                console.error(error);
            }

        };
        // Execute the created function directly
        fetchUser();
    }, []);

    useEffect(() => {
        if (project) {
            // Store values in sessionStorage if they exist
            if (project.topic) {
                sessionStorage.setItem('topic', project.topic);
            }
            if (project.requirements) {
                sessionStorage.setItem('requirements', project.requirements);
            }
            if (project.audience) {
                sessionStorage.setItem('audience', project.audience);
            }
            if (project.language) {
                sessionStorage.setItem('language', project.language);
            }
            if (project.foldername) {
                sessionStorage.setItem('foldername', project.foldername);
            }
            if (project.page_count) {
                sessionStorage.setItem('page_count', project.page_count);
            }
            if (project.outline) {
                sessionStorage.setItem('outline', JSON.stringify(project.outline));
            }
            if (project.transcripts) {
                sessionStorage.setItem('transcripts', JSON.stringify(project.transcripts));
            }
            if (project.image_files) {
                sessionStorage.setItem('image_files', JSON.stringify(project.image_files));
            }
            if (project.audio_files) {
                sessionStorage.setItem('audio_files', JSON.stringify(project.audio_files));
            }
            if (project.video_file) {
                sessionStorage.setItem('video_file', project.video_file);
            }
        }
    }, [project]);

    const fetchProjectDetails = async (token: string) => {
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        headers.append('Content-Type', 'application/json');

        try {
            // set project_id in sessionStorage
            const project_id = pathname.split('/').pop();
            if (project_id) {
                console.log('this is project_id', project_id);
                sessionStorage.setItem('project_id', project_id);
            }

            // fetch project details
            const response = await fetch('/api/get_project_details', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ project_id: project_id }),
            });
            console.log('this is response', response);
            if (response.ok) {
                const data = await response.json();
                setProject(data);
            } else {
                console.error('Error fetching project details', response.status);
            }

        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };


    const redirect = ['/workflow-generate-outlines',
        '/workflow-edit-outlines',
        '/workflow-review-slides',
        '/workflow-edit-transcript',
        'workflow-review-audio',
        'workflow-review-video'];
    const projectFinishedSteps: () => number[] = () => {
        const finishedStepsArray: number[] = [];
        if (typeof window !== 'undefined' && sessionStorage.getItem('topic')) {
            finishedStepsArray.push(0);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('outline')) {
            finishedStepsArray.push(1);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('image_files')) {
            finishedStepsArray.push(2);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('transcripts')) {
            finishedStepsArray.push(3);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('audio_files')) {
            finishedStepsArray.push(4);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('video_file')) {
            finishedStepsArray.push(5);
        }
        return finishedStepsArray;
    }

    const handleClick = async () => {
        const finishedSteps = projectFinishedSteps();

        if (finishedSteps.length > 0) {
            const lastFinishedStep = finishedSteps[finishedSteps.length - 1];
            const redirectURL = redirect[lastFinishedStep];
            router.push(redirectURL);
        } else {
            router.push('/workflow-intro');
        }
    };

    const handleDelete = async () => {
        const projectId = sessionStorage.getItem('project_id');
        // Modal for warning
        alert(`Project ${projectId} will be deleted`);
        // Communicate with server if user confirm deletion
        if (true) {
            const projectDeleteData = {
                project_id: projectId
            }
            try {
                const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
                const response = await fetch("/api/delete_project", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(projectDeleteData),
                });
                if (response.ok) {
                    const projectDeleteFeedback = await response.json();
                    if (response.status === 200) {
                        router.push('/dashboard');
                        toast.success("Project deleted successfully", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else {
                        // error handling does not work
                        toast.error(projectDeleteFeedback.message, {
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
                }
            } catch (error) {
                console.error(error);
            }
        }

    };

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
                            {project ? (
                                <>
                                    <h1 className="text-2xl font-bold mb-4">{project.project_name}</h1>
                                    <p className="text-gray-600 mb-2">{project.project_description}</p>
                                    <div className="border-t border-gray-200 mt-4 pt-4">
                                        <p className="text-gray-600 mb-2">
                                            <strong>Topic:</strong> {project.topic}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <strong>Prior Knowledge:</strong> {project.requirements}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <strong>Audience:</strong> {project.audience}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <strong>Language:</strong> {project.language}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <p>Loading project details...</p>
                            )}
                        </div>

                        {/* Button Group */}
                        <div className="flex justify-center mt-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2 btn-size"
                                onClick={handleClick}>
                                Continue Project
                            </button>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2 btn-size"
                                onClick={handleDelete}>
                                Delete Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default ProjectDetail;
