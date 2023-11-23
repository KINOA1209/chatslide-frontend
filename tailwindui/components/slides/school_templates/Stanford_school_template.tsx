import Image, { StaticImageData } from 'next/image'
import { MainSlideProps } from '../slideTemplates'
import StanfordLogo from '@/public/images/template/Stanford/StanfordLogo.png'
import StanfordLogoLetters from '@/public/images/template/Stanford/Stanford_logo_letters.png'
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
