'use client';

import React, { useEffect, useState, useRef, FC } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import Image from 'next/image';
import slideScenarios, { ScenarioOption } from './slidesScenarios';
import socialpostScenarios from './socialpostScenarios';
import SessionStorage from '@/utils/SessionStorage';
import { BackButton } from '@/components/button/DrlambdaButton';
import useHydrated from '@/hooks/use-hydrated';
import { useProject } from '@/hooks/use-project';
import Project from '@/models/Project';
import { Column } from '@/components/layout/Column';
import { Instruction, Title } from '@/components/ui/Text';
import DesignSystemBadges from '@/components/ui/design_systems/Badges';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';

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

	const SocialpostOption: FC<{ scenario: ScenarioOption }> = ({ scenario }) => {
		return (
			<>
				<div
					className='h-[150px] md:h-[180px] xl:h-[250px] w-[150px] md:w-[180px] xl:w-[250px] bg-gray-100 rounded-lg shadow flex justify-center items-center cursor-pointer mb-4'
					onClick={() => navigateToSummary(scenario.id)}
				>
					<Image
						className='w-[120px] md:w-[150px] xl:w-[200px]'
						width={281}
						height={174}
						alt={scenario.id}
						src={scenario.imageSrc}
					/>
				</div>
				<Instruction center={true}>{scenario.title}</Instruction>
			</>
		);
	};

	const SlidesOption: FC<{ scenario: ScenarioOption }> = ({ scenario }) => {
		return (
			<>
				<DesignSystemButton
					onClick={() => navigateToSummary(scenario.id)}
					size='lg'
					hierarchy='secondary'
					buttonStatus='enabled'
				>
					<div className='w-[12rem] flex flex-row gap-2 items-center'>
						{scenario.icon}
						{scenario.title}
					</div>
				</DesignSystemButton>
			</>
		);
	};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-col flex-grow justify-center items-center relative'>
			<div className='absolute block top-5 left-5'>
				<BackButton href='/type-choice' dark={true} text='Type Choice' />
			</div>
			<div className='block md:hidden h-[3rem]' /> {/* Spacer */}
			<Column>
				{/* title */}
				<Title>{scenarios.message}</Title>
				{/* three types of scenarios */}
				<div
					className='flex flex-wrap flex-row gap-4 md:gap-6 w-full mx-auto justify-around mt-[2rem]'
					id='choice_container'
				>
					{scenarios.options.map((scenario) => (
						<div
							key={scenario.id}
							className='flex flex-col transition-transform transform-gpu hover:scale-110'
						>
							{workflowType === 'presentation' ? (
								<SlidesOption scenario={scenario} />
							) : (
								<SocialpostOption scenario={scenario} />
							)}
						</div>
					))}
				</div>
			</Column>
		</div>
	);
};

export default ScenarioChoicePage;
