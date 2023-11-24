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
  leftColor = 'bg-teal-500',
  rightColor = 'bg-purple-700',
}) => {
  const activeBox = "shadow-[0px_2.688084602355957px_6.720211505889893px_rgba(10.01,19.13,8.53,0.12)] rounded-[15px]"

  return (
    <div className='toggle items-center md:flex'>
      <div className='flex items-center rounded-[15px] border bg-gray-200 px-0.5 py-0.5 my-1'>
        <div className={`w-[110px] h-[36px] px-2 py-1 flex justify-center items-center ${isLeft ? activeBox : ''} ${isLeft ? leftColor : ''}`} onClick={() => setIsLeft(true)}>
          <div className={`text-[16px] font-medium break-words ${!isLeft ? 'text-blue-600' : 'text-white'}`}>{leftText}</div>
        </div>
        <div className={`w-[110px] h-[36px] px-2 py-1 flex justify-center items-center ${!isLeft ? activeBox : ''} ${!isLeft ? rightColor : ''}`} onClick={() => setIsLeft(false)}>
          <div className={`text-[16px] font-medium break-words ${isLeft ? 'text-blue-600' : 'text-white'}`}>{rightText}</div>
        </div>
      </div>
    </div>
  )
}

export default NewToggle
