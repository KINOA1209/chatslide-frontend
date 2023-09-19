import React, { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import ReactQuill from 'react-quill';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import backdrop from '@/public/images/backdrop.jpg';
import './slidesHTML.css';
import {
    First_page_img_1,
    Col_2_img_1,
    Col_1_img_0,
    Col_2_img_2,
} from "@/components/slideTemplates";



export interface SlideElement {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div';
    className: 'head' | 'title' | 'subtopic' | 'content' | 'userName' | 'images';
    content: string | string[];
}

type SlideKeys = 'head' | 'title' | 'subtopic' | 'userName' | 'template' | 'content' | 'images';

export class Slide {

    head: string;
    title: string;
    subtopic: string;
    userName: string;
    template: string;
    content: string[];
    images: string[];

    constructor() {
        this.head = '';
        this.title = '';
        this.subtopic = '';
        this.userName = '';
        this.template = '';
        this.content = [];
        this.images = [];
    }

}

type SlidesHTMLProps = {
    finalSlides: Slide[];
    setFinalSlides: Function;
};

const SlidesHTML: React.FC<SlidesHTMLProps> = ({ finalSlides, setFinalSlides }) => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    const foldername = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('foldername') : '';

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
            const elements = new Slide();
            const slideChildren = Array.from(slide.children);
            for (const child of slideChildren) {
                let className = child.className;
                if (className === 'head') {
                    elements.head = sanitizeHtml(child.innerHTML);
                } else if (className === 'title') {
                    elements.title = sanitizeHtml(child.innerHTML);
                } else if (className === 'userName') {
                    elements.userName = sanitizeHtml(child.innerHTML);
                } else if (className === 'subtopic') {
                    elements.subtopic = sanitizeHtml(child.innerHTML);
                } else if (className === 'content') {
                    const listItems = Array.from(child.getElementsByTagName('li'));
                    elements.content = listItems.map(li => sanitizeHtml(li.innerHTML));
                } else if (child.className === 'images') {
                    const listItems = Array.from(child.getElementsByTagName('img'));
                    let urls = listItems.map((img) => {
                        const src = img.getAttribute('src');
                        if (src) {
                            return src;
                        } else {
                            return '';
                        }
                    })
                    elements.images = urls;
                }
            }
            return elements;
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

    function handleSlideEdit(content: string | string[], slideIndex: number, tag: SlideKeys) {
        const newSlides = [...slides];
        const newFinalSlides = [...finalSlides];

        const currentSlide = newSlides[slideIndex];
        const currNewFinalSlides = newFinalSlides[slideIndex];
        const className = tag;
        // getClassnameByTag(tag);

        // if (['head','title','subtopic', 'userName'].includes(className)) {
        //     currentSlide.tag = (content as string);
        //     currNewFinalSlides[className] = (content as string);
        //     setSlides(newSlides);
        //     setFinalSlides(newFinalSlides);


        if (className === 'head') {
            currentSlide.head = (content as string);
            currNewFinalSlides.head = (content as string);
        } else if (className === 'title') {
            currentSlide.title = (content as string);
            currNewFinalSlides.title = (content as string);
        } else if (className === 'subtopic') {
            currentSlide.subtopic = (content as string);
            currNewFinalSlides.subtopic = (content as string);
        } else if (className === 'userName') {
            currentSlide.userName = (content as string);
            currNewFinalSlides.userName = (content as string);
        } else if (className === 'images') {
            currentSlide.images = (content as string[]);
            currNewFinalSlides.images = (content as string[]);
        } else if (className === 'content') {
            currentSlide.content = (content as string[]);
            currNewFinalSlides.content = (content as string[]);
        } else {
            console.error(`Unknown tag: ${tag}`);
        }
        setSlides(newSlides);
        setFinalSlides(newFinalSlides);
    }

    // function getClassnameByTag(tag: string): string | undefined {
    //     switch (tag) {
    //         case 'h1':
    //             return 'head';
    //         case 'h2':
    //             return 'title';
    //         case 'h3':
    //             return 'subtopic';
    //         case 'h4':
    //             return 'userName';
    //         case 'p':
    //             return 'paragraph';
    //         case 'li':
    //             return 'content';
    //         case 'img':
    //             return 'images';
    //         default:
    //             return undefined;
    //     }
    // }


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
            handleSlideEdit(urls, slideIndex, 'images');
        };
        return updateImgUrl;
    }

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
                                    <First_page_img_1
                                        key={currentSlideIndex}
                                        user_name=
                                        {<div
                                            key={0}
                                            className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                            contentEditable={true}
                                            onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, 'userName')}
                                            style={h4Style}
                                            dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].userName }}
                                        />
                                        }
                                        title={
                                            <div
                                                key={1}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                contentEditable={true}
                                                onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, 'head')}
                                                style={h1Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].head }}
                                            />
                                        }
                                        topic={<></>}
                                        subtopic={<></>}
                                        content={[<></>]}
                                        imgs={slides[currentSlideIndex].images}
                                        update_callback={updateImgUrlArray(currentSlideIndex)}
                                    />
                                </>
                            )
                                : <>
                                    <Col_2_img_2
                                        key={currentSlideIndex}
                                        user_name={<></>}
                                        title={<></>}
                                        topic={
                                            <div
                                                key={0}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                contentEditable={true}
                                                onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, 'title')}
                                                style={h2Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].title }}
                                            />
                                        }
                                        subtopic={
                                            <div
                                                key={1}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                contentEditable={true}
                                                onBlur={(e) => {
                                                    handleSlideEdit(e.target.innerText, currentSlideIndex, 'subtopic')
                                                }}
                                                style={h3Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].subtopic }}
                                            />
                                        }
                                        content={
                                            slides[currentSlideIndex].content.map((content: string, index: number) => {
                                                if (content.includes('$$') || content.includes('\\(')) {
                                                    if (isEditMode) {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                                contentEditable={true}
                                                                style={listStyle}
                                                                onBlur={(e) => {
                                                                    const modifiedContent = [...slides[currentSlideIndex].content];
                                                                    modifiedContent[index] = e.target.innerText;
                                                                    handleSlideEdit(modifiedContent, currentSlideIndex, 'content');
                                                                }}
                                                            >
                                                                {content}
                                                            </div>
                                                        );
                                                    }
                                                    else {
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
                                                            const modifiedContent = [...slides[currentSlideIndex].content];
                                                            modifiedContent[index] = e.target.innerText;
                                                            handleSlideEdit(modifiedContent, currentSlideIndex, 'content');
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: wrapWithLiTags(content) }}
                                                    >
                                                    </div>
                                                );
                                            })
                                        }

                                        imgs={(slides[currentSlideIndex].images) as string[]}
                                        update_callback={updateImgUrlArray(currentSlideIndex)}
                                    />
                                </>
                        )}
                    </div>
                )}
            </div>
            <div className='slide-nav mt-4 w-full'>
                <div className='w-fit h-fit bg-green-500 flex flex-row items-center justify-center mx-auto rounded-full bg-slate-600/40'>
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
        </div>
    );
}
export default SlidesHTML;

