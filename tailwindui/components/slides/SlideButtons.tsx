import mixpanel from 'mixpanel-browser';
import React from 'react';
import AuthService from '../utils/AuthService';

type SaveButtonProps = {
    saveSlides: () => void;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ saveSlides }) => {
    return (
        <div className='col-span-1'>
            <div className='w-fit h-fit rounded-full overflow-hidden'>
                <button
                    className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
                    onClick={saveSlides}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

type PresentButtonProps = {
    openPresent: () => void;
};

export const PresentButton: React.FC<PresentButtonProps> = ({ openPresent }) => {
    return (
        <div className='col-span-1 hidden sm:block'>
            <div className='w-fit h-fit rounded-full overflow-hidden'>
                <button
                    className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
                    onClick={openPresent}
                >
                    Present
                </button>
            </div>
        </div>
    );
};

type ShareToggleButtonProps = {
    share: boolean;
    setShare: (share: boolean) => void;
};

export const ShareToggleButton: React.FC<ShareToggleButtonProps> = ({ share, setShare }) => {

    const toggleShare = async () => {
        const newShareStatus = !share;
        // console.log('newShareStatus', newShareStatus);
        setShare(newShareStatus);
        const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
        try {

            mixpanel.track('Project Shared', {
                'Project ID': sessionStorage.getItem('project_id'),
            });

            const response = await fetch("/api/share_project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    project_id: sessionStorage.getItem('project_id'), // Replace with your project's ID
                    is_shared: newShareStatus,
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                sessionStorage.setItem('is_shared', newShareStatus.toString());
            } else {
                // Handle error (e.g., show a notification to the user)
                console.error(responseData.error);
            }
        } catch (error) {
            console.error("Failed to toggle share status:", error);
            // Handle error (e.g., show a notification to the user)
        }
    };

    return (
        <div className='col-span-1'>
            <div className='w-fit h-fit rounded-full overflow-hidden'>
                <button
                    className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
                    onClick={toggleShare}
                >
                    {!share ? 'Share' : 'Stop Sharing'}
                </button>
            </div>
        </div>
    );
};

export const SlideNavigator: React.FC<{
    currentSlideIndex: number;
    slides: any[]; // Replace 'any' with the appropriate type if known
    goToSlide: (index: number) => void;
}> = ({ currentSlideIndex, slides, goToSlide }) => {
    return (
        <div className='col-span-1'>
            <div className='w-fit h-fit flex flex-row items-center justify-center mx-auto rounded-full bg-slate-600/40'>
                <button
                    disabled={currentSlideIndex === 0}
                    className='text-white text-2xl mx-4 my-1 disabled:text-gray-400'
                    onClick={() => goToSlide(currentSlideIndex - 1)}
                >
                    &#9664;
                </button>
                <div className='text-white'>
                    {currentSlideIndex + 1}<span className='font-light'>{' of '}</span>{slides.length}
                </div>
                <button
                    disabled={currentSlideIndex === slides.length - 1}
                    className='text-white text-2xl mx-4 my-1 disabled:text-gray-400'
                    onClick={() => goToSlide(currentSlideIndex + 1)}
                >
                    &#9654;
                </button>
            </div>
        </div>
    );
};


