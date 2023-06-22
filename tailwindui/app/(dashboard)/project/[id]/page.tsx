'use client'

import React from 'react';

const project = {
  name: 'Project Name',
  description: 'Project Description',
  requirement: 'Project Requirement',
  audience: 'Project Audience',
  language: 'Project Language',
};

const ProjectDetail = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <p className="text-gray-600 mb-2">
                <strong>Requirement:</strong> {project.requirement}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Audience:</strong> {project.audience}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Language:</strong> {project.language}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default ProjectDetail;