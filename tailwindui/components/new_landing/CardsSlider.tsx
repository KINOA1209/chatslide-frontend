import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const CardsSlider: React.FC<Props> = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center overflow-x-auto items-center pb-[20px]'>
      <div
        className='w-full flex flex-row overflow-x-auto items-center pb-[20px]'
      >
        {children}
      </div>
    </div>
  );
}