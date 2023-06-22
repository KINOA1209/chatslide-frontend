"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    } else {
      setAccessToken("");
    }
  }, [pathname]);

  const handleProjectNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };
  const handleProjectDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setProjectDescription(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform submission logic here
    const formData = {
      project_name: (event.target as HTMLFormElement).project_name.value,
      project_description: (event.target as HTMLFormElement).project_description.value,
    }

    const headers = new Headers();
    if (accessToken) {
      console.log("access token", accessToken);
      headers.append("Authorization", `Bearer ${accessToken}`);
    }
    headers.append("Content-Type", "application/json");
    
    try {
      const response = await fetch("/api/create_project", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });

      console.log(formData);
      console.log(response);

      if (response.ok) {
        const projectCreateInfo = await response.json();
        console.log(projectCreateInfo);
        if (projectCreateInfo.status === "success") {
          sessionStorage.setItem("project_id", projectCreateInfo.project_id);
          setTimeout(() => {
            router.push("/workflow-intro");
          }, 500);
        } else {
          toast.error(projectCreateInfo.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        alert("Request failed: " + response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }


    
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
                <label htmlFor="project_name" className="block font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  id="project_name"
                  className="mt-1 focus:ring-blue-600 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="project_description" className="block font-medium text-gray-700">
                  Project Description
                </label>
                <textarea
                  id="project_description"
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
              <ToastContainer />
            </form>
          </div>
            </div>

            </div>
          </div>
        </section>
    )
}