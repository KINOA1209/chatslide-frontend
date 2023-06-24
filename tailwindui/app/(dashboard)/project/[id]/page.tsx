'use client'

import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../../../components/Firebase';
import { usePathname } from 'next/navigation';

interface Project {
  project_name: string;
  project_description: string;
  topic: string;
  requirement: string;
  audience: string;
  language: string;
}

const ProjectDetail = () => {
  const [project, setProject] = useState<Project | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          console.log('Access token:', token);
          fetchProjectDetails(token);
        } catch (error) {
          console.error(error);
        }
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts
    };
  }, []);

  const fetchProjectDetails = async (token: string) => {
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    try {
      const project_id = pathname.split('/').pop();
      console.log('this is project_id', project_id);
      const response = await fetch('/api/get_project_details', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ project_id: project_id }),
      });
      console.log('this is response', response);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        console.error('Error fetching project details', response.status);
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
              {project ? (
                <>
                  <h1 className="text-2xl font-bold mb-4">{project.project_name}</h1>
                  <p className="text-gray-600 mb-2">{project.project_description}</p>
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <p className="text-gray-600 mb-2">
                      <strong>Topic:</strong> {project.topic}
                    </p>
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
                </>
              ) : (
                <p>Loading project details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
