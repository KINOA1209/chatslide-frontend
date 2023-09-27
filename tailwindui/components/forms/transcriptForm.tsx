import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent, use } from 'react';

import TranscriptFormModal from './trasncriptFormModal';

import AuthService from "../utils/AuthService";

import { SlideElement, Slide } from '../SlidesHTML';
import UserService from '../utils/UserService';

interface TranscriptFormProps {
    isSubmitting: boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
    finalSlides: Slide[];
}

const TranscriptForm: React.FC<TranscriptFormProps> = ({ finalSlides, isSubmitting, setIsSubmitting }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [tier, setTier] = useState(null);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);

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

    useEffect(() => {
        (async () => {
            const userTier = await UserService.getUserTier();
            setTier(userTier);
        })();
    }, []);

    const handleSubmitTranscript = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        console.log('submitting');
        event.preventDefault();

        setIsSubmitting(true);

        const html_filename = 'html_init.html';
        const foldername =
            typeof sessionStorage !== 'undefined'
                ? sessionStorage.getItem('foldername')
                : null;
        const topic =
            typeof sessionStorage !== 'undefined'
                ? sessionStorage.getItem('topic')
                : null;
        const language =
            typeof window !== 'undefined'
                ? sessionStorage.getItem('language')
                : 'English';

        const project_id =
            typeof window !== 'undefined'
                ? sessionStorage.getItem('project_id')
                : '';
        const formData = {
            html_filename: html_filename,
            foldername: foldername,
            topic: topic,
            project_id: project_id,
            language: language,
            html: finalSlides,
        };

        console.log(formData);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch('/api/transcript_html', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            console.log(response);

            if (response.ok) {
                const resp = await response.json();
                setIsSubmitting(false);
                // Store the data in local storage
                console.log(resp.data.res);
                sessionStorage.setItem('transcripts', JSON.stringify(resp.data.res));
                sessionStorage.setItem('image_files', JSON.stringify(resp.data.image_files))
                // Redirect to a new page with the data
                router.push('workflow-edit-script');
            } else {
                alert('Request failed: ' + response.status);
                console.log(response);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    };

    const handleButtonClick = () => {
        if (tier === 'FREE') {
            setShowPaymentPopup(true);
        } else {
            // Handle the script generation or whatever the primary function is
        }
    };

    const closePaymentPopup = () => {
        setShowPaymentPopup(false);
    };

    return (
        <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmitTranscript}>
                <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                        {
                            tier === 'FREE' ? (
                                <>
                                    <button
                                        type="button"
                                        className="btn text-white font-bold w-full bg-gradient-to-r from-gray-400 to-gray-600 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400"
                                        onClick={() => setShowPaymentPopup(true)}
                                    >
                                        🔒 Generate Script
                                    </button>

                                    {showPaymentPopup && (
                                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="bg-white p-4 rounded">
                                                <p>You need to pay for this feature.</p>
                                                {/* Add payment details or options here */}
                                                <button type="button" onClick={closePaymentPopup}>Close</button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn text-white font-bold w-full bg-gradient-to-r from-purple-500 to-purple-700 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Generating...' : '🌟 Generate Script'}
                                </button>
                            )
                        }
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TranscriptForm;
