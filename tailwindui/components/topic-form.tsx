'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

interface TopicFormProps {
  onSubmitSuccess: (data: any) => void;
}

interface TopicFormData {
  topic: string;
  requirements: string;
}

const TopicForm: React.FC<TopicFormProps> = ({ onSubmitSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<TopicFormData>({
    topic: '',
    requirements: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://drlambda.ai/api/guidelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      // Handle the response data here
      console.log(data);

      // Redirect to a new page with the data
      onSubmitSuccess(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="topic">Topic <span className="text-red-600">*</span></label>
            <input id="topic" type="text" className="form-input w-full text-gray-800" placeholder="Enter the topic" value={formData.topic} onChange={handleChange} required />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="requirements">Requirements: <span className="text-red-600">*</span></label>
            <input id="requirements" type="text" className="form-input w-full text-gray-800" placeholder="Enter the requirements" required value={formData.requirements} onChange={handleChange} />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" type="submit">Generate outline</button>
        </div>
      </div>
    </form>
  );
};

export default TopicForm;