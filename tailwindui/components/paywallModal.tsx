import React, { useState } from 'react';
import ReferralLink from './ReferralLink';
import Modal from './ui/Modal';
import { Pricing, PricingComparison } from '@/app/(default)/landing/Pricing';
import { BigTitle, Instruction, Title } from './ui/Text';
import Card from './ui/Card';

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
				{showReferralLink && (
					<Card>
						<Title>
							🌟 Get credits for free
						</Title>
						<Instruction>Refer a friend to get 50 ⭐️credits.</Instruction>
						<ReferralLink />

						<Instruction>
							Join our <a href='/discord' className='text-blue-600'>discord</a> community for 50 ⭐️credits.
						</Instruction>
					</Card>
				)}
				<Title>
					🚀 Upgrade for more credits
				</Title>
				<PricingComparison small={true} showFreeTier={false} />
			</div>
		</Modal>
	);
};

export default PaywallModal;
