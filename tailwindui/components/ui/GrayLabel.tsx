import React, { ReactNode } from "react"

type InputBoxProps = {
  children: ReactNode;
};

export const GrayLabel: React.FC<InputBoxProps> = ({ children }) => {
  return (
    <div className='text-center text-neutral-800 text-xs font-bold font-creato-medium leading-snug tracking-wide bg-gray-200 rounded px-1 py-0.5 ml-2'>
      {children}
    </div>
  )
}