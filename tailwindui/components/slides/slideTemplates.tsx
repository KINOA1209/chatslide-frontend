import Image, { StaticImageData } from 'next/image'
import { ImgModule } from '@/components/imgModule'
import { useEffect, useMemo, useState } from 'react'
import cover_png from '@/public/images/template/cover.png' // Cover
import col1img0_png from '@/public/images/template/col1img0.png'
import col2img1_png from '@/public/images/template/col2img1.png'
import col3img2_png from '@/public/images/template/col3img2.png'
import StandfordLogo from '@/public/images/template/Standford/StandfordLogo.png'
interface MainSlideProps {
  user_name: JSX.Element
  title: JSX.Element
  topic: JSX.Element
  subtopic: JSX.Element
  content: JSX.Element[]
  imgs: string[]
  update_callback: (imgs: string[]) => void
  canEdit: boolean
  autoSave: Function
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

export const Col_2_img_1 = ({
  user_name,
  title,
  topic,
  subtopic,
  content,
  imgs,
  update_callback,
  canEdit,
  autoSave,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)

  return (
    <div
      className='rounded-md overflow-hidden'
      style={{
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        border: 'none',
        // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        backgroundColor: 'white',
        padding: '28px',
      }}
    >
      <div>
        <div>{topic}</div>
      </div>
      <div>{subtopic}</div>
      <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr>
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
    </div>
  )
}

export const Standford_school_template = ({
  user_name,
  title,
  topic,
  subtopic,
  content,
  imgs,
  update_callback,
  canEdit,
  autoSave,
}: MainSlideProps) => {
  return (
    <div
      className='rounded-md overflow-hidden'
      style={{
        width: '100%',
        height: '100%',
        color: 'red',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        border: 'none',
        position: 'relative',
        backgroundColor: '#F0E9E9',
        padding: '28px',
      }}
    >
      <div className='h-auto '>
        <div
          className='h-full flex items-center justify-center text-red-800 text-7xl font-bold leading-10 whitespace-nowrap'
          //   style={{
          //     fontSize: '15pt',
          //     fontWeight: 'bold',
          //     marginTop: '10px',
          //     color: 'red',
          //   }}
        >
          {topic}
        </div>
      </div>
      <div className='opacity-70 text-red-800 text-opacity-40 text-5xl font-normal leading-10'>
        {subtopic}
      </div>
      <hr className='border border-[#E7E9EB] w-full mt-6 mb-6'></hr>
      <div
        className='flex flex-row text-zinc-800 text-2xl font-normal leading-9 justify-between text-center'
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

      {/* School Logo (Replace the placeholder with the actual logo URL) */}
      <div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex'>
        <Image
          src={StandfordLogo}
          alt='Standford Logo'
          className='w-16 h-16 mr-4'
        />
        <div className='grow basis-0 opacity-50 border border-red-800 border-opacity-40'></div>
        {/* <div className='text-red-800 text-2xl font-normal '>Caption</div> */}
      </div>
    </div>
  )
}

export const First_page_img_1 = ({
  user_name,
  title,
  topic,
  subtopic,
  content,
  imgs,
  update_callback,
  canEdit,
  autoSave,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback)

  return (
    <div
      className='rounded-md overflow-hidden gap-[32px]'
      style={{
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        border: 'none',
        // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        backgroundColor: 'white',
        padding: '28px',
      }}
    >
      <div className='w-1/2 flex flex-col justify-between h-full'>
        <div>{user_name}</div>

        <div>{title}</div>
      </div>

      <div className='w-1/2 h-full rounded-md overflow-hidden'>
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

export const Col_1_img_0 = ({
  user_name,
  title,
  topic,
  subtopic,
  content,
  imgs,
  update_callback,
  canEdit,
  autoSave,
}: MainSlideProps) => {
  return (
    <div
      className='rounded-md overflow-hidden'
      style={{
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        border: 'none',
        // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        backgroundColor: 'white',
        padding: '28px',
      }}
    >
      <div>
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
      </div>
      <div>{subtopic}</div>
      <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr>
      <div className='h-full w-full flex flex-row overflow-hidden gap-[32px]'>
        <div
          className='w-full h-full grow p-1'
          style={{
            display: 'list-item',
            listStyleType: 'disc',
            listStylePosition: 'inside',
            fontSize: '18pt',
            marginLeft: '20px',
          }}
        >
          {content}
        </div>
      </div>
    </div>
  )
}

export const Col_3_img_2 = ({
  user_name,
  title,
  topic,
  subtopic,
  content,
  imgs,
  update_callback,
  canEdit,
  autoSave,
}: MainSlideProps) => {
  const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 2, update_callback)

  return (
    <div
      className='rounded-md overflow-hidden'
      style={{
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        border: 'none',
        // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        backgroundColor: 'white',
        padding: '28px',
      }}
    >
      <div>
        <div>{topic}</div>
      </div>
      <div>{subtopic}</div>
      <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr>
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
    </div>
  )
}

export default {
  Col_2_img_1: Col_2_img_1,
  First_page_img_1: First_page_img_1,
  Col_1_img_0: Col_1_img_0,
  Col_3_img_2: Col_3_img_2,
  Standford_school_template: Standford_school_template,
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
