"use client";

import Link from 'next/link';
import React, { useState, useEffect, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '@/components/utils/AuthService';
import { Dialog, Transition } from '@headlessui/react';

interface Project {
    id: number;
    name: string;
    description: string;
}

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState<Project[]>([]);
    const [deleteInd, setDeleteInd] = useState(-1);

    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false)
    };

    function openModal() {
        setIsOpen(true)
    };

    const projectsPerPage = 3;
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    useEffect(() => {
        // Create a scoped async function within the hook.
        const fetchUser = async () => {
            try {
                const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
                handleRequest(token)
            }
            catch (error: any) {
                console.error(error);
            }

        };
        // Execute the created function directly
        fetchUser();

    }, []);

    useEffect(() => {
        const signed_in = sessionStorage.getItem('signed_in');
        console.log(signed_in);
        if (signed_in && signed_in === 'true') {
            toast.success('Sign in successfully', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
        sessionStorage.removeItem('signed_in');
    });

    const handleRequest = async (token: string) => {
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch('/api/get_projects', {
                method: 'POST',
                headers: headers,
            });

            if (response.ok) {
                const data = await response.json();
                setProjects(data.projects);
            } else {
                // Handle error cases
                console.error('Failed to fetch projects:', response.status);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleProjectClick = (projectId: number) => {

        // Open the project detail page in a new tab
        window.open(`/project/${projectId}`, '_blank');
    };

    const handleDelete = (e: React.MouseEvent<HTMLDivElement>, projectId: number) => {
        e.stopPropagation();
        // Modal for warning
        setDeleteInd(projectId);
        setIsOpen(true);
    };

    const confirmDelete = async () => {
        setIsOpen(false);
        if (deleteInd == -1) {
            throw "Error";
        }
        const projectDeleteData = {
            project_id: deleteInd
        }
        try {
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch("/api/delete_project", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(projectDeleteData),
            });
            if (response.ok) {
                const projectDeleteFeedback = await response.json();
                if (response.status === 200) {
                    setProjects(projects.filter(proj => proj.id !== deleteInd));
                    toast.success("Project deleted successfully", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    // error handling does not work
                    toast.error(projectDeleteFeedback.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
        setDeleteInd(-1);
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
                initializeUser(token)
            } catch (error: any) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);

    const initializeUser = async (token: string) => {
        const headers = new Headers();
        if(token){
            headers.append('Authorization', `Bearer ${token}`);
        }
        headers.append('Content-Type', 'application/json');

        const user =  await AuthService.getCurrentUser()
        const username = user.attributes['name'];
        const email = user.attributes['email'];

        const userData = {
          username: username,
          email: email,
          is_admin: user.is_admin
        };

        if (username !== null) {
            // If user is not found, initialize new user
            console.log("New user initializing...");
            try {
                const createUserResponse  = await fetch('/api/create_user', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(userData)
                });
                if (createUserResponse.ok) {
                    console.log("Initialized successfully.")
                } else {
                    console.error('Failed to initialize user:', createUserResponse.status);
                    const errorData = await createUserResponse.json();
                    console.log('Error message:', errorData.message);
                }
            } catch (error) {
                console.error('Error initializing user:', error);
            }
        }  
    }



    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <ToastContainer />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1 text-blue-600">User Dashboard</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        {currentProjects.map((project) => (
                            <div
                                key={project.id}
                                className="flex border-solid border-2 border-blue-600 p-4 rounded-md shadow-md cursor-pointer"
                                onClick={() => handleProjectClick(project.id)}
                            >
                                <div className='grow'>
                                    <h2 className="text-lg font-semibold">{project.name}</h2>
                                    <p className="text-sm mt-2">{project.description}</p>
                                </div>
                                <div className='text-lg opacity-25 hover:opacity-100' onClick={e => handleDelete(e, project.id)}>
                                    <svg className='w-12' data-name="Capa 1" id="Capa_1" viewBox="0 0 20 19.84" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                    {projects.length > 0 && (
                        <div className="flex justify-center items-center mt-6">
                            {!projects.length || currentPage === 1 ? (
                                <button
                                    className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md opacity-50 cursor-not-allowed mr-2`}
                                    disabled
                                    style={{ minWidth: '120px' }}
                                >
                                    Previous
                                </button>
                            ) : (
                                <button
                                    className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md mr-2`}
                                    onClick={goToPreviousPage}
                                    style={{ minWidth: '120px' }}
                                >
                                    Previous
                                </button>
                            )}
                            {!projects.length || currentPage === totalPages ? (
                                <button
                                    className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md opacity-50 cursor-not-allowed`}
                                    disabled
                                    style={{ minWidth: '120px' }}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md`}
                                    onClick={goToNextPage}
                                    style={{ minWidth: '120px' }}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                    <div className="flex justify-center items-center mt-8">
                        <Link href="/workflow-create-project">
                            <span className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-md cursor-pointer">
                                Start New Project
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Delete Project?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Deleted Project cannot be restored.
                                        </p>
                                    </div>

                                    <div className="flex">
                                        <div className="flex justify-center mt-4">
                                            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mr-2 btn-size"
                                                onClick={confirmDelete}>
                                                Yes
                                            </button>
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2 btn-size"
                                                onClick={closeModal}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section>
    );
}

