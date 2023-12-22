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
						'Offer more brilliant materials, your decks will been engaged with more depth.'
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
		},
		{
			target: '#SummaryStep-3',
			content: (
				<div>
					<h2>Step 3</h2>
					<p>And here's a third step with an icon.</p>
					<i
						className='fa fa-star'
						style={{ fontSize: '24px', color: 'gold' }}
					></i>
				</div>
			),
			locale: { back: 'Back', next: 'Next' },
			placement: 'bottom',
		},
	];

	return steps;
};

export default StepsSummaryPage;
