import React, { useRef } from 'react';
import { Slide } from '@/components/slides/NewSlidesHTML';
import { templateDispatch as defaultTemplateDispatch } from './templateDispatch';

type SlideContainerProps = {
    slides: Slide[]; // You can replace 'any' with the actual type of the slides if known
    currentSlideIndex: number;
    isViewing?: boolean;
    isPresenting?: boolean;
    scale?: number;
    templateDispatch?: (slide: Slide, index: number, canEidt: boolean, exportToPdfMode: boolean) => JSX.Element; // Adjust the types accordingly
    containerRef?: React.RefObject<HTMLDivElement>;
    slideRef?: React.RefObject<HTMLDivElement>;
    exportToPdfMode?: boolean;
};

const SlideContainer: React.FC<SlideContainerProps> = ({
    slides,
    currentSlideIndex,
    isViewing = false,
    isPresenting = false,
    scale = 1,
    templateDispatch = defaultTemplateDispatch,
    containerRef = useRef(null),
    slideRef = useRef(null),
    exportToPdfMode = false,
}) => {

    return (
        <div
            id="slideContainer"
            className={`${isPresenting ? 'fixed top-0 left-0 w-full h-full z-50' : ''}`}
            ref={containerRef}
            style={{
                boxSizing: 'border-box',
                border: 'none',
                boxShadow: isPresenting ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
        >
            {slides.length > 0 && (
                <div
                    className="slide h-full w-full"
                    ref={slideRef}
                    style={{
                        width: '960px',
                        height: '540px',
                        transformOrigin: isPresenting ? 'top left' : '',
                        transform: isPresenting ? `scale(${scale})` : 'scale(1)',
                        backgroundSize: 'cover',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        position: 'relative',
                    }}
                >
                    {slides[currentSlideIndex] &&
                        templateDispatch(slides[currentSlideIndex], currentSlideIndex, !isViewing && !isPresenting, exportToPdfMode)}
                </div>
            )}
        </div>
    );
};

export default SlideContainer;
