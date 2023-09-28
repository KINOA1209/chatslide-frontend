import Link from 'next/link';
import React, { useState } from 'react';
import { Pricing } from '@/components/landing/pricing'

interface PaywallModalProps {
    setShowModal: (value: boolean) => void;
}


const PaywallModal: React.FC<PaywallModalProps> = ({ setShowModal }) => {

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div
                id="staticModal"
                data-modal-backdrop="static"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full"
            >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-128">
                    {/* Modal header */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Premium Features
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        <Pricing />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaywallModal;
