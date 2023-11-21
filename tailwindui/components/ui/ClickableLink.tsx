import React from 'react'
import { FinishedStepIcon } from '../icons'
import { InputBox } from './InputBox'

interface ClickableLinkProps {
  link: string
}

const ClickableLink: React.FC<ClickableLinkProps> = ({ link }) => {
  const [showTick, setShowTick] = React.useState(false) 

  const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(link)
    setShowTick(true)
  }

  return (
    <InputBox onClick={handleOnMouseDown}>
      <svg
        className='my-1 ml-3 w-6 h-6 mt-3'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9 4V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2H7M4.5 11H2C1.73478 11 1.48043 10.8946 1.29289 10.7071C1.10536 10.5196 1 10.2652 1 10V3C1 2.73478 1.10536 2.48043 1.29289 2.29289C1.48043 2.10536 1.73478 2 2 2H3'
          stroke='black'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13 6H8C7.44772 6 7 6.44772 7 7V13C7 13.5523 7.44772 14 8 14H13C13.5523 14 14 13.5523 14 13V7C14 6.44772 13.5523 6 13 6Z'
          stroke='black'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9 9H12M9 11H12M7.25 1H2.75L3.16 2.62C3.18498 2.72843 3.24611 2.82513 3.33335 2.89419C3.42059 2.96325 3.52873 3.00057 3.64 3H6.36C6.47127 3.00057 6.57941 2.96325 6.66665 2.89419C6.75389 2.82513 6.81502 2.72843 6.84 2.62L7.25 1Z'
          stroke='black'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <input
        id='search_keyword'
        type='text'
        className='md:w-[30rem] border-0 p-0 focus:outline-none focus:ring-0 mx-3 my-1 overflow-hidden cursor-text text-[#707C8A] bg-gray-100'
        readOnly
        value={link}
      />
      {showTick && <FinishedStepIcon/>}
    </InputBox>
  )
}

export default ClickableLink
