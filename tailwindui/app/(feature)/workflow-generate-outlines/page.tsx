"use client"

import { useRef } from 'react';
import ProjectProgress from "@/components/steps";

const metadata = {
  title: 'Workflow - Dr. Lambda',
  description: 'Create new content',
}

import TopicForm from '@/components/topic-form'

export default function WorkflowStep1() {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ProjectProgress currentInd={0} contentRef={contentRef} />
      <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="h1">Step 1: Generate Outlines</h1>
      </div>
      <div className="max-w-4xl mx-auto px-6" ref={contentRef}>
        <TopicForm />
      </div>
    </div>
  )
}
