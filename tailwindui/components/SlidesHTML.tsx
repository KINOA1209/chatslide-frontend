import React, { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import ReactQuill from 'react-quill';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import backdrop from '@/public/images/backdrop.jpg';
import './slidesHTML.css';
import { First_page_img_1, Col_2_img_1 } from "@/components/slideTemplates";



interface SlideElement {
    type: 'h1' | 'h2' | 'h3' | 'h4'| 'p' | 'ul' | 'li' | 'br';
    className: 'head' | 'title' | 'subtopic' | 'content'|'userName';
    content: string | string[];
}

interface Slide {
    elements: SlideElement[];
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
        const newSlides = slideElements.map((slide) => {
            const elements: SlideElement[] = [];
            const slideChildren = Array.from(slide.children);
            for (const child of slideChildren) {
                if (child.tagName === 'H1') {
                    elements.push({ type: 'h1', content: sanitizeHtml(child.innerHTML), className: 'head' });
                } else if (child.tagName === 'H4') {
                    elements.push({ type: 'h4', content: sanitizeHtml(child.innerHTML), className: 'userName' });
                } else if (child.className === 'title') {
                    elements.push({ type: 'h2', content: sanitizeHtml(child.innerHTML), className: 'title' });
                } else if (child.className === 'subtopic') {
                    elements.push({ type: 'h3', content: sanitizeHtml(child.innerHTML), className: 'subtopic' });
                } else if (child.className === 'content') {
                    const listItems = Array.from(child.getElementsByTagName('li'));
                    for (const listItem of listItems) {
                        elements.push({ type: 'li', content: sanitizeHtml(listItem.innerHTML), className: 'content' });
                    }
                }
            }
            return { elements };
        });
        setFinalSlides(newSlides);
        setSlides(newSlides);
        console.log(newSlides)
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
            goToSlide(currentSlideIndex + 1);
        } else if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1);
        }
    }

    function handleSlideEdit(content: any, slideIndex: number, tag: string, tagIndex: number, liIndex?: number) {
        const newSlides = [...slides];
        const newFinalSlides = [...finalSlides];
        //handleSlideEdit(quill.getContents(), currentSlideIndex, element.type, i)}  

        const currNewFinalSlides = newFinalSlides[slideIndex];
        const currentSlide = newSlides[slideIndex];

        switch (tag) {
            case 'h1':
                currentSlide.elements[tagIndex].content = content;
                currNewFinalSlides.elements[tagIndex].content = `<h1>${content}</h1>`;
                break;
            case 'h2':
                currentSlide.elements[tagIndex].content = content;
                currNewFinalSlides.elements[tagIndex].content = `<h2>${content}</h2>`;
                break;
            case 'h3':
                currentSlide.elements[tagIndex].content = content;
                currNewFinalSlides.elements[tagIndex].content = `<h3>${content}</h3>`;
                break;
            case 'h4':
                currentSlide.elements[tagIndex].content = content;
                currNewFinalSlides.elements[tagIndex].content = `<h4>${content}</h4>`;
                break;
            case 'p':
                currentSlide.elements[tagIndex].content = content;
                currNewFinalSlides.elements[tagIndex].content = `<p>${content}</p>`;
                break;
            case 'li':
                currentSlide.elements[tagIndex].content = content;
                currNewFinalSlides.elements[tagIndex].content = content; //need to check here
                break;
            default:
                console.error(`Unknown tag: ${tag}`);
        }
        setSlides(newSlides);
        setFinalSlides(newFinalSlides);
        console.log(newSlides)
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
                                                onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, slides[currentSlideIndex].elements[1].type, 1)}
                                                style={h4Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].elements[1].content as string }}
                                                />
                                            }
                                        title={
                                            <div
                                                key={1}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                contentEditable={true}
                                                onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, slides[currentSlideIndex].elements[0].type, 0)}
                                                style={h1Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].elements[0].content as string }}
                                            />
                                        }
                                        topic={<></>}
                                        subtopic={<></>}
                                        content={<></>}
                                        imgs={[backdrop.src]}
                                        update_callback={() => { }}
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
                                                onBlur={(e) => handleSlideEdit(e.target.innerText, currentSlideIndex, slides[currentSlideIndex].elements[0].type, 0)}
                                                style={h2Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].elements[0].content as string }}
                                            />
                                        }
                                        subtopic={
                                            <div
                                                key={1}
                                                className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                contentEditable={true}
                                                onBlur={(e) => {
                                                    handleSlideEdit(e.target.innerText, currentSlideIndex, slides[currentSlideIndex].elements[1].type, 1)
                                                }}
                                                style={h3Style}
                                                dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].elements[1].content as string }}
                                            />
                                        }
                                        content={
                                            <>
                                                {slides[currentSlideIndex].elements.slice(2).map((el, index) => {
                                                    const content = el.content as string;

                                                    if (content.includes('$$') || content.includes('\\(')) {
                                                        if (isEditMode) {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                                                    contentEditable={true}
                                                                    style = {listStyle}
                                                                    onBlur={(e) => {
                                                                        handleSlideEdit(e.target.innerText, currentSlideIndex, el.type, index + 2);
                                                                        toggleEditMode();
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
                                                                            style = {listStyle}>
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
                                                            onBlur={(e) =>
                                                                handleSlideEdit(e.target.innerText, currentSlideIndex, el.type, index + 2)}
                                                            dangerouslySetInnerHTML={{ __html: wrapWithLiTags(content) }}
                                                        >
                                                        </div>
                                                    );
                                                })}
                                            </>
                                        }
                                        imgs={[backdrop.src]}
                                        update_callback={() => { }}
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

