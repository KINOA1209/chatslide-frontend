
import ProjectProgress from "@/components/steps";

export const metadata = {
  title: 'Workflow - Dr. Lambda',
  description: 'Create new content',
}

import TopicForm from '@/components/topic-form'

export default function WorkflowStep1() {
  return (
    <div>
      <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="h1">Step 1: Generate Outlines</h1>
      </div>
      <div className="max-w-md mx-auto px-6">
        <TopicForm />
      </div>
    </div>
  )
}
