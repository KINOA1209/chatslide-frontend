import Image, { StaticImageData } from 'next/image'
import { ImgModule } from '@/components/imgModule'
import { useEffect, useMemo, useState } from 'react'
import cover_png from '@/public/images/template/cover.png' // Cover
import col1img0_png from '@/public/images/template/col1img0.png'
import col2img1_png from '@/public/images/template/col2img1.png'
import col3img2_png from '@/public/images/template/col3img2.png'
import drlambdaLogo from '@/public/images/template/drlambdaLogo.png'
import { Berkeley_school_template } from './school_templates/Berkeley_school_template'
import { Harvard_school_template } from './school_templates/Harvard_school_template'
import { Stanford_school_template } from './school_templates/Stanford_school_template'

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
        {/* Logo */}
        <div className='fixed inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[3rem]'>
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
