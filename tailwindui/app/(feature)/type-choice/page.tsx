'use client';

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import Image from 'next/image';
import workflowTypeOptions from './options';
import SessionStorage from '@/utils/SessionStorage';
import AuthService from '@/services/AuthService';
import { BackButton } from '@/components/button/DrlambdaButton';
import { BigTitle, Explanation, Title } from '@/components/ui/Text';
import { Column } from '@/components/layout/Column';
import { useUser } from '@/hooks/use-user';
import PaywallModal from '@/components/paywallModal';
import useHydrated from '@/hooks/use-hydrated';
import { ScenarioOption } from '../scenario-choice/slidesScenarios';
import ScenarioButton from './ScenarioButton';

const ScenarioChoicePage = () => {
	const router = useRouter(); // Initialize the router
	const { username } = useUser();

	// Function to navigate to the "scenario-choice" page
	const navigate = (type: string) => {
		if (type === 'charts') {
			router.push('/charts');
			return;
		}
		sessionStorage.setItem('workflowType', type);
		router.push('/scenario-choice');
	};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-col flex-grow justify-center items-center relative'>
			<div className='absolute hidden sm:block top-5 left-5'>
				<BackButton href='/dashboard' dark={true} text='Dashboard' />
				<div className='block md:hidden h-[3rem]' /> {/* Spacer */}
			</div>
			<Column width='100vw'>
				{/* title */}
				<Title>
					Hey {username}, <br />
					what are you planning to create today?
				</Title>
				{/* <div className='w-[80vh] h-8 text-center text-gray-600 text-base font-normal leading-normal tracking-tight'>
          {scenarios.description}
        </div> */}
				{/* three types of scenarios */}
				<div
					className='flex flex-wrap flex-row gap-x-8 gap-y-6 md:gap-6 w-full mx-auto justify-center mt-[2rem]'
					id='choice_container'
				>
					{workflowTypeOptions.options.map((scenario) => (
						<ScenarioButton
							key={scenario.id}
							scenario={scenario}
							navigate={navigate}
						/>
					))}
				</div>
			</Column>
		</div>
	);
};

export default ScenarioChoicePage;
