import React, { FunctionComponent, use, useEffect, useState } from 'react';
// Import your custom components and any other required dependencies
import { DrLambdaBackButton } from '@/components/button/DrlambdaButton';
import ProjectProgress from '@/components/layout/WorkflowSteps';
import DrlambdaButton from '@/components/button/DrlambdaButton';
import { sleep } from '../../utils/sleep';

interface YourComponentProps {
	currentIndex: number;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
	isPaidUser?: boolean;
	nextIsPaidFeature?: boolean;
	lastStep?: boolean;
	nextText?: string;
	handleClickingGeneration?: () => void;
}

const WorkflowStepsBanner: FunctionComponent<YourComponentProps> = ({
	currentIndex,
	isSubmitting,
	setIsSubmitting,
	isPaidUser = false,
	nextIsPaidFeature = false,
	lastStep = false,
	nextText = 'Next',
	handleClickingGeneration,
}) => {
	const [showPing, setShowPing] = useState(true);

	const [buttonBounce, setButtonBounce] = useState(false);

	// when received a button bounce event from document listener, set the buttonBounce to true for 5 seconds
	useEffect(() => {
		const bounce = () => {
			setButtonBounce(true);
			setTimeout(() => {
				setButtonBounce(false);
			}, 5000);
		};

		document.addEventListener('buttonBounce', bounce);

		return () => {
			document.removeEventListener('buttonBounce', bounce);
		};
	}, []);


	useEffect(() => {
		sleep(10 * 1000).then(() => setShowPing(true));
	}, []);

	useEffect(() => {
		if (isSubmitting) {
			setShowPing(false);
		}
	}, [isSubmitting]);

	return (
		<section className='sticky top-0 z-10 flex flex-col'>
			<div className='relative w-full h-[80px] flex flex-row items-center bg-[#2044F2] gap-x-4 px-4 sm:px-6 lg:px-8'>
				<DrLambdaBackButton href='/dashboard' />
				<div className='flex-grow items-center justify-center flex py-2'>
					<ProjectProgress currentInd={currentIndex} />
				</div>
				{!lastStep ? (
					<div className='user-onboarding-generate relative'>
						{isSubmitting && (
							<div
								style={{
									position: 'fixed',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									zIndex: 9999,
								}}
							></div>
						)}
						<div className={buttonBounce ? 'animate-bounce' : ''} onClick={handleClickingGeneration}>
							<DrlambdaButton
								isSubmitting={isSubmitting}
								isPaidUser={isPaidUser}
								isPaidFeature={nextIsPaidFeature}
								onClick={(e) => setIsSubmitting(true)}
								id={nextText.replace(/[^A-Za-z0-9]/g, '_')}
							>
								{nextText}
							</DrlambdaButton>
						</div>

						{showPing && (
							<span className='flex h-4 w-4 absolute -top-2 -right-2'>
								<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-100'></span>
								{/* <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span> */}
							</span>
						)}
					</div>
				) : (
					// empty div to keep the layout consistent
					<div className='min-w-[10rem] sm:min-w-[12rem]'></div>
				)}
			</div>

			{/* <div className='relative w-full h-[0px] flex items-center w-full bg-transparent'>
				<div className='absolute left-5 top-5'>
					<DrLambdaBackButton href='/dashboard' />
				</div>
			</div> */}

			<div className='py-2 w-full flex-auto text-center self-center bg-yellow-100 font-small leading-snug tracking-tight whitespace-nowrap sm:hidden'>
				Use our desktop version to see all the functionalities!
			</div>
		</section>
	);
};

export default WorkflowStepsBanner;
