import React, { ChangeEvent, FC, useState, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supportedFormats = ['PDF', 'JPG']; // For prompt displayy
const supportedExtensions = ['pdf', 'jpg', 'jpeg']; // For checking logic

interface FileUploadButtonProps {
    onFileSelected: (file: File | null) => void;
    formats?: string[],
    extensions?: string[],
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({ onFileSelected, formats = supportedFormats, extensions = supportedExtensions }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        const ext = file?.name.split('.').pop()?.toLowerCase();
        if (ext && !extensions.includes(ext)) {
            toast.error(ext.toUpperCase() + ' file is not supported!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

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
            <ToastContainer />
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
                {fileName || 'Upload Files'}
            </button>
            <div className='text-sm text-gray-400'>Supported file formats: {formats.map((f, index) => {
                if (index !== formats.length - 1) {
                    return f + ', ';
                } else {
                    return f;
                }
            })}</div>
        </div>
    );
};