// MyCustomJoyride.tsx
import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { UserOnboardingButton } from '../button/DrlambdaButton';
import ExitUserGuideWarningImg from '@/public/images/user_onboarding/ExitTourWarning.png';
import { ExitTourButton } from './UserOnboardingButtons';
import ExitTourButtonImg from '@/public/images/user_onboarding/ExitTourButton.png';
import { ExitConfirmationWindow } from './CustomComponents';
import { FeedbackWindow } from './CustomComponents';
const FeedbackWindowComponent = () => {
	return (
		<div
			style={{
				width: 510,
				height: 525,
				position: 'relative',
				background: 'white',
				borderRadius: 8,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: 0,
					height: 312,
					left: 592,
					top: -41,
					position: 'absolute',
					borderRadius: 2,
					border: '4px #E7E9EB solid',
				}}
			></div>
			<div
				style={{
					width: 148,
					height: 40,
					paddingLeft: 7.4,
					paddingRight: 7.4,
					paddingTop: 2.47,
					paddingBottom: 2.47,
					left: 329,
					top: 443,
					position: 'absolute',
					background: '#2943E9',
					borderRadius: 4.94,
					overflow: 'hidden',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 6.17,
					display: 'inline-flex',
				}}
			>
				<div
					style={{
						width: 99,
						textAlign: 'center',
						color: '#F4F4F4',
						fontSize: 15,
						fontFamily: 'Creato Display',
						fontWeight: '500',
						lineHeight: 14.81,
						letterSpacing: 0.6,
						wordWrap: 'break-word',
					}}
				>
					Next Section
				</div>
			</div>
			<div
				style={{
					width: 444,
					left: 33,
					top: 60,
					position: 'absolute',
					color: '#1D222A',
					fontSize: 16,
					fontFamily: 'Creato Display',
					fontWeight: '400',
					lineHeight: 24,
					letterSpacing: 0.32,
					wordWrap: 'break-word',
				}}
			>
				You could always come back via the help section on the header.{' '}
			</div>
			<div
				style={{
					left: 33,
					top: 32,
					position: 'absolute',
					color: '#121212',
					fontSize: 20,
					fontFamily: 'Creato Display',
					fontWeight: '700',
					lineHeight: 20,
					letterSpacing: 0.4,
					wordWrap: 'break-word',
				}}
			>
				How was your experience on Summary Page?
			</div>
			<img
				style={{
					width: 400,
					height: 100.29,
					left: 50,
					top: 116,
					position: 'absolute',
					mixBlendMode: 'multiply',
				}}
				src='https://via.placeholder.com/400x100'
			/>
			<div
				style={{
					width: 444,
					height: 184,
					left: 33,
					top: 226,
					position: 'absolute',
				}}
			>
				<div
					style={{
						width: 444,
						height: 184,
						left: 0,
						top: 0.39,
						position: 'absolute',
						background: 'rgba(244.37, 244.37, 244.37, 0.50)',
						borderRadius: 6.86,
						border: '1px #E2E4E5 solid',
					}}
				/>
				<div
					style={{
						width: 420,
						height: 160,
						left: 12,
						top: 12,
						position: 'absolute',
						color: '#707C8A',
						fontSize: 16,
						fontFamily: 'Creato Display',
						fontWeight: '400',
						lineHeight: 24,
						letterSpacing: 0.32,
						wordWrap: 'break-word',
					}}
				>
					Any thoughts or suggestions will be largely appreciated...
				</div>
			</div>
		</div>
	);
};
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
