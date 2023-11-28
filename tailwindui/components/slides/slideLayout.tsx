import React, { useEffect, useState, useMemo } from 'react'
import { ImgModule } from '@/components/imgModule'
import { MainSlideProps as BaseMainSlideProps } from './slideTemplates'
import coverimg0_png from '@/public/images/template/layout/coverimg0.png'
import coverimg1_png from '@/public/images/template/layout/coverimg1.png'
import col1img0_png from '@/public/images/template/layout/col1img0.png'
import col2img0_png from '@/public/images/template/layout/col2img0.png'
import col3img0_png from '@/public/images/template/layout/col3img0.png'
import col2img1_png from '@/public/images/template/layout/col2img1.png'
import col1img1_png from '@/public/images/template/layout/col1img1.png'
import col3img3_png from '@/public/images/template/layout/col3img3.png'
import col2img2_png from '@/public/images/template/layout/col2img2.png'
import { useLocalImgs } from './slideTemplates'
export type LayoutKeys =
  | ''
  | 'Cover_img_0_layout'
  | 'Cover_img_1_layout'
  | 'Col_1_img_0_layout'
  | 'Col_2_img_0_layout'
  | 'Col_3_img_0_layout'
  | 'Col_2_img_1_layout'
  | 'Col_1_img_1_layout'
  | 'Col_2_img_2_layout'
  | 'Col_3_img_3_layout'

// Extend the interface with new fields
interface MainSlideProps extends BaseMainSlideProps {
  brandingColor?: string
}

