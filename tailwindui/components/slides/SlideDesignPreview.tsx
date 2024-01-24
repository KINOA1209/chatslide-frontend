import React, { useRef, useEffect, useState } from 'react';
import Slide from '@/models/Slide';
import { templateDispatch } from './templateDispatch';
import { TemplateKeys, availableTemplates } from "@/components/slides/slideTemplates";
import { layoutOptions } from './slideLayout';
import SlideContainer from './SlideContainer';
import '@/components/slides/overflowScrollbar.css'
import configData from './templates_customizable_elements/customizable_elements';

type SlideDesignPreviewProps = {
    selectedTemplate: string

};

const SlideDesignPreview: React.FC<SlideDesignPreviewProps> = ({
    selectedTemplate,
}) => {
    const [slides, setSlides] = useState<Slide[]>([]);
    // const template = isValidTemplateKey(selectedTemplate) ? selectedTemplate : 'Default';
    // const slides = Object.keys(layoutOptions).map((layoutKey) => {
    //     const newSlide = new Slide();
    //     newSlide.template = template;
    //     newSlide.layout = layoutKey as keyof typeof layoutOptions;
    //     if(layoutKey === 'Col_2_img_0_layout' || layoutKey === 'Col_2_img_2_layout'){
    //         newSlide.content = ['Some content here', 'Some more content here']
    //     }
    //     newSlide.images = ["https://img.freepik.com/free-photo/beatiful-blue-sky-with-clouds-sunny-day_839833-5069.jpg","https://upload.wikimedia.org/wikipedia/commons/0/07/Beatiful_kunar_Afghanistan.jpg","https://img.freepik.com/free-photo/roof-building-covered-snow-against-cloudy-sky_181624-37509.jpg"]
    //     return newSlide;
    // });
    useEffect(() =>{
        sessionStorage.setItem('customizableElements', JSON.stringify(configData))
    }, [])

    useEffect(() => {
        const isValidTemplateKey = (key: string): key is TemplateKeys => {
            return key in availableTemplates;
        };

        const template = isValidTemplateKey(selectedTemplate) ? selectedTemplate : 'Default';
        const newSlides = Object.keys(layoutOptions).map(layoutKey => {
            const newSlide = new Slide();
            newSlide.template = template;
            newSlide.layout = layoutKey as keyof typeof layoutOptions;

            if(layoutKey === 'Col_2_img_0_layout' || layoutKey === 'Col_2_img_2_layout'){
                newSlide.content = ['Some content here', 'Some more content here'];
            }
            
            newSlide.images = [
                "https://img.freepik.com/free-photo/beatiful-blue-sky-with-clouds-sunny-day_839833-5069.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/0/07/Beatiful_kunar_Afghanistan.jpg",
                "https://img.freepik.com/free-photo/roof-building-covered-snow-against-cloudy-sky_181624-37509.jpg"
            ];
            return newSlide;
        });

        setSlides(newSlides);
    }, [selectedTemplate]);

    const layoutNameArray = [
        'Cover Page without image',
        'Cover Page with image',
        '1 column without image',
        '2 column without image',
        '3 column without image',
        '1 column with image',
        '1 column with image',
        '2 column with image',
        '3 column with image',
    ]

    const editableTemplateDispatch = (
		slide: Slide,
		index: number,
		canEdit: boolean,
		exportToPdfMode: boolean = false,
	) =>
		templateDispatch(
			slide,
			index,
			canEdit,
			exportToPdfMode,
			false,
			() => {},
			() => {},
			() => {},
			() => () => {},
			() => {},
			index === 0 || index === 1,
			slide.layout,
			slide.layout,
			true,
		);
	return (
        <div className='py-6 max-w-7xl flex overflow-x-auto overflow-x-scroll overflow-y-hidden'>
            {Array(slides.length)
                .fill(0)
                .map((_, index) => (
                    <div 
                        className='flex flex-col items-center'
                        key={`DesignpreviewContainer` + index.toString()}
                    >
                        <div className={`px-1`}>
                            {/* {index + 1} */}
                            <SlideContainer
                                slides={slides}
                                currentSlideIndex={index}
                                scale={0.25}
                                isViewing={true}
                                templateDispatch={editableTemplateDispatch}
                            />
                        </div>
                        <span className='text-sm font-normal font-creato-medium leading-normal tracking-tight mt-3'>
                            {layoutNameArray[index]}
                        </span>
                    </div>
            ))}
        </div>
	);
};

export default SlideDesignPreview;
