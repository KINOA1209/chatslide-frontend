import Image, { StaticImageData } from 'next/image'
import { ImgModule } from '@/components/imgModule'
import { useEffect, useMemo, useState } from 'react'
import cover_png from '@/public/images/template/cover.png' // Cover
import col1img0_png from '@/public/images/template/col1img0.png'
import col2img1_png from '@/public/images/template/col2img1.png'
import col3img2_png from '@/public/images/template/col3img2.png'
import drlambdaLogo from '@/public/images/template/drlambdaLogo.png'
import drlambdaLogoSingle from '@/public/images/template/drlambdaLogoSingle.png'
import { LayoutKeys } from './slideLayout'
import { Berkeley_school_template } from './school_templates/Berkeley_school_template'
import { Harvard_school_template } from './school_templates/Harvard_school_template'
import { Stanford_school_template } from './school_templates/Stanford_school_template'

import { layoutOptions } from './slideLayout'
// import {
//   Col_1_img_0_layout,
//   Col_2_img_1_layout,
//   Col_3_img_3_layout,
// } from './slideLayout'

export interface MainSlideProps {
  user_name: JSX.Element
  title: JSX.Element
  topic: JSX.Element
  subtopic: JSX.Element
  content: JSX.Element[]
  imgs: string[]
  //   imgs: JSX.Element
  update_callback: (imgs: string[]) => void
  canEdit: boolean
  autoSave: Function
  isCoverPage: boolean
  layoutOptionNonCover: LayoutKeys
  layoutOptionCover: LayoutKeys
  brandingColor?: string
}

export const useLocalImgs = (
  imgs: string[],
  imgCount: number,
  update_callback: (imgs: string[]) => void
) => {
  const initialImgs = useMemo(() => {
    let cleanedImgs = imgs.filter((url) => url !== '')
    if (cleanedImgs.length > imgCount) {
      cleanedImgs = cleanedImgs.slice(0, imgCount)
    } else if (cleanedImgs.length < imgCount) {
      cleanedImgs = [
        ...cleanedImgs,
        ...new Array(imgCount - cleanedImgs.length).fill(''),
      ]
    }
    return cleanedImgs
  }, [imgs, imgCount])

  const [localImgs, setLocalImgs] = useState<string[]>(initialImgs)

  useEffect(() => {
    update_callback(localImgs)
  }, [localImgs])

  const updateImgAtIndex = (index: number) => {
    const updateLocalImgs = (url: string) => {
      const newLocalImgs = [...localImgs]
      newLocalImgs[index] = url
      setLocalImgs(newLocalImgs)
      console.log('updateLocalImgs', newLocalImgs)
    }
    return updateLocalImgs
  }

  return { localImgs, updateImgAtIndex }
}

// export const Col_2_img_1 = ({
//   user_name,
//   title,
//   topic,
//   subtopic,
//   content,
//   imgs,
//   update_callback,
//   canEdit,
//   autoSave,
//   isCoverPage,
//   layoutOption,
// }: MainSlideProps) => {
//   // dynamically choose the layout option from current available options
//   const ChosenLayout = AllLayouts[layoutOption as keyof typeof AllLayouts]
//   console.log('choosing layout option', layoutOption)
//   return (
//     <div
//       className='rounded-md overflow-hidden'
//       style={{
//         width: '100%',
//         height: '100%',
//         backgroundSize: 'cover',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
//         boxSizing: 'border-box',
//         border: 'none',
//         // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
//         position: 'relative',
//         backgroundColor: 'white',
//         padding: '28px',
//       }}
//     >
//       <div>
//         <div>{topic}</div>
//       </div>
//       <div>{subtopic}</div>
//       <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr>
//       {/* <div className='h-full w-full flex flex-row overflow-hidden gap-[32px]'>
//         <div className='w-full h-full grow p-1'>{content}</div>
//         <div className='w-full h-full grow rounded-md overflow-hidden'>
//           <ImgModule
//             imgsrc={localImgs[0]}
//             updateSingleCallback={updateImgAtIndex(0)}
//             canEdit={canEdit}
//             autoSave={autoSave}
//           />
//         </div>
//       </div> */}
//       <ChosenLayout
//         content={content}
//         user_name={user_name}
//         title={title}
//         topic={topic}
//         subtopic={subtopic}
//         imgs={imgs}
//         update_callback={update_callback}
//         canEdit={canEdit}
//         autoSave={autoSave}
//         isCoverPage={false}
//         layoutOption={layoutOption}
//       ></ChosenLayout>
//     </div>
//   )
// }

// export const First_page_img_1 = ({
//   user_name,
//   title,
//   topic,
//   subtopic,
//   content,
//   imgs,
//   update_callback,
//   canEdit,
//   autoSave,
// }: MainSlideProps) => {
//   const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)

