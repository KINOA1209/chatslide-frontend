'use client'

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AuthService from '@/components/utils/AuthService';
import 'react-toastify/dist/ReactToastify.css';


interface Project {
    project_name: string;
    topic: string;
    requirements: string;
    audience: string;
    language: string;
    foldername: string;
    add_equations: boolean;
    page_count: string;
    outline: string;
    transcripts: string;
    image_files: string;
    audio_files: string;
    pdf_file: string;
    video_file: string;
    resource_ids: string;
    html: string;
    pdf_images: string;
    is_shared: boolean;
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
        // console.log('this is project', project);
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
            if (project.resource_ids) {
                sessionStorage.setItem('resources', JSON.stringify(project.resource_ids));
            }
            if (project.is_shared) {
                sessionStorage.setItem('is_shared', project.is_shared.toString());
            }
            handleRedirect();
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
            if (response.ok) {
                const data = await response.json();
                // console.log('this is data', data);
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
        '/workflow-edit-script',
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

    const handleRedirect = async () => {
        const finishedSteps = projectFinishedSteps();

        if (finishedSteps.length > 0) {
            const lastFinishedStep = finishedSteps[finishedSteps.length - 1];
            const redirectURL = redirect[lastFinishedStep];
            router.push(redirectURL);
        } else {
            router.push('/workflow-generate-outlines');
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
