import { h1Style, h2Style, h3Style, h4Style, h5Style, h6Style, h7Style, h8Style, h9Style, listStyle } from '@/components/socialPost/Styles'
import { SocialPostSlide, SlideKeys } from '@/components/socialPost/socialPostHTML'
import templates, { templateSamples } from '@/components/socialPost/socialPostTemplates'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import {
    CompanyIconBlack,
    CompanyIconWhite,
} from '@/components/socialPost/socialPostIcons'

export const templateDispatch = (
    slide: SocialPostSlide,
    index: number,
    canEdit: boolean = true,
    exportToPdfMode: boolean = false,
    editMathMode: boolean = false,
    saveSlides: (slides: SocialPostSlide[]) => void = () => {},  // Replace with your default function if you have one
    setIsEditMode: (isEditMode: boolean) => void = () => {},  // Replace with your default function if you have one
    handleSlideEdit: (content: string | string[], index: number, tag: SlideKeys) => void = () => {},  // Replace with your default function if you have one
    updateImgUrlArray: (slideIndex: number) => (urls: string[]) => void = () => () => {},  // Replace with your default function if you have one
    toggleEditMathMode: () => void = () => {},  // Replace with your default function if you have one
): JSX.Element => {
    let keyPrefix = ''
    if (exportToPdfMode) {
        keyPrefix = 'exportToPdf'
    } else if (!canEdit){
        keyPrefix = 'preview'
    }
    const Template = templates[slide.template as keyof typeof templates]
    if (index === 0) {
        return <Template
            autoSave={saveSlides}
            key={keyPrefix + index.toString()}
            update_callback={updateImgUrlArray(index)}
            canEdit={canEdit}
            imgs={slide.images}
            icon={<CompanyIconWhite />}
            original_title={
                <div
                    key={0}
                    className={`rounded-md outline-2 px-[4px] ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                    contentEditable={canEdit}
                    onFocus={() => {
                        if (canEdit) {
                            setIsEditMode(true);
                        }
                    }}
                    onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'original_title')}
                    style={h6Style}
                    dangerouslySetInnerHTML={{ __html: slide.original_title }}
                />
            }
            English_title={
                <div
                    key={1}
                    className={`rounded-md outline-2 px-[4px] ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                    contentEditable={canEdit}
                    onFocus={() => {
                        if (canEdit) {
                            setIsEditMode(true);
                        }
                    }}
                    onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'English_title')}
                    style={h5Style}
                    dangerouslySetInnerHTML={{ __html: slide.English_title }}
                />
            }
            content={[<></>]}
            subtopic={<></>}
            keywords={[<></>]}
            section_title={<></>}
            brief={<></>}
            illustration={['']}
            title={<></>}
            quote={<></>}
            source={<></>}
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
                        <>
                        <br></br>
                        <div
                            key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
                            className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                            contentEditable={canEdit}
                            style={h9Style}
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
                            dangerouslySetInnerHTML={{ __html: content }}
                        >
                        </div>
                        </>    
                    );
                })
            }
            section_title={
                <div
                    key={0}
                    className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                    contentEditable={canEdit}
                    onFocus={() => {
                        if (canEdit) {
                            setIsEditMode(true);
                        }
                    }}
                    onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'section_title')}
                    style={h8Style}
                    dangerouslySetInnerHTML={{ __html: slide.section_title }}
                />
            }
            original_title={
                <div
                key={1}
                className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                contentEditable={canEdit}
                onFocus={() => {
                    if (canEdit) {
                        setIsEditMode(true);
                    }
                }}
                onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'original_title')}
                style={h7Style}
                dangerouslySetInnerHTML={{ __html: slide.original_title }}
            />
            }
            brief={
                <div
                key={2}
                className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                contentEditable={canEdit}
                onFocus={() => {
                    if (canEdit) {
                        setIsEditMode(true);
                    }
                }}
                onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'brief')}
                style={h9Style}
                dangerouslySetInnerHTML={{ __html: slide.brief }}
            />
            }
            illustration={['']}
            imgs={['']}
            English_title={<></>}
            subtopic={<></>}
            keywords={[<></>]}
            title={<></>}
            quote={<></>}
            source={<></>}
        />
    }
}