'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';


interface SaveToPdfProps {
    accessToken: string;
    setAccessToken: (token: string) => void;
  }

const SaveToPdf: React.FC<SaveToPdfProps> = ({accessToken, setAccessToken}) => {
    const router = useRouter();

    const handleSavePDF = async () => {
        
        const element = document.getElementById('pdf-content');

        try {
            const pdf_file = typeof localStorage !== 'undefined' ?  localStorage.getItem('pdf_file') : '';
            const foldername = typeof localStorage !== 'undefined' ?  localStorage.getItem('foldername') : '';
    
            const response = await fetch(`/api/pdf?filename=${pdf_file}&foldername=${foldername}`, {
                method: 'GET',
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const topic = typeof localStorage !== 'undefined' ?  localStorage.getItem('topic') : '';
                a.download = `${topic}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                console.log('PDF saved successfully.');
            } else {
                console.error('Failed to save PDF.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="max-w-sm mx-auto">
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          {accessToken === '' ? (
            // insert here
            <Modal />
          ) : (
            <button
            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
            onClick={handleSavePDF}
          >
            Save as PDF
          </button>
          )}
        </div>
      </div>
    </div>
    );
};

export default SaveToPdf;
