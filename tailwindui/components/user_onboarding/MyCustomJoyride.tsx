// MyCustomJoyride.tsx
import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { UserOnboardingButton } from '../button/DrlambdaButton';
import ExitUserGuideWarningImg from '@/public/images/user_onboarding/ExitTourWarning.png';
import { ExitTourButton } from './UserOnboardingButtons';
import ExitTourButtonImg from '@/public/images/user_onboarding/ExitTourButton.png';
import { ExitConfirmationWindow } from './CustomComponents';
import { FeedbackWindow } from './CustomComponents';

export interface CustomStep extends Step {
	// Add custom properties if needed
}

interface MyCustomJoyrideProps {
	steps: CustomStep[];
}

const MyCustomJoyride: React.FC<MyCustomJoyrideProps> = ({ steps }) => {
	const [isTourActive, setIsTourActive] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showFeedbackWindow, setShowFeedbackWindow] = useState(false);
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
		} else if (data.action === 'reset') {
			setIsTourActive(false);
			setShowFeedbackWindow(true);
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
						arrowColor: '#FFFFFF', // Customize arrow color
						backgroundColor: '#FFFFFF', // Customize the background color of the tooltip
						overlayColor: 'rgba(0, 0, 0, 0.5)', // Customize the overlay color
						primaryColor: 'none', // Customize the primary color (text color, button color, etc.)
						textColor: 'none', // Customize the text color
					},

					buttonBack: {},
					buttonClose: {
						color: '#707C8A', // Customize the close button color
						// background: '#FF5733', // Customize the close button background color
					},
					buttonNext: {},
					buttonSkip: {},
					tooltipFooterSpacer: {
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-end',
						paddingRight: 0,
					},
				}}
				callback={handleJoyrideCallback}
				run={isTourActive}
			/>
			{showFeedbackWindow && (
				<FeedbackWindow onClose={() => setShowFeedbackWindow(false)} />
			)}
			{showConfirmation && (
				<ExitConfirmationWindow
					onConfirmation={handleConfirmation}
				></ExitConfirmationWindow>
			)}
		</>
	);
};

export default MyCustomJoyride;
