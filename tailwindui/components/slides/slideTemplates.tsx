import Image, { StaticImageData } from 'next/image';
import { ImgModule } from '@/components/imgModule';
import { useEffect, useMemo, useState } from 'react';
import cover_png from '@/public/images/template/cover.png'; // Cover
import col1img0_png from '@/public/images/template/col1img0.png';
import col2img1_png from '@/public/images/template/col2img1.png';
import col3img2_png from '@/public/images/template/col3img2.png';
import drlambdaLogo from '@/public/images/template/drlambdaLogo.png';
import drlambdaLogoSingle from '@/public/images/template/drlambdaLogoSingle.png';

import { Berkeley_school_template } from './school_templates/Berkeley_school_template';
import { Harvard_school_template } from './school_templates/Harvard_school_template';
import { Stanford_school_template } from './school_templates/Stanford_school_template';
import { MIT_school_template } from './school_templates/MIT_school_template';
import { LayoutKeys } from './slideLayout';
import { layoutOptions } from './slideLayout';
import { loadCustomizableElements } from './SlidesHTML';
export interface MainSlideProps {
    user_name: JSX.Element;
    title: JSX.Element;
    topic: JSX.Element;
    subtopic: JSX.Element;
    content: JSX.Element[];
    imgs: string[];
    //   imgs: JSX.Element
    update_callback: (imgs: string[]) => void;
    canEdit: boolean;
    autoSave: Function;
    isCoverPage: boolean;
    layoutOptionNonCover: LayoutKeys;
    layoutOptionCover: LayoutKeys;
    brandingColor?: string;
}

export const useLocalImgs = (
    imgs: string[],
    imgCount: number,
    update_callback: (imgs: string[]) => void
) => {
    const initialImgs = useMemo(() => {
        let cleanedImgs = imgs.filter((url) => url !== '');
        if (cleanedImgs.length > imgCount) {
            cleanedImgs = cleanedImgs.slice(0, imgCount);
        } else if (cleanedImgs.length < imgCount) {
            cleanedImgs = [
                ...cleanedImgs,
                ...new Array(imgCount - cleanedImgs.length).fill(''),
            ];
        }
        return cleanedImgs;
    }, [imgs, imgCount]);

    const [localImgs, setLocalImgs] = useState<string[]>(initialImgs);

    useEffect(() => {
        update_callback(localImgs);
    }, [localImgs]);

    const updateImgAtIndex = (index: number) => {
        const updateLocalImgs = (url: string) => {
            const newLocalImgs = [...localImgs];
            newLocalImgs[index] = url;
            setLocalImgs(newLocalImgs);
            console.log('updateLocalImgs', newLocalImgs);
        };
        return updateLocalImgs;
    };

    return { localImgs, updateImgAtIndex };
};

export const Default = ({
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
        layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
    const ChosenLayoutCover =
        layoutOptions[layoutOptionCover as keyof typeof layoutOptions];
    //   console.log('choosing layout option', ChosenLayout)
    // Load customizable elements for the current template
    const customizableElements = loadCustomizableElements('Default');
    // console.log(
    //     'customizable elements for default template',
    //     customizableElements
    // );
    return (
        <>
            {/* for cover page slide */}
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
                    brandingColor={brandingColor}
                    customizableElements={customizableElements}
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
                        ? 'rounded-md overflow-hidden w-full h-full bg-cover box-border border-none relative p-[28px]'
                        : 'hidden'
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
                    brandingColor={brandingColor}
                    customizableElements={customizableElements}
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
    );
};

export const availableTemplates = {
    Stanford: Stanford_school_template,
    Berkeley: Berkeley_school_template,
    Harvard: Harvard_school_template,
    // MIT: MIT_school_template,
    Default: Default,
};
