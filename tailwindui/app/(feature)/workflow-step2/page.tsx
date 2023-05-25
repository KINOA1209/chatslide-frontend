'use client'

import React, {useState, useEffect} from 'react';
import OutlineFrom from '@/components/outline-form'

const OutlineVisualizer = ({outline}: { outline: any }) => {
    console.log(outline);
    const [outlineData, setOutlineData] = useState(outline);

    console.log(outlineData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, sectionIndex: string, detailIndex: number, key: string) => {
        const {value} = e.target;
        setOutlineData((prevOutlineData: any) => {
            const updatedOutlineData = JSON.parse(JSON.stringify(prevOutlineData));
            updatedOutlineData[sectionIndex]['details'][detailIndex] = value;
            return updatedOutlineData;
        });
    };

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="max-w-3xl mx-auto mt-8">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">Step 2: Edit Outline</h1>
                    </div>
                    {outlineData && Object.keys(outlineData).map((sectionIndex) => (
                        <div key={sectionIndex} className="mb-8">
                            <h3 className="text-xl font-bold">
                                Section {parseInt(sectionIndex)}: {outlineData[sectionIndex].title}
                            </h3>
                            <div className="mt-4">
                                {outlineData[sectionIndex].details.map((detail: any, detailIndex: number) => (
                                    <input
                                        key={detailIndex}
                                        className="form-input w-full text-gray-800 mb-2"
                                        value={detail}
                                        onChange={(e) => handleChange(e, sectionIndex, detailIndex, 'details')}
                                        placeholder={`Detail ${detailIndex}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}


                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        <form>
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Generate
                                        Slides
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const App = () => {
    const storedOutline = typeof localStorage !== 'undefined' ? localStorage.getItem('outline') : null;
    const outline = storedOutline ? JSON.parse(storedOutline) : null;
    const outlineRes = outline ? JSON.parse(outline.res) : null;

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <OutlineVisualizer outline={outlineRes}/>
        </div>
    );
};

export default App;
