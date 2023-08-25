'use client'

import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Timer from '@/components/Timer';
import GoBackButton from '@/components/GoBackButton';
import ImageList from '@/components/ImageList';
import ProjectProgress from '@/components/steps';
import AuthService from '@/components/utils/AuthService';
import FeedbackForm from '@/components/feedback';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TranscriptVisualizer = ({ transcripts, imageUrls }: { transcripts: [], imageUrls: [] }) => {
    const [transcriptList, setTranscriptList] = useState<string[]>(transcripts);
    const router = useRouter();
    const [hasSlides, setHasSlides] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const slidesFlag = sessionStorage.getItem('image_files');
            if (slidesFlag !== null) {
                setHasSlides(true);
            }
        }
    }, []);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newData = [...transcriptList]; // copying the old datas array
        newData[index] = event.target.value; // replace e.target.value with whatever you want to change it to
        sessionStorage.setItem('transcripts', JSON.stringify(newData));
        setTranscriptList(newData); // use the copy to set the state            
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("submitting");
        event.preventDefault();
        sessionStorage.setItem('transcripts', JSON.stringify(transcriptList));

        setIsSubmitting(true);

        const foldername = typeof window !== 'undefined' ? sessionStorage.getItem('foldername') : null;
        const topic = typeof window !== 'undefined' ? sessionStorage.getItem('topic') : null;
        const language = typeof window !== 'undefined' ? sessionStorage.getItem('language') : 'English';

        const formData = {
            res: transcriptList,
            foldername: foldername,
            topic: topic,
            language: language,
        };

        console.log(formData);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch('/api/generate_audio', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
                setIsSubmitting(false);
                // Store the data in local storage
                console.log(resp.data);
                sessionStorage.setItem('audio_files', JSON.stringify(resp.data.res));

                // Redirect to a new page with the data
                router.push('workflow-review-audio');
            } else {
                alert("Request failed: " + response.status);
                console.log(response)
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    };

    const handleUpdateScript = async (e: React.MouseEvent<HTMLButtonElement>, index: number, ask: string) => {
        e.preventDefault();
        const text = transcriptList[index];
        const updateData = {
            ask: ask,
            text: text,
        }
        console.log(updateData);

        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            const response = await fetch('/api/update_script', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const resp = await response.json();
                console.log(resp.data);
                const res = resp.data.res;
                // Update local data
                let newData = [...transcriptList];
                newData[index] = res;
                sessionStorage.setItem('transcripts', JSON.stringify(newData));
                setTranscriptList(newData);
                toast.success('Script has been updated!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

            } else {
                alert("Request failed: " + response.status);
                console.log(response)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const Loading = () => {
        const loadingRef = useRef<SVGSVGElement>(null);
        const loadingIcon = (<svg ref={loadingRef} className='h-full text-white' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.706 0.290 C 7.484 0.362,7.356 0.490,7.294 0.699 C 7.259 0.816,7.253 1.088,7.253 2.508 C 7.253 4.389,7.251 4.365,7.443 4.557 C 7.700 4.813,8.300 4.813,8.557 4.557 C 8.749 4.365,8.747 4.389,8.747 2.508 C 8.747 0.688,8.744 0.656,8.596 0.480 C 8.472 0.333,8.339 0.284,8.040 0.276 C 7.893 0.272,7.743 0.278,7.706 0.290 M2.753 2.266 C 2.595 2.338,2.362 2.566,2.281 2.728 C 2.197 2.897,2.193 3.085,2.269 3.253 C 2.343 3.418,4.667 5.750,4.850 5.843 C 5.109 5.976,5.375 5.911,5.643 5.649 C 5.907 5.391,5.977 5.111,5.843 4.850 C 5.750 4.667,3.418 2.343,3.253 2.269 C 3.101 2.200,2.901 2.199,2.753 2.266 M12.853 2.282 C 12.730 2.339,12.520 2.536,11.518 3.541 C 10.597 4.464,10.316 4.762,10.271 4.860 C 10.195 5.025,10.196 5.216,10.272 5.378 C 10.342 5.528,10.572 5.764,10.727 5.845 C 10.884 5.927,11.117 5.926,11.280 5.843 C 11.447 5.757,13.757 3.447,13.843 3.280 C 13.926 3.118,13.927 2.884,13.846 2.729 C 13.764 2.572,13.552 2.364,13.392 2.283 C 13.213 2.192,13.048 2.192,12.853 2.282 M0.699 7.292 C 0.404 7.385,0.258 7.620,0.258 7.999 C 0.259 8.386,0.403 8.618,0.698 8.706 C 0.816 8.741,1.079 8.747,2.508 8.747 C 3.997 8.747,4.196 8.742,4.318 8.702 C 4.498 8.644,4.644 8.498,4.702 8.318 C 4.788 8.053,4.745 7.677,4.608 7.491 C 4.578 7.451,4.492 7.384,4.417 7.343 L 4.280 7.267 2.547 7.261 C 1.152 7.257,0.791 7.263,0.699 7.292 M11.745 7.278 C 11.622 7.308,11.452 7.411,11.392 7.492 C 11.255 7.677,11.212 8.053,11.298 8.318 C 11.356 8.498,11.502 8.644,11.682 8.702 C 11.804 8.742,12.003 8.747,13.492 8.747 C 14.921 8.747,15.184 8.741,15.302 8.706 C 15.597 8.618,15.741 8.386,15.742 7.999 C 15.742 7.614,15.595 7.383,15.290 7.291 C 15.187 7.260,14.864 7.254,13.496 7.256 C 12.578 7.258,11.790 7.268,11.745 7.278 M4.853 10.282 C 4.730 10.339,4.520 10.536,3.518 11.541 C 2.597 12.464,2.316 12.762,2.271 12.860 C 2.195 13.025,2.196 13.216,2.272 13.378 C 2.342 13.528,2.572 13.764,2.727 13.845 C 2.884 13.927,3.117 13.926,3.280 13.843 C 3.447 13.757,5.757 11.447,5.843 11.280 C 5.926 11.118,5.927 10.884,5.846 10.729 C 5.764 10.572,5.552 10.364,5.392 10.283 C 5.213 10.192,5.048 10.192,4.853 10.282 M10.753 10.266 C 10.595 10.338,10.362 10.566,10.281 10.728 C 10.197 10.897,10.193 11.085,10.269 11.253 C 10.343 11.418,12.667 13.750,12.850 13.843 C 13.109 13.976,13.375 13.911,13.643 13.649 C 13.907 13.391,13.977 13.111,13.843 12.850 C 13.750 12.667,11.418 10.343,11.253 10.269 C 11.101 10.200,10.901 10.199,10.753 10.266 M7.745 11.277 C 7.620 11.309,7.451 11.412,7.392 11.492 C 7.254 11.678,7.253 11.691,7.253 13.489 C 7.253 14.921,7.259 15.184,7.294 15.302 C 7.382 15.597,7.615 15.741,8.000 15.741 C 8.385 15.741,8.618 15.597,8.706 15.302 C 8.768 15.090,8.767 11.875,8.704 11.690 C 8.644 11.514,8.575 11.430,8.420 11.346 C 8.310 11.286,8.246 11.271,8.057 11.264 C 7.930 11.259,7.790 11.265,7.745 11.277 "
                stroke="none" fillRule="evenodd" fill="#ffffff"></path>
        </svg>);

        const newspaperSpinning = [
            { transform: "rotate(0) scale(1)" },
            { transform: "rotate(360deg) scale(1)" },
        ];

        const newspaperTiming = {
            duration: 2000,
            iterations: Infinity,
        };

        if (loadingRef.current) {
            loadingRef.current.animate(newspaperSpinning, newspaperTiming);
        };

        return loadingIcon;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {transcriptList.map((data, index) => (
                <div tabIndex={index} className='w-full flex flex-col md:flex-row rounded border-solid border-2 border-blue-200 mt-4 focus-within:border-blue-600'>
                    <div className={`grid ${hasSlides ? 'sm:grid-rows-2' : 'sm:grid-rows-1'} md:grid-rows-1 ${hasSlides ? 'md:grid-cols-2' : 'md:grid-cols-1'} grow`}>
                        {hasSlides && <ImageList urls={[imageUrls[index]]} height={100} />}
                        <textarea
                            key={index}
                            className={`${!hasSlides && 'h-80'} block form-input w-full text-gray-800 mb-2 resize-none border-none p-4`}
                            value={data}
                            onChange={(event) => handleChange(index, event)}
                        // readOnly
                        />
                    </div>
                    <div className='flex flex-row items-center px-1.5 py-2 md:flex-col shrink-0'>
                        <button key={index + 'shorter'} className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={e => handleUpdateScript(e, index, 'shorter')}>
                            Shorter
                        </button>
                        <button key={index + 'funnier'} className="mt-4 btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={e => handleUpdateScript(e, index, 'funnier')}>
                            Funnier
                        </button>
                    </div>
                </div>
            ))}

            {/* Form */}
            <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full disabled:bg-gray-200 disabled:text-gray-400"
                            disabled={isSubmitting}>
                                {isSubmitting ? 'Generating...' : 'Generate Voice'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Timer expectedSeconds={60} isSubmitting={isSubmitting} />

        </div>
    );
};

export default function WorkflowStep4() {
    const transcriptData = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('transcripts') : null;
    const transcripts = transcriptData ? JSON.parse(transcriptData) : [];
    const foldername = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('foldername') : '';
    const image_files = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('image_files') || '[]') : [];
    const imageUrls = image_files.map((filename: string) => `/api/jpg?foldername=${foldername}&filename=${filename}`);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <ToastContainer />
            <ProjectProgress currentInd={3} contentRef={contentRef} />
            <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Edit Script</h1>
            </div>
            <div className="max-w-4xl mx-auto grow" ref={contentRef}>
                <p className='px-6'>
                    These are the scripts generated. Please edit the scripts to your liking.
                </p>
                <br />
                <TranscriptVisualizer transcripts={transcripts} imageUrls={imageUrls} />
            </div>
            <div className="fixed bottom-10 right-10">
                <button
                    onClick={handleOpenModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                >
                    Feedback
                </button>

                {showModal && <FeedbackForm onClose={handleCloseModal} />}
            </div>
        </div>
    )
}
