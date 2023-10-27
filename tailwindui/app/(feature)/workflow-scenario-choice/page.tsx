'use client'

import React from 'react'
// import {
//   PresentationTypeIcon,
//   SocialPostTypeIcon,
// } from '@/app/(feature)/workflow-type-choice/icons'
import { useRouter } from 'next/navigation'
const ScenarioChoicePage = () => {
  const router = useRouter() // Initialize the router
  // Function to navigate to the "workflow-scenario-choice" page
  const navigateToScenarioChoice = () => {
    router.push('/workflow-generate-outline') // Specify the route you want to navigate to
  }
  return (
    <div className='bg-zinc-100 min-h-screen'>
      <div className='flex flex-col justify-center items-center gap-12'>
        {/* title */}
        <div className='w-96 text-center text-neutral-800 text-2xl font-normal font-creato-medium leading-9 tracking-wide'>
          Great! Where are you going to use it?
        </div>
        <div className='w-96 h-8 text-center text-gray-600 text-base font-normal font-creato-medium leading-normal tracking-tight'>
          We’ll create contents tailored to your using scenario.
        </div>
        {/* four types of scenarios */}
        <div className='flex flex-row gap-5'>
          <div className='w-60 h-64 bg-neutral-50 rounded-lg shadow' />
          <div className='w-60 h-64 bg-neutral-50 rounded-lg shadow' />
          <div className='w-60 h-64 bg-neutral-50 rounded-lg shadow' />
          <div className='w-60 h-64 bg-neutral-50 rounded-lg shadow' />
        </div>
      </div>
    </div>
  )
}

export default ScenarioChoicePage
