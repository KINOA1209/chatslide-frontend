"use client";

import React, { useState, useEffect } from 'react';
import AuthService from '@/components/utils/AuthService';
import { FileUploadButton } from '@/components/fileUpload';

interface UserFile {
    filename: string;
    // full_url: string;
    // small_url: string;
}

export default function MyFiles() {
    const [currentPage, setCurrentPage] = useState(1);
    const [files, setFiles] = useState<UserFile[]>([]);

    useEffect(() => {
        // Create a scoped async function within the hook.
        const fetchUserFiles = async () => {
            try {
                const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
                fetchFiles(token);
            }
            catch (error: any) {
                console.error(error);
            }

        };
        // Execute the created function directly
        fetchUserFiles();
    }, []);

    const fetchFiles = async (token: string) => {
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch('/api/user_files', {
                method: 'GET',
                headers: headers,
            });

            if (response.ok) {
                const data = await response.json();
                setFiles(data.user_files);
            } else {
                // Handle error cases
                console.error('Failed to fetch projects:', response.status);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const onFileSelected = async (file: File | null) => {
        console.log("will upload file", file);
        if (file == null) {
            alert("Please select non-null file");
            return;
        }
        console.log("file name: ", file.name)//.split('.', 1)
        console.log("file name split: ", file.name.split('.', 1))
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
        const body = new FormData();
        body.append("file", file);
        const response = await fetch("/api/upload_user_file", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
            body: body
        });
        if (response.ok) {
            alert("File upload successful!");
        } else {
            alert("File upload failed!" + response.status);
        }
    }

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1 text-blue-600">My files</h1>
                    </div>
                    <div className="max-w-sm mx-auto text-center pb-12 md:pb-20">
                        <div className="w-full px-3">
                            <FileUploadButton onFileSelected={onFileSelected} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}