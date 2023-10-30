"use client"

import { useRef, useState } from 'react';
import ProjectProgress from "@/components/steps";
import TopicForm from '@/components/forms/topic-form'
import FeedbackForm from '@/components/slides/feedback';

const metadata = {
  title: 'Workflow - DrLambda',
  description: 'Convert your documents to slides',
}



export default function WorkflowStep1() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <ProjectProgress currentInd={0} contentRef={contentRef} />
      <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="h1" style={{ color: '#180d09' }}>Generate Outline</h1>
      </div>
      <div className="max-w-4xl mx-auto px-6" ref={contentRef}>
        <TopicForm />
      </div>
      <div className="fixed bottom-10 right-10 hidden sm:block">
        <button
          onClick={handleOpenModal}
          className="bg-gradient-to-r from-blue-600  to-purple-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Feedback
        </button>

        {showModal && <FeedbackForm onClose={handleCloseModal} />}
      </div>
    </div>
  )
}
