'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import {useRouter} from 'next/navigation';
import { cookies } from 'next/headers';

const OutlineForm: React.FC = () => {
  /*const [formData, setFormData] = useState<TopicFormData>({
    topic: '',
    requirements: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };*/
  const router = useRouter();
  // const { name } = router.query;

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Workflow Step 2</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full">Next</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default OutlineForm;
