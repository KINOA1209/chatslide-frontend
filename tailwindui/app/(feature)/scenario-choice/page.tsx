'use client';

import React, { useEffect, useState, useRef, FC } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import slideScenarios, { ScenarioOption } from './slidesScenarios';
import socialpostScenarios from './socialpostScenarios';
import SessionStorage from '@/utils/SessionStorage';
import { BackButton } from '@/components/button/DrlambdaButton';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import Project from '@/models/Project';
import { Column } from '@/components/layout/Column';
import { Instruction, Title } from '@/components/ui/Text';
import { MinorScenarioButton, ScenarioButton } from '@/components/button/ScenarioButton';

const ScenarioChoicePage = () => {
	const router = useRouter();
	const workflowType = SessionStorage.getItem('workflowType', 'presentation');
	const scenarios =
		workflowType == 'presentation' ? slideScenarios : socialpostScenarios;
	const { project, initProject, clearProject, updateProject } = useProject();
	// Function to navigate to the "scenario-choice" page
	const navigateToSummary = (scenarioType: string) => {
		//sessionStorage.setItem('scenarioType', scenarioType);
		console.log('scenarioType', scenarioType);
		clearProject();
		if (workflowType == 'presentation') {
			initProject({
				scenario_type: scenarioType,
				content_type: 'presentation',
			} as Project);
			router.push('/summary');
		} else {
			initProject({
				post_type: scenarioType,
				content_type: 'social_posts',
			} as Project);
			router.push('/summary-socialpost');
		}
	};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-col flex-grow justify-center items-center relative'>
			<div className='absolute block top-5 left-5'>
				<BackButton href='/type-choice' dark={true} text='Type Choice' />
			</div>
			<div className='block md:hidden h-[3rem]' /> {/* Spacer */}
			<Column width='100vw'>
				{/* title */}
				<Title>{scenarios.message}</Title>
				{/* three types of scenarios */}
				<div
					className='flex flex-wrap flex-row gap-x-8 gap-y-6 md:gap-6 w-full mx-auto justify-center mt-[2rem]'
					id='choice_container'
				>
					{scenarios.options.map((scenario) =>
						workflowType === 'presentation' ? (
							<MinorScenarioButton 
              scenario={scenario} 
              navigate={navigateToSummary}/>
						) : (
							<ScenarioButton
								scenario={scenario}
								navigate={navigateToSummary}
							/>
						),
					)}
				</div>
			</Column>
		</div>
	);
};

export default ScenarioChoicePage;
