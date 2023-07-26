import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent } from 'react';
import TranscriptFormModal from './trasncriptFormModal';
import AuthService from "../utils/AuthService";

interface TranscriptFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const TranscriptForm: React.FC<TranscriptFormProps> = ({isSubmitting, setIsSubmitting}) => {
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

    const latex_filename = 'final_latex.tex';
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

    const formData = {
      latex_filename: latex_filename,
      foldername: foldername,
      topic: topic,
      language: language,
    };

    console.log(formData);

    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        // Redirect to a new page with the data
        router.push('workflow-edit-transcript');
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
              className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Generating...' : 'Generate Transcript'}
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
