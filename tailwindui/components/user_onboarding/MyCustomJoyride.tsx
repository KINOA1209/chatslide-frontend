// MyCustomJoyride.tsx
import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { UserOnboardingButton } from '../button/DrlambdaButton';
import ExitUserGuideWarningImg from '@/public/images/user_onboarding/ExitTourWarning.png';
import { ExitTourButton } from './UserOnboardingButtons';
import ExitTourButtonImg from '@/public/images/user_onboarding/ExitTourButton.png';
export interface CustomStep extends Step {
	// Add custom properties if needed
}

interface MyCustomJoyrideProps {
	steps: CustomStep[];
}

const MyCustomJoyride: React.FC<MyCustomJoyrideProps> = ({ steps }) => {
	const [isTourActive, setIsTourActive] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	// const [currentStep, setCurrentStep] = useState<number>(0);
	const handleJoyrideCallback = (data: CallBackProps) => {
		console.log(data);
		// setCurrentStep(data.index);
		if (data.action === 'skip') {
			// Show the confirmation tooltip when skipping the tour
			setShowConfirmation(true);
			setIsTourActive(true);
		} else if (data.action === 'close') {
			// If CLOSE (End Tour) or RESET (outside click) occurs, reset the tour
			setIsTourActive(false);
			setShowConfirmation(true);
		}
	};
	// const shouldShowOverlay = steps[currentStep]?.target !== 'body';
	const startTour = () => {
		setIsTourActive(true);
		setShowConfirmation(false); // Ensure confirmation tooltip is hidden
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

	const handleExitTour = () => {
		setIsTourActive(false);
		setShowConfirmation(true);
	};

	return (
		<>
			{/* {shouldShowOverlay && <div className='custom-overlay' />} */}
			<ExitTourButton
				onClick={handleExitTour}
				imgSRC={ExitTourButtonImg.src}
				isTourActive={isTourActive}
			></ExitTourButton>
			<UserOnboardingButton onClick={startTour}></UserOnboardingButton>
			<Joyride
				steps={steps}
				continuous
				scrollToFirstStep
				showProgress
				showSkipButton
				disableOverlayClose
				disableCloseOnEsc
				spotlightClicks
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
						className='confirmation-overlay fixed inset-0 bg-black bg-opacity-50 z-50'
						onClick={() => handleConfirmation(false)} // Close the confirmation on overlay click
					></div>
					<div className='confirmation-tooltip bg-white p-8 rounded-lg shadow-lg fixed top-1/2 left-1/2 w-[31rem] h-auto transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col'>
						<img src={ExitUserGuideWarningImg.src} alt='Exit warning' />
						{/* explaining text */}
						<div className='flex flex-col items-start gap-[0.5rem]'>
							<div className='pt-[2rem] text-neutral-900 text-xl font-bold font-creato-bold leading-tight tracking-tight'>
								Are you sure to leave the tutorial?
							</div>
							<p className='text-neutral-800 text-base font-normal font-creato=regular leading-normal tracking-tight text-left'>
								You could always come back via the help section on the header.
							</p>
						</div>
						<div className='pt-[3rem] flex flex-row items-center justify-end gap-[0.75rem]'>
							<div
								onClick={() => handleConfirmation(true)}
								className='w-24 h-10 px-2 py-0.5 rounded border border-[#2943E9] justify-center items-center gap-1.5 inline-flex cursor-pointer'
							>
								<span className='text-center text-[#2943E9] text-base font-medium font-creato-medium leading-none tracking-wide'>
									Quit
								</span>
							</div>
							<div
								onClick={() => handleConfirmation(false)}
								className='w-24 h-10 px-2 py-0.5 bg-[#2943E9] rounded justify-center items-center gap-1.5 inline-flex cursor-pointer'
							>
								<span className='text-center text-zinc-100 text-base font-medium font-creato-medium leading-none tracking-wide'>
									Not now
								</span>
							</div>
						</div>
					</div>
					{/* <div></div> */}
				</>
			)}
		</>
	);
};

export default MyCustomJoyride;
