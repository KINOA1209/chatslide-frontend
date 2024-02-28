'use client';

import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { NewStepIcon, CurrentStepIcon, FinishedStepIcon, CurrentStepCircle, FinishedStepCircle, ConnectedLine } from './icons';
import { FaArrowLeft, FaArrowRight, FaChevronCircleLeft, FaChevronCircleRight, FaRegCircle } from 'react-icons/fa';
import { IoMdLock } from "react-icons/io";
import SessionStorage from '@/components/utils/SessionStorage';
import Project from '@/models/Project';
import { useProject } from '@/hooks/use-project';

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
  } else {
    return (
      <div className={`${isLastStep ? 'w-auto' : 'w-full'} flex flex-col hidden md:flex`}>
        <div className='flex flex-row justify-center items-center'>
          <div className='h-[30px] flex items-center justify-center'>
            <IoMdLock size={20} color='white' />
          </div>
          {renderLine}
        </div>
        <span className={`text-white text-sm font-normal font-creato-medium leading-normal tracking-tight ${isLastStep ? '' : 'ml-[-8px]'}`}>{desc}</span>
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

const ProgressBox: React.FC<ProgressBoxProps> = ({ stepNames, finishedSteps, redirect, currentInd }) => {
  const stepRedirectPair = stepNames.map((name, index) => [name, redirect[index]]);
  const router = useRouter();

  const stepAvailable = (step: number) => step >= 0 && step < stepRedirectPair.length && finishedSteps.includes(step);
  const goToStep = (step: number) => stepAvailable(step) && router.push(stepRedirectPair[step][1]);

  return (
    <div className='w-fit select-none grow-0'>
      <div className='flex flex-row items-start justify-center gap-x-7'>
        <FaChevronCircleLeft
          className={`h-[30px] ${stepAvailable(currentInd - 1) ? 'text-white cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
          onClick={() => goToStep(currentInd - 1)}
        />
        <div className='w-fit flex flex-row flex-nowrap content-start'>
          {stepRedirectPair.map((pair, index) => (
            <div className='w-fit flex flex-row items-center' key={'workflowstepcontainer' + index}>
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
const PRESENTATION_STEPS = ['Summary', 'Outlines', 'Design', 'Slides', 'Video'];
const SOCIAL_POSTS_REDIRECTS = ['/workflow-generate-socialpost', '/workflow-review-socialpost'];
const PRESENTATION_REDIRECTS = ['/workflow-generate-outlines', '/workflow-edit-outlines', '/workflow-edit-design', '/workflow-review-slides', '/workflow-review-video'];

export const projectFinishedSteps = (project: Project) => {
  const finishedStepsArray: number[] = [];
  if (!project) return finishedStepsArray;
  if (project.content_type === 'social_posts') {
    if (project.topic) finishedStepsArray.push(0);
    if (project.social_posts) finishedStepsArray.push(1);
  } else {
    if (project.topic) finishedStepsArray.push(0);
    if (project.outlines) finishedStepsArray.push(1);
    if (project.presentation_slides) {
      finishedStepsArray.push(2);
      finishedStepsArray.push(3);
    }
    if (project.video_url) finishedStepsArray.push(4);
  }

  return finishedStepsArray;
};

export const getLastStepReidrect = (project: Project) => {
  const finishedSteps = projectFinishedSteps(project);
  console.log('finishedSteps', finishedSteps);
  console.log('project', project.content_type);
  if (project.content_type == 'social_posts') {
    return SOCIAL_POSTS_REDIRECTS[finishedSteps.length - 1];
  } else {
    return PRESENTATION_REDIRECTS[finishedSteps.length - 1];
  }
}

// Set up actual progress indicators with texts and redirections
const ProjectProgress: React.FC<{ currentInd: number }> = ({ currentInd }) => {
  const { project } = useProject();

  const stepNames = project?.content_type === 'social_posts' ? SOCIAL_POSTS_STEPS : PRESENTATION_STEPS;
  const redirects = project?.content_type === 'social_posts' ? SOCIAL_POSTS_REDIRECTS : PRESENTATION_REDIRECTS;

  if (!project) return <></>;

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
