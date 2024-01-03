// stepsSummaryPage.tsx
import { FC } from 'react';
import { CustomStep } from './MyCustomJoyride';
import SlidesPageStep1Welcome from '@/public/images/user_onboarding/SlidesPageStep1Welcom.png';
import { TutorialStepContent } from './CustomComponents';
import {
	PrimaryColorButton,
	SecondaryColorButton,
} from './UserOnboardingButtons';

const StepsSlidesPage: () => CustomStep[] = () => {
	const getImagePlaceholder = (index: number) => {
		return `https://via.placeholder.com/300x200.png?text=Step+${index + 1}`;
	};
	const steps: CustomStep[] = [
		{
			target: 'body',
			content: (
				<div className='h-auto z-50 flex flex-col'>
					<img src={SlidesPageStep1Welcome.src} alt='Step 1' />
					<TutorialStepContent
						action={'Well Done! 🎉'}
						explanation={
							'We have generated the slides based on your needs. You could review it now!'
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
			target: '.SlidesStep-2',
			content: (
				<TutorialStepContent
					action={'Present slides & change layout 🎨 '}
					explanation={
						"Presenting your slides in real-time, making your content come alive. Customize your slides' appearance by exploring various layout options."
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
			target: '.SlidesStep-3',
			content: (
				<TutorialStepContent
					action={'Change slides content 🖼️'}
					explanation={
						'Click on the image to update, ensuring visual impact and relevance to your content. Click any text to easily edit and ensure clear, effective messaging.'
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
		// Intermediate step between steps 3 and 4
		// {
		// 	target: '.SlidesStep-4',
		// 	content: (
		// 		<TutorialStepContent
		// 			action={'Click on the image to update'}
		// 			explanation={
		// 				'Before moving forward, click on the image area to ensure the modal opens for customization.'
		// 			}
		// 		></TutorialStepContent>
		// 	),
		// 	showSkipButton: false,
		// 	locale: {
		// 		back: <SecondaryColorButton label={'Back'} />,
		// 		// next: <PrimaryColorButton label={'Next'} />,
		// 		// last: <PrimaryColorButton label={'End Tour'} />,
		// 	},
		// 	placement: 'bottom',
		// 	styles: {
		// 		tooltip: {
		// 			maxWidth: '32rem',
		// 		},
		// 	},
		// },
		{
			target: '.SlidesStep-5',
			disableBeacon: false,
			content: (
				<TutorialStepContent
					action={'Find ideal images 🖼️'}
					explanation={
						'Click on the tab to use images from the previous uploaded, search images online, or generate images by AI generator'
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
			target: '.SlidesStep-6',
			disableBeacon: false,
			content: (
				<TutorialStepContent
					action={'Export or Share 🔗 '}
					explanation={
						'Final step! Export or share your polished slides effortlessly.'
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
					action={'Click Write Script button'}
					explanation={
						'Click any text to easily edit and ensure clear, effective messaging. But you need to pay to get all the script details.'
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

export default StepsSlidesPage;
