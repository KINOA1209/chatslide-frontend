"use client";

import AuthService from '@/components/utils/AuthService';
import React, { useEffect } from 'react';

export default function SSORedirect() {
    useEffect(() => {
        const project_to_link = localStorage.getItem("projectToLink");
        // Link project
        const linkProject = async (projetc_id: string) => {

            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            try {
                const response = await fetch('/api/link_project', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ 'project_id': projetc_id }),
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
        if (project_to_link) {
            linkProject(project_to_link);
            // Remove localStorage
            localStorage.removeItem('projectToLink');
            // Redirect to project
            window.open(`/project/${project_to_link}`, '_self');
        } else {
            window.open(`/dashboard`, '_self');
        }
    }, []);
    return (<></>)
};
