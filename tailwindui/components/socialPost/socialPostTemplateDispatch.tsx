import { h1Style, h2Style, h3Style, h4Style, h5Style, h6Style, h7Style, h8Style, h9Style, listStyle } from '@/components/socialPost/Styles'
import { SocialPostSlide, SlideKeys } from '@/components/socialPost/socialPostHTML'
import templates, { templateSamples } from '@/components/socialPost/socialPostTemplates'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import {
    CompanyIconWhite,
} from '@/components/socialPost/socialPostIcons'
import React, { useEffect, useRef } from 'react';
import QuillEditable from './quillEditor'

export const templateDispatch = (
    slide: SocialPostSlide,
    index: number,
    canEdit: boolean = true,
    exportToPdfMode: boolean = false,
    editMathMode: boolean = false,
    saveSlides: (slides: SocialPostSlide[]) => void = () => {},  // Replace with your default function if you have one
    setIsEditMode: (isEditMode: boolean) => void = () => {},  // Replace with your default function if you have one
    handleSlideEdit: (content: string | string[], index: number, tag: SlideKeys, contentIndex?:number) => void = () => {},  // Replace with your default function if you have one
    updateImgUrlArray: (slideIndex: number) => (urls: string[]) => void = () => () => {},  // Replace with your default function if you have one
    updateIllustrationUrlArray: (slideIndex: number) => (urls: string[]) => void = () => () => {},
    toggleEditMathMode: () => void = () => {},  // Replace with your default function if you have one
    //handleFocus: (event: React.FocusEvent<HTMLDivElement>, slideIndex: number, tag: SlideKeys) => void = () => {},
    //handleBlur: (event: React.FocusEvent<HTMLDivElement>, slideIndex: number, tag: SlideKeys) => void = () => {},
): JSX.Element => {
    let keyPrefix = ''
    if (exportToPdfMode) {
        keyPrefix = 'exportToPdf'
    } else if (!canEdit){
        keyPrefix = 'preview'
    }
    const Template = templates[slide.template as keyof typeof templates]
    const arrayToHtml = (contentArray: Array<string>) => {
        return contentArray.map(item => `<p>${item}</p>`).join('');
    };
    if (index === 0) {
        return (
          <Template
            autoSave={saveSlides}
            key={keyPrefix + index.toString()}
            icon={<CompanyIconWhite />}
            update_callback={updateImgUrlArray(index)}
            canEdit={canEdit}
            imgs={slide.images}
            topic={
                // <div
                //     key={0}
                //     id='topic_coverpage_template1'
                //     className={`${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                //     contentEditable={canEdit}
                //     onFocus={(e) => {
                //         if (canEdit) {
                //             setIsEditMode(true);
                //             //handleFocus(e, index, 'topic')      
                //         }
                //     }}
                //     onBlur={(e) => {
                //         //handleBlur(e, index, 'topic')
                //         handleSlideEdit(e.target.innerText, index, 'topic')
                //     }}
                //     //style={h3Style}
                //     dangerouslySetInnerHTML={{ __html: slide.topic }}
                // />

                <QuillEditable
                    content={slide.topic}
                    handleBlur={(newContent) => handleSlideEdit(newContent, index, 'topic')}
                    style={h3Style}
                />
            }
            keywords={
                // <div
                //     key={1}
                //     className={`rounded-md outline-2 px-[4px] py-[2%] ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                //     contentEditable={canEdit}
                //     onFocus={() => {
                //         if (canEdit) {
                //             setIsEditMode(true);
                //         }
                //     }}
                //     onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'keywords')}
                //     style={h4Style}
                //     dangerouslySetInnerHTML={{ __html: slide.keywords }}
                // />
                <QuillEditable
                    content={Array.isArray(slide.keywords) ? arrayToHtml(slide.keywords) : slide.keywords}
                    handleBlur={(newContent) => handleSlideEdit(newContent, index, 'keywords')}
                    style={h4Style}
                />
            }
            subtopic={<></>}
            border_start = {slide.theme?.border_start || '#937C67'}
            border_end = {slide.theme?.border_end || '#4F361F'}
            cover_start = {slide.theme?.cover_start || '#725947 0%'}
            cover_end = {slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
            original_title={<></>}
            English_title={<></>}
            content={[<></>]}
            brief={<></>}
            section_title={<></>}
            illustration={['']}
            title={<></>}
            quote={<></>}
            source={<></>}
        />
      )
    } 
    else {
        return (
          <Template
            autoSave={saveSlides}
            canEdit={canEdit}
            key={keyPrefix + index.toString()}
            icon={<CompanyIconWhite />}
            imgs={(slide.images) as string[]}
            update_callback={updateImgUrlArray(index)}   
            subtopic={
                // <div
                //     key={0}
                //     //className={`${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                //     contentEditable={canEdit}
                //     onFocus={() => {
                //         if (canEdit) {
                //             setIsEditMode(true);
                //         }
                //     }}
                //     onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'subtopic')}
                //     style={h2Style}
                //     dangerouslySetInnerHTML={{ __html: slide.subtopic }}
                // />
                <div>
                <QuillEditable
                    content={slide.subtopic}
                    handleBlur={(newContent) => handleSlideEdit(newContent, index, 'subtopic')}
                    style={h2Style}
                />
                </div>
            }
            keywords={
                // <div
                //     key={1}
                //     className={`${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                //     contentEditable={canEdit}
                //     onFocus={() => {
                //         if (canEdit) {
                //             setIsEditMode(true);
                //         }
                //     }}
                //     onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'keywords')}
                //     style={h1Style}
                //     dangerouslySetInnerHTML={{ __html: slide.keywords }}
                // />
                <div>
                <QuillEditable
                    content={slide.keywords}
                    handleBlur={(newContent) => handleSlideEdit(newContent, index, 'keywords')}
                    style={h1Style}
                />
                </div>
            }

            content={
                slide.content.map((content: string, contentIndex: number) => {
                    if (content.includes('$$') || content.includes('\\(')) {
                        if (editMathMode) {
                            return (
                                <div
                                    key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
                                    className={`${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                                    contentEditable={canEdit}
                                    style={listStyle}
                                    onFocus={() => {
                                        if (canEdit) {
                                            setIsEditMode(true);
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const modifiedContent = [...slide.content];
                                        modifiedContent[contentIndex] = e.target.innerText;
                                        handleSlideEdit(modifiedContent, index, 'content');
                                    }}
                                >
                                    {content}
                                </div>
                            );
                        }
                        else {
                            return (
                                <MathJaxContext key={keyPrefix + index.toString() + '_' + contentIndex.toString()}>
                                    <MathJax>
                                        <div onClick={toggleEditMathMode}
                                            className={`${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                                            style={listStyle}>
                                            {content}
                                        </div>
                                    </MathJax>
                                </MathJaxContext>
                            );
                        }
                    }
                    return (
                        <div key={keyPrefix + index.toString() + '_' + contentIndex.toString()}>
                        {/* <div
                            className={`${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                            contentEditable={canEdit}
                            style={listStyle}
                            onFocus={() => {
                                if (canEdit) {
                                    setIsEditMode(true);
                                }
                            }}
                            onBlur={(e) => {
                                 const modifiedContent = [...slide.content];
                                 modifiedContent[contentIndex] = e.target.innerText;
                                 handleSlideEdit(modifiedContent, index, 'content');
                             }}
                            dangerouslySetInnerHTML={{ __html: content}}
                        >
                        </div> */}
                        <QuillEditable
                            content={content}
                            handleBlur={(newContent) => handleSlideEdit(newContent, index, 'content', contentIndex)}
                            style={listStyle}
                        />
                            
                        <hr className='my-[15px]'></hr>
                        </div>    
                    );
                })
            }
            border_start = {slide.theme?.border_start || '#937C67'}
            border_end = {slide.theme?.border_end || '#4F361F'}
            cover_start = {slide.theme?.cover_start || '#725947 0%'}
            cover_end = {slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}     
            section_title={<></>}
            original_title={<></>}
            illustration={['']}
            brief={<></>}
            title={<></>}
            quote={<></>}
            source={<></>}
            English_title={<></>}
            topic={<></>}
        />
      )
    }
}