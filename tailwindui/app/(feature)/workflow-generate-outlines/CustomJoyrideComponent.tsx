// MyCustomJoyride.tsx

import React from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

interface CustomStep extends Step {
    // Add custom properties if needed
}

const tourSteps: CustomStep[] = [
    {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: 'center',
        target: 'body',
    },
    // Add more steps as needed
];

const MyCustomJoyride: React.FC = () => {
    const handleJoyrideCallback = (data: CallBackProps) => {
        // Handle Joyride callbacks if needed
        console.log(data);
    };

    return (
        <Joyride
            steps={tourSteps}
            continuous
            scrollToFirstStep
            showProgress
            showSkipButton
            locale={{
                back: 'Previous',
                close: 'Close',
                last: 'End Tour',
                next: 'Next',
                skip: 'Skip Tour',
            }}
            styles={{
                options: {
                    zIndex: 1000,
                },
            }}
            callback={handleJoyrideCallback}
            // Add more customization props as needed
        />
    );
};

export default MyCustomJoyride;
