import React, { FunctionComponent } from 'react';
// Import your custom components and any other required dependencies
import { DrLambdaBackButton } from '@/components/button/DrlambdaButton';
import ProjectProgress from '@/components/WorkflowSteps';
import DrlambdaButton from '@/components/button/DrlambdaButton';
import { GPTToggleWithExplanation } from './button/WorkflowGPTToggle';

interface YourComponentProps {
	currentIndex: number;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
	isPaidUser?: boolean;
	contentRef: React.RefObject<HTMLDivElement>;
	nextIsPaidFeature?: boolean;
	showGPTToggle?: boolean;
  lastStep?: boolean;
	nextText?: string;
	setIsGpt35?: (isGpt35: boolean) => void;
}

const WorkflowStepsBanner: FunctionComponent<YourComponentProps> = ({
	currentIndex,
	isSubmitting,
	setIsSubmitting,
	isPaidUser = false,
	contentRef,
	nextIsPaidFeature = false,
	showGPTToggle = false,
  lastStep = false,
	nextText = 'Next',
	setIsGpt35 = () => {},
}) => {
	function getPrevHref() {
		const redirect = [
			'/workflow-generate-outlines',
			'/workflow-edit-outlines',
			'/workflow-edit-design',
			'/workflow-review-slides',
			'/workflow-edit-script',
		];
		if (currentIndex > 0) {
			return redirect[currentIndex - 1];
		} else {
			return '/dashboard';
		}
	}

	return (
    <div className='sticky top-0 z-10'>
			<div className='relative w-full h-[80px] flex flex-col items-center w-full bg-Sky'>
				<div className='flex-grow items-center justify-center flex py-2'>
					<ProjectProgress currentInd={currentIndex} contentRef={contentRef} />
				</div>
			</div>

      <div className='relative w-full h-[0px] flex items-center w-full bg-transparent'>
        <div className='absolute left-5 top-5'>
          <DrLambdaBackButton href='/dashboard' />
        </div>

        <div className='absolute right-5 top-5 flex flex-col items-end space-x-4'>

          {!lastStep && <div className='user-onboarding-generate'>
            <DrlambdaButton
              isSubmitting={isSubmitting}
              isPaidUser={isPaidUser}
              isPaidFeature={nextIsPaidFeature}
              onClick={(e) => setIsSubmitting(true)}
            >
              {nextText}
            </DrlambdaButton>
          </div>}
        </div>
      </div>

			<div className='py-2 w-full flex-auto text-center self-center bg-yellow-100 font-small leading-snug tracking-tight whitespace-nowrap sm:hidden'>
				Use our desktop version to see all the functionalities!
			</div>
		</div>
	);
};

export default WorkflowStepsBanner;
