import React, { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import ReactQuill  from 'react-quill';



interface SlideElement {
    type: 'h1' | 'h2' | 'h3' | 'p' | 'ul'| 'li' | 'br';
    content: string | string[];
}

interface Slide {
    elements: SlideElement[];
}

type SlidesHTMLProps = {
    finalSlides: Slide[]; 
    setFinalSlides: React.Dispatch<React.SetStateAction<Slide[]>>; 
};

const SlidesHTML: React.FC<SlidesHTMLProps> = ({ finalSlides, setFinalSlides  }) => {
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
                    elements.push({ type: 'h1', content: sanitizeHtml(child.innerHTML) });
                } else if (child.tagName === 'H2') {
                    elements.push({ type: 'h2', content: sanitizeHtml(child.innerHTML) });
                } else if (child.tagName === 'H3') {
                    elements.push({ type: 'h3', content: sanitizeHtml(child.innerHTML) });
                } else if (child.tagName === 'P') {
                    elements.push({ type: 'p', content: sanitizeHtml(child.innerHTML) });
                } else if (child.tagName === 'UL') {
                    const liChildren = Array.from(child.children);
                    for (const liChild of liChildren) {
                        if (liChild.tagName === 'LI') {
                            elements.push({ type: 'li', content: sanitizeHtml(liChild.innerHTML) });
                        }
                    }
                }
            }
            return { elements };
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
            case 'p':
                currentSlide.elements[tagIndex].content = content;
                currNewFinalSlides.elements[tagIndex].content = `<p>${content}</p>`;
                break;
            case 'li':
                (currentSlide.elements[tagIndex].content as string[])[liIndex as number] = content;
                currNewFinalSlides.elements[tagIndex].content = `<li>${content}</li>`;
                break;
            default:
                console.error(`Unknown tag: ${tag}`);
        }
        setSlides(newSlides);
        setFinalSlides(newFinalSlides);
    }

    function goToSlide(index: number) {
        setCurrentSlideIndex(index);
    }

    const h1Style: React.CSSProperties = {
        fontSize: '3em',
        fontWeight: 'bold',
        color:'#3333cc',
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)'
    };    
    
    const h2Style: React.CSSProperties = {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginTop: '10px',
        color:'#3333cc'
    };

    const h3Style: React.CSSProperties = {
        fontSize: '1.2em', 
        fontWeight: 'bold',
    };
    
    const listStyle: React.CSSProperties = {
        listStyleType: 'disc', 
        paddingLeft: '2em', 
        marginBottom: '1em', 
    }
    

    return (
        <div id="slideContainer" style={{
            width: '800px',
            height: '600px',
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', 
            padding: '20px',
            boxSizing: 'border-box',
            border: 'none',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            position:'relative',
        }}>        
            <button style={{
                position: 'absolute',
                right: '70px',
                bottom: '10px',
                backgroundColor: 'rgba(128, 128, 128, 0.5)', 
                color: 'white', 
                width: '50px', 
                borderRadius: '5px',
            }} onClick={() => goToSlide(currentSlideIndex - 1)}>&#9664;</button>
            <button style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                backgroundColor: 'rgba(128, 128, 128, 0.5)', 
                color: 'white', 
                width: '50px',
                borderRadius: '5px',
            }} onClick={() => goToSlide(currentSlideIndex + 1)}>&#9654;</button>
            {slides.length > 0 && (
                <div className="slide" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    padding: '20px',
                    borderRadius: '10px',
                }}>
                    {slides[currentSlideIndex] && slides[currentSlideIndex].elements.map((element, i) => {
                        return (
                            <ReactQuill 
                                key={i} 
                                value={element.content as string} 
                                onBlur={(range, source, quill) => {
                                    handleSlideEdit(quill.getText(), currentSlideIndex, element.type, i)}}
                                modules={{  toolbar: false, 
                                            keyboard: { bindings: { } }}} 
                                
                                style={element.type === 'h1' ? h1Style : 
                                    element.type === 'h2' ? h2Style : 
                                    element.type === 'h3' ? h3Style : 
                                    listStyle}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );  
}
export default SlidesHTML;

