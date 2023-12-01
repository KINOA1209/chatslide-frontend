import React from 'react'
import { MainSlideProps } from '../slideTemplates'
import Image, { StaticImageData } from 'next/image'
import BerkeleyLogo from '@/public/images/template/Berkeley/Berkeley_logo.png'
import MaskedBackground from '@/public/images/template/Berkeley/Mask Background.png'
import BerkeleyLogoWhite from '@/public/images/template/Berkeley/Berkeley_logo_white.png'
export const Berkeley_school_template = ({
  user_name,
  title,
  topic,
  subtopic,
  content,
  imgs,
  update_callback,
  canEdit,
  autoSave,
  isCoverPage,
}: MainSlideProps) => {
  return (
    <>
      {/* for not-cover page slides */}
      <div
        className={`${
          !isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-col justify-start items-start box-border border-none relative bg-[#F0F2F5] p-[28px]'
            : 'hidden'
        }`}
      >
        <div className='h-auto '>
          <div className='h-full flex items-center justify-center text-[#003262] text-5xl leading-[120%] font-sans font-bold whitespace-nowrap'>
            {topic}
          </div>
        </div>
        <div className='text-[#3B7EA1] text-3xl font-semibold leading-[120%] font-sans'>
          {subtopic}
        </div>
        <hr className='border border-[#E7E9EB] w-full mt-6 mb-6'></hr>
        <div
          className='flex flex-col text-[#1B1B1B] text-xl font-normal font-sans leading-[160%] justify-center text-left items-start'
          style={{
            //   display: 'list-item',
            listStyleType: 'none',
            listStylePosition: 'inside',
            //   fontSize: '18pt',
            //   marginLeft: '20px',
          }}
        >
          {content}

          {/* Add your content here */}
        </div>
      </div>
      {/* for cover page */}
      <div
        className={`${
          isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-row justify-start items-start box-border border-none relative p-[28px] gap-[32px] bg-[#003262]'
            : 'hidden'
        } `}
      >
        <div className={`flex flex-col justify-center h-full pl-[5rem]`}>
          <div className='text-white text-6xl font-bold font-sans leading-[100%]'>
            {title}
          </div>
          <div className=' text-white text-3xl font-normal font-sans leading-[100%]'>
            {user_name}
          </div>
        </div>
        {/* masked background */}
        <div className='absolute top-[0%] left-[-5%] gap-7 inline-flex pl-[3rem]'>
          <Image
            src={MaskedBackground}
            alt='MaskedBackground'
            className='w-[70rem]'
          />
        </div>
      </div>

      {/* School Logo (Replace the placeholder with the actual logo URL) */}
      <div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[3rem]'>
        <Image
          src={isCoverPage ? BerkeleyLogoWhite : BerkeleyLogo}
          alt='Standford Logo'
          className='w-[5rem] h-auto'
        />
        {/* <div className='text-red-800 text-2xl font-normal '>Caption</div> */}
      </div>
    </>
  )
}
