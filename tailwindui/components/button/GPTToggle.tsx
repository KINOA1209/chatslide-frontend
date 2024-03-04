import React, { useState } from 'react';
import Toggle from './Toggle';
import PaywallModal from '@/components/paywallModal';
import { useUser } from '@/hooks/use-user';

interface GPTToggleProps {
	isGpt35: boolean;
	setIsGpt35: (value: boolean) => void;
}

const GPTToggle: React.FC<GPTToggleProps> = ({ isGpt35, setIsGpt35 }) => {
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser } = useUser();

	const handleToggle = (value: boolean) => {
		if (!value && !isPaidUser) {
			// if switched to right (GPT-4) and user is not paid
			setShowPaymentModal(true);
		} else {
			setIsGpt35(value);
		}
	};

	return (
		<div>
			<Toggle
				isLeft={isGpt35}
				setIsLeft={handleToggle}
				leftText='GPT-3.5'
				rightText='🚀 GPT-4'
			/>

			{showPaymentModal && (
				<PaywallModal
					setShowModal={setShowPaymentModal}
					message='Upgrade to unlock more features. 🚀'
				/>
			)}
		</div>
	);
};

export default GPTToggle;
