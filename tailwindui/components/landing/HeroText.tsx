'use client'

import React, { useState, useEffect } from 'react';

interface Props {
  slides: string[];
  interval?: number; // Time interval for automatic slide change in milliseconds
  color?: string;
  alignment?: string;
}

export const TextCarousel: React.FC<Props> = ({ slides, interval = 3000, color = "text-blue-500", alignment = "left" }) => {
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
            <h1 className={`text-5xl font-extrabold leading-tighter tracking-tighter text-${alignment} ${color} font-creato-medium `}>{slide}</h1>
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
      <div className="flex flex-col md:flex-row items-end space-x-4">
        {/* <TextCarousel slides={["Documents", "Youtube", "Webpage", "Notion"]} interval={3000} color="text-blue-700" alignment='right'/> */}
        <h1 className="text-5xl font-extrabold leading-tighter tracking-tighte font-creato-medium mb-0.5">Documents to</h1>
        <TextCarousel slides={["Slides", "Social Posts", "Video"]} interval={3000} color="text-blue-700" />
      </div>
    </div>
  )
}

export default HeroText;
