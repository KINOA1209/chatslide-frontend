'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-scenario-choice.css'

const ScenarioChoicePage = () => {
  const router = useRouter() // Initialize the router
  // Function to navigate to the "workflow-scenario-choice" page
  const navigateToScenarioChoice = (scenarioType:string) => {
    router.push(`/workflow-generate-socialpost?scenarioType=${scenarioType}`) // Specify the route you want to navigate to
  }
  const customBreakpointStyles = {
    '@media (max-width: 960px)': {
      width: '100%',
    },
  };
  return (
    <div className='bg-zinc-100 min-h-screen mt-[10rem]'>
      <div className='flex flex-col justify-center items-center gap-4 sm:gap-12 p-4 sm:p-8'>
        {/* title */}
        <div className='w-96 text-center text-neutral-800 text-2xl font-normal font-creato-medium leading-9 tracking-wide'>
          Which style do you prefer?
        </div>
        <div className='w-96 h-8 text-center text-gray-600 text-base font-normal font-creato-medium leading-normal tracking-tight'>
          We’ll create contents tailored to your audiences.
        </div>
        {/* four types of scenarios */}
        <div className='flex flex-col gap-4 md:gap-5' id='choice_container'>
          <div 
            className='w-full h-[200px] bg-gray-300 rounded-lg shadow flex justify-center items-center cursor-pointer'
            onClick={() => navigateToScenarioChoice('casual_topic')}
          >
            <img className='w-[281px] h-[174px]' src="/images/socialpost/casual_topic.png" />
          </div>
          <div 
            className='w-full h-[200px] bg-gray-300 rounded-lg shadow flex justify-center items-center cursor-pointer'
            onClick={() => navigateToScenarioChoice('serious_topic')}
          >
            <img className='w-[281px] h-[174px]' src="/images/socialpost/serious_topic.png" />
          </div>
          <div 
            className='w-full h-[200px] bg-gray-300 rounded-lg shadow flex justify-center items-center cursor-pointer'
            onClick={() => navigateToScenarioChoice('reading_notes')}
          >
            <img className='w-[281px] h-[174px]' src="/images/socialpost/reading_notes.png" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScenarioChoicePage
