import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sanitizeHtml from 'sanitize-html';
import ReactQuill from 'react-quill';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import backdrop from '@/public/images/backdrop.jpg';
import './slidesHTML.css';

import { Transition } from '@headlessui/react';
import templates, { templateSamples } from "@/components/slideTemplates";
import ClickableLink from './ui/ClickableLink';
import AuthService from './utils/AuthService';

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
    isSharing?: boolean;
};


// it will render the slides fetched from `foldername` in sessionStorage
const SlidesHTML: React.FC<SlidesHTMLProps> = ({ finalSlides, setFinalSlides, isSharing = false }) => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    const foldername = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('foldername') : '';
    const [showLayout, setShowLayout] = useState(false);
    const [present, setPresent] = useState(false);
    const [share, setShare] = useState(false);
    const slideRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [host, setHost] = useState('https://drlambda.ai');

    const [unsavedChanges, setUnsavedChanges] = useState(false);

    useEffect(() => {
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            setHost('https://' + window.location.hostname);
        } else {
            setHost(window.location.hostname);
        }
    }, [])

    useEffect(() => {
        setShare(sessionStorage.getItem('is_shared') === 'true');
        // console.log('share', sessionStorage.getItem('is_shared'));
    }, []);

    // Watch for changes in finalSlides
    useEffect(() => {
        setUnsavedChanges(true);

        // Set a timer to auto-save after 0.01 second if no more changes occur
        const saveTimer = setTimeout(() => {
            if (unsavedChanges) {
                autoSaveSlides();
            }
        }, 10);

        // Clear the timer if finalSlides changes before the timer expires
        return () => clearTimeout(saveTimer);
    }, [finalSlides]);

    // Function to send a request to auto-save finalSlides
    const autoSaveSlides = () => {

        const formData = {
            foldername: foldername,
            html: finalSlides,
        };
        // Send a POST request to the backend to save finalSlides
        fetch('/api/auto_save_html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    setUnsavedChanges(false);
                } else {
                    // Handle save error
                    console.error('Auto-save failed.');
                }
            })
            .catch((error) => {
                // Handle network error
                console.error('Auto-save failed:', error);
            });
    };

    const openModal = () => {
        setShowLayout(true);
    }

    const openPresent = () => {
        toast.success("Use ESC to exit presentation mode, use arrow keys to navigate slides.");
        setPresent(true);
    }

    const toggleShare = async () => {
        const newShareStatus = !share;
        // console.log('newShareStatus', newShareStatus);
        setShare(newShareStatus);
        const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
        try {
            const response = await fetch("/api/share_project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    project_id: sessionStorage.getItem('project_id'), // Replace with your project's ID
                    is_shared: newShareStatus,
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                sessionStorage.setItem('is_shared', newShareStatus.toString());
            } else {
                // Handle error (e.g., show a notification to the user)
                console.error(responseData.error);
            }
        } catch (error) {
            console.error("Failed to toggle share status:", error);
            // Handle error (e.g., show a notification to the user)
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape') {
                setPresent(false); // Exit presentation mode
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array to ensure this effect runs only once (similar to componentDidMount)


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
        const newSlides: Slide[] = slideElements.map((slide, index) => {
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
                } else if (className === 'template') {
                    elements.template = sanitizeHtml(child.innerHTML);
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

            if (elements.template === '') {
                if (index === 0) {
                    elements.template = 'First_page_img_1'
                } else {
                    elements.template = 'Col_1_img_0';
                }
            }
            return elements;
        });
        setFinalSlides(newSlides);
        setSlides(newSlides);
    }


    function handleKeyDown(event: KeyboardEvent) {
        if (!isEditMode) {
            if (event.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
                goToSlide(currentSlideIndex + 1);
            } else if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
                goToSlide(currentSlideIndex - 1);
            }
        }
    }


    const updateTemplate = (e: React.MouseEvent<HTMLDivElement>, templateName: string, slideIndex: number) => {
        e.preventDefault();
        handleSlideEdit(templateName, slideIndex, 'template');
    }


    function handleSlideEdit(content: string | string[], slideIndex: number, tag: SlideKeys) {
        setIsEditMode(false);
        const newSlides = [...slides];
        const newFinalSlides = [...finalSlides];

        const currentSlide = newSlides[slideIndex];
        const currNewFinalSlides = newFinalSlides[slideIndex];
        const className = tag;

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
        } else if (className === 'template') {
            currentSlide.template = (content as string);
            currNewFinalSlides.template = (content as string);
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

    function goToSlide(index: number) {
        setCurrentSlideIndex(index);
    }

    // title
    const h1Style: React.CSSProperties = {
        fontSize: '30pt',
        fontWeight: 'bold',
        color: '#2563EB',
    };

    // topic
    const h2Style: React.CSSProperties = {
        fontSize: '15pt',
        fontWeight: 'bold',
        marginTop: '10px',
        color: '#2563EB'
    };

    // subtopic
    const h3Style: React.CSSProperties = {
        fontSize: '20pt',
        fontWeight: 'bold',
    };

    // content
    const h4Style: React.CSSProperties = {
        fontSize: '20pt',
        color: 'rgb(180,180,180)',
    };


    const listStyle: React.CSSProperties = {
        display: 'list-item',
        listStyleType: 'disc',
        listStylePosition: 'inside',
        fontSize: '20pt',
    }
    function wrapWithLiTags(content: string): string {
        if (!content.includes("<li>") || !content.includes("</li>")) {
            return `<li style="font-size: 18pt;">${content}</li>`;
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

    // useEffect(() => {
    //     console.log(`present: ${present}`);
    //     const resizeSlide = () => {
    //         if (containerRef.current && slideRef.current) {
    //             let scale = 1;
    //             const viewWidth = window.innerWidth;
    //             if (viewWidth < 976) {
    //                 scale = (viewWidth - 80) / 960;
    //                 containerRef.current.style.height = present ? '100%' : `${540 * scale}px`;
    //                 containerRef.current.style.width = present ? '100%' : `${960 * scale}px`;
    //                 slideRef.current.style.transform = `scale(${scale})`;
    //                 slideRef.current.style.left = `-${960 * (1 - scale) / 2}px`;
    //                 slideRef.current.style.top = `-${540 * (1 - scale) / 2}px`;
    //             } else {
    //                 containerRef.current.style.height = present ? '100%' : '540px',
    //                 containerRef.current.style.width = present ? '100%' : '960px',
    //                 slideRef.current.style.transform = `scale(1)`;
    //                 slideRef.current.style.left = '';
    //                 slideRef.current.style.top = '';
    //             }
    //         }
    //     }
    //     window.addEventListener('resize', resizeSlide);
    //     resizeSlide();
    // }, [containerRef, slideRef]);


    const templateDispatch = (slide: Slide, index: number, canEdit: boolean): JSX.Element => {
        const Template = templates[slide.template as keyof typeof templates];
        if (index === 0) {
            return <Template
                key={index}
                user_name=
                {<div
                    key={0}
                    className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                    contentEditable={canEdit}
                    onFocus={() => {
                        if (canEdit) {
                            setIsEditMode(true);
                        }
                    }}
                    onBlur={(e) =>
                        handleSlideEdit(e.target.innerText, index, 'userName')}
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
                                setIsEditMode(true);
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
        } else {
            return <Template
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
                                setIsEditMode(true);
                            }
                        }}
                        onBlur={(e) => handleSlideEdit(e.target.innerText, index, 'title')}
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
                                setIsEditMode(true);
                            }
                        }}
                        onBlur={(e) => {
                            handleSlideEdit(e.target.innerText, index, 'subtopic')
                        }}
                        style={h3Style}
                        dangerouslySetInnerHTML={{ __html: slide.subtopic }}
                    />
                }
                content={
                    slide.content.map((content: string, index: number) => {
                        if (content.includes('$$') || content.includes('\\(')) {
                            if (isEditMode) {
                                return (
                                    <div
                                        key={index}
                                        className='hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline outline-2 rounded-md overflow-hidden'
                                        contentEditable={canEdit}
                                        style={listStyle}
                                        onFocus={() => {
                                            if (canEdit) {
                                                setIsEditMode(true);
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const modifiedContent = [...slide.content];
                                            modifiedContent[index] = e.target.innerText;
                                            handleSlideEdit(modifiedContent, index, 'content');
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
                                contentEditable={canEdit}
                                onFocus={() => {
                                    if (canEdit) {
                                        setIsEditMode(true);
                                    }
                                }}
                                onBlur={(e) => {
                                    const modifiedContent = [...slide.content];
                                    modifiedContent[index] = e.target.innerText;
                                    handleSlideEdit(modifiedContent, index, 'content');
                                }}
                                dangerouslySetInnerHTML={{ __html: wrapWithLiTags(content) }}
                            >
                            </div>
                        );
                    })
                }

                imgs={(slide.images) as string[]}
                update_callback={updateImgUrlArray(index)}
            />
        }
    }


    return (
        <div className='w-fit h-fit'>
            <div className='flex justify-between items-center mb-6'>
                <div className='col-span-1'>
                    <div className='w-fit h-fit rounded-full overflow-hidden'>
                        <button
                            className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
                            onClick={openPresent}>Present</button>
                    </div>
                </div>
                {!isSharing && <div className='col-span-1'>
                    <div className='w-fit h-fit rounded-full overflow-hidden'>
                        <button
                            className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
                            onClick={toggleShare}>{!share ? 'Share' : 'Stop Sharing'}</button>
                    </div>
                </div>}
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
                {!isSharing && <div className='col-span-1 flex flex-row-reverse'>
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
                            <h4 className="font-semibold text-xl text-center">Page Layout</h4>
                            <div className='w-full text-center mb-3'>
                                Change layout of current page
                            </div>
                            <div className='grow flex flex-col overflow-hidden'>
                                <div className='mt-2 mb-5 grow overflow-hidden'>
                                    <div className='w-full h-full'>
                                        <div className='w-full h-full flex flex-col'>
                                            <div className='w-full h-full overflow-y-auto'>
                                                <div className='w-full h-fit grid grid-cols-2 gap-4 p-2'>
                                                    {currentSlideIndex === 0 ?
                                                        templateSamples.cover.map((temp, index) => {
                                                            if (!slides[currentSlideIndex]) {
                                                                return <></>
                                                            }
                                                            if (temp.name !== slides[currentSlideIndex].template) {
                                                                return <div onClick={e => updateTemplate(e, temp.name, currentSlideIndex)} className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-[3px] outline-slate-300 hover:outline-[#5168F6]'>
                                                                    <img src={temp.img} className='w-full h-full object-contain' />
                                                                </div>
                                                            } else {
                                                                return <div onClick={e => updateTemplate(e, temp.name, currentSlideIndex)} className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-[#5168F6] outline-[3px]'>
                                                                    <img src={temp.img} className='w-full h-full object-contain' />
                                                                </div>
                                                            }
                                                        })
                                                        :
                                                        templateSamples.main.map((temp, index) => {
                                                            if (temp.name !== slides[currentSlideIndex].template) {
                                                                return <div onClick={e => updateTemplate(e, temp.name, currentSlideIndex)} className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-[3px] outline-slate-300 hover:outline-[#5168F6]'>
                                                                    <img src={temp.img} className='w-full h-full object-contain' />
                                                                </div>
                                                            } else {
                                                                return <div onClick={e => updateTemplate(e, temp.name, currentSlideIndex)} className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-[#5168F6] outline-[3px]'>
                                                                    <img src={temp.img} className='w-full h-full object-contain' />
                                                                </div>
                                                            }
                                                        })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="w-full mx-auto">
                                <div className="w-full flex flex-wrap">
                                    <div className="w-full">
                                        <button
                                            // className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full rounded-lg"
                                            type="button"
                                            onClick={e => { e.preventDefault(); closeModal(); }}>
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </Transition>
                </div>}
            </div>
            {share &&
                <ClickableLink link={`${host}/shared/${sessionStorage.getItem('project_id')}`} />
            }
            <div
                id="slideContainer"
                className={`overflow-hidden ${present ? 'fixed top-0 left-0 w-full h-screen z-50' : ''}`}
                ref={containerRef}
                style={{
                    boxSizing: 'border-box',
                    border: 'none',
                    boxShadow: present ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
            >
                {slides.length > 0 && (
                    <div
                        className="slide h-full w-full"
                        ref={slideRef}
                        style={{
                            width: present ? '100%' : '960px',
                            height: present ? '100%' : '540px',
                            backgroundSize: 'cover',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            position: 'relative',
                        }}
                    >
                        <ToastContainer />
                        {slides[currentSlideIndex] && templateDispatch(slides[currentSlideIndex],
                            currentSlideIndex,
                            !isSharing && !present)}
                    </div>
                )}
            </div>

        </div>
    );
}
export default SlidesHTML;

