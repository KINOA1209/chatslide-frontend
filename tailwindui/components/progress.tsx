import { useState, useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react'
import { listenerCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full h-2 bg-slate-200 rounded overflow-hidden">
                {/* <div className="w-[50%] h-full bg-gradient-to-r from-blue-600 from-70% to-green-500 rounded"></div> */}
                {/* use pure color for now */}
                <div className="h-full bg-blue-600 rounded" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}

interface timedProgressBarProps {
    duration: number;
}

// duration: time in seconds
export const TimedProgressBar = ({ duration }: timedProgressBarProps) => {
    const [percentage, setPercentage] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPercentage(prevPercentage => {
                if (prevPercentage >= 100) {
                    clearInterval(interval);
                    return prevPercentage;
                }
                return prevPercentage + 0.1;
            });
        }, duration);

        return () => clearInterval(interval);
    }, []);

    return (
        <ProgressBar percentage={percentage} />
    )

}

export const LoadingBar = () => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animationProp = [
            { backgroundPosition: "0px 100%" },
            { backgroundPosition: "85px 100%" },
        ];

        const animationTiming = {
            duration: 1000,
            iterations: Infinity,
        };

        if (barRef.current) {
            barRef.current.animate(animationProp, animationTiming);
        }
    }, []);


    // const backgroundStyle = 'repeating-linear-gradient(90deg, red,green,blue, green, red)'
    const backgroundStyle = 'repeating-linear-gradient(45deg, #0070f4, #0070f4 5px, #6ca3e4 5px,#6ca3e4 15px, #0070f4 15px, #0070f4 20px)'

    return (
        <div className="w-full flex justify-center">
            <div className="w-full h-2 bg-slate-200 rounded overflow-hidden">
                <div className="w-full h-full rounded" ref={barRef} style={{ backgroundImage: backgroundStyle, backgroundSize: '85px 100%'}}></div>
            </div>
        </div >
    )
}