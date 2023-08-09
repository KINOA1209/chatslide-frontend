"use client";

import React, { useState, useEffect } from 'react';
import AuthService from '@/components/utils/AuthService';
import { FileUploadButton } from '@/components/fileUpload';

const pdfIcon = (<svg className='w-8' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <g>
        <path d="M378.413,0H208.297h-13.182L185.8,9.314L57.02,138.102l-9.314,9.314v13.176v265.514
		c0,47.36,38.528,85.895,85.896,85.895h244.811c47.353,0,85.881-38.535,85.881-85.895V85.896C464.294,38.528,425.766,0,378.413,0z
		 M432.497,426.105c0,29.877-24.214,54.091-54.084,54.091H133.602c-29.884,0-54.098-24.214-54.098-54.091V160.591h83.716
		c24.885,0,45.077-20.178,45.077-45.07V31.804h170.116c29.87,0,54.084,24.214,54.084,54.092V426.105z" />
        <path d="M171.947,252.785h-28.529c-5.432,0-8.686,3.533-8.686,8.825v73.754c0,6.388,4.204,10.599,10.041,10.599
		c5.711,0,9.914-4.21,9.914-10.599v-22.406c0-0.545,0.279-0.817,0.824-0.817h16.436c20.095,0,32.188-12.226,32.188-29.612
		C204.136,264.871,192.182,252.785,171.947,252.785z M170.719,294.888h-15.208c-0.545,0-0.824-0.272-0.824-0.81v-23.23
		c0-0.545,0.279-0.816,0.824-0.816h15.208c8.42,0,13.447,5.027,13.447,12.498C184.167,290,179.139,294.888,170.719,294.888z" />
        <path d="M250.191,252.785h-21.868c-5.432,0-8.686,3.533-8.686,8.825v74.843c0,5.3,3.253,8.693,8.686,8.693h21.868
		c19.69,0,31.923-6.249,36.81-21.324c1.76-5.3,2.723-11.681,2.723-24.857c0-13.175-0.964-19.557-2.723-24.856
		C282.113,259.034,269.881,252.785,250.191,252.785z M267.856,316.896c-2.318,7.331-8.965,10.459-18.21,10.459h-9.23
		c-0.545,0-0.824-0.272-0.824-0.816v-55.146c0-0.545,0.279-0.817,0.824-0.817h9.23c9.245,0,15.892,3.128,18.21,10.46
		c0.95,3.128,1.62,8.56,1.62,17.93C269.476,308.336,268.805,313.768,267.856,316.896z" />
        <path d="M361.167,252.785h-44.812c-5.432,0-8.7,3.533-8.7,8.825v73.754c0,6.388,4.218,10.599,10.055,10.599
		c5.697,0,9.914-4.21,9.914-10.599v-26.351c0-0.538,0.265-0.81,0.81-0.81h26.086c5.837,0,9.23-3.532,9.23-8.56
		c0-5.028-3.393-8.553-9.23-8.553h-26.086c-0.545,0-0.81-0.272-0.81-0.817v-19.425c0-0.545,0.265-0.816,0.81-0.816h32.733
		c5.572,0,9.245-3.666,9.245-8.553C370.411,256.45,366.738,252.785,361.167,252.785z" />
    </g>
</svg>)


interface UserFile {
    id: number,
    uid: string,
    filename: string,
    thumbnail_name: string
}

interface UserFileList {
    userfiles: Array<UserFile>
};

const FileManagement: React.FC<UserFileList> = ({ userfiles }) => {
    const entry = (key: number, filename: string, thumbnail = null, icon = 'pdf') => {
        return (
            <>
                <div className='w-full h-16 px-4 md:px-8 rounded-2xl hover:bg-gray-200'>
                    <div className='h-full flex items-center w-full py-4 px-2' key={key}>
                        <div className='w-8 flex'>{icon === 'pdf' && pdfIcon}</div>
                        <div className='grow text-ellipsis mx-4 overflow-hidden'>{filename}</div>
                        <div className='mx-16 hidden md:block'>2023-08-08</div>
                        <div className='w-8 flex flex-row-reverse'>
                            <svg className='w-6 md:opacity-25 hover:opacity-100 cursor-pointer' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#000000"
                                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                            </svg>
                        </div>
                    </div>
                    <div className='w-full border-b border-gray-300'></div>
                </div>
            </>
        )
    }
    return (
        <div className='w-full h-fit'>
            <div className='w-full px-4 md:px-8'>
                <div className='w-full border-b border-gray-300'></div>
            </div>
            {userfiles.map((file, index) => {
                return entry(file.id, file.filename);
            })}
        </div>
    )
};

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
    const fileList = [
        {
            id: 0,
            uid: '0',
            filename: 'a.pdf',
            thumbnail_name: '',
        }, {
            id: 1,
            uid: '1',
            filename: 'bfweffwfewfwafewfw.pdf',
            thumbnail_name: '',
        },
        {
            id: 0,
            uid: '0',
            filename: 'a.pdf',
            thumbnail_name: '',
        }, {
            id: 1,
            uid: '1',
            filename: 'bfweffwfewfwafewfw.pdf',
            thumbnail_name: '',
        },
        {
            id: 0,
            uid: '0',
            filename: 'a.pdf',
            thumbnail_name: '',
        }, {
            id: 1,
            uid: '1',
            filename: 'bfweffwfewfwafewfw.pdf',
            thumbnail_name: '',
        },
        {
            id: 0,
            uid: '0',
            filename: 'a.pdf',
            thumbnail_name: '',
        }, {
            id: 1,
            uid: '1',
            filename: 'bfweffwfewfwafewfw.pdf',
            thumbnail_name: '',
        },
        {
            id: 0,
            uid: '0',
            filename: 'a.pdf',
            thumbnail_name: '',
        }, {
            id: 1,
            uid: '1',
            filename: 'bfweffwfewfwafewfw.pdf',
            thumbnail_name: '',
        },
        {
            id: 0,
            uid: '0',
            filename: 'a.pdf',
            thumbnail_name: '',
        }, {
            id: 1,
            uid: '1',
            filename: 'bfweffwfewfwafewfw.pdf',
            thumbnail_name: '',
        },
        {
            id: 0,
            uid: '0',
            filename: 'a.pdf',
            thumbnail_name: '',
        }, {
            id: 1,
            uid: '1',
            filename: 'bfweffwfewfwafewfw.pdf',
            thumbnail_name: '',
        },
    ]

    const fileListShort = [
        {
            id: 0,
            uid: '0',
            filename: 'a.pdf',
            thumbnail_name: '',
        }, {
            id: 1,
            uid: '1',
            filename: 'bfweffwfewfwafewfw.pdf',
            thumbnail_name: '',
        },
    ]

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white grow flex flex-col">
            <div className="max-w-6xl w-full mx-auto px-4 pt-16 md:pt-20 flex flex-wrap justify-around">
                <div className="pt-4 grow pr-4">
                    <h1 className="h2 text-blue-600">My files</h1>
                </div>
                <div className="max-w-sm w-fit text-center pt-4">
                    <div className="w-fit mx-auto">
                        <FileUploadButton onFileSelected={onFileSelected} />
                    </div>
                </div>
            </div>
            <div className="max-w-6xl w-full mx-auto px-4 grow pt-4 flex">
                <FileManagement userfiles={fileListShort} />

            </div>
        </section>
    )
}