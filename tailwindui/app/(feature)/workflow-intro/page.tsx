"use client";

// export const metadata = {
//   title: 'Workflow - DrLambda',
//   description: 'Create new content',
// }

function WorkflowIntro() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      {/* Form */}
      <div className="max-w-sm mx-auto">
        <form action="/workflow-generate-outlines">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <p>
                Starting from here, you can interactively create your
                customized educational video with a few words.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mt-6">
            <div className="w-full px-3">
              <button className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full">
                Start
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-500 text-center mt-3">
            By using our service, you agree to the{" "}
            <a className="underline" href="/terms">
              terms & conditions
            </a>
            , and our{" "}
            <a className="underline" href="/privacy">
              privacy policy
            </a>
            .
          </div>
        </form>
      </div>
    </div>
  );
}


export default function WorkflowStep6() {
  return (
    <div>
      <div className="pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="h1">Workflow Introduction</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <WorkflowIntro />
      </div>
    </div>
  )
}
