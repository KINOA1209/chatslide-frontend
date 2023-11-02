import { StaticImageData } from "next/image";
import { ImgModule } from "@/components/imgModule";
import { useEffect, useState } from "react";
import template1 from '@/public/images/template/1.jpg' // Cover
import template2 from '@/public/images/template/2.jpg' // col1 img0
import template3 from '@/public/images/template/3.jpg' // col2 img1

interface MainSlideProps {
    user_name: JSX.Element,
    title: JSX.Element,
    topic: JSX.Element,
    subtopic: JSX.Element,
    content: JSX.Element[],
    imgs: string[],
    update_callback: Function,
    canEdit: boolean,
    autoSave: Function,
}

export const Col_2_img_1 = ({ user_name, title, topic, subtopic, content, imgs, update_callback, canEdit, autoSave }: MainSlideProps) => {

    // localImgs array length should be initialized to ImgCount
    const ImgCount = 1;
    const [localImgs, setLocalImgs] = useState<string[]>(['']);
    // init localImgs
    useEffect(() => {
        if (imgs.length === ImgCount) {
            setLocalImgs([...imgs])
        } else {
            let cleanedImgs = imgs.filter(url => url !== '');
            if (cleanedImgs.length > ImgCount) {
                // if too many images => remove excessive urls
                cleanedImgs = cleanedImgs.splice(ImgCount, cleanedImgs.length - ImgCount);
            } else if (cleanedImgs.length < ImgCount) {
                // if not enough images => add empty urls
                for (let i = cleanedImgs.length + 1; i <= ImgCount; i++) {
                    cleanedImgs.push('');
                };
            }
            setLocalImgs(cleanedImgs);
        }
    }, [])

    useEffect(() => {
        update_callback(localImgs)
    }, [localImgs])

    const updateImgAtIndex = (index: number) => {
        const updateLocalImgs = (url: string) => {
            let newLocalImgs = [...localImgs];
            newLocalImgs[index] = url;
            setLocalImgs(newLocalImgs);
        };
        return updateLocalImgs;
    }

    return <div
        className="rounded-md overflow-hidden"
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
        }}>
        <div>
            <div>{topic}</div>
        </div>
        <div>{subtopic}</div>
        <hr className="border border-[#E7E9EB] w-full mt-[20px] mb-[12px]"></hr>
        <div className="h-full w-full flex flex-row overflow-hidden gap-[32px]">
            <div className="w-full h-full grow p-1">{content}</div>
            <div className="w-full h-full grow rounded-md overflow-hidden">
                <ImgModule imgsrc={localImgs[0]} updateSingleCallback={updateImgAtIndex(0)} canEdit={canEdit} autoSave={autoSave}/>
            </div>
        </div>
    </div>
}


export const First_page_img_1 = ({ user_name, title, topic, subtopic, content, imgs, update_callback, canEdit, autoSave }: MainSlideProps) => {
    
    // localImgs array length should be initialized to ImgCount
    const ImgCount = 1;
    const [localImgs, setLocalImgs] = useState<string[]>(['']);
    // init localImgs
    useEffect(() => {
        if (imgs.length === ImgCount) {
            setLocalImgs([...imgs])
        } else {
            let cleanedImgs = imgs.filter(url => url !== '');
            if (cleanedImgs.length > ImgCount) {
                // if too many images => remove excessive urls
                cleanedImgs = cleanedImgs.splice(ImgCount, cleanedImgs.length - ImgCount);
            } else if (cleanedImgs.length < ImgCount) {
                // if not enough images => add empty urls
                for (let i = cleanedImgs.length + 1; i <= ImgCount; i++) {
                    cleanedImgs.push('');
                };
            }
            setLocalImgs(cleanedImgs);
        }
    }, [])

    useEffect(() => {
        update_callback(localImgs)
    }, [localImgs])

    const updateImgAtIndex = (index: number) => {
        const updateLocalImgs = (url: string) => {
            let newLocalImgs = [...localImgs];
            newLocalImgs[index] = url;
            setLocalImgs(newLocalImgs);
        };
        return updateLocalImgs;
    }

    return <div
        className="rounded-md overflow-hidden gap-[32px]"
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
        }}>
        <div className="w-1/2 flex flex-col justify-between h-full">
            <div>
                {user_name}
            </div>

            <div>
                {title}
            </div>
        </div>

        <div className="w-1/2 h-full rounded-md overflow-hidden">
            <ImgModule imgsrc={localImgs[0]} updateSingleCallback={updateImgAtIndex(0)} canEdit={canEdit} autoSave={autoSave}/>
        </div>
    </div >
}

