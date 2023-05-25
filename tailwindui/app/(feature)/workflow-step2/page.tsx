'use client'

import React, { useState, useEffect } from 'react';

const OutlineVisualizer = ({ outline }) => {
  console.log(outline);
  const [outlineData, setOutlineData] = useState(outline);

  console.log(outlineData);

  const handleChange = (e, sectionIndex, key) => {
    const { value } = e.target;
    console.log(e, sectionIndex, key, value);
//     setOutlineData((prevOutlineData) => ({
//       ...prevOutlineData,
//       [sectionIndex]: {
//         ...prevOutlineData[sectionIndex],
//         [key]: value,
//       },
//     }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {Object.keys(outlineData).map((sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h3 className="text-xl font-bold">
            Section {parseInt(sectionIndex)}: {outlineData[sectionIndex].title}
          </h3>
          <div className="mt-4">
            {outlineData[sectionIndex].details.map((detail, detailIndex) => (
              <input
                key={detailIndex}
                className="form-input w-full text-gray-800 mb-2"
                value={detail}
                onChange={(e) => handleChange(e, sectionIndex, 'details')}
                placeholder={`Detail ${detailIndex}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
    const storedOutline = localStorage.getItem('outline');
const outline = JSON.parse(storedOutline);
const outlineRes = JSON.parse(outline.res)

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <OutlineVisualizer outline={outlineRes} />
    </div>
  );
};

export default App;
