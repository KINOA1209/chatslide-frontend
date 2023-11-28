import { h1Style, h2Style, h3Style, h4Style, listStyle } from './Styles'
import { Slide, SlideKeys } from '@/components/slides/SlidesHTML'
import {
  availableTemplates,
  // templateSamples,
} from '@/components/slides/slideTemplates'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { LayoutKeys } from '@/components/slides/slideLayout'
function wrapWithLiTags(content: string): string {
  if (!content.includes('<li>') || !content.includes('</li>')) {
    return `<li>${content}</li>`
  }
  return content
}

export const templateDispatch = (
  slide: Slide,
  index: number,
  canEdit: boolean = true,
  exportToPdfMode: boolean = false,
  editMathMode: boolean = false,
  saveSlides: (slides: Slide[]) => void = () => {}, // Replace with your default function if you have one
  setIsEditMode: (isEditMode: boolean) => void = () => {}, // Replace with your default function if you have one
  handleSlideEdit: (
    content: string | string[],
    index: number,
    tag: SlideKeys
  ) => void = () => {}, // Replace with your default function if you have one
  updateImgUrlArray: (slideIndex: number) => (urls: string[]) => void = () =>
    () => {}, // Replace with your default function if you have one
  toggleEditMathMode: () => void = () => {}, // Replace with your default function if you have one

  isCoverPage: boolean = false,
  layoutOptionNonCover: LayoutKeys = 'Col_1_img_0_layout',
  layoutOptionCover: LayoutKeys = 'Cover_img_1_layout',
  brandingColor?: string
): JSX.Element => {
  let keyPrefix = ''
  if (exportToPdfMode) {
    keyPrefix = 'exportToPdf'
  } else if (!canEdit) {
    keyPrefix = 'preview'
  }
  const Template =
    availableTemplates[slide.template as keyof typeof availableTemplates]
  // console.log('templates are', Template)
  // if (index === 0) {
  //   return (
  //     <Template
  //       autoSave={saveSlides}
  //       key={keyPrefix + index.toString()}
  //       user_name={
  //         <div
  //           key={0}
  //           // className={`rounded-md overflow-hidden outline-2 ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
  //           className={`rounded-md outline-2 ${
  //             !exportToPdfMode && 'overflow-hidden'
  //           } `}
  //           // contentEditable={canEdit}
  //           contentEditable={false}
  //           // onFocus={() => {
  //           //     if (canEdit) {
  //           //         setIsEditMode(true);
  //           //     }
  //           // }}
  //           // onBlur={(e) =>
  //           //     handleSlideEdit(e.target.innerText, index, 'userName')}
  //           style={h4Style}
  //           dangerouslySetInnerHTML={{ __html: slide.userName }}
  //         />
  //       }
  //       title={
  //         <div
  //           key={1}
  //           className={`rounded-md outline-2 ${
  //             !exportToPdfMode && 'overflow-hidden'
  //           } ${
  //             canEdit
  //               ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
  //               : ''
  //           }`}
  //           contentEditable={canEdit}
  //           onFocus={() => {
  //             if (canEdit) {
  //               setIsEditMode(true)
  //             }
  //           }}
  //           onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'head')}
  //           style={h1Style}
  //           dangerouslySetInnerHTML={{ __html: slide.head }}
  //         />
  //       }
  //       topic={<></>}
  //       subtopic={<></>}
  //       content={[<></>]}
  //       imgs={slide.images}
  //       update_callback={updateImgUrlArray(index)}
  //       canEdit={canEdit}
  //     />
  //   )
  // } else {
  return (
    <Template
      autoSave={saveSlides}
      canEdit={canEdit}
      key={keyPrefix + index.toString()}
      user_name={
        <div
          key={0}
          // className={`rounded-md overflow-hidden outline-2 ${canEdit ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline' : ''}`}
          className={`rounded-md outline-2 ${
            !exportToPdfMode && 'overflow-hidden'
          } ${index !== 0 ? 'hidden' : ''}`}
          // contentEditable={canEdit}
          contentEditable={false}
          // onFocus={() => {
          //     if (canEdit) {
          //         setIsEditMode(true);
          //     }
          // }}
          // onBlur={(e) =>
          //     handleSlideEdit(e.target.innerText, index, 'userName')}
          // style={h4Style}
          dangerouslySetInnerHTML={{ __html: slide.userName }}
        />
      }
      title={
        <div
          key={1}
          className={`rounded-md outline-2 ${
            !exportToPdfMode && 'overflow-hidden'
          } ${
            canEdit
              ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
              : ''
          } ${index !== 0 ? 'hidden' : ''}`}
          contentEditable={canEdit}
          onFocus={() => {
            if (canEdit) {
              setIsEditMode(true)
            }
          }}
          onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'head')}
          // style={h1Style}
          dangerouslySetInnerHTML={{ __html: slide.head }}
        />
      }
      topic={
        <div
          key={2}
          className={`rounded-md outline-2 py-6 flex-nowrap  ${
            !exportToPdfMode && 'overflow-hidden'
          } ${
            canEdit
              ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
              : ''
          }${index === 0 ? 'hidden' : ''}`}
          contentEditable={canEdit}
          onFocus={() => {
            if (canEdit) {
              setIsEditMode(true)
            }
          }}
          onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'title')}
          // style={h2Style}
          dangerouslySetInnerHTML={{ __html: slide.title }}
        />
      }
      subtopic={
        <div
          key={3}
          className={`rounded-md outline-2 ${
            !exportToPdfMode && 'overflow-hidden'
          } ${
            canEdit
              ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
              : ''
          }${index === 0 ? 'hidden' : ''}`}
          contentEditable={canEdit}
          onFocus={() => {
            if (canEdit) {
              setIsEditMode(true)
            }
          }}
          onBlur={(e) => {
            handleSlideEdit(e.target.innerText, index, 'subtopic')
          }}
          // style={h3Style}
          dangerouslySetInnerHTML={{ __html: slide.subtopic }}
        />
      }
      content={slide.content.map((content: string, contentIndex: number) => {
        // math mode
        if (content.includes('$$') || content.includes('\\(')) {
          if (editMathMode) {
            return (
              <>
                <div
                  key={
                    keyPrefix + index.toString() + '_' + contentIndex.toString()
                  }
                  className={`rounded-md outline-2 border-4 border-black ${
                    !exportToPdfMode && 'overflow-hidden'
                  } ${
                    canEdit
                      ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
                      : ''
                  }${index === 0 ? 'hidden' : ''} `}
                  contentEditable={canEdit}
                  // style={listStyle}
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
              </>
            )
          } else {
            return (
              <div className={`${index === 0 ? 'hidden' : ''}`}>
                {' '}
                <MathJaxContext
                  key={
                    keyPrefix + index.toString() + '_' + contentIndex.toString()
                  }
                >
                  <MathJax>
                    <div
                      onClick={toggleEditMathMode}
                      className={`rounded-md outline-2 ${
                        !exportToPdfMode && 'overflow-hidden'
                      } ${
                        canEdit
                          ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
                          : ''
                      }`}
                      // style={listStyle}
                    >
                      {content}
                    </div>
                  </MathJax>
                </MathJaxContext>
              </div>
            )
          }
        }
        return (
          <div
            key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
            className={`rounded-md outline-2 ${
              !exportToPdfMode && 'overflow-hidden'
            } ${
              canEdit
                ? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
                : ''
            } ${index === 0 ? 'hidden' : ''}`}
            contentEditable={canEdit}
            // style={listStyle}
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
      })}
      imgs={slide.images as string[]}
      update_callback={updateImgUrlArray(index)}
      isCoverPage={isCoverPage}
      layoutOptionNonCover={layoutOptionNonCover}
      layoutOptionCover={layoutOptionCover}
      brandingColor={brandingColor}
    />
  )
  // }
}
