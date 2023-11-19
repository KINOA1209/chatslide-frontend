'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import {
  PresentationTypeIcon,
  SocialPostTypeIcon,
} from '@/app/(feature)/workflow-type-choice/icons'
import { useRouter } from 'next/navigation'
import AuthService from '@/components/utils/AuthService'

const TypeChoicePage = () => {
  const router = useRouter() // Initialize the router
  // Function to navigate to the "workflow-scenario-choice" page
  // Specify the route you want to navigate to
  const [username, setUsername] = useState(null)
  const navigateToScenarioChoice = (workflowType:string) => {
    if (workflowType === 'presentation'){
      router.push('/workflow-generate-outlines')
    } else if (workflowType === 'socialpost'){
      router.push('/workflow-scenario-choice') 
    }
  }

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
        <div className='w-full mt-[12rem] max-w-screen-lg text-center text-neutral-800 text-lg sm:text-2xl font-normal font-creato-medium leading-7 sm:leading-9 tracking-wide'>
          Hey, {username}! <br />
          What are you planning to create today?
        </div>
        {/* two types choices */}
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-5'>
          {/* Presentation */}
          <div
            onClick={() => navigateToScenarioChoice('presentation')} // Attach the onClick handler
            className='w-full sm:w-96 h-64 bg-neutral-50 rounded-lg shadow flex flex-col justify-center items-center gap-2 sm:gap-8 cursor-pointer'
          >
            {/* icons and type text box */}
            <div className='w-[7.5rem] h-[6.75rem]'>
              <PresentationTypeIcon />
            </div>
            <div className='text-center text-neutral-800 text-2xl font-bold font-creato-medium leading-snug tracking-wide'>
              Presentation
            </div>
          </div>
          {/* Social Post */}
          <div
            onClick={() => navigateToScenarioChoice('socialpost')}
            className='w-96 h-64 bg-neutral-50 rounded-lg shadow flex flex-col justify-center items-center gap-8 cursor-pointer'
          >
            {/* icons and type text box */}
            <div className='w-[7.5rem] h-[6.75rem]'>
              <SocialPostTypeIcon />
            </div>
            <div className='flex flex-row items-end text-center text-neutral-800 text-2xl font-bold font-creato-medium leading-snug tracking-wide'>
              <div className='text-center text-neutral-800 text-2xl font-bold font-creato-medium leading-snug tracking-wide'>
                Social Post
              </div>
              <div className='text-center text-neutral-800 text-xs font-bold font-creato-medium leading-snug tracking-wide bg-gray-200 rounded px-1 py-0.5 ml-2'>
                Beta
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TypeChoicePage
