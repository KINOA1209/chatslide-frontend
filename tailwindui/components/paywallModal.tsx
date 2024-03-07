import React, { useState } from 'react';
import Pricing from '@/components/landing/pricing';
import ReferralLink from './ReferralLink';
import Modal from './ui/Modal';

interface PaywallModalProps {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	message: string;
	showReferralLink?: boolean;
}

const PaywallModal: React.FC<PaywallModalProps> = ({
	showModal,
	setShowModal,
	message,
	showReferralLink = false,
}) => {
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
		<Modal
			title={message}
			showModal={showModal}
			setShowModal={setShowModal}>
			<div className='py-2 space-y-4'>
				{' '}
				{/* Reduced bottom padding */}
				<Pricing fewerCards={true} />
				{showReferralLink && (
					<div className='space-y-4'>
						<div className='text-center text-[#707C8A] text-[16px] font-bold'>
							Or refer your friend for more ⭐️credits.
						</div>
						<ReferralLink />
					</div>
				)}
			</div>
		</Modal>
	);
};

export default PaywallModal;
