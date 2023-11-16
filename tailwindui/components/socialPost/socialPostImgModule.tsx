import React, { useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import AuthService from '@/components/utils/AuthService';
import { LoadingIcon } from '@/components/ui/progress';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import PaywallModal from '@/components/forms/paywallModal';

interface ImgModuleProp {
    imgsrc: string,
    updateSingleCallback: Function,
    canEdit: boolean,
    autoSave: Function,
}

enum ImgQueryMode {
    RESOURCE,
    SEARCH,
    GENERATION,
}

export const ImgModule = ({ imgsrc, updateSingleCallback, canEdit, autoSave }: ImgModuleProp) => {
    const [showModal, setShowModal] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState<string[]>([]);
    const [resources, setResources] = useState<string[]>([]);
    const [searching, setSearching] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string>('')
    const searchRef = useRef<HTMLInputElement>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [hoverQueryMode, setHoverQueryMode] = useState<ImgQueryMode>(ImgQueryMode.RESOURCE);
    const [selectedQueryMode, setSelectedQueryMode] = useState<ImgQueryMode>(ImgQueryMode.RESOURCE);

    useEffect(() => {
        console.log(selectedQueryMode)
    }, [selectedQueryMode])

    useEffect(() => {
        if (imgsrc !== '') {
            setSelectedImg(imgsrc);
        }
    }, [imgsrc]);

    const openModal = () => {
        if (canEdit) {
            setShowModal(true);
        }
    }

    const closeModal = () => {
        setShowModal(false);
        setSearching(false);
    }

    const handleImageSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedQueryMode(ImgQueryMode.SEARCH);
        setSearchResult([]);
        setSearching(true);
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();

        const response = await fetch('/api/search_images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify({
                search_keyword: (e.target as HTMLFormElement).search_keyword.value
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                const error = response.status
                console.error(error, response);
            }
        }).then(parsedResponse => {
            setSearchResult(parsedResponse.data.images);
        }).catch(e => {
            console.error(e);
        });
        setSearching(false);
    }

    const handleImageGenerationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedQueryMode(ImgQueryMode.GENERATION);
        setSearchResult([]);
        setSearching(true);
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();

        const response = await fetch('/api/generate_images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify({
                prompt: (e.target as HTMLFormElement).search_keyword.value
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 402) {
                setShowPaymentModal(true);
            } else {
                const error = response.status
                console.error(error, response);
            }
        }).then(parsedResponse => {
            setSearchResult(parsedResponse.data.images);
        }).catch(e => {
            console.error(e);
        });
        setSearching(false);
    }

    function handleClickSearchInput(e: React.MouseEvent<HTMLDivElement>, textRef: React.RefObject<HTMLInputElement>) {
        if (textRef.current) {
            textRef.current.focus();
        }
    };

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // update image here to template & source html
        updateSingleCallback((e.target as HTMLImageElement).getAttribute('src'));
    }

    const fetchFiles = async (file_id?: string) => {
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
        const headers = new Headers();
        if (idToken) {
            headers.append('Authorization', `Bearer ${idToken}`);
        }
        headers.append('Content-Type', 'application/json');

        const resource_type = {
            resource_type: 'media',
        }

        try {
            const response = await fetch('/api/resource_info', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(resource_type)
            });
            if (response.ok) {
                const data = await response.json();
                const files = data.data.resources;
                const resourceTemps = files.map((resource: any) => {
                    if (file_id && resource.id === file_id) {
                        updateSingleCallback(resource.direct_url);
                    }
                    return resource.direct_url;
                });

                // extend the array to include images from pdf_images inside sessionStorage
                const pdf_images = JSON.parse(sessionStorage.getItem('pdf_images') || '[]');
                resourceTemps.push(...pdf_images);
                setResources(resourceTemps);
            } else {
                // Handle error cases
                console.error('Failed to fetch images', response.status);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const onFileSelected = async (file: File | null) => {
        if (file == null) {
            return;
        }
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
        const body = new FormData();
        body.append("file", file);
        const response = await fetch("/api/upload_user_file", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
            body: body
        }).then(response => {
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
                    containerId: "slides",
                });
                return response.json();
            } else {
                toast.error("File upload failed", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    containerId: "slides",
                });
                throw response.status, response;
            }
        }).then(parsedResponse => {
            const file_id = parsedResponse.data.file_id;
            fetchFiles(file_id);
        }).catch(error => console.error);
    };

    useEffect(() => {
        fetchFiles();
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const extensions = ["png", "jpg", "jpeg", "gif"]; // For checking logic
        const sizeLimit = 16 * 1024 * 1024; // 16mb
        const file = e.target.files ? e.target.files[0] : null;
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
                containerId: "slides",
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
                containerId: "slides",
            });
            return;
        }

        onFileSelected(file);
    };

    const handleClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }

    const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>, type: ImgQueryMode) => {
        setHoverQueryMode(type)
        console.log('hover', type)
    }

    const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>, type: ImgQueryMode) => {
        setHoverQueryMode(selectedQueryMode);
        console.log('out', selectedQueryMode)
    }

    const resourceSelectionDiv = (
        <div className='w-full h-full'>
            <div className='w-full h-full flex flex-col'>
                <div className='w-full h-full overflow-y-auto p-1'>
                    <div className='w-full h-fit grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2'>
                        <div onClick={handleClick} className='upload-image w-full h-fit rounded-md overflow-hidden aspect-square flex flex-col items-center justify-center bg-[#E7E9EB] hover:bg-[#CAD0D3] cursor-pointer'>
                            <input
                                type="file"
                                id="file-upload"
                                ref={inputFileRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <svg className='w-12 h-12' viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_250_2609)">
                                    <path d="M22.2859 25.7139V46.2853M22.2859 25.7139L15.4287 32.571M22.2859 25.7139L29.143 32.571" stroke="#A6B1BB" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M41.1429 27.7712C42.4164 27.0364 43.5176 26.0371 44.3722 24.8407C45.2269 23.6443 45.815 22.2786 46.0971 20.8356C46.3793 19.3926 46.3487 17.9059 46.0076 16.4758C45.6665 15.0456 45.0227 13.7052 44.1197 12.5449C43.2167 11.3846 42.0754 10.4313 40.7728 9.74943C39.4702 9.06754 38.0366 8.67284 36.5685 8.59194C35.1004 8.51104 33.6321 8.74582 32.2624 9.28045C30.8928 9.81507 29.6537 10.6371 28.6287 11.6912C27.7298 8.50205 25.7068 5.74616 22.9335 3.93297C20.1603 2.11979 16.8244 1.37192 13.5425 1.82763C10.2606 2.28333 7.25461 3.91179 5.08029 6.41196C2.90597 8.91213 1.71032 12.1149 1.71437 15.4283C1.7168 18.5453 2.78096 21.5685 4.73151 23.9998" stroke="#A6B1BB" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_250_2609">
                                        <rect width={48} height={48} fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div className='text-[#A6B1BB]'>Upload</div>
                        </div>
                        {resources.map((url, index) => {
                            if (url === selectedImg) {
                                return <div onClick={handleImageClick}
                                    key={index} className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square outline-[#5168F6] outline outline-2`}>
                                    <img className='w-full h-full object-cover' src={url} />
                                </div>
                            } else {
                                return <div onClick={handleImageClick}
                                    key={index} className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square hover:outline-[#5168F6] hover:outline outline-2`}>
                                    <img className='w-full h-full object-cover' src={url} />
                                </div>
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

    const imgSearchDiv = (
        <div className='w-full h-full flex flex-col'>
            <form onSubmit={handleImageSearchSubmit} className='w-full'>
                <div className="w-full form-input flex flex-row flex-nowrap mb-2 focus-within:border focus-within:border-gray-500 p-0 cursor-text rounded-xl"
                    onClick={e => handleClickSearchInput(e, searchRef)}>

                    <input
                        id="search_keyword"
                        type="text"
                        className=" text-gray-800 grow border-0 p-0 h-6 focus:outline-none focus:ring-0 mx-3 my-3 w-full overflow-hidden"
                        placeholder="Search from internet"
                        required
                        ref={searchRef}
                        onChange={e => { setKeyword(e.target.value); }}
                        value={keyword}
                    />
                    <div className='h-[22px] ml-[14px] my-auto mr-2' hidden={!searching}><LoadingIcon /></div>
                    {!searching && <button
                        type="submit"
                        className="my-1 ml-3 opacity-40 hover:opacity-100 mr-2"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>}
                </div>
            </form>
            <div className='w-full h-full overflow-y-auto p-1'>
                <div className='w-full h-fit grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2'>
                    {searchResult.map((url, index) => {
                        if (url === selectedImg) {
                            return <div onClick={handleImageClick}
                                key={index} className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square outline-[#5168F6] outline outline-[3px]`}>
                                <img className='w-full h-full object-cover' src={url} />
                            </div>
                        } else {
                            return <div onClick={handleImageClick}
                                key={index} className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square hover:outline-[#5168F6] hover:outline outline-[3px]`}>
                                <img className='w-full h-full object-cover' src={url} />
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    )

    const imgGenerationDiv = (
        <div className='w-full h-full flex flex-col'>
            <form onSubmit={handleImageGenerationSubmit} className='w-full'>
                <div className="w-full form-input flex flex-row flex-nowrap mb-2 focus-within:border focus-within:border-gray-500 p-0 cursor-text rounded-xl"
                    onClick={e => handleClickSearchInput(e, searchRef)}>

                    <input
                        id="search_keyword"
                        type="text"
                        className=" text-gray-800 grow border-0 p-0 h-6 focus:outline-none focus:ring-0 mx-3 my-3 w-full overflow-hidden"
                        placeholder="Generate from AI"
                        required
                        ref={searchRef}
                        onChange={e => { setKeyword(e.target.value); }}
                        value={keyword}
                    />
                    <div className='h-[22px] ml-[14px] my-auto mr-2' hidden={!searching}><LoadingIcon /></div>
                    {!searching && <button
                        type="submit"
                        className="my-1 ml-3 opacity-40 hover:opacity-100 mr-2"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>}
                </div>
            </form>
            <div className='w-full h-full overflow-y-auto p-1'>
                <div className='w-full h-fit grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2'>
                    {searchResult.map((url, index) => {
                        if (url === selectedImg) {
                            return <div onClick={handleImageClick}
                                key={index} className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square outline-[#5168F6] outline outline-[3px]`}>
                                <img className='w-full h-full object-cover' src={url} />
                            </div>
                        } else {
                            return <div onClick={handleImageClick}
                                key={index} className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square hover:outline-[#5168F6] hover:outline outline-[3px]`}>
                                <img className='w-full h-full object-cover' src={url} />
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    )

    return <>



        {/* select image modal */}
        {createPortal(<Transition
            className='h-[100vh] w-[100vw] z-10 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
            show={showModal}
            onClick={closeModal}
            enter="transition ease duration-300 transform"
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease duration-300 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-12"
        >
            {showPaymentModal && <PaywallModal setShowModal={setShowPaymentModal} message='Upgrade for more ⭐️credits.' />}
            <div className='grow md:grow-0'></div>
            <Transition
                className='bg-gray-100 w-full h-3/4 md:h-[65vh]
                    md:max-w-2xl z-20 rounded-t-xl md:rounded-xl drop-shadow-2xl 
                    overflow-hidden flex flex-col p-4'
                show={showModal}
                enter="transition ease duration-500 transform delay-300"
                enterFrom="opacity-0 translate-y-12"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease duration-300 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-12"
                onClick={e => { e.stopPropagation() }}
            >
                <h4 className="font-semibold text-xl text-center mb-3">Image</h4>
                <div className='grow mt-4 flex flex-col overflow-hidden'>
                    <div className='w-full flex flex-col'>
                        <div className='w-full flex flex-row justify-around gap-3'>
                            <button className='cursor-pointer whitespace-nowrap py-2 flex flex-row'
                                onClick={e => { setSelectedQueryMode(ImgQueryMode.RESOURCE); setSearchResult([]); setKeyword(''); }}
                                onMouseOver={e => { handleMouseOver(e, ImgQueryMode.RESOURCE) }}
                                onMouseOut={e => { handleMouseOut(e, ImgQueryMode.RESOURCE) }}
                            >
                                <div className='h-full w-full flex justify-center items-center'>
                                    <svg className='w-[20px] h-[20px] mr-2' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.71436 6.33105H14.2858V14.3311C14.2858 14.6342 14.1654 14.9248 13.951 15.1392C13.7367 15.3535 13.446 15.4739 13.1429 15.4739H2.85721C2.55411 15.4739 2.26342 15.3535 2.04909 15.1392C1.83476 14.9248 1.71436 14.6342 1.71436 14.3311V6.33105Z"
                                            stroke="#121212" strokeLinecap="round" strokeLinejoin="round" />
                                        <path
                                            d="M15.4282 5.18834V2.90262C15.4282 2.27144 14.9165 1.75977 14.2854 1.75977L1.71394 1.75977C1.08276 1.75977 0.571081 2.27144 0.571081 2.90262V5.18834C0.571081 5.81952 1.08276 6.33119 1.71394 6.33119L14.2854 6.33119C14.9165 6.33119 15.4282 5.81952 15.4282 5.18834Z"
                                            stroke="#121212" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.28564 9.75977H9.71422" stroke="#121212" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                My Resources
                            </button>
                            <button className='cursor-pointer whitespace-nowrap py-2 flex flex-row'
                                onClick={e => { setSelectedQueryMode(ImgQueryMode.SEARCH); setSearchResult([]); setKeyword(''); }}
                                onMouseOver={e => { handleMouseOver(e, ImgQueryMode.SEARCH) }}
                                onMouseOut={e => { handleMouseOut(e, ImgQueryMode.SEARCH) }}
                            >
                                <div className='h-full w-full flex justify-center items-center'>
                                    <svg className='w-[20px] h-[20px] mr-2' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_276_3476)">
                                            <path
                                                d="M6.59985 12.2007C9.69283 12.2007 12.2002 9.69331 12.2002 6.60034C12.2002 3.50736 9.69283 1 6.59985 1C3.50687 1 0.999512 3.50736 0.999512 6.60034C0.999512 9.69331 3.50687 12.2007 6.59985 12.2007Z"
                                                stroke="#121212" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.0005 15.001L10.8003 10.8008" stroke="#121212" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_276_3476">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                Search
                            </button>
                            <button className='cursor-pointer whitespace-nowrap py-2 flex flex-row'
                                onClick={e => { setSelectedQueryMode(ImgQueryMode.GENERATION); setSearchResult([]); setKeyword(''); }}
                                onMouseOver={e => { handleMouseOver(e, ImgQueryMode.GENERATION) }}
                                onMouseOut={e => { handleMouseOut(e, ImgQueryMode.GENERATION) }}
                            >
                                <div className='h-full w-full flex justify-center items-center'>
                                    <svg className='w-[20px] h-[20px] mr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 17.18 21.02 12 17.77 6.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                                stroke="#121212" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_276_3476">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                Generate (10 ⭐️)
                            </button>
                        </div>
                        <div className='w-full bg-slate-200'>
                            <div className={`w-1/3 h-[2px] bg-black 
                                ${hoverQueryMode == ImgQueryMode.SEARCH && 'ml-[33.3%]'} 
                                ${hoverQueryMode == ImgQueryMode.GENERATION && 'ml-[66.7%]'} 
                                transition-all ease-in-out`}>
                            </div>
                        </div>
                    </div>

                    <div className='mt-3 mb-5 grow overflow-hidden'>
                        {selectedQueryMode == ImgQueryMode.RESOURCE && resourceSelectionDiv}
                        {selectedQueryMode == ImgQueryMode.SEARCH && imgSearchDiv}
                        {selectedQueryMode == ImgQueryMode.GENERATION && imgGenerationDiv}
                    </div>

                </div>
                <div className="w-full mx-auto">
                    <div className="w-full flex flex-wrap">
                        <div className="w-full">
                            <button
                                className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full rounded-lg"
                                type="button"
                                onClick={e => { e.preventDefault(); closeModal(); autoSave(); }}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Transition>, document.body)}


        {/* image itsefl */}
        <div onClick={openModal}
            className={`w-full h-full transition ease-in-out duration-150 ${selectedImg === '' ? 'bg-[#E7E9EB]' : canEdit ? 'hover:bg-[#CAD0D3]' : ''} flex flex-col items-center justify-center cursor-pointer`}>

            {selectedImg === '' ?
                <div className='flex flex-col items-center justify-center'>
                    <svg className="w-20 h-20 opacity-50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" fill="none" width="24" height="24" />
                        <g>
                            <path
                                d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z" />
                        </g>
                    </svg>
                    <div className="text-black opacity-50">
                        {canEdit && 'Click to add image'}
                    </div>
                </div>
                :
                <img
                    style={{ objectFit: 'contain' }}
                    className={`transition ease-in-out duration-150 ${canEdit ? 'hover:brightness-90' : 'cursor-default'}`}
                    src={imgsrc} />
            }
        </div>
    </>
}