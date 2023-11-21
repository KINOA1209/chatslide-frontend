import React, { useEffect, useState, useMemo } from 'react'
import { ImgModule } from '@/components/imgModule'
import { MainSlideProps } from './slideTemplates'

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
  layoutOption,
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

export const Col_3_img_2_layout = ({
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

export default {
  Col_2_img_1_layout: Col_2_img_1_layout,
  Col_3_img_2_layout: Col_3_img_2_layout,
}
