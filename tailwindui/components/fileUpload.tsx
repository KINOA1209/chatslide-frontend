import React, { ChangeEvent, FC, useState, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Allowed extensions defined in drlambda/app/user_file_manager.py
// ALLOWED_DOC_EXTENSIONS = {"txt", "pdf"}
// ALLOWED_MEDIA_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

const supportedFormats = ["pdf", "txt", "docx"]; // For prompt display
const supportedExtensions = ["pdf", "txt", "docx"]; // For checking logic

const sizeLimit = 16 * 1024 * 1024; // 16mb

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
        console.log(file?.size);
        if (file?.size && file?.size > sizeLimit) {
            toast.error("The maximum file size supported is 16 MB.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                containerId: "upload",
            });
            return;
        }

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
                containerId: "upload",
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
        <div className='max-w-sm flex flex-col items-center'>
            <ToastContainer enableMultiContainer containerId={'upload'} />
            <input
                type="file"
                id="file-upload"
                ref={inputFileRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button
                className="w-full btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500"
                type="button"
                onClick={handleClick}
            >
                Upload File
            </button>
            <div className='text-sm text-gray-400'>Supported file formats: {formats.map((f, index) => {
                if (index !== formats.length - 1) {
                    return f + ', ';
                } else {
                    return f;
                }
            })}</div>
            <div className='text-sm text-gray-400'>Max file size: 16 MB</div>
            <div className='text-sm text-gray-400'>Subscribed users can select multiple files</div>
        </div>
    );
};