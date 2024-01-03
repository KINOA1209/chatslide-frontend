// stepsSummaryPage.tsx
import { FC } from 'react';
import { CustomStep } from './MyCustomJoyride';
import OutlinePageStep1Welcome from '@/public/images/user_onboarding/OutlinePageStep1Welcom.png';
import { TutorialStepContent } from './CustomComponents';
import {
	PrimaryColorButton,
	SecondaryColorButton,
} from './UserOnboardingButtons';

const StepsOutlinePage: () => CustomStep[] = () => {
	const getImagePlaceholder = (index: number) => {
		return `https://via.placeholder.com/300x200.png?text=Step+${index + 1}`;
	};
	const steps: CustomStep[] = [
		{
			target: 'body',
			content: (
				<div className='h-auto z-50 flex flex-col'>
					<img src={OutlinePageStep1Welcome.src} alt='Step 1' />
					<TutorialStepContent
						action={'Well Done! 🎉'}
						explanation={
							'You’ve completed the summary section! Now let’s give the slides some outlines.'
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
			target: '.OutlineStep-2',
			content: (
				<TutorialStepContent
					action={'Edit outline structure ✏️'}
					explanation={
						'To modify any sections of outlines by clicking the add and delete button. You could also use the gear icon to open the advance setting.  '
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
					maxWidth: '32rem', // Set the max width of the tooltip
					// Add any other styles as needed
				},
				// Add styles for other elements as needed
			},
		},
		{
			target: '.OutlineStep-3',
			content: (
				<TutorialStepContent
					action={'Edit Content Info ✏️'}
					explanation={
						'To modify content inside different sections, you could hover on the bullet points, and update, delete or add the content.'
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
					maxWidth: '32rem', // Set the max width of the tooltip
					// Add any other styles as needed
				},
				// Add styles for other elements as needed
			},
		},
		{
			target: '.OutlineStep-4',
			content: (
				<TutorialStepContent
					action={'Overview Info 👁️'}
					explanation={
						'Easily make your way around the outline by clicking on the section name.'
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
					maxWidth: '32rem', // Set the max width of the tooltip
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
					action={'Click Create Slide button'}
					explanation={
						'Whenever you finish modifying the outlines, click Create Slide button to move forward to generate slides.'
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

export default StepsOutlinePage;
