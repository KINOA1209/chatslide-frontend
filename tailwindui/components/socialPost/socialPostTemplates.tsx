import { StaticImageData } from "next/image";
import { ImgModule } from "@/components/socialPost/socialPostIllustrationModule";
import { ImgModule as ImgModuleSlide } from "@/components/socialPost/socialPostImgModule"
import { useEffect, useMemo, useState } from "react";
import cover_png from '@/public/images/template/cover.png' // Cover
import withimg_png from '@/public/images/template/socialpost_t1_img.png'
import noimg_png from '@/public/images/template/socialpost_t1_no_img.png'
import { color } from "html2canvas/dist/types/css/types/color";
import '@/components/socialPost/templates.css'
import AuthService from '@/components/utils/AuthService'
import { h5Style } from "./Styles";

interface MainSlideProps {
    subtopic: JSX.Element,
    keywords: JSX.Element[] | JSX.Element,
    content: JSX.Element[],
    original_title: JSX.Element,
    English_title: JSX.Element,
    section_title: JSX.Element,
    brief: JSX.Element,
    imgs: string[],
    icon: JSX.Element,
    illustration: string[],
    title: JSX.Element,
    quote: JSX.Element,
    source: JSX.Element,
    update_callback: (imgs: string[]) => void,
    canEdit: boolean,
    autoSave: Function,
    border_start?: string,
    border_end?: string,
    cover_start?: string,
    cover_end?: string,
}


