import Link from 'next/link';
import React, { useState } from 'react';
import { Pricing } from '@/components/landing/pricing'
import ReferralLink from '../ReferralLink';

interface PaywallModalProps {
  setShowModal: (value: boolean) => void;
  message: string;
  showReferralLink?: boolean;
}


const PaywallModal: React.FC<PaywallModalProps> = ({ setShowModal, message, showReferralLink = false }) => {

  const modalRef = React.useRef<HTMLDivElement>(null);
  const modalContentRef = React.useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalContentRef.current?.contains(e.target as Node)) {
      return; // Click inside the modal content, do nothing
    }
    handleCloseModal(); // Click outside the modal content, close the modal
  };

  return (
    <>
      <div
        ref={modalRef}
        id="staticModal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full"
        onClick={handleOutsideClick}
      >
        {/* closable modal */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        
        <div ref={modalContentRef} className="relative bg-white rounded-lg shadow w-128 h-[80vh] overflow-y-auto">
          {/* Close button */}
          <button
            className="absolute top-0 right-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            onClick={handleCloseModal}
          >
            &times;
          </button>

          {/* Modal body */}
          <div className="pt-4 pb-4 space-y-4"> {/* Reduced bottom padding */}
            <div className="text-center text-[#707C8A] text-[16px] font-bold">
              {message}
            </div>

            <Pricing fewerCards={true} />

            {showReferralLink &&
              <div className="space-y-4">
                <br />
                <div className="text-center text-[#707C8A] text-[16px] font-bold">
                  Or refer your friend for more ⭐️credits.
                </div>
                <ReferralLink />
              </div>
              }
          </div>
        </div>
      </div>
    </>
  );
};


export default PaywallModal;
