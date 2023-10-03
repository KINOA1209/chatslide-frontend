import Link from 'next/link';
import React, { useState } from 'react';
import { Pricing } from '@/components/landing/pricing'

interface PaywallModalProps {
    setShowModal: (value: boolean) => void;
    message: string;
}


const PaywallModal: React.FC<PaywallModalProps> = ({ setShowModal, message }) => {

    const modalRef = React.useRef<HTMLDivElement>(null);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === modalRef.current) {
            handleCloseModal();
        }
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
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-128">
                    {/* Close button */}
                    <button
                        className="absolute top-0 right-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                        onClick={handleCloseModal}
                    >
                        &times;
                    </button>

                    {/* Modal body */}
                    <div className="p-6 space-y-6 pb-6"> {/* Reduced bottom padding */}
                        <div className="text-center text-white font-bold">
                            {message}
                        </div>
                        <Pricing fewerCards={true} />
                    </div>
                </div>
            </div>
        </>
    );
};


export default PaywallModal;
