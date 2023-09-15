import { StaticImageData } from "next/image";
import { ImgModule } from "@/components/imgModule";
import { useState } from "react";

interface MainSlideProps {
    user_name: JSX.Element,
    title: JSX.Element,
    topic: JSX.Element,
    subtopic: JSX.Element,
    content: JSX.Element,
    imgs: string[],
    update_callback: Function
}

export const Col_2_img_1 = ({ user_name, title, topic, subtopic, content, imgs, update_callback }: MainSlideProps) => {
    return <div 
    className="rounded-md overflow-hidden"
    style={{
        width: '50vw',
        height: 'calc(50vw / 1.77)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        border: 'none',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        backgroundColor: 'white',
        padding: 'calc(50vw * 28 / 960)',
    }}>
        <div>
            <div>{topic}</div>
        </div>
        <div>{subtopic}</div>
        <hr className="border border-[#E7E9EB] w-full mt-[20px] mb-[12px]"></hr>
        <div className="h-full w-full flex flex-row overflow-hidden gap-[32px]">
            <div className="w-full h-full grow">{content}</div>
            <div className="w-full h-full grow rounded-md overflow-hidden">
                <ImgModule src={[imgs[0]]} /></div>
                {/* <ImgModule src={[]} /></div> */}
        </div>
    </div>
}
export const First_page_img_1 = ({ user_name, title, topic, subtopic, content, imgs, update_callback }: MainSlideProps) => {
    return <div 
    className="rounded-md overflow-hidden"
    style={{
        width: '50vw',
        height: 'calc(50vw / 1.77)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        border: 'none',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        backgroundColor: 'white',
        padding: 'calc(50vw * 28 / 960)',
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
                <ImgModule src={[imgs[0]]}  />
        </div>
    </div>
}