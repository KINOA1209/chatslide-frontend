import { h1Style, h2Style, h3Style, h4Style, h5Style, h6Style, h7Style, h8Style, h9Style, listStyle } from '@/components/socialPost/Styles'
import { SocialPostSlide, SlideKeys } from '@/components/socialPost/socialPostHTML'
import templates, { templateSamples } from '@/components/socialPost/socialPostTemplates'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import {
    CompanyIconBlack,
    CompanyIconWhite,
} from '@/components/socialPost/socialPostIcons'
import dynamic from 'next/dynamic';
import React, { CSSProperties, useEffect, useRef } from 'react';

const QuillEditable = dynamic(() => import('./quillEditor'), { ssr: false });

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
): JSX.Element => {
    let keyPrefix = ''
    if (exportToPdfMode) {
        keyPrefix = 'exportToPdf'
    } else if (!canEdit){
        keyPrefix = 'preview'
    }
    const Template = templates[slide.template as keyof typeof templates]

    const generateContentElement = (
        content: string, 
        contentTag: SlideKeys, 
        style: CSSProperties,
        contentIndex?: number,
        ) => {
        if (!canEdit) {
            return (
                <div
                    className='ql-editor non-editable-ql-editor'
                    style={{...style, outline: 'none'}}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            )
        }
        else {
            if(contentIndex !== undefined){
                return (
                    <QuillEditable
                    content={content}
                    handleBlur={(newContent) => handleSlideEdit(newContent, index, contentTag, contentIndex)}
                    style={style}
                    />
                )
            }
            else{
                return (
                    <QuillEditable
                        content={content}
                        handleBlur={(newContent) => handleSlideEdit(newContent, index, contentTag)}
                        style={style}
                    />
                )
            }
        }
    }

    if (index === 0) {
        return <Template
            autoSave={saveSlides}
            key={keyPrefix + index.toString()}
            update_callback={updateImgUrlArray(index)}
            canEdit={canEdit}
            imgs={slide.images}
            icon={<CompanyIconWhite />}
            original_title={generateContentElement(slide.original_title, 'original_title', h6Style)}
            English_title={<></>}
            content={[<></>]}
            subtopic={<></>}
            keywords={[<></>]}
            section_title={<></>}
            brief={<></>}
            illustration={['']}
            title={<></>}
            quote={<></>}
            source={<></>}
            topic={<></>}
        />
    } 
    else {
        return <Template
            autoSave={saveSlides}
            canEdit={canEdit}
            key={keyPrefix + index.toString()}
            icon={<CompanyIconBlack />}
            update_callback={updateImgUrlArray(index)}
            content={
                slide.content.map((content: string, contentIndex: number) => {
                    if (content.includes('$$') || content.includes('\\(')) {
                        if (editMathMode) {
                            return (
                                <div
                                    key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
                                    className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
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
                                            className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
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
                        {generateContentElement(content, 'content', h9Style, contentIndex)}
                        </div>
                    );
                })
            }
            section_title={generateContentElement(slide.section_title, 'section_title', h8Style)}
            original_title={generateContentElement(slide.original_title, 'original_title', h7Style)}
            brief={generateContentElement(slide.brief, 'brief', h9Style)}
            illustration={['']}
            imgs={['']}
            English_title={<></>}
            subtopic={<></>}
            keywords={[<></>]}
            title={<></>}
            quote={<></>}
            source={<></>}
            topic={<></>}
        />
    }
}