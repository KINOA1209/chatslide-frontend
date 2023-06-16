"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleProjectNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };
  const handleProjectDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setProjectDescription(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform submission logic here
    console.log('Project Name:', projectName);
    console.log('Project Description:', projectDescription);
  };

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Create new project</h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
            <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="projectName" className="block font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="mt-1 focus:ring-blue-600 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="projectDescription" className="block font-medium text-gray-700">
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  className="mt-1 focus:ring-blue-600 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={projectDescription}
                  onChange={handleProjectDescriptionChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Create Project
              </button>
            </form>
          </div>
            </div>

            </div>
          </div>
        </section>
    )
}