//   return (
//     <div
//       className='rounded-md overflow-hidden gap-[32px]'
//       style={{
//         width: '100%',
//         height: '100%',
//         backgroundSize: 'cover',
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
//         boxSizing: 'border-box',
//         border: 'none',
//         // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
//         position: 'relative',
//         backgroundColor: 'white',
//         padding: '28px',
//       }}
//     >
//       <div className='w-1/2 flex flex-col justify-between h-full'>
//         <div>{user_name}</div>

//         <div>{title}</div>
//       </div>

//       <div className='w-1/2 h-full rounded-md overflow-hidden'>
//         <ImgModule
//           imgsrc={localImgs[0]}
//           updateSingleCallback={updateImgAtIndex(0)}
//           canEdit={canEdit}
//           autoSave={autoSave}
//         />
//       </div>
//     </div>
//   )
// }

// export const First_page_img_1 = ({
//   user_name,
//   title,
//   topic,
//   subtopic,
//   content,
//   imgs,
//   update_callback,
//   canEdit,
//   autoSave,
//   isCoverPage,
//   layoutOptionNonCover,
//   layoutOptionCover,
//   brandingColor = 'bg-[#F0F0F2]',
// }: MainSlideProps) => {
//   const ChosenLayoutNonCover =
//     layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions]
//   const ChosenLayoutCover =
//     layoutOptions[layoutOptionCover as keyof typeof layoutOptions]
//   //   console.log('choosing layout option', ChosenLayoutCover)
//   return (
//     <>
//       {/* for cover page slide */}
//       <div
//         className={`${
//           isCoverPage
//             ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-row gap-[2rem] justify-start items-start box-border border-none relative '
//             : 'hidden'
//         } ${brandingColor} `}
//       >
//         {/* <div
//           className={`pt-[1rem] px-[2rem] w-1/2 flex flex-col justify-start h-full gap-[2rem]`}
//         >
//           <div className='text-[#3D3D3D] text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]'>
//             {user_name}
//           </div>
//           <div
//             className={`pl-[2rem] basis-0 opacity-50 border
//                 border-black border-opacity-40 mt-4`}
//           ></div>
//           <div className='text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight pl-[2rem]'>
//             {title}
//           </div>
//         </div>
//         <div className={`w-1/2 h-full rounded-md overflow-hidden`}>
//           <ImgModule
//             imgsrc={localImgs[0]}
//             updateSingleCallback={updateImgAtIndex(0)}
//             canEdit={canEdit}
//             autoSave={autoSave}
//           />
//         </div> */}
//         <ChosenLayoutCover
//           content={content}
//           user_name={user_name}
//           title={title}
//           topic={topic}
//           subtopic={subtopic}
//           imgs={imgs}
//           update_callback={update_callback}
//           canEdit={canEdit}
//           autoSave={autoSave}
//           isCoverPage={isCoverPage}
//           layoutOptionNonCover={layoutOptionNonCover}
//           layoutOptionCover={layoutOptionCover}
//           brandingColor={brandingColor}
//         ></ChosenLayoutCover>

//         {/* Logo */}
//         <div className='fixed inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
//           <Image
//             src={drlambdaLogo}
//             alt='drlambdaLogo'
//             className='w-[8rem] h-auto'
//           />
//           {/* <div className='text-red-800 text-2xl font-normal '>Caption</div> */}
//         </div>
//       </div>

//       {/* for non-cover page slides */}
//       <div
//         className={`${
//           !isCoverPage
//             ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-col justify-start items-start box-border border-none relative p-[28px] '
//             : 'hidden'
//         } ${brandingColor}`}
//       >
//         <div className=' text-black text-3xl font-bold font-creato-medium leading-[100%] pb-[2rem]'>
//           {topic}
//         </div>
//         <div className='mix-blend-hard-light text-neutral-900 text-base font-normal font-creato-medium uppercase leading-[150%] tracking-[0.15rem]'>
//           {subtopic}
//         </div>
//         <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr>

//         <ChosenLayoutNonCover
//           content={content}
//           user_name={user_name}
//           title={title}
//           topic={topic}
//           subtopic={subtopic}
//           imgs={imgs}
//           update_callback={update_callback}
//           canEdit={canEdit}
//           autoSave={autoSave}
//           isCoverPage={isCoverPage}
//           layoutOptionNonCover={layoutOptionNonCover}
//           layoutOptionCover={layoutOptionCover}
//           brandingColor={brandingColor}
//         ></ChosenLayoutNonCover>
//         {/* company logo */}
//         <div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
//           <Image
//             src={drlambdaLogoSingle}
//             alt='drlambda logo'
//             className='w-[1.5rem] mr-4'
//           />
//           <div
//             className={`grow basis-0 opacity-50 border border-black border-opacity-40`}
//           ></div>
//           {/* <div className='text-red-800 text-2xl font-normal '>Caption</div> */}
//         </div>
//       </div>
//     </>
//   )
// }

