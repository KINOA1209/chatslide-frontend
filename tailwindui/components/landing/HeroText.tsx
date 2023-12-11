import React, { useState, useEffect } from 'react';
import TextCarousel from './TextCarousel';

const HeroText = () => {

  return (
    <div className={`flex flex-col items-center transition-opacity duration-1000`}>
      <div className="flex flex-col md:flex-row items-end space-x-4">
        {/* <TextCarousel slides={["Documents", "Youtube", "Webpage", "Notion"]} interval={3000} color="text-blue-700" alignment='right'/> */}
        <h1 className="text-5xl font-extrabold leading-tighter tracking-tighte font-creato-medium mb-0.5">Documents to</h1>
        <TextCarousel slides={["Slides", "Social Posts", "Video"]} interval={3000} color="text-blue-700" />
      </div>
    </div>
  )
}

export default HeroText;
