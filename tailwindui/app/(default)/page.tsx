'use client'

import { DrlambdaLogoIcon } from '@/components/new_landing/Icons'
import Image from 'next/image'
import MyProjectsImg from '@/public/new_landing/imgs/my-project.png'
import ScriptIcon from '@/public/new_landing/svgs/script.svg?react'
import SlidesIcon from '@/public/new_landing/svgs/slides.svg?react'
import VideoIcon from '@/public/new_landing/svgs/video.svg?react'

// import MedalIcon from '../../public/new_landing/svgs/medal-bronze.svg'
// import PdfFileIcon from './assets/svgs/filetypes/pdf-file-icon.svg?react'
// import GoogleDriveIcon from './assets/svgs/filetypes/google-drive-icon.svg?react'
// import MyProjectsImg from '../../public/new_landing/svgs/my-projects.svg'

import Footer from '../../components/ui/footer'
import PricingPlans from '../../components/new_landing/PricingPlans'
// import MyProjectExample from '../../components/new_landing/MyProjectExample'
import FeatureCards from '../../components/new_landing/FeatureCards'
import { pricingPlansMonthlyData } from '../../components/new_landing/data/pricingPlansData'
import { pricingPlansYearlyData } from '../../components/new_landing/data/pricingPlansData'
import { useEffect, useState } from 'react'
import GenerationPreview from '../../components/new_landing/GenerationPreview'
import Link from 'next/link'
import AuthService from '@/components/utils/AuthService'
import Header from '@/components/ui/header'

