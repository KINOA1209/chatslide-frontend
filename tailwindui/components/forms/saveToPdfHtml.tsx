'use client'

import React, { useState, useEffect, useRef } from 'react';
import SavePDFModal from './savePDFModal';
import AuthService from "../utils/AuthService";
import { LoadingIcon } from "@/components/progress";
import { SlideElement, Slide } from '../SlidesHTML';

type SlidesHTMLProps = {
  finalSlides: Slide[];
  setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
};

interface SaveToPdfHtmlProps {
  finalSlides: Slide[];
  //setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>; 
}

const SaveToPdfHtml: React.FC<SaveToPdfHtmlProps> = ({ finalSlides }) => {
  const [user, setUser] = useState(null);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

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
    setDownloadingPDF(true);
    const element = document.getElementById('pdf-content');

    try {
      //call api to save the html first 
      const foldername = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('foldername') : '';
      const formData = {
        foldername: foldername,
        html: finalSlides
      }
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
      const response = await fetch('/api/save_final_html_pdf', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok && (typeof window !== "undefined")) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const topic = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('topic') : '';
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
    setDownloadingPDF(false);
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          {!user ? (
            // insert here
            <SavePDFModal />
          ) : (
            <button
              className="btn text-blue-600 bg-gray-100 hover:bg-gray-200 w-full border border-blue-600 disabled:from-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0"
              onClick={handleSavePDF}
              disabled={downloadingPDF}
            >
              <div className="text-black h-[22px] mr-2" hidden={!downloadingPDF}><LoadingIcon /></div>
              Save as PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveToPdfHtml;