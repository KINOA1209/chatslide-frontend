import React, { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import ReactQuill from 'react-quill';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import backdrop from '@/public/images/backdrop.jpg';
import './slidesHTML.css';
import { First_page_img_1, Col_2_img_1 } from "@/components/slideTemplates";
import { Transition } from '@headlessui/react';
import template1 from '@/public/images/template/1.jpg'
import template2 from '@/public/images/template/2.jpg'
import template3 from '@/public/images/template/3.jpg'



export interface SlideElement {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div';
    className: 'head' | 'title' | 'subtopic' | 'content' | 'userName' | 'images';
    content: string | string[];
}

export interface Slide {
    element: { [key: string]: any };
}

type SlidesHTMLProps = {
    finalSlides: Slide[];
    setFinalSlides: Function;
};

const SlidesHTML: React.FC<SlidesHTMLProps> = ({ finalSlides, setFinalSlides }) => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    const foldername = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('foldername') : '';
    const [showLayout, setShowLayout] = useState(true);

    const openModal = () => {
        setShowLayout(true);
    }

    const closeModal = () => {
        setShowLayout(false);
    }

    useEffect(() => {
        if (foldername !== null) {
            loadHtmlFile(foldername, 'html_init.html');
        } else {
            console.error('foldername is null');
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    function loadHtmlFile(foldername: string, filename: string) {
        fetch(`/api/html?foldername=${foldername}&filename=${filename}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                displaySlides(doc);
                sessionStorage.setItem('html', 'html_init.html');
            })
            .catch((error) => {
                console.error('Failed to load HTML file:', error);
            });
    }

    function displaySlides(doc: Document) {
        const slideElements = Array.from(doc.getElementsByClassName('slide'));
        const newSlides: Slide[] = slideElements.map((slide) => {
            const elements: { [key: string]: { type: string; content: string | string[] } } = {};
            const slideChildren = Array.from(slide.children);
            let hasImg = false;
            for (const child of slideChildren) {
                let className = child.className;
                let type = '';
                if (child.className === 'head') {
                    type = 'h1';
                } else if (child.className === 'userName') {
                    type = 'h4';
                } else if (child.className === 'title') {
                    type = 'h2';
                } else if (child.className === 'subtopic') {
                    type = 'h3';
                } else if (child.className === 'content') {
                    type = 'li';
                    const listItems = Array.from(child.getElementsByTagName('li'));
                    elements[className] = { type, content: listItems.map(li => sanitizeHtml(li.innerHTML)) };
                    console.log(typeof (elements[className].content))
                } else if (child.className === 'images') {
                    hasImg = true;
                    type = 'div';
                    const listItems = Array.from(child.getElementsByTagName('img'));
                    const urls = listItems.map((img) => {
                        return img.src;
                    })
                    elements[className] = { type, content: urls }
                }

                if (type !== '' && type !== 'li') {
                    const content = sanitizeHtml(child.innerHTML);
                    elements[className] = { type, content };
                }
            }

            if (!hasImg) {
                // Set an empty string as the content for images
                elements['images'] = { type: 'div', content: [] };
            }
            return { element: elements };
        });

        setFinalSlides(newSlides);
        setSlides(newSlides);
    }


    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
            goToSlide(currentSlideIndex + 1);
        } else if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1);
        }
    }

    function handleSlideEdit(content: string | string[], slideIndex: number, tag: string) {
        const newSlides = [...slides];
        const newFinalSlides = [...finalSlides];

        const currentSlide = newSlides[slideIndex];
        const currNewFinalSlides = newFinalSlides[slideIndex];
        const className = getClassnameByTag(tag);

        if (className) {
            currentSlide.element[className].content = content;
            currNewFinalSlides.element[className].content = content;
            setSlides(newSlides);
            setFinalSlides(newFinalSlides);
        } else {
            console.error(`Unknown tag: ${tag}`);
        }
    }

    function getClassnameByTag(tag: string): string | undefined {
        switch (tag) {
            case 'h1':
                return 'head';
            case 'h2':
                return 'title';
            case 'h3':
                return 'subtopic';
            case 'h4':
                return 'userName';
            case 'p':
                return 'paragraph';
            case 'li':
                return 'content';
            case 'img':
                return 'images';
            default:
                return undefined;
        }
    }


    function goToSlide(index: number) {
        setCurrentSlideIndex(index);
    }

    const h1Style: React.CSSProperties = {
        fontSize: '3.5vw',
        fontWeight: 'bold',
        color: '#2563EB',
    };

    const h2Style: React.CSSProperties = {
        fontSize: '1.3vw',
        fontWeight: 'bold',
        marginTop: '10px',
        color: '#2563EB'
    };

    const h3Style: React.CSSProperties = {
        fontSize: '1.1vw',
        fontWeight: 'bold',
    };

    const h4Style: React.CSSProperties = {
        fontSize: '1.5vw',
        color: 'rgb(180,180,180)',
    };


    const listStyle: React.CSSProperties = {
        display: 'list-item',
        listStyleType: 'disc',
        listStylePosition: 'inside',
    }
    function wrapWithLiTags(content: string): string {
        if (!content.includes("<li>") || !content.includes("</li>")) {
            return `<li>${content}</li>`;
        }
        return content;
    }
    const [isEditMode, setIsEditMode] = useState(false);

    function toggleEditMode() {
        setIsEditMode(!isEditMode);
    }

    const updateImgUrlArray = (slideIndex: number) => {
        const updateImgUrl = (urls: string[]) => {
            handleSlideEdit(urls, slideIndex, 'img');
        };
        return updateImgUrl;
    }

    const templateSample = [
        <img src={template1.src} className='w-full h-full object-contain' />,
        <img src={template2.src} className='w-full h-full object-contain' />,
        <img src={template3.src} className='w-full h-full object-contain' />,
    ]

    return (
        <div className='w-fit h-fit'>

            <div id="slideContainer" style={{
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
            }}>
                {slides.length > 0 && (
                    <div className="slide">
                        {slides[currentSlideIndex] && (
                            currentSlideIndex === 0 ? (
                                <>
                                    {console.log("Rendering First_page_img_1")}
                                    <First_page_img_1
                                        key={currentSlideIndex}
                                        user_name=
                                        {<div
                                            key={0}
                                            className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                            contentEditable={true}
                                            onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, 'h4')}
                                            style={h4Style}
                                            dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].element['userName'].content }}
                                        />
                                        }
                                        title={
                                            <div
                                                key={1}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                contentEditable={true}
                                                onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, 'h1')}
                                                style={h1Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].element['head'].content }}
                                            />
                                        }
                                        topic={<></>}
                                        subtopic={<></>}
                                        content={<></>}
                                        imgs={slides[currentSlideIndex].element['images'].content}
                                        update_callback={updateImgUrlArray(currentSlideIndex)}
                                    />
                                </>
                            )
                                : <>
                                    <Col_2_img_1
                                        key={currentSlideIndex}
                                        user_name={<></>}
                                        title={<></>}
                                        topic={
                                            <div
                                                key={0}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                contentEditable={true}
                                                onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, 'h2')}
                                                style={h2Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].element['title'].content }}
                                            />
                                        }
                                        subtopic={
                                            <div
                                                key={1}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                contentEditable={true}
                                                onBlur={(e) => {
                                                    handleSlideEdit(e.target.innerText, currentSlideIndex, 'h3')
                                                }}
                                                style={h3Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].element['subtopic'].content }}
                                            />
                                        }
                                        content={
                                            slides[currentSlideIndex].element['content'].content.map((content: string, index: number) => {
                                                if (content.includes('$$') || content.includes('\\(')) {
                                                    if (isEditMode) {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                                contentEditable={true}
                                                                style={listStyle}
                                                                onBlur={(e) => {
                                                                    const modifiedContent = [...slides[currentSlideIndex].element['content'].content];
                                                                    modifiedContent[index] = e.target.innerText;
                                                                    handleSlideEdit(modifiedContent, currentSlideIndex, slides[currentSlideIndex].element['content'].type);
                                                                }}
                                                            >
                                                                {content}
                                                            </div>
                                                        );
                                                    } else {
                                                        return (
                                                            <MathJaxContext key={index}>
                                                                <MathJax>
                                                                    <div onClick={toggleEditMode}
                                                                        className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
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
                                                        key={index}
                                                        className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                        contentEditable={true}
                                                        onBlur={(e) => {
                                                            const modifiedContent = [...slides[currentSlideIndex].element['content'].content];
                                                            modifiedContent[index] = e.target.innerText;
                                                            handleSlideEdit(modifiedContent, currentSlideIndex, slides[currentSlideIndex].element['content'].type);
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: wrapWithLiTags(content) }}
                                                    >
                                                    </div>
                                                );
                                            })
                                        }

                                        imgs={slides[currentSlideIndex].element['images'].content}
                                        update_callback={updateImgUrlArray(currentSlideIndex)}
                                    />
                                </>
                        )}
                    </div>
                )}
            </div>
            <div className='slide-nav mt-4 w-full grid grid-cols-3'>
                <div className='col-span-1'></div>
                <div className='col-span-1'>
                    <div className='w-fit h-fit flex flex-row items-center justify-center mx-auto rounded-full bg-slate-600/40'>
                        <button
                            disabled={currentSlideIndex === 0}
                            className='text-white text-2xl mx-4 my-1 disabled:text-gray-400'
                            onClick={() => goToSlide(currentSlideIndex - 1)}>&#9664;</button>
                        <div className='text-white'>
                            {currentSlideIndex + 1}<span className='font-light'>{' of '}</span>{slides.length}
                        </div>
                        <button
                            disabled={currentSlideIndex === slides.length - 1}
                            className='text-white text-2xl mx-4 my-1 disabled:text-gray-400'
                            onClick={() => goToSlide(currentSlideIndex + 1)}>&#9654;</button>
                    </div>
                </div>
                <div className='col-span-1 flex flex-row-reverse'>
                    <div className='w-fit h-fit rounded-full overflow-hidden'>
                        <button
                            className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
                            onClick={openModal}>Change Layout</button>
                    </div>
                    <Transition
                        className='h-[100vh] w-[100vw] z-10 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
                        show={showLayout}
                        onClick={closeModal}
                        enter="transition ease duration-300 transform"
                        enterFrom="opacity-0 translate-y-12"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease duration-300 transform"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-12"
                    >
                        <div className='grow md:grow-0'></div>
                        <Transition
                            className='bg-gray-100 w-full h-3/4 md:h-1/2
                    md:max-w-2xl z-20 rounded-t-xl md:rounded-xl drop-shadow-2xl 
                    overflow-hidden flex flex-col p-4'
                            show={showLayout}
                            enter="transition ease duration-500 transform delay-300"
                            enterFrom="opacity-0 translate-y-12"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease duration-300 transform"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-12"
                            onClick={e => { e.stopPropagation() }}
                        >
                            <h4 className="h4 text-blue-600 text-center">Select Layout</h4>
                            <div className='grow mt-4 flex flex-col overflow-hidden'>
                                <div className='w-full flex flex-row justify-between md:px-12'>
                                    Select the layout you want to use on current slide. Use a layout with images if you want to insert images.
                                </div>
                                <div className='mt-3 grow overflow-hidden md:px-12'>
                                    <div className='w-full h-full'>
                                        <div className='w-full h-full flex flex-col'>
                                            <div className='w-full h-full overflow-y-auto'>
                                                <div className='w-full h-fit grid grid-cols-2 gap-4 p-2'>
                                                    {templateSample.map((sample, index) => {
                                                        return <div className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-1 outline-black hover:outline-[#9AAEF6] hover:outline-4'>{sample}</div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="max-w-sm mx-auto">
                                <div className="flex flex-wrap -mx-3 mt-6">
                                    <div className="w-full px-3">
                                        <button
                                            className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full"
                                            type="button"
                                            onClick={e => { e.preventDefault(); closeModal(); }}>
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </Transition>
                </div>
            </div>
        </div>
    );
}
export default SlidesHTML;

