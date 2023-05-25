'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react';


export default function WorkflowStep2() {
  const [outline, setOutline] = useState('');

  useEffect(() => {
    const storedOutline = localStorage.getItem('outline');
    if (storedOutline) {
      const outline = JSON.parse(storedOutline);
      setOutline(outline.res);
    }
  }, []);

  const handleChange = (event) => {
    setOutline(event.target.value);
  }


  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Step 2: Generate Slides</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Outline <span className="text-red-600">*</span></label>
                  <textarea id="outline" type="text" className="form-input w-full text-gray-800 h-40" value={outline} onChange={handleChange} placeholder="Enter the outline" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Next</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
  