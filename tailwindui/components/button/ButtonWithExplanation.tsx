import { useState } from 'react'

function ButtonWithExplanation({
  button,
  explanation,
}: {
  button: JSX.Element
  explanation: string
}) {
  const [showExplanation, setShowExplanation] = useState(false)

  return (
    <div
      className='relative'
      onMouseEnter={() => setShowExplanation(true)}
      onMouseLeave={() => setShowExplanation(false)}
    >
      {button}
      <div
        className={`absolute left-[-8rem] top-4 p-1 bg-black text-white rounded-md transition-opacity duration-200 ${
          showExplanation ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='text-right text-zinc-100 text-sm font-normal font-creato-medium leading-snug tracking-tight'>
          {explanation}
        </div>
      </div>
    </div>
  )
}

export default ButtonWithExplanation
