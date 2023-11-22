import Image, { StaticImageData } from 'next/image'
import { ImgModule } from '@/components/imgModule'
import { useEffect, useMemo, useState } from 'react'
import cover_png from '@/public/images/template/cover.png' // Cover
import col1img0_png from '@/public/images/template/col1img0.png'
import col2img1_png from '@/public/images/template/col2img1.png'
import col3img2_png from '@/public/images/template/col3img2.png'
import StanfordLogo from '@/public/images/template/Stanford/StanfordLogo.png'
import StanfordLogoLetters from '@/public/images/template/Stanford/Stanford_logo_letters.png'
import BerkeleyLogo from '@/public/images/template/Berkeley/Berkeley_logo.png'
import MaskedBackground from '@/public/images/template/Berkeley/Mask Background.png'
import BerkeleyLogoWhite from '@/public/images/template/Berkeley/Berkeley_logo_white.png'
import HarvardLogo from '@/public/images/template/Harvard/Harvard_logo.png'
import HarvardCoverVector from '@/public/images/template/Harvard/cover_vector_1.png'
// import { layoutOptions } from './slideLayout'
import {
  Col_1_img_0_layout,
  Col_2_img_1_layout,
  Col_3_img_2_layout,
} from './slideLayout'

export type LayoutKeys =
  | ''
  | 'Col_1_img_0_layout'
  | 'Col_2_img_1_layout'
  | 'Col_3_img_2_layout'
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
  layoutOption: LayoutKeys
}

const useLocalImgs = (
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
  layoutOption,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
  //   const ChosenLayout = layoutOptions[layoutOption as keyof typeof layoutOptions]
  //   console.log('choosing layout option', ChosenLayout)
  return (
    <>
      {/* for cover page slide */}
      <div
        className={`${
          isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-row justify-start items-start box-border border-none relative bg-white p-[28px] gap-[32px]'
            : 'hidden'
        } `}
      >
        <div className={`w-1/2 flex flex-col justify-between h-full`}>
          <div
            style={{
              fontSize: '20pt',
              color: 'rgb(180,180,180)',
            }}
          >
            {user_name}
          </div>

          <div
            style={{
              fontSize: '30pt',
              fontWeight: 'bold',
              color: '#2563EB',
            }}
          >
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
      </div>

      {/* for non-cover page slides */}
      <div
        className={`${
          !isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-col justify-start items-start box-border border-none relative bg-white p-[28px]'
            : 'hidden'
        }`}
      >
        <div
          style={{
            fontSize: '15pt',
            fontWeight: 'bold',
            marginTop: '10px',
            color: '#2563EB',
          }}
        >
          {topic}
        </div>
        <div
          style={{
            fontSize: '20pt',
            fontWeight: 'bold',
          }}
        >
          {subtopic}
        </div>
        <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr>
        {/* <div className='h-full w-full flex flex-row overflow-hidden gap-[32px]'>
          <div
            className='w-full h-full grow p-1'
            style={{
              // display: 'list-item',
              listStyleType: 'disc',
              listStylePosition: 'inside',
              fontSize: '18pt',
              marginLeft: '20px',
            }}
          >
            {content}
          </div>
        </div> */}

        {/* Use switch statement to render different layouts */}
        {(() => {
          switch (layoutOption) {
            case 'Col_1_img_0_layout':
              return (
                <Col_1_img_0_layout
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
                  layoutOption={layoutOption}
                />
              )
            case 'Col_2_img_1_layout':
              return (
                <Col_2_img_1_layout
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
                  layoutOption={layoutOption}
                />
              )
            case 'Col_3_img_2_layout':
              return (
                <Col_3_img_2_layout
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
                  layoutOption={layoutOption}
                />
              )
            // Add more cases for other layout options
            default:
              return null
          }
        })()}
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

export const Stanford_school_template = ({
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
  layoutOption,
}: MainSlideProps) => {
  //   const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
  //   const ChosenLayout = layoutOptions[layoutOption as keyof typeof layoutOptions]
  console.log('choosing layout option', layoutOption)
  return (
    <>
      {/* for not-cover page slides */}
      <div
        className={`${
          !isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-col justify-start items-start box-border border-none relative bg-white p-[28px]'
            : 'hidden'
        }`}
      >
        <div className='h-auto '>
          <div className="h-full flex items-center justify-center text-red-800 text-5xl font-['Nimbus-Sans'] font-bold leading-[110%] whitespace-nowrap">
            {topic}
          </div>
        </div>
        <div className='opacity-70 text-red-800 text-opacity-40 text-3xl font-normal leading-[120%]'>
          {subtopic}
        </div>
        <hr className='border border-[#E7E9EB] w-full mt-6 mb-6'></hr>
        <div
          className='flex flex-row text-zinc-800 text-xl font-normal leading-9 justify-between text-start'
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
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-row justify-start items-start box-border border-none relativep-[28px] gap-[32px] bg-[#8C1515] text-white'
            : 'hidden'
        } `}
      >
        <div className={`flex flex-col justify-center h-full pl-[5rem]`}>
          <Image
            src={StanfordLogoLetters}
            alt='Standford Logo Letters'
            className='w-[20rem] h-auto'
          />
          <div className='text-white text-6xl font-bold leading-[100%]'>
            {title}
          </div>
          <div className=' text-white text-3xl font-normal leading-[100%]'>
            {user_name}
          </div>
        </div>
      </div>

      {/* School Logo (Replace the placeholder with the actual logo URL) */}
      <div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex'>
        <Image
          src={StanfordLogo}
          alt='Standford Logo'
          className='w-16 h-16 mr-4'
        />
        <div
          className={`grow basis-0 opacity-50 border ${
            isCoverPage ? 'border-white' : 'border-red-800'
          }  border-opacity-40`}
        ></div>
        {/* <div className='text-red-800 text-2xl font-normal '>Caption</div> */}
      </div>
    </>
  )
}

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
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
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
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)
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

export const availableTemplates = {
  //   Col_2_img_1: Col_2_img_1,
  //   First_page_img_1: First_page_img_1,
  //   Col_1_img_0: Col_1_img_0,
  //   Col_3_img_2: Col_3_img_2,
  Stanford: Stanford_school_template,
  Berkeley: Berkeley_school_template,
  Harvard: Harvard_school_template,
  Default_template: Default_template,
}

export const templateSamples = {
  cover: [
    {
      name: 'First_page_img_1',
      img: cover_png.src,
    },
  ],
  main: [
    {
      name: 'Col_1_img_0',
      img: col1img0_png.src,
    },
    {
      name: 'Col_2_img_1',
      img: col2img1_png.src,
    },
    {
      name: 'Col_3_img_2',
      img: col3img2_png.src,
    },
  ],
}
