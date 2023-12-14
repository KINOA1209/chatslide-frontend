// MyCustomJoyride.tsx
import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { UserOnboardingButton } from '../button/DrlambdaButton';

export interface CustomStep extends Step {
  // Add custom properties if needed
}

interface MyCustomJoyrideProps {
  steps: CustomStep[];
}

const MyCustomJoyride: React.FC<MyCustomJoyrideProps> = ({ steps }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleJoyrideCallback = (data: CallBackProps) => {
    console.log(data);

    if (data.action === 'skip') {
      // Show the confirmation tooltip when skipping the tour
      setShowConfirmation(true);
      setIsTourActive(true);
    } else if (data.action === 'close' || data.action === 'reset') {
      // If CLOSE (End Tour) or RESET (outside click) occurs, reset the tour
      setIsTourActive(false);
    }
  };

  const startTour = () => {
    setIsTourActive(true);
  };

  const handleConfirmation = (confirmed: boolean) => {
    // Handle the user's choice (confirmed or not)
    if (confirmed) {
      // User confirmed, reset the tour or perform other actions
      setIsTourActive(false);
      setShowConfirmation(false);
    } else {
      // User chose not to skip the tour, hide the confirmation tooltip
      setIsTourActive(true);
      setShowConfirmation(false);
    }
  };

  return (
    <>
      {/* <button
        className='fixed top-4 left-[10rem] bg-purple-500 text-blue-500 px-4 py-2 rounded cursor-pointer z-40'
        onClick={startTour}
      >
        Begin a user guide tour
      </button> */}
      <UserOnboardingButton onClick={startTour}></UserOnboardingButton>
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
      {showConfirmation && (
        <>
          <div
            className='confirmation-overlay fixed inset-0 bg-black bg-opacity-50 z-40'
            onClick={() => handleConfirmation(false)} // Close the confirmation on overlay click
          ></div>
          <div className='confirmation-tooltip bg-white p-8 rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <p className='text-lg mb-4'>Are you sure you want to quit?</p>
            <button
              onClick={() => handleConfirmation(true)}
              className='bg-red-500 text-white px-4 py-2 rounded mr-4'
            >
              Quit
            </button>
            <button
              onClick={() => handleConfirmation(false)}
              className='bg-gray-300 text-gray-700 px-4 py-2 rounded'
            >
              Not now
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MyCustomJoyride;
