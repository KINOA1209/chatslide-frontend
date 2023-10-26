import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent, use } from 'react';

import AuthService from "../utils/AuthService";

import { Slide } from '@/components/slides/NewSlidesHTML'
import UserService from '../utils/UserService';
import GptToggle from '../button/GPTToggle';
import PaywallModal from './paywallModal';
import mixpanel from 'mixpanel-browser';

interface TranscriptFormProps {
    isSubmitting: boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
    finalSlides: Slide[];
}

const TranscriptForm: React.FC<TranscriptFormProps> = ({ finalSlides, isSubmitting, setIsSubmitting }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [isGpt35, setIsGpt35] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

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
            const paid = await UserService.isPaidUser();
            setIsPaid(paid);
        })();
    }, []);

    const handleSubscribeOnclick = () => {
        setShowPaymentModal(true);
    }

    const handleSubmitTranscript = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        // console.log('submitting');
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
            model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4'
        };

        // console.log(formData);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();

            mixpanel.track('Script Generated', {
                'Project ID': sessionStorage.getItem('project_id'),
                'Language': language,
            });
            
            const response = await fetch('/api/transcript_html', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            // console.log(response);

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

    return (
        <div className="max-w-sm mx-auto">
            {showPaymentModal && <PaywallModal setShowModal={setShowPaymentModal} message='Upgrade to unlock more features. 🚀' />}
            <form onSubmit={handleSubmitTranscript}>
                <div className="flex flex-wrap -mx-3 mt-6 justify-center">
                <GptToggle isGpt35={isGpt35} setIsGpt35={setIsGpt35} />
                    <div className="w-full px-3">
                        {
                            !isPaid ? (
                                <>
                                    <button
                                        type="button"
                                        className="btn text-white font-bold w-full bg-gradient-to-r from-gray-400 to-gray-600 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400"
                                        onClick={handleSubscribeOnclick}
                                    >
                                        🔒 Subscribe to Generate Script
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn text-white font-bold w-full bg-gradient-to-r from-purple-500 to-purple-700 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Generating...' : '🚀 Generate Script'}
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
