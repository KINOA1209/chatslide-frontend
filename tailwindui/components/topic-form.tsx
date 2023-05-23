'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const TopicForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
        topic: (event.target as HTMLFormElement).topic.value,
        requirements: (event.target as HTMLFormElement).requirements.value,
        audience: (event.target as HTMLFormElement).audience.value,
    };

    console.log("created form data");

    try {
      const response = await fetch('/api/guidelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log(formData);
      console.log(response);

      if (response.ok) {
        const outlinesJson = await response.json();
        // Handle the response data here
        console.log(outlinesJson);
        console.log(outlinesJson.data.audience);
        console.log(outlinesJson.data.requirements);
        console.log(outlinesJson.data.topic);
        console.log(outlinesJson.data.res);

        // cookies doesn't work because it needs 'use server'
        // cookies().set("topic", outlinesJson.data.audience);

        // Redirect to a new page with the data
        router.push('workflow-step2');
      } else {
        alert("Request failed: " + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="topic">
                Topic <span className="text-red-600">*</span>
            </label>
            <input
              id="topic"
              type="text"
              className="form-input w-full text-gray-800"
              placeholder="Enter the topic"
              required />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="requirements">
                Requirements: <span className="text-red-600">*</span>
            </label>
            <input
              id="requirements"
              type="text"
              className="form-input w-full text-gray-800"
              placeholder="Enter the requirements"
              required
            />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="audience">
                Audience: <span className="text-red-600">*</span>
            </label>
            <input
              id="audience"
              type="text"
              className="form-input w-full text-gray-800"
              placeholder="Enter the audience"
              required
            />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
            <button
              className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
              type="submit">
                Generate outline
            </button>
        </div>
      </div>
    </form>
  );
};

export default TopicForm;