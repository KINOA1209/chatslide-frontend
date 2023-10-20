import React from 'react'

interface ToggleProps {
  isLeft: boolean
  setIsLeft: (value: boolean) => void
  leftText?: string
  rightText?: string
}

const NewToggle: React.FC<ToggleProps> = ({
  isLeft,
  setIsLeft,
  leftText,
  rightText,
}) => {
  return (
    <div className='toggle items-center md:flex'>
      <div className='flex items-center pb-2'>
        <div className='left-text' onClick={() => setIsLeft(true)}>
          {leftText || 'Monthly'}
        </div>
        <div
          onClick={() => setIsLeft(!isLeft)}
          className={`flex flex-row w-9 h-5 bg-indigo-600 rounded-full mx-[0.5rem] ${
            isLeft ? 'justify-start' : 'justify-end'
          }`}
        >
          <div className={`w-5 h-5 bg-zinc-100 rounded-full`} />
        </div>
        <div className='right-text' onClick={() => setIsLeft(false)}>
          {rightText || 'Yearly (17% off)'}
        </div>
      </div>
    </div>
  )
}

export default NewToggle
