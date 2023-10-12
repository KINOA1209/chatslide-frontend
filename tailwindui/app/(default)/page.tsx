'use client'

import {ScriptIcon, SlidesIcon, VideoIcon, DrlambdaLogoIcon } from '@/components/new_landing/Icons'
// import MedalIcon from '../../public/new_landing/svgs/medal-bronze.svg'
// import PdfFileIcon from './assets/svgs/filetypes/pdf-file-icon.svg?react'
// import GoogleDriveIcon from './assets/svgs/filetypes/google-drive-icon.svg?react'
// import MyProjectsImg from '../../public/new_landing/svgs/my-projects.svg'

import Footer from '../../components/new_landing/Footer'
import PricingPlans from '../../components/new_landing/PricingPlans'
import MyProjectExample from '../../components/new_landing/MyProjectExample'
import FeatureCards from '../../components/new_landing/FeatureCards'
import { pricingPlansMonthlyData } from '../../components/new_landing/data/pricingPlansData'
import { pricingPlansYearlyData } from '../../components/new_landing/data/pricingPlansData'
import { useState } from 'react'
import GenerationPreview from '../../components/new_landing/GenerationPreview'

function App() {
  const [isYearlyData, setIsYearlyData] = useState(false)
  const [pricingPlansData, setPricingPlansData] = useState(
    pricingPlansMonthlyData
  )

  const handleMonthlyClick = () => {
    setIsYearlyData(false)
    setPricingPlansData(pricingPlansMonthlyData)
  }

  const handleYearlyClick = () => {
    setIsYearlyData(true)
    setPricingPlansData(pricingPlansYearlyData)
  }
  return (
    <>
      {/* background container */}
      <div className='background w-full relative bg-zinc-100'>
        <div className='fixed nav-bar w-full h-12 bg-neutral-800 text-zinc-100 text-sm flex justify-center items-center p-4 z-50'>
          {/* company logo */}
          <div className='company-logo flex justify-center items-center gap-2 py-1'>
            <div className='w-8 h-8 relative'>
              <div className='w-6 h-8 left-[3px] -top-[2px] absolute'>
                <DrlambdaLogoIcon />
              </div>
            </div>

            <div className='w-36 h-8 text-zinc-100 text-3xl font-creato-regular leading-7 tracking-[0.035rem]'>
              DrLambda
            </div>
          </div>
          <div className='flex-grow'></div> {/* Empty space-filling div */}
          <div className='menu-items flex gap-5 justify-center'>
            <span className='px-6 py-2'>Feature</span>
            <span className='px-6 py-2'>Use Case</span>
            <span className='px-6 py-2'>Testimonial</span>
            <span className='px-6 py-2'>Pricing</span>
          </div>
          <div className='flex-grow'></div> {/* Empty space-filling div */}
          <div className='get-start-btn mr-14 bg-indigo-500 rounded-lg flex justify-center items-center px-4 py-2'>
            <span>Get Started</span>
          </div>
        </div>

        {/* Section: Transform Knowledge */}
        <div className='relative intro-section flex flex-col justify-center items-center gap-4'>
          <div className='text-center text-neutral-900 text-8xl leading-[7.5rem] pt-32'>
            Transform Knowledge
          </div>

          <div className='w-80 h-16 bg-white rounded-2xl border border-red-400 flex items-center'>
            {/* <img
              className='w-12 h-12 ml-4'
              src='src/assets/imgs/medal-bronze.png'
            /> */}
            {/* <MedalIcon className='w-12 h-12 ml-4' /> */}
            <div className='ml-4 flex flex-col'>
              <div className='w-28 h-5 pt-1 text-red-400 text-xs font-extrabold font-creato-medium leading-loose tracking-[0.01388rem;]'>
                PRODUCT HUNT
              </div>
              <div className='w-60 h-8 pb-10 text-red-400 text-xl font-bold font-creato-medium leading-10 tracking-wide'>
                #3 Product of the Day
              </div>
            </div>
          </div>
          <div className='w-96 h-14 text-center text-neutral-900 text-3xl leading-10 tracking-wide'>
            Refine the Raw by AI
          </div>
          <div className='text-center mb-[5rem]'>
            <span className='text-gray-700 text-xl font-normal leading-loose tracking-wide'>
              Transform fragmented information or curiosity <br /> sparkles into
            </span>
            <span className='text-gray-700 text-xl font-bold leading-loose tracking-wide'>
              {' '}
              ready-to-use content
            </span>
            <span className='text-gray-700 text-xl font-normal leading-loose tracking-wide'>
              .
            </span>
          </div>
          {/* start for free button */}
          <div className='absolute bottom-[56rem] w-56 h-14 px-8 py-1 bg-gradient-to-b from-blue-950 to-slate-950 rounded-lg shadow border border-blue-700 flex-col justify-center items-center gap-2.5 inline-flex z-10'>
            <div className='w-40 h-14 text-center text-zinc-100 text-xl font-medium font-creato-medium capitalize leading-10 tracking-wide'>
              Start for free
            </div>
          </div>
          <GenerationPreview />
        </div>

        {/* section: The Master Alchemist of Knowledge Crafting */}
        <div className='h-[83rem] mt-[40rem] flex flex-col justify-center items-center'>
          <div className='w-[60rem] h-56 text-center text-zinc-900 text-7xl font-medium font-creato-medium leading-[6.25rem]'>
            The Master Alchemist of <br /> Knowledge Crafting
          </div>
          <div className='w-[46.375rem] text-center'>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              From{' '}
            </span>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              multi-source synthesis
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              {' '}
              to{' '}
            </span>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              topic-driven content generation
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              , <br />
              achieve{' '}
            </span>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              precision
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              {' '}
              in every narrative with Dr.Lambda.
            </span>
          </div>

          {/* discord icon */}
          <div className='mt-[3.75rem] mb-[7.5rem] w-80 h-16 bg-white rounded-2xl border border-indigo-500 flex items-center'>
            <img
              className='w-8 h-6 ml-4'
              src='new_landing/imgs/discord-icon.png'
            />
            {/* <MedalIcon className='w-12 h-12 ml-4' /> */}
            <div className='ml-4 flex flex-col'>
              <div className='w-28 h-5 pt-1 text-indigo-500 text-xs font-extrabold font-creato-medium leading-loose tracking-[0.01388rem]'>
                DISCORD
              </div>
              <div className='w-52 h-8 pb-10 text-indigo-500 text-xl font-bold font-creato-medium leading-10 tracking-[0.02425rem]'>
                Join our community
              </div>
            </div>
          </div>

          {/* grid cards for features */}
          <FeatureCards />
        </div>
        {/* section: Build up your personal knowledge library */}
        <div className='relative h-[83rem] mt-[20rem] flex flex-col justify-center items-center overflow-x-hidden'>
          <div className=" w-[70rem] h-56 text-center text-zinc-900 text-7xl font-medium font-['Creato Display'] leading-[6.25rem]">
            Build up your personal <br /> knowledge library
          </div>
          <div className='w-[46rem] text-center'>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              Curate
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              ,{' '}
            </span>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              organize
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              , and{' '}
            </span>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              access
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              {' '}
              your insights and information, all in one{' '}
            </span>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              centralized hub
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              {' '}
              for continuous learning.
            </span>
          </div>
          {/* my projects */}
          <div className='relative mt-[6.25rem] w-[80%] h-auto bg-white rounded-3xl flex flex-col justify-start items-center px-12 py-10 gap-6'>
            {/* <div className='w-[28rem] opacity-95 text-neutral-800 text-3xl font-bold font-creato-medium leading-10 tracking-wider'>
              My Projects
            </div>
            <MyProjectExample />
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-neutral-50'></div> */}
            <div>
              {/* <MyProjectsImg className='object-contain w-full h-full' /> */}
            </div>
            <div className='absolute top-[90%] icons-list flex justify-evenly items-center gap-12 z-10'>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[4rem] h-[4rem]'
                  src='/new_landing/imgs/pdf-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[5rem] h-[5rem]'
                  src='/new_landing/imgs/csv-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[5rem] h-[5rem]'
                  src='/new_landing/imgs/word-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[4rem] h-[4rem]'
                  src='/new_landing/imgs/box-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[8rem] h-[8rem]'
                  src='/new_landing/imgs/slack-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[4rem] h-[4rem]'
                  src='/new_landing/imgs/dropbox-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[5rem] h-[5rem]'
                  src='/new_landing/imgs/ppt-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[4rem] h-[4rem]'
                  src='/new_landing/imgs/unknown-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[5rem] h-[5rem]'
                  src='/new_landing/imgs/google-drive-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[4rem] h-[4rem]'
                  src='/new_landing/imgs/pdf-file-icon.png'
                />
              </div>
              <div className='w-32 h-32 bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'>
                <img
                  className='w-[5rem] h-[5rem]'
                  src='/new_landing/imgs/csv-file-icon.png'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Multifaceted Outputs */}
        <div className='mt-[12rem] flex flex-col justify-center items-center'>
          <div className="w-[70rem] h-28 text-center text-zinc-900 text-7xl font-medium font-['Creato Display'] leading-10 px-4 py-2">
            Multifaceted Outputs
          </div>
          <div className='w-[46rem] text-center'>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              Showcase your ideas across diverse formats, ensuring each piece of{' '}
            </span>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              knowledge
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              {' '}
              shines in its{' '}
            </span>
            <span className="text-neutral-800 text-xl font-bold font-['Creato Display'] leading-loose tracking-wide">
              best light
            </span>
            <span className="text-neutral-800 text-xl font-normal font-['Creato Display'] leading-loose tracking-wide">
              .
            </span>
          </div>
          <div className='relative w-full h-[34rem] flex justify-evenly items-cente text-center mt-[6rem] bg-[#E3E9FF]'>
            {/* <div className='absolute inset-0 bg-[#E3E9FF] opacity-30'></div> */}
            <div className='flex flex-col justify-center items-center w-1/3 h-full gap-10'>
              {/* <img
                className='w-48 h-48'
                src='https://via.placeholder.com/328x73'
              /> */}
              <ScriptIcon />
              <div className="text-center text-gray-700 text-4xl font-medium font-['Creato Display'] leading-10 tracking-wide">
                Script
              </div>
            </div>
            <div className='flex flex-col border-r-2 border-l-2 border-slate-300 justify-center items-center w-1/3 h-full gap-10'>
              {/* <img className='w-48 h-48' src='src/imgs/medal-bronze.png' /> */}
              <SlidesIcon />
              <div className="text-center text-gray-700 text-4xl font-medium font-['Creato Display'] leading-10 tracking-wide">
                Slides
              </div>
            </div>
            <div className='flex flex-col justify-center items-center w-1/3 h-full gap-10'>
              {/* <img
                className='w-48 h-48'
                src='https://via.placeholder.com/328x73'
              /> */}
              <VideoIcon />
              <div className="text-center text-gray-700 text-4xl font-medium font-['Creato Display'] leading-10 tracking-wide">
                Video
              </div>
            </div>
          </div>
        </div>

        {/* Turning your knowledge into stories worth sharing. */}
        <div className='mt-[12rem] mb-[30rem] flex flex-col justify-center items-center'>
          <div className="w-[60rem] h-56 text-center text-zinc-900 text-7xl font-medium font-['Creato Display'] leading-[6.25rem]">
            Turning your knowledge <br />
            into stories worth sharing.{' '}
          </div>
          <div className='w-56 h-14 mt-[2.5rem] mb-[10rem] px-8 py-1 bg-gradient-to-b from-blue-950 to-slate-950 rounded-lg shadow border border-blue-700 flex-col justify-center items-center gap-2.5 inline-flex'>
            <div className="w-40 h-14 text-center text-zinc-100 text-xl font-medium font-['Creato Display'] capitalize leading-10 tracking-wide">
              Dive in Today
            </div>
          </div>
          <div className='w-[80rem] mb-[3rem] flex justify-end items-center'>
            <div className='billing-options flex justify-center items-center rounded-xl bg-Grey-100'>
              <div
                className='billing-option text-[1rem] px-2 py-2'
                onClick={handleMonthlyClick}
              >
                <span
                  className={`rounded-md ${
                    isYearlyData ? '' : 'bg-Grey-50'
                  } px-[1rem] py-[0.1rem] font-medium`}
                >
                  Monthly billing
                </span>
              </div>
              <div
                className='billing-option text-[1rem] px-2 py-2'
                onClick={handleYearlyClick}
              >
                <span
                  className={`rounded-md px-[1rem] py-[0.1rem] text-Grey-600 ${
                    isYearlyData ? 'bg-Grey-50' : ''
                  } font-normal `}
                >
                  Yearly Billing (save 17%)
                </span>
              </div>
            </div>
          </div>

          <PricingPlans pricingPlansData={pricingPlansData} />
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
