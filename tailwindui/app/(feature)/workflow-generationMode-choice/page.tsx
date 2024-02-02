'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import Image from 'next/image';
import mode_choices from './mode_choices.json';
import SessionStorage from '@/components/utils/SessionStorage';
import AuthService from '@/services/AuthService';

const GenerationModePage = () => {
	const router = useRouter(); // Initialize the router
	const [username, setUsername] = useState(''); // Initialize the username state

	const navigate = (type: string) => {
		sessionStorage.setItem('generation_mode', type);
		router.push('/workflow-generate-outlines');
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
		<div className='bg-zinc-100 min-h-screen'>
			<div className='flex flex-col justify-center items-center gap-4 sm:gap-12 p-4 sm:p-8'>
				{/* title */}
				<div className='w-[80vh] mt-[3rem] sm:mt-[12rem] text-center text-neutral-800 text-xl sm:text-2xl font-normal font-creato-medium leading-9 tracking-wide whitespace-normal break-words'>
					Hey {username}, <br />
					How would you like to generate your output?
				</div>
				<div className='flex flex-col gap-4 md:gap-5' id='choice_container'>
					{mode_choices.options.map((option) => (
						<div key={option.id} className='flex flex-col w-full'>
							<div
								className='w-full h-[300px] sm:h-[350px] bg-[#FCFCFC] rounded-lg shadow flex justify-center items-center cursor-pointer mb-4 flex-col'
								onClick={() => navigate(option.id)}
							>
								<Image
									className='mx-[80px] mh-[80px]'
									width={220}
									height={220}
									alt={option.id}
									src={option.imageSrc}
								/>
                                <div className='text-center text-lg my-3 font-creato-medium leading-snug tracking-wide whitespace-nowrap font-bold'>
								    {option.title}
							    </div>
                                <div className='text-center my-2 font-creato-medium leading-snug tracking-tight whitespace-nowrap font-normal'>
								    {option.description}
							    </div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GenerationModePage;
