'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css';
import Image from 'next/image';
import socialpost_scenarios from './socialpost_scenarios.json';
import slides_scenarios from './slides_scenarios.json';
import SessionStorage from '@/components/utils/SessionStorage';
import OnboardingSurvey from '@/components/slides/onboardingSurvey/OnboardingSurvey';
import AuthService from '@/services/AuthService';

const ScenarioChoicePage = () => {
	const router = useRouter();
	const workflowType = SessionStorage.getItem('workflowType', 'slides');
	const scenarios =
		workflowType == 'slides' ? slides_scenarios : socialpost_scenarios;
	const [isNewUser, setIsNewUser] = useState(false)
	const [showSurvey, setShowSurvey] = useState(false)
	const activeSlideRef = useRef<HTMLDivElement>(null);
    const parentContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkUserSurveyStatus = async () => {
            try {
                const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
                const response = await fetch('/api/user/check_survey_status', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${idToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.survey_status === 'incomplete'){
						setIsNewUser(true)
					}
                } 
				else {
                    console.error('HTTP Error:', response.statusText);
                }
            } 
			catch (error) {
                console.error('Error:', error);
            }
        };
        checkUserSurveyStatus();
    }, []);

	useEffect(() => {
		const updateHeight = () => {
			if (activeSlideRef.current && parentContainerRef.current) {
				const height = activeSlideRef.current.offsetHeight;
				parentContainerRef.current.style.height = `${height}px`;
			}
		};

		// MutataionObserver to dynamically adjust the container's height
		if (activeSlideRef.current && parentContainerRef.current) {
			const observer = new MutationObserver(updateHeight);
			// looking for anychange in onboardingsurvey, once a section shows, it will call updateHeight
			observer.observe(activeSlideRef.current, {
				childList: true,
				subtree: true,  
				characterData: true
			});

			//also trigger updateHeight when the user resizes the window
			window.addEventListener('resize', updateHeight);

			updateHeight();

			return () => {
				observer.disconnect();
				window.removeEventListener('resize', updateHeight);
			};
		}
	}, [showSurvey, activeSlideRef, parentContainerRef]);

	// Function to navigate to the "workflow-scenario-choice" page
	const navigateToSummary = (scenarioType: string) => {
		sessionStorage.setItem('scenarioType', scenarioType);
		if (isNewUser) setShowSurvey(true);
		else if (workflowType == 'slides') router.push('/workflow-generate-outlines');
		else router.push('/workflow-generate-socialpost');
	};

	const handleBackToChoices = () => {
		setShowSurvey(false)
	}

	return (
		<div className='parent-container bg-zinc-100 min-h-screen' ref={parentContainerRef}>
			<div className={`slide-page ${showSurvey ? 'hidden-slide' : 'visible-slide'}`} ref={showSurvey ? activeSlideRef : null}>
				<div className='flex flex-col justify-center items-center gap-4 sm:gap-12 p-4 sm:p-8'>
					{/* title */}
					<div className='w-[80vh] mt-[3rem] sm:mt-[12rem] text-center text-neutral-800 text-xl sm:text-2xl font-normal font-creato-medium leading-9 tracking-wide'>
						{scenarios.message}
					</div>
					<div className='w-[80vh] h-8 text-center text-gray-600 text-base font-normal font-creato-medium leading-normal tracking-tight'>
						{scenarios.description}
					</div>
					{/* three types of scenarios */}
					<div className='flex flex-col gap-4 md:gap-5' id='choice_container'>
						{scenarios.options.map((scenario) => (
							<div key={scenario.id} className='flex flex-col w-full'>
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
			{showSurvey && (
                <div className={`slide-page ${showSurvey ? 'visible-slide' : 'hidden-slide'}`} ref={showSurvey ? activeSlideRef : null}>
                    <OnboardingSurvey handleBack={handleBackToChoices}/>
                </div>
            )}
		</div>
	);
};

export default ScenarioChoicePage;
