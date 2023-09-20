import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent } from 'react';

import TranscriptFormModal from './trasncriptFormModal';

import AuthService from "../utils/AuthService";

import { SlideElement, Slide } from '../SlidesHTML';

interface TranscriptFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  finalSlides: Slide[]; 
}

const TranscriptForm: React.FC<TranscriptFormProps> = ({finalSlides, isSubmitting, setIsSubmitting}) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

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
      html: finalSlides
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

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmitTranscript}>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            {!user ? (
                <TranscriptFormModal />
            ) : (
            <button
              className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Generating...' : 'Generate Script'}
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
