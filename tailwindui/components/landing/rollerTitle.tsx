import React, { useState, useEffect } from 'react';

const RollerTitle: React.FC = () => {
    const listA = ["Script", "Slides", "Audio", "Video"];
    const listB = ["Words", "PDF", "Youtube"];

    const [currentIndexA, setCurrentIndexA] = useState(0);
    const [currentIndexB, setCurrentIndexB] = useState(0);

    useEffect(() => {
        const intervalA = setInterval(() => {
            setCurrentIndexA((prevIndex) => (prevIndex + 1) % listA.length);
        }, 3000); // Change every 3 second for list A

        const intervalB = setInterval(() => {
            setCurrentIndexB((prevIndex) => (prevIndex + 1) % listB.length);
        }, 3000); // Change every 3 seconds for list B

        // Cleanup intervals on component unmount
        return () => {
            clearInterval(intervalA);
            clearInterval(intervalB);
        };
    }, []);

    return (
        <>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Create {listA[currentIndexA]} with {listB[currentIndexB]}</h1>
        </>
    );
};

export default RollerTitle;