export const Default_template = ({
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
  brandingColor = 'bg-[#F0F0F2]',
}: MainSlideProps) => {
  const ChosenLayoutNonCover =
    layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions]
  const ChosenLayoutCover =
    layoutOptions[layoutOptionCover as keyof typeof layoutOptions]
  //   console.log('choosing layout option', ChosenLayout)
  return (
    <>
      {/* for cover page slide */}
      <div
        className={`${
          isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-row gap-[2rem] justify-start items-start box-border border-none relative '
            : 'hidden'
        } ${brandingColor} `}
      >
        <ChosenLayoutCover
          content={content}
          user_name={user_name}
          title={title}
          topic={topic}
          subtopic={subtopic}
          imgs={imgs}
          update_callback={update_callback}
          canEdit={canEdit}
          autoSave={autoSave}
          isCoverPage={isCoverPage}
          layoutOptionNonCover={layoutOptionNonCover}
          layoutOptionCover={layoutOptionCover}
          brandingColor={brandingColor}
        ></ChosenLayoutCover>

        {/* Logo */}
        <div className='fixed inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
          <Image
            src={drlambdaLogo}
            alt='drlambdaLogo'
            className='w-[8rem] h-auto'
          />
          {/* <div className='text-red-800 text-2xl font-normal '>Caption</div> */}
        </div>
      </div>

      {/* for non-cover page slides */}
      <div
        className={`${
          !isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-col justify-start items-start box-border border-none relative p-[28px]'
            : 'hidden'
        } ${brandingColor}`}
      >
        {/* <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr> */}

        <ChosenLayoutNonCover
          content={content}
          user_name={user_name}
          title={title}
          topic={topic}
          subtopic={subtopic}
          imgs={imgs}
          update_callback={update_callback}
          canEdit={canEdit}
          autoSave={autoSave}
          isCoverPage={isCoverPage}
          layoutOptionNonCover={layoutOptionNonCover}
          layoutOptionCover={layoutOptionCover}
          brandingColor={brandingColor}
        ></ChosenLayoutNonCover>
        {/* company logo */}
        <div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
          <Image
            src={drlambdaLogoSingle}
            alt='drlambda logo'
            className='w-[1.5rem] mr-4'
          />
          <div
            className={`grow basis-0 opacity-50 border border-black border-opacity-40`}
          ></div>
          {/* <div className='text-red-800 text-2xl font-normal '>Caption</div> */}
        </div>
      </div>
    </>
  )
}

// export const Col_3_img_2 = ({
//   user_name,
//   title,
//   topic,
//   subtopic,
//   content,
//   imgs,
//   update_callback,
//   canEdit,
//   autoSave,
// }: MainSlideProps) => {
//   const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 2, update_callback)

//   return (
//     <div
//       className='rounded-md overflow-hidden'
//       style={{
//         width: '100%',
//         height: '100%',
//         backgroundSize: 'cover',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
//         boxSizing: 'border-box',
//         border: 'none',
//         // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
//         position: 'relative',
//         backgroundColor: 'white',
//         padding: '28px',
//       }}
//     >
//       <div>
//         <div>{topic}</div>
//       </div>
//       <div>{subtopic}</div>
//       <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr>
//       <div className='h-full w-full flex flex-row overflow-hidden gap-[32px]'>
//         <div className='w-full h-full grow p-1'>{content}</div>
//         <div className='w-full h-full grow rounded-md overflow-hidden'>
//           <ImgModule
//             imgsrc={localImgs[0]}
//             updateSingleCallback={updateImgAtIndex(0)}
//             canEdit={canEdit}
//             autoSave={autoSave}
//           />
//         </div>
//         <div className='w-full h-full grow rounded-md overflow-hidden'>
//           <ImgModule
//             imgsrc={localImgs[1]}
//             updateSingleCallback={updateImgAtIndex(1)}
//             canEdit={canEdit}
//             autoSave={autoSave}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

export const availableTemplates = {
  //   First_page_img_1: First_page_img_1,
  Stanford: Stanford_school_template,
  Berkeley: Berkeley_school_template,
  Harvard: Harvard_school_template,
  Default_template: Default_template,
}

// export const templateSamples = {
//   cover: [
//     {
//       name: 'First_page_img_1',
//       img: cover_png.src,
//     },
//   ],
//   main: [
//     {
//       name: 'Col_1_img_0',
//       img: col1img0_png.src,
//     },
//     {
//       name: 'Col_2_img_1',
//       img: col2img1_png.src,
//     },
//     {
//       name: 'Col_3_img_2',
//       img: col3img2_png.src,
//     },
//   ],
// }
