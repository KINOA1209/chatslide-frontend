// stepsSummaryPage.tsx
import { FC } from 'react';
import { CustomStep } from './MyCustomJoyride';
import SummaryPageStep1Welcome from '@/public/images/user_onboarding/SummaryPageStep1Welcom.png';
import { TutorialStepContent } from './CustomComponents';
import {
	PrimaryColorButton,
	SecondaryColorButton,
} from './UserOnboardingButtons';

const StepsSummaryPage: () => CustomStep[] = () => {
	const getImagePlaceholder = (index: number) => {
		return `https://via.placeholder.com/300x200.png?text=Step+${index + 1}`;
	};
	const steps: CustomStep[] = [
		{
			target: 'body',
			content: (
				<div className='h-auto z-50 flex flex-col'>
					<img src={SummaryPageStep1Welcome.src} alt='Step 1' />
					<TutorialStepContent
						action={'Welcome onboard 🎉'}
						explanation={
							'Start creating slides from summary page. Do you want to follow a step-by step tutorial?'
						}
					></TutorialStepContent>
				</div>
			),
			locale: {
				skip: <SecondaryColorButton label={'Not now'} />,
				// back: 'Back',
				next: <PrimaryColorButton label={'Sure'} />,
			},
			styles: {
				tooltip: {
					// width: '31rem', // Set the width of the tooltip
					maxWidth: '32rem', // Set the max width of the tooltip
					// Add any other styles as needed
				},
				// Add styles for other elements as needed
			},
			placement: 'center',
			// disableBeacon: true,
			showProgress: true,
		},
		// Add more steps as needed
		{
			target: '#SummaryStep-2',
			content: (
				<TutorialStepContent
					action={'Enter basic information 💡'}
					explanation={
						'To get started, give us some high-level intro about your project. The more you enter here, the more precise content we could generate for you.'
					}
				></TutorialStepContent>
			),
			showSkipButton: false,
			locale: {
				back: <SecondaryColorButton label={'Back'} />,
				next: <PrimaryColorButton label={'Next'} />,
			},
			placement: 'bottom',
			styles: {
				tooltip: {
					width: '31rem', // Set the width of the tooltip
					// Add any other styles as needed
				},
				// Add styles for other elements as needed
			},
		},
		{
			target: '#SummaryStep-3',
			content: (
				<TutorialStepContent
					action={'Upload supporting references 🎥 📄'}
					explanation={
						'Offer more brilliant materials, your decks will been engaged with more depth.'
					}
				></TutorialStepContent>
			),
			showSkipButton: false,
			locale: {
				back: <SecondaryColorButton label={'Back'} />,
				next: <PrimaryColorButton label={'Next'} />,
				// last: <PrimaryColorButton label={'End Tour'} />,
			},
			placement: 'bottom',
			styles: {
				tooltip: {
					width: '31rem', // Set the width of the tooltip
					// Add any other styles as needed
				},
				// Add styles for other elements as needed
			},
		},
		{
			target: '#SummaryStep-4',
			content: (
				<TutorialStepContent
					action={'Choose a theme 🎨'}
					explanation={
						'You could choose a theme based on your needs - whether you need more images or more charts.'
					}
				></TutorialStepContent>
			),
			showSkipButton: false,
			locale: {
				back: <SecondaryColorButton label={'Back'} />,
				next: <PrimaryColorButton label={'Next'} />,
				// last: <PrimaryColorButton label={'End Tour'} />,
			},
			placement: 'bottom',
			styles: {
				tooltip: {
					width: '31rem', // Set the width of the tooltip
					// Add any other styles as needed
				},
				// Add styles for other elements as needed
			},
		},
		{
			target: '.user-onboarding-GPTToggle',
			content: (
				<TutorialStepContent
					action={'More powerful features with GPT 4.0 🤖'}
					explanation={
						'GPT-4 is more accurate, creative, and reliable at solving complex problems.'
					}
				></TutorialStepContent>
			),
			showSkipButton: false,
			locale: {
				back: <SecondaryColorButton label={'Back'} />,
				next: <PrimaryColorButton label={'Next'} />,
				// last: <PrimaryColorButton label={'End Tour'} />,
			},
			placement: 'bottom',
			styles: {
				tooltip: {
					width: '31rem', // Set the width of the tooltip
					// Add any other styles as needed
				},
				// Add styles for other elements as needed
			},
		},
		{
			target: '.user-onboarding-generate',
			content: (
				<TutorialStepContent
					action={'Click Generate Outline button'}
					explanation={
						'Whenever you finish modifying the summary, you could click the Generate Outline button to move forward to the next section. '
					}
				></TutorialStepContent>
			),
			showSkipButton: false,
			locale: {
				back: <SecondaryColorButton label={'Back'} />,
				// next: <PrimaryColorButton label={'Next'} />,
				last: <PrimaryColorButton label={'End Tour'} />,
			},
			placement: 'bottom',
			styles: {
				tooltip: {
					width: '31rem', // Set the width of the tooltip
					// Add any other styles as needed
				},
				// Add styles for other elements as needed
			},
		},
	];

	return steps;
};

export default StepsSummaryPage;
