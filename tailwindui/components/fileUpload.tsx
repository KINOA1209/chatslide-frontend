import React, { ChangeEvent, FC, useState, useRef } from 'react';

interface FileUploadButtonProps {
    onFileSelected: (file: File | null) => void;
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({ onFileSelected }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            setFileName(file.name);
        }

        onFileSelected(file);
    };

    const handleClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }


    return (
        <div>
            <input
                type="file"
                id="file-upload"
                ref={inputFileRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button
                className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                type="button"
                onClick={handleClick}
            >
                {fileName || 'Upload Supporting PDF'}
            </button>
        </div>
    );
};