export const Col_1_img_0 = ({ user_name, title, topic, subtopic, content, imgs, update_callback, canEdit, autoSave }: MainSlideProps) => {

    // localImgs array length should be initialized to ImgCount
    const ImgCount = 0;
    const [localImgs, setLocalImgs] = useState<string[]>([]);

    // // init localImgs
    // useEffect(() => {
    //     if (imgs.length === ImgCount) {
    //         setLocalImgs([...imgs])
    //     } else {
    //         let cleanedImgs = imgs.filter(url => url !== '');
    //         if (cleanedImgs.length > ImgCount) {
    //             // if too many images => remove excessive urls
    //             cleanedImgs = cleanedImgs.splice(ImgCount, cleanedImgs.length - ImgCount);
    //         } else if (cleanedImgs.length < ImgCount) {
    //             // if not enough images => add empty urls
    //             for (let i = cleanedImgs.length + 1; i <= ImgCount; i++) {
    //                 cleanedImgs.push('');
    //             };
    //         }
    //         setLocalImgs(cleanedImgs);
    //     }
    // }, [])

    useEffect(() => {
        update_callback(localImgs)
    }, [localImgs])

    // const updateImgAtIndex = (index: number) => {
    //     const updateLocalImgs = (url: string) => {
    //         let newLocalImgs = [...localImgs];
    //         newLocalImgs[index] = url;
    //         setLocalImgs(newLocalImgs);
    //     };
    //     return updateLocalImgs;
    // }

    return <div
        className="rounded-md overflow-hidden"
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
        }}>
        <div>
            <div>{topic}</div>
        </div>
        <div>{subtopic}</div>
        <hr className="border border-[#E7E9EB] w-full mt-[20px] mb-[12px]"></hr>
        <div className="h-full w-full flex flex-row overflow-hidden gap-[32px]">
            <div className="w-full h-full grow p-1">{content}</div>
        </div>
    </div>
}


export const Col_2_img_2 = ({ user_name, title, topic, subtopic, content, imgs, update_callback, canEdit, autoSave }: MainSlideProps) => {
    // localImgs array length should be initialized to ImgCount
    const ImgCount = 2;
    const [localImgs, setLocalImgs] = useState<string[]>(['', '']);
    // init localImgs
    useEffect(() => {
        if (imgs.length === ImgCount) {
            setLocalImgs([...imgs])
        } else {
            let cleanedImgs = imgs.filter(url => url !== '');
            if (cleanedImgs.length > ImgCount) {
                // if too many images => remove excessive urls
                cleanedImgs = cleanedImgs.splice(ImgCount, cleanedImgs.length - ImgCount);
            } else if (cleanedImgs.length < ImgCount) {
                // if not enough images => add empty urls
                for (let i = cleanedImgs.length + 1; i <= ImgCount; i++) {
                    cleanedImgs.push('');
                };
            }
            setLocalImgs(cleanedImgs);
        }
    }, [])

    useEffect(() => {
        update_callback(localImgs)
    }, [localImgs])

    const updateImgAtIndex = (index: number) => {
        const updateLocalImgs = (url: string) => {
            let newLocalImgs = [...localImgs];
            newLocalImgs[index] = url;
            setLocalImgs(newLocalImgs);
        };
        return updateLocalImgs;
    }

    return <div
        className="rounded-md overflow-hidden"
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
        }}>
        <div>
            <div>{topic}</div>
        </div>
        <div>{subtopic}</div>
        <hr className="border border-[#E7E9EB] w-full mt-[20px] mb-[12px]"></hr>
        <div className="h-full w-full flex flex-row overflow-hidden gap-[32px]">
            <div className="w-full h-full grow p-1">{content}</div>
            <div className="w-full h-full grow rounded-md overflow-hidden">
                <ImgModule imgsrc={localImgs[0]} updateSingleCallback={updateImgAtIndex(0)} canEdit={canEdit} autoSave={autoSave} />
            </div>
            <div className="w-full h-full grow rounded-md overflow-hidden">
                <ImgModule imgsrc={localImgs[1]} updateSingleCallback={updateImgAtIndex(1)} canEdit={canEdit} autoSave={autoSave} />
            </div>
        </div>
    </div>
}

export default {
    'Col_2_img_1': Col_2_img_1,
    'First_page_img_1': First_page_img_1,
    'Col_1_img_0': Col_1_img_0,
    'Col_2_img_2': Col_2_img_2,
}

export const templateSamples = {
    cover: [{
        name: 'First_page_img_1',
        img: template1.src,
    }],
    main: [{
        name: 'Col_1_img_0',
        img: template2.src,
    }, {
        name: 'Col_2_img_1',
        img: template3.src,
    }, 
    {
        name: 'Col_2_img_2',
        img: template2.src,
    },
]
};
