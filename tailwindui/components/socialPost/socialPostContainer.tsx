import React, { useRef } from 'react';
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import { templateDispatch as defaultTemplateDispatch } from '@/components/socialPost/socialPostTemplateDispatch';

type SlideContainerProps = {
    slides: SocialPostSlide[]; // You can replace 'any' with the actual type of the slides if known
    currentSlideIndex: number;
    isViewing?: boolean;
    isSnippet?: boolean;
    isPresenting?: boolean;
    scale?: number;
    templateDispatch?: (slide: SocialPostSlide, index: number, canEidt: boolean, exportToPdfMode: boolean) => JSX.Element; // Adjust the types accordingly
    containerRef?: React.RefObject<HTMLDivElement>;
    slideRef?: React.RefObject<HTMLDivElement>;
    exportToPdfMode?: boolean;
};

const SocialPostContainer: React.FC<SlideContainerProps> = ({
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
                boxShadow: (isPresenting) ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.5)',
                width: isPresenting ? '100vw' : `${540 * scale}px`,
                height: isPresenting ? '100vh' : `${720 * scale}px`,
            }}
        >
            {/* 0.75 width = 1 height */}
            {slides.length > 0 && (
                <div
                    className="slide h-full w-full"
                    ref={slideRef}
                    style={{
                        width: '540px',
                        height: '720px',
                        transformOrigin: 'center center',
                        transform: `scale(${scale})`,
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

export default SocialPostContainer;
