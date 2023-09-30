import React, { useState, useEffect } from 'react';

const RollerTitle: React.FC = () => {
    const listA = ["Script", "Slides", "Video"];
    const listB = ["Words", "PDF", "Youtube"];

    const [currentIndexA, setCurrentIndexA] = useState(0);
    const [currentIndexB, setCurrentIndexB] = useState(0);

    useEffect(() => {
        const intervalA = setInterval(() => {
            setCurrentIndexA((prevIndex) => (prevIndex + 1) % listA.length);
        }, 1000); // Change every 1 second for list A

        const intervalB = setInterval(() => {
            setCurrentIndexB((prevIndex) => (prevIndex + 1) % listB.length);
        }, 1500); // Change every 1.5 seconds for list B

        // Cleanup intervals on component unmount
        return () => {
            clearInterval(intervalA);
            clearInterval(intervalB);
        };
    }, []);

    return (
        <div>
            Create 
            <div style={{ transform: "translate(0px, -40px)", opacity: 5, visibility: "hidden" }}>
                {listA[currentIndexA]}
            </div>
            with 
            <div style={{ transform: "translate(0px, -40px)", opacity: 5, visibility: "hidden" }}>
                {listB[currentIndexB]}
            </div>
        </div>
    );
};

export default RollerTitle;
