'use client'

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AuthService from '@/components/utils/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Project {
    project_name: string;
    topic: string;
    content_type: string;
    language: string;
    foldername: string;
    resource_ids: string;
    // fields for Presentation start here
    requirements: string;
    audience: string;
    add_equations: boolean;
    page_count: string;
    outline: string;
    extra_knowledge: string;
    outline_item_counts: string;
    transcripts: string;
    image_files: string;
    audio_files: string;
    pdf_file: string;
    video_file: string;
    resources: string;
    html: string;
    pdf_images: string;
    is_shared: boolean;
    // fields for Social Post start here
    post_type: string;
    social_platform: string;
    social_posts: string;
}

const ProjectLoading = () => {
    const [project, setProject] = useState<Project | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    
    useEffect(() => {
        sessionStorage.clear();
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
            if (project.language) {
                sessionStorage.setItem('language', project.language);
            }
            if (project.foldername) {
                sessionStorage.setItem('foldername', project.foldername);
            }
            if (project.project_name) {
                sessionStorage.setItem('project_name', project.project_name);
            }
            if (project.resource_ids) {
                sessionStorage.setItem('selectedResourceId', JSON.stringify(project.resource_ids));
            }
            const content_type = project.content_type ?? 'presentation';
            sessionStorage.setItem('content_type', content_type);
            if (content_type == 'presentation') {
                if (project.requirements) {
                    sessionStorage.setItem('requirements', project.requirements);
                }
                if (project.audience) {
                    sessionStorage.setItem('audience', project.audience);
                }
                if (project.add_equations) {
                    sessionStorage.setItem('addEquations', project.add_equations.toString());
                }
                if (project.page_count) {
                    sessionStorage.setItem('page_count', project.page_count);
                }
                if (project.outline) {
                    sessionStorage.setItem('outline', JSON.stringify(project.outline));
                }
                if (project.html) {
                    sessionStorage.setItem('html', project.html);
                }
                if (project.transcripts) {
                    sessionStorage.setItem('transcripts', JSON.stringify(project.transcripts));
                }
                if (project.image_files) {
                    sessionStorage.setItem('image_files', JSON.stringify(project.image_files));
                }
                if (project.pdf_file) {
                    sessionStorage.setItem('pdf_file', project.pdf_file);
                }
                if (project.pdf_images) {
                    sessionStorage.setItem('pdf_images', JSON.stringify(project.pdf_images));
                }
                if (project.audio_files) {
                    sessionStorage.setItem('audio_files', JSON.stringify(project.audio_files));
                }
                if (project.video_file) {
                    sessionStorage.setItem('video_file', project.video_file);
                }
                if (project.resources) {
                    sessionStorage.setItem('selectedResources', JSON.stringify(project.resources));
                }
                if (project.is_shared) {
                    sessionStorage.setItem('is_shared', project.is_shared.toString());
                }
                if (project.extra_knowledge) {
                    sessionStorage.setItem('extraKnowledge', project.extra_knowledge);
                }
                if (project.outline_item_counts) {
                    sessionStorage.setItem('outline_item_counts', JSON.stringify(project.outline_item_counts));
                }
            } else if (content_type == 'social_posts') {
                if (project.post_type) {
                    sessionStorage.setItem('post_type', project.post_type);
                }
                if (project.social_platform) {
                    sessionStorage.setItem('social_platform', project.social_platform);
                }
                if (project.social_posts) {
                    sessionStorage.setItem('social_posts', project.social_posts);
                }
            }
            handleRedirect(content_type);
        }
    }, [project]);

    const fetchProjectDetails = async (token: string) => {
        console.log(`Fetching project details.`);
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
            if (response.ok) {
                const data = await response.json();
                console.log('this is data', data);
                setProject(data);
            } else {
                console.error('Error fetching project details', response.status);
                toast.error('The project is not found or you do not have access to it.', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };


    const presentationRedirect = ['/workflow-generate-outlines',
        '/workflow-edit-outlines',
        '/workflow-review-slides',
        '/workflow-edit-script',
        '/workflow-review-audio',
        '/workflow-review-video'];
    const presentationFinishedSteps: () => number[] = () => {
        const finishedStepsArray: number[] = [];
        if (typeof window !== 'undefined' && sessionStorage.getItem('topic')) {
            finishedStepsArray.push(0);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('outline')) {
            finishedStepsArray.push(1);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('html')) {
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

    const socialPostRedirect = [
        '/workflow-scenario-choice',
        '/workflow-generate-socialpost',
        '/workflow-review-socialpost',
    ];
    const socialPostFinishedSteps: () => number[] = () => {
        const finishedStepsArray: number[] = [];
        if (typeof window !== 'undefined' && sessionStorage.getItem('post_type')) {
            finishedStepsArray.push(0);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('topic')) {
            finishedStepsArray.push(1);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('social_posts')) {
            finishedStepsArray.push(2);
        }
        return finishedStepsArray;
    }

    const handleRedirect = async (contentType: string) => {
        if (contentType == 'presentation') {
            const finishedSteps = presentationFinishedSteps();

            if (finishedSteps.length > 0) {
                const lastFinishedStep = finishedSteps[finishedSteps.length - 1];
                const redirectURL = presentationRedirect[lastFinishedStep];
                router.push(redirectURL);
            } else {
                router.push('/workflow-generate-outlines');
            }
        } else if (contentType == 'social_posts') {
            const finishedSteps = socialPostFinishedSteps();

            if (finishedSteps.length > 0) {
                const lastFinishedStep = finishedSteps[finishedSteps.length - 1];
                const redirectURL = socialPostRedirect[lastFinishedStep];
                router.push(redirectURL);
            } else {
                router.push('/workflow-scenario-choice');
            }
        }
    };


    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <p>Loading project...</p>
                </div>
            </div>
        </div>
    </section>
    );

};

export default ProjectLoading;
