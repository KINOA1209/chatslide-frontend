
import ProgressBox from "@/components/steps";

export const metadata = {
  title: 'Workflow - Dr. Lambda',
  description: 'Create new content',
}

import TopicForm from '@/components/topic-form'

export default function WorkflowStep1() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <ProgressBox currentInd={0}/>
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Step 1: Generate Outlines</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <TopicForm />
          </div>

        </div>
      </div>
    </section>
  )
}
  