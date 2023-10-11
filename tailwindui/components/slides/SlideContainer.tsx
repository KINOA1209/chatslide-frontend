import React, { useRef } from 'react';

type SlideContainerProps = {
    present: boolean;
    slides: any[]; // You can replace 'any' with the actual type of the slides if known
    currentSlideIndex: number;
    viewingMode: boolean;
    scale: number;
    templateDispatch: (slide: any, index: number, condition: boolean) => JSX.Element; // Adjust the types accordingly
};

const SlideContainer: React.FC<SlideContainerProps> = ({
    present,
    slides,
    currentSlideIndex,
    viewingMode,
    scale,
    templateDispatch,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);

    return (
        <div
            id="slideContainer"
            className={`${present ? 'fixed top-0 left-0 w-full h-full z-50' : ''}`}
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
                        transformOrigin: present ? 'top left' : '',
                        transform: present ? `scale(${scale})` : 'scale(1)',
                        backgroundSize: 'cover',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        position: 'relative',
                    }}
                >
                    {slides[currentSlideIndex] &&
                        templateDispatch(slides[currentSlideIndex], currentSlideIndex, !viewingMode && !present)}
                </div>
            )}
        </div>
    );
};

export default SlideContainer;
