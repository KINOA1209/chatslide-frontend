import React from 'react';

const SaveToPdf = () => {
    const handleSavePDF = async () => {
        const element = document.getElementById('pdf-content');

        try {
            const pdf_file = localStorage.getItem('pdf_file');
            const foldername = localStorage.getItem('foldername');
    
            const response = await fetch(`/api/pdf?filename=${pdf_file}&foldername=${foldername}`, {
                method: 'GET',
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const topic = localStorage.getItem('topic');
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
                    <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={handleSavePDF}>Save as PDF</button>
                </div>
            </div>
        </div>
    );
};

export default SaveToPdf;
