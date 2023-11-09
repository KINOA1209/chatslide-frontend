import { h1Style, h2Style, h3Style, h4Style, listStyle } from '@/components/slides/Styles'
import { SocialPostSlide, SlideKeys } from '@/components/socialPost/socialPostHTML'
import templates, { templateSamples } from '@/components/socialPost/socialPostTemplates'
import { MathJax, MathJaxContext } from 'better-react-mathjax'

function wrapWithLiTags(content: string): string {
    if (!content.includes('<li>') || !content.includes('</li>')) {
        return `<li">${content}</li>`
    }
    return content
}


export const templateDispatch = (
    slide: SocialPostSlide,
    index: number,
    canEdit: boolean = true,
    exportToPdfMode: boolean = false,
    editMathMode: boolean = false,
    saveSlides: (slides: SocialPostSlide[]) => void = () => {},  // Replace with your default function if you have one
    setIsEditMode: (isEditMode: boolean) => void = () => {},  // Replace with your default function if you have one
    //handleSlideEdit: (content: string | string[], index: number, tag: SlideKeys) => void = () => {},  // Replace with your default function if you have one
    //updateImgUrlArray: (slideIndex: number) => (urls: string[]) => void = () => () => {},  // Replace with your default function if you have one
    toggleEditMathMode: () => void = () => {},  // Replace with your default function if you have one
): JSX.Element => {
    let keyPrefix = ''
    if (exportToPdfMode) {
        keyPrefix = 'exportToPdf'
    } else if (!canEdit){
        keyPrefix = 'preview'
    }
    console.log(slide)
    const Template = templates[slide.template as keyof typeof templates]
    if (index === 0) {
        return <Template
            autoSave={saveSlides}
            key={keyPrefix + index.toString()}
            subtopic={<></>}
            content={[<></>]}
            keywords={[<></>]}
            //update_callback={updateImgUrlArray(index)}
            canEdit={canEdit}
        />
    } 
    else {
        return <Template
            autoSave={saveSlides}
            canEdit={canEdit}
            key={keyPrefix + index.toString()}
            subtopic={
                <div
                    key={1}
                    className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                    contentEditable={canEdit}
                    onFocus={() => {
                        if (canEdit) {
                            setIsEditMode(true);
                        }
                    }}
                    //onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'title')}
                    style={h2Style}
                    dangerouslySetInnerHTML={{ __html: slide.subtopic }}
                />
            }
            keywords={
                <div
                    key={1}
                    className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                    contentEditable={canEdit}
                    onFocus={() => {
                        if (canEdit) {
                            setIsEditMode(true);
                        }
                    }}
                    //onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'title')}
                    style={h2Style}
                    dangerouslySetInnerHTML={{ __html: slide.keywords }}
                />
            }

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
                                    // onBlur={(e) => {
                                    //     const modifiedContent = [...slide.content];
                                    //     modifiedContent[contentIndex] = e.target.innerText;
                                    //     handleSlideEdit(modifiedContent, index, 'content');
                                    // }}
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
                            // onBlur={(e) => {
                            //     const modifiedContent = [...slide.content];
                            //     modifiedContent[contentIndex] = e.target.innerText;
                            //     handleSlideEdit(modifiedContent, index, 'content');
                            // }}
                            dangerouslySetInnerHTML={{ __html: wrapWithLiTags(content) }}
                        >
                        </div>
                    );
                })
            }

            //imgs={(slide.images) as string[]}
            //update_callback={updateImgUrlArray(index)}
        />
    }
}