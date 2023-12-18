import Image, { StaticImageData } from 'next/image';
import { MainSlideProps } from '../slideTemplates';
import StanfordLogo from '@/public/images/template/Stanford/StanfordLogo.png';
import StanfordLogoLetters from '@/public/images/template/Stanford/Stanford_logo_letters.png';
import { LayoutKeys } from '@/components/slides/slideLayout';
import { layoutOptions } from '@/components/slides/slideLayout';
import { loadCustomizableElements } from '@/components/slides/SlidesHTML';
export const Upenn_school_template = ({
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
  const ChosenLayoutNonCover =
    layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
  const ChosenLayoutCover =
    layoutOptions[layoutOptionCover as keyof typeof layoutOptions];
  //   console.log('choosing layout option', ChosenLayout)
  // Load customizable elements for the current template
  const customizableElements = loadCustomizableElements('Stanford');
  return (
    <>
      {/* for not-cover page slides */}

      <div
        className={`${
          !isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover box-border border-none relative p-[28px]'
            : 'hidden '
        } ${customizableElements.backgroundColor}`}
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
          customizableElements={customizableElements}
        ></ChosenLayoutNonCover>
      </div>
      {/* for cover page */}

      <div
        className={`${
          isCoverPage
            ? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-row gap-[2rem] justify-start items-start box-border border-none relative '
            : 'hidden'
        } ${customizableElements.backgroundColorCover} `}
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
          customizableElements={customizableElements}
        ></ChosenLayoutCover>
      </div>
      {/* School Logo (Replace the placeholder with the actual logo URL) */}
      <div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
        <Image
          src={StanfordLogo}
          alt='Standford Logo'
          className='w-[3.75rem] h-auto'
        />
        <div
          className={`grow basis-0 opacity-50 border ${
            isCoverPage ? 'border-white' : 'border-red-800'
          }  border-opacity-40`}
        ></div>
        {/* <div className='text-red-800 text-2xl font-normal '>Caption</div> */}
      </div>
    </>
  );
};
