"use client";

import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CSS from 'csstype';

interface StepProps {
    id: number,
    current: boolean,
    finished: boolean,
    desc: string,
    redirect: string
};

const StepStyle: CSS.Properties = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '3px',
    fontSize: '15px'
}


const OneStep: React.FC<StepProps> = ({ id, current, finished, desc, redirect }) => {
    const router = useRouter();

    let exitClass = 'bg-blue-500 border-blue-500 text-white text-center';
    let enterClass = 'bg-blue-700 border-blue-700 text-white text-center';
    let textEnterClass = 'text-blue-700 ml-3';

    const [circleClass, setCircleClass] = useState(exitClass);
    const [textClass, setTextClass] = useState('ml-3');

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        router.push(redirect);
    };

    const handleHoverEnter = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setCircleClass(enterClass);
        setTextClass(textEnterClass);
    }

    const handleHoverLeave = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setCircleClass(exitClass);
        setTextClass('ml-3');
    }

    if (current) {
        return (
            <div className='w-full h-14 flex items-center'>
                <div className='bg-white border-blue-500 text-blue-500 text-center' style={StepStyle}>{id}</div>
                <span className='text-blue-500 ml-3'>{desc}</span>
            </div>
        )
    } else if (finished) {
        return (
            <div className='w-full h-14 flex items-center cursor-pointer' onClick={handleClick} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                <div className={circleClass} style={StepStyle}>{id}</div>
                <span className={textClass}>{desc}</span>
            </div>
        )
    } else {
        return (
            <div className='w-full h-14 flex items-center'>
                <div className='bg-gray-400 border-gray-400 text-white text-center' style={StepStyle}>{id}</div>
                <span className='text-gray-400 ml-3'>{desc}</span>
            </div>
        )
    }
}

interface Current {
    currentInd: number,
    contentRef: React.RefObject<HTMLDivElement>
}

// General progress indicator component
const ProgressBox = (steps: string[], redirect: string[], finishedSteps: () => number[]) => {
    const stepRedirectPair = steps.map((desc, index) => { return [desc, redirect[index]] });
    const CurrentProgress: React.FC<Current> = ({ currentInd, contentRef }) => {
        const progressRef = useRef<HTMLDivElement>(null);
        // fire on every window resize
        useEffect(() => {
            function handleResize() {
                // Constants -> working for workflow now
                const minTitleHeight = 500;
                const headerHeight = 80;
                const gap = 20;

                const viewWidth = window.innerWidth;
                const viewHeight = window.innerHeight;
                var contentWidth = viewWidth;
                if (contentRef.current) { contentWidth = contentRef.current.offsetWidth; }
                var progressWidth = 0;
                var progressHeight = 0;
                if (progressRef.current) {
                    progressWidth = progressRef.current.offsetWidth;
                    progressHeight = progressRef.current.offsetHeight;
                }
                const marginAvailable = (viewWidth - contentWidth) / 2;
                if (progressRef.current && marginAvailable >= gap + progressWidth) {
                    progressRef.current.style.visibility = 'visible';
                    progressRef.current.style.left = `${marginAvailable - gap - progressWidth}px`;
                    progressRef.current.style.top = `${Math.max((viewHeight - headerHeight - progressHeight), minTitleHeight)/2}px`;
                } else if (progressRef.current) {
                    progressRef.current.style.visibility = 'hidden';
                }
            }
            handleResize();
            window.addEventListener('resize', handleResize);
        })
        return (
            <div style={{visibility: 'hidden'}} className='fixed w-fit select-none grow-0' ref={progressRef}>
                <div className='-top-4 p-5 mb-6 flex justify-center border-r-2 border-r-blue-200 sticky'>
                    <div className='w-fit flex flex-col flex-nowrap content-start'>
                        {stepRedirectPair.map((pair, index) => (
                            <OneStep
                                id={index + 1}
                                current={currentInd == index}
                                finished={finishedSteps().includes(index)}
                                desc={pair[0]}
                                redirect={pair[1]} />
                        ))}
                    </div>
                </div>
            </div>
        )
    };
    return CurrentProgress;
}

// Set up actual progress indicators with texts and redirections
const ProjectProgress = () => {
    const steps = ['Topic', 'Outlines', 'Slides', 'Transcript', 'Audio', 'Video'];
    const redirect = ['/workflow-generate-outlines',
        '/workflow-edit-outlines',
        '/workflow-review-slides',
        '/workflow-edit-transcript',
        '/workflow-review-audio',
        '/workflow-review-video'];
    const projectFinishedSteps: () => number[] = () => {
        const finishedStepsArray: number[] = [];
        if (typeof window !== 'undefined' && sessionStorage.getItem('topic')) {
            finishedStepsArray.push(0);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('outline')) {
            finishedStepsArray.push(1);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('image_files')) {
            finishedStepsArray.push(2);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('transcripts')) {
            finishedStepsArray.push(3);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('audio_files')) {
            finishedStepsArray.push(4);
        }
        if (typeof window !== 'undefined' && sessionStorage.getItem('video_file')) {
            finishedStepsArray.push(5);
        }
        return finishedStepsArray;
    }
    return ProgressBox(steps, redirect, projectFinishedSteps);
}

export default ProjectProgress();