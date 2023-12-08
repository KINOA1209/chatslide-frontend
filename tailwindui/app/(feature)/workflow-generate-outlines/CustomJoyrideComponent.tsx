// MyCustomJoyride.tsx

import React, { useState } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

interface CustomStep extends Step {
    // Add custom properties if needed
}

const MyCustomJoyride: React.FC = () => {
    const [isTourActive, setIsTourActive] = useState(false);
    const [tourSteps, setTourSteps] = useState<CustomStep[]>([]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        // Handle Joyride callbacks if needed
        console.log(data);

        if (
            data.action === 'skip' ||
            data.action === 'close' ||
            data.action === 'reset'
        ) {
            // If SKIP, CLOSE (End Tour), or RESET (outside click) occurs, reset the tour
            setIsTourActive(false);
        }
    };

    const startTour = () => {
        setIsTourActive(true);
    };

    // Update this function with your actual images and content
    const getImagePlaceholder = (index: number) => {
        return `https://via.placeholder.com/300x200.png?text=Step+${index + 1}`;
    };

    const generateTourSteps = () => {
        const steps: CustomStep[] = [
            {
                target: 'body',
                content: (
                    <div>
                        <h2>Welcome to the Tour!</h2>
                        <p>This is the first step with a placeholder image.</p>
                        <img
                            src={getImagePlaceholder(0)}
                            alt='Step 1'
                        />
                    </div>
                ),
                locale: { skip: <strong>SKIP</strong> },
                placement: 'center',
                disableBeacon: true,
            },
            // Add more steps as needed
            {
                target: '#SummaryStep-3',
                content: (
                    <div>
                        <h2>Step 2</h2>
                        <p>This step has another placeholder image.</p>
                        <img
                            src={getImagePlaceholder(1)}
                            alt='Step 2'
                        />
                    </div>
                ),
                locale: { back: 'Back', next: 'Next' },
                placement: 'bottom',
            },
            {
                target: '#SummaryStep-3',
                content: (
                    <div>
                        <h2>Step 3</h2>
                        <p>And here's a third step with an icon.</p>
                        <i
                            className='fa fa-star'
                            style={{ fontSize: '24px', color: 'gold' }}
                        ></i>
                    </div>
                ),
                locale: { back: 'Back', next: 'Next' },
                placement: 'bottom',
            },
        ];

        setTourSteps(steps);
    };

    // Generate tour steps when the component mounts
    React.useEffect(() => {
        generateTourSteps();
    }, []);

    return (
        <>
            <button
                className='fixed top-4 left-[10rem] bg-purple-500 text-blue-500 px-4 py-2 rounded cursor-pointer z-50'
                onClick={startTour}
            >
                Begin a user guide tour
            </button>
            <Joyride
                steps={tourSteps}
                continuous
                scrollToFirstStep
                showProgress
                showSkipButton
                locale={{
                    back: 'Back',
                    close: 'Close',
                    last: 'End Tour',
                    next: 'Next',
                    skip: 'Skip Tour',
                }}
                styles={{
                    tooltip: {
                        backgroundColor: '#6A1B9A', // Purple background
                        color: '#2196F3', // Blue text color
                    },
                }}
                callback={handleJoyrideCallback}
                run={isTourActive}
                // Add more customization props as needed
            />
        </>
    );
};

export default MyCustomJoyride;
