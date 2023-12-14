import { MouseEventHandler, ReactNode } from "react";

type InputBoxProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isSubmitting?: boolean;
  isPaidUser?: boolean;
  isPaidFeature?: boolean;
};

export const InputBox: React.FC<InputBoxProps> = ({ children, onClick }) => {
  return (
    <div
      className='w-full flex flex-row flex-nowrap items-center justify-center border border-2 border-gray-200 bg-gray-100 px-3 py-2.5 gap-x-2 cursor-text rounded-lg overflow-visible'
      onClick={onClick}
    >
      {children}
    </div>
  )
}