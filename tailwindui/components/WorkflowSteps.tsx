'use client';

import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CSS from 'csstype';
import AuthService from '@/services/AuthService';
import { RightArrowIcon } from '@/app/(feature)/icons';
import { NewStepIcon, CurrentStepIcon, FinishedStepIcon } from './icons';
import { FaArrowLeft, FaArrowRight, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

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

	let exitClass = 'bg-blue-500 border-blue-500 text-white text-center';
	let enterClass = 'bg-blue-700 border-blue-700 text-white text-center';
	let textEnterClass = 'text-blue-700 ml-3';

	const [circleClass, setCircleClass] = useState(exitClass);
	const [textClass, setTextClass] = useState('ml-3');

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		router.push(redirect);
	};

	const handleHoverEnter = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setCircleClass(enterClass);
		setTextClass(textEnterClass);
	};

	const handleHoverLeave = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setCircleClass(exitClass);
		setTextClass('ml-3');
	};

	// Conditionally render the RightArrowIcon based on whether it's the last step
	const renderRightArrow = (
		<div className='hidden lg:flex'>
			{!isLastStep ? <RightArrowIcon /> : null}
		</div>
	);

	if (current) {
		return (
			<div className='w-full flex items-center'>
				{/* <div
          className='bg-white border-blue-500 text-blue-500 text-center'
          style={StepStyle}
        >
          {id}
        </div> */}
				<span className='text-neutral-800 text-sm font-medium font-creato-bold leading-normal tracking-tight mx-2 overflow-x-auto inline-flex items-center gap-1'>
					<CurrentStepIcon />
					{desc}
				</span>
				{renderRightArrow}
			</div>
		);
	} else if (finished) {
		return (
			<div
				className='w-full flex items-center cursor-pointer hidden md:flex'
				onClick={handleClick}
				onMouseEnter={handleHoverEnter}
				onMouseLeave={handleHoverLeave}
			>
				{/* <div className={circleClass} style={StepStyle}>
          {id}
        </div> */}
				<span
					className={`text-gray-600 text-sm font-normal font-creato-medium leading-normal tracking-tight mx-2 ${textClass} overflow-x-auto inline-flex items-center gap-1`}
				>
					<FinishedStepIcon />
					{desc}
				</span>
				{renderRightArrow}
			</div>
		);
	} else if (unavailable) {
		return (
			<div className='w-full flex items-center hidden md:flex'>
				{/* <div
          className='bg-gray-400 border-gray-400 text-white text-center'
          style={StepStyle}
        >
          {id}
        </div> */}
				<span className='text-gray-600 text-sm font-normal font-creato-medium leading-normal tracking-tight mx-2 overflow-x-auto inline-flex items-center gap-1'>
					<NewStepIcon />
					{desc}
				</span>
				{renderRightArrow}
			</div>
		);
	} else {
		return (
			<div className='w-full flex items-center hidden md:flex'>
				{/* <div
          className='bg-gray-400 border-gray-400 text-white text-center'
          style={StepStyle}
        >
          {id}
        </div> */}
				<span className='text-gray-600 text-sm font-normal font-creato-medium leading-normal tracking-tight mx-2 overflow-x-auto inline-flex items-center gap-1'>
					<NewStepIcon />
					{desc}
				</span>
				{renderRightArrow}
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
					<div className='flex justify-center gap-x-4'>

            <FaChevronCircleLeft 
              className={`h-[40px] ${stepAvailable(currentInd - 1) ? `text-green-600 cursor-pointer` : `text-gray-400 cursor-not-allowed`}`}
              onClick={() => goToStep(currentInd - 1)}
            />

						<div className='w-fit flex flex-row flex-nowrap content-start'>
							{stepRedirectPair.map((pair, index) => (
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
							))}
						</div>

            <FaChevronCircleRight 
              className={`h-[40px] ${stepAvailable(currentInd + 1) ? `text-green-600 cursor-pointer` : `text-gray-400 cursor-not-allowed`}`}
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
	const steps = ['Summary', 'Outlines', 'Theme', 'Slides',  'Script', 'Video'];
	const redirect = [
		'/workflow-generate-outlines',
		'/workflow-edit-outlines',
		'/workflow-edit-theme',
		'/workflow-review-slides',
		'/workflow-edit-script',
    '/workflow-review-video',
	];
	const projectFinishedSteps: () => number[] = () => {
		const finishedStepsArray: number[] = [];
		if (typeof window !== 'undefined' && sessionStorage.getItem('topic')) {
			finishedStepsArray.push(0);
		}
		if (typeof window !== 'undefined' && sessionStorage.getItem('outline')) {
			finishedStepsArray.push(1);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('presentation_slides')
		) {
			finishedStepsArray.push(2);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('transcripts')
		) {
			finishedStepsArray.push(3);
		}
		if (
			typeof window !== 'undefined' &&
			sessionStorage.getItem('audio_files')
		) {
			finishedStepsArray.push(4);
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
