'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import Image from 'next/image';
import socialpost_scenarios from './socialpost_scenarios.json';
import slides_scenarios from './slides_scenarios.json';
import SessionStorage from '@/utils/SessionStorage';
import { DrLambdaBackButton } from '@/components/button/DrlambdaButton';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import Project from '@/models/Project';

const ScenarioChoicePage = () => {
	const router = useRouter();
	const workflowType = SessionStorage.getItem('workflowType', 'presentation');
	const scenarios =
		workflowType == 'presentation' ? slides_scenarios : socialpost_scenarios;
	const { project, initProject, clearProject, updateProject } = useProject();
	// Function to navigate to the "scenario-choice" page
	const navigateToSummary = (scenarioType: string) => {
		//sessionStorage.setItem('scenarioType', scenarioType);
		clearProject();
		updateProject('post_type', scenarioType);
		if (workflowType == 'presentation')
			router.push('/genmode');
		else {
			initProject({
				'post_type': scenarioType,
				'content_type': 'social_posts'
			} as Project)
			router.push('/summary-socialpost');
		}
	};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='bg-zinc-100 flex flex-col flex-grow justify-center items-center relative'>
			<div className='absolute hidden sm:block top-5 left-5'>
				<DrLambdaBackButton href='/type-choice' dark={true} text='Type Choice' />
			</div>
			<div className='flex flex-col justify-center items-center gap-4 sm:gap-12 p-4 sm:p-8'>
				{/* title */}
				<div className='w-[80vh] text-center text-neutral-800 text-xl sm:text-2xl font-normal font-creato-medium leading-9 tracking-wide'>
					{scenarios.message}
				</div>
				<div className='w-[80vh] h-8 text-center text-gray-600 text-base font-normal font-creato-medium leading-normal tracking-tight'>
					{scenarios.description}
				</div>
				{/* three types of scenarios */}
				<div className='flex flex-col gap-4 md:gap-6' id='choice_container'>
					{scenarios.options.map((scenario) => (
						<div
							key={scenario.id}
							className='flex flex-col w-full transition-transform transform-gpu hover:scale-110'
						>
							<div
								className='w-full h-[200px] sm:h-[300px] bg-gray-300 rounded-lg shadow flex justify-center items-center cursor-pointer mb-4'
								onClick={() => navigateToSummary(scenario.id)}
							>
								<Image
									className='mx-[20px]'
									width={281}
									height={174}
									alt={scenario.id}
									src={scenario.imageSrc}
								/>
							</div>
							<div className='text-center my-2 font-creato-medium leading-snug tracking-tight whitespace-nowrap font-bold'>
								{scenario.title}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ScenarioChoicePage;
