"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const projects = [
  { id: 1, name: 'Project 1', description: 'This is the first project.' },
  { id: 2, name: 'Project 2', description: 'This is the second project.' },
  { id: 3, name: 'Project 3', description: 'This is the third project.' },
  { id: 4, name: 'Project 4', description: 'This is the fourth project.' },
  { id: 5, name: 'Project 5', description: 'This is the fifth project.' },
  { id: 6, name: 'Project 6', description: 'This is the sixth project.' },
  // Add more projects if needed
];

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 text-blue-600">User Dashboard</h1>
          </div>
          <div className="flex flex-col gap-4">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                className="border-solid border-2 border-blue-600 p-4 rounded-md shadow-md"
              >
                <h2 className="text-lg font-semibold">{project.name}</h2>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md mr-2 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              style={{ minWidth: '120px' }}
            >
              Previous
            </button>
            <button
              className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              style={{ minWidth: '120px' }}
            >
              Next
            </button>
          </div>
          <div className="flex justify-center items-center mt-8">
            <Link href="/workflow-create-project">
              <span className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-md cursor-pointer">
                Start New Project
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
