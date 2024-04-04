'use client';

import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import { CurrentStepCircle, FinishedStepCircle, ConnectedLine } from '../icons';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';
import SessionStorage from '@/utils/SessionStorage';
import Project from '@/models/Project';
import { useProject } from '@/hooks/use-project';
import useHydrated from '@/hooks/use-hydrated';
import { addIdToRedir } from '../../utils/redirWithId';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface StepProps {
	id: number;
	current: boolean;
	finished: boolean;
	desc: string;
	redirect: string;
	isLastStep: boolean; // Pass this prop to indicate if it's the last step
}

const OneStep: React.FC<StepProps> = ({
	id,
	current,
	finished,
	desc,
	redirect,
	isLastStep, // Pass this prop to indicate if it's the last step
}) => {
	const router = useRouter();

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		router.push(addIdToRedir(redirect));
	};

	const handleUnavailableClick = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		document.dispatchEvent(new Event('buttonBounce'));
		toast.info('Please click the button on the right to generate.',
			{ position: 'top-center', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });

	}

	const handleHoverEnter = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleHoverLeave = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const renderLine = !isLastStep && (
		<div className='hidden md:flex md:w-12 lg:w-20 overflow-x-hidden'>
			{!isLastStep ? <ConnectedLine /> : null}
		</div>
	);

	if (current) {
		return (
			<div className='relative w-full flex flex-col'>
				<div className='flex flex-row justify-center items-center'>
					<div className='h-[30px] flex items-center justify-center'>
						<CurrentStepCircle />
					</div>
					{renderLine}
				</div>
				<span
					className={`absolute top-8 text-neutral-800 text-white text-sm font-creato-bold leading-normal tracking-tight ${isLastStep ? '' : 'ml-[-8px]'}`}
				>
					{desc}
				</span>
			</div>
		);
	} else if (finished) {
		return (
			<div
				className='relative w-full flex flex-col cursor-pointer hidden md:flex'
				onClick={handleClick}
				onMouseEnter={handleHoverEnter}
				onMouseLeave={handleHoverLeave}
			>
				<div className={`flex flex-row justify-center items-center`}>
					<div className='h-[30px] flex items-center justify-center'>
						<FinishedStepCircle />
					</div>
					{renderLine}
				</div>
				<span
					className={`absolute top-8 text-white text-sm font-normal font-creato-medium leading-normal tracking-tight ${isLastStep ? '' : 'ml-[-18px]'}`}
				>
					{desc}
				</span>
			</div>
		);
	} else {
		return (
			<div
				className={`relative ${isLastStep ? 'w-auto' : 'w-full'} flex flex-col hidden md:flex`}
				onClick={handleUnavailableClick}
			>
				<div className='flex flex-row justify-center items-center'>
					<div className='h-[30px] flex items-center justify-center'>
						<IoMdLock size={20} color='white' />
					</div>
					{renderLine}
				</div>
				<span
					className={`absolute top-8 text-white text-sm font-normal font-creato-medium leading-normal tracking-tight ${isLastStep ? '' : 'ml-[-8px]'}`}
				>
					{desc}
				</span>
			</div>
		);
	}
};

interface ProgressBoxProps {
	stepNames: string[];
	finishedSteps: number[];
	redirect: string[];
	currentInd: number;
}

const ProgressBox: React.FC<ProgressBoxProps> = ({
	stepNames,
	finishedSteps,
	redirect,
	currentInd,
}) => {
	const stepRedirectPair = stepNames.map((name, index) => [
		name,
		redirect[index],
	]);
	const router = useRouter();
	const stepAvailable = (step: number) =>
		step >= 0 && step < stepRedirectPair.length && finishedSteps.includes(step);
	const goToStep = (step: number) =>
		stepAvailable(step) && router.push(addIdToRedir(stepRedirectPair[step][1]));

	return (
		<div className='w-fit select-none grow-0'>
			<ToastContainer />
			<div className='flex flex-row items-start justify-center gap-x-7'>
				<FaChevronCircleLeft
					className={`h-[30px] ${stepAvailable(currentInd - 1) ? 'text-white cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
					onClick={() => goToStep(currentInd - 1)}
				/>
				<div className='w-fit flex flex-row flex-nowrap content-start'>
					{stepRedirectPair.map((pair, index) => (
						<div
							className='w-fit flex flex-row items-center'
							key={'workflowstepcontainer' + index}
						>
							<OneStep
								key={'step' + index}
								id={index + 1}
								current={currentInd === index}
								finished={finishedSteps.includes(index)}
								desc={pair[0]}
								redirect={pair[1]}
								isLastStep={index === stepRedirectPair.length - 1}
							/>
						</div>
					))}
				</div>
				<FaChevronCircleRight
					className={`h-[30px] ${stepAvailable(currentInd + 1) ? 'text-white cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
					onClick={() => goToStep(currentInd + 1)}
				/>
			</div>
		</div>
	);
};

const SOCIAL_POSTS_STEPS = ['Summary', 'Post'];
const PRESENTATION_STEPS = ['Summary', 'Outlines', 'Design', 'Slides', 'Scripts', 'Video'];
const SOCIAL_POSTS_REDIRECTS = [
	'/summary-socialpost',
	'/socialpost',
];
const PRESENTATION_REDIRECTS = [
	'/summary',
	'/outlines',
	'/design',
	'/slides',
	'/scripts',
	'/video',
];

export const projectFinishedSteps = (project: Project | null) => {
	const finishedStepsArray: number[] = [];
	if (!project) return finishedStepsArray;
	if (project.content_type === 'social_posts') {
		finishedStepsArray.push(0);
		if (project.social_posts) finishedStepsArray.push(1);
	} else {
		finishedStepsArray.push(0);
		if (project.outlines) {
			finishedStepsArray.push(1);
			finishedStepsArray.push(2);
		}
		if (project.parsed_slides?.length > 0) {
			// console.log('parsed_slides', project.parsed_slides);
			finishedStepsArray.push(3);
		}
		if (project.has_scripts) finishedStepsArray.push(4);
		if (project.video_url) finishedStepsArray.push(5);
	}

	return finishedStepsArray;
};

export const getLastStepReidrect = (project: Project) => {
	const finishedSteps = projectFinishedSteps(project);
	console.log('finishedSteps', finishedSteps);
	console.log('project', project.content_type);
	let url = '';
	if (project.content_type == 'social_posts') {
		url = SOCIAL_POSTS_REDIRECTS[finishedSteps.length - 1];
	} else {
		url = PRESENTATION_REDIRECTS[finishedSteps.length - 1];
	}
	return url;
};

// Set up actual progress indicators with texts and redirections
const ProjectProgress: React.FC<{ currentInd: number }> = ({ currentInd }) => {
	const { project } = useProject();

	let content_type =
		project?.content_type || SessionStorage.getItem('workflowType');

	const stepNames =
		content_type === 'social_posts' ? SOCIAL_POSTS_STEPS : PRESENTATION_STEPS;
	const redirects =
		content_type === 'social_posts'
			? SOCIAL_POSTS_REDIRECTS
			: PRESENTATION_REDIRECTS;

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<ProgressBox
			stepNames={stepNames}
			redirect={redirects}
			finishedSteps={projectFinishedSteps(project)}
			currentInd={currentInd}
		/>
	);
};

export default ProjectProgress;
