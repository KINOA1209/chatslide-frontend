'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import Image from 'next/image';
import scenarios from './choices.json';
import SessionStorage from '@/utils/SessionStorage';
import AuthService from '@/services/AuthService';
import { BackButton } from '@/components/button/DrlambdaButton';

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
		<div className='bg-zinc-100 flex flex-col flex-grow justify-center items-center relative'>
			<div className='absolute hidden sm:block top-5 left-5'>
				<BackButton
					href='/dashboard'
					dark={true}
					text='Dashboard'
				/>
			</div>
			<div className='flex flex-col justify-center items-center gap-4 sm:gap-12 p-4 sm:p-8'>
				{/* title */}
				<div className='w-[80vh] text-center text-neutral-800 text-xl sm:text-2xl font-normal font-creato-medium leading-9 tracking-wide whitespace-normal break-words'>
					Hey {username}, <br />
					what are you planning to create today?
				</div>
				{/* <div className='w-[80vh] h-8 text-center text-gray-600 text-base font-normal font-creato-medium leading-normal tracking-tight'>
          {scenarios.description}
        </div> */}
				{/* three types of scenarios */}
				<div className='flex flex-col gap-4 md:gap-6' id='choice_container'>
					{scenarios.options.map((scenario) => (
						<div
							key={scenario.id}
							className='flex flex-col w-full transition-transform transform-gpu hover:scale-110'
						>
							<div
								className='w-full h-[250px] sm:h-[300px] bg-gray-300 rounded-lg shadow flex justify-center items-center cursor-pointer mb-4'
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
			</div>
		</div>
	);
};

export default ScenarioChoicePage;
