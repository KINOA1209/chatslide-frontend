'use client';

import React, { FunctionComponent, useEffect, useState } from 'react';
import WorkflowToggle from './WorkflowToggle';
import PaywallModal from '@/components/paywallModal';
import { useUser } from '@/hooks/use-user';
import MultiwayToggle from './MultiwayToggle';

interface GPTToggleProps {
	setIsGpt35: (value: boolean) => void;
}

const GPTToggle: React.FC<GPTToggleProps> = ({ setIsGpt35 }) => {
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser } = useUser();
	const [selectedModel, setSelectedModel] = useState('GPT-3.5');

	const handleChange = (model: string) => {
		if (model !== 'GPT-3.5' && !isPaidUser) {
			// if switched to right (GPT-4) and user is not paid
			setShowPaymentModal(true);
		} else {
			setSelectedModel(model);
			setIsGpt35(model !== 'GPT-3.5'); // Update the parent component's state
			// console.log('isGpt35', value);
		}
	};

	return (
		<div className='user-onboarding-GPTToggle'>
			<MultiwayToggle
				options={[
					{ key: 'GPT-3.5', text: 'GPT-3.5 ⚡️' },
					{ key: 'GPT-4', text: 'GPT-4 🚀' },
					{ key: 'GPT-4o', text: 'GPT-4 Omni 🧠' },
				]}
				selectedKey={selectedModel}
				setSelectedKey={handleChange}
			/>

			<PaywallModal
				showModal={showPaymentModal}
				setShowModal={setShowPaymentModal}
				message='Upgrade to unlock more features. 🚀'
			/>
		</div>
	);
};

export default GPTToggle;

interface GPTToggleWithExplanationProps {
	setIsGpt35: (isGpt35: boolean) => void;
	// Add any other props you might need
}

export const GPTToggleWithExplanation: FunctionComponent<
	GPTToggleWithExplanationProps
> = ({ setIsGpt35 }) => {

	return (
		<div>
			{/* gpt model switch area */}
			<div className='self-end flex flex-row gap-4 cursor-pointer'>
				<GPTToggle setIsGpt35={setIsGpt35} />
			</div>
		</div>
	);
};
