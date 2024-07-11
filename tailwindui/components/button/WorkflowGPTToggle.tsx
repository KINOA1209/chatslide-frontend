'use client';

import React, { FunctionComponent, useEffect, useState } from 'react';
import WorkflowToggle from './WorkflowToggle';
import PaywallModal from '@/components/paywallModal';
import { useUser } from '@/hooks/use-user';
import MultiwayToggle from './MultiwayToggle';

interface GPTToggleProps {
	model?: string;
	small?: boolean;
	setModel: (value: string) => void;
}

const GPTToggle: React.FC<GPTToggleProps> = ({
	model = 'GPT-3.5',
	small = false,
	setModel,
}) => {
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser } = useUser();

	const handleChange = (model: string) => {
		if (model !== 'GPT-3.5' && !isPaidUser) {
			// if switched to right (GPT-4) and user is not paid
			setShowPaymentModal(true);
		} else {
			setModel(model);
			// console.log('isGpt35', value);
		}
	};

	return (
		<div className='user-onboarding-GPTToggle'>
			<MultiwayToggle
				options={
					small
						? [
								{ key: 'GPT-3.5', text: 'GPT-3.5 ⚡️' },
								{ key: 'GPT-4o', text: 'GPT-4o 🧠' },
							]
						: [
								{ key: 'GPT-3.5', text: 'GPT-3.5 ⚡️' },
								{ key: 'GPT-4', text: 'GPT-4 🚀' },
								{ key: 'GPT-4o', text: 'GPT-4o 🧠' },
							]
				}
				selectedKey={model}
				setSelectedKey={handleChange}
			/>

			<PaywallModal
				showModal={showPaymentModal}
				setShowModal={setShowPaymentModal}
				message='Upgrade to unlock more powerful LLMs 🚀'
			/>
		</div>
	);
};

export default GPTToggle;
