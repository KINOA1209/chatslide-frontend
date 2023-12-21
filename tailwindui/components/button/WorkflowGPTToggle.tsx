'use client';

import React, { FunctionComponent, useEffect, useState } from 'react';
import WorkflowToggle from './WorkflowToggle';
import PaywallModal from '@/components/forms/paywallModal';
import { useUser } from '@/hooks/use-user';

interface GPTToggleProps {
	setIsGpt35: (value: boolean) => void;
}

const GPTToggle: React.FC<GPTToggleProps> = ({ setIsGpt35 }) => {
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser } = useUser();
	const [isGpt35, setIsGpt35Locally] = useState(() => {
		// Load the value from sessionStorage, defaulting to true if it's not set
		const storedValue =
			typeof sessionStorage !== 'undefined'
				? sessionStorage.getItem('isGpt35')
				: null;
		return storedValue ? JSON.parse(storedValue) : true;
	});

	useEffect(() => {
		// Update sessionStorage whenever isGpt35 changes
		sessionStorage.setItem('isGpt35', JSON.stringify(isGpt35));
		console.log(
			'sessionStorage isGpt35 updated',
			sessionStorage.getItem('isGpt35'),
		);
	}, [isGpt35]);

	const handleToggle = (value: boolean) => {
		if (!value && !isPaidUser) {
			// if switched to right (GPT-4) and user is not paid
			setShowPaymentModal(true);
		} else {
			setIsGpt35Locally(value); // Update the local state
			setIsGpt35(value); // Update the parent component's state
			console.log('isGpt35', value);
		}
	};

	return (
		<div>
			<WorkflowToggle
				isLeft={isGpt35}
				setIsLeft={handleToggle}
				leftText='GPT3.5 ⚡️'
				rightText='GPT4 🚀'
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

interface GPTToggleWithExplanationProps {
	setIsGpt35: (isGpt35: boolean) => void;
	// Add any other props you might need
}

export const GPTToggleWithExplanation: FunctionComponent<
	GPTToggleWithExplanationProps
> = ({ setIsGpt35 }) => {
	const [showPopup, setShowPopup] = useState(false);

	const openPopup = () => setShowPopup(true);
	const closePopup = () => setShowPopup(false);

	return (
		<div>
			{/* gpt model switch area */}
			<div className='self-end flex flex-row gap-4 cursor-pointer'>
				<GPTToggle setIsGpt35={setIsGpt35} />
				{/* <div className='cursor-pointer' onClick={openPopup}>
          <QuestionExplainIcon />
        </div> */}
			</div>

			{/* Popup for explaining model difference */}
			{showPopup && (
				<div className='fixed top-[15%] left-[70%] w-[27rem] h-48 bg-gradient-to-l from-gray-950 to-slate-600 rounded-md shadow backdrop-blur-2xl flex flex-col'>
					{/* Popup content */}
					<div
						onClick={closePopup}
						className='text-gray-50 cursor-pointer self-end px-4 py-2'
					>
						Close
					</div>
					{/* columns for two models */}
					<div className='grid grid-cols-2 gap-8'>
						{/* Column for GPT-3.5 */}
						<div className='flex flex-col justify-center items-center border-r-2 border-black/25'>
							{/* Add content for GPT-3.5 */}
						</div>
						{/* Column for GPT-4.0 */}
						<div className='flex flex-col justify-center items-center'>
							{/* Add content for GPT-4.0 */}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
