// MyCustomJoyride.tsx
import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

export interface CustomStep extends Step {
  // Add custom properties if needed
}

interface MyCustomJoyrideProps {
  steps: CustomStep[];
}

const MyCustomJoyride: React.FC<MyCustomJoyrideProps> = ({ steps }) => {
  const [isTourActive, setIsTourActive] = useState(false);

  const handleJoyrideCallback = (data: CallBackProps) => {
    console.log(data);

    if (
      data.action === 'skip' ||
      data.action === 'close' ||
      data.action === 'reset'
    ) {
      setIsTourActive(false);
    }
  };

  const startTour = () => {
    setIsTourActive(true);
  };

  return (
    <>
      <button
        className='fixed top-4 left-[10rem] bg-purple-500 text-blue-500 px-4 py-2 rounded cursor-pointer z-50'
        onClick={startTour}
      >
        Begin a user guide tour
      </button>
      <Joyride
        steps={steps}
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
            backgroundColor: '#6A1B9A',
            color: '#2196F3',
          },
        }}
        callback={handleJoyrideCallback}
        run={isTourActive}
      />
    </>
  );
};

export default MyCustomJoyride;
