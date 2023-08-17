"use client";

import React, { useState, useEffect, useRef } from 'react';
import AuthService from '@/components/utils/AuthService';
import { FileUploadButton } from '@/components/fileUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

interface UserFile {
    id: number,
    uid: string,
    filename: string,
    thumbnail_name: string,
    timestamp: string,
}

interface UserFileList {
    userfiles: Array<UserFile>,
    deleteCallback: Function,
};

const FileManagement: React.FC<UserFileList> = ({ userfiles, deleteCallback }) => {
    const handleDeleteFile = async (e: React.MouseEvent<SVGSVGElement>, id: number) => {
        e.stopPropagation();
        try {
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            const fileDeleteData = {
                resource_id: id
            }
            const response = await fetch("/api/delete_user_resource", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(fileDeleteData),
            });
            if (typeof window !== 'undefined') {
                window.location.reload();
            }
            if (response.ok) {
                const fileDeleteFeedback = await response.json();
                if (response.status === 200) {
                    deleteCallback(id);
                    toast.success("File deleted successfully", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        containerId: "fileManagement",
                    });
                } else {
                    // error handling does not work
                    toast.error(fileDeleteFeedback.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        containerId: "fileManagement",
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const entry = (id: number, uid: string, filename: string, timestamp: string, thumbnail = null, icon = 'pdf') => {
        return (
            <>
                <div key={id} className='w-full h-16 px-4 rounded-2xl hover:bg-gray-200'>
                    <div className='h-full flex items-center w-full py-4 px-2'>
                        <div className='w-8 flex'>{getIcon(filename)}</div>
                        <div className='grow text-ellipsis mx-4 overflow-hidden'>{filename}</div>
                        {timestamp && <div className='mx-16 hidden md:block'>{moment(timestamp).format('L')}</div>}
                        <div className='w-8 flex flex-row-reverse'>
                            <svg onClick={e => handleDeleteFile(e, id)} className='w-6 md:opacity-25 hover:opacity-100 cursor-pointer' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#000000"
                                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                            </svg>
                        </div>
                    </div>
                    <div className='w-full border-b border-gray-300'></div>
                </div>
            </>
        )
    };

    return (
        <div className='w-full h-fit'>
            <div className='w-full px-4'>
                <div className='w-full border-b border-gray-300'></div>
            </div>
            {userfiles.map((file, index) => {
                return entry(file.id, file.uid, file.filename, file.timestamp);
            })}
        </div>
    )
};

export default function MyFiles() {
    const [currentPage, setCurrentPage] = useState(1);
    const [resources, setResources] = useState<UserFile[]>([]);
    const promptRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [rendered, setRendered] = useState<boolean>(false);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = contentRef.current.offsetHeight + "px";
        }
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

    useEffect(() => {
        if (rendered && resources.length === 0 && promptRef.current) {
            promptRef.current.innerHTML = 'You have no uploaded file';
        }
    }, [resources, rendered]);

    const fetchFiles = async (token: string) => {
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch('/api/resource_info', {
                method: 'GET',
                headers: headers,
            });

            if (response.ok) {
                const data = await response.json();
                const files = data.data.resources;
                const resourceTemps = files.map((resource: any) => {
                    return {
                        id: resource.id,
                        uid: resource.uid,
                        filename: resource.resource_name,
                        thumbnail_name: resource.thumbnail_name,
                        timestamp: resource.timestamp,
                    }
                });
                setResources(resourceTemps);
                setRendered(true);
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
            // alert("Please select non-null file");
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
            toast.success("File uploaded successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                containerId: "fileManagement",
            });
        } else {
            console.error(response.status);
            toast.error("File upload failed", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                containerId: "fileManagement",
            });
        };

        fetchFiles(idToken);
    };

    const handleFileDeleted = (id: number) => {
        let ind = -1;
        for (let i = 0; i < resources.length; i++) {
            if (resources[i].id === id) {
                ind = i;
                break;
            }
        };
        if (ind !== -1) {
            const newFiles = [...resources];
            newFiles.splice(ind, 1);
            setResources(newFiles);
        }
    };

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white grow flex flex-col h-full">
            <ToastContainer enableMultiContainer containerId={'fileManagement'} />
            <div className="max-w-6xl w-full mx-auto px-4 pt-16 md:pt-20 flex flex-wrap justify-around">
                <div className="pt-4 grow pr-4">
                    <h1 className="h2 text-blue-600">Resources</h1>
                </div>
                <div className="max-w-sm w-fit text-center pt-4">
                    <div className="w-full mx-auto">
                        <FileUploadButton onFileSelected={onFileSelected} />
                    </div>
                </div>
            </div>
            <div className="max-w-6xl w-full mx-auto mt-4 px-4 pt-4 flex grow overflow-y-auto" ref={contentRef}>
                {resources.length > 0 && <FileManagement userfiles={resources} deleteCallback={handleFileDeleted} />}
                {resources.length === 0 &&
                    <div className='w-full grow flex items-center justify-center'>
                        <div className='text-gray-400' ref={promptRef}>
                            Loading...
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

const getIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();

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
    </svg>);

    const imageIcon = (<svg className='w-8' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <g>
            <path d="M99.281,399.469h320.094c6.172,0,11.844-3.422,14.719-8.875c2.844-5.469,2.438-12.078-1.063-17.141
		l-69.156-100.094c-6.313-9.125-16.781-14.516-27.906-14.297s-21.406,5.969-27.375,15.359l-19.719,30.984l-54.828-79.359
		c-6.313-9.172-16.797-14.531-27.922-14.328s-21.406,5.969-27.375,15.359L85.281,373.984c-3.25,5.109-3.469,11.578-0.531,16.875
		C87.656,396.172,93.219,399.469,99.281,399.469z" />
            <path d="M322.672,223.906c23.688,0,42.922-19.219,42.922-42.922c0-23.688-19.234-42.906-42.922-42.906
		c-23.703,0-42.922,19.219-42.922,42.906C279.75,204.688,298.969,223.906,322.672,223.906z" />
            <path d="M0,19.703v472.594h512v-25.313V19.703H0z M461.375,441.672H50.625V70.328h410.75V441.672z" />
        </g>
    </svg>);

    const fileIcon = (<svg className='w-8' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <g>
            <path d="M378.413,0H208.297h-13.182L185.8,9.314L57.02,138.102l-9.314,9.314v13.176v265.514
            c0,47.36,38.528,85.895,85.896,85.895h244.811c47.353,0,85.881-38.535,85.881-85.895V85.896C464.294,38.528,425.766,0,378.413,0z
            M432.497,426.105c0,29.877-24.214,54.091-54.084,54.091H133.602c-29.884,0-54.098-24.214-54.098-54.091V160.591h83.716
            c24.885,0,45.077-20.178,45.077-45.07V31.804h170.116c29.87,0,54.084,24.214,54.084,54.092V426.105z" />
        </g>
    </svg>);


    if (ext === 'pdf') {
        return pdfIcon;
    }
    if (ext && ['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        return imageIcon;
    }
    return fileIcon;
}