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
            illustration={(slide.illustration) as string[]}
            title={
                <div
                    key={0}
                    className={`rounded-md outline-2 px-[4px] ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                    contentEditable={canEdit}
                    onFocus={() => {
                        if (canEdit) {
                            setIsEditMode(true);
                        }
                    }}
                    onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'title')}
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                />
            }
            quote={<></>}
            source={<></>}
            subtopic={<></>}
            keywords={<></>}
            original_title={<></>}
            English_title={<></>}
            content={[<></>]}
            brief={<></>}
            section_title={<></>}
        />
    } 
    else {
        return <Template
            autoSave={saveSlides}
            canEdit={canEdit}
            key={keyPrefix + index.toString()}
            imgs={[]}
            update_callback={updateImgUrlArray(index)}
            icon={<CompanyIconBlack />}
            illustration={(slide.illustration) as string[]}
            
            quote={(
                <div
                key={0}
                className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                contentEditable={canEdit}
                onFocus={() => {
                    if (canEdit) {
                        setIsEditMode(true);
                    }
                }}
                onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'quote')}
                dangerouslySetInnerHTML={{ __html: slide.quote }}
                />
            )}
            source={
                <div
                key={1}
                className={`rounded-md outline-2 ${!exportToPdfMode && 'overflow-hidden'} ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
                contentEditable={canEdit}
                onFocus={() => {
                    if (canEdit) {
                        setIsEditMode(true);
                    }
                }}
                onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'source')}
                dangerouslySetInnerHTML={{ __html: slide.source }}
                />
            }
            subtopic={<></>}
            keywords={<></>}
            content={[<></>]}
            English_title={<></>}
            section_title={<></>}
            original_title={<></>}
            brief={<></>}
            title={<></>}
        />
    }
}