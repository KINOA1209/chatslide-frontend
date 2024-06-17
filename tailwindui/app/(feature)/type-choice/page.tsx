'use client';

import React, { FC, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import workflowTypeOptions from './options';
import { BackButton } from '@/components/button/DrlambdaButton';
import { BigTitle, Explanation, Title } from '@/components/ui/Text';
import { Column } from '@/components/layout/Column';
import { useUser } from '@/hooks/use-user';
import useHydrated from '@/hooks/use-hydrated';
import {
	MinorScenarioButton,
	ScenarioButton,
} from '@/components/button/ScenarioButton';
import SessionStorage from '@/utils/SessionStorage';
import { FaPlus } from 'react-icons/fa';
import { FeedbackForm } from '@/components/ui/feedback';
import { isChatslide } from '@/utils/getHost';

const ScenarioChoicePage = () => {
	const router = useRouter(); // Initialize the router
	const { username } = useUser();

	const teamMode = SessionStorage.getItem('currentTeam');

	const [showFeedbackModal, setShowFeedbackModal] = useState(false);

	// Function to navigate to the "scenario-choice" page
	const navigate = (type: string) => {
		if (type === 'charts') {
			router.push('/charts');
			return;
		}
		SessionStorage.setItem('workflowType', type);
		router.push('/scenario-choice');
	};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-col flex-grow justify-center items-center relative'>
			<div className='absolute hidden sm:block top-5 left-5'>
				{!teamMode ? (
					<BackButton href='/dashboard' dark={true} text='Dashboard' />
				) : (
					<BackButton
						href='/dashboard?mode=team'
						dark={true}
						text='Team Dashboard'
					/>
				)}
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
				{!isChatslide() && (
					<div
						className='flex flex-wrap flex-row gap-x-8 gap-y-6 md:gap-6 w-full mx-auto justify-center mt-[2rem]'
						id='choice_container'
					>
						{workflowTypeOptions.minorOptions.map((scenario) => (
							<MinorScenarioButton
								key={scenario.id}
								scenario={scenario}
								navigate={navigate}
							/>
						))}

						<MinorScenarioButton
							key={'others'}
							scenario={{
								id: 'others',
								title: 'Others',
								imageSrc: '',
								icon: <FaPlus />,
							}}
							navigate={() => setShowFeedbackModal(true)}
						/>
					</div>
				)}
			</Column>

			{showFeedbackModal && (
				<FeedbackForm
					onClose={() => setShowFeedbackModal(false)}
					message={'What else would you like to see?'}
					textRequired={true}
					instructionText={'What else would you like to see?'}
				/>
			)}
		</div>
	);
};

export default ScenarioChoicePage;
