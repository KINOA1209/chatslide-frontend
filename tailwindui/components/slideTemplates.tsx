import { StaticImageData } from "next/image";
import { ImgModule } from "@/components/imgModule";
import { useState } from "react";

interface MainSlideProps {
    topic: JSX.Element,
    subtopic: JSX.Element,
    content: JSX.Element,
    img: StaticImageData
}

export const Col_2_img_1 = ({ topic, subtopic, content, img }: MainSlideProps) => {
    const [imgs, setImgs] = useState()
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
                <ImgModule src={img.src} /></div>
                {/* <ImgModule src={''} /></div> */}
        </div>
    </div>
}