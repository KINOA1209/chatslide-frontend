'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import Image from 'next/image';
import scenarios from './choices.json';
import SessionStorage from '@/utils/SessionStorage';
import AuthService from '@/services/AuthService';
import { BackButton } from '@/components/button/DrlambdaButton';
import { BigTitle, Explanation, Title } from '@/components/ui/Text';
import { Column } from '@/components/layout/Column';
import { useUser } from '@/hooks/use-user';
import PaywallModal from '@/components/paywallModal';
import useHydrated from '@/hooks/use-hydrated';

const ScenarioChoicePage = () => {
	const router = useRouter(); // Initialize the router
	const { username, tier } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);

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
			<PaywallModal
				showModal={showPaywall}
				setShowModal={setShowPaywall}
				message='🥇 Upgrade to ULTIMATE to get early access!'
			/>

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
					{scenarios.options.map((scenario) => (
						<div
							key={scenario.id}
							className={
								'flex flex-col transition-transform transform-gpu ' +
								(scenario?.featured ? 'hover:scale-110' : 'hover:scale-110')
							}
						>
							<div
								className={
									'h-[250px] sm:h-[300px] rounded-lg shadow flex justify-center items-center cursor-pointer mb-4 ' +
									(scenario?.featured ? 'bg-[#f2f1ff]' : 'bg-gray-100')
								}
								onClick={() => {
									if (scenario?.previewOnly) {
										if (!tier.includes('ULTIMATE')) {
											setShowPaywall(true);
											return;
										}
									}
									navigate(scenario.id);
								}}
							>
								<Image
									className='mx-[20px] mh-[20px]'
									width={281}
									height={174}
									alt={scenario.id}
									src={scenario.imageSrc}
								/>
							</div>
							<div className='text-center my-2 leading-snug tracking-tight whitespace-nowrap font-bold'>
								{scenario.title}
							</div>
							{scenario?.previewOnly && (
								<Explanation>
									<div className='text-center'>
										This feature is in Beta mode. <br />
										Early access limited to Ultimate users.
									</div>
								</Explanation>
							)}
						</div>
					))}
				</div>
			</Column>
		</div>
	);
};

export default ScenarioChoicePage;
