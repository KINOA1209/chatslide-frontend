import React, { useState, useEffect } from 'react';

interface Props {
    slides: string[];
    interval?: number; // Time interval for automatic slide change in milliseconds
    color?: string;
}

const TextCarousel: React.FC<Props> = ({ slides, interval = 3000, color = "text-blue-500" }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= slides.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const slideTimer = setTimeout(nextSlide, interval);

        // Cleanup the timer when the component is unmounted or before re-running the effect
        return () => {
            clearTimeout(slideTimer);
        };
    }, [currentIndex]);

    return (
        <div className="carousel-container relative overflow-hidden h-[4rem] max-w-xl mx-auto">
            <ul className="carousel-list flex flex-col transition-transform duration-500" style={{ transform: `translateY(-${currentIndex * 4}rem)` }}>
                {slides.map((slide, index) => (
                    <li key={index} className="carousel-item h-[4rem] text-center py-1 flex-none">
                         <h1 className={`text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter text-left ${color}`}>{slide}</h1>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const HeroText = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`flex flex-col items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-end space-x-4">
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-1">Create</h1>
                <TextCarousel slides={["Slides", "Script", "Audio", "Video"]} interval={3000} color="text-blue-500"/>
            </div>
            <div className="flex items-end space-x-4">
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-1">with</h1>
                <TextCarousel slides={["PDF", "Youtube", "Prompt"]} interval={3000} color="text-teal-800"/>
            </div>
            <div className="flex items-end space-x-4">
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-1">without</h1>
                <TextCarousel slides={["Hardwork", "Confusion"]} interval={5000} color="text-amber-800"/>
            </div>
        </div>
    )
}

export default HeroText;
