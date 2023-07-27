'use client'

import React, { useState, useEffect, useRef } from 'react';
import SavePptxModal from './savePptxModal';
import AuthService from "../utils/AuthService";


interface SaveToPPTXProps {
  }

const SaveToPPTX: React.FC<SaveToPPTXProps> = () => {
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

    const handleSavePDF = async () => {
        const foldername = typeof sessionStorage !== 'undefined' ?  sessionStorage.getItem('foldername') : '';
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
            onClick={handleSavePDF}
          >
            Save as PPTX
          </button>
          )}
        </div>
      </div>
    </div>
    );
};

export default SaveToPPTX;
