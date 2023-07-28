'use client'

import React, { useState, useEffect, useRef } from 'react';
import SavePptxModal from './savePptxModal';
import AuthService from "../utils/AuthService";
import { LoadingBar } from '@/components/progress';


interface SaveToPPTXProps {
  }

const SaveToPPTX: React.FC<SaveToPPTXProps> = () => {
    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [delayedDisplay, setDelayedDisplay] = useState(false);

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

    const handleSavePPTX = async () => {
        const foldername = typeof sessionStorage !== 'undefined' ?  sessionStorage.getItem('foldername') : '';
        setIsSubmitting(true);
        const delay = setTimeout(()=>{setDelayedDisplay(true)}, 1500);
        try{
            const resp = await fetch('/api/convert_to_pptx', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({foldername: foldername})
            })

            if (resp.ok) {
                const json = await resp.json();
                console.log(json);

                try {
                    const pptx_file = json.data;
                    
                    const response = await fetch(`/api/pptx?filename=${pptx_file}&foldername=${foldername}`, {
                        method: 'GET',
                    });
        
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        const topic = typeof sessionStorage !== 'undefined' ?  sessionStorage.getItem('topic') : '';
                        a.download = `${topic}.pptx`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                        console.log('PPTX saved successfully.');
                    } else {
                        console.error('Failed to save PPTX.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            } else {
                console.error('Failed to convert to PPTX.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        
        setIsSubmitting(false);
        setDelayedDisplay(false);
        clearTimeout(delay);
    };

    return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          {!user ? (
            // insert here
            <SavePptxModal />
          ) : (
            <button
            className="btn text-blue-600 bg-gray-100 hover:bg-gray-200 w-full border border-blue-600"
            onClick={handleSavePPTX}
          >
            Save as PPTX
          </button>
          )}
          {(isSubmitting && delayedDisplay) && (
            <div className="mt-4 -mb-4 text-center">
              <div className='flex justify-center'>
                <div className='max-w-sm w-full'>
                  <LoadingBar />
                </div>
              </div>
              <span className="text-sm text-gray-500 mt-4">
                <p>
                  Generating PPTX for the first time<br></br> normally takes 15 seconds.
                </p>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
    );
};

export default SaveToPPTX;
