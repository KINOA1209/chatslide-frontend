import { LeftTurnArrowIcon, RightTurnArrowIcon, SpinIcon } from '@/app/(feature)/icons';
import React, { MouseEventHandler, ReactNode, useState, MouseEvent } from 'react';
import PaywallModal from '../forms/paywallModal';
import { useRouter } from 'next/navigation';

type DrlambdaButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isSubmitting?: boolean;
  isPaidUser?: boolean;
  isPaidFeature?: boolean;
  showArrow?: boolean;
};

const DrlambdaButton: React.FC<DrlambdaButtonProps> = ({ children, onClick, isSubmitting, isPaidUser, isPaidFeature = false, showArrow = true }) => {

  const [showPaywallModal, setShowPaywallModal] = useState(false);

  function getButtonBg() {
    if (isSubmitting) {
      return 'bg-gray-600'
    }
    if (isPaidFeature) {
      return 'bg-gradient-to-r from-purple-500 to-purple-700'
    }
    return 'bg-gradient-to-r from-blue-600 to-blue-600'
  }

  function checkPaidUser(event: MouseEvent<HTMLButtonElement>) {
    if (isPaidFeature && !isPaidUser) {
      event.preventDefault();
      setShowPaywallModal(true);
    }
    else {
      onClick(event);
    }
  }

  return (
    <>
      {showPaywallModal && <PaywallModal setShowModal={setShowPaywallModal} message='Upgrade to unlock more features. 🚀' />}
      <button
        id='generate_button'
        disabled={isSubmitting}
        onClick={checkPaidUser}
        className={`min-w-[10rem] lg:w-[12rem] h-[36px] ${getButtonBg()} rounded-[15px] flex justify-center items-center gap-2 cursor-pointer }`}
      >
        {isSubmitting && <SpinIcon />}
        <span className='text-white font-semibold tracking-tight whitespace-nowrap'>
          {(isPaidFeature && !isPaidUser) && '🔒 '}
          {(isPaidFeature && isPaidUser) && '🚀 '}
          {children}
        </span>
        {/* Replace with the actual icon component or element */}
        {!isSubmitting && showArrow && <RightTurnArrowIcon />}
      </button>
    </>
  );
};

export default DrlambdaButton;


type DrLambdaBackButtonProps = {
  href: string;
};

export const DrLambdaBackButton: React.FC<DrLambdaBackButtonProps> = ({ href }) => {
  const router = useRouter();
  return (
    <div
      className='h-[36px] flex-row justify-center items-center gap-4 cursor-pointer flex'
      onClick={() => router.push(href)}
    >
      <LeftTurnArrowIcon></LeftTurnArrowIcon>
      <div className='text-center self-center text-gray-700 font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap block'>
        Back
      </div>
    </div>
  )
}

export const SmallBlueButton: React.FC<DrlambdaButtonProps> = ({ children, onClick, isSubmitting=false, isPaidUser, isPaidFeature = false }) => {
  function getButtonStyle() {
    if (isSubmitting) {
      return 'border-gray-600 text-gray-600'
    }
    return 'border-blue-600 text-blue-600'
  }
  return (
    <button onClick={onClick} className={`mx-2 border border-1 ${getButtonStyle()} rounded text-blue-600 px-3 py-1`} disabled={isSubmitting}>
      {children}
    </button>
  )
}