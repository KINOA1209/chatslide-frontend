'use client';

import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { NewStepIcon, CurrentStepIcon, FinishedStepIcon, CurrentStepCircle, FinishedStepCircle, ConnectedLine } from './icons';
import { FaArrowLeft, FaArrowRight, FaChevronCircleLeft, FaChevronCircleRight, FaRegCircle } from 'react-icons/fa';
import { IoMdLock } from "react-icons/io";
import SessionStorage from '@/components/utils/SessionStorage';

interface StepProps {
	id: number;
	current: boolean;
	finished: boolean;
	desc: string;
	redirect: string;
	unavailable?: boolean;
	isLastStep: boolean; // Pass this prop to indicate if it's the last step
}

const OneStep: React.FC<StepProps> = ({
	id,
	current,
	finished,
	desc,
	redirect,
	unavailable = false,
	isLastStep, // Pass this prop to indicate if it's the last step
}) => {
	const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		router.push(redirect);
	};

	const handleHoverEnter = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleHoverLeave = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const renderLine = !isLastStep && (
		<div className='hidden md:flex flex-grow'>
			{!isLastStep ? <ConnectedLine /> : null}
		</div>
	)

	if (current) {
		return (
			<div className='w-full flex flex-col'>
				<div className='flex flex-row justify-center items-center'>
					<div className='h-[30px] flex items-center justify-center'>
						<CurrentStepCircle />
					</div>
					{renderLine}
				</div>
				<span className={`text-neutral-800 text-white text-sm font-creato-bold leading-normal tracking-tight ${isLastStep ? '' : 'ml-[-8px]'}`}>{desc}</span>
			</div>
		);
	} else if (finished) {
		return (
			<div
				className='w-full flex flex-col cursor-pointer hidden md:flex'
				onClick={handleClick}
				onMouseEnter={handleHoverEnter}
				onMouseLeave={handleHoverLeave}
			>
				<div
					className={`flex flex-row justify-center items-center`}
				>
					<div className='h-[30px] flex items-center justify-center'>
						<FinishedStepCircle />
					</div>
					{renderLine}
				</div>
				<span className={`text-white text-sm font-normal font-creato-medium leading-normal tracking-tight ${isLastStep ? '' : 'ml-[-18px]'}`}>{desc}</span>
			</div>
		);
	} else if (unavailable) {
		return (
			<div className='w-full flex flex-col hidden md:flex'>
				<div className={`flex flex-row justify-center items-center'`}>
					<div className='h-[30px] flex items-center justify-center'>
						<IoMdLock size={20} color='white'/>
					</div>
					{renderLine}
				</div>
				<span className={`text-white text-sm font-normal font-creato-medium leading-normal tracking-tight ${isLastStep ? '' : 'ml-[-8px]'}`}>{desc}</span>
			</div>
		);
	} else {
		return (
			<div className={`${isLastStep ? 'w-auto': 'w-full'} flex flex-col hidden md:flex`}>
				<div className='flex flex-row justify-center items-center'>
					<div className='h-[30px] flex items-center justify-center'>
						<IoMdLock size={20} color='white'/>
					</div>
					{renderLine}
				</div>
				<span className={`text-white text-sm font-normal font-creato-medium leading-normal tracking-tight ${isLastStep ? '' : 'ml-[-8px]'}`}>{desc}</span>
			</div>
		);
	}
};

interface Current {
	currentInd: number;
	contentRef: React.RefObject<HTMLDivElement>;
}

// General progress indicator component
const ProgressBox = (
	steps: string[],
	redirect: string[],
	finishedStepsFunc: () => number[],
	unavailableStepsFunc: () => number[],
) => {
	const stepRedirectPair = steps.map((desc, index) => {
		return [desc, redirect[index]];
	});
	const CurrentProgress: React.FC<Current> = ({ currentInd, contentRef }) => {
		const progressRefDesktop = useRef<HTMLDivElement>(null);
		const router = useRouter();

		const [finishedSteps, setFinishedSteps] = useState<number[]>([]);
		const [unavailableSteps, setUnavailableSteps] = useState<number[]>([]);

		useEffect(() => {
			setFinishedSteps(finishedStepsFunc());
			setUnavailableSteps(unavailableStepsFunc());
		}, []);

    const stepAvailable = (step: number) => {
      if (step < 0 || step > stepRedirectPair.length - 1) {
        return false;
      }
      return finishedSteps.includes(step);
    }

    const goToStep = (step: number) => { 
      if (stepAvailable(step)) {
        router.push(stepRedirectPair[step][1]);
      }
    }


		return (
			<>
				<div
					//   style={{ visibility: desktopVisibility }}
					className='w-fit select-none grow-0'
					ref={progressRefDesktop}
				>
					{/* <div className='-top-4 p-5 mb-6 flex justify-center border-2 border-r-blue-200 sticky'> */}
					<div className='flex flex-row items-start justify-center gap-x-7'>

            <FaChevronCircleLeft 
              className={`h-[30px] ${stepAvailable(currentInd - 1) ? `text-white cursor-pointer` : `text-gray-400 cursor-not-allowed`}`}
              onClick={() => goToStep(currentInd - 1)}
            />

						<div className='w-fit flex flex-row flex-nowrap content-start'>
							{stepRedirectPair.map((pair, index) => (
								<div 
									className='w-fit flex flex-row items-center' 
									key={'workflowstepcontainer' + index.toString()}
								>
								<OneStep
									key={`step` + index.toString()} // Add a unique key prop here
									id={index + 1}
									current={currentInd === index}
									finished={finishedSteps.includes(index)}
									desc={pair[0]}
									redirect={pair[1]}
									unavailable={unavailableSteps.includes(index)}
									isLastStep={index === stepRedirectPair.length - 1} // Check if it's the last step
								/>
								{/* {index !== stepRedirectPair.length - 1 && (
									<div className='hidden lg:flex flex-grow'>
										<ConnectedLine />
									</div>
								)} */}
								</div>
							))}
						</div>

            <FaChevronCircleRight 
              className={`h-[30px] ${stepAvailable(currentInd + 1) ? `text-white cursor-pointer` : `text-gray-400 cursor-not-allowed`}`}
              onClick={() => goToStep(currentInd + 1)}
              
            />

					</div>
				</div>
			</>
		);
	};
	return CurrentProgress;
};

// Set up actual progress indicators with texts and redirections
const ProjectProgress = () => {
	const workflowType = SessionStorage.getItem('content_type', 'slides');
	let steps = ['Summary', 'Outlines', 'Design', 'Slides',  'Script', 'Video'];
	let redirect = [
		'/workflow-generate-outlines',
		'/workflow-edit-outlines',
		'/workflow-edit-design',
		'/workflow-review-slides',
		'/workflow-edit-script',
    	'/workflow-review-video',
	];
	if (workflowType === 'social_posts'){
		steps = ['Summary', 'Post']
		redirect = [
			'/workflow-generate-socialpost',
			'/workflow-review-socialpost',
		];
	} 
	const projectFinishedSteps: () => number[] = () => {
		const finishedStepsArray: number[] = [];
		if (typeof window !== 'undefined' && sessionStorage.getItem('topic')) {
			finishedStepsArray.push(0);
		}
		if (typeof window !== 'undefined' && sessionStorage.getItem('outline')) {
			finishedStepsArray.push(1);
		}
		if (typeof window !== 'undefined' && workflowType === 'social_posts' && sessionStorage.getItem('socialPost')) {
			finishedStepsArray.push(1);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('presentation_slides')
		) {
			finishedStepsArray.push(2)
			finishedStepsArray.push(3);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('transcripts')
		) {
			finishedStepsArray.push(4);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('audio_files')
		) {
			finishedStepsArray.push(5);
		}
		if (typeof window !== 'undefined' && sessionStorage.getItem('video_file')) {
			finishedStepsArray.push(5);
		}
		return finishedStepsArray;
	};
	const projectUnavailableSteps: () => number[] = () => {
		const unavailableStepsArray: number[] = [];
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('has_slides') == 'false'
		) {
			unavailableStepsArray.push(2);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('has_script') == 'false'
		) {
			unavailableStepsArray.push(3);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('has_audio') == 'false'
		) {
			unavailableStepsArray.push(4);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('has_video') == 'false'
		) {
			unavailableStepsArray.push(5);
		}
		return unavailableStepsArray;
	};
	return ProgressBox(
		steps,
		redirect,
		projectFinishedSteps,
		projectUnavailableSteps,
	);
};

export default ProjectProgress();
