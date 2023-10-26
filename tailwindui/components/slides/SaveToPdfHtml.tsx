'use client'

import React, { useState, useEffect, useRef } from 'react';
import AuthService from "../utils/AuthService";
import { LoadingIcon } from "@/components/ui/progress";
import { SlideElement, Slide } from '../SlidesHTML';
import PaywallModal from '@/components/forms/paywallModal';
import mixpanel from 'mixpanel-browser';

interface SaveToPdfHtmlProps {
    exportMode: boolean;
    setExportMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveToPdfHtml: React.FC<SaveToPdfHtmlProps> = ({ exportMode, setExportMode }) => {
    const [user, setUser] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Create a scoped async function within the hook.
        const fetchUser = async () => {
            const user = await AuthService.getCurrentUser();
            if (user) {
                setUser(user);
            }
        };
        // Execute the created function directly
        fetchUser();
    }, []);

    const handleSavePDF = async () => {
        const element = document.getElementById('pdf-content');
        setIsSubmitting(true);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();

            mixpanel.track('PDF Downloaded', {
                'Project ID': sessionStorage.getItem('project_id'),
            });

            const response = await fetch('/api/save_final_html_pdf', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok && (typeof window !== "undefined")) {
                setExportMode(true);  //unset at SlidesHTML
            } else if (response.status === 402) {
                setShowPaymentModal(true);
            } else {
                console.error('Failed to save PDF.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="max-w-sm mx-auto">
            <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                    {showPaymentModal && <PaywallModal setShowModal={setShowPaymentModal} message='Upgrade for more ⭐️credits.' />}

                    <button
                        className="btn text-blue-600 bg-gray-100 hover:bg-gray-200 w-full border border-blue-600 disabled:from-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0"
                        onClick={handleSavePDF}
                        disabled={isSubmitting}
                    >
                        <div className="text-black h-[22px] mr-2" hidden={!isSubmitting}><LoadingIcon /></div>
                        Save as PDF (10 ⭐️)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveToPdfHtml;