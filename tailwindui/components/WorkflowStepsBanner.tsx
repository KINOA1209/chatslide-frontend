import React, { FunctionComponent } from 'react';
// Import your custom components and any other required dependencies
import {DrLambdaBackButton} from '@/components/button/DrlambdaButton';
import ProjectProgress from '@/components/newWorkflowSteps';
import DrlambdaButton from '@/components/button/DrlambdaButton';

interface YourComponentProps {
  currentIndex: number;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  isPaidUser: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
  nextIsPaidFeature?: boolean;

}

const WorkflowStepsBanner: FunctionComponent<YourComponentProps> = ({
  currentIndex,
  isSubmitting,
  setIsSubmitting,
  isPaidUser,
  contentRef,
  nextIsPaidFeature = false,

  
}) => {

  function getPrevHref(){
    const redirect = [
      '/workflow-generate-outlines',
      '/workflow-edit-outlines',
      '/workflow-review-slides',
      '/workflow-edit-script',
    ]
    if(currentIndex > 0){
      return redirect[currentIndex-1]
    } else{
      return '/dashboard'
    }
  }

  return (
    <div className='fixed mt-[3rem] flex items-center w-full bg-Grey-50 z-10 py-[0.75rem] border-b-2 px-[5rem]'>
      {/* flex row container for backlink, title*/}
      <div className="absolute left-10">
        <DrLambdaBackButton href={getPrevHref()} />
      </div>

      <div className="flex-grow flex justify-center">
        <ProjectProgress currentInd={currentIndex} contentRef={contentRef} />
      </div>

      <div className="absolute right-10">
        <DrlambdaButton 
          isSubmitting={isSubmitting} 
          isPaidUser={isPaidUser} 
          isPaidFeature={nextIsPaidFeature} 
          onClick={e => setIsSubmitting(true)}>
          {!isSubmitting ? 'Next' : 'Writing Scripts'}
        </DrlambdaButton>
      </div>

      <div className='flex-auto text-center self-center text-neutral-900 font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap sm:hidden'>
        Use our desktop version to see all the functionalities!
      </div>
    </div>
  );
};

export default WorkflowStepsBanner;
