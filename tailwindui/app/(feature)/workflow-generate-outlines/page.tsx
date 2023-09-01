"use client"

import { useRef, useState } from 'react';
import ProjectProgress from "@/components/steps";
import TopicForm from '@/components/topic-form'
import FeedbackForm from '@/components/feedback';

const metadata = {
  title: 'Workflow - Dr. Lambda',
  description: 'Create new content',
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
    <div style={{ background: 'linear-gradient(169deg, rgba(237,113,206,0.602) 0%, rgba(199,157,223,0.566) 13%, rgba(141,165,225,0.397) 40%, rgba(42,136,237,0.221) 50%, rgba(255,255,255,1) 77%, rgba(255,255,255,1) 100%)', }}>
      <ProjectProgress currentInd={0} contentRef={contentRef} />
      <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="h1" style={{ color: '#180d09' }}>Generate Outlines</h1>
      </div>
      <div className="max-w-4xl mx-auto px-6" ref={contentRef}>
        <TopicForm />
      </div>
      <div className="fixed bottom-10 right-10">
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
