import React from 'react'
import { MainSlideProps } from '../slideTemplates'
import Image, { StaticImageData } from 'next/image'
import HarvardLogo from '@/public/images/template/Harvard/Harvard_logo.png'
import HarvardCoverVector from '@/public/images/template/Harvard/cover_vector_1.png'
export const Harvard_school_template = ({
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
  //   const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
  return (
    <>
      {/* for not-cover page slides */}
      <div
        className={`${
          !isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-col justify-start items-start box-border border-none relative bg-[#F0F0F2] p-[28px]'
            : 'hidden'
        }`}
      >
        <div className='h-auto '>
          <div className="h-full flex items-center justify-center text-neutral-800 text-5xl font-normal font-['Georgia'] leading-[120%] whitespace-nowrap">
            {topic}
          </div>
        </div>
        <div className="text-center text-neutral-700 text-3xl font-bold font-['Arial'] leading-[120%]">
          {subtopic}
        </div>
        <hr className='border border-[#E7E9EB] w-full mt-6 mb-6'></hr>
        <div
          className="flex flex-col opacity-70 text-neutral-700 text-xl font-normal font-['Arial'] leading-loose"
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
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-row justify-start items-start box-border border-none relative p-[28px] gap-[32px] bg-[#F0F0F2]'
            : 'hidden'
        } `}
      >
        <div className={`flex flex-col justify-center h-full pl-[5rem]`}>
          <div className="text-neutral-800 text-6xl font-normal font-['Gorgia'] leading-[120%]">
            {title}
          </div>
          <div className="opacity-70 text-center text-neutral-700 text-3xl font-normal font-['Arial'] leading-loose">
            {user_name}
          </div>
          <div className='absolute top-[50%] right-[0%] gap-7 inline-flex pl-[3rem]'>
            <Image
              src={HarvardCoverVector}
              alt='MaskedBackground'
              className='w-[20rem]'
            />
          </div>
        </div>
      </div>

      {/* School Logo (Replace the placeholder with the actual logo URL) */}
      <div
        className={`fixed inset-0 ${
          isCoverPage ? 'top-[5%]' : 'top-[85%]'
        } w-full h-14 justify-start items-center gap-7 inline-flex pl-[4rem]`}
      >
        <Image
          src={HarvardLogo}
          alt='Standford Logo'
          className='w-[10rem] h-auto'
        />
      </div>
    </>
  )
}