function App() {
  const [isYearlyData, setIsYearlyData] = useState(false)

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)

  const [pricingPlansData, setPricingPlansData] = useState(
    pricingPlansMonthlyData
  )

  const fetchUser = async () => {
    const user = await AuthService.getCurrentUser()
    setUser(user)
    setUsername(user?.attributes.name)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleMonthlyClick = () => {
    setIsYearlyData(false)
    setPricingPlansData(pricingPlansMonthlyData)
  }

  const handleYearlyClick = () => {
    setIsYearlyData(true)
    setPricingPlansData(pricingPlansYearlyData)
  }

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const currentDomain = window.location.hostname
    if (isMobile && currentDomain === 'pro.drlambda.ai') {
      window.location.href = 'https://drlambda.ai'
    }
  }, [])

  return (
    <>
      <Header loginRequired={false} isLanding={true} />
      {/* background container */}
      <div className='background w-full relative bg-zinc-100'>
        {/* Section: Transform Knowledge */}
        <div className='relative intro-section flex flex-col justify-center items-center gap-4'>
          <div className='w-[80%] text-center text-neutral-900 text-5xl lg:text-8xl leading-[4rem] lg:leading-[7.5rem] pt-32'>
            Transform Knowledge
          </div>

          <a
            href='https://www.producthunt.com/posts/drlambda-pro?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-drlambda&#0045;pro'
            target='_blank'
          >
            <img
              src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=419457&theme=light'
              alt='DrLambda&#0032;Pro - One&#0045;click&#0032;presentation&#0032;AI&#0032;tool&#0032;through&#0032;multiple&#0032;sources | Product Hunt'
              className='w-[11rem] lg:w-[20rem]'
            />
          </a>
          <div className='mt-6 w-96 h-14 text-center text-neutral-900 text-2xl lg:text-3xl leading-10 tracking-wide font-creato-medium'>
            Refine the Raw by AI
          </div>
          <div className='text-center mb-[5rem] text-md lg:text-xl'>
            <span className='text-gray-700 font-normal leading-loose tracking-wide font-creato-regular'>
              Transform fragmented information or curiosity <br /> sparkles into
            </span>
            <span className='text-gray-700 font-bold leading-loose tracking-wide'>
              {' '}
              ready-to-use content
            </span>
            <span className='text-gray-700  font-normal leading-loose tracking-wide'>
              .
            </span>
          </div>
          {/* start for free button */}
          <div className='absolute bottom-[56rem] w-28 h-12 lg:w-56 lg:h-14 px-4 py-1 bg-gradient-to-b from-blue-950 to-slate-950 rounded-lg shadow border border-blue-700 flex-col justify-center items-center gap-2.5 inline-flex z-10'>
            <div className='w-40 h-12 text-center text-zinc-100 text-sm lg:text-xl font-bold font-creato-medium capitalize leading-10 tracking-wide'>
              {user ? (
                <Link href='/dashboard'>Go to Dashboard</Link>
              ) : (
                <Link href='/signin'>Start for Free</Link>
              )}
            </div>
          </div>
          <GenerationPreview />
        </div>

        {/* section: The Master Alchemist of Knowledge Crafting */}
        <div className='mt-[3rem] flex flex-col justify-center items-center'>
          <div className='w-[80%] text-center text-neutral-900 text-4xl lg:text-7xl leading-[4rem] lg:leading-[7.5rem] pt-32'>
            The Master Alchemist of <br /> Knowledge Crafting
          </div>
          <div className='text-center mt-[3rem] text-md lg:text-xl'>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              From{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-regular leading-loose tracking-wide'>
              multi-source synthesis
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              to{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              topic-driven content generation
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              , <br />
              achieve{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              precision
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              in every narrative with Dr.Lambda.
            </span>
          </div>

          {/* discord icon */}
          <div className='mt-[3rem] mb-[5rem] w-80 h-16 bg-white rounded-2xl border border-indigo-500 flex items-center'>
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
                <Link href='https://discord.gg/CKVdZDAuu3'>
                  Join our community
                </Link>
              </div>
            </div>
          </div>

          {/* grid cards for features */}
          <FeatureCards />
        </div>
        {/* section: Build up your personal knowledge library */}
        <div className='relative h-[83rem] flex flex-col justify-center items-center overflow-x-hidden'>
          <div className='w-[80%] text-center text-neutral-900 text-4xl lg:text-7xl leading-[4rem] lg:leading-[7.5rem] pt-32'>
            Build up your personal <br /> knowledge library
          </div>
          <div className='text-center mt-[3rem] text-md lg:text-xl'>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              Curate
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              ,{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              organize
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              , and{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              access
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              your insights and information, all in one{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              centralized hub
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              for continuous learning.
            </span>
          </div>
          {/* my projects */}
          <div className='relative mt-[6.25rem] w-[80%] h-auto bg-white rounded-3xl flex flex-col justify-start items-center px-12 py-10 gap-6'>
            {/* <div className='w-[28rem] opacity-95 text-neutral-800 text-3xl font-bold font-creato-medium leading-10 tracking-wider'>
              My Projects
            </div> */}
            {/* <MyProjectExample />
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-neutral-50'></div> */}
            <Image
              src={MyProjectsImg}
              alt='my project'
              className='object-contain w-full h-full'
            />
            <div>
              {/* <MyProjectsImg className='object-contain w-full h-full' /> */}
            </div>
            {/* file type icons list */}
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
        <div className='mt-[6rem] flex flex-col justify-center items-center'>
          <div className='w-[80%] text-center text-neutral-900 text-4xl lg:text-7xl leading-[4rem] lg:leading-[7.5rem] pt-32'>
            Multifaceted Outputs
          </div>
          <div className='text-center mt-[3rem] text-md lg:text-xl'>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              Showcase your ideas across diverse formats, ensuring each piece of{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              knowledge
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              shines in its{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              best light
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              .
            </span>
          </div>
          {/* three icons */}
          <div className='relative w-full h-[34rem] flex justify-evenly items-center text-center mt-[6rem] bg-[#E3E9FF] overflow-auto'>
            {/* <div className='absolute inset-0 bg-[#E3E9FF] opacity-30'></div> */}
            <div className='flex flex-col justify-center items-center w-1/3 min-w-fit h-full gap-10'>
              {/* <img
                className='w-48 h-48'
                src='https://via.placeholder.com/328x73'
              /> */}
              <ScriptIcon />
              <div className='text-center text-gray-700 text-4xl font-medium font-creato-medium leading-10 tracking-wide'>
                Script
              </div>
            </div>
            <div className='flex flex-col border-r-2 border-l-2 border-slate-300 justify-center items-center w-1/3 min-w-fit h-full gap-10'>
              {/* <img className='w-48 h-48' src='src/imgs/medal-bronze.png' /> */}
              <SlidesIcon />
              <div className='text-center text-gray-700 text-4xl font-medium font-creato-medium leading-10 tracking-wide'>
                Slides
              </div>
            </div>
            <div className='flex flex-col justify-center items-center w-1/3 min-w-fit h-full gap-10'>
              {/* <img
                className='w-48 h-48'
                src='https://via.placeholder.com/328x73'
              /> */}
              <VideoIcon />
              <div className='text-center text-gray-700 text-4xl font-medium font-creato-medium leading-10 tracking-wide'>
                Video
              </div>
            </div>
          </div>
        </div>

        {/* Turning your knowledge into stories worth sharing. */}
        <div className='mt-[12rem] mb-[10rem] flex flex-col justify-center items-center'>
          <div className='w-[80%] text-center text-neutral-900 text-4xl lg:text-7xl leading-[4rem] lg:leading-[7.5rem] pt-32'>
            Turning your knowledge <br />
            into stories worth sharing.{' '}
          </div>
          <div className='w-28 h-12 lg:w-56 lg:h-14 mt-[2.5rem] mb-[5rem] px-8 py-1 bg-gradient-to-b from-blue-950 to-slate-950 rounded-lg shadow border border-blue-700 flex-col justify-center items-center gap-2.5 inline-flex'>
            <div className='w-40 h-14 text-center text-zinc-100 text-sm lg:text:xl font-bold font-creato-bold capitalize leading-10 tracking-wide'>
              Dive in Today
            </div>
          </div>
          {/* billing options, yearly and monthly */}
          <div className='w-[90%] mb-[3rem] flex justify-center lg:justify-end items-center'>
            <div className='billing-options flex justify-center items-center rounded-xl bg-Grey-100'>
              <div
                className='billing-option text-[0.7rem] lg:text-base px-2 py-2 cursor-pointer'
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
                className='billing-option text-[0.7rem] lg:text-base px-2 py-2 cursor-pointer'
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
