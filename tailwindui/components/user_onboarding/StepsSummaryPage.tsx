// stepsSummaryPage.tsx
import { FC } from 'react';
import { CustomStep } from './MyCustomJoyride';
import SummaryPageStep1Welcome from '@/public/images/user_onboarding/SummaryPageStep1Welcom.png';

import { TutorialStepContent } from './CustomComponents';

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
				skip: (
					<div className='w-24 h-10 px-2 py-0.5 rounded border border-[#2943E9] justify-center items-center gap-1.5 inline-flex'>
						<span className='text-center text-[#2943E9] text-base font-medium font-creato-medium leading-none tracking-wide'>
							Not now
						</span>
					</div>
				),
				back: 'Back',
				next: (
					<div className='w-24 h-10 px-2 py-0.5 bg-[#2943E9] rounded justify-center items-center gap-1.5 inline-flex'>
						<span className='text-center text-zinc-100 text-base font-medium font-creato-medium leading-none tracking-wide'>
							Sure
						</span>
					</div>
				),
			},
			styles: {
				tooltip: {
					width: '31rem', // Set the width of the tooltip
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
				back: (
					<div className='w-24 h-10 px-2 py-0.5 rounded border border-[#FFFFFF] justify-center items-center gap-1.5 inline-flex'>
						<span className='text-center text-[#2943E9] text-base font-medium font-creato-medium leading-none tracking-wide'>
							Back
						</span>
					</div>
				),
				next: (
					<div className='w-24 h-10 px-2 py-0.5 bg-[#2943E9] rounded justify-center items-center gap-1.5 inline-flex'>
						<span className='text-center text-zinc-100 text-base font-medium font-creato-medium leading-none tracking-wide'>
							Next
						</span>
					</div>
				),
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
			locale: {
				back: (
					<div className='w-24 h-10 px-2 py-0.5 rounded border border-[#FFFFFF] justify-center items-center gap-1.5 inline-flex'>
						<span className='text-center text-[#2943E9] text-base font-medium font-creato-medium leading-none tracking-wide'>
							Back
						</span>
					</div>
				),
				last: (
					<div className='w-24 h-10 px-2 py-0.5 bg-[#2943E9] rounded justify-center items-center gap-1.5 inline-flex'>
						<span className='text-center text-zinc-100 text-base font-medium font-creato-medium leading-none tracking-wide'>
							End tour
						</span>
					</div>
				),
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
