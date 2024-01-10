import React, { FunctionComponent } from 'react';
// Import your custom components and any other required dependencies
import { DrLambdaBackButton } from '@/components/button/DrlambdaButton';
import ProjectProgress from '@/components/WorkflowStepsSocialpost';
import DrlambdaButton from '@/components/button/DrlambdaButton';
import { GPTToggleWithExplanation } from '@/components/button/WorkflowGPTToggle';

interface YourComponentProps {
	currentIndex: number;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
	isPaidUser: boolean;
	contentRef: React.RefObject<HTMLDivElement>;
	nextIsPaidFeature?: boolean;
	showGPTToggle?: boolean;
	nextText?: string;
	setIsGpt35?: (isGpt35: boolean) => void;
	showNextButton?: boolean;
}

const WorkflowStepsBanner: FunctionComponent<YourComponentProps> = ({
	currentIndex,
	isSubmitting,
	setIsSubmitting,
	isPaidUser,
	contentRef,
	nextIsPaidFeature = false,
	showGPTToggle = false,
	nextText = 'Next',
	setIsGpt35,
	showNextButton = true,
}) => {
	function getPrevHref() {
		const redirect = [
			'/workflow-generate-socialpost',
			'/workflow-review-socialpost',
		];
		if (currentIndex > 0) {
			return redirect[currentIndex - 1];
		} else {
			return '/dashboard';
		}
	}

	return (
		<>
			<div className='relative sticky top-0 h-[80px] flex flex-col items-center w-full bg-Sky z-10'>
				<div className='flex-grow items-center justify-center flex py-2'>
					<ProjectProgress currentInd={currentIndex} contentRef={contentRef} />
				</div>
			</div>

      <div className='relative sticky top-0 h-[80px] flex items-center w-full bg-white z-10'>
        <div className='absolute left-5'>
          <DrLambdaBackButton href={getPrevHref()} />
        </div>
        <div className='absolute right-5 flex flex-col xl:flex-row items-end xl:items-center space-x-4'>
          {showNextButton && (
            <DrlambdaButton
              isSubmitting={isSubmitting}
              isPaidUser={isPaidUser}
              isPaidFeature={nextIsPaidFeature}
              onClick={(e) => setIsSubmitting(true)}
            >
              {nextText}
            </DrlambdaButton>
          )}
        </div>
      </div>

			<div className='py-2 flex-auto text-center self-center bg-yellow-100 font-small leading-snug tracking-tight whitespace-nowrap sm:hidden'>
				Use our desktop version to see all the functionalities!
			</div>
		</>
	);
};

export default WorkflowStepsBanner;