export const Cover_img_0_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
  brandingColor,
}: MainSlideProps) => {
  return (
    <>
      <div
        className={`pt-[1rem] px-[2rem] w-full flex flex-col justify-start h-full gap-[2rem]`}
      >
        <div className='text-[#3D3D3D] text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]'>
          {user_name}
        </div>
        <div
          className={`pl-[2rem] basis-0 opacity-50 border
                border-black border-opacity-40 mt-4`}
        ></div>
        <div className='text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight pl-[2rem]'>
          {title}
        </div>
      </div>
    </>
  )
}
export const Cover_img_1_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
  brandingColor,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
  return (
    <>
      <div
        className={`pt-[1rem] px-[2rem] w-1/2 flex flex-col justify-start h-full gap-[2rem]`}
      >
        <div className='text-[#3D3D3D] text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]'>
          {user_name}
        </div>
        <div
          className={`pl-[2rem] basis-0 opacity-50 border
                border-black border-opacity-40 mt-4`}
        ></div>
        <div className='text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight pl-[2rem]'>
          {title}
        </div>
      </div>
      <div className={`w-1/2 h-full rounded-md overflow-hidden`}>
        <ImgModule
          imgsrc={localImgs[0]}
          updateSingleCallback={updateImgAtIndex(0)}
          canEdit={canEdit}
          autoSave={autoSave}
        />
      </div>
    </>
  )
}
export const Col_1_img_0_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
  brandingColor,
}: MainSlideProps) => {
  return (
    <div className='h-full w-full flex flex-row overflow-hidden gap-[2.5rem]'>
      <div className='flex flex-col gap-[1rem]'>
        {/* <div className="mix-blend-hard-light text-neutral-900 text-opacity-25 text-4xl font-bold font-['Creato Display'] uppercase leading-10 tracking-widest">
          01
        </div> */}
        <div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
        <div className='w-full h-full grow p-1 text-neutral-900 text-opacity-70 text-sm font-normal font-creato-medium leading-[140%] tracking-[0.025rem] list-none'>
          {content}
        </div>
      </div>
    </div>
  )
}
export const Col_2_img_0_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
}: MainSlideProps) => {
  return (
    <div className='h-full w-full grid grid-cols-2 gap-[2.5rem] overflow-hidden'>
      {content.map((item, index) => (
        <div className='flex flex-col gap-[1rem]'>
          <div className="mix-blend-hard-light text-neutral-900 text-opacity-25 text-4xl font-bold font-['Creato Display'] uppercase leading-10 tracking-widest">
            {index + 1}
          </div>
          <div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
          <div
            key={index}
            className='flex flex-row w-full h-full grow p-1 text-neutral-900 text-opacity-70 text-sm font-normal font-creato-medium leading-[140%] tracking-[0.025rem] list-none'
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}
export const Col_3_img_0_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
}: MainSlideProps) => {
  return (
    <div className='h-full w-full grid grid-cols-3 gap-[2.5rem] overflow-hidden'>
      {content.map((item, index) => (
        <div className='flex flex-col gap-[1rem]'>
          <div className="mix-blend-hard-light text-neutral-900 text-opacity-25 text-4xl font-bold font-['Creato Display'] uppercase leading-10 tracking-widest">
            {index + 1}
          </div>
          <div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
          <div
            key={index}
            className='flex flex-row w-full h-full grow p-1 text-neutral-900 text-opacity-70 text-sm font-normal font-creato-medium leading-[140%] tracking-[0.025rem] list-none'
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Col_1_img_1_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
  return (
    <div className='h-full w-full flex flex-row overflow-hidden gap-[32px]'>
      <div className='w-full h-full grow p-1'>{content}</div>
      <div className='w-full h-full grow rounded-md overflow-hidden'>
        <ImgModule
          imgsrc={localImgs[0]}
          updateSingleCallback={updateImgAtIndex(0)}
          canEdit={canEdit}
          autoSave={autoSave}
        />
      </div>
    </div>
  )
}
export const Col_2_img_1_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
  return (
    <div className='h-full w-full flex flex-row overflow-hidden gap-[32px]'>
      <div className='w-full h-full grow p-1'>{content}</div>
      <div className='w-full h-full grow rounded-md overflow-hidden'>
        <ImgModule
          imgsrc={localImgs[0]}
          updateSingleCallback={updateImgAtIndex(0)}
          canEdit={canEdit}
          autoSave={autoSave}
        />
      </div>
    </div>
  )
}

export const Col_3_img_3_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 2, update_callback)
  return (
    <div className='h-full w-full flex flex-row overflow-hidden gap-[32px]'>
      <div className='w-full h-full grow p-1'>{content}</div>
      <div className='w-full h-full grow rounded-md overflow-hidden'>
        <ImgModule
          imgsrc={localImgs[0]}
          updateSingleCallback={updateImgAtIndex(0)}
          canEdit={canEdit}
          autoSave={autoSave}
        />
      </div>
      <div className='w-full h-full grow rounded-md overflow-hidden'>
        <ImgModule
          imgsrc={localImgs[1]}
          updateSingleCallback={updateImgAtIndex(1)}
          canEdit={canEdit}
          autoSave={autoSave}
        />
      </div>
    </div>
  )
}
export const Col_2_img_2_layout = ({
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
  layoutOptionNonCover,
  layoutOptionCover,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
  return (
    <div className='h-full w-full flex flex-row overflow-hidden gap-[32px]'>
      <div className='w-full h-full grow p-1'>{content}</div>
      <div className='w-full h-full grow rounded-md overflow-hidden'>
        <ImgModule
          imgsrc={localImgs[0]}
          updateSingleCallback={updateImgAtIndex(0)}
          canEdit={canEdit}
          autoSave={autoSave}
        />
      </div>
    </div>
  )
}

export const layoutOptions = {
  Cover_img_0_layout: Cover_img_0_layout,
  Cover_img_1_layout: Cover_img_1_layout,
  Col_1_img_0_layout: Col_1_img_0_layout,
  Col_2_img_0_layout: Col_2_img_0_layout,
  Col_3_img_0_layout: Col_3_img_0_layout,
  Col_1_img_1_layout: Col_1_img_1_layout,
  Col_2_img_1_layout: Col_2_img_1_layout,
  Col_2_img_2_layout: Col_2_img_2_layout,
  Col_3_img_3_layout: Col_3_img_3_layout,
}

export const availableLayouts = {
  cover: [
    {
      name: 'Cover_img_0_layout' as LayoutKeys,
      img: coverimg0_png.src,
    },
    {
      name: 'Cover_img_1_layout' as LayoutKeys,
      img: coverimg1_png.src,
    },
  ],
  main: [
    {
      name: 'Col_1_img_0_layout' as LayoutKeys,
      img: col1img0_png.src,
    },
    {
      name: 'Col_2_img_0_layout' as LayoutKeys,
      img: col2img0_png.src,
    },
    {
      name: 'Col_3_img_0_layout' as LayoutKeys,
      img: col3img0_png.src,
    },
    {
      name: 'Col_2_img_1_layout' as LayoutKeys,
      img: col2img1_png.src,
    },
    {
      name: 'Col_3_img_3_layout' as LayoutKeys,
      img: col3img3_png.src,
    },
    {
      name: 'Col_1_img_1_layout' as LayoutKeys,
      img: col1img1_png.src,
    },
    {
      name: 'Col_2_img_2_layout' as LayoutKeys,
      img: col2img2_png.src,
    },
  ],
}
