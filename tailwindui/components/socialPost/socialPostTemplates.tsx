import { StaticImageData } from "next/image";
import { ImgModule } from "@/components/imgModule";
import { useEffect, useMemo, useState } from "react";
import cover_png from '@/public/images/template/cover.png' // Cover
import col1img0_png from '@/public/images/template/col1img0.png'
import col2img1_png from '@/public/images/template/col2img1.png'
import col3img2_png from '@/public/images/template/col3img2.png'
import { color } from "html2canvas/dist/types/css/types/color";
import '@/components/socialPost/templates.css'

interface MainSlideProps {
    subtopic: JSX.Element,
    keywords: JSX.Element[] | JSX.Element,
    content: JSX.Element[],
    original_title: JSX.Element,
    English_title: JSX.Element,
    section_title: JSX.Element,
    imgs: string[],
    update_callback: (imgs: string[]) => void,
    canEdit: boolean,
    autoSave: Function,
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

export const Col_2_img_1 = ({subtopic, content, keywords, canEdit, imgs, update_callback, autoSave }: MainSlideProps) => {

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
            padding: '28px',
        }}>
            <div className="w-full px-[15px]">{keywords}</div>
            <div className='w-full px-[15px]'>{subtopic}</div>
            <div id='container_gradient'className="h-full w-full flex flex-col overflow-hidden rounded-lg mt">
                <div className="grow mt-[10px] mx-[30px] ">{content}</div>
                <div className="w-full h-full grow rounded-md overflow-hidden">
                    <ImgModule imgsrc={localImgs[0]} updateSingleCallback={updateImgAtIndex(0)} canEdit={canEdit} autoSave={autoSave} />
                </div> 
            </div>
    </div>
}


export const First_page_img_1 = ({ subtopic, keywords, canEdit, imgs, update_callback, autoSave }: MainSlideProps) => {

    const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback);

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
                id="container_cover_gradient" 
                className="w-full h-full flex flex-col justify-between"
                style={{
                    backgroundImage: `linear-gradient(180deg, #E54BFF 0%, rgba(217, 217, 217, 0.00) 40%), url(${localImgs[0]})`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="mt-[40px] px-[20px] text-center">{subtopic}</div>
                <div
                className="mb-[20px] mx-[auto] text-center"
                style={{
                    border: '3px solid #FFF',
                    borderRadius: '10px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(24px)',
                }}
                >
                    {keywords}
                </div>
            </div>

        {/* <div className="w-1/2 h-full rounded-md overflow-hidden">
            <ImgModule imgsrc={localImgs[0]} updateSingleCallback={updateImgAtIndex(0)} canEdit={canEdit} autoSave={autoSave} />
        </div> */}
        </div>
    )
}

export const Col_1_img_0 = ({ subtopic, keywords, content, canEdit, autoSave }: MainSlideProps) => {
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
                padding: '28px',
            }}>
            <div className="w-full px-[15px]">{keywords}</div>
            <div className='w-full px-[15px]'>{subtopic}</div>
                <div id='container_gradient'className="h-full w-full flex flex-row overflow-hidden gap-[32px] rounded-lg">
                    <div className="grow mt-[10px] mx-[30px] ">{content}</div>
                </div>
        </div>
    )
}

export const First_page_img_1_template2 = ({ original_title, English_title, imgs, update_callback, canEdit, autoSave }: MainSlideProps) => {
    const { localImgs, updateImgAtIndex } = useLocalImgs(imgs, 1, update_callback);
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
                backgroundColor: '#CED0CC',
                padding: '22px',
            }}>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full flex flex-col bg-red">
                    <div className="w-full">
                        <div className="w-full">{English_title}</div>
                        <div className="">{original_title}</div>
                    </div>
                </div>
                <div 
                    className="w-full h-1/2"
                    style={{
                        borderRadius: '20px',
                        backgroundImage: `url(${localImgs[0]})`,
                        backgroundSize: 'cover',
                    }}>

                </div>
            </div>
        </div>
    )
}

export const img_0_template2 = ({ section_title, original_title, content, update_callback, canEdit, autoSave }: MainSlideProps) => {

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
                className="w-full h-[45px]" 
                style={{
                    borderBottom: '2px solid #E7E5E5',
                }}>
                <div 
                    className='w-full h-full px-[6%] flex justify-start items-end'
                    style={{
                        borderLeft: '2px solid #E7E5E5',
                        borderRight: '2px solid #E7E5E5',
                    }}>
                    {original_title}
                </div>
            </div>
            <div 
                className="w-full h-[90px] border-b-[2px]"
                style={{
                    borderBottomColor: '#E7E5E5'
                }}>
                <div 
                    className='w-full h-full px-[6%] flex justify-start items-end'
                    style={{
                        borderLeft: '2px solid #E7E5E5',
                        borderRight: '2px solid #E7E5E5',
                    }}>
                    {section_title}
                </div>
            </div>
            <div 
                className="w-full h-[450px] border-b-[2px]"
                style={{
                    borderBottomColor: '#E7E5E5'
                }}>
                <div 
                    className='w-full h-full px-[6%] flex justify-start items-end flex-col'
                    style={{
                        borderLeft: '2px solid #E7E5E5',
                        borderRight: '2px solid #E7E5E5',
                    }}>
                    {content}
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
}

export const templateSamples = {
    cover: [{
        name: 'First_page_img_1',
        img: cover_png.src,
    },{
        name: 'First_page_img_1_template2',
        img: cover_png.src,
    }],
    main: [{
        name: 'Col_1_img_0',
        img: col1img0_png.src,
    }, {
        name: 'Col_2_img_1',
        img: col2img1_png.src,
    }, {
        name: 'img_0_template2',
        img: col1img0_png.src,
    }
    ]
};