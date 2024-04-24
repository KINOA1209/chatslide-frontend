'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import Image from 'next/image';
import scenarios from './choices.json';
import SessionStorage from '@/utils/SessionStorage';
import AuthService from '@/services/AuthService';
import { BackButton } from '@/components/button/DrlambdaButton';
import { BigTitle, Title } from '@/components/ui/Text';
import { Column } from '@/components/layout/Column';

const ScenarioChoicePage = () => {
	const router = useRouter(); // Initialize the router
	const [username, setUsername] = useState(''); // Initialize the username state

	// Function to navigate to the "scenario-choice" page
	const navigate = (type: string) => {
		sessionStorage.setItem('workflowType', type);
		router.push('/scenario-choice');
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const username = await AuthService.getCurrentUserDisplayName();
				setUsername(username);
			} catch (error) {
				console.log('No authenticated user.');
			}
		};

		fetchUser();
	}, []);

	return (
		<div className='flex flex-col flex-grow justify-center items-center relative'>
			<div className='absolute hidden sm:block top-5 left-5'>
				<BackButton
					href='/dashboard'
					dark={true}
					text='Dashboard'
				/>
        <div className='block md:hidden h-[3rem]' /> {/* Spacer */} 
			</div>
			<Column>
				{/* title */}
				<Title>
					Hey {username}, <br />
					what are you planning to create today?
				</Title>
				{/* <div className='w-[80vh] h-8 text-center text-gray-600 text-base font-normal font-creato-medium leading-normal tracking-tight'>
          {scenarios.description}
        </div> */}
				{/* three types of scenarios */}
				<div className='flex flex-wrap flex-row gap-4 md:gap-6 w-full mx-auto justify-center' id='choice_container'>
					{scenarios.options.map((scenario) => (
						<div
							key={scenario.id}
							className='flex flex-col transition-transform transform-gpu hover:scale-110'
						>
							<div
								className='h-[250px] sm:h-[300px] bg-gray-300 rounded-lg shadow flex justify-center items-center cursor-pointer mb-4'
								onClick={() => navigate(scenario.id)}
							>
								<Image
									className='mx-[20px] mh-[20px]'
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
			</Column>
		</div>
	);
};

export default ScenarioChoicePage;
