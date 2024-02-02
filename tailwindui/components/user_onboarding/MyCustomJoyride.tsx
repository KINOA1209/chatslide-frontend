// MyCustomJoyride.tsx
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled, { keyframes } from 'styled-components';
import Joyride, {
	CallBackProps,
	Step,
	BeaconRenderProps,
	TooltipRenderProps,
} from 'react-joyride';
import { UserOnboardingButton } from '../button/DrlambdaButton';
import ExitUserGuideWarningImg from '@/public/images/user_onboarding/ExitTourWarning.png';
import { ExitTourButton } from './UserOnboardingButtons';
import ExitTourButtonImg from '@/public/images/user_onboarding/ExitTourButton.png';
import {
	ExitConfirmationWindow,
	TutorialEndStepPromptWindow,
} from './CustomComponents';
import { OnboardingFeedbackForm } from './OnboardingFeedback';
import useTourStore from './TourStore';

export interface CustomStep extends Step {
	// Add custom properties if needed
}

interface MyCustomJoyrideProps {
	steps: CustomStep[];
}

const MyCustomJoyride: React.FC<MyCustomJoyrideProps> = ({ steps }) => {
	// const [isTourActive, setIsTourActive] = useState(true);
	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showFeedbackWindow, setShowFeedbackWindow] = useState(false);
	const [showTourEndPromptWindow, setShowTourEndPromptWindow] = useState(false);
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(() => {
		if (typeof window !== 'undefined') {
			const storedPage = localStorage.getItem('currentWorkflowPage');
			return storedPage || ''; // Use the stored value or an empty string if not present
		} else {
			return ''; // Default value if not running in a browser environment
		}
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
			if (hasSeenOnboarding) {
				// If the user has not seen the onboarding, start the tour
				setIsTourActive(false);
			}
		}
	}, []);

	useEffect(() => {
		console.log('current page: ', currentPage);
	}, [currentPage]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const currentWorkflowPage = localStorage.getItem('currentWorkflowPage');
			if (currentWorkflowPage) {
				// If the user has not seen the onboarding, start the tour
				setCurrentPage(currentWorkflowPage);
			}
		}
	}, []);

	// const [currentStep, setCurrentStep] = useState<number>(0);
	const handleJoyrideCallback = (data: CallBackProps) => {
		// console.log(data);
		// setCurrentStep(data.index);
		if (data.action === 'skip') {
			// Show the confirmation tooltip when skipping the tour
			setShowConfirmation(true);
			setIsTourActive(true);
			setShowFeedbackWindow(false);
		} else if (data.action === 'close') {
			// If CLOSE (End Tour) or RESET (outside click) occurs, reset the tour
			setIsTourActive(false);
			setShowConfirmation(true);
		} else if (data.action === 'reset') {
			setIsTourActive(false);
			setShowFeedbackWindow(true);
		}

		// Check if the current step is the last step and the page is "SlidesPage"
		const isLastStep = data.index === steps.length - 1;
		if (isLastStep && currentPage === 'SlidesPage') {
			setShowTourEndPromptWindow(true);
		}
	};
	// const shouldShowOverlay = steps[currentStep]?.target !== 'body';
	// const startTour = () => {
	// 	setIsTourActive(true);
	// 	setShowConfirmation(false); // Ensure confirmation tooltip is hidden
	// };

	const handleConfirmation = (confirmed: boolean) => {
		// Handle the user's choice (confirmed or not)
		if (confirmed) {
			localStorage.setItem('hasSeenOnboarding', 'true');
			// User confirmed, reset the tour or perform other actions
			setIsTourActive(false);
			setShowConfirmation(false);
			setShowFeedbackWindow(false);
			setShowTourEndPromptWindow(false);
		} else {
			// User chose not to skip the tour, hide the confirmation tooltip
			// If the user chose not to skip, you can set the flag to true or omit this part
			// depending on whether you want to show the onboarding every time or only the first time
			localStorage.setItem('hasSeenOnboarding', 'true');
			setIsTourActive(true);
			setShowConfirmation(false);
			setShowFeedbackWindow(false);
			setShowTourEndPromptWindow(false);
		}
	};

	const handleExitTour = () => {
		setIsTourActive(false);
		setShowConfirmation(true);
	};

	const handleConfirmingForward = (confirmed: boolean) => {
		if (confirmed) {
			router.push('/subscription');
		} else {
			setShowTourEndPromptWindow(false);
		}
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
				// beaconComponent={CustomBeacon}
				locale={{
					back: 'Back',
					close: 'Close',
					last: 'End Tour',
					next: 'Next',
					skip: 'Skip Tour',
					open: 'Open Tooltip',
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
				// <FeedbackWindow onClose={() => setShowFeedbackWindow(false)} />
				<OnboardingFeedbackForm
					onClose={() => setShowFeedbackWindow(false)}
					message='How was your experience on Current Page?'
					textRequired={true}
				/>
			)}
			{showConfirmation && (
				<ExitConfirmationWindow
					onConfirmation={handleConfirmation}
				></ExitConfirmationWindow>
			)}
			{currentPage === 'SlidesPage' && showTourEndPromptWindow && (
				<TutorialEndStepPromptWindow
					onClose={() => setShowTourEndPromptWindow(false)}
					onConfirmingForward={handleConfirmingForward}
				></TutorialEndStepPromptWindow>
			)}
		</>
	);
};

export default MyCustomJoyride;
