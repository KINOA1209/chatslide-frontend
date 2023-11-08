import { RightTurnArrowIcon } from '@/app/(feature)/icons';
import React, { MouseEventHandler, ReactNode } from 'react';

type DrlambdaButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const DrlambdaButton: React.FC<DrlambdaButtonProps> = ({ children, onClick, disabled }) => {

  return (
    <button
      id='generate_button'
      disabled={disabled}
      onClick={onClick}
      className={`w-50 h-10 px-5 py-1.5 bg-blue-500 rounded-3xl flex justify-center items-center gap-5 mx-auto cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 lg:mr-[1%] ${disabled ? 'cursor-not-allowed' : ''
        }`}
    >
      <span className='text-white text-sm font-medium tracking-tight whitespace-nowrap overflow-hidden'>
        {children}
      </span>
      {/* Replace with the actual icon component or element */}
      <RightTurnArrowIcon />
    </button>
  );
};

export default DrlambdaButton;
