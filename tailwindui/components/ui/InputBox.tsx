import { MouseEventHandler, ReactNode } from "react";

type InputBoxProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
  isSubmitting?: boolean;
  isPaidUser?: boolean;
  isPaidFeature?: boolean;
};

export const InputBox: React.FC<InputBoxProps> = ({ children, onClick }) => {
  return (
    <div
      className='flex flex-row flex-nowrap items-center border border-2 border-gray-200 bg-gray-100 px-2 py-0.5 cursor-text rounded-lg mb-6'
      onClick={onClick}
    >
      {children}
    </div>
  )
}