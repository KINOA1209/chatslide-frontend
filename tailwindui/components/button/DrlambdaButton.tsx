import { RightTurnArrowIcon, SpinIcon } from '@/app/(feature)/icons';
import React, { MouseEventHandler, ReactNode, useState, MouseEvent } from 'react';
import PaywallModal from '../forms/paywallModal';

type DrlambdaButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isSubmitting?: boolean;
  isPaidUser?: boolean;
  isPaidFeature?: boolean;
};

const DrlambdaButton: React.FC<DrlambdaButtonProps> = ({ children, onClick, isSubmitting, isPaidUser, isPaidFeature=false }) => {

  const [showPaywallModal, setShowPaywallModal] = useState(false);

  function getButtonBg() {
    if (isSubmitting) {
      return 'bg-gray-600'
    }
    if (isPaidFeature) {
      return 'bg-gradient-to-r from-purple-500 to-purple-700'
    }
    return 'bg-gradient-to-r from-blue-600 to-teal-500'
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
        className={`w-[12rem] h-[2rem] px-5 py-1.5 ${getButtonBg()} rounded-3xl flex justify-center items-center gap-2 mx-auto cursor-pointer lg:mr-[1%] }`}
      >
        {isSubmitting && <SpinIcon />}
        <span className='text-white font-semibold tracking-tight whitespace-nowrap'>
          {(isPaidFeature && !isPaidUser) && '🔒 '}
          {(isPaidFeature && isPaidUser) && '🚀 '}
          {children}
        </span>
        {/* Replace with the actual icon component or element */}
        {!isSubmitting && <RightTurnArrowIcon />}
      </button>
    </>
  );
};

export default DrlambdaButton;
