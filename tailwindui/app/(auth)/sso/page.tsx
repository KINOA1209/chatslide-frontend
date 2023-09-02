"use client";

import AuthService from '@/components/utils/AuthService';
import React, { useEffect } from 'react';

export default function SSORedirect() {
    useEffect(() => {
        const nextUri = localStorage.getItem("nextUri");
        const project_to_link = localStorage.getItem("projectToLink");
        const promo = localStorage.getItem("promo");
        
        localStorage.removeItem('projectToLink');
        localStorage.removeItem('nextUri');
        localStorage.removeItem('promo');

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
        };

        const addPromoCodeasync = (promoCode:string) => {
            // TODO: send request
        };

        if (project_to_link) {
            linkProject(project_to_link);
            // Redirect to project
            window.open(`/project/${project_to_link}`, '_self');
        } 
        // else if (nextUri) {
        //     window.open(`/${nextUri}`, '_self');
        // }
        else {
            window.open(`/dashboard`, '_self');
        }
    }, []);
    return (<></>)
};