const useLocalImgs = (imgs: string[], imgCount: number, update_callback: (imgs: string[]) => void) => {
    const initialImgs = useMemo(() => {
        let cleanedImgs = imgs.filter(url => url !== '');
        if (cleanedImgs.length > imgCount) {
            cleanedImgs = cleanedImgs.slice(0, imgCount);
        } else if (cleanedImgs.length < imgCount) {
            cleanedImgs = [...cleanedImgs, ...new Array(imgCount - cleanedImgs.length).fill('')];
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
            console.log('updateLocalImgs', newLocalImgs)
        };
        return updateLocalImgs;
    };

    return { localImgs, updateImgAtIndex };
};

export const First_page_img_1 = ({ subtopic, keywords, imgs, border_start, border_end, cover_start, cover_end, update_callback, autoSave, canEdit }: MainSlideProps) => {

    const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback);

    return (
        <div
            className="relative overflow-hidden gap-[32px] flex justify-center items-center"
            style={{
                width: '100%',
                height: '100%',
                background: 'white',
                border: 'none',
            }}>
            <div 
                className="absolute top-0 left-0 w-full h-full z-10"
                style={{
                    border: '12px solid transparent',
                    backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box'
                }}
            >
                <ImgModuleSlide 
                    imgsrc={localImgs[0]} 
                    updateSingleCallback={updateImgAtIndex(0)} 
                    canEdit={canEdit} 
                    autoSave={autoSave} 
                    isTemp1Cover={true}
                    cover_start={cover_start}
                    cover_end={cover_end}
                />
            </div>
            <div 
                className="w-full h-full flex flex-col justify-between"

            >
                <div className="mt-[10%] px-[4%] text-center z-20">{subtopic}</div>
                <div
                    className="mb-[6%] mx-[auto] text-center z-20"
                    style={{
                        border: '3px solid #FFF',
                        borderRadius: '5px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                     }}
                >
                    {keywords}
                </div>
            </div>
        </div>
    )
}

export const Col_1_img_0 = ({ subtopic, keywords, content, icon, border_start, border_end, canEdit, autoSave }: MainSlideProps) => {
    return (
        <div
            className="overflow-hidden"
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
                position: 'relative',
                backgroundColor: '#444',
                padding: '5% 6% 0% 6%',
                backgroundImage: `url('/images/socialpost/template1_bg.png')`
            }}>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full px-[4%]">{keywords}</div>
                <div className='w-full px-[4%]'>{subtopic}</div>
                <div 
                    className="h-full w-full flex flex-row overflow-hidden rounded-lg"
                    style={{
                        border: 'double 4px transparent',
                        borderRadius: '30px',
                        backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'content-box, border-box'
                    }}
                >
                    <div className="mt-[5%] mx-[5%] ">{content}</div>
                </div>
                <div className="w-full h-[7%] mt-[2%]"> 
                    <div className="flex flex-row justify-center items-center font-creato-medium leading-normal tracking-wide text-[15px] text-[white]">
                        {icon}DrLambda
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Col_2_img_1 = ({subtopic, content, keywords, imgs, icon, border_start, border_end, update_callback, canEdit, autoSave }: MainSlideProps) => {

    const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback);

    return <div
        className="overflow-hidden"
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
            position: 'relative',
            backgroundColor: '#444',
            padding: '5% 6% 0% 6%',
            backgroundImage: `url('/images/socialpost/template1_bg.png')`
        }}>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full px-[4%]">{keywords}</div>
                <div className='w-full px-[4%]'>{subtopic}</div>
                <div 
                    className="h-full w-full flex flex-col overflow-hidden rounded-lg"
                    style={{
                        border: 'double 4px transparent',
                        borderRadius: '30px',
                        backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_end}, ${border_start})`,
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'content-box, border-box'
                    }}
                >
                    <div className="grow mt-[5%] mx-[5%] ">{content}</div>
                    <div className="w-full h-full grow rounded-md overflow-hidden">
                        <ImgModuleSlide 
                            imgsrc={localImgs[0]} 
                            updateSingleCallback={updateImgAtIndex(0)} 
                            canEdit={canEdit} 
                            autoSave={autoSave} 
                            isTemp1Cover={false}/>
                    </div> 
                </div>
                <div className="w-full h-[7%] mt-[2%]"> 
                    <div className="flex flex-row justify-center items-center font-creato-medium leading-normal tracking-wide text-[15px] text-[white]">
                        {icon}DrLambda
                    </div>
                </div>
            </div>
    </div>
}

export const First_page_img_1_template2 = ({ original_title, English_title, imgs, icon, update_callback, canEdit, autoSave }: MainSlideProps) => {
    const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback);
    const [username, setUsername] = useState(null)
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
            const username = await AuthService.getCurrentUserDisplayName();
                setUsername(username);
            } catch (error) {
                console.log('No authenticated user.');
            }
        };

        fetchUser(); 
    }, []);

    return (
        <div
            className="overflow-hidden"
            style={{
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                border: 'none',
                position: 'relative',
                backgroundColor: '#CED0CC',
                padding: '22px',
            }}>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full flex flex-col">
                        <div className="px-[2%] mr-[auto] flex items-end" style={h5Style}>
                            <div className="flex justify-start" >
                                by {username}
                            </div>
                        </div>
                        <div className="">{original_title}</div>
                </div>
                <div className="w-full h-[auto] flex rounded-md overflow-hidden">
                    <ImgModuleSlide
                        imgsrc={localImgs[0]}
                        updateSingleCallback={updateImgAtIndex(0)}
                        canEdit={canEdit}
                        autoSave={autoSave}
                        isTemp1Cover={false}
                    />
                </div>
            </div>
        </div>
    )
}

export const img_0_template2 = ({ section_title, original_title, brief, content, icon, update_callback, canEdit, autoSave }: MainSlideProps) => {

    return (
        <div
            className="overflow-hidden"
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
                position: 'relative',
                backgroundColor: '#CED0CC',
                backgroundImage: `url('/images/socialpost/template2_bg.png')`,
        }}>
            <div 
                className="w-full h-[7%]" 
                style={{
                    borderBottom: '1px solid #E7E5E5',
                }}>
                <div 
                    className='h-full px-[2%] mx-[4%] flex justify-start items-end'
                    style={{
                        borderLeft: '1px solid #E7E5E5',
                        borderRight: '1px solid #E7E5E5',
                    }}>
                    {original_title}
                </div>
            </div>
            <div 
                className="w-full h-[12%]"
                style={{
                    borderBottom: '1px solid #E7E5E5',
                }}>
                <div 
                    className='h-full px-[2%] py-[1%] mx-[4%] flex justify-start items-end'
                    style={{
                        borderLeft: '1px solid #E7E5E5',
                        borderRight: '1px solid #E7E5E5',
                    }}>
                    {section_title}
                </div>
            </div>
            <div 
                className="overflow-hidden w-full h-[75%]"
                style={{
                    borderBottom: '1px solid #E7E5E5',
                }}>
                <div 
                    className='h-full px-[2%] mx-[4%] flex justify-start flex-col'
                    style={{
                        borderLeft: '1px solid #E7E5E5',
                        borderRight: '1px solid #E7E5E5',
                    }}>
                    {brief}
                    {content}
                </div>
            </div>
            <div className="w-full h-[6%]">
                <div 
                    className='h-full px-[2%] mx-[4%] flex justify-center items-center'
                    style={{
                        borderLeft: '1px solid #E7E5E5',
                        borderRight: '1px solid #E7E5E5',
                    }}>
                    <div className="flex flex-row justify-center items-center font-creato-medium leading-normal tracking-wide text-[15px]">
                        {icon}DrLambda
                    </div>
                </div>
            </div>
        </div>
    )
}

export const First_page_img_1_template3 = ({illustration, title, border_start, border_end, update_callback, canEdit, autoSave }: MainSlideProps) => {
    const { localImgs, updateImgAtIndex } = useLocalImgs(illustration, 1, update_callback);
    return (
        <div
            className="overflow-hidden gap-[32px]"
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
                position: 'relative',
                backgroundColor: 'white',
            }}>
            <div 
                className="w-full h-full flex flex-col justify-between"
                style={{
                    border: '8px solid transparent',
                    backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box',
                    fontFamily: 'Cormorant, sans-serif',
                }}
            >
                <div 
                    className="mx-[auto] mt-[12%] text-center"
                    style={{
                        fontSize: '60px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: '70px',
                        color: '#121212',
                        zIndex: 1
                    }}
                >
                    {title}
                </div>
                <div 
                    className="w-full h-1/2 flex"
                    style={{
                        borderRadius: '20px',
                }}>
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

export const img_1_template3 = ({ illustration, quote, source, border_start, border_end, update_callback, canEdit, autoSave }: MainSlideProps) => {
    const { localImgs, updateImgAtIndex } = useLocalImgs(illustration, 1, update_callback);
    return (
        <div
            className="overflow-hidden gap-[32px]"
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
                position: 'relative',
                backgroundColor: 'white',
            }}>
            <div 
                className="w-full h-full flex flex-col justify-between"
                style={{
                    border: '8px solid transparent',
                    backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box',
                    fontFamily: 'Cormorant, sans-serif',
                }}
            >
                <div 
                    className="w-full h-1/2 flex"
                    style={{
                        borderRadius: '20px',
                        overflow:"hidden"
                }}>
                    <ImgModule
                        imgsrc={localImgs[0]}
                        updateSingleCallback={updateImgAtIndex(0)}
                        canEdit={canEdit}
                        autoSave={autoSave}
                    />
                </div>
                <div
                    id='asterisk_section'
                    className="mx-[auto] text-center">
                    *
                </div>
                <div 
                    className="mx-[auto] px-[7%] text-center"
                    style={{
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: '155%',
                        color: '#1D222A'
                    }}
                >
                    {quote}
                </div>
                <div
                    id='source_section'
                    className="mx-[auto] mb-[10%] text-center"
                >
                    {source}
                </div>
               
            </div>
        </div>
    )
}

export default {
    'Col_2_img_1': Col_2_img_1,
    'First_page_img_1': First_page_img_1,
    'Col_1_img_0': Col_1_img_0,
    'First_page_img_1_template2': First_page_img_1_template2,
    'img_0_template2': img_0_template2,
    'First_page_img_1_template3': First_page_img_1_template3,
    'img_1_template3': img_1_template3,
}

export const templateSamples = {
    cover: [{
        name: 'First_page_img_1',
        img: cover_png.src,
    }],
    main: [{
        name: 'Col_1_img_0',
        img: noimg_png.src,
    }, {
        name: 'Col_2_img_1',
        img: withimg_png.src,
    }]
};