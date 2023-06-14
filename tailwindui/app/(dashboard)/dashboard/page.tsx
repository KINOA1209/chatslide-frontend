import React from 'react';

const projects = [
  { id: 1, name: 'Project 1', description: 'This is the first project.' },
  { id: 2, name: 'Project 2', description: 'This is the second project.' },
  { id: 3, name: 'Project 3', description: 'This is the third project.' },
];

export default function Dashboard() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 text-blue-500">User Dashboard</h1>
          </div>
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border-solid border-2 border-blue-500 p-4 rounded-md shadow-md"
              >
                <h2 className="text-lg font-semibold">{project.name}</h2>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
            <div className="flex justify-center items-center my-20">
              <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md">
                <span>Start New Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
