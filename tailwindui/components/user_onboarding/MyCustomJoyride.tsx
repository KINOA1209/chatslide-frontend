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
          options: {
            arrowColor: '#FF5733', // Customize arrow color
            backgroundColor: '#FFF', // Customize the background color of the tooltip
            overlayColor: 'rgba(0, 0, 0, 0.5)', // Customize the overlay color
            primaryColor: 'none', // Customize the primary color (text color, button color, etc.)
            textColor: 'none', // Customize the text color
          },
          buttonBack: {
            // color: '#ffffff', // Customize the back button color
            // background: '#FF5733', // Customize the back button background color
            // border: '2px solid #FF5733',
            // borderRadius: '8px',
            // padding: '10px 20px',
            // marginRight: '10px',
            // cursor: 'pointer',
            // fontWeight: 'bold',
          },
          buttonClose: {
            color: '#707C8A', // Customize the close button color
            // background: '#FF5733', // Customize the close button background color
          },
          buttonNext: {
            // width: 100,
            // height: 40,
            // paddingLeft: 7.4,
            // paddingRight: 7.4,
            // paddingTop: 2.47,
            // paddingBottom: 2.47,
            // background: '#2943E9',
            // borderRadius: 4.94,
            // overflow: 'hidden',
            // justifyContent: 'center',
            // alignItems: 'center',
            // gap: 6.17,
            // display: 'inline-flex',
            // textAlign: 'center',
            // color: '#F4F4F4',
            // fontSize: 15,
            // fontFamily: 'Creato Display',
            // fontWeight: '500',
            // lineHeight: 14.81,
            // letterSpacing: 0.6,
            // wordWrap: 'break-word',
          },
          buttonSkip: {
            // color: '#ffffff', // Customize the skip button color
            // background: '#FF5733', // Customize the skip button background color
          },
        }}
        callback={handleJoyrideCallback}
        run={isTourActive}
      />
    </>
  );
};

export default MyCustomJoyride;
