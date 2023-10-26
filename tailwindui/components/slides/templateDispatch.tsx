import { h1Style, h2Style, h3Style, h4Style, listStyle } from './Styles'
import { Slide } from '@/components/NewSlidesHTML'
import templates, { templateSamples } from '@/components/slideTemplates'
import { MathJax, MathJaxContext } from 'better-react-mathjax'

function wrapWithLiTags(content: string): string {
    if (!content.includes('<li>') || !content.includes('</li>')) {
        return `<li style="font-size: 18pt;">${content}</li>`
    }
    return content
}


export const templateDispatch = (
    slide: Slide,
    index: number,
    canEdit: boolean = true,
    isEditMathMode: boolean = false,
    saveSlides: (slides: Slide[]) => void = () => {},  // Replace with your default function if you have one
    setIsEditMode: (isEditMode: boolean) => void = () => {},  // Replace with your default function if you have one
    handleSlideEdit: (content: string | string[], index: number, field: string) => void = () => {},  // Replace with your default function if you have one
    updateImgUrlArray: (index: number) => (url: string, imgIndex: number) => void = () => () => {},  // Replace with your default function if you have one
    toggleEditMathMode: () => void = () => {}  // Replace with your default function if you have one
): JSX.Element => {
    const Template = templates[slide.template as keyof typeof templates]
    if (index === 0) {
        return (
            <Template
                autoSave={saveSlides}
                key={index}
                user_name={
                    <div
                        key={0}
                        className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                        contentEditable={canEdit}
                        onFocus={() => {
                            if (canEdit) {
                                setIsEditMode(true)
                            }
                        }}
                        onBlur={(e) =>
                            handleSlideEdit(e.target.innerText, index, 'userName')
                        }
                        style={h4Style}
                        dangerouslySetInnerHTML={{ __html: slide.userName }}
                    />
                }
                title={
                    <div
                        key={1}
                        className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                        contentEditable={canEdit}
                        onFocus={() => {
                            if (canEdit) {
                                setIsEditMode(true)
                            }
                        }}
                        onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'head')}
                        style={h1Style}
                        dangerouslySetInnerHTML={{ __html: slide.head }}
                    />
                }
                topic={<></>}
                subtopic={<></>}
                content={[<></>]}
                imgs={slide.images}
                update_callback={updateImgUrlArray(index)}
                canEdit={canEdit}
            />
        )
    } else {
        return (
            <Template
                autoSave={saveSlides}
                canEdit={canEdit}
                key={index}
                user_name={<></>}
                title={<></>}
                topic={
                    <div
                        key={0}
                        className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                        contentEditable={canEdit}
                        onFocus={() => {
                            if (canEdit) {
                                setIsEditMode(true)
                            }
                        }}
                        onBlur={(e) =>
                            handleSlideEdit(e.target.innerText, index, 'title')
                        }
                        style={h2Style}
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                }
                subtopic={
                    <div
                        key={1}
                        className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                        contentEditable={canEdit}
                        onFocus={() => {
                            if (canEdit) {
                                setIsEditMode(true)
                            }
                        }}
                        onBlur={(e) => {
                            handleSlideEdit(e.target.innerText, index, 'subtopic')
                        }}
                        style={h3Style}
                        dangerouslySetInnerHTML={{ __html: slide.subtopic }}
                    />
                }
                content={slide.content.map(
                    (content: string, contentIndex: number) => {
                        if (content.includes('$$') || content.includes('\\(')) {
                            if (isEditMathMode) {
                                return (
                                    <div
                                        key={index}
                                        className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                        contentEditable={canEdit}
                                        style={listStyle}
                                        onFocus={() => {
                                            if (canEdit) {
                                                setIsEditMode(true)
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const modifiedContent = [...slide.content]
                                            modifiedContent[contentIndex] = e.target.innerText
                                            handleSlideEdit(modifiedContent, index, 'content')
                                        }}
                                    >
                                        {content}
                                    </div>
                                )
                            } else {
                                return (
                                    <MathJaxContext key={index}>
                                        <MathJax>
                                            <div
                                                onClick={toggleEditMathMode}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                style={listStyle}
                                            >
                                                {content}
                                            </div>
                                        </MathJax>
                                    </MathJaxContext>
                                )
                            }
                        }
                        return (
                            <div
                                key={index}
                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                contentEditable={canEdit}
                                onFocus={() => {
                                    if (canEdit) {
                                        setIsEditMode(true)
                                    }
                                }}
                                onBlur={(e) => {
                                    const modifiedContent = [...slide.content]
                                    modifiedContent[contentIndex] = e.target.innerText
                                    handleSlideEdit(modifiedContent, index, 'content')
                                }}
                                dangerouslySetInnerHTML={{ __html: wrapWithLiTags(content) }}
                            ></div>
                        )
                    }
                )}
                imgs={slide.images as string[]}
                update_callback={updateImgUrlArray(index)}
            />
        )
    }
}