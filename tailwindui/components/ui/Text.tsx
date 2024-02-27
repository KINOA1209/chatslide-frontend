import React from "react";

const Instruction: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='text-neutral-800 text-md py-2'>
      {children}
    </div>
  );
}

const Explanation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='text-gray-500 text-sm'>
      {children}
    </div>
  );
}

export { Instruction, Explanation };
