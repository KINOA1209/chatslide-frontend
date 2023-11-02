import React from 'react'

interface ToggleProps {
  isLeft: boolean
  setIsLeft: (value: boolean) => void
  leftText?: string
  rightText?: string
  leftColor?: string
  rightColor?: string
}

const NewToggle: React.FC<ToggleProps> = ({
  isLeft,
  setIsLeft,
  leftText,
  rightText,
  leftColor = 'bg-indigo-600',
  rightColor = 'bg-indigo-600',
}) => {
  return (
    <div className='toggle items-center md:flex'>
      <div className='flex items-center pb-2'>
        <div className='left-text' onClick={() => setIsLeft(true)}>
          {leftText || 'Monthly'}
        </div>
        <div
          onClick={() => setIsLeft(!isLeft)}
          className={`flex flex-row items-center w-9 h-5 rounded-full mx-[0.5rem] ${
            isLeft ? `justify-start ${leftColor}` : `justify-end ${rightColor}`
          }`}
        >
            {/* ball */}
          <div className={`w-4 h-4 bg-zinc-100 rounded-full mx-0.5`} />
        </div>
        <div className='right-text' onClick={() => setIsLeft(false)}>
          {rightText || 'Yearly (17% off)'}
        </div>
      </div>
    </div>
  )
}

export default NewToggle
