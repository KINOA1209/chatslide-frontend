import React, { useState, useEffect } from 'react';
import {LoadingBar} from '@/components/progress';

const Timer = ({ expectedSeconds, isSubmitting }: { expectedSeconds: number, isSubmitting: boolean }) => {
    if (!isSubmitting) {
        return null;
    }


    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isSubmitting) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        } else {
            setTimer(0);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isSubmitting]);

    return (
        <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
            <p>
                This usually takes {expectedSeconds} seconds. Time elapsed: {timer} seconds.
            </p>
            <p>
                You can safely close the window and come back later.
            </p>
            </span>

        </div>
    );
};

const LoadingTimer = ({ expectedSeconds, isSubmitting }: { expectedSeconds: number, isSubmitting: boolean }) => {
    if (!isSubmitting) {
        return null;
    }


    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isSubmitting) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        } else {
            setTimer(0);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isSubmitting]);

    return (
        <div className="mt-4 text-center">
            <div className='flex justify-center'>
                <div className='max-w-sm w-full'>
                    <LoadingBar />
                </div>
            </div>
            <span className="text-sm text-gray-500 mt-4">
                <p>
                    This usually takes {expectedSeconds} seconds. 
                     {/* Time elapsed: {timer} seconds. */}
                </p>
                <p>
                    You can safely close the window and come back later.
                </p>
            </span>
        </div>
    );
};


export default LoadingTimer;
