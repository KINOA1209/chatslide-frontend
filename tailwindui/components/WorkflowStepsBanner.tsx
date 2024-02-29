import React, { FunctionComponent } from 'react';
// Import your custom components and any other required dependencies
import { DrLambdaBackButton } from '@/components/button/DrlambdaButton';
import ProjectProgress from '@/components/WorkflowSteps';
import DrlambdaButton from '@/components/button/DrlambdaButton';
import { GPTToggleWithExplanation } from './button/WorkflowGPTToggle';
import { useSlides } from '@/hooks/use-slides';

interface YourComponentProps {
	currentIndex: number;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
	isPaidUser?: boolean;
	nextIsPaidFeature?: boolean;
	lastStep?: boolean;
	nextText?: string;
}

const WorkflowStepsBanner: FunctionComponent<YourComponentProps> = ({
	currentIndex,
	isSubmitting,
	setIsSubmitting,
	isPaidUser = false,
	nextIsPaidFeature = false,
	lastStep = false,
	nextText = 'Next',
}) => {
	return (
		<div className='sticky top-0 z-10'>
			<div className='relative w-full h-[100px] flex flex-row items-center bg-[#2044F2] pr-12'>
				<div className='flex-grow items-center justify-center flex py-2'>
					<ProjectProgress currentInd={currentIndex} />
				</div>
				{!lastStep && (
					<div className='user-onboarding-generate'>
						<DrlambdaButton
							isSubmitting={isSubmitting}
							isPaidUser={isPaidUser}
							isPaidFeature={nextIsPaidFeature}
							onClick={(e) => setIsSubmitting(true)}
						>
							{nextText}
						</DrlambdaButton>
					</div>
				)}
			</div>

			<div className='relative w-full h-[0px] flex items-center w-full bg-transparent'>
				<div className='absolute left-5 top-5'>
					<DrLambdaBackButton href='/dashboard' />
				</div>

				{/* <div className='absolute right-5 top-5 flex flex-col items-end space-x-4'>
					{!lastStep && (
						<div className='user-onboarding-generate'>
							<DrlambdaButton
								isSubmitting={isSubmitting}
								isPaidUser={isPaidUser}
								isPaidFeature={nextIsPaidFeature}
								onClick={(e) => setIsSubmitting(true)}
							>
								{nextText}
							</DrlambdaButton>
						</div>
					)}
				</div> */}
			</div>

			<div className='flex md:hidden w-full h-[76px] bg-white'></div>

			<div className='py-2 w-full flex-auto text-center self-center bg-yellow-100 font-small leading-snug tracking-tight whitespace-nowrap sm:hidden'>
				Use our desktop version to see all the functionalities!
			</div>
		</div>
	);
};

export default WorkflowStepsBanner;
