'use client'

import React, { useState, useRef, useEffect, Fragment } from 'react'
import ProjectProgress from '@/components/steps'
import FeedbackForm from '@/components/forms/feedback'
import 'react-toastify/dist/ReactToastify.css'
import OutlineVisualizer from '@/components/outline/OutlineVisualizer'

export default function WorkflowStep2() {
  const storedOutline =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('outline')
      : null
  const outline = storedOutline ? JSON.parse(storedOutline) : null
  const outlineRes = outline ? JSON.parse(outline.res) : null
  const contentRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const outlineContent = outlineRes
    ? Object.keys(outlineRes).map((key) => {
        return {
          title: outlineRes[key]['title'],
          content: outlineRes[key]['content'],
          detailLevels: outlineRes[key]['detailLevels'],
        }
      })
    : null

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  return (
    <div>
      <ProjectProgress currentInd={1} contentRef={contentRef} />
      <div className='pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20'>
        <h1 className='h1'>Edit Outlines</h1>
      </div>
      <div className='max-w-4xl mx-auto px-6' ref={contentRef}>
        <p>This is the outline generated. You can edit the details below.</p>
        <br />
        {outlineContent && <OutlineVisualizer outline={outlineContent} />}
      </div>
      <div className='fixed bottom-10 right-10 hidden sm:block'>
        <button
          onClick={handleOpenModal}
          className='bg-gradient-to-r from-blue-600  to-purple-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700'
        >
          Feedback
        </button>

        {showModal && <FeedbackForm onClose={handleCloseModal} />}
      </div>
    </div>
  )
}
