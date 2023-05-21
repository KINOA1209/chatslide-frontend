export const metadata = {
  title: 'Workflow - Dr. Lambda',
  description: 'Create new content',
}

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TopicForm from '@/components/topic-form'

export default function WorkflowStep1() {

  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  useEffect(() => {
    if (formSubmitSuccess && responseData) {
      // Navigate to another page using Link component
      window.location.href = `/new-page?name=${responseData.res}`;
    }
  }, [formSubmitSuccess, responseData]);


  const handleFormSubmitSuccess = (data: any) => {
    // Handle the response data here
    setResponseData(data);
    setFormSubmitSuccess(true);
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Workflow Step 1</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <TopicForm onSubmitSuccess={handleFormSubmitSuccess} />
          </div>

        </div>
      </div>
    </section>
  )
}